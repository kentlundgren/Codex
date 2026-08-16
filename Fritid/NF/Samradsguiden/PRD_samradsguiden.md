# PRD — Samrådsguiden

Ett generellt verktyg för hur privatpersoner och miljöorganisationer kan disponera och lägga upp yttranden och synpunkter under ett samråd.

Status: utkast till PRD, inte beslutad. Material under fortsatt diskussion.

## 1. Bakgrund

Arbetet med NCC:s samråd om täkt- och vattenverksamhet vid Södra Sandby (`NCC_stenbryttning/`) gav upphov till en etablerad metod för hur ett yttrande i ett **avgränsningssamråd enligt miljöbalken** kan struktureras — dokumenterad i `struktur.html` och i skillen `Skills/samradsunderlag/`. Den metoden bygger på Statsrådsberedningens generella anvisningar för remissvar (Statsrådsberedningen, 2026) och är i grunden inte begränsad till miljöbalken — Boverket, en myndighet inom plan- och byggområdet, tillämpar uttryckligen samma ordning (Boverket, 2026a).

Det som saknas är en **generell, fristående** beskrivning som visar hur samma grundprincip tillämpas dels vid samråd enligt **plan- och bygglagen (PBL)**, dels vid samråd enligt **miljöbalken (MB)** — vad som är gemensamt, vad som skiljer, och vad som skiljer beroende på mottagare (kommun eller länsstyrelse) och skede i processen. Dessutom ska verktyget lyfta **frivilliga kompensationsåtgärder** som en möjlighet att ta med i ett yttrande, med konkreta kommunexempel.

## 2. Mål

Ett verktyg (webbsida i HTML/CSS/JS) som:

1. Förklarar den gemensamma grundprincipen för hur ett samrådsyttrande disponeras, oavsett lagrum.
2. Visar konkret hur dispositionen fylls olika beroende på om yttrandet gäller ett samråd enligt PBL eller enligt MB.
3. Förklarar hur mottagare (kommun respektive länsstyrelse/mark- och miljödomstol) påverkar yttrandets ärenderam och krav-nivåer.
4. Visar separata dispositionsmallar för första, andra och (i förekommande fall) tredje samrådstillfället, för respektive lagrum.
5. Erbjuder en aktiv modul för frivilliga kompensationsåtgärder, med färdiga formuleringsförslag och kommunexempel, som användaren kan välja att ta med i sitt yttrande.
6. Låter användaren bygga ett eget utkast interaktivt och få ut resultatet som kopierbar text eller nedladdningsbar fil.
7. Hämtar konkreta exempel från NCC/Skrylle-ärendet där det är pedagogiskt användbart, utan att verktyget i övrigt handlar om det ärendet.

## 3. Avgränsning — vad ingår inte

- Verktyget ger inte juridisk rådgivning och tar inte ställning i enskilda ärenden. Det är ett metod- och strukturstöd, inte en juristtjänst.
- Verktyget skriver inte sakinnehållet åt användaren (vilka miljöeffekter, vilka planbestämmelser) — det strukturerar och ger formuleringsstöd för sådant användaren själv tar fram.
- Bygglovssamråd och andra PBL-processer utanför detaljplaneläggning (t.ex. rena bygglovsärenden utan planprocess) hanteras inte i version 1, men nämns kort som avgränsning så att användaren inte tror att verktyget täcker allt inom PBL.
- Inloggning, delning mellan användare eller lagring på server ingår inte. Allt sker i webbläsaren.

## 4. Målgrupp

Privatpersoner och ideella miljöorganisationer (t.ex. en naturskyddsförening) som vill lämna synpunkter i ett samråd, utan att nödvändigtvis ha juridisk bakgrund. Verktyget ska vara begripligt utan förkunskaper men hålla en presicionsnivå som håller för att citeras i en formell process.

## 5. Innehållslig utgångspunkt — är PBL och MB verkligen olika dispositioner?

