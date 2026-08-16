# SPEC — Samrådsguiden

Teknisk specifikation för genomförande. Beskriver exakt hur, inte vad eller varför — se `PRD_samradsguiden.md` för bakgrund, mål och sakligt innehåll. Denna fil är skriven för en genomförande-AI och förutsätter att PRD:n redan är läst.

Status: utkast, inte testat mot kod.

---

## 0. Filstruktur (facit)

```
Samradsguiden/
├── index.html          — kort förklarande sida
├── fordjupning.html     — fördjupad förklarande sida
├── verktyg.html          — interaktiv guide (formulär + export)
├── styles.css            — delas av alla tre HTML-sidor
├── data.js                — all datamodell från avsnitt 1, laddas av verktyg.html
├── script.js               — delade komponenter (accordion, teknikmodal) för index.html/fordjupning.html
├── verktyg.js               — formulärlogik och exportlogik för verktyg.html
└── README.md
```

`data.js` och `verktyg.js` är separata filer, inte en enda `script.js`, eftersom `index.html` och `fordjupning.html` inte ska ladda formulärlogik de aldrig använder. `script.js` återanvänds oförändrad av alla tre sidorna för accordion- och teknikmodal-mönstret (se avsnitt 5).

---

## 1. Datamodell (`data.js`)

All text i detta avsnitt är **placeholder-nivå** — exakt sakinnehåll (hjälptexter, exempeltexter, källhänvisningar) hämtas från PRD:ns avsnitt 6 och 8 under innehållsproduktionen, inte från denna SPEC. Det som är normativt här är **strukturen**: fältnamn, typer och vilka kombinationer som är giltiga.

### 1.1 Dispositionsmallar

**Tillägg (version 1.2):** varje PBL-post har ett `plantyp`-fält, `"detaljplan"` eller `"oversiktsplan"`, och två nya poster tillkom under `pbl`: `oversiktsplanSamrad` och `oversiktsplanGranskning`. `verktyg.js` kräver inga ändringar för detta — `populateSkedeOptions()` itererar redan generiskt över `Object.keys(DISPOSITIONER[state.lagrum])`.

