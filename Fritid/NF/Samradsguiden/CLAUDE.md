# Samrådsguiden — projektinstruktioner (Claude Code)

Den här filen gäller för arbete i `Fritid/NF/Samradsguiden/`. Den kompletterar (ersätter inte) den globala `CLAUDE.md` och skillen `kent-meta-regler-for-code`. En identisk fil, `AGENTS.md`, finns i samma mapp för Codex och Cursor — håll de två i synk när någon av dem ändras.

## Vad Samrådsguiden är

Ett generellt verktyg för hur privatpersoner och miljöorganisationer kan disponera och lägga upp yttranden och synpunkter under ett samråd — enligt både plan- och bygglagen (PBL) och miljöbalken (MB). Se `PRD_samradsguiden.md` (mål, avgränsning, innehållslig utgångspunkt) och `SPEC_samradsguiden.md` (datastruktur och formulärlogik för den interaktiva delen) för det fullständiga underlaget innan större ändringar görs.

## Metodiken bor i en skill

Den faktiska metodiken — sexdelsdispositionen, de tre sätten att ordna synpunkter, samrådsstegen för PBL och MB, kompensationsåtgärdernas tre rättsliga spår — finns inte upprepad här, utan i [`Skills/samradsguiden/SKILL.md`](Skills/samradsguiden/SKILL.md). Läs och applicera den skillen vid allt arbete som rör att strukturera ett samrådsyttrande eller skriva Samrådsguidens eget innehåll.

Skillen har tre kopior som ska hållas identiska:

- Projektets synliga kopia: `Skills/samradsguiden/` (den här mappen).
- Claude Code, projektscope för hela `Fritid/NF/`: `../.claude/skills/samradsguiden/`.
- Codex: `C:\Users\kentl\.codex\skills\samradsguiden\`.

När en fil i skillen ändras, uppdatera de andra två kopiorna i samma arbetsuppgift och jämför innehållet så att alla tre är identiska.

## Publicerade live-sidor

- Varje publicerad live-sida ska ha en diskret GitHub-länk nere till vänster som leder tillbaka till det repo där sidan finns.
- Varje publicerad live-sida ska ha en diskret teknikknapp nere till höger, med en tangentbordsanpassad modal och en förenklad filstruktur för projektet.
- README-filen ska innehålla en tydlig länk till sidans live-URL: `https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/`.

## Källor och referenser

- Använd Harvardstil för alla referenser och källförteckningar.
- I käll- och referensförteckningar ska hela den kanoniska URL:en synas som klickbar länktext — inte kortformer som "PDF", ett domännamn eller "läs mer".
- Varje webbaserad referens ska ha en fungerande direktlänk och hämtdatum, samt en kort källnotis inom parentes som beskriver källtypen och/eller relevansen.
- Kontrollera varje ny, ändrad eller berörd extern länk innan överlämning: den ska öppna rätt sida eller dokument, och avsändare, titel och innehåll ska stödja hänvisningen. Ersätt eller markera en länk som inte går att verifiera — se PRD:ns avsnitt 13 (öppna frågor) för flera tidigare exempel på länkar som slutat fungera.
- Skriv inte ut i det färdiga materialet att referenserna följer Harvardstil eller att källnotiserna förklarar källans relevans; formatet ska vara självbärande.

## Samarbete

Kent arbetar parallellt med Claude Code och Cursor i det här projektet — ibland samtidigt, som när den här filen togs fram. Projektet kan alltså vara öppet och ändras i Cursor medan du arbetar i det. Kontrollera därför berörda filer före ändring, bevara externa ändringar och skriv aldrig över eller återställ ändringar som inte är dina utan uttryckligt klartecken.

När uppdragets innebörd, avgränsning, källstatus eller önskat resultat är otydligt, fråga Kent innan arbetet går vidare. Målet är att ha samma bild av den faktiska situationen och av vad som ska göras.

## Utkast och AI

Skriv inte i projektets material att en text är AI-assisterad, AI-genererad eller motsvarande. När innehållet inte är beslutat, kvalitetssäkrat eller antaget ska det i stället sakligt beskrivas som ett utkast eller ett bidrag till fortsatt diskussion.

## Git

Kent committar och pushar själv via Cursor som huvudregel. Claude Code gör det bara på uttrycklig begäran (t.ex. vid krångel). Read-only git-kommandon (status, diff, log, remote -v, fetch) är alltid okej.
