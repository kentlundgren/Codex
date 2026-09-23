---
name: nf-resultatrakning
description: Uppdaterar den interaktiva resultaträkningssidan för Lunds Naturskyddsförening (Fritid/NF/Kalendern/meetings/260924/Ekonomi/) med en ny period, när Kent får en uppdaterad huvudbok eller resultaträkning från ekonomiansvarig i styrelsen. Använd när Kent bifogar en ny Huvudbok-/resultaträknings-fil (docx eller liknande) för LNF och vill se den i samma sida/verktyg som tidigare perioder, eller ber om att "lägga till en ny period", "uppdatera resultaträkningen", eller "växla mellan resultaträkningar".
---

# NF resultaträkning — lägg till en ny period

En sida (`Fritid/NF/Kalendern/meetings/260924/Ekonomi/`) visar Lunds Naturskyddsförenings
resultaträkning som en väljarbar tidsserie: varje period är en egen liten JSON-fil, och
sidans dropdown växlar mellan dem. Det här skillet beskriver hur en **ny period läggs
till** utan att sidans HTML/CSS/JS behöver skrivas om.

**Kanonisk plats:** all framtida data läggs i den här mappen, oavsett vilket kommande
möte (`meetings/<datum>/`) huvudboken hör till — sidan är en enda växlingsbar
tidsserie, inte en ny sida per möte. Om Kent uttryckligen vill ha en separat sida för
ett specifikt möte i stället: fråga, anta inte.

## Filstruktur (referens)

```
Kalendern/meetings/260924/Ekonomi/
  index.html         ← rörs normalt inte
  style.css           ← rörs normalt inte
  script.js            ← rörs normalt inte
  README.md
  data/
    manifest.json      ← lista över datum, t.ex. ["2026-09-23", "2026-12-01"]
    2026-09-23.json    ← en fil per period
    2026-12-01.json
```

## Arbetsgång

1. **Läs källdokumentet.** Använd skillen `docx` (pandoc/python-docx) för att läsa in
   huvudboken/resultaträkningen. Läs den faktiska filen — gissa aldrig belopp eller
   kategorinamn.

2. **Stäm av innan något skrivs.** Huvudboken är normalt strukturerad med
   kategori-rader (namn som slutar med kolon + en delsumma) och detaljrader under
   varje kategori (verifikationsnummer, datum, text, belopp). Räkna om varje
   kategoris delsumma från dess detaljrader, och räkna om totalsumman (resultatet)
   från alla kategoriers delsummor. Om något inte går ihop: flagga det för Kent
   **innan** datafilen skrivs, i stället för att lita blint på dokumentets egna
   summeringar (se `feedback`-mönstret från den första genomgången 2026-09-23, där
   alla delsummor faktiskt stämde men flera andra saker — saknat verifikationsnummer,
   en felplacerad intäkt, en tom rad — behövde flaggas).

3. **Bygg den nya datafilen.** Skapa `data/<ISO-datum>.json` med samma schema som
   `data/2026-09-23.json`:
   ```json
   {
     "datum": "YYYY-MM-DD",
     "etikett": "läsbart datum, t.ex. 1 december 2026",
     "period": { "fran": "YYYY-MM-DD", "till": "YYYY-MM-DD" },
     "kalla": "Kort beskrivning + källfilens namn",
     "intakter": [
       { "id": "kebab-id", "namn": "Visningsnamn", "belopp": 12345.00 },
       { "id": "...", "namn": "...", "belopp": 0, "projekt": "projekt-id" }
     ],
     "kostnader": [
       { "id": "...", "namn": "...", "belopp": -12345.00 }
     ],
     "projekt": [
       { "id": "projekt-id", "namn": "Visningsnamn för projektparet" }
     ]
   }
   ```
   - `belopp` för kostnader är alltid **negativt**.
   - `projekt`-nyckeln (på både en intäkts- och en kostnadsrad) parar ihop dem: sidan
     markerar båda raderna med samma bakgrundsfärg i tabellen, och radar upp dem i
     kommentarslistan under tabellen ("Per projekt, kostnad mot riktad intäkt"). Använd
     samma `projekt`-id (`cykelkarta`, `fotoutstallning`) om samma projekt återkommer.
     Om en **ny** typ av självfinansierat projekt dyker upp i underlaget (en kostnad med
     en tydligt riktad, egen intäkt/anslag/ersättning): fråga Kent om den ska markeras
     på samma sätt, i stället för att anta det.
   - **Ordningen inom `intakter` och `kostnader` styr läsordningen i tabellen**, och bör
     hållas konsekvent mellan de två listorna: om ett projekts intäktsrad ligger före ett
     annat projekts i `intakter`, lägg kostnadsraderna i samma inbördes ordning i
     `kostnader` (Kent bad uttryckligen om detta 2026-09-23, så ögat lättare kopplar ihop
     rätt par rad för rad). Färgen (`proj-a`/`proj-b`/`proj-c` i CSS) sätts alfabetiskt på
     `projekt`-id:t, inte av listordningen, så att ändra läsordningen aldrig byter färg på
     ett projekt.
   - Kategorinamn (`namn`) hamnar direkt på en publik sida — använd bara
     kategori-/delsummenivå, aldrig enskilda verifikationsraders fritext (som kan
     innehålla personnamn, se `AGENTS.md` → Publiceringskontroll). Sidan är byggd för
     att aldrig visa den detaljnivån, och det ska förbli så.
   - Om en intäktsrad är riktad till ett specifikt projekt, säg det i `namn` (t.ex.
     "Miljöanslag till fotoutställningen"), inte bara via färgmarkeringen — Kent bad
     uttryckligen om att kopplingen ska gå att läsa i klartext, inte bara synas i färg.

4. **Uppdatera manifestet.** Lägg till det nya datumet i `data/manifest.json` (lägg
   till, skriv inte över befintliga poster). Sidans JS sorterar själv, senaste period
   visas som förval.

5. **Verifiera lokalt.** Starta den befintliga dev-servern (`Fritid/NF/.claude/launch.json`,
   konfiguration `nf-static`) i webbläsarförhandsvisningen, öppna
   `Kalendern/meetings/260924/Ekonomi/index.html`, och kontrollera att:
   - båda/alla perioder syns i väljaren,
   - den nya periodens summor stämmer mot källdokumentet,
   - radmarkeringarna och kommentarslistan under tabellen visar rätt par och rätt
     färger om nya `projekt`-kopplingar lagts till.

6. **Rör aldrig git.** Lämna ändringarna ocommittade och opushade om inte Kent
   uttryckligen ber om det (Regel 11, `kent-meta-regler-for-code`). Redovisa vilka
   filer som ändrats/lagts till.

7. **Erbjud — men anta inte — en kort granskning.** Precis som vid den första
   genomgången (2026-09-23) kan det vara värdefullt att peka ut avstämningsproblem,
   ovanliga kategoriseringar eller saknade verifikationsnummer, och eventuellt
   formulera ett kort mejlutkast till ekonomiansvarig. Gör det om Kent ber om det
   eller om avstämningen i steg 2 faktiskt hittar något — lägg inte till det
   per automatik vid varje uppdatering.

## Bakgrund

Skapat 2026-09-23 tillsammans med den första resultaträkningssidan, byggd av en
huvudbok mottagen från ekonomiansvarig i styrelsen inför styrelsemötet 2026-09-24.
Kent bad uttryckligen om att kunna växla mellan flera perioders resultaträkningar
över tid, och att det här förbereddes redan innan nästa uppdatering faktiskt kommer.