Delvis. Det är viktigt att verktyget inte överdriver skillnaden, eftersom den redan dokumenterade metoden (`Skills/samradsunderlag/SKILL.md`) visar att **grundstrukturen är gemensam**: Statsrådsberedningens anvisning gäller myndighetsövergripande, och Boverket — en renodlad PBL-myndighet — tillämpar uttryckligen samma ordning som i MB-exemplet (Boverket, 2026a). Sexdelsmodellen (ärendets ram, sammanfattning, referat, synpunkter i underlagets ordning, vad som begärs, källförteckning) är alltså inte MB-specifik.

**Det som faktiskt skiljer PBL och MB åt är:**

| Skillnad | PBL (detaljplan) | MB (t.ex. täkttillstånd) |
|---|---|---|
| Vilket underlag del 4 hämtar rubriker från | Planbeskrivningen och plankartan | Samrådsunderlaget och den kommande MKB:n |
| Vad "vad som begärs" kan innehålla | Begäran om ändrad planbestämmelse, ändrad plankarta, kompletterande utredning, eller att planen inte antas i föreslagen form | Begäran om komplettering av MKB, förslag till villkor, eller till-/avstyrkande av ansökan |
| Mottagare i normalfallet | Kommunen (stadsbyggnadskontor/motsvarande) | Länsstyrelsen (i tidiga samråd) och mark- och miljödomstolen (i den slutliga prövningen) |
| Skedesindelning | Program (frivilligt) → samråd → granskning → antagande → ev. överklagan | (Ev. undersökningssamråd) → avgränsningssamråd → ev. kompletterande samråd → ansökan/kungörelse → yttrande i målet |
| Lagrum för själva samrådsskyldigheten | PBL 5 kap., främst 11–19 §§ | MB 6 kap., främst 29–36 §§ |

Verktyget ska bygga på denna nyanserade bild: **en gemensam disposition, olika innehåll i två av dess sex delar, och olika skedesindelning.** Detta är den bärande pedagogiska poängen och bör förklaras tydligt innan de två konkreta mallarna visas, så att användaren förstår att hen inte lär sig två helt olika system.

*Källor att kontrollera och fördjupa under innehållsproduktionen: Boverkets PBL kunskapsbanken om samråd och granskning vid detaljplaneläggning (Boverket, u.å., preliminär referens — exakta paragrafhänvisningar för 5 kap. behöver verifieras sida för sida innan publicering, se avsnitt 13).*

## 6. Samrådsstegen — separata dispositioner

Per beslut ska varje steg ha sin egen mall, eftersom stegen har olika syfte och olika juridisk tyngd.

### 6.1 PBL — detaljplaneprocessen

1. **Programsamråd** (frivilligt, tidigt skede — förekommer inte i alla planer). Yttrandet är på idé-/inriktningsnivå: vilka alternativ bör utredas, vilka värden bör vägas in.
2. **Samråd** (PBL 5 kap., preliminärt 11–17 §§). Yttrandet gäller ett konkret planförslag. Kommunen sammanställer inkomna synpunkter i en samrådsredogörelse.
3. **Granskning** (PBL 5 kap., preliminärt 18–19 §§, kallas ibland "utställning"). Sista tillfället att lämna synpunkter innan planen antas. Yttrandet bör vara skarpare formulerat — den som inte yttrar sig i granskningen riskerar att förlora rätten att överklaga planen senare. Kommunen sammanställer ett granskningsutlåtande.

### 6.2 MB — tillståndsprocessen

1. **Avgränsningssamråd** (MB 6 kap. 29 §). Redan dokumenterat i `struktur.html`. Gäller verksamhetens lokalisering, omfattning, utformning och MKB:ns innehåll — inte ansökans utfall.
2. **Kompletterande/utökat samråd**, om förutsättningarna ändras väsentligt mellan avgränsningssamrådet och ansökan. Yttrandet kan här fokusera på vad som förändrats sedan första samrådet.
3. **Yttrande vid kungörelse av ansökan** hos mark- och miljödomstolen. Formellt inte längre ett "samråd" utan ett yttrande i ett pågående mål — men i praktiken den tredje möjligheten allmänheten/organisationer har att uttala sig, och därför medtagen enligt uppdraget. Här är det första tillfället då ett tydligt tillstyrkande eller avstyrkande är juridiskt meningsfullt att uttala.