```js
// En dispositionsmall = de sex delarna från struktur.html, med
// lagrum/skede-specifikt innehåll i respektive del.
const DISPOSITIONER = {
  pbl: {
    programsamrad: {
      id: "pbl-programsamrad",
      label: "PBL — Detaljplan — Programsamråd",
      lagrum: "PBL",
      plantyp: "detaljplan",
      mottagareForslag: "Kommunen (stadsbyggnadskontor eller motsvarande)",
      lagrumshanvisning: "Frivilligt skede, inget bestämt lagrum i PBL 5 kap.",
      delar: {
        arendetsRam:      { hjalptext: "STRING — se PRD 6.1, punkt 1" },
        sammanfattning:    { hjalptext: "STRING" },
        referat:            { hjalptext: "STRING", valfri: true },
        synpunkter:          { hjalptext: "STRING", rubrikKalla: "Planprogrammets egna avsnitt, om sådana finns" },
        vadSomBegars:         { hjalptext: "STRING", kravtyperTillatna: ["utredning_av_alternativ", "vardering_att_beakta"] },
        kallforteckning:       { hjalptext: "STRING" }
      }
    },
    samrad: {
      id: "pbl-samrad",
      label: "PBL — Detaljplan — Samråd",
      lagrum: "PBL",
      plantyp: "detaljplan",
      mottagareForslag: "Kommunen (stadsbyggnadskontor eller motsvarande)",
      lagrumshanvisning: "PBL 5 kap. 11–13 §§",
      delar: {
        arendetsRam:      { hjalptext: "STRING" },
        sammanfattning:    { hjalptext: "STRING" },
        referat:            { hjalptext: "STRING", valfri: true },
        synpunkter:          { hjalptext: "STRING", rubrikKalla: "Planbeskrivningens och plankartans egna avsnitt" },
        vadSomBegars:         { hjalptext: "STRING", kravtyperTillatna: ["andrad_planbestammelse", "andrad_plankarta", "kompletterande_utredning", "planen_bor_ej_antas"] },
        kallforteckning:       { hjalptext: "STRING" }
      }
    },
    granskning: {
      id: "pbl-granskning",
      label: "PBL — Detaljplan — Granskning",
      lagrum: "PBL",
      plantyp: "detaljplan",
      mottagareForslag: "Kommunen (stadsbyggnadskontor eller motsvarande)",
      lagrumshanvisning: "PBL 5 kap. 18, 21, 23 §§ (25 § vid ny granskning efter väsentlig ändring)",
      varningVidRisk: "Den som inte yttrar sig i granskningen riskerar att förlora rätten att överklaga planen senare.",
      delar: {
        arendetsRam:      { hjalptext: "STRING" },
        sammanfattning:    { hjalptext: "STRING" },
        referat:            { hjalptext: "STRING", valfri: true },
        synpunkter:          { hjalptext: "STRING", rubrikKalla: "Planbeskrivningens och plankartans egna avsnitt" },
        vadSomBegars:         { hjalptext: "STRING", kravtyperTillatna: ["andrad_planbestammelse", "andrad_plankarta", "kompletterande_utredning", "planen_bor_ej_antas"], tonNotis: "Skarpare formulering rekommenderas — sista ordinarie tillfället." },
        kallforteckning:       { hjalptext: "STRING" }
      }
    },
    oversiktsplanSamrad: {
      id: "pbl-oversiktsplan-samrad",
      label: "PBL — Översiktsplan — Samråd",
      lagrum: "PBL",
      plantyp: "oversiktsplan",
      mottagareForslag: "Kommunen (stadsbyggnadskontor eller motsvarande)",
      lagrumshanvisning: "PBL 3 kap. 8 §. Vid betydande miljöpåverkan tillkommer avgränsningssamråd enligt MB 6 kap. 9–10 §§ (PBL 3 kap. 9 a §).",
      delar: {
        arendetsRam:      { hjalptext: "STRING" },
        sammanfattning:    { hjalptext: "STRING" },
        referat:            { hjalptext: "STRING", valfri: true },
        synpunkter:          { hjalptext: "STRING", rubrikKalla: "Översiktsplanens egna avsnitt" },
        vadSomBegars:         { hjalptext: "STRING", kravtyperTillatna: ["andrad_inriktning", "kompletterande_utredning", "vardering_att_beakta"] },
        kallforteckning:       { hjalptext: "STRING" }
      }
    },
    oversiktsplanGranskning: {
      id: "pbl-oversiktsplan-granskning",
      label: "PBL — Översiktsplan — Granskning/utställning",
      lagrum: "PBL",
      plantyp: "oversiktsplan",
      mottagareForslag: "Kommunen (stadsbyggnadskontor eller motsvarande)",
      lagrumshanvisning: "PBL 3 kap. 12 §. Minst två månaders granskningstid. Kommunfullmäktige antar planen (3 kap. 19 §).",
      varningVidRisk: "Sista tillfället att lämna synpunkter innan kommunfullmäktige antar planen.",
      delar: {
        arendetsRam:      { hjalptext: "STRING" },
        sammanfattning:    { hjalptext: "STRING" },
        referat:            { hjalptext: "STRING", valfri: true },
        synpunkter:          { hjalptext: "STRING", rubrikKalla: "Översiktsplanens egna avsnitt" },
        vadSomBegars:         { hjalptext: "STRING", kravtyperTillatna: ["andrad_inriktning", "kompletterande_utredning", "planen_bor_ej_antas"], tonNotis: "Skarpare formulering rekommenderas — sista ordinarie tillfället." },
        kallforteckning:       { hjalptext: "STRING" }
      }
    }
  },
  mb: {
    avgransningssamrad: {
      id: "mb-avgransningssamrad",
      label: "MB — Avgränsningssamråd",
      lagrum: "MB",
      mottagareForslag: "Länsstyrelsen",
      lagrumshanvisning: "MB 6 kap. 29 §",
      delar: {
        arendetsRam:      { hjalptext: "STRING" },
        sammanfattning:    { hjalptext: "STRING" },
        referat:            { hjalptext: "STRING", valfri: true },
        synpunkter:          { hjalptext: "STRING", rubrikKalla: "Samrådsunderlagets egna avsnitt och numrering" },
        vadSomBegars:         { hjalptext: "STRING", kravtyperTillatna: ["komplettering_av_mkb", "forslag_till_villkor", "tillstyrkande_avstyrkande"], tonNotis: "Ett avstyrkande i detta skede förutsätter ett beslut hos avsändaren — bör inte formuleras löst." },
        kallforteckning:       { hjalptext: "STRING" }
      }
    },
    kompletterandeSamrad: {
      id: "mb-kompletterande-samrad",
      label: "MB — Kompletterande/utökat samråd",
      lagrum: "MB",
      mottagareForslag: "Länsstyrelsen",
      lagrumshanvisning: "Inget eget lagrum — genomförs när förutsättningarna ändrats väsentligt sedan avgränsningssamrådet.",
      delar: {
        arendetsRam:      { hjalptext: "STRING" },
        sammanfattning:    { hjalptext: "STRING" },
        referat:            { hjalptext: "STRING", valfri: true },
        synpunkter:          { hjalptext: "STRING", rubrikKalla: "Vad som förändrats sedan avgränsningssamrådet" },
        vadSomBegars:         { hjalptext: "STRING", kravtyperTillatna: ["komplettering_av_mkb", "forslag_till_villkor"] },
        kallforteckning:       { hjalptext: "STRING" }
      }
    },
    yttrandeVidKungorelse: {
      id: "mb-yttrande-vid-kungorelse",
      label: "MB — Yttrande vid kungörelse av ansökan",
      lagrum: "MB",
      mottagareForslag: "Mark- och miljödomstolen",
      lagrumshanvisning: "Formellt inte ett samråd — yttrande i pågående mål.",
      delar: {
        arendetsRam:      { hjalptext: "STRING" },
        sammanfattning:    { hjalptext: "STRING" },
        referat:            { hjalptext: "STRING", valfri: true },
        synpunkter:          { hjalptext: "STRING", rubrikKalla: "Ansökans och MKB:ns egna avsnitt" },
        vadSomBegars:         { hjalptext: "STRING", kravtyperTillatna: ["komplettering", "forslag_till_villkor", "tillstyrkande_avstyrkande"], tonNotis: "Första skedet där ett tydligt tillstyrkande/avstyrkande är juridiskt meningsfullt." },
        kallforteckning:       { hjalptext: "STRING" }
      }
    }
  }
};
```

