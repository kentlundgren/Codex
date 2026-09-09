# SPEC — `lagtexter.html` och `paverka.html` (Samrådsguiden v1.7)

Teknisk specifikation för genomförande. Beskriver exakt **hur**, inte **vad** eller
**varför** — se [`PRD_samradsguiden_fordjupning.md`](https://github.com/kentlundgren/Codex/blob/main/Fritid/NF/Samradsguiden/PRD_samradsguiden_fordjupning.md)
(v0.1) för bakgrund, urval och sakligt innehåll, och huvud-PRD:n
[`PRD_samradsguiden.md`](https://github.com/kentlundgren/Codex/blob/main/Fritid/NF/Samradsguiden/PRD_samradsguiden.md)
(v1.6) för det verktyget redan gör.

**Status:** UTKAST v0.1 — för Kent att läsa igenom. Inget är byggt. Primärverifieringen
av lagtexterna mot riksdagen.se är **inte** gjord ännu — den är nästa steg efter att
denna SPEC är godkänd.

**Skapad:** 2026-09-09. **Uppdaterad:** 2026-09-09 efter andra dialogrundan (accordion
för förklaringarna, tidslinjen som tre spår, anknytning till Lunds kommun).

**Låsta beslut från planeringsdialogen (2026-09-09):**

1. Två nya sidor: `paverka.html` (strategilagret, Tillägg A–C) och `lagtexter.html`
   (de tio lagtexterna). `fordjupning.html` får inga nya sakavsnitt.
2. Tio poster i lagtextlistan, enligt tabellen i avsnitt 3 nedan. MB 2 kap. blir en
   klusterpost (2:1, 2:2, 2:3, 2:7) **plus** en egen post för 2:6. Posterna 5, 8, 9, 10
   innehåller mer än en paragraf.
3. MB 6 kap. 20 § läggs till i post 5 vid sidan av 6 kap. 3 § — paret som visar
   skillnaden strategisk/specifik miljöbedömning.
4. Förklaringen per post ("Vad betyder den här paragrafen?"): **exakt 5 meningar**,
   fast struktur (avsnitt 5.3). Den ligger **bakom ett klick** (accordion) — själva
   lagtexten är alltid synlig, förklaringen fälls upp (avsnitt 5.1).
5. Målgrupp: miljöintresserade i en naturskyddsförening **utan** juridisk förkunskap.
   Lekmannaregister överallt utom i själva de ordagranna citaten. Ordlista ingår, kort
   version **högst upp** på `lagtexter.html` (avsnitt 5.4).
6. Århuskonventionen: **inte** en av de tio. Kort, tydligt märkt bakgrundsruta längst
   ned på `lagtexter.html`.
7. Beslutsstödstabellen i `paverka.html` (Tillägg A 4a) är **orienterande** — full
   ordagrann verifiering bara för de paragrafer som också står på `lagtexter.html`.
8. Version: **1.7** på alla fem sidor.
9. Gemensam, synlig toppmeny införs på alla fem sidor (avsnitt 2).
10. Arbetsordning: denna SPEC → Kent läser → primärverifiering mot riksdagen.se →
    bygge → fräscha-ögon-genomläsning.
11. **Tidslinje på `paverka.html`** (avsnitt 10.1): **vertikal**, **tre spår** staplade —
    (a) översiktsplan (PBL 3 kap.), (b) detaljplan (PBL 5 kap.), (c) verksamhetstillstånd
    (MB). Inline-SVG i Samrådsguidens palett, ingen JS, fungerar i utskrift, ligger i
    sektionen "Rätt tid" (`#ratt-tid`). Färgkod: skede med rätt att yttra sig / kritiskt
    granskningsskede / skede utan formell synpunktsrätt.
12. **Anknytning till Lunds kommun** (avsnitt 10.2): en tydligt märkt exempel-ruta —
    guiden förblir generell (huvud-PRD:n avsnitt 12: "inte kommun-specifikt"), men
    eftersom Kent bor och verkar i Lund får detaljplanespåret en sidoruta som kopplar
    guidens skedesnamn till Lunds kommuns egna statusetiketter och processbild, med
    länk och hämtdatum.
13. Förklaringarnas accordion: **bara förklaringen** fälls, aldrig lagtexten. Mönstret
    återanvänds från `script.js` (`[data-accordion]` / `aria-expanded`).
14. Ordlistan: kort (6–8 termer), `.definitions`-rutnät, högst upp på `lagtexter.html`.

---

## 0. Filstruktur — vad som ändras

```
Samradsguiden/
├── index.html            — ÄNDRAS: ny toppmeny, versionsrad 1.7
├── paverka.html          — NY: strategilagret (Tillägg A–C)
├── fordjupning.html      — ÄNDRAS: ny toppmeny, versionsrad 1.7, teknik-modal-filträd
├── lagtexter.html        — NY: de tio lagtexterna, ordlista, Århus-ruta
├── verktyg.html          — ÄNDRAS: ny toppmeny, versionsrad 1.7
├── styles.css            — ÄNDRAS: ny navigering + lagtext-komponenter + ankarstil
├── script.js             — ÄNDRAS: hash-öppning av rätt post vid direktlänk (avsnitt 6.3)
├── data.js               — OFÖRÄNDRAD
├── verktyg.js            — OFÖRÄNDRAD
├── PRD_samradsguiden.md              — OFÖRÄNDRAD
├── PRD_samradsguiden_fordjupning.md  — uppdateringslogg kompletteras när bygget är klart
├── SPEC_samradsguiden.md — OFÖRÄNDRAD
├── SPEC_lagtexter.md     — denna fil
└── README.md             — ÄNDRAS: nya filer, versionsrad 1.7, djuplänkstabell, lokal sökväg
```

`paverka.html` behöver **ingen egen datafil eller JS** — den är prosa i samma sidmall som
`fordjupning.html` (utfällbara avsnitt via `script.js` där det passar, annars öppna
`<section>`-block). `lagtexter.html` behöver ingen JS utöver `script.js`.

---

## 1. Gemensamt för båda nya sidorna

### 1.1 Sidskelett

Samma HTML-skelett som `fordjupning.html`:

- `<a class="skip-link" href="#innehall">`
- `<nav class="mainnav">` (avsnitt 2 — **ny, på alla fem sidor**)
- `<header class="hero">` med `eyebrow` / `h1` / `lead` / `button-row`
- `<main id="innehall" class="wrap">` med `<section class="section">`-block
- `<footer>` med versionsrad (avsnitt 8)
- `<a class="repo-link" href="https://github.com/kentlundgren/Codex/tree/main/Fritid/NF/Samradsguiden">GitHub</a>`
- `<button class="tech-button">` + `<dialog id="tech-dialog">` (avsnitt 7)

**Följ projektets befintliga mönster, inte AI-teknik-repots.** Samrådsguiden använder
`.repo-link` / `.tech-button` / `<dialog>` — inte `.corner` / `.modal-overlay`. Ändra
inte det etablerade mönstret (kent-bygg-sidor Regel 4–5).

### 1.2 Teknisk profil

Oförändrad från resten av projektet: ren HTML/CSS/JS, statisk sida, inga byggverktyg,
inga externa bibliotek, fungerar utan JavaScript. Responsiv via befintliga
`@media (max-width:700px)`-brytpunkter.

### 1.3 Djuplänkbarhet (kent-bygg-sidor Regel 7)

- Varje `<h2>` och `<h3>` på de **nya** sidorna får ett stabilt `id` (inga å/ä/ö) och
  ett litet `<a class="anchor" href="#id">#</a>` som blir synligt vid hover/fokus.
- Ankar-id:n är **oföränderliga efter publicering**. Döps en rubrik om, behålls id:t.
- Varje källa i källförteckningen får ett eget id (`#ref-riksdagen-mb` osv.).
- README:s djuplänkstabell (avsnitt 9) listar alla ankare med full URL.
- **De tre befintliga sidorna** (`index`, `fordjupning`, `verktyg`) får i denna omgång
  bara toppmeny + versionsrad. Full ankar-retrofit av dem är en separat, senare uppgift
  — nämns i README:s uppdateringslogg som "kvarstår". *(Öppen punkt för Kent vid
  genomläsningen: vill du ha retrofit av de tre nu i stället?)*

---

## 2. Gemensam toppmeny (`.mainnav`) — ny på alla fem sidor

Placeras direkt efter `skip-link`, före `<header class="hero">`.

```html
<nav class="mainnav" aria-label="Samrådsguiden">
  <div class="wrap">
    <a href="index.html">Översikt</a>
    <a href="paverka.html">Så påverkar vi</a>
    <a href="fordjupning.html">Dispositionerna</a>
    <a href="lagtexter.html">Lagtexterna</a>
    <a href="verktyg.html">Bygg ditt yttrande</a>
  </div>
</nav>
```

- På den aktuella sidan får dess egen länk `aria-current="page"` och en tydlig visuell
  markering (understrykning + fetare vikt).
- CSS: vågrät rad, `flex-wrap:wrap` så den bryter på mobil, sitter på en mörk
  botten (`--moss` / `#16291e`-familjen) med ljus text — samma färgvärld som `footer`
  och `hero`. Font: `Arial, sans-serif`, ~14 px, `letter-spacing:.04em`.
- Ingen JavaScript. Ingen hamburgermeny — fem korta poster får plats i två rader på
  360 px.
- Sidfotens befintliga snabblänkar (`index.html` ↔ `fordjupning.html` ↔ `verktyg.html`)
  får kompletteras med `paverka.html` och `lagtexter.html` så footern speglar menyn.

**Detta ändrar utseendet något på `index.html`, `fordjupning.html` och `verktyg.html`.**
Godkänt av Kent (planeringsdialogen, fråga 7). De tre sidorna går samtidigt till
versionsrad 1.7.

---

## 3. `lagtexter.html` — de tio posterna (facit för urvalet)

Ordningen på sidan är tabellens ordning. **Kolumnen "SFS-paragrafer att verifiera"
säger vilka paragrafer som ska citeras ordagrant — den ordagranna lydelsen hämtas vid
research-steget, inte härifrån.**

| # | Rubrik (H2) | Ankar-id | SFS-paragrafer att verifiera ordagrant | "Används vid" |
|---|---|---|---|---|
| 1 | Miljöbalken (1998:808) 1 kap. 1 § — balkens mål och tillämpning | `#mb-1-1` | MB 1:1 | Båda — gäller all tillämpning av balken |
| 2 | Miljöbalken (1998:808) 2 kap. — hänsynsreglerna | `#mb-2` | MB 2:1, 2:2, 2:3, 2:7 | Specifik miljöbedömning (verksamheter/åtgärder) i första hand; vägs in i planer via PBL 2 kap. |
| 3 | Miljöbalken (1998:808) 2 kap. 6 § — lokaliseringsprincipen | `#mb-2-6` | MB 2:6 | Specifik miljöbedömning i första hand; platsvalsargumentet är också relevant i planärenden |
| 4 | Miljöbalken (1998:808) 3 kap. 6 § — riksintresse för naturvård, kulturmiljövård och friluftsliv | `#mb-3-6` | MB 3:6 | Båda — hushållningsbestämmelserna gäller vid prövning enligt både MB och PBL |
| 5 | När en miljöbedömning ska göras *(kort H2; paragrafnumren står i `.lag-anvandning`-raden och som `.lagtext-underrubrik` per citat)* | `#mb-6-3` | MB 6:3 (strategisk, planer) **och** MB 6:20 (specifik, verksamheter) | Visar själva skillnaden — 6 kap. 3 § för kommunala planer, 6 kap. 20 § för verksamheter |
| 6 | Miljöbalken (1998:808) 7 kap. 28 a § — tillståndsplikt för Natura 2000 | `#mb-7-28a` | MB 7:28 a | Specifik miljöbedömning i första hand; kan även utlösas av en plan som tillåter en sådan verksamhet |
| 7 | Miljöbalken (1998:808) 16 kap. 13 § — miljöorganisationers rätt att överklaga | `#mb-16-13` | MB 16:13 | Överklagande av beslut och domar enligt miljöbalken; för detaljplaner se post 10 |
| 8 | Plan- och bygglagen (2010:900) 2 kap. 1–2 §§ — allmänna och enskilda intressen | `#pbl-2-1` | PBL 2:1, 2:2 | Strategisk miljöbedömning — all planläggning enligt PBL, både översiktsplan och detaljplan |
| 9 | Plan- och bygglagen (2010:900) 5 kap. 18 § och 5 kap. 11 § — granskning och samråd | `#pbl-5-18` | PBL 5:18, 5:11 | Detaljplaneprocessen enligt PBL |
| 10 | Plan- och bygglagen (2010:900) 13 kap. 11 § — vem får överklaga en detaljplan | `#pbl-13-11` | PBL 13:11 **och** den paragraf i PBL 13 kap. som ger miljöorganisationer rätt att överklaga detaljplaner antagna med strategisk miljöbedömning/MKB (trol. 13 kap. 12 § — **exakt paragraf bekräftas vid research**, citera inte ur minnet) | Detaljplaneprocessen; klagorättsregeln |

### 3.1 "Används vid"-raden — visuell form

Varje post inleds (efter H2, före första citatet) med en kort rad:

```html
<p class="lag-anvandning"><strong>Används vid:</strong> [värde ur tabellens sista kolumn].</p>
```

Formulerad i klartext för en lekman. Där posten gäller "specifik miljöbedömning" ska
raden i klartext säga *verksamheter och åtgärder — t.ex. en täkt, en gruva, en hamn*,
och där den gäller "strategisk" säga *planer och program — t.ex. en kommuns
översiktsplan eller detaljplan*. Aldrig bara den juridiska termen utan förklaring.

### 3.2 Om en paragraf inte kan verifieras vid research

- Paragrafen tas **inte** med. Ingen omskrivning, ingen ungefärlig återgivning.
- Faller en hel post bort väljs en reserv från tilläggs-PRD:ns avsnitt 7.2
  (MB 6:35–37, MB 7:13–15, MB 5 kap., miljöbedömningsförordningen, förvaltningslagen
  25/33 §§, artskyddsförordningen). Bytet noteras i PRD:ns uppdateringslogg.
- Kan bara *en* paragraf i en klusterpost inte verifieras behålls posten med de övriga,
  och den utelämnade nämns i en fotnot ("2 kap. 7 § återges inte här — kunde inte
  verifieras mot fulltext vid kontrolldatum").

---

## 4. `lagtexter.html` — sidstruktur (sektioner i ordning)

| Ordning | `<section>` / element | Ankar-id | Innehåll |
|---|---|---|---|
| 1 | `header.hero` | — | Eyebrow "Lagtexterna", H1, lead. Knapprad: "Så påverkar vi" (`paverka.html`) + "Bygg ditt yttrande" (`verktyg.html`). |
| 2 | `section` — Disclaimer | `#om-sidan` | Ruta (`.notice`-mönstret) som säger: sidan förklarar vad lagen **säger** och varför den är viktig att känna till — den ger **inte** råd om ett enskilt ärende och ersätter inte en jurist. Lagtext återges i gällande lydelse per angivet kontrolldatum; lagar ändras. |
| 3 | `section` — Strategisk vs specifik miljöbedömning, kort | `#tva-slags-miljobedomning` | 4–6 meningar: kommunen antar planer (ÖP, FÖP, detaljplan) → **PBL styr processen**, **MB 6 kap. strategisk miljöbedömning** styr miljöbedömningen. Ett bolag söker tillstånd för en verksamhet → **MB styr allt**, **specifik miljöbedömning**. Länk till `paverka.html#vilken-lag` för hela genomgången. Denna ruta finns för att posterna 5, 8 och 2 ska gå att förstå. |
| 4 | `section` — Ordlista | `#ordlista` | `.definitions`-rutnät, 6–8 termer (avsnitt 5.4). |
| 5 | `section` — Snabbnavigering | `#snabbnav` | Numrerad lista med de tio posterna som `#`-länkar. |
| 6 | `section` per post × 10 | se avsnitt 3 | `<article class="lagtext-post">` (avsnitt 5.1–5.2). |
| 7 | `section` — Bakom de svenska reglerna: Århuskonventionen | `#arhus` | Bakgrundsruta (avsnitt 5.5). Tydligt märkt "folkrätt, inte svensk lagtext". |
| 8 | `section.sources` — Så är lagtexterna kontrollerade + källförteckning | `#kallor` | Datummärkning (avsnitt 8) + annoterad, alfabetisk Harvardlista (avsnitt 8.2). |

---

## 5. `lagtexter.html` — komponenter

### 5.1 En post med **en** paragraf (mall)

Lagtexten + metadata är **alltid synliga**. Förklaringen ligger i en accordion
(`[data-accordion]`, samma mönster som `fordjupning.html`) — knappen heter
**"Vad betyder den här paragrafen?"** och fäller upp `.lagtext-varfor`.

```html
<article class="lagtext-post" id="mb-2-6">
  <h2>Miljöbalken (1998:808) 2 kap. 6 § — lokaliseringsprincipen
    <a class="anchor" href="#mb-2-6" aria-label="Direktlänk till denna paragraf">#</a>
  </h2>

  <p class="lag-anvandning"><strong>Används vid:</strong> verksamheter och åtgärder som
  prövas enligt miljöbalken — t.ex. en täkt eller en gruva. Platsvalsargumentet är också
  användbart i planärenden.</p>

  <blockquote class="lagtext">
    <p>[Ordagrann lagtext, exakt från riksdagen.se, med korrekt styckeindelning och
    punktlistor.]</p>
  </blockquote>
  <p class="lagtext-meta">Gällande lydelse per [kontrolldatum]. Miljöbalken (1998:808),
  senaste ändring av paragrafen SFS [nr]. Källa:
  <a href="[riksdagen-URL till just detta kapitel/paragraf]">riksdagen.se</a>
  (hämtad [datum]).</p>

  <div class="accordion" data-accordion>
    <button aria-expanded="false">
      <span class="accordion__title"><span>Vad betyder den här paragrafen?</span></span>
      <span class="accordion__toggle" aria-hidden="true">+</span>
    </button>
    <div hidden>
      <div class="lagtext-varfor">
        <p>[Exakt 5 meningar enligt strukturen i 5.3.]</p>
      </div>
    </div>
  </div>
</article>
```

Direktlänk till en post (`#mb-2-6`) ska **auto-öppna** den postens accordion via
`script.js`-tillägget (avsnitt 6.4), så en delad länk landar på en synlig förklaring.

### 5.2 En post med **flera** paragrafer (poster 2, 5, 8, 9, 10)

- **Ett** `<h2>`, **en** `.lag-anvandning`-rad, **en** accordion ("Vad betyder de här
  paragraferna?") som fäller upp **en** `.lagtext-varfor`-ruta för hela klustret.
- **Flera** `<blockquote class="lagtext">`, var och en föregången av en underrubrik och
  följd av sin **egen** `.lagtext-meta`-rad (olika paragrafer kan ha olika
  "senaste ändring"-SFS och olika lydelsedatum).

```html
<article class="lagtext-post" id="mb-2">
  <h2>Miljöbalken (1998:808) 2 kap. — hänsynsreglerna
    <a class="anchor" href="#mb-2" aria-label="Direktlänk till detta avsnitt">#</a>
  </h2>
  <p class="lag-anvandning"><strong>Används vid:</strong> …</p>

  <p class="lagtext-underrubrik">2 kap. 1 § — bevisbörda och tillämpning</p>
  <blockquote class="lagtext"><p>[…]</p></blockquote>
  <p class="lagtext-meta">Gällande lydelse per [datum]. … SFS [nr]. Källa: …</p>

  <p class="lagtext-underrubrik">2 kap. 3 § — försiktighetsprincipen</p>
  <blockquote class="lagtext"><p>[…]</p></blockquote>
  <p class="lagtext-meta">…</p>

  (2 kap. 2 § och 2 kap. 7 § på samma sätt)

  <div class="accordion" data-accordion>
    <button aria-expanded="false">
      <span class="accordion__title"><span>Vad betyder de här paragraferna?</span></span>
      <span class="accordion__toggle" aria-hidden="true">+</span>
    </button>
    <div hidden>
      <div class="lagtext-varfor"><p>[Exakt 5 meningar om klustret som helhet.]</p></div>
    </div>
  </div>
</article>
```

### 5.3 "Vad betyder den här paragrafen?" (accordion-innehållet) — fast struktur, exakt 5 meningar

En mening för vart och ett av följande, i denna ordning:

1. **Vad paragrafen säger, i klartext** — översatt till vardagssvenska, utan
   juristtermer.
2. **Vilket verktyg den ger föreningen** — vad man konkret kan begära eller påpeka med
   stöd av den.
3. **I vilket skede och vilken sorts miljöbedömning den används** — strategisk (planer)
   eller specifik (verksamheter), och var i processen.
4. **Ett vanligt missförstånd den skyddar mot** — t.ex. "kompensation är inte ett skäl
   att bevilja tillstånd" eller "en detaljplan kan inte planera bort ett riksintresse".
5. **Kopplingen till att skriva yttrandet** — hur paragrafen används i ett faktiskt
   samrådsyttrande, gärna med hänvisning till `paverka.html` eller en dispositionsmall
   i `fordjupning.html`.

Skrivs i tredje person / passivt där det inte är bokstavligen sant för Kent (Regel 13).
Ingen mening får bli en instruktion om ett konkret ärende.

### 5.4 Ordlista (`#ordlista`)

`.definitions`-rutnät. 6–8 termer, varje term en kort mening. Slutgiltig lista tas fram
vid innehållsproduktionen, men ska minst täcka:

- **Strategisk miljöbedömning** / **specifik miljöbedömning**
- **Miljökonsekvensbeskrivning (MKB)**
- **Avgränsningssamråd**
- **Talerätt** (rätten att överklaga)
- **Laga kraft**
- **Riksintresse**
- **Fakultativ** (kan, men måste inte)

### 5.5 Århus-ruta (`#arhus`)

Egen `<section>` med en visuellt avvikande ruta (t.ex. `border:1px dashed var(--muted)`
eller `.notice`-varianten i en annan färg än lagtextposterna). Överst en tydlig etikett:
**"Folkrättslig bakgrund — inte svensk lagtext."**

Innehåll: 2–3 meningar om vad Århuskonventionen är, följt av art. 6 (allmänhetens
deltagande) och art. 9 (tillgång till rättslig prövning) återgivna eller nära
parafraserade, med källa till konventionstexten (UNECE) och det svenska
ratificeringsinstrumentet (SÖ 2005:28 / regeringen.se) — **hämtdatum krävs**.
Avslutas med en mening om att svensk rätt (MB 16:13, PBL 13 kap.) ska tolkas så att
konventionens krav uppfylls.

Århus-rutan använder **inte** `blockquote.lagtext`-klassen (den är reserverad för
ordagrann svensk lagtext) — egen klass `.folkratt-citat`.

---

## 6. CSS-tillägg (`styles.css`)

### 6.1 Nya variabler (`:root`)

```css
--area-lagtext:#5a4a2b;        /* jordnära, "pergament" — skild från pbl/mb/kompensation */
--area-lagtext-pale:#efe7d6;
```

### 6.2 Nya klasser

| Klass | Roll |
|---|---|
| `.mainnav` / `.mainnav .wrap` / `.mainnav a` / `.mainnav a[aria-current="page"]` | Toppmenyn (avsnitt 2). |
| `.anchor` | `opacity:0` i vila; `opacity:1` vid `h2:hover`, `h3:hover`, `.anchor:focus`. Liten, `--moss`, ingen understrykning. |
| `.lagtext-post` | `padding:44px 0; border-bottom:1px solid var(--line);` |
| `.lag-anvandning` | Smal ruta, `background:var(--area-lagtext-pale); border-left:3px solid var(--area-lagtext); font-size:.92rem;` |
| `blockquote.lagtext` | **Lagtext.** `background:var(--white); border-left:5px solid var(--area-lagtext); padding:18px 22px; font-family:Georgia,serif;` Behåller radbrytning/styckeindelning (`p + p { margin-top:.8em; }`). |
| `.lagtext-underrubrik` | `font:700 13px/1.3 Arial,sans-serif; letter-spacing:.04em; color:var(--muted);` |
| `.lagtext-meta` | `color:var(--muted); font-size:.85rem;` |
| `.lagtext-varfor` | **Tolkning.** `background:var(--area-lagtext-pale); padding:18px 20px;` — tydligt annan yta än `blockquote.lagtext`. Ligger inuti en `[data-accordion]`-panel; ingen egen `<h3>` (accordion-knappen är rubriken). |
| `.folkratt-citat` | Århus-citat — visuellt skilt från både lagtext och tolkning. |
| `.ordlista` (kan återanvända `.definitions`) | Ordlistan. |

### 6.3 Visuell åtskillnad lagtext / tolkning — hård regel

Genomgående på **båda** nya sidorna, inte bara i posterna:

- **Ordagrann svensk lagtext** står alltid i `blockquote.lagtext` — vit botten,
  serif, kraftig vänsterram i `--area-lagtext`, alltid med `.lagtext-meta` direkt efter.
- **Kents/guidens förklaring och tolkning** står alltid på tonad botten
  (`--area-lagtext-pale`) i `.lagtext-varfor`, eller som vanlig brödtext — aldrig i
  eller intill ett citat utan den visuella brytningen emellan.
- På `paverka.html`: varje ordagrant citat använder `blockquote.lagtext`; allt annat är
  tydligt kommentar.

### 6.4 `script.js` — hash-hantering

Lägg till: vid sidladdning och vid `hashchange`, om `location.hash` pekar på en
`.lagtext-post` (eller ett id inuti en):

1. scrolla dit och sätt kort fokus på rubriken (`tabindex="-1"` + `.focus()`), så
   direktlänkar landar rätt även för skärmläsare;
2. **öppna den postens accordion** (sätt `aria-expanded="true"` på knappen, ta bort
   `hidden` på panelen), så en delad länk landar på en synlig förklaring.

Ingen annan ändring i `script.js`. Får inte påverka `verktyg.html` eller de sidor som
saknar `.lagtext-post` (ingen effekt där). Fungerar även utan JS: lagtexten och metadata
syns ändå, bara accordion-panelen förblir stängd tills användaren klickar.

---

## 7. Teknik-modal (`<dialog id="tech-dialog">`)

Återanvänds oförändrad från `fordjupning.html`, med två ändringar i innehållet:

1. **Filträdet** i `<pre>` uppdateras till avsnitt 0:s struktur (lägg till `paverka.html`
   och `lagtexter.html`).
2. På `lagtexter.html` får modalen ett extra `<p>` i "Process, inte bara teknik"-delen:
   att varje lagtext är hämtad ordagrant från riksdagens författningssamling och
   kontrollerad tecken för tecken mot fulltext vid ett angivet datum, samt att
   förklaringarna är åtskilda från lagtexten för att de aldrig ska förväxlas. Formuleras
   passivt (Regel 13) — "lagtexterna är hämtade och kontrollerade", inte "jag har läst".

Övrigt i modalen (Claude-kompassen-länken, PRD-blob-länken, citatet) står kvar oförändrat.

---

## 8. Källhantering och datummärkning

Följer `kent-referens-skill` (Harvard, länkad förstahänvisning i löptext, utskriven URL,
hämtdatum på föränderliga webbkällor, annoterad + alfabetisk referenslista, länkkontroll
före leverans).

### 8.1 Per lagtext

- **Primärkälla:** Sveriges riksdags författningssamling (riksdagen.se), SFS i fulltext.
  Andrahandskälla vid behov: lagen.nu. Om de skiljer sig — redovisa och följ riksdagen.se.
- Varje `.lagtext-meta`-rad anger: **gällande lydelse per [datum]**, lagens SFS-nummer,
  **SFS-numret för den ändring som gav paragrafen dess nuvarande lydelse**, samt
  länk + hämtdatum.
- Sidfoten på `lagtexter.html` anger: **"Lagtexterna kontrollerade mot fulltext
  [datum]."**

### 8.2 Referensförteckning (`#kallor`)

Alfabetisk, annoterad (kort kursiv relevansförklaring i samma stycke). Minst:

- Sveriges riksdag (1998) *Miljöbalk (1998:808)* — med de kapitel/paragrafer sidan citerar.
- Sveriges riksdag (2010) *Plan- och bygglag (2010:900)* — likaså.
- UNECE (1998) *Århuskonventionen* + Sveriges ratificering (SÖ 2005:28 / regeringen.se).
- Boverket, PBL kunskapsbanken — för de processuppgifter `paverka.html` lutar sig mot.
- Naturvårdsverket — vägledning om miljöbedömningar (strategisk/specifik).

`paverka.html` har en egen, egen referensförteckning i samma stil (avsnitt 10).

### 8.3 Länkkontroll

Innan leverans: öppna varje URL, bekräfta att den leder rätt och stöder påståendet,
redovisa ev. åtkomstproblem. (Huvud-PRD:ns avsnitt 13 punkt 5a–5b: kontrollera med
faktisk hämtning, inte bara sökträff.)

---

## 9. `README.md` — ändringar

1. **Innehåll**-listan: lägg till `paverka.html` och `lagtexter.html` med en rad var.
   Uppdatera `styles.css`/`script.js`-raderna (ny navigering + lagtext-komponenter).
2. **Status**-stycket: ny mening om v1.7.
3. Ny **versionsrad** enligt tumregeln (innehållstillägg → decimal): "v1.7 lade till
   strategilagret *Så påverkar vi* (`paverka.html`) och sidan *Lagtexterna*
   (`lagtexter.html`) med de tio viktigaste lagtexterna ordagrant, samt en gemensam
   toppmeny på alla sidor."
4. **Djuplänkstabell** (kent-bygg-sidor Regel 7): ny tabell som listar alla ankar-id på
   `paverka.html` och `lagtexter.html` med full URL
   (`https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/lagtexter.html#mb-2-6`
   osv.).
5. **Lokal sökväg** (Regel 9): lägg till en rad högst upp eller under "Live-sida" med
   den lokala repo-sökvägen och GitHub-URL:en, om den saknas i dag (den gör det).
6. Notera under status att ankar-retrofit av `index/fordjupning/verktyg` "kvarstår".

---

## 10. `paverka.html` — strukturskiss (sakinnehåll skrivs från PRD:n vid bygget)

Ingen egen SPEC för sakinnehållet (tilläggs-PRD:n avsnitt 10: A–C är prosa i etablerad
mall). Denna SPEC låser bara **sektionsordningen, ankar-id:n och vilken PRD-del som
matar varje sektion.**

| Ordning | `<section>` | Ankar-id | Matas av | Not |
|---|---|---|---|---|
| 1 | Hero | — | PRD 1, 3 | Eyebrow "Strategilagret". Lead: hur medborgare och föreningar faktiskt påverkar. |
| 2 | Så påverkar vi — översikt | `#sa-paverkar-vi` | PRD 4 (ingress) | Kort: det finns ett lager ovanför dispositionen. |
| 3 | **Vilken lag gäller när kommunen antar en plan?** | `#vilken-lag` | Planeringsdialogen 2026-09-09 + PRD 4a, 6 | **Kärnan i Kents fråga.** Tabell: ÖP / FÖP / detaljplan → PBL styr processen (3 kap. resp. 5 kap.), MB 6 kap. strategisk miljöbedömning styr miljöbedömningen, MB i övrigt (2, 3–4, 5, 7 kap.) som botten. Verksamhet (täkt/gruva/hamn) → MB styr allt, specifik miljöbedömning. Förklara att det aldrig är "PBL **eller** MB" för en plan. FÖP nämns som "samma PBL 3 kap.-process som ÖP, för en avgränsad del av kommunen" — ingen egen dispositionsmall. |
| 4 | Vilken lag styr vilken process — beslutsstöd | `#beslutsstod` | PRD 4a (tabellen) | **Orienterande** tabell. Fotnot: bara de paragrafer som också står på `lagtexter.html` är ordagrant verifierade; övriga rader är kontrollerade mot Boverket/Naturvårdsverket. Länk till `lagtexter.html`. |
| 5 | Vad gör en synpunkt verkningsfull | `#verkningsfull-synpunkt` | PRD 4b | Formkrav, innehåll som biter, föreningen som aktör. Knyt till sexdelsmodellen och `fordjupning.html`. |
| 6 | Rätt tid — skede för skede | `#ratt-tid` | PRD 5a + avsnitt 10.1–10.2 | Den vertikala tidslinjen (tre spår) + Lund-rutan + frister i klartext. **Alla frister och paragrafer verifieras mot PBL/MB + Boverkets PBL kunskapsbank + Naturvårdsverket vid research.** |
| 7 | Klagorättsregeln — varningsruta | `#klagoratt` | PRD 5b | `.notice`-ruta. PBL 13 kap. 11 §, undantagen, den praktiska konsekvensen + checklista. Länk till `lagtexter.html#pbl-13-11`. |
| 8 | Miljöorganisationers särställning | `#talerätt` → använd `#taleratt` (inga å/ä/ö) | PRD 5c | MB 16 kap. 13 § (villkoren: ändamål, 3 år, minst 100 medlemmar — **verifieras**), motsvarande PBL-rätt, Århuskonventionen som folkrättslig grund. Länk till `lagtexter.html#mb-16-13` och `#arhus`. |
| 9 | Miljöbedömning och MKB — kort | `#miljobedomning-kort` | PRD 6 (Tillägg C) | **Sammanfattningsruta**, ingen ny tabell. "Miljöbedömning = processen. MKB = dokumentet. Strategisk = planer/program. Specifik = verksamheter/åtgärder." Länk till den fullständiga tabellen i `fordjupning.html#terminologi-mb`. Plus: var föreningen påverkar MKB:n = i avgränsningssamrådet. |
| 10 | Källor | `#kallor` | PRD 11 | Egen annoterad, alfabetisk Harvardlista. |

Ankar-id på H3-nivå inom sektionerna sätts vid bygget, samma regel (stabila, inga å/ä/ö).

### 10.1 Tidslinjen — vertikal, tre spår (`#ratt-tid`)

**Form:** en inline-`<svg>` per spår (tre stycken), staplade, eller en enda `<svg>` med
tre kolumner — **byggbeslut vid implementeringen**, det som är låst är: vertikalt flöde
uppifrån och ned, Samrådsguidens palett (inga widget-/`c-*`-klasser), ingen JavaScript,
inget beroende av JS för att förstå bilden, `<title>` + `<desc>` på varje `<svg>`
(`role="img"`), och att bred SVG ligger i en `.table-scroll`-container så sidan aldrig
scrollar horisontellt.

**Färgkodning (tre värden, förklaras i en bildtext under):**

| Färg | Betydelse |
|---|---|
| `--area-kompensation` (grön) | Skede där privatpersoner och föreningar kan lämna synpunkter |
| `--gold` / `--alert` (guld) | Kritiskt skede — skriftligt yttrande krävs här för att behålla rätten att överklaga |
| `--muted` / grå | Skede utan formell rätt att yttra sig |

**Spår A — Översiktsplan (och fördjupad översiktsplan), PBL 3 kap.**

| Skede | Lagrum / not | Synpunktsrätt |
|---|---|---|
| Kommunen påbörjar arbetet | PBL 3 kap. | Grå |
| **Samråd** | PBL 3 kap. 8 § | Grön |
| **Granskning / utställning** | PBL 3 kap. 12 § · minst två månader | Grön (ingen "förlorad talerätt"-spärr som i detaljplan) |
| Kommunfullmäktige antar planen | PBL 3 kap. 19 § | Grå |
| Laga kraft | PBL 3 kap. 21 § · kan i princip bara laglighetsprövas (kommunallagen), inte sakprövas | Grå |
| Prövas varje mandatperiod | PBL 3 kap. 23 och 25 §§ | — (not, inte ett eget steg) |

FÖP visas som en not på spår A: "samma process, för en avgränsad del av kommunen".

**Spår B — Detaljplan, PBL 5 kap.** (utökat förfarande som normalfall; kortare tider
vid standardförfarande anges som not)

| Skede | Lagrum / not | Synpunktsrätt |
|---|---|---|
| Området i dag | — | Grå |
| Planbesked / planuppdrag ("tidiga skeden") | PBL 5 kap. 2–5 §§ | Grå |
| Programsamråd (om det hålls) | PBL 5 kap. · frivilligt | Grön |
| **Samråd** | PBL 5 kap. 11 § · samrådsredogörelse | Grön |
| **Granskning** | PBL 5 kap. 18 § · minst tre veckor (utökat) / två veckor (standard) | **Guld** — yttra dig skriftligt här, annars kan rätten att överklaga gå förlorad (PBL 13 kap. 11 §) |
| Ev. ny granskning efter väsentlig ändring | PBL 5 kap. 25 § | Grön (villkorat steg) |
| Kommunen antar planen | nämnd eller kommunfullmäktige | Grå |
| **Överklagande, tre veckor** | PBL 13 kap. 11 § (alla) och 12 § (miljöorganisationer) · till mark- och miljödomstolen, därefter ev. Mark- och miljööverdomstolen med prövningstillstånd | Grön |
| Laga kraft — genomförande | — | Grå |

**Spår C — Verksamhetstillstånd, miljöbalken** (täkt, gruva, hamn, vattenverksamhet —
NCC/Skrylle-typen)

| Skede | Lagrum / not | Synpunktsrätt |
|---|---|---|
| Området i dag | — | Grå |
| Ev. undersökningssamråd | MB 6 kap. 23–26 § · bara om det är oklart om betydande miljöpåverkan | Grön (villkorat) |
| **Avgränsningssamråd** | MB 6 kap. 29 § · enda ordinarie samrådet; synpunkter på MKB:ns omfattning | Grön |
| Ev. kompletterande samråd | inget eget lagrum | Grön (villkorat) |
| Ansökan lämnas till mark- och miljödomstolen | — | Grå |
| **Kungörelse av ansökan** | yttrande i målet · här är ett tydligt av-/tillstyrkande juridiskt meningsfullt | Grön |
| Dom i mark- och miljödomstolen | — | Grå |
| **Överklagande till Mark- och miljööverdomstolen** | en miljöorganisation får överklaga enligt MB 16 kap. 13 § **även utan att ha varit part** | Grön |
| Laga kraft | — | Grå |

**Alla frister, instansnamn och paragrafer i de tre tabellerna verifieras vid
research-steget** mot PBL, MB, Boverkets PBL kunskapsbank och Naturvårdsverkets
vägledning. Siffror som inte kan bekräftas skrivs som "minst [x]" utan exakt tal, eller
utelämnas.

Under tidslinjen: en kort bildtext som förklarar färgerna, plus 2–3 meningar om att
detaljplanespårets granskningsskede är det enda där ett *uteblivet* yttrande får en
rättslig följd (PBL 13 kap. 11 §) — kopplar till varningsrutan i sektion 7 och till
`lagtexter.html#pbl-13-11`.

### 10.2 Anknytning till Lunds kommun (sidoruta på spår B)

Guiden är generell (huvud-PRD:n avsnitt 12: "inte kommun-specifikt"). Men eftersom Kent
bor och verkar i Lund får detaljplanespåret **en tydligt märkt sidoruta** — inte
inflätat i den generella texten som om alla kommuner gör exakt lika.

Rubrik: **"Exempel: så ser Lunds kommun på processen"**. Innehåll:

1. Lunds kommun beskriver detaljplaneprocessen i sex steg: **planuppdrag → samråd →
   granskning → antagande → (eventuellt överklagande) → laga kraft**, med "Möjlighet
   att lämna synpunkter" markerat över både *samråd* och *granskning*. (Motsvarar
   spår B ovan.)
2. Lunds kommuns plandatabas märker varje ärende med en av sex **statusar**. I
   bokstavsordning på sajten; i **tidsordning**: Bearbetas → Samråd → Godkänd →
   Antagen → Överklagad → Laga kraft. En kort mening per status om vad den innebär.
3. "Detaljplaner i tidiga skeden" är Lunds term för ärenden före formellt samråd
   (planuppdrag, program) — spår B:s grå inledande steg.
4. **Verifieras vid research:** att "Granskning" finns i Lunds *processbild* men inte
   bland de sex sökbara statusarna (den tycks rymmas i "Bearbetas") — kontrolleras mot
   sidan innan rutan skrivs färdigt. Kolla också om Lund använder "utställning" för
   översiktsplanen.
5. Källa (kent-referens, hämtdatum): Lunds kommun (u.å.) *Detaljplaner*. Tillgänglig på:
   https://lund.se/stadsutveckling-och-trafik/detaljplaner-och-oversiktlig-planering/detaljplaner
   (Hämtad: [datum]). Kort kursiv relevansförklaring.

Sidorutan använder en egen, dämpad stil (t.ex. `.method-note` eller en `.notice`-variant)
så den läses som *ett exempel*, inte som en del av den generella beskrivningen.

---

## 11. Manuell verifieringschecklista (innan leverans)

**Lagtext och källa**

- [ ] Varje citerad paragraf är hämtad från riksdagen.se och stämmer **tecken för tecken**
      mot fulltext (fräscha-ögon-genomläsning, PRD avsnitt 13).
- [ ] Varje `.lagtext-meta` anger lydelsedatum, lagens SFS-nummer, ändrings-SFS och
      hämtdatum.
- [ ] Ingen paragraf återges ur minnet eller parafraserad i ett `blockquote.lagtext`.
- [ ] Paragrafer som inte kunde verifieras är utelämnade, och utelämnandet är noterat.
- [ ] Post 10: den exakta PBL-paragrafen för miljöorganisationers planöverklagande är
      bekräftad mot lagtext (inte antagen till 13:12).
- [ ] MB 16:13: "minst tre år" och "minst 100 medlemmar" är kontrollerade mot fulltext.
- [ ] Alla frister/instanser på `paverka.html` (inklusive de tre tidslinjetabellerna i
      10.1) är verifierade mot PBL/MB + Boverkets PBL kunskapsbank + Naturvårdsverket,
      inte mot allmänna sammanfattningar.
- [ ] Lund-rutan (10.2): de sex statusarna, sexstegsprocessen och "tidiga skeden" är
      kontrollerade mot lund.se med en faktisk hämtning; "Granskning"-frågan är utredd.
- [ ] Alla externa länkar öppnade och kontrollerade (leder rätt, stöder påståendet).
- [ ] Referensförteckningarna är alfabetiska och annoterade (kent-referens punkt 7–8).

**Struktur och form**

- [ ] Lagtext (`blockquote.lagtext`, vit botten, alltid synlig) och tolkning
      (`.lagtext-varfor`, tonad botten, i accordion) är visuellt åtskilda i varje post
      och kan aldrig förväxlas.
- [ ] Varje accordion-förklaring ("Vad betyder den här paragrafen?") är **exakt 5
      meningar** enligt strukturen i 5.3.
- [ ] Direktlänk till en post öppnar den postens accordion; utan JS syns lagtexten ändå.
- [ ] Tidslinjen: tre `<svg>` (eller en med tre kolumner), vertikalt flöde, `<title>` +
      `<desc>` på varje, färgförklaring under, bred SVG i `.table-scroll`. Begriplig utan
      JS och utan färgseende (färg + text, inte bara färg).
- [ ] Ordlistan ligger högst upp på `lagtexter.html`, 6–8 termer.
- [ ] Århus-rutan är märkt "folkrätt, inte svensk lagtext" och använder `.folkratt-citat`,
      inte `blockquote.lagtext`.
- [ ] Toppmenyn finns på alla fem sidor, med `aria-current="page"` rätt satt, och bryter
      snyggt på 360 px.
- [ ] Varje H2/H3 på de två nya sidorna har ett stabilt id utan å/ä/ö och ett
      hover-`#`-ankare.
- [ ] Direktlänk (`lagtexter.html#mb-6-3`) scrollar rätt och sätter fokus, även utan JS
      (ankaret ensamt räcker; JS förbättrar bara fokus).
- [ ] Versionsraden är **1.7** i sidfoten på alla fem sidor; `lagtexter.html` har dessutom
      "Lagtexterna kontrollerade [datum]".
- [ ] `verktyg.html` fungerar oförändrat (data.js/verktyg.js orörda; script.js-tillägget
      har ingen effekt där).
- [ ] Teknik-modalens filträd är uppdaterat på alla sidor.
- [ ] README: nya filer, versionsrad, djuplänkstabell, lokal sökväg.
- [ ] Sidorna fungerar utan JavaScript (progressiv förbättring).

---

## 12. Avgjort i dialogrunda 2 (2026-09-09)

- **Öppet vs accordion:** lagtexten alltid synlig, förklaringen bakom "Vad betyder den
  här paragrafen?" (accordion). ✔
- **Ordlistan:** kort version högst upp. ✔
- **Post 5-rubriken:** kort H2 ("När en miljöbedömning ska göras"), paragrafnumren i
  `.lag-anvandning`-raden. ✔
- **Tidslinjen:** vertikal, tre spår (översiktsplan, detaljplan, MB-verksamhet),
  anknyter till Lunds kommuns process och statusetiketter. ✔

## 12b. Kvarstående öppen punkt

1. **Ankar-retrofit** av `index.html` / `fordjupning.html` / `verktyg.html` — nu i samma
   omgång, eller som senare uppgift? SPEC:en utgår från "senare" (de tre får bara
   toppmeny + versionsrad 1.7 nu).