**Genomgående princip för alla sex mallarna:** tonen och kravnivån ska vara proportionerlig mot skedet (jfr `Skills/samradsunderlag/SKILL.md`, steg 4). Ett tidigt skede efterfrågar och föreslår; ett sent skede kan formulera skarpare ställningstaganden eftersom förslaget då är låst i detalj.

## 7. Mottagare: kommun eller länsstyrelse

En egen, kort sektion som förklarar att detta påverkar framför allt del 1 (ärendets ram) och tonen i del 5 (vad som begärs):

- **Kommunen** hanterar PBL-processens samråd och granskning. Yttranden riktas dit, och kommunen är också den instans som slutligt antar planen.
- **Länsstyrelsen** deltar i båda lagrummen men med olika roller: i PBL-samråd som en av flera samrådsparter (statens företrädare, kan överpröva kommunens beslut i vissa fall); i MB-processen ofta som mottagare av avgränsningssamrådet och som tillsynsmyndighet, medan den slutliga prövningen av tillståndsansökan görs av mark- och miljödomstolen.
- Praktisk konsekvens för yttrandeskrivaren: kontrollera alltid i det aktuella samrådsunderlaget vem som är avsedd mottagare och vilken instans som fattar nästa beslut — det avgör hur "vad som begärs" bör formuleras (jfr iakttagelsen i den tidigare NCC-analysen om att avsändare/mottagare/svarsdag saknades i ett av utkasten, vilket i sig är en brist värd att påpeka).

## 8. Kompensationsåtgärder — modulen

**Rättsligt läge (att beskriva korrekt, inte överdrivet):** Ekologisk/miljömässig kompensation är i dag inte ett generellt lagstadgat krav i Sverige utanför vissa specialfall (t.ex. villkor kopplade till artskyddsdispens eller Natura 2000-tillstånd). Det innebär att en kommun eller verksamhetsutövare kan välja att arbeta med kompensationsåtgärder frivilligt, och flera kommuner gör det genom egna riktlinjer eller handböcker. Enligt Boverkets egen sammanställning av kommunala exempel (Boverket, u.å.) och Ekoplankompassen (Ekoplankompassen, u.å.) har bland annat **Göteborgs stad** (beslut i flera nämnder 2008/09, utökat till ekosystemtjänster 2017) och **Lomma kommun** (arbetat med kompensation sedan slutet av 1990-talet) etablerade arbetssätt, och **Helsingborgs stad** tillämpar den så kallade balanseringsprincipens fyra steg i planprocessen. Uppgiften om Solna kommun i uppdraget kunde inte bekräftas mot de källor som kontrollerats hittills och behöver verifieras separat innan den används i publicerat innehåll (se öppna frågor, avsnitt 13).

**Modulens funktion i verktyget:**

- Ett fristående, valbart avsnitt användaren kan lägga till i sitt yttrande, oavsett om ärendet gäller PBL eller MB.
- Kort förklaring: vad kompensationsåtgärder är, att det är frivilligt, och varför det ändå kan vara relevant att föreslå i ett yttrande (t.ex. som ett alternativ eller komplement till avslag, eller som ett villkor om tillstånd ändå ges).
- Kommunexempel med korta beskrivningar och källhänvisning (Göteborg, Lomma, Helsingborg som verifierade; eventuellt fler efter kontroll).
- Färdiga formuleringsförslag att utgå från, i två varianter: dels en fråga/begäran ("Har kompensationsåtgärder övervägts, och i så fall vilka?"), dels ett konkret förslag att foga till "vad som begärs" ("Om tillstånd ändå ges, bör ett villkor om kompensationsåtgärder för [naturvärde] övervägas, motsvarande den modell [kommun] tillämpar för …").
- Tydlig markering att detta är en **möjlighet**, inte ett krav — verktyget ska inte ge intryck av att kompensationsåtgärder är en rättighet eller skyldighet enligt gällande rätt.

## 9. Funktionella krav