**Invariant:** varje `delar`-objekt har exakt sex nycklar, alltid i samma ordning: `arendetsRam`, `sammanfattning`, `referat`, `synpunkter`, `vadSomBegars`, `kallforteckning`. Formulärlogiken (avsnitt 2) får aldrig anta att en sjunde nyckel kan förekomma.

### 1.2 Kompensationsmodulens data

```js
// Tre spår × två lägen = sex kombinationer. Ett spår kan vara otillgängligt
// beroende på tidigare val i formuläret (se avsnitt 2.2).
const KOMPENSATION = {
  pbl: {
    tillgangligOm: (val) => val.lagrum === "pbl",
    begaran:            { text: "STRING — fråga om kompensation övervägts, se PRD 8.1/8.6" },
    konstruktivtForslag: { mall: "STRING med platshållare {naturvarde}, {jamforbartFall}, {atgard}, {uppfoljning} — se PRD 8.5" }
  },
  mb16kap9: {
    tillgangligOm: (val) => val.lagrum === "mb",
    begaran:            { text: "STRING" },
    konstruktivtForslag: { mall: "STRING med samma platshållare som ovan" }
  },
  mb7kap29: {
    tillgangligOm: (val) => val.lagrum === "mb" && val.berorNatura2000 === true,
    begaran:            { text: "STRING — betona undantagskaraktären, se PRD 8.1" },
    konstruktivtForslag: { mall: "STRING" }
  }
};
```

`val.berorNatura2000` är en boolean som sätts av en explicit kryssruta i steg 5 (avsnitt 2.1), inte härledd automatiskt — verktyget kan inte veta om ett givet ärende berör ett Natura 2000-område.

### 1.3 Avsändarroll

```js
const AVSANDARROLL = {
  privatperson: {
    label: "Privatperson",
    arendetsRamFalt: ["Namn", "Adress", "Datum"],
    mandatFalt: false
  },
  forening: {
    label: "På uppdrag av en förening/organisation",
    arendetsRamFalt: ["Föreningens namn", "Organisationsnummer (om tillämpligt)", "Undertecknare", "Mandat/beslut som ger rätt att företräda föreningen", "Datum"],
    mandatFalt: true,
    hjalptext: "STRING — se PRD 9.2, kopplat till bristen i den tidigare NCC-analysen"
  }
};
```

