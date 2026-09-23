# Resultaträkning — Lunds Naturskyddsförening

**Live:** [https://kentlundgren.github.io/Codex/Fritid/NF/Kalendern/meetings/260924/Ekonomi/](https://kentlundgren.github.io/Codex/Fritid/NF/Kalendern/meetings/260924/Ekonomi/)
*(publiceras när sidan committats och pushats — GitHub Pages är redan aktiverat för repot)*

Internt arbetsmaterial för styrelsen: en resultaträkning byggd ur föreningens huvudbok,
med cykelkartan och fotoutställningen lyfta fram som egna projekt som har både en
kostnad och en riktad intäkt (ersättning respektive miljöanslag). Sidan är byggd för att
uppdateras period för period — en ny resultaträkning läggs till som en egen datafil,
och väljaren i sidhuvudet låter dig växla mellan tidigare perioder.

## 🗂️ Lokalt repo

Repo-rot lokalt:

`C:\Users\kentl\OneDrive\AI\Codex`

Den här mappen lokalt:

`C:\Users\kentl\OneDrive\AI\Codex\Fritid\NF\Kalendern\meetings\260924\Ekonomi`

På GitHub: <https://github.com/kentlundgren/Codex/tree/main/Fritid/NF/Kalendern/meetings/260924/Ekonomi>

## Innehåll

- `index.html` / `style.css` / `script.js` — statisk sida, inget byggsteg, inget ramverk.
- `data/manifest.json` — lista över vilka perioder som finns (ett datum per resultaträkning).
- `data/<datum>.json` — en resultaträkning per period (intäkter, kostnader, vilka poster som
  hör ihop som "projekt" med både kostnad och riktad intäkt).
- `Huvudbok_260923.docx` — källunderlaget för perioden 2026-09-23, mottaget från
  ekonomiansvarig i styrelsen.

## Så uppdateras sidan med en ny period

Skillet `nf-resultatrakning` (i `Fritid/NF/.claude/skills/`) tar en ny huvudbok/
resultaträkning, stämmer av delsummorna, och lägger till en ny `data/<datum>.json` samt en
rad i `data/manifest.json`. `index.html`, `style.css` och `script.js` behöver inte ändras —
väljaren i sidhuvudet hittar den nya perioden automatiskt.

**Obs vid lokal förhandsvisning:** sidan läser sina datafiler med `fetch`, vilket kräver att
den öppnas via en webbserver (t.ex. `python -m http.server` i den här mappen) — inte genom
att dubbelklicka på `index.html` i Utforskaren. Sidan visar ett tydligt felmeddelande om
den ändå öppnas så.

## Publicering

Kent committar och pushar den här sidan själv via Cursor.
