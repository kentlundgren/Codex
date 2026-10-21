#!/usr/bin/env python3
"""Bygger sokindex.js (sökindex) och innehållsträdet i innehall.html för Samrådsguiden.

Körs från vilken mapp som helst:  python bygg_sokindex.py
Kör skriptet efter varje ändring av en sida som ingår, annars visar sökningen och trädet gammalt innehåll.

Vilka filer som ingår står i SIDOR nedan. Arbetsdokument (PRD, SPEC, supabase.md, skill-filer, juridisk
förstagranskning), omröstningssidan Maxima/rangordning.html och docx-filer ingår medvetet inte.
"""
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROT = Path(__file__).resolve().parent
BLOB = "https://github.com/kentlundgren/Codex/blob/main/Fritid/NF/Samradsguiden/"

# (fil, ordning i trädet, grupp i trädet). Ordningen är den kurerade.
SIDOR = [
    ("index.html", "Sidorna"),
    ("paverka.html", "Sidorna"),
    ("checklista.html", "Sidorna"),
    ("fordjupning.html", "Sidorna"),
    ("lagtexter.html", "Sidorna"),
    ("verktyg.html", "Sidorna"),
    ("lund-ncc.html", "Exempel"),
    ("maxima.html", "Exempel"),
    ("rangordning/index.html", "Sidorna"),
    ("Underlag/Vagledning_kap9_260830.md", "Underlag"),
    ("Underlag/Balanseringsprincip_260913B.md", "Underlag"),
]

SKIPPA_TAGGAR = {"nav", "footer", "dialog", "script", "style", "head", "noscript"}
BLOCK = {"p", "li", "tr", "div", "section", "article", "table", "ul", "ol", "br", "blockquote", "pre", "td", "th", "dt", "dd"}


def rensa(t):
    return re.sub(r"\s+", " ", html.unescape(t)).strip()