### 1.4 Mottagardata

```js
// Används för att förifylla arendetsRam-fältet "Mottagare" och för
// hjälptexten i formulärets steg 4. Alltid redigerbart av användaren.
const MOTTAGARE = {
  kommun: {
    label: "Kommunen",
    hjalptext: "STRING — se PRD avsnitt 7"
  },
  lansstyrelsen: {
    label: "Länsstyrelsen",
    hjalptext: "STRING"
  },
  markOchMiljodomstolen: {
    label: "Mark- och miljödomstolen",
    hjalptext: "STRING"
  }
};
```

---

## 2. Formulärlogik (`verktyg.js`)

### 2.1 Stegsekvens och tillstånd

Formuläret är en enda JS-tillståndsobjekt, inte flera oberoende komponenter:

```js
let state = {
  avsandarroll: null,        // "privatperson" | "forening"
  lagrum: null,               // "pbl" | "mb"
  skede: null,                  // nyckel i DISPOSITIONER[lagrum], t.ex. "samrad"
  mottagare: null,               // nyckel i MOTTAGARE, förifylld men redigerbar
  kompensation: {
    onskas: null,                // boolean
    berorNatura2000: null,        // boolean, bara relevant om lagrum === "mb"
    sparValt: null,                 // "pbl" | "mb16kap9" | "mb7kap29"
    lage: null                       // "begaran" | "konstruktivtForslag"
  },
  text: {
    arendetsRam: "",
    sammanfattning: "",
    referat: "",
    synpunkter: "",
    vadSomBegars: "",
    kallforteckning: ""
  }
};
```

Stegen visas i denna ordning och **kan inte hoppas över** (steg N+1 renderas inte förrän steg N har ett giltigt värde):

1. Avsändarroll → sätter `state.avsandarroll`, avgör vilka fält som visas i del 1.
2. Lagrum → sätter `state.lagrum`, avgör vilka skeden som listas i steg 3.
3. Skede → sätter `state.skede` till en nyckel som **måste** finnas i `DISPOSITIONER[state.lagrum]`. Ogiltig kombination (t.ex. `lagrum="pbl"` med ett MB-skede) ska vara omöjlig att uppnå via UI, inte bara valideras i efterhand.
4. Mottagare → förifylls från `DISPOSITIONER[lagrum][skede].mottagareForslag` mappat till en nyckel i `MOTTAGARE`; användaren kan ändra till valfri av de tre, med en fritextrad som fjärde alternativ om inget av de tre stämmer (samrådsunderlaget kan avvika från normalfallet).
5. Kompensation:
   - Delfråga a: "Ska kompensationsåtgärder tas med?" (ja/nej). Nej → hoppa till steg 6, `state.kompensation` förblir `{onskas: false, ...null}`.
   - Delfråga b (bara om ja): om `lagrum === "mb"`, visa kryssrutan "Berör ärendet ett Natura 2000-område?" → sätter `berorNatura2000`.
   - Delfråga c: visa bara de spår vars `tillgangligOm(state.kompensation)` returnerar `true` (se 1.2). Om `lagrum === "pbl"` finns bara ett val (inget val att göra, sätt automatiskt `sparValt = "pbl"`).
   - Delfråga d: läge — "begäran" eller "konstruktivt förslag".
6. Generera mall → se 2.3.

### 2.2 Villkorlig fältvisning — sanningstabell

| `state.lagrum` | `state.kompensation.berorNatura2000` | Tillgängliga spår i delfråga c |
|---|---|---|
| `"pbl"` | (irrelevant, frågas ej) | `pbl` (enda alternativet, förvalt) |
| `"mb"` | `false` eller ej besvarad | `mb16kap9` |
| `"mb"` | `true` | `mb16kap9`, `mb7kap29` |

Om `mb7kap29` visas som alternativ, visa samtidigt en kort notis (hämtad från `KOMPENSATION.mb7kap29.begaran.text` respektive PRD 8.1) om att detta spår sällan är tillämpligt och normalt kräver att en domstol redan bedömt att skada inte går att undvika — så att verktyget inte ger intryck av att spåret är standardvalet för alla Natura 2000-ärenden.

