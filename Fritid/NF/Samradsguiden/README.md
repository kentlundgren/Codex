# Samrådsguiden

Ett verktyg för hur privatpersoner och miljöorganisationer kan disponera och lägga upp yttranden och synpunkter under ett samråd — enligt både plan- och bygglagen (PBL) och miljöbalken (MB), med en fördjupad modul om kompensationsåtgärder. Materialet är ett bidrag till fortsatt diskussion, inte ett beslutat ställningstagande, och företräder inte någon organisation.

## Live-sida

[Öppna Samrådsguiden](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/)

Den interaktiva guiden finns direkt på [verktyg.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/verktyg.html), och fördjupningen på [fordjupning.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/fordjupning.html).

**Observera:** `index.html` — sidan länken ovan pekar mot — är under uppbyggnad. Fram tills den är klar är `verktyg.html` den enda sidan som säkert fungerar live.

## Status

PRD och SPEC.md är klara. Den interaktiva guiden (`verktyg.html`) är byggd och testad. `index.html` (kort översikt) och `fordjupning.html` (fullständigt sakinnehåll) återstår.

## Innehåll

- `PRD_samradsguiden.md` — planeringsdokument: mål, avgränsning, innehållslig utgångspunkt (skillnaden mellan PBL och MB), dispositioner per samrådssteg, kompensationsåtgärder-modulen, funktionella och tekniska krav, öppna frågor och källor.
- `SPEC_samradsguiden.md` — teknisk specifikation för genomförande: datamodell för dispositionsmallarna och kompensationsmodulen, formulärlogik, exportlogik, gränsfall och en verifieringschecklista.
- `verktyg.html` — den interaktiva guiden: fem steg (avsändarroll, lagrum, skede, mottagare, kompensationsåtgärder) som genererar en ifyllningsbar mall med sex delar, en sammanställningsvy, samt kopiera- och nedladdningsfunktion.
- `data.js` — all sakdata verktyget använder: de sex dispositionsmallarna (PBL × 3 skeden, MB × 3 skeden) och kompensationsmodulens tre rättsliga spår × två lägen.
- `verktyg.js` — formulärlogiken och exportlogiken bakom `verktyg.html`.
- `index.html`, `fordjupning.html` — under uppbyggnad.
- `styles.css`, `script.js` — delad formgivning och delade komponenter (utfällbara avsnitt, teknikmodal).

## Relation till NCC_stenbryttning

Det här verktyget är fristående och generellt, men bygger vidare på metoden som redan etablerats i `../NCC_stenbryttning/struktur.html` och skillen `../NCC_stenbryttning/Skills/samradsunderlag/`. NCC/Skrylle-ärendet används som konkret exempel där det är pedagogiskt användbart.
