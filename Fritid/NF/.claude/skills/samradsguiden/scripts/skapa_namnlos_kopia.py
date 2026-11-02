#!/usr/bin/env python3
"""Skapar en publik kopia utan namn av ett yttrande (Word), som Word, Markdown och PDF.

Användning (kör i en terminal, till exempel från skillens mapp):
  python scripts/skapa_namnlos_kopia.py KÄLLA.docx UT_BAS --namn "Förnamn Efternamn" "Förnamn Efternamn" \\
      --stryk-stycke "Vår ordförande" --not "*Version 261102, utan namn …*"

KÄLLA.docx är den slutliga filen med namn (ligger i Diskussion/, som är privat). UT_BAS är sökvägen
utan filändelse, till exempel .../Maxima/Yttrande/Utkast/LNF_yttrande_over_VA_SYD_bemotande_261102_utan_namn.

Vad skriptet gör:
  1. Byter varje angivet namn mot [undertecknare 1], [undertecknare 2] … (i den ordning namnen anges).
     Skriv "Namn=Text" för att välja egen ersättning.
  2. Byter stycken som börjar med --stryk-stycke mot en standardmening om att texten är utelämnad.
  3. Tömmer dokumentegenskaper (författare, senast sparad av, företag) och tar bort mallänken, som kan
     innehålla en användares mappnamn.
  4. Skapar Markdown ur den rensade Word-filen och PDF via Word (om Word finns).
  5. Kör kontrollera_namnlos.py över alla tre filerna. Avslutskod 1 om något hittas.

Flaggor:
  --stryk-stycke TEXT   stycken som börjar med TEXT ersätts (kan anges flera gånger)
  --mening TEXT         ersättningsmening i stället för standardmeningen
  --not TEXT            första raden i Markdown-filen (kursiv anmärkning om versionen)
  --foga ord-ord …      skriv ihop dessa ord i Markdown-filen (radslutsavstavning som ska bort)
  --ingen-pdf           hoppa över PDF
Skriptet ändrar aldrig KÄLLA.docx och committar eller pushar ingenting.
"""
import re
import subprocess
import sys
import tempfile
import zipfile
import shutil
from pathlib import Path

import docx
from docx.oxml.ns import qn
from docx.text.run import Run

sys.path.insert(0, str(Path(__file__).resolve().parent))
import kontrollera_namnlos as kontroll  # noqa: E402

STANDARDMENING = "[Mening om vem som inte får företräda föreningen utelämnad i den publika versionen.]"


def alla_stycken(d):
    for p in d.paragraphs:
        yield p
    for t in d.tables:
        for rad in t.rows:
            for c in rad.cells:
                for p in c.paragraphs:
                    yield p
    for s in d.sections:
        for del_ in (s.header, s.footer, s.first_page_header, s.first_page_footer):
            for p in del_.paragraphs:
                yield p


def ersatt_i_stycke(p, gammal, ny):
    """Byter text även när den delas över flera runs. Formateringen i första berörda run behålls."""
    antal = 0
    while True:
        runs = p.runs
        full = "".join(r.text for r in runs)
        i = full.find(gammal)
        if i < 0:
            return antal
        j, pos, satt = i + len(gammal), 0, False
        for r in runs:
            t = r.text
            s, e = pos, pos + len(t)
            pos = e
            if e <= i or s >= j:
                continue
            a, b = max(i - s, 0), min(j - s, len(t))
            r.text = t[:a] + ("" if satt else ny) + t[b:]
            satt = True
        antal += 1


