#!/usr/bin/env python3
"""Kontrollerar att en publik kopia "utan namn" verkligen saknar namn och spår av avsändaren.

Användning:
  python kontrollera_namnlos.py fil1.docx fil2.md fil3.pdf [--namn "Förnamn Efternamn" ...]

Kontrollerar per filtyp:
  .docx  alla XML-delar (text, sidhuvud, sidfot, egenskaper, relationer), författare i dokumentegenskaper,
         företagsnamn, mallänk till en dators mapp, kommentarer och spårade ändringar med författare
  .pdf   författare i metadata, samt texten om pdftotext finns
  .md .txt .html   texten

I alla filer: namn i den privata namnlistan, e-postadress, telefonnummer och personnummer.
Undantag: föreningens allmänna adress i brevmallens sidfot (se TILLATNA_ADRESSER).
Namnlistan ligger utanför repot, så att namnen aldrig hamnar på GitHub:
  ~/.claude/nf_privata_namn.txt   (ett efternamn eller fullständigt namn per rad, # börjar en kommentar)

Avslutskod 0 = inga fynd, 1 = fynd. Används av skapa_namnlos_kopia.py, av hooken i Claude Code och
av .githooks/check-public-documents.ps1.
"""
import html
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

NAMNLISTA = Path.home() / ".claude" / "nf_privata_namn.txt"
MONSTER = [
    ("e-postadress", re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)),
    ("telefonnummer", re.compile(r"(?<!\d)(?:\+46\s?|0)\d{1,3}[\s-]?\d{2,3}[\s-]?\d{2}[\s-]?\d{2}(?!\d)")),
    ("personnummer", re.compile(r"\b(?:19|20)?\d{6}-\d{4}\b")),
]
# Föreningens allmänna adress står i sidfoten på brevmallen och är publik (finns på föreningens webbplats).
TILLATNA_ADRESSER = {"lund@naturskyddsforeningen.se"}
PDFTOTEXT = [shutil.which("pdftotext"), r"C:\Program Files\Git\mingw64\bin\pdftotext.exe"]


def las_namnlista():
    try:
        rader = NAMNLISTA.read_text(encoding="utf-8").splitlines()
    except OSError:
        return []
    return [r.strip() for r in rader if r.strip() and not r.startswith("#")]


def namn_i(text, namn):
    return [n for n in namn if re.search(r"(?<!\w)" + re.escape(n) + r"(?!\w)", text, re.I)]


def monster_i(text):
    fynd = []
    for etikett, rx in MONSTER:
        for m in rx.finditer(text):
            if m.group(0).lower() in TILLATNA_ADRESSER:
                continue
            fynd.append(f"{etikett} ({m.group(0)})")
            break
    return fynd


