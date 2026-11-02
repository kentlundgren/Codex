#!/usr/bin/env python3
"""PostToolUse-hook för Bash: kontrollerar kopiorna utan namn efter att ett kommando rört dem.

Word- och PDF-filer skapas av skript och inte med Write eller Edit, så publik_kontroll_hook.py ser dem
inte. Den här hooken körs efter varje Bash-kommando, men gör bara något när kommandot nämner
"utan_namn" eller Maxima/Yttrande. Då kontrolleras alla filer med "utan_namn" i namnet i
Maxima/Yttrande/Utkast/ (docx, md, pdf) med kontrollera_namnlos.py i skillen samradsguiden.
Vid fynd får Claude en blockering med skälet, så att namnen tas bort innan något publiceras.
"""
import json
import subprocess
import sys
from pathlib import Path

NF = Path(__file__).resolve().parents[2]
KONTROLL = NF / "Samradsguiden" / "Skills" / "samradsguiden" / "scripts" / "kontrollera_namnlos.py"
MAPP = NF / "Maxima" / "Yttrande" / "Utkast"
NYCKLAR = ("utan_namn", "Maxima/Yttrande", "Maxima\\Yttrande")


def main():
    try:
        data = json.loads(sys.stdin.buffer.read().decode("utf-8"))
    except Exception:
        return
    kommando = (data.get("tool_input") or {}).get("command", "")
    if not any(n in kommando for n in NYCKLAR) or not KONTROLL.exists() or not MAPP.exists():
        return
    filer = sorted(str(p) for p in MAPP.glob("*utan_namn*") if p.suffix.lower() in (".docx", ".md", ".pdf"))
    if not filer:
        return
    try:
        r = subprocess.run([sys.executable, "-X", "utf8", str(KONTROLL), *filer],
                           capture_output=True, timeout=50)
    except Exception:
        return
    if r.returncode == 1:
        text = r.stdout.decode("utf-8", "ignore").strip()
        print(json.dumps({
            "decision": "block",
            "reason": "Kopior utan namn i Maxima/Yttrande/Utkast/ innehåller möjliga namn eller spår av avsändaren. "
                      "Rätta innan något committas eller pushas, till exempel med skapa_namnlos_kopia.py.\n" + text,
        }))


if __name__ == "__main__":
    main()