def rensa_zip(sokvag):
    """Tar bort mallänken (kan innehålla en användares mappnamn) och företagsnamnet."""
    tmp = Path(str(sokvag) + ".tmp")
    with zipfile.ZipFile(sokvag) as zi, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zo:
        rels_att_ta = {}
        for it in zi.infolist():
            if it.filename.endswith("settings.xml.rels"):
                xml = zi.read(it.filename).decode("utf-8")
                ids = re.findall(r'<Relationship [^>]*Id="([^"]+)"[^>]*attachedTemplate[^>]*/>', xml)
                ids += re.findall(r'<Relationship [^>]*attachedTemplate[^>]*Id="([^"]+)"[^>]*/>', xml)
                rels_att_ta[it.filename] = (set(ids), xml)
        for it in zi.infolist():
            data = zi.read(it.filename)
            if it.filename in rels_att_ta:
                ids, xml = rels_att_ta[it.filename]
                for rid in ids:
                    xml = re.sub(r'<Relationship [^>]*Id="%s"[^>]*/>' % re.escape(rid), "", xml)
                if "<Relationship " not in xml:
                    continue
                data = xml.encode("utf-8")
            elif it.filename == "word/settings.xml":
                s = data.decode("utf-8")
                s = re.sub(r"<w:attachedTemplate [^>]*/>", "", s)
                data = s.encode("utf-8")
            elif it.filename == "docProps/app.xml":
                s = data.decode("utf-8")
                s = re.sub(r"<Company>[^<]*</Company>", "<Company></Company>", s)
                data = s.encode("utf-8")
            zo.writestr(it, data)
    shutil.move(str(tmp), str(sokvag))


def stycke_till_md(p):
    runs = [Run(r, p) for r in p._p.iter(qn("w:r"))]
    delar = []
    for r in runs:
        t = r.text
        if not t:
            continue
        fmt = (bool(r.bold), bool(r.italic), r.font.highlight_color is not None)
        if delar and delar[-1][1] == fmt:
            delar[-1][0] += t
        else:
            delar.append([t, fmt])
    # Helt kursiva stycken (brevhuvudet) och rubriker får inte kursiv eller fetstil i Markdown.
    helt_kursivt = bool(delar) and all(f[1][1] for f in delar if f[0].strip())
    rubrik = bool(re.match(r"(?:Heading|Rubrik|Title)", p.style.name if p.style is not None else ""))
    ut = ""
    for t, (b, i, m) in delar:
        if helt_kursivt:
            i = False
        if rubrik:
            b = False
        t = re.sub(r"\t+", " · ", t)
        kärna = t.strip()
        if not kärna:
            ut += t
            continue
        vänster, höger = t[: len(t) - len(t.lstrip())], t[len(t.rstrip()):]
        if m:
            kärna = f"<mark>{kärna}</mark>"
        if b and i:
            kärna = f"***{kärna}***"
        elif b:
            kärna = f"**{kärna}**"
        elif i:
            kärna = f"*{kärna}*"
        ut += vänster + kärna + höger
    ut = re.sub(r"^\s*·\s*", "", ut).strip()
    return re.sub(r"[ \t]*\n[ \t]*\n*", "\n\n", ut)  # radbrytning i stycket blir ett eget stycke


def docx_till_md(d, anmarkning, foga):
    rader = [anmarkning] if anmarkning else []
    if d.tables:
        print("OBS: Word-filen har tabeller, och de tas inte med i Markdown-filen.")
    for p in d.paragraphs:
        text = stycke_till_md(p)
        if not text:
            continue
        stil = p.style.name if p.style is not None else ""
        m = re.match(r"(?:Heading|Rubrik) (\d)", stil)
        if m:
            text = "#" * int(m.group(1)) + " " + text
        elif stil.startswith("List Bullet"):
            text = "- " + text
        elif stil.startswith("List Number"):
            text = "1. " + text
        rader.append(text)
    md = "\n\n".join(rader)
    # Punktlistor ska ligga tätt, utan tomma rader mellan punkterna.
    md = re.sub(r"(\n- [^\n]*)\n\n(?=- )", r"\1\n", md)
    for ord_ in foga:
        md = md.replace(ord_, ord_.replace("-", ""))
    return md + "\n"


def bindestreck_att_granska(d):
    hittade = set()
    for p in d.paragraphs:
        for m in re.finditer(r"\b[a-zåäö]{3,}-[a-zåäö]{3,}\b", p.text):
            hittade.add(m.group(0))
    return sorted(hittade)


