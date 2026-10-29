#!/usr/bin/env python3
"""PreToolUse-hook: stoppar skrivning av personuppgifter i publika filer.

Gäller bara filer i Samradsguiden/ och Maxima/Struktur/ (de publicerade mapparna), inte i
Diskussion/ eller privat/. Kontrollerar den text som ska skrivas (Write: content, Edit: new_string).
Stoppar vid e-postadress, telefonnummer, personnummer och namn i den privata namnlistan.

Namnlistan ligger utanför repot så att namnen aldrig hamnar på GitHub:
  C:\\Users\\<användare>\\.claude\\nf_privata_namn.txt   (ett efternamn eller fullständigt namn per rad)
"""
import json
import re
import sys
from pathlib import Path

PUBLIKA = ("/Fritid/NF/Samradsguiden/", "/Fritid/NF/Maxima/Struktur/")
PRIVATA = ("/Diskussion/", "/privat/")
NAMNLISTA = Path.home() / ".claude" / "nf_privata_namn.txt"

# Samma mönster som .githooks/check-public-documents.ps1, utom personnumret som här kräver bindestreck.
MONSTER = [
    ("e-postadress", re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)),
    ("telefonnummer", re.compile(r"(?<!\d)(?:\+46\s?|0)\d{1,3}[\s-]?\d{2,3}[\s-]?\d{2}[\s-]?\d{2}(?!\d)")),
    ("personnummer", re.compile(r"\b(?:19|20)?\d{6}-\d{4}\b")),
]


def namn():
    try:
        rader = NAMNLISTA.read_text(encoding="utf-8").splitlines()
    except OSError:
        return []
    return [r.strip() for r in rader if r.strip() and not r.startswith("#")]


def ny_text(ti):
    delar = [ti.get("content", ""), ti.get("new_string", "")]
    for e in ti.get("edits") or []:
        delar.append(e.get("new_string", ""))
    return "\n".join(d for d in delar if d)


def main():
    try:
        data = json.loads(sys.stdin.buffer.read().decode("utf-8"))
    except Exception:
        return
    ti = data.get("tool_input") or {}
    sokvag = ti.get("file_path", "").replace("\\", "/")
    if not any(p in sokvag for p in PUBLIKA) or any(p in sokvag for p in PRIVATA):
        return
    text = ny_text(ti)
    fynd = []
    for etikett, mönster in MONSTER:
        m = mönster.search(text)
        if m:
            fynd.append(f"{etikett} ({m.group(0)})")
    for n in namn():
        if re.search(r"\b" + re.escape(n) + r"\b", text, re.I):
            fynd.append(f"namn i den privata namnlistan ({n})")
    if fynd:
        skäl = (
            "Publik fil i " + Path(sokvag).name + ": texten innehåller " + "; ".join(fynd) + ". "
            "Publika sidor ska bara ha roller, inte personnamn eller kontaktuppgifter. "
            "Skriv om med roll (till exempel 'en medlem') eller lägg materialet i Diskussion/ eller privat/."
        )
        print(json.dumps({"hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": skäl,
        }}))


if __name__ == "__main__":
    main()
