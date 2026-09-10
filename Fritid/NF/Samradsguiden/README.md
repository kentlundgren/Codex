# Samrådsguiden

Ett verktyg för hur privatpersoner och miljöorganisationer kan disponera och lägga upp yttranden och synpunkter under ett samråd — enligt både plan- och bygglagen (PBL) och miljöbalken (MB), med en fördjupad modul om kompensationsåtgärder, ett strategilager om hur man påverkar i rätt tid, och de tio viktigaste lagtexterna ordagrant. Materialet är ett bidrag till fortsatt diskussion, inte ett beslutat ställningstagande, och företräder inte någon organisation.

## Live-sida

[Öppna Samrådsguiden](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/)

- Så påverkar vi: [paverka.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/paverka.html)
- Dispositionerna (fördjupning): [fordjupning.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/fordjupning.html)
- Lagtexterna: [lagtexter.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/lagtexter.html)
- Bygg ditt yttrande (interaktiv guide): [verktyg.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/verktyg.html)

## Lokal sökväg

`C:\Users\kentl\OneDrive\AI\Codex\Fritid\NF\Samradsguiden\` — i repot `kentlundgren/Codex`, mappen `Fritid/NF/Samradsguiden/`.

## Status

PRD, SPEC och samtliga fem sidor är byggda och testade lokalt (formulärflöde, alla villkorliga fält, kopiera- och nedladdningsfunktion, accordion-komponenter, toppmeny, tidslinjer). Innehållsproduktionen har några kvarvarande öppna frågor för kompensationsmodulen, se `PRD_samradsguiden.md`, avsnitt 13.

Ankar-retrofit av `index.html` och `fordjupning.html` är gjord (varje H2 och `.subhead`-H3 har ett stabilt `#`-ankare). `verktyg.html` är en JS-guide där stegen har egna div-id:n och behöver inga rubrikankare.

Sidorna är ett levande dokument och versionsnumreras i sidfoten på var och en. **Version 1.7**, senast ändrad 10 september 2026.

- **v1.0** — första publicerade versionen: grunddispositionen, kompensationsmodulens tre spår, det interaktiva verktyget.
- **v1.1** — jämförelsen av de tre sätten att disponera ett yttrande; de fyra kommunexemplen.
- **v1.2** — översiktsplanen (PBL 3 kap.) som två egna dispositionsmallar; skillnaden mellan miljöbedömning och miljökonsekvensbeskrivning.
- **v1.3** — rättade en missvisande symmetri i MB-sidans skeden: lade till det villkorade undersökningssamrådet och gjorde tydligt att bara avgränsningssamrådet är ett ordinarie, alltid lagstadgat samråd.
- **v1.4** — gjorde startsidans text om de tre dispositionssätten neutral; navigeringsknapp tillbaka till startsidan; svepnavigering på mobil; tog bort en död länk (Solna stad 2024).
- **v1.5** — rättade ytterligare en död länk (Boverkets kompensationsexempel) och kontrollerade samtliga externa källor.
- **v1.6** — rättade grundorsaken till ett länkfel: `.md`-filer med YAML-frontmatter (som `SKILL.md`) 404:ar på GitHub Pages eftersom Jekyll bygger om dem till `.html`, så interna länkar till PRD/SKILL-filer pekar nu på GitHub:s blob-vy.
- **v1.7** — lade till strategilagret *Så påverkar vi* (`paverka.html`) med tre vertikala tidslinjer och en anknytning till Lunds kommuns process, samt sidan *Lagtexterna* (`lagtexter.html`) med de tio viktigaste lagtexterna ordagrant, verifierade mot riksdagen.se och Regeringskansliets rättsdatabas 10 september 2026. En gemensam toppmeny lades till på alla fem sidor, och `index.html` och `fordjupning.html` fick djuplänkbara rubrikankare.

Tumregel för framtida ändringar: innehållstillägg höjer siffran efter punkten (1.1 → 1.2), en grundläggande omstrukturering av hela verktyget höjer heltalet (1.x → 2.0).

## Innehåll

- `PRD_samradsguiden.md` — planeringsdokument för grundverktyget: mål, avgränsning, skillnaden mellan PBL och MB, dispositioner per samrådssteg, kompensationsmodulen, funktionella och tekniska krav, öppna frågor och källor.
- `PRD_samradsguiden_fordjupning.md` — planeringsdokument för tillägget i v1.7 (strategilagret och lagtexterna).
- `SPEC_samradsguiden.md` — teknisk specifikation för grundverktyget: datamodell, formulärlogik, exportlogik, gränsfall, verifieringschecklista.
- `SPEC_lagtexter.md` — teknisk specifikation för `lagtexter.html` och `paverka.html`: urval av de tio posterna, HTML-mallar, CSS-tillägg, tidslinjernas innehåll, Lund-anknytningen, källhantering.
- `index.html` — kort översikt: grundprincipen, jämförelsetabell PBL/MB, de tre skedena, introduktion till kompensationsmodulen.
- `paverka.html` — strategilagret: vilken lag som styr när kommunen antar en plan respektive när ett bolag söker tillstånd, tre vertikala tidslinjer över när synpunkter kan lämnas, klagorättsregeln, miljöorganisationers talerätt, och en ruta om hur Lunds kommun beskriver processen.
- `fordjupning.html` — fullständigt sakinnehåll: alla dispositionsmallar, hela kompensationsmodulen, de två konkreta exemplen, källförteckning.
- `lagtexter.html` — de tio viktigaste lagtexterna ordagrant, med källa och datum, en förklaring i klartext bakom ett klick per post, en ordlista och en bakgrundsruta om Århuskonventionen.
- `verktyg.html` — den interaktiva guiden: fem steg som genererar en ifyllningsbar mall med sex delar, sammanställningsvy, kopiera- och nedladdningsfunktion.
- `data.js` — all sakdata verktyget använder: dispositionsmallarna och kompensationsmodulens spår.
- `verktyg.js` — formulärlogiken och exportlogiken bakom `verktyg.html`.
- `styles.css`, `script.js` — delad formgivning och delade komponenter (toppmeny, utfällbara avsnitt, teknikmodal, tidslinjer, direktlänkshantering).

## Djuplänkar

Varje H2 och H3 på sidorna har ett stabilt `#`-ankare. Hovra över en rubrik och klicka på `#` för att kopiera länken till just det avsnittet. Ankar-id:n är oföränderliga efter publicering och listas inte här.

## Relation till NCC_stenbryttning

Det här verktyget är fristående och generellt, men bygger vidare på metoden som redan etablerats i `../NCC_stenbryttning/struktur.html` och skillen `../NCC_stenbryttning/Skills/samradsunderlag/`. NCC/Skrylle-ärendet används som konkret exempel där det är pedagogiskt användbart.