def exportera_pdf(docx_sokvag, pdf_sokvag):
    ps = (
        "$ErrorActionPreference='Stop';"
        "$w=New-Object -ComObject Word.Application;$w.Visible=$false;$w.DisplayAlerts=0;"
        "try{$d=$w.Documents.Open('%s',$false,$true);$d.ExportAsFixedFormat('%s',17);$d.Close($false)}"
        "finally{$w.Quit()}" % (str(docx_sokvag).replace("'", "''"), str(pdf_sokvag).replace("'", "''"))
    )
    with tempfile.NamedTemporaryFile("w", suffix=".ps1", delete=False, encoding="utf-8-sig") as f:
        f.write(ps)
        script = f.name
    try:
        r = subprocess.run(["powershell.exe", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", script],
                           capture_output=True, text=True, timeout=180)
        return r.returncode == 0 and Path(pdf_sokvag).exists(), (r.stderr or r.stdout).strip()[:300]
    except Exception as e:
        return False, str(e)
    finally:
        Path(script).unlink(missing_ok=True)


def tolka(args):
    val = {"namn": [], "stryk": [], "foga": [], "mening": STANDARDMENING, "not": "", "pdf": True}
    pos, i = [], 0
    while i < len(args):
        a = args[i]
        if a in ("--namn", "--foga"):
            k = "namn" if a == "--namn" else "foga"
            i += 1
            while i < len(args) and not args[i].startswith("--"):
                val[k].append(args[i]); i += 1
            continue
        if a == "--stryk-stycke":
            val["stryk"].append(args[i + 1]); i += 2; continue
        if a == "--mening":
            val["mening"] = args[i + 1]; i += 2; continue
        if a == "--not":
            val["not"] = args[i + 1]; i += 2; continue
        if a == "--ingen-pdf":
            val["pdf"] = False; i += 1; continue
        pos.append(a); i += 1
    return pos, val


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    pos, v = tolka(sys.argv[1:])
    if len(pos) != 2 or not v["namn"]:
        print(__doc__)
        sys.exit(2)
    källa, bas = Path(pos[0]), Path(pos[1])
    d = docx.Document(str(källa))

    ersättningar = []
    for n, namn in enumerate(v["namn"], 1):
        gammal, _, ny = namn.partition("=")
        ersättningar.append((gammal.strip(), ny.strip() or f"[undertecknare {n}]"))
    stycken = list(alla_stycken(d))
    for gammal, ny in ersättningar:
        antal = sum(ersatt_i_stycke(p, gammal, ny) for p in stycken)
        print(f"Namnet i position {ersättningar.index((gammal, ny)) + 1}: {antal} ställe(n) ersatta med {ny}")
        if antal == 0:
            print(f"  OBS: namnet '{gammal}' hittades inte i texten. Kontrollera stavningen.")
    for prefix in v["stryk"]:
        n = 0
        for p in stycken:
            if p.text.startswith(prefix) and p.runs:
                p.runs[0].text = v["mening"]
                for r in p.runs[1:]:
                    r.text = ""
                n += 1
        print(f"Stycken som börjar med '{prefix}': {n} ersatta")

    cp = d.core_properties
    cp.author = cp.last_modified_by = cp.title = cp.comments = cp.subject = cp.keywords = cp.category = ""
    bas.parent.mkdir(parents=True, exist_ok=True)
    ut_docx = Path(str(bas) + ".docx")
    ut_md, ut_pdf = Path(str(bas) + ".md"), Path(str(bas) + ".pdf")
    d.save(str(ut_docx))
    rensa_zip(ut_docx)
    d = docx.Document(str(ut_docx))

    ut_md.write_text(docx_till_md(d, v["not"], v["foga"]), encoding="utf-8")
    filer = [ut_docx, ut_md]
    if v["pdf"]:
        if ut_pdf.exists():
            ut_pdf.unlink()
        ok, fel = exportera_pdf(ut_docx, ut_pdf)
        if ok:
            filer.append(ut_pdf)
        else:
            print("OBS: PDF kunde inte skapas (Word krävs).", fel)

    granska = bindestreck_att_granska(d)
    if granska:
        print("Granska ord med bindestreck mitt i (kan vara radslutsavstavning som ska skrivas ihop med --foga):")
        print("  " + ", ".join(granska))
    print("Skapade:", *[str(f) for f in filer], sep="\n  ")

    fynd, noter = kontroll.kontrollera(filer, [g for g, _ in ersättningar])
    for n in noter:
        print("OBS:", n)
    if fynd:
        print("NAMNKONTROLL STOPPAD:")
        for f in sorted(set(fynd)):
            print("  -", f)
        sys.exit(1)
    print("Namnkontroll godkänd. Inget är committat eller pushat.")


if __name__ == "__main__":
    main()