### 2.3 Textgenerering

Vid "Generera mall":

1. För varje del i `DISPOSITIONER[lagrum][skede].delar`, sätt `state.text[del] = ""` (tom, redo för användarens egen text) och visa `hjalptext` som platshållartext i respektive `<textarea>` (HTML `placeholder`-attribut, inte förifyllt värde — placeholder får aldrig hamna i exportet, se 3.3).
2. Del 1 (`arendetsRam`): förifyll **verkligt värde** (inte placeholder) baserat på `AVSANDARROLL[state.avsandarroll].arendetsRamFalt` och vald `MOTTAGARE`-post, som redigerbara fält snarare än fri text.
3. Om `state.kompensation.onskas === true`: sätt `state.text.vadSomBegars` till resultatet av `renderKompensationsmall(state)` (se nedan) som **förifyllt värde** i textarean (inte placeholder) — detta är avsiktligt annorlunda än övriga delar, eftersom kompensationsmallen redan är färdig text att redigera, inte en tom yta.
4. Del `referat`: om användaren inte skriver något i den, ska den **uteslutas helt** ur den sammanställda texten (ingen tom rubrik) — matchar principen i PRD 6/`Skills/samradsunderlag` att referat bara tas med "om underlaget behöver återges".

```js
function renderKompensationsmall(state) {
  const spar = KOMPENSATION[state.kompensation.sparValt];
  const innehall = state.kompensation.lage === "begaran"
    ? spar.begaran.text
    : spar.konstruktivtForslag.mall; // innehåller {naturvarde} osv. som användaren ersätter
  return innehall;
}
```

### 2.4 Sammanställningsvy

Konkatenerar de sex delarna i fast ordning, med rubriker, till en enda textsträng. **Säkerhetskrav:** sammanställningsvyn renderas med `textContent` (eller motsvarande escaping), aldrig `innerHTML` med oescapat användarinnehåll — användaren skriver fri text i sex `<textarea>`-fält, och den texten får aldrig tolkas som HTML/JS när den visas tillbaka på sidan.

