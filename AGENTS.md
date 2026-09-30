# Codex — projektinstruktioner

## Publicerade live-sidor

- Varje publicerad live-sida ska ha en diskret GitHub-länk nere till vänster som leder tillbaka till det repo där sidan finns.
- Varje publicerad live-sida ska ha en diskret teknikknapp nere till höger. Den öppnar en tangentbordsanpassad modal med teknikval och en förenklad filstruktur för det aktuella projektet.
- Länkar till pdf:er och andra dokument ska öppnas direkt i webbläsaren, inte laddas ned. Ta därför bort nedladdningsparametrar som `?downloadMode=download` eller `?downloadMode=open` (och motsvarande `download=`, `attachment`) från webbadressen. Exempel: `https://moten.lund.se/.../agenda/lundaeko-2021-2030pdf` och inte `.../lundaeko-2021-2030pdf?downloadMode=download`. Gäller både länken och den utskrivna adressen i källförteckningen. Kontrollera att adressen utan parameter fortfarande fungerar.
- README-filen för varje publicerat sidprojekt ska innehålla en tydlig länk till sidans live-URL.
- Sidor ska ha djuplänkbara `#`-ankare på H2 och H3. Lista inte alla ankare i README som standard. Fråga först. Ett fåtal kan vara ok.
- På nya sidor, och på sidor som ändras väsentligt, ska ankaret (`#`-länken) alltid vara synligt i eller direkt efter rubriken, inte bara framträda vid hover. Det gör att en besökare kan se och kopiera direktlänken. Äldre sidor ändras inte retroaktivt utan att Kent ber om det.
- Använd GitHub Pages-URL enligt mönstret `https://kentlundgren.github.io/Codex/<sökväg>/` när sidan ligger i detta repo.
- Länka till `.md`-filer i repot via GitHub:s blob-vy (`https://github.com/kentlundgren/Codex/blob/main/<sökväg>`), inte via GitHub Pages-URL:en. Pages visar filen som oformaterad rå text; GitHub:s blob-vy renderar Markdown-formateringen och blir lättare att läsa. Gäller specifikt `.md`-filer — publicerade `.html`-sidor länkas fortfarande via Pages-URL:en enligt regeln ovan.

## README-filer

- Bedöm alltid om berörda README-filer behöver uppdateras när ett projekt får nytt eller väsentligt ändrat innehåll, en ny live-sida, nya användningsinstruktioner eller ändrad filstruktur.
- Uppdatera projektets och, när det är relevant, repoets övergripande README med kort och neutral information samt länkar som hjälper läsaren att hitta projektet.

## Publiceringskontroll

- Innan material publiceras, committas eller pushas ska publicerade huvuddokument kontrolleras för personnamn, kontaktuppgifter, personnummer, privata arbetsanteckningar och annan information som inte är avsedd för offentlig spridning.
- För projektet NCC_stenbryttning ska `index.html` och `samrad.md` alltid granskas med projektets Git-kontroll före commit och push. Automatisk kontroll fångar e-postadresser, telefonnummer, personnummer och privata markeringar; en manuell rimlighetskontroll krävs också för sådant som inte säkert kan upptäckas automatiskt, exempelvis namn i löpande text.
- Mappen `Fritid/NF/NCC_stenbryttning/underlag_internt/` innehåller internt arbetsmaterial och får aldrig committas eller pushas. Den ska vara ignorerad av Git och spärrad både vid commit och push.
- Personliga inlägg och synpunkter från enskilda medlemmar läggs i en mapp som heter `Underlag_synpunkter/`, eller får ett filnamn som slutar på `_inlagg`. De får aldrig committas eller pushas. Mappnamnet och filnamnet är ignorerade av Git och spärrade både vid commit och push, för alla filtyper.
- Mappen `Fritid/NF/Plangruppen/Mail/` innehåller intern mejlväxling. Den committas bara i ett eget lokalt Git-repo utan fjärranslutning, och får aldrig pushas till GitHub. Moderrepot ignorerar mappen; commit- och push-hooks spärrar publicering.

## Löpande källhänvisningar

- När en extern källa första gången hänvisas till i löpande text ska Harvardhänvisningen också vara en direktlänk till källan. Senare hänvisningar kan vara olänkade när det ger en lugnare läsning.
- När en källa är det centrala dokumentet för materialet — till exempel ett samrådsunderlag, en rapport eller ett beslutsunderlag — får länken i löpande text ges en tydlig och beskrivande länktext, såsom “samrådsunderlaget”. Behåll samtidigt en formell Harvardhänvisning i anslutning till länken.

## AI-assisterade utkast

- Beskriv AI-assisterade sammanställningar och analyser som utkast eller bidrag till fortsatt diskussion när de inte har beslutats, kvalitetssäkrats eller antagits av en grupp.
- Gör inte anspråk på att ett sådant utkast är ett fullständigt underlag, ett gemensamt ställningstagande eller att det företräder en grupp. Länka i stället till det ursprungliga, fullständiga underlaget när det finns tillgängligt.

## Samarbete

Projektet kan samtidigt öppnas och ändras i Cursor av användaren. Kontrollera därför berörda filer före ändring, bevara externa ändringar och skriv aldrig över eller återställ ändringar som inte är mina utan uttryckligt klartecken.

## Git och publicering

Kent committar och pushar själv i Cursor. Det är huvudregeln.

Ett AI-verktyg får köra `git commit` eller `git push` bara när Kent i den aktuella konversationen uttryckligen ber om just den handlingen, till exempel "committa och pusha". Då ska det göras. Bara commit om han bara ber om commit. Bara push om committen redan finns och han bara ber om push. Båda när han ber om båda. Detsamma gäller pull request och annan publicering till GitHub.

En GitHub-adress, en blob-länk eller en uppmaning att lägga en fil i repot är en platsangivelse. Den är inte en begäran om commit eller push. Ord som "publicera", "lägg upp" eller "in på GitHub" räcker inte heller, om Kent inte samtidigt ber om commit eller push.

Read-only git (`status`, `diff`, `log`, `remote -v`, `fetch`) är tillåtet.

Efter lokala ändringar ska ändringsomfång och relevanta kontroller redovisas. Materialet lämnas ocommittat och opushat, så att Kent själv kan committa och pusha i Cursor.