class Sida(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titel = ""
        self.lead = ""
        self.skip = 0
        self.i_title = False
        self.i_lead = False
        self.i_rubrik = None   # (nivå, id) medan vi läser en rubrik
        self.anchor_djup = 0
        self.anchor_href = ""
        self.rubrik_text = []
        self.sektioner = []    # dicts: nivå, id, rubrik, text-lista
        self.nu = {"nivå": 0, "id": "", "rubrik": "", "text": []}
        self.senaste_id = ""
        self.forklaringar = []

    def _ny(self, nivå, id_, rubrik):
        self._stang()
        self.nu = {"nivå": nivå, "id": id_, "rubrik": rubrik, "text": []}

    def _stang(self):
        self.sektioner.append(self.nu)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.i_title = True
        if tag in SKIPPA_TAGGAR:
            self.skip += 1
            return
        if self.skip:
            return
        if tag == "p" and "lead" in (a.get("class") or "").split() and not self.lead:
            self.i_lead = True
        if tag in ("h2", "h3"):
            self.i_rubrik = (int(tag[1]), a.get("id", ""))
            self.rubrik_text = []
            self.anchor_href = ""
        if tag == "a" and "anchor" in (a.get("class") or "").split() and self.i_rubrik:
            self.anchor_djup += 1
            h = a.get("href", "")
            if h.startswith("#"):
                self.anchor_href = h[1:]
        t = a.get("title")
        if t and tag != "a" and "ver" not in (a.get("class") or "").split():
            self.nu["text"].append(" (" + t + ") ")
        if tag in BLOCK:
            self.nu["text"].append(" ")

    def handle_endtag(self, tag):
        if tag == "title":
            self.i_title = False
        if tag in SKIPPA_TAGGAR:
            self.skip = max(0, self.skip - 1)
            return
        if self.skip:
            return
        if tag == "p" and self.i_lead:
            self.i_lead = False
        if tag == "a" and self.anchor_djup:
            self.anchor_djup -= 1
        if tag in ("h2", "h3") and self.i_rubrik:
            nivå, id_ = self.i_rubrik
            self.i_rubrik = None
            rubrik = rensa("".join(self.rubrik_text))
            self._ny(nivå, id_ or self.anchor_href, rubrik)
        if tag in BLOCK:
            self.nu["text"].append(" ")

    def handle_data(self, data):
        if self.i_title:
            self.titel += data
            return
        if self.skip:
            return
        if self.i_lead:
            self.lead += data
        if self.i_rubrik:
            if not self.anchor_djup:
                self.rubrik_text.append(data)
            return
        self.nu["text"].append(data)

    def handle_comment(self, data):
        pass

    def close(self):
        super().close()
        self._stang()


def las_html(fil):
    p = Sida()
    p.feed((ROT / fil).read_text(encoding="utf-8"))
    p.close()
    titel = rensa(p.titel)
    titel = re.sub(r"\s+[—-]\s+Samrådsguiden$", "", titel)
    post = []
    for s in p.sektioner:
        text = rensa("".join(s["text"]))
        if not text and not s["rubrik"]:
            continue
        if s["id"] == "innehallsforteckning":
            continue  # sidans egen innehållsförteckning är bara en upprepning av rubrikerna
        post.append({"nivå": s["nivå"], "id": s["id"], "rubrik": s["rubrik"] or titel, "text": text})
    # rubriker utan eget ankare länkar till närmaste ankare ovanför, så att träffen hamnar nära rätt ställe
    sist = ""
    for q in post:
        if q["id"]:
            sist = q["id"]
        else:
            q["ankare_ovan"] = sist
    return {"titel": titel, "lead": rensa(p.lead), "poster": post, "url": fil, "md": False}


def slug(rubrik):
    s = rubrik.lower()
    s = re.sub(r"[^\w\s-]", "", s)
    return re.sub(r"\s", "-", s.strip())


def las_md(fil):
    rader = (ROT / fil).read_text(encoding="utf-8")
    rader = re.sub(r"<!--.*?-->", "", rader, flags=re.S)
    titel = fil
    poster = []
    nu = {"nivå": 0, "id": "", "rubrik": "", "text": []}
    for rad in rader.splitlines():
        m = re.match(r"^(#{1,3})\s+(.*)$", rad)
        if m:
            poster.append(nu)
            nivå = len(m.group(1))
            rubrik = rensa(re.sub(r"[*`_]", "", m.group(2)))
            if nivå == 1 and titel == fil:
                titel = rubrik
            nu = {"nivå": nivå, "id": slug(rubrik), "rubrik": rubrik, "text": []}
        else:
            t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", rad)
            t = re.sub(r"<(https?://[^>]+)>", r"\1", t)
            t = re.sub(r"[*`|>]", " ", t)
            nu["text"].append(t + " ")
    poster.append(nu)
    ut = []
    for s in poster:
        text = rensa("".join(s["text"]))
        if not text and not s["rubrik"]:
            continue
        # H1 i en md-fil är sidans titel; den hör till sidan, inte till ett eget avsnitt
        ut.append({"nivå": 0 if s["nivå"] == 1 else s["nivå"], "id": "" if s["nivå"] == 1 else s["id"],
                   "rubrik": s["rubrik"] or titel, "text": text})
    return {"titel": titel, "lead": "", "poster": ut, "url": BLOB + fil, "md": True}


def bygg_index(sidor):
    ut = []
    for fil, sida in sidor:
        for p in sida["poster"]:
            if not p["text"] and p["nivå"] == 0:
                continue
            ankare = ("#" + (p["id"] or p.get("ankare_ovan", ""))) if (p["id"] or p.get("ankare_ovan")) else ""
            ut.append({
                "t": sida["titel"],
                "h": p["rubrik"] if p["nivå"] else "",
                "u": sida["url"] + ankare,
                "m": 1 if sida["md"] else 0,
                "x": p["text"],
            })
    return ut


def esc(t):
    return html.escape(t, quote=True)


def bygg_trad(sidor):
    grupper = {}
    for fil, sida in sidor:
        grupper.setdefault(dict(SIDOR)[fil], []).append((fil, sida))
    ut = []
    for grupp, lista in grupper.items():
        ut.append(f'        <h3 class="subhead">{esc(grupp)}</h3>')
        ut.append('        <ul class="trad">')
        for fil, sida in lista:
            ext = ' rel="noopener"' if sida["md"] else ""
            ut.append(f'          <li><a class="trad__sida" href="{esc(sida["url"])}"{ext}>{esc(sida["titel"])}</a>')
            if sida["md"]:
                ut[-1] += ' <span class="trad__not">(Markdown-fil på GitHub)</span>'
            if sida["lead"]:
                ut.append(f'            <p class="trad__text">{esc(sida["lead"])}</p>')
            h2 = [p for p in sida["poster"] if p["nivå"] in (2, 3) and p["id"]]
            if h2:
                ut.append('            <ul>')
                i = 0
                while i < len(h2):
                    p = h2[i]
                    if p["nivå"] == 3:
                        # H3 utan H2 framför sig (kan hända i md-filer): visa som egen rad
                        ut.append(f'              <li><a href="{esc(sida["url"] + "#" + p["id"])}">{esc(p["rubrik"])}</a></li>')
                        i += 1
                        continue
                    barn = []
                    j = i + 1
                    while j < len(h2) and h2[j]["nivå"] == 3:
                        barn.append(h2[j])
                        j += 1
                    länk = f'<a href="{esc(sida["url"] + "#" + p["id"])}">{esc(p["rubrik"])}</a>'
                    if barn:
                        ut.append(f'              <li><details><summary>{länk}</summary><ul>')
                        for b in barn:
                            ut.append(f'                <li><a href="{esc(sida["url"] + "#" + b["id"])}">{esc(b["rubrik"])}</a></li>')
                        ut.append('              </ul></details></li>')
                    else:
                        ut.append(f'              <li>{länk}</li>')
                    i = j
                ut.append('            </ul>')
            ut.append('          </li>')
        ut.append('        </ul>')
    return "\n".join(ut)


def main():
    sidor = []
    for fil, _ in SIDOR:
        sidor.append((fil, las_md(fil) if fil.endswith(".md") else las_html(fil)))
    index = bygg_index(sidor)
    js = "// Genererad av bygg_sokindex.py. Redigera inte för hand.\nwindow.SOKINDEX = " + json.dumps(index, ensure_ascii=False, separators=(",", ":")) + ";\n"
    (ROT / "sokindex.js").write_text(js, encoding="utf-8", newline="\n")
    print(f"sokindex.js: {len(index)} avsnitt, {len(js) // 1024} kB")

    mål = ROT / "innehall.html"
    if mål.exists():
        text = mål.read_text(encoding="utf-8")
        a, b = "<!-- trad:start -->", "<!-- trad:slut -->"
        if a in text and b in text:
            före, resten = text.split(a, 1)
            _, efter = resten.split(b, 1)
            ny = före + a + "\n" + bygg_trad(sidor) + "\n        " + b + efter
            mål.write_text(ny, encoding="utf-8", newline="\n")
            print("innehall.html: trädet uppdaterat")


if __name__ == "__main__":
    sys.exit(main())
