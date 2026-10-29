#!/usr/bin/env python3
"""PostToolUse-hook: bygger om sökindexet i Samrådsguiden efter att en sida där ändrats.

Claude Code skickar en JSON på stdin, till exempel
  {"tool_name": "Edit", "tool_input": {"file_path": "C:\\...\\Samradsguiden\\maxima.html", ...}}
Hooken gör något bara när filen ligger i Fritid/NF/Samradsguiden/ och är .html eller .md.
Svaret är en JSON på stdout; "systemMessage" visas för användaren.
"""
import json
import subprocess
import sys
from pathlib import Path

RENT = "/Fritid/NF/Samradsguiden/"
SKRIPT = Path(__file__).resolve().parents[2] / "Samradsguiden" / "bygg_sokindex.py"


def main():
    try:
        data = json.loads(sys.stdin.buffer.read().decode("utf-8"))
    except Exception:
        return
    fil = (data.get("tool_input") or {}).get("file_path", "")
    sokvag = fil.replace("\\", "/")
    if RENT not in sokvag or not sokvag.lower().endswith((".html", ".md")):
        return
    if sokvag.endswith("/sokindex.js"):
        return
    res = subprocess.run(
        [sys.executable, "-X", "utf8", str(SKRIPT)],
        capture_output=True, text=True, encoding="utf-8", timeout=50,
    )
    if res.returncode == 0:
        msg = "Sökindexet i Samrådsguiden är ombyggt efter ändring av " + Path(fil).name
    else:
        msg = "bygg_sokindex.py misslyckades: " + (res.stderr or res.stdout).strip()[-300:]
    print(json.dumps({"systemMessage": msg}))


if __name__ == "__main__":
    main()