def docx_text(xml):
    return html.unescape(" ".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", xml)))


def kontrollera_docx(sokvag, namn, fynd):
    with zipfile.ZipFile(sokvag) as z:
        for del_namn in z.namelist():
            if not del_namn.endswith((".xml", ".rels")):
                continue
            xml = z.read(del_namn).decode("utf-8", "ignore")
            for n in namn_i(html.unescape(xml), namn):
                fynd.append(f"{sokvag.name}: namnet '{n}' finns i {del_namn}")
            if del_namn.startswith("word/") and del_namn.endswith(".xml"):
                for f in monster_i(docx_text(xml)):
                    fynd.append(f"{sokvag.name}: {f} i {del_namn}")
            if "w:author=" in xml and re.search(r'w:author="[^"]+"', xml):
                fynd.append(f"{sokvag.name}: {del_namn} har kommentarer eller spårade ändringar med författare")
            if del_namn.endswith(".rels"):
                for mal in re.findall(r'Target="([^"]+)"[^>]*TargetMode="External"', xml):
                    if re.search(r"(?i)users[\\/%]", mal) or mal.lower().startswith("file:"):
                        fynd.append(f"{sokvag.name}: länk till en dators mapp i {del_namn} ({mal[:60]})")
        if "docProps/core.xml" in z.namelist():
            core = z.read("docProps/core.xml").decode("utf-8", "ignore")
            for tagg in ("dc:creator", "cp:lastModifiedBy"):
                m = re.search(rf"<{tagg}>([^<]+)</{tagg}>", core)
                if m and m.group(1).strip():
                    fynd.append(f"{sokvag.name}: dokumentegenskapen {tagg} är ifylld")
        if "docProps/app.xml" in z.namelist():
            app = z.read("docProps/app.xml").decode("utf-8", "ignore")
            m = re.search(r"<Company>([^<]+)</Company>", app)
            if m and m.group(1).strip():
                fynd.append(f"{sokvag.name}: dokumentegenskapen Company är ifylld")


def pdf_text(sokvag):
    for exe in PDFTOTEXT:
        if exe and Path(exe).exists():
            try:
                return subprocess.run([exe, "-layout", str(sokvag), "-"], capture_output=True,
                                      timeout=60).stdout.decode("utf-8", "ignore")
            except Exception:
                return None
    return None


def kontrollera_pdf(sokvag, namn, fynd, noter):
    raw = sokvag.read_bytes()
    for m in re.finditer(rb"/(Author|Creator|Producer)\s*\(([^)]*)\)", raw):
        if m.group(1) == b"Author" and m.group(2).strip():
            fynd.append(f"{sokvag.name}: PDF-metadata Author är ifylld")
    for m in re.finditer(rb"/Author\s*<([0-9A-Fa-f]+)>", raw):
        if len(m.group(1)) > 4:
            fynd.append(f"{sokvag.name}: PDF-metadata Author är ifylld")
    text = pdf_text(sokvag)
    if text is None:
        noter.append(f"{sokvag.name}: PDF-texten kunde inte läsas (pdftotext saknas), bara metadata kontrollerad")
        return
    for n in namn_i(text, namn):
        fynd.append(f"{sokvag.name}: namnet '{n}' finns i PDF-texten")
    for f in monster_i(text):
        fynd.append(f"{sokvag.name}: {f} i PDF-texten")


def kontrollera(sokvagar, extra_namn=()):
    namn = las_namnlista() + [n for n in extra_namn if n]
    fynd, noter = [], []
    if not las_namnlista():
        noter.append(f"Namnlistan {NAMNLISTA} saknas eller är tom, så bara angivna namn och mönster kontrolleras")
    for s in sokvagar:
        p = Path(s)
        if not p.exists():
            fynd.append(f"{p.name}: filen finns inte")
            continue
        ext = p.suffix.lower()
        if ext == ".docx":
            kontrollera_docx(p, namn, fynd)
        elif ext == ".pdf":
            kontrollera_pdf(p, namn, fynd, noter)
        elif ext in (".md", ".txt", ".html"):
            text = p.read_text(encoding="utf-8", errors="ignore")
            for n in namn_i(text, namn):
                fynd.append(f"{p.name}: namnet '{n}' finns i texten")
            for f in monster_i(text):
                fynd.append(f"{p.name}: {f}")
        else:
            noter.append(f"{p.name}: filtypen {ext} kontrolleras inte")
    return fynd, noter


def main():
    args = sys.argv[1:]
    extra, filer, i = [], [], 0
    while i < len(args):
        if args[i] == "--namn":
            i += 1
            while i < len(args) and not args[i].startswith("--"):
                extra.append(args[i]); i += 1
        else:
            filer.append(args[i]); i += 1
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    fynd, noter = kontrollera(filer, extra)
    for n in noter:
        print("OBS:", n)
    if fynd:
        print("NAMNKONTROLL STOPPAD: möjliga namn eller spår av avsändaren hittades.")
        for f in sorted(set(fynd)):
            print("  -", f)
        sys.exit(1)
    print(f"Namnkontroll godkänd för {len(filer)} fil(er).")


if __name__ == "__main__":
    main()