```js
function byggSammanstallning(state) {
  const ordning = ["arendetsRam", "sammanfattning", "referat", "synpunkter", "vadSomBegars", "kallforteckning"];
  const rubriker = {
    arendetsRam: "Ärendets ram",
    sammanfattning: "Sammanfattning",
    referat: "Referat",
    synpunkter: "Synpunkter",
    vadSomBegars: "Vad som begärs",
    kallforteckning: "Källförteckning"
  };
  return ordning
    .filter(del => del !== "referat" || state.text.referat.trim() !== "")
    .map(del => `## ${rubriker[del]}\n\n${state.text[del].trim()}`)
    .join("\n\n");
}
```

---

## 3. Export

### 3.1 Kopiera till urklipp

- Primärt: `navigator.clipboard.writeText(text)`.
- Om det avvisas (t.ex. äldre webbläsare eller nekad behörighet): fallback som markerar hela texten i ett dolt `<textarea>` och kör `document.execCommand("copy")`, med ett synligt felmeddelande om även det misslyckas ("Markera texten manuellt och kopiera med Ctrl+C").
- Ge alltid synlig bekräftelse ("Kopierat!") i minst två sekunder efter lyckad kopiering.

### 3.2 Nedladdning som fil

```js
function exporteraSomFil(text, filnamn) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filnamn;
  a.click();
  URL.revokeObjectURL(url);
}
```

**Filnamnsgenerering:** `yttrande-{lagrum}-{skede}.md`, där `{lagrum}` och `{skede}` hämtas från `DISPOSITIONER[lagrum][skede].id` (redan URL-säkra, se avsnitt 1.1 — inga mellanslag eller diakritiska tecken). Inget datum i filnamnet, eftersom `new Date()` i sig är ofarligt i klientkod som körs i besökarens webbläsare (till skillnad från i Workflow-skript) — men datum i filnamnet är en kosmetisk detalj, inte ett krav, och utelämnas för enkelhetens skull om inte annat önskas.

### 3.3 Gränsfall

| Fall | Förväntat beteende |
|---|---|
| Alla textfält tomma vid export | Exportera ändå — sammanställningen blir kort men inte trasig. Visa en varning innan export ("De flesta fält är tomma — vill du exportera ändå?") snarare än att blockera. |
| Endast del `referat` tom, övriga ifyllda | Utelämna rubriken "Referat" helt (se 2.3, punkt 4). |
| Kompensationsmallens platshållare (`{naturvarde}` etc.) inte ersatta av användaren | Exportera som de är — verktyget ska **inte** blockera export eller tysta ta bort platshållarna, eftersom det skulle dölja för användaren att texten behöver kompletteras. Visa i stället en synlig varning i UI (inte i den exporterade texten) om olöst platshållartext finns kvar. |
| Specialtecken i användarens fritext (t.ex. citattecken, radbrytningar) | Ingen särskild hantering behövs för `.md`/`.txt`-export — texten skrivs rakt av. Hanteras redan korrekt av `Blob`. |
| Användaren klickar "Generera mall" flera gånger efter att redan ha skrivit text | Varna innan omgenerering skriver över befintlig text i `state.text` — bekräftelsedialog, inte tyst överskrivning. |
| `navigator.clipboard` saknas helt (mycket gammal webbläsare) | Fallback enligt 3.1; om även `execCommand` saknas, visa endast det manuella meddelandet. |

---

## 4. Förklarande sidor — teknisk struktur (ej sakinnehåll)

`index.html` och `fordjupning.html` följer samma HTML-skelett som `../NCC_stenbryttning/struktur.html`:

- `<a class="skip-link">`, `<header class="hero">`, `<main id="innehall" class="wrap">` med `<section class="section">`-block.
- Accordion-mönstret (`[data-accordion]`, `aria-expanded`) återanvänds oförändrat från `script.js` för utfällbara avsnitt — t.ex. de sex dispositionsmallarna i `fordjupning.html` och kompensationsmodulens 8.1–8.6 i samma fil.
- Teknikknapp + `<dialog id="tech-dialog">` återanvänds oförändrat, med filstrukturen i avsnitt 0 ovan i stället för NCC-projektets.
- `<a class="repo-link">` pekar till `https://github.com/kentlundgren/Codex/tree/main/Fritid/NF/Samradsguiden`.
- Sakinnehållet (dispositionstexter, kompensationsavsnitt, exempel) skrivs enligt PRD:ns avsnitt 6 och 8 som ett separat innehållsproduktionssteg — denna SPEC definierar bara var innehållet ska sitta strukturellt (vilka `<section>`, i vilken ordning), inte texten själv.

`verktyg.html` har ett enklare skelett: samma header/footer-mönster, men `<main>` innehåller formulärets steg (avsnitt 2 ovan) i stället för `<section>`-block, plus sammanställningsvyn och exportknapparna.

---

## 5. Tillgänglighet

- Alla formulärsteg i `verktyg.html` är riktiga `<label>`-kopplade fält, inte bara `<div>` med klickhantering.
- Villkorligt visade steg (avsnitt 2.2) läggs till/tas bort ur DOM:en (inte bara `display: none`) så att skärmläsare inte navigerar till dolda fält.
- Kopiera-bekräftelsen (3.1) annonseras via `aria-live="polite"`, inte bara visuellt.
- Samma `skip-link` och `aria-expanded`-mönster som `struktur.html` används genomgående.

---

## 6. Manuell verifieringschecklista (innan leverans)

- [ ] Alla sex kombinationer av lagrum × skede går att välja och genererar rätt mall.
- [ ] Kompensationssteget visar rätt spår i alla tre fall i sanningstabellen (2.2).
- [ ] `mb7kap29` går **inte** att välja om `berorNatura2000` inte är `true`.
- [ ] Tomt `referat`-fält utelämnas korrekt ur både sammanställningsvy och export.
- [ ] Kopiera-till-urklipp fungerar i minst en modern webbläsare; fallback testad genom att simulera nekad clipboard-behörighet.
- [ ] Nedladdad fil öppnas korrekt och innehåller rätt filnamn för samtliga sex skeden.
- [ ] Sammanställningsvyn visar inte HTML/JS från användarens fritext som kod (testa genom att skriva `<script>alert(1)</script>` i ett fält).
- [ ] Alla tre HTML-sidor länkar korrekt till varandra och till `../NCC_stenbryttning/struktur.html`.
