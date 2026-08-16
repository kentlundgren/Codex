# Samrådsguiden

Ett verktyg för hur privatpersoner och miljöorganisationer kan disponera och lägga upp yttranden och synpunkter under ett samråd — enligt både plan- och bygglagen (PBL) och miljöbalken (MB), med en fördjupad modul om kompensationsåtgärder. Materialet är ett bidrag till fortsatt diskussion, inte ett beslutat ställningstagande, och företräder inte någon organisation.

## Live-sida

[Öppna Samrådsguiden](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/)

Fördjupningen finns på [fordjupning.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/fordjupning.html), och den interaktiva guiden på [verktyg.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/verktyg.html).

## Status

PRD, SPEC.md och samtliga tre sidor är byggda och testade lokalt (formulärflöde, alla villkorliga fält, kopiera- och nedladdningsfunktion, accordion-komponenter). Innehållsproduktionen har några kvarvarande öppna frågor, se `PRD_samradsguiden.md`, avsnitt 13 — bland annat en fungerande länk till Naturvårdsverkets Handbok 2016:1 och en genomgång av fler fall i Miljösamverkan Sveriges erfarenhetsbank.

Sidorna är ett levande dokument och versionsnumreras i sidfoten på var och en. **Version 1.1**, senast ändrad 16 augusti 2026. v1.0 var den första publicerade versionen (grunddispositionen, kompensationsmodulens tre spår, det interaktiva verktyget); v1.1 lade till jämförelsen av de tre sätten att disponera ett yttrande och de fyra kommunexemplen. Tumregel för framtida ändringar: innehållstillägg höjer siffran efter punkten (1.1 → 1.2), en grundläggande omstrukturering av hela verktyget höjer heltalet (1.x → 2.0).

## Innehåll

- `PRD_samradsguiden.md` — planeringsdokument: mål, avgränsning, innehållslig utgångspunkt (skillnaden mellan PBL och MB), dispositioner per samrådssteg, kompensationsåtgärder-modulen, funktionella och tekniska krav, öppna frågor och källor.
- `SPEC_samradsguiden.md` — teknisk specifikation för genomförande: datamodell för dispositionsmallarna och kompensationsmodulen, formulärlogik, exportlogik, gränsfall och en verifieringschecklista.
- `index.html` — kort översikt: grundprincipen, jämförelsetabell PBL/MB, de tre skedena, och en introduktion till kompensationsmodulen.
- `fordjupning.html` — fullständigt sakinnehåll: alla sex dispositionsmallar, hela kompensationsmodulen (rättsligt läge, skadelindringshierarkin, svenska och internationella exempel, metoden för konstruktiva förslag), de två konkreta exemplen, och källförteckning.
- `verktyg.html` — den interaktiva guiden: fem steg (avsändarroll, lagrum, skede, mottagare, kompensationsåtgärder) som genererar en ifyllningsbar mall med sex delar, en sammanställningsvy, samt kopiera- och nedladdningsfunktion.
- `data.js` — all sakdata verktyget använder: de sex dispositionsmallarna (PBL × 3 skeden, MB × 3 skeden) och kompensationsmodulens tre rättsliga spår × två lägen.
- `verktyg.js` — formulärlogiken och exportlogiken bakom `verktyg.html`.
- `styles.css`, `script.js` — delad formgivning och delade komponenter (utfällbara avsnitt, teknikmodal).

## Relation till NCC_stenbryttning

Det här verktyget är fristående och generellt, men bygger vidare på metoden som redan etablerats i `../NCC_stenbryttning/struktur.html` och skillen `../NCC_stenbryttning/Skills/samradsunderlag/`. NCC/Skrylle-ärendet används som konkret exempel där det är pedagogiskt användbart.
