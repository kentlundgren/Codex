# Codex — projektinstruktioner

## Publicerade live-sidor

- Varje publicerad live-sida ska ha en diskret GitHub-länk nere till vänster som leder tillbaka till det repo där sidan finns.
- Varje publicerad live-sida ska ha en diskret teknikknapp nere till höger. Den öppnar en tangentbordsanpassad modal med teknikval och en förenklad filstruktur för det aktuella projektet.
- README-filen för varje publicerat sidprojekt ska innehålla en tydlig länk till sidans live-URL.
- Använd GitHub Pages-URL enligt mönstret `https://kentlundgren.github.io/Codex/<sökväg>/` när sidan ligger i detta repo.
- Länka till `.md`-filer i repot via GitHub:s blob-vy (`https://github.com/kentlundgren/Codex/blob/main/<sökväg>`), inte via GitHub Pages-URL:en. Pages visar filen som oformaterad rå text; blob-vyn renderar Markdown-formateringen och blir lättare att läsa. Gäller bara `.md`-filer — publicerade `.html`-sidor länkas fortfarande via Pages-URL:en.

## Källor och referenser

- När ett material bygger på ett huvuddokument ska det dokumentet tydligt markeras i källförteckningen som huvudkälla. Skriv dokumentets roll först i källnotisen, gärna med fetstil, till exempel: "Samrådsunderlaget – primärkälla till verksamhetsförslaget".
- I käll- och referensförteckningar ska hela den kanoniska URL:en synas som klickbar länktext; använd inte kortformer som "PDF", ett domännamn eller "läs mer" där.
- Före överlämning ska varje extern länk som är ny, ändrad eller berörs av ändringen kontrolleras: den ska öppna rätt sida eller dokument, och avsändare, titel och innehåll ska stödja hänvisningen. Ersätt eller markera en länk som inte går att verifiera.

- Använd Harvardstil för alla referenser och källförteckningar i projektets material.
- Varje webbaserad referens ska innehålla en fungerande direktlänk och hämtdatum.
- Varje referens ska avslutas med en kort källnotis inom parentes som beskriver källtypen och/eller varför den är relevant.
- Kontrollera att nya eller ändrade länkar fungerar och stödjer det påstående de används för innan materialet lämnas över.
- Använd löpande Harvardhänvisningar i texten när sakpåståenden bygger på en extern källa.
- Skriv inte ut i det färdiga materialet att referenserna följer Harvardstil eller att källnotiserna förklarar källans relevans; formatet ska vara självbärande.

## Samarbete

Projektet kan samtidigt öppnas och ändras i Cursor av användaren. Kontrollera därför berörda filer före ändring, bevara externa ändringar och skriv aldrig över eller återställ ändringar som inte är mina utan uttryckligt klartecken.

- När uppdragets innebörd, avgränsning, källstatus eller önskat resultat är otydligt ska Codex fråga användaren innan arbetet går vidare. Målet är att användaren och Codex har samma bild av den faktiska situationen och av vad som ska göras.

## Utkast och AI

- Skriv inte i projektets material att en text är AI-assisterad, AI-genererad eller motsvarande. När innehållet inte är beslutat, kvalitetssäkrat eller antaget ska det i stället sakligt beskrivas som ett utkast eller ett bidrag till fortsatt diskussion.

## Delade skills

- Skillen för samrådsunderlag flyttades i september 2026 till `../Samradsguiden/Skills/samradsguiden/` och heter nu `samradsguiden` — den täcker både PBL och MB, och används både för yttranden i det här ärendet och för webbverktyget Samrådsguiden.
- `Skills/samradsunderlag/` i den här mappen är kvar bara som en kort hänvisning dit och uppdateras inte längre.
- Installerade kopior: Claude Code i `../.claude/skills/samradsguiden/` (projektscope för hela `Fritid/NF/`), Codex i `C:\Users\kentl\.codex\skills\samradsguiden\`.
- När någon fil i den synliga projektkopian (`Samradsguiden/Skills/samradsguiden/`) ändras ska båda installerade kopior uppdateras i samma arbetsuppgift, och innehållet jämföras så att alla tre är identiska.