### 9.1 Förklarande del

- En sida som beskriver grundprincipen (avsnitt 5 ovan): gemensam disposition, olika innehåll.
- Sida per lagrum (PBL, MB) som visar dess tre skeden och respektive dispositionsmall, i samma visuella mönster som `struktur.html` redan etablerat (kort-layout, källstöd i anslutning till varje påstående).
- Egen sida/sektion för kompensationsåtgärder.
- Genomgående hänvisning till NCC/Skrylle-ärendet som konkret exempel där det är pedagogiskt värdefullt, med länk till `NCC_stenbryttning/`.

### 9.2 Interaktiv del

- Ett stegvis formulär: användaren väljer (1) lagrum (PBL/MB), (2) skede (samråd/granskning/etc., anpassat efter valt lagrum), (3) mottagare, (4) om kompensationsåtgärder ska tas med.
- Baserat på valen genereras en strukturerad mall med de sex delarna, förifyllda med rätt rubriker för del 4 (hämtade från ett användarangivet underlags egna avsnitt, inmatat som fritext av användaren) och rätt kravtyper för del 5.
- Varje del har ett textfält där användaren kan skriva sin egen text, med korta hjälptexter (samma innehåll som den förklarande delen, kondenserat).
- En sammanställningsvy som visar hela yttrandet i sin helhet.

### 9.3 Export

- Knapp för att kopiera hela texten till urklipp.
- Knapp för att ladda ner texten som `.md`- eller `.txt`-fil.
- Ingen inloggning, ingen serverlagring. Om användaren stänger fliken går ifyllt innehåll förlorat — detta ska anges tydligt i gränssnittet (t.ex. en diskret notis), eftersom localStorage inte ingår i version 1.

## 10. Tekniska krav

- Ren HTML/CSS/JS, statisk sida, samma tekniska profil som `NCC_stenbryttning/index.html` och `struktur.html` (inga byggverktyg, inga ramverk).
- Responsiv layout, samma visuella igenkänning (`styles.css`-mönster) som redan etablerats, men som en egen, fristående sida — inte samma CSS-fil rakt av, eftersom projekten ska vara oberoende av varandra.
- JavaScript för: utfällbara avsnitt (återanvänd mönstret från `script.js`), det stegvisa formuläret, sammanställningsvyn, kopiera-till-urklipp och nedladdningsfunktionen.
- Publiceras enligt samma mönster som övriga live-sidor i `Codex`-repot (`AGENTS.md`, projektinstruktioner): diskret GitHub-hörnlänk, teknikknapp med förenklad filstruktur, GitHub Pages-URL enligt `https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/`.

## 11. SPEC.md-checkpoint

Enligt den stående regeln om att varje PRD ska ta ställning till om ett SPEC.md-steg behövs: **ja, ett SPEC.md rekommenderas här**, till skillnad från enklare textleveranser. Skälet är att verktyget har flera samverkande tekniska delar som en genomförande-AI annars måste gissa sig till: det stegvisa formulärets tillståndshantering, exakt vilka fält som visas vid varje kombination av lagrum/skede/mottagare, den exakta datastrukturen för de sex dispositionsmallarna (PBL × 3 skeden, MB × 3 skeden, plus kompensationsmodulen), samt export-logikens gränsfall (tomma fält, specialtecken vid nedladdning). Ett SPEC.md bör beskriva denna datastruktur och formulärlogik i detalj innan kodning påbörjas.

## 12. Leveransplan (förslag)

1. **Research och källkontroll** — lös öppna frågor i avsnitt 13, särskilt PBL-paragraferna och kompensationsexemplen.
2. **SPEC.md** — datastruktur för dispositionsmallar, formulärlogik, exportformat.
3. **Förklarande del** — statiska sidor enligt avsnitt 9.1.
4. **Interaktiv del** — formulär, sammanställning, export enligt avsnitt 9.2–9.3.
5. **Publicering** — enligt avsnitt 10, med README och länkar till/från `struktur.html`.

## 13. Öppna frågor att lösa under innehållsproduktionen

Dessa ska besvaras innan sidorna skrivs färdigt, inte i denna PRD:

1. Exakta paragrafhänvisningar i PBL 5 kap. för samråd respektive granskning — behöver verifieras sida för sida mot Boverkets PBL kunskapsbank eller lagtexten direkt, eftersom flera sidförsök under research gav ofullständiga träffar.
2. Bekräfta eller stryk uppgiften om Solna kommuns arbete med frivillig kompensation — kunde inte styrkas mot de källor som kontrollerats hittills.
3. Om fler kommunexempel utöver Göteborg, Lomma och Helsingborg ska tas med, och i så fall vilka, med verifierad källa för var och en.
4. Exakt namn/URL-struktur för den nya mappen — förslaget `Samradsguiden` i denna PRD är en utgångspunkt, inte ett beslut.
5. Om en gemensam CSS-grund mellan `NCC_stenbryttning` och `Samradsguiden` är önskvärd på sikt, eller om de ska förbli helt oberoende som föreslaget i avsnitt 10.

## 14. Källor

Boverket (2026a) *Att svara på Boverkets remiss*. Tillgänglig på: https://www.boverket.se/sv/lag--ratt/boverkets-remisser/att-svara-pa-boverkets-remiss/ (Hämtad: 13 augusti 2026). *(Visar att Statsrådsberedningens sexdelsmodell tillämpas av en renodlad PBL-myndighet — grunden för avsnitt 5:s slutsats att disposition​sprincipen är gemensam över lagrummen.)*

Boverket (u.å.) *Kommunala exempel på frivillig kompensation i planering och byggande*, PBL kunskapsbanken. Tillgänglig på: https://www.boverket.se/sv/PBL-kunskapsbanken/teman/ekosystemtjanster/verktyg/kompensation/exempel/ (Hämtad: 13 augusti 2026, via sökträff — direkthämtning av sidan gav tekniskt fel vid kontroll och behöver verifieras på nytt innan publicering). *(Primärkälla för uppgifterna om Göteborgs stad och Lomma kommun som exempel på frivillig kompensation.)*

Ekoplankompassen (u.å.) *Ekoplankompassen — verktyg för ekologisk kompensation i fysisk planering*. Tillgänglig på: https://ekoplankompassen.se/ (Hämtad: 13 augusti 2026). *(Samarbete mellan Hållbar Utveckling Skåne och Högskolan Kristianstad; bekräftar bland annat Helsingborgs stads tillämpning av balanseringsprincipen och listar ett antal skånska kommuner som deltagit i referensgruppen.)*

Naturvårdsverket (2021) *Ekologisk kompensation*, Rapport 7008, september. Tillgänglig på: https://www.naturvardsverket.se/globalassets/media/publikationer-pdf/7000/978-91-620-7008-3.pdf (Hämtad: 13 augusti 2026). *(Nationell vägledning om ekologisk kompensations rättsliga status och tillämpning i Sverige.)*

Statsrådsberedningen (2026) *Svara på remiss: om remisser av betänkanden och andra förslag från Regeringskansliet*, SB PM 2021:1 (rev. 2026). Tillgänglig på: https://www.regeringen.se/rapporter/2021/09/svara-pa-remiss/ (Hämtad: 13 augusti 2026). *(Huvudkälla för den gemensamma sexdelsmodellen, redan etablerad i `struktur.html`.)*

Sveriges riksdag (1998) *Miljöbalk (1998:808)*. Tillgänglig på: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/miljobalk-1998808_sfs-1998-808/ (Hämtad: 13 augusti 2026). *(Lagtext för MB-sidan av verktyget, redan använd i `struktur.html`.)*

Sveriges riksdag (2010) *Plan- och bygglag (2010:900)*. Tillgänglig på: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/plan-och-bygglag-2010900_sfs-2010-900/ (Hämtad: 13 augusti 2026). *(Lagtext för PBL-sidan av verktyget. Exakta paragrafhänvisningar för samråd/granskning i 5 kap. behöver kontrolleras mot denna text innan innehållet skrivs färdigt, se avsnitt 13.)*
