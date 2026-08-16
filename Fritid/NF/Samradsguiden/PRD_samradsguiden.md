# PRD — Samrådsguiden

Ett generellt verktyg för hur privatpersoner och miljöorganisationer kan disponera och lägga upp yttranden och synpunkter under ett samråd.

Status: utkast till PRD, inte beslutad. Material under fortsatt diskussion.

## 1. Bakgrund

Arbetet med NCC:s samråd om täkt- och vattenverksamhet vid Södra Sandby (`NCC_stenbryttning/`) gav upphov till en etablerad metod för hur ett yttrande i ett **avgränsningssamråd enligt miljöbalken** kan struktureras — dokumenterad i `struktur.html` och i skillen `Skills/samradsunderlag/`. Den metoden bygger på Statsrådsberedningens generella anvisningar för remissvar (Statsrådsberedningen, 2026) och är i grunden inte begränsad till miljöbalken — Boverket, en myndighet inom plan- och byggområdet, tillämpar uttryckligen samma ordning (Boverket, 2026a).

Det som saknas är en **generell, fristående** beskrivning som visar hur samma grundprincip tillämpas dels vid samråd enligt **plan- och bygglagen (PBL)**, dels vid samråd enligt **miljöbalken (MB)** — vad som är gemensamt, vad som skiljer, och vad som skiljer beroende på mottagare (kommun eller länsstyrelse) och skede i processen. Verktyget ska också göra läsaren genuint kunnig om **kompensationsåtgärder** — inte bara att de kan nämnas frivilligt, utan det rättsliga läget i sin helhet, verkliga svenska fall, internationell praxis, och hur synpunkterna kan omfatta konstruktiva förslag till exploatören (se avsnitt 8).

## 2. Mål

Ett verktyg (webbsida i HTML/CSS/JS) som:

1. Förklarar den gemensamma grundprincipen för hur ett samrådsyttrande disponeras, oavsett lagrum.
2. Visar konkret hur dispositionen fylls olika beroende på om yttrandet gäller ett samråd enligt PBL eller enligt MB.
3. Förklarar hur mottagare (kommun respektive länsstyrelse/mark- och miljödomstol) påverkar yttrandets ärenderam och krav-nivåer.
4. Visar separata dispositionsmallar för första, andra och (i förekommande fall) tredje samrådstillfället, för respektive lagrum.
5. Gör läsaren kunnig om kompensationsåtgärder — inte bara medveten om att de finns — genom att förklara det rättsliga läget i tre spår (PBL, MB 16 kap. 9 §, MB 7 kap. 29 §), visa verkliga svenska fall och internationell praxis, och lära ut hur synpunkterna kan innehålla konstruktiva förslag till exploatören, inte bara kritiska frågor.
6. Anpassar ärendets ram efter om användaren skriver som privatperson eller på uppdrag av en förening/organisation.
7. Låter användaren bygga ett eget utkast interaktivt och få ut resultatet som kopierbar text eller nedladdningsbar fil.
8. Hämtar konkreta exempel från NCC/Skrylle-ärendet för MB-sidan, och ett motsvarande verkligt exempel för PBL-sidan, utan att verktyget i övrigt handlar om enskilda ärenden.

## 3. Avgränsning — vad ingår inte

- Verktyget ger inte juridisk rådgivning och tar inte ställning i enskilda ärenden. Det är ett metod- och strukturstöd, inte en juristtjänst.
- Verktyget skriver inte sakinnehållet åt användaren (vilka miljöeffekter, vilka planbestämmelser) — det strukturerar och ger formuleringsstöd för sådant användaren själv tar fram.
- Bygglovssamråd och andra PBL-processer utanför detaljplaneläggning (t.ex. rena bygglovsärenden utan planprocess) hanteras inte i version 1, men nämns kort som avgränsning så att användaren inte tror att verktyget täcker allt inom PBL. (Översiktsplanen, PBL 3 kap., byggdes in fullt ut i version 1.2 — se avsnitt 6.1 — och är alltså inte längre en avgränsning.)
- Inloggning, delning mellan användare eller lagring på server ingår inte. Allt sker i webbläsaren.

## 4. Målgrupp

Privatpersoner och ideella miljöorganisationer (t.ex. en naturskyddsförening) som vill lämna synpunkter i ett samråd, utan att nödvändigtvis ha juridisk bakgrund. Verktyget ska vara begripligt utan förkunskaper men hålla en presicionsnivå som håller för att citeras i en formell process.

Kompensationsmodulen (avsnitt 8) är skriven med en särskild delmålgrupp i åtanke: styrelseledamöter i en ideell naturskyddsförening som vill bli genuint skickliga på att skriva välgrundade yttranden över tid, inte bara lösa ett enskilt ärende. Den delen av verktyget får därför gärna vara djupare och mer tidskrävande att ta till sig än resten — fördjupningen (`fordjupning.html`, avsnitt 9.1) är den naturliga platsen för den, medan kortversionen (`index.html`) bara introducerar att modulen finns.

## 5. Innehållslig utgångspunkt — är PBL och MB verkligen olika dispositioner?

Delvis. Det är viktigt att verktyget inte överdriver skillnaden, eftersom den redan dokumenterade metoden (`Skills/samradsunderlag/SKILL.md`) visar att **grundstrukturen är gemensam**: Statsrådsberedningens anvisning gäller myndighetsövergripande, och Boverket — en renodlad PBL-myndighet — tillämpar uttryckligen samma ordning som i MB-exemplet (Boverket, 2026a). Sexdelsmodellen (ärendets ram, sammanfattning, referat, synpunkter i underlagets ordning, vad som begärs, källförteckning) är alltså inte MB-specifik.

**Det som faktiskt skiljer PBL och MB åt är:**

| Skillnad | PBL (detaljplan) | MB (t.ex. täkttillstånd) |
|---|---|---|
| Vilket underlag del 4 hämtar rubriker från | Planbeskrivningen och plankartan | Samrådsunderlaget och den kommande MKB:n |
| Vad "vad som begärs" kan innehålla | Begäran om ändrad planbestämmelse, ändrad plankarta, kompletterande utredning, eller att planen inte antas i föreslagen form | Begäran om komplettering av MKB, förslag till villkor, eller till-/avstyrkande av ansökan |
| Mottagare i normalfallet | Kommunen (stadsbyggnadskontor/motsvarande) | Länsstyrelsen (i tidiga samråd) och mark- och miljödomstolen (i den slutliga prövningen) |
| Skedesindelning | Program (frivilligt) → samråd → granskning → antagande → ev. överklagan | (Ev. undersökningssamråd) → avgränsningssamråd → ev. kompletterande samråd → ansökan/kungörelse → yttrande i målet |
| Lagrum för själva samrådsskyldigheten | PBL 5 kap. 11–13 §§ (samråd), 18, 21, 23 och 25 §§ (granskning) | MB 6 kap., främst 29–36 §§ |

Verktyget ska bygga på denna nyanserade bild: **en gemensam disposition, olika innehåll i två av dess sex delar, och olika skedesindelning.** Detta är den bärande pedagogiska poängen och bör förklaras tydligt innan de konkreta dispositionsmallarna visas (nio stycken totalt: fem för PBL — tre för detaljplan, två för översiktsplan — och fyra för MB, varav bara ett är ordinarie, se avsnitt 6), så att användaren förstår att hen inte lär sig två helt olika system.

**Tillägg (version 1.2): PBL har två planinstrument, inte ett.** Tabellen ovan gäller specifikt detaljplan. Översiktsplanen (PBL 3 kap.) är kommunens övergripande, vägledande men inte juridiskt bindande plan för hela kommunen, med egna lagrum för samråd (3 kap. 8 §) och granskning/utställning (3 kap. 12 §, minst två månader — betydligt längre än detaljplanens minst två veckor). Se avsnitt 6.1 för den fullständiga genomgången.

**Tillägg (version 1.2): miljöbedömning respektive miljökonsekvensbeskrivning är inte samma sak.** "Miljöbedömning" (MB 6 kap. 1 §) är processen; "miljökonsekvensbeskrivning" (MKB) är dokumentet som tas fram inom den. MB 6 kap. skiljer dessutom mellan strategisk miljöbedömning (planer/program, §§ 3–18) och specifik miljöbedömning (verksamheter/åtgärder, §§ 20–47) — med skilda lagrum även för avgränsningssamrådet: 6 kap. 9–10 §§ för planer (t.ex. en översiktsplan), 6 kap. 29 § för verksamheter (NCC/Skrylle-exemplet). Fullständig jämförelsetabell i `fordjupning.html`.

*Att kontrollera under innehållsproduktionen: Boverkets PBL kunskapsbanken har sidor om samråd och granskning vid detaljplaneläggning, men ingen fungerande direktlänk till dem kunde fastställas under denna research (skiljs här från källförteckningens övriga Boverket-poster, som gäller andra sidor). Exakta paragrafhänvisningar för 5 kap. behöver verifieras sida för sida mot lagtexten direkt innan publicering, se öppna frågor, avsnitt 13.*

## 6. Samrådsstegen — separata dispositioner

Per beslut ska varje steg ha sin egen mall, eftersom stegen har olika syfte och olika juridisk tyngd.

### 6.1 PBL — två planinstrument, fem skeden totalt

**Detaljplan** (ett avgränsat område, juridiskt bindande):

1. **Programsamråd** (frivilligt, tidigt skede — förekommer inte i alla planer). Yttrandet är på idé-/inriktningsnivå: vilka alternativ bör utredas, vilka värden bör vägas in.
2. **Samråd** (PBL 5 kap. 11–13 §§). Kommunen ska samråda med länsstyrelsen, lantmäterimyndigheten, berörda kommuner, kända sakägare och boende, samt myndigheter och organisationer med väsentligt intresse (5 kap. 11 §). Syftet är uttryckligen "att få fram ett så bra beslutsunderlag som möjligt" (5 kap. 12 §). Kommunen sammanställer inkomna synpunkter i en samrådsredogörelse.
3. **Granskning** (PBL 5 kap. 18, 21 och 23 §§, kallas ibland "utställning"). Planförslaget ska granskas under minst två veckor (5 kap. 18 §) och hållas tillgängligt tillsammans med samrådsredogörelsen (5 kap. 21 §). Sista ordinarie tillfället att lämna synpunkter innan planen antas — den som inte yttrar sig i granskningen riskerar att förlora rätten att överklaga planen senare. Kommunen sammanställer ett granskningsutlåtande (5 kap. 23 §). Om kommunen ändrar planförslaget väsentligt efter granskningen ska det ändrade förslaget granskas på nytt (5 kap. 25 §) — ett fjärde, villkorat tillfälle att yttra sig, värt att nämna i verktyget men inte en egen mall.

**Översiktsplan** (hela kommunen, vägledande men inte juridiskt bindande — byggdes in fullt ut i version 1.2):

4. **Samråd** (PBL 3 kap. 8 §). Kommunen ska samråda med länsstyrelsen, regionen, berörda kommuner samt medlemmar och andra som har ett väsentligt intresse. Länsstyrelsen ska enligt 3 kap. 10 § särskilt ta till vara och samordna statens intressen. Vid betydande miljöpåverkan tillkommer ett avgränsningssamråd enligt MB 6 kap. 9–10 §§ (PBL 3 kap. 9 a §) — en annan paragraf än det avgränsningssamråd (MB 6 kap. 29 §) som gäller verksamheter, se tillägget i avsnitt 5.
5. **Granskning/utställning** (PBL 3 kap. 12 §). Planförslaget ska hållas tillgängligt under minst två månader — betydligt längre än detaljplanens minst två veckor. Kommunfullmäktige antar därefter planen (3 kap. 19 §), som vinner laga kraft enligt 3 kap. 21 §. Sista tillfället att lämna synpunkter innan antagandet. Planen ska hållas aktuell och prövas varje mandatperiod (3 kap. 23 och 25 §§).

### 6.2 MB — tillståndsprocessen

**Rättad bild (version 1.3):** till skillnad från PBL:s detaljplaneprocess (tre ordinarie skeden) har MB bara **ett** alltid lagstadgat, ordinarie samråd — avgränsningssamrådet. De två andra posterna nedan är villkorade, inte ordinarie: den ena förekommer bara ibland *före* avgränsningssamrådet (om det är oklart om betydande miljöpåverkan föreligger), den andra bara ibland *efter* (om förutsättningarna ändras väsentligt). Detta korrigerar en tidigare version av verktyget som presenterade alla tre MB-poster med samma visuella vikt som PBL:s tre ordinarie steg — vilket felaktigt antydde symmetri mellan lagrummen.

0. **Undersökningssamråd** (MB 6 kap. 23–26 §§, villkorat). Förekommer bara när det är oklart om verksamheten kan antas medföra betydande miljöpåverkan. Skippas helt om verksamheten enligt miljöbedömningsförordningen kategoriskt alltid anses medföra det (vanligt för större täkter, t.ex. NCC/Skrylle) eller om sökanden själv redan utgår från det — då går processen direkt till avgränsningssamrådet. Länsstyrelsen beslutar efter undersökningen om betydande miljöpåverkan föreligger (26 §).
1. **Avgränsningssamråd** (MB 6 kap. 29–32 §§, **ordinarie**). Redan dokumenterat i `struktur.html`. Gäller verksamhetens lokalisering, omfattning, utformning, förväntade miljöeffekter och MKB:ns innehåll och utformning — det avgör alltså *var och hur* ärendet ska utredas, inte *om* tillstånd till slut ges. Den frågan avgörs först senare av mark- och miljödomstolen, sedan hela ansökan och MKB:n lämnats in och kungjorts.
2. **Kompletterande/utökat samråd** (villkorat, inget eget lagrum), om förutsättningarna ändras väsentligt mellan avgränsningssamrådet och ansökan. Inte ett andra ordinarie samråd av samma dignitet som avgränsningssamrådet. Yttrandet kan här fokusera på vad som förändrats sedan avgränsningssamrådet.
3. **Yttrande vid kungörelse av ansökan** hos mark- och miljödomstolen. Formellt inte ett "samråd" utan ett yttrande i ett pågående mål — men i praktiken den möjlighet allmänheten/organisationer har att till slut uttala sig om utfallet, och därför medtagen enligt uppdraget. Här är det första tillfället då ett tydligt tillstyrkande eller avstyrkande är juridiskt meningsfullt att uttala, och det tillfälle då frågan om tillstånd faktiskt avgörs.

**Genomgående princip för alla nio mallarna:** tonen och kravnivån ska vara proportionerlig mot skedet (jfr `Skills/samradsunderlag/SKILL.md`, steg 4). Ett tidigt skede efterfrågar och föreslår; ett sent skede kan formulera skarpare ställningstaganden eftersom förslaget då är låst i detalj.

### 6.3 Konkreta exempel per lagrum

Varje lagrum ska illustreras med ett verkligt, genomarbetat exempel — inte bara den abstrakta mallen.

**MB-exemplet är redan klart: NCC/Skrylle-ärendet.** Det är uteslutande ett miljöbalksärende, inte ett PBL-ärende. Det går att fastställa direkt från NCC:s samrådsunderlag:

- Ansökan gäller täktverksamhet, krossning, återvinning och asfalttillverkning — miljöfarlig verksamhet enligt **9 kap. MB** — samt länshållning och vattenöverledning — vattenverksamhet enligt **11 kap. MB**.
- Prövningen görs av **mark- och miljödomstolen**, inte av en kommun genom en planprocess.
- Samrådet är uttryckligen definierat som ett **avgränsningssamråd enligt 6 kap. 29 § MB** (samrådsunderlaget, avsnitt 4.1).
- Samrådsunderlaget slår själv fast, avsnitt 5.2: *"Planerat verksamhetsområde ligger utanför detaljplanelagt område och omfattas inte av områdesbestämmelser."* — dvs. en uttrycklig bekräftelse att ingen PBL-process är inblandad i det samrådet gäller.

NCC-ärendet används alltså som det konkreta MB-exemplet genomgående i verktyget, med länk till `../NCC_stenbryttning/`.

**PBL-exemplet är nu hittat: Naturskyddsföreningen Norrköpings yttrande om detaljplanen för Södra Björkalund.** Ett publicerat, offentligt yttrande vid samråd över en utställd detaljplan för nya bostäder (Naturskyddsföreningen Norrköping, 2026) — samma typ av avsändare (en lokal naturskyddsförening) som i NCC/Skrylle-exemplet, vilket gör de två exemplen pedagogiskt jämförbara. Yttrandet bör läsas i sin helhet och sammanfattas på samma sätt som NCC-ärendet gjordes (jfr avsnitt 6.3 ovan) innan det används som färdigt sidinnehåll — se leveransplanen, avsnitt 12. Alternativa exempel hittades också från Naturskyddsföreningen i Uppsala, Göteborg, Ängelholm, Huddinge och Motala, om Norrköpings exempel visar sig mindre lämpligt vid närmare läsning.

## 7. Mottagare: kommun eller länsstyrelse

En egen, kort sektion som förklarar att detta påverkar framför allt del 1 (ärendets ram) och tonen i del 5 (vad som begärs):

- **Kommunen** hanterar PBL-processens samråd och granskning. Yttranden riktas dit, och kommunen är också den instans som slutligt antar planen.
- **Länsstyrelsen** deltar i båda lagrummen men med olika roller: i PBL-samråd som en av flera samrådsparter (statens företrädare, kan överpröva kommunens beslut i vissa fall); i MB-processen ofta som mottagare av avgränsningssamrådet och som tillsynsmyndighet, medan den slutliga prövningen av tillståndsansökan görs av mark- och miljödomstolen.
- Praktisk konsekvens för yttrandeskrivaren: kontrollera alltid i det aktuella samrådsunderlaget vem som är avsedd mottagare och vilken instans som fattar nästa beslut — det avgör hur "vad som begärs" bör formuleras (jfr iakttagelsen i den tidigare NCC-analysen om att avsändare/mottagare/svarsdag saknades i ett av utkasten, vilket i sig är en brist värd att påpeka).

## 8. Kompensationsåtgärder — modulen

**Ambitionsnivå, per beslut.** Det räcker inte att verktyget nämner att kompensationsåtgärder finns. Målet är att läsaren — typiskt en styrelseledamot i en ideell naturskyddsförening som vill bli skicklig på att skriva välgrundade yttranden — ska bli **kunnig nog att både begära och föreslå** kompensationsåtgärder: känna till det rättsliga läget, kunna peka på verkliga svenska fall, känna till hur andra länder och organisationer arbetar med frågan, och kunna omvandla detta till **konstruktiva förslag riktade till exploatören** (t.ex. NCC) — inte bara kritiska frågor. Modulen är därför uppbyggd i sex delar (8.1–8.6) i stället för en kort sammanfattning.

### 8.1 Rättsligt läge — tre spår, inte två

Fördjupad källkontroll mot Miljösamverkan Sveriges handläggarstöd (Miljösamverkan Sverige, 2021) visar att bilden från föregående utkast var ofullständig. Det finns ett tredje spår, specifikt för Natura 2000:

- **PBL saknar egen möjlighet.** "I plan- och bygglagen finns inte möjlighet att ställa krav på kompensation i till exempel en detaljplan" (Miljösamverkan Sverige, 2021, s. 22). Krav kan ändå uppstå i en planprocess, men då via miljöbalken — om detaljplanen berör ett biotopskyddsområde eller riskerar bevarandemålen för ett Natura 2000-område, eller genom att länsstyrelsen under samrådet bevakar riksintressen enligt 3–4 kap. MB.
- **MB 16 kap. 9 § — det generella, fakultativa spåret.** Ger prövningsmyndigheten rätt att villkora ett **tillstånd eller en dispens** med krav på kompensation för intrång i allmänna intressen. Bestämmelsen är fakultativ — myndigheten *får*, men *måste* inte — och omfattningen avgörs genom en rimlighetsavvägning (Miljösamverkan Sverige, 2021, s. 20–21). Gäller bara vid faktisk tillstånds- eller dispensprövning; vid ren tillsyn (t.ex. en anmälan enligt 12 kap. 6 §) saknas lagstöd helt.
- **MB 7 kap. 29 § — det obligatoriska Natura 2000-spåret, ett undantagsfall.** Om en verksamhet skadar eller stör de utpekade värdena i ett Natura 2000-område kan tillstånd normalt inte ges (7 kap. 28 § MB). I det undantagsfall då regeringen ändå lämnar tillåtlighet, av tvingande orsaker som har ett väsentligt allmänintresse, är kompensation en **förutsättning** för att tillåtligheten över huvud taget ska kunna ges — inte en möjlighet myndigheten kan välja bort (Miljösamverkan Sverige, 2021, s. 62–63). Det är alltså inte samma sak som 16 kap. 9 §, och det gäller bara i detta specifika, ovanliga skede av en Natura 2000-prövning — inte automatiskt i varje ärende som berör ett Natura 2000-område. Verktyget ska vara tydligt med att detta spår sällan är aktuellt, men att det är viktigt att känna till eftersom det är just den situationen ett ärende som NCC/Skrylle skulle kunna hamna i om domstolen bedömer att skada på Måryd-Hällestad inte går att undvika.

Utanför dessa tre spår är kompensation ett rent frivilligt åtagande — antingen för att verksamhetsutövaren själv föreslår det, eller för att kommunen har egna riktlinjer. Det är där Göteborgs stad (beslut i flera nämnder 2008/09, utökat till ekosystemtjänster 2017), Lomma kommun (arbetat med kompensation sedan slutet av 1990-talet) och Helsingborgs stad (balanseringsprincipens fyra steg) hör hemma (Boverket, u.å.; Ekoplankompassen, u.å.). **Uppgiften om Solna kommun är nu bekräftad:** Solna stad har flera egna utredningar om skyddsåtgärder och ekologisk kompensation, kopplade till specifika detaljplaner (Solna stad, 2019; Solna stad, 2020) — ett fjärde kommunexempel att ta med, och till skillnad från de tre andra ett exempel där kompensationen är knuten direkt till enskilda planärenden snarare än en övergripande policy. *(En tredje, nyare Solna-källa från 2024 citerades tidigare men ströks 16 augusti 2026 efter att länken visade sig ge 404 — se avsnitt 13. De två kvarvarande källorna, kontrollerade samma dag, styrker slutsatsen tillräckligt.)*

### 8.2 Skadelindringshierarkin — ramen som gör förslag trovärdiga

Alla tre rättsliga spår bygger på samma princip, och verktyget ska lära ut den innan det lär ut formuleringar: skador ska **i första hand undvikas, i andra hand begränsas, i tredje hand återställas, och först i sista hand kompenseras** (Miljösamverkan Sverige, 2021, s. 63). Ett yttrande som föreslår kompensation utan att först ha efterfrågat undvikande och begränsning är svagare än ett som visar att hierarkin är genomtänkt.

En central regel att lära ut uttryckligen: **kompensationsåtgärder får inte påverka själva tillståndsbedömningen.** Myndigheten får inte bevilja ett tillstånd som annars skulle avslås med hänvisning till nyttan av en föreslagen kompensationsåtgärd (Miljösamverkan Sverige, 2021, s. 63). Konsekvensen för hur föreningen bör skriva: kompensationsförslag ska alltid formuleras som *"om tillstånd ändå ges …"*, aldrig som ett skäl att bevilja tillståndet.

### 8.3 Svenska exempel att lära av och hänvisa till

Miljösamverkan Sveriges handläggarstöd innehåller en "erfarenhetsbank" med ett tiotal verkliga, genomförda fall (Miljösamverkan Sverige, 2021, s. 98–121). Tre är särskilt värdefulla att lyfta i verktyget:

- **Utökad bergtäkt i Falköping, habitat för mindre blåvinge** (s. 109) — en nästan identisk situation som NCC/Skrylle: en bergtäkt prövad enligt 9 kap. MB, där utökningen skulle förstöra livsmiljön för en rödlistad fjärilsart. Lösningen blev ett skötselprogram i ett angränsande delområde (röjning, ökad markstörning för att gynna arten), villkorat enligt 16 kap. 9 § punkt 3 MB, med uppföljning genom inventering vart femte till tionde år. Detta är det bästa konkreta referensfallet för föreningen att peka på gentemot NCC, eftersom det är samma verksamhetstyp.
- **Gruva i Mertainen** (s. 115) — bolaget presenterade självmant, redan innan samrådet, ett frivilligt kompensationsförslag med den internationella standarden **BBOP** (Business and Biodiversity Offsets Programme) som utgångspunkt och målet "no net loss". Området delades in i habitattyper, och en beräkningsmodell vägde samman area och habitatkvalitet för att kvantifiera förlust respektive vinst. Länsstyrelsen ställde därefter krav enligt 16 kap. 9 § MB, och bolaget invände inte. Bra exempel på hur ett kvantifierat, metodiskt upplägg gör kompensationskrav lättare att acceptera för motparten.
- **Utbyggnad av Göteborgs hamn på ålgräsängar** (s. 106) — ett tredje, nyttigt exempel just för att det inte (ännu) är en succéhistoria: verksamhetsutövaren åtog sig att kompensera bortfallet av ålgräs genom transplantation, men vid handläggarstödets skrivande hade "ingen positiv tillväxt" kunnat redovisas på någon av de fyra återplanteringslokalerna. Bra motvikt till Falköping och Mertainen i verktyget — visar att kompensation kräver uppföljning och inte är en garanterad lösning, vilket är viktigt för föreningen att förstå innan den föreslår det till en exploatör.
- Ytterligare fall i samma erfarenhetsbank (gruva i Kaunisvaara, väg genom naturreservatet Sörmon, m.fl.) bör gås igenom under innehållsproduktionen och tas med där de är relevanta för PBL- respektive MB-sidan.
- Kompletterande vägledning: Naturvårdsverkets rapport om ekologisk kompensation (Naturvårdsverket, 2021) och den senare syntesrapporten om kompensation som verktyg i miljömålsarbetet (Naturvårdsverket, 2023). Miljösamverkan Sveriges handläggarstöd nämner även en tidigare handbok från Naturvårdsverket (Handbok 2016:1) som en föregångare — en fungerande direktlänk till den kunde inte hittas under denna research och behöver sökas fram separat innan den citeras (se öppna frågor, avsnitt 13).

### 8.4 Internationell utblick — länder och organisationer som arbetar mycket med kompensation

Verifierat genom sökning, med källor för varje punkt. Exakta procentsatser och de svenska rättsföljderna av utländsk lagstiftning bör ändå läsas en gång till i sin helhet innan de skrivs in som färdigt sidinnehåll:

- **Storbritannien** tillämpar sedan 2024 obligatorisk **Biodiversity Net Gain (BNG)**: i princip alla bygglov i England måste visa minst 10 procents nettoförbättring av biologisk mångfald jämfört med utgångsläget, med skötsel säkrad i minst 30 år (GOV.UK, u.å.a; GOV.UK, u.å.b). Ett skarpt kontrastexempel till Sveriges fakultativa system — här är kompensation regel, inte undantag.
- **Tyskland** har haft ett kompensationssystem, *Eingriffsregelung*, i den federala naturvårdslagen (Bundesnaturschutzgesetz, BNatSchG) sedan 1976 — ett av Europas äldsta. Grundprincipen i **§ 13 BNatSchG** är densamma som den svenska skadelindringshierarkin: undvik i första hand, kompensera det som blir kvar. **§ 14** definierar vad som räknas som ett ingrepp, och **§ 15** lägger ansvaret på den som orsakar ingreppet — i första hand genom Ausgleichsmaßnahmen (återställande åtgärder som är funktionellt likvärdiga) eller Ersatzmaßnahmen (ersättande åtgärder), i sista hand genom en avgift (IEEP, u.å.; sakuppgifterna om §§ 13–15 dessutom korsverifierade mot tysk juridisk litteratur).
- **USA** har sedan 1980-talet ett marknadsbaserat system, *wetland mitigation banking*, enligt Clean Water Act Section 404, administrerat gemensamt av U.S. Army Corps of Engineers och EPA, med målet "no net loss" av våtmarkers värden och funktioner (US EPA, u.å.a; US EPA, u.å.b).
- **EU** kräver enligt **artikel 6.4 i art- och habitatdirektivet** kompensationsåtgärder när ett projekt ändå tillåts trots skada på ett Natura 2000-område, av tvingande orsaker med ett väsentligt allmänintresse, och enligt principen att den som orsakar skadan även bekostar kompensationen (Europeiska kommissionen, u.å.). Detta är EU-rättens grund för Sveriges eget 7 kap. 29 § MB (se 8.1).
- **BBOP** (Business and Biodiversity Offsets Programme), den internationella standard som refererades i Mertainen-fallet ovan (8.3), grundades 2004 av den amerikanska organisationen Forest Trends tillsammans med Wildlife Conservation Society. Programmet drivs numera vidare inom Forest Trends bredare Biodiversity Initiative snarare än som ett eget fristående märke, men principerna — mitigation hierarchy, no net loss/net gain — lever kvar och är fortfarande det som internationellt brukar refereras till (Forest Trends, u.å.). Bra konkret exempel på hur ett internationellt ramverk används av ett svenskt bolag i praktiken.

### 8.5 Från kritik till konstruktivt förslag — så ger föreningen exploatören idéer

Detta är kärnan i vad uppdraget efterfrågar: verktyget ska inte bara lära ut att *fråga* om kompensation, utan att *föreslå* den, på ett sätt som är svårt för exploatören att avfärda. Metod att lära ut, byggd på 8.1–8.4:

1. Identifiera vilket naturvärde som går förlorat och vilket rättsligt spår som är tillämpligt (8.1).
2. Visa att skadelindringshierarkin beaktats — fråga först om undvikande/begränsning, föreslå kompensation sist (8.2).
3. Peka på ett konkret, jämförbart svenskt fall som förebild (8.3), t.ex.: *"I linje med hur kompensationen för mindre blåvinge löstes vid den utökade bergtäkten i Falköping (Miljösamverkan Sverige, 2021, s. 109) — genom ett villkorat skötselprogram i ett angränsande delområde, med uppföljning genom återkommande inventering — uppmanas NCC att redan i ansökan redovisa motsvarande möjligheter för de naturvärden som går förlorade i rikkärret."*
4. Föreslå ett mätbart upplägg, inspirerat av Mertainen-fallets metod (8.3) och internationell praxis (8.4): habitatklassificering, en modell som väger samman area och kvalitet, och en uppföljningsplan med angivna intervall.
5. Formulera alltid förslaget som ett villkor för det fall tillstånd ändå ges (8.2) — aldrig som ett skäl att bevilja det.

### 8.6 Modulens funktion i verktyget

- Tre valbara spår, styrda av lagrum och skede (avsnitt 9.2): PBL/frivilligt, MB/16 kap. 9 § (fakultativt), MB/7 kap. 29 § (Natura 2000, undantagsfall).
- Två lägen inom varje spår: **"begäran"** (fråga om kompensation övervägts) och **"konstruktivt förslag"** (färdig text enligt mallen i 8.5, med plats för användaren att fylla i eget naturvärde, jämförbart fall och förslagen åtgärd).
- Kommun- och fallexempel med korta beskrivningar och källhänvisning, hämtade från 8.3–8.4.
- Genomgående markering av vad som är rättsligt bindande (7 kap. 29 §), vad som är en möjlighet myndigheten kan använda (16 kap. 9 §), och vad som är rent frivilligt (PBL-praxis, internationella exempel som inspiration) — så att verktyget aldrig ger intryck av att kompensation är en rättighet för den som yttrar sig.

## 9. Funktionella krav

### 9.1 Förklarande del — två lager, båda i HTML

Följer samma princip som `NCC_stenbryttning` (kort publik version + fördjupning), men med en skillnad: **båda lagren byggs som egna, formgivna HTML-sidor** (inte som markdown), så att även fördjupningen får samma layout, typografi och läsbarhet som resten av verktyget.

- `index.html` — kort version. Grundprincipen (avsnitt 5), en översiktlig jämförelsetabell PBL/MB, och en kort introduktion till de tre skedena per lagrum och till att kompensationsmodulen finns. Tänkt att kunna läsas fristående på några minuter.
- `fordjupning.html` — fördjupad version. Fullständiga dispositionsmallar för samtliga sex skeden (3 PBL + 3 MB), hela kompensationsmodulen (avsnitt 8.1–8.6: de tre rättsliga spåren, skadelindringshierarkin, svenska fall, internationell utblick och metoden för konstruktiva förslag), de konkreta exemplen (NCC för MB, det PBL-exempel som ska tas fram), och en fullständig källförteckning i samma stil som `struktur.html`.
- Genomgående länkning mellan `index.html`, `fordjupning.html`, den interaktiva guiden (`verktyg.html`, se 9.2) och `../NCC_stenbryttning/struktur.html`, i linje med tidigare beslut om fristående men länkade sidor.

### 9.2 Interaktiv del

- Ett stegvis formulär: användaren väljer (1) **avsändarroll** — privatperson eller på uppdrag av en förening/organisation, (2) lagrum (PBL/MB), (3) skede (samråd/granskning/etc., anpassat efter valt lagrum), (4) mottagare, (5) om kompensationsåtgärder ska tas med, och i så fall vilket av de tre spåren (PBL/frivilligt, MB/16 kap. 9 § fakultativt, MB/7 kap. 29 § Natura 2000 — styrt av valet i steg 2 och, för MB, om ärendet berör ett Natura 2000-område) samt vilket läge inom spåret (8.6): "begäran" eller "konstruktivt förslag".
- Avsändarrollen (steg 1) påverkar hjälptexten och de förifyllda fälten i del 1, "Ärendets ram" — särskilt vad gäller mandat och undertecknare: en förening behöver ange vem som för dess talan och med vilket mandat, en privatperson behöver det inte. Detta är direkt kopplat till bristen som noterades i den tidigare NCC-analysen, där avsändare och mandat saknades i ett av utkasten.
- Väljer användaren läget "konstruktivt förslag" (steg 5) fylls textfältet i del 5 ("vad som begärs") med en mall byggd på metoden i avsnitt 8.5: naturvärde, jämförbart fall, föreslagen åtgärd och uppföljning, med platshållartext att ersätta — inte bara en tom ruta.
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
- JavaScript för: utfällbara avsnitt (återanvänd mönstret från `script.js`), det stegvisa formuläret (inklusive avsändarroll enligt 9.2), sammanställningsvyn, kopiera-till-urklipp och nedladdningsfunktionen.
- Publiceras enligt samma mönster som övriga live-sidor i `Codex`-repot (`AGENTS.md`, projektinstruktioner): diskret GitHub-hörnlänk, teknikknapp med förenklad filstruktur, GitHub Pages-URL enligt `https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/`.

**Preliminär filstruktur:**

```
Samradsguiden/
├── index.html         (kort version, se 9.1)
├── fordjupning.html   (fördjupad version, se 9.1)
├── verktyg.html       (den interaktiva guiden, se 9.2–9.3)
├── styles.css
├── script.js
└── README.md
```

## 11. SPEC.md-checkpoint

Enligt den stående regeln om att varje PRD ska ta ställning till om ett SPEC.md-steg behövs: **ja, ett SPEC.md rekommenderas här**, ännu tydligare efter utökningen av avsnitt 8. Skälet är att verktyget har flera samverkande tekniska delar som en genomförande-AI annars måste gissa sig till: det stegvisa formulärets tillståndshantering, exakt vilka fält som visas vid varje kombination av lagrum/skede/mottagare, den exakta datastrukturen för de sex dispositionsmallarna (PBL × 3 skeden, MB × 3 skeden), **kompensationsmodulens tre rättsliga spår kombinerat med två lägen ("begäran"/"konstruktivt förslag") — sex möjliga kombinationer, var och en med egen mall- och hjälptext**, samt export-logikens gränsfall (tomma fält, specialtecken vid nedladdning). Ett SPEC.md bör beskriva denna datastruktur och formulärlogik i detalj innan kodning påbörjas.

Detta arbetssätt — PRD, med ett uttalat ställningstagande till om SPEC.md behövs, som grund innan kod skrivs — följer den arbetsprocess Kent själv dokumenterat i Claude-kompassen, där PRD och SPEC.md beskrivs som "kravdokumenten som föregår" allt annat arbete (Fas 0) (Lundgren, 2026). Sidan kontrollerades 16 augusti 2026 och stämmer med hur detta dokument är upplagt; bilden kan ha hunnit ändras sedan dess.

## 12. Leveransplan (förslag)

1. **Research och källkontroll** — genomförd i ett första varv (se avsnitt 13 för vad som återstår): PBL-paragraferna är fastställda, ett PBL-yttrandeexempel är hittat (avsnitt 6.3), Solna-uppgiften är bekräftad, och de internationella exemplen samt ett tredje svenskt fall (Göteborgs hamn) är tillagda (avsnitt 8.3–8.4). Kvarstår: Handbok 2016:1, fler fall ur erfarenhetsbanken, och en fullständig läsning av PBL-yttrandeexemplet.
2. **SPEC.md** — klart, se `SPEC_samradsguiden.md`: datastruktur för dispositionsmallar (inklusive avsändarroll och kompensationsmodulens tre spår × två lägen), formulärlogik, exportformat och gränsfall.
3. **Förklarande del** — `index.html` och `fordjupning.html` enligt avsnitt 9.1.
4. **Interaktiv del** — formulär, sammanställning, export enligt avsnitt 9.2–9.3.
5. **Publicering** — enligt avsnitt 10, med README och länkar till/från `struktur.html`.

## 13. Öppna frågor att lösa under innehållsproduktionen

Ett första researchvarv (leveransplanens steg 1) löste flertalet av de ursprungliga frågorna. Dessa kvarstår innan sidorna skrivs färdigt, inte i denna PRD:

1. Läsa Naturskyddsföreningen Norrköpings yttrande om Södra Björkalund i sin helhet och sammanfatta det på samma strukturerade sätt som NCC-ärendet i avsnitt 6.3 — hittills bara identifierat, inte genomarbetat.
2. Hitta en fungerande direktlänk till Naturvårdsverkets Handbok 2016:1 om ekologisk kompensation — den fullständiga titeln är bekräftad (*Ekologisk kompensation: en vägledning om kompensation vid förlust av naturvärden*), men ingen fungerande PDF-länk hittades under denna research.
3. Gå igenom fler fall i Miljösamverkan Sveriges erfarenhetsbank (t.ex. gruvan i Kaunisvaara, vägen genom naturreservatet Sörmon) och avgöra vilka som är värda att ta med utöver Falköping, Mertainen och Göteborgs hamn.
4. Om fler kommunexempel utöver Göteborg, Lomma, Helsingborg och Solna ska tas med.
5. Exakta paragrafer i tysk lagtext (BNatSchG §§ 13–15) och EU:s art- och habitatdirektiv är sourcade mot sekundärkällor (IEEP respektive Europeiska kommissionen) — en direktkontroll mot primärkällan (själva lagtexten/direktivtexten) rekommenderas innan de citeras ordagrant.
5a. **Löst 16 augusti 2026:** länken till Solna stad (2024) *Skyddsåtgärder och ekologisk kompensation* gav 404 vid kontroll (Kent uppmärksammade felet). Ingen fungerande ersättningslänk för just det 2024-dokumentet hittades — det verkar ha tagits bort eller flyttats på solna.se. Citatet ströks helt i stället för att gissa fram en ny URL. Slutsatsen om Solna som kommunexempel vilar nu enbart på de två verifierade 2019- och 2020-dokumenten, vilket är tillräckligt för uppgiften. Påminnelse till mig själv: kontrollera länkar med en faktisk hämtning (WebFetch/motsvarande) innan publicering, inte bara via sökträffar — en sökträffs titel kan finnas kvar i indexet även efter att sidan tagits bort.
6. Exakt namn/URL-struktur för den nya mappen — förslaget `Samradsguiden` i denna PRD är en utgångspunkt, inte ett beslut.
7. Om en gemensam CSS-grund mellan `NCC_stenbryttning` och `Samradsguiden` är önskvärd på sikt, eller om de ska förbli helt oberoende som föreslaget i avsnitt 10.

## 14. Källor

Boverket (2026a) *Att svara på Boverkets remiss*. Tillgänglig på: https://www.boverket.se/sv/lag--ratt/boverkets-remisser/att-svara-pa-boverkets-remiss/ (Hämtad: 13 augusti 2026). *(Visar att Statsrådsberedningens sexdelsmodell tillämpas av en renodlad PBL-myndighet — grunden för avsnitt 5:s slutsats att dispositionsprincipen är gemensam över lagrummen.)*

Boverket (u.å.) *Kommunala exempel på frivillig kompensation i planering och byggande*, PBL kunskapsbanken. Tillgänglig på: https://www.boverket.se/sv/PBL-kunskapsbanken/teman/ekosystemtjanster/verktyg/kompensation/exempel/ (Hämtad: 13 augusti 2026, via sökträff — direkthämtning av sidan gav tekniskt fel vid kontroll, men sakuppgifterna om Göteborg och Lomma är korsverifierade mot Miljösamverkan Sverige, 2021, nedan). *(Primärkälla för uppgifterna om Göteborgs stad och Lomma kommun som exempel på frivillig kompensation.)*

Ekoplankompassen (u.å.) *Ekoplankompassen — verktyg för ekologisk kompensation i fysisk planering*. Tillgänglig på: https://ekoplankompassen.se/ (Hämtad: 13 augusti 2026). *(Samarbete mellan Hållbar Utveckling Skåne och Högskolan Kristianstad; bekräftar bland annat Helsingborgs stads tillämpning av balanseringsprincipen och listar ett antal skånska kommuner som deltagit i referensgruppen.)*

Europeiska kommissionen (u.å.) *Permitting procedure*, Natura 2000, Environment. Tillgänglig på: https://environment.ec.europa.eu/topics/nature-and-biodiversity/natura-2000/permitting-procedure_en (Hämtad: 13 augusti 2026). *(Beskriver artikel 6.4 i art- och habitatdirektivet (92/43/EEG): kompensationsåtgärder som villkor för att ändå tillåta ett projekt som skadar ett Natura 2000-område, samt att kostnaden bärs av den som orsakar skadan. EU-rättslig grund för avsnitt 8.1 och 8.4.)*

Forest Trends (u.å.) *Biodiversity Initiative*. Tillgänglig på: https://www.forest-trends.org/initiatives/biodiversity-initiative/ (Hämtad: 16 augusti 2026). *(Forest Trends grundade BBOP 2004 tillsammans med Wildlife Conservation Society och driver dess principer vidare inom detta initiativ. Grund för avsnitt 8.4:s uppdaterade beskrivning av BBOP:s nuvarande status.)*

GOV.UK (u.å.a) *Understanding biodiversity net gain*. Tillgänglig på: https://www.gov.uk/guidance/understanding-biodiversity-net-gain (Hämtad: 13 augusti 2026). *(Brittiska regeringens egen vägledning om det obligatoriska kravet på minst 10 procents nettoförbättring av biologisk mångfald vid bygglov i England, grund för avsnitt 8.4:s kontrastexempel.)*

GOV.UK (u.å.b) *Biodiversity net gain*. Tillgänglig på: https://www.gov.uk/guidance/biodiversity-net-gain (Hämtad: 13 augusti 2026). *(Kompletterande officiell vägledning om hur kravet tillämpas i praktiken, inklusive kravet på 30 års säkrad skötsel.)*

IEEP (u.å.) *Biodiversity offsetting in Germany*, Institute for European Environmental Policy. Tillgänglig på: https://ieep.eu/wp-content/uploads/2022/12/DE-Biodiversity-Offsetting-final.pdf (Hämtad: 13 augusti 2026). *(Oberoende policyinstituts genomgång av Tysklands Eingriffsregelung enligt Bundesnaturschutzgesetz, i kraft sedan 1976. Exakta paragrafhänvisningar bör kontrolleras ytterligare mot tysk lagtext innan de citeras, se avsnitt 13.)*

Lundgren, K. (2026) *Claude-kompassen: olika Claude-modeller och ytor*. Tillgänglig på: https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/ (Hämtad: 16 augusti 2026). *(Kents egen dokumenterade arbetsprocess för AI-understödd kodning. Fas 0 beskriver PRD och SPEC.md som kravdokumenten som föregår allt annat arbete — grunden för arbetssättet i avsnitt 11.)*

Miljösamverkan Sverige (2021) *Ekologisk kompensation: Handläggarstöd för en ökad användning och samsyn*, 1 juli. Tillgänglig på: https://www.miljosamverkansverige.se/wp-content/uploads/Handlaggarstod-ekologisk-kompensation.pdf (Hämtad: 13 augusti 2026). *(Huvudkälla för hela avsnitt 8: den rättsliga distinktionen mellan PBL, MB 16 kap. 9 § och MB 7 kap. 29 §, skadelindringshierarkin, samt erfarenhetsbankens svenska fall — bland annat bergtäkten i Falköping och gruvan i Mertainen.)*

Naturskyddsföreningen Norrköping (2026) *Yttrande vid samråd över utställd detaljplan för Södra Björkalund*, 23 februari. Tillgänglig på: https://norrkoping.naturskyddsforeningen.se/wp-content/uploads/sites/17/2026/02/260223-Sodra-Bjorkalund-yttrande-ang.-detaljplan-vid-samrad.pdf (Hämtad: 16 augusti 2026). *(PBL-motsvarigheten till NCC-exemplet: en lokal naturskyddsförenings yttrande vid samråd över en detaljplan. Ännu inte läst i sin helhet, se öppna frågor, avsnitt 13.)*

Naturvårdsverket (2021) *Ekologisk kompensation*, Rapport 7008, september. Tillgänglig på: https://www.naturvardsverket.se/globalassets/media/publikationer-pdf/7000/978-91-620-7008-3.pdf (Hämtad: 13 augusti 2026). *(Nationell vägledning om ekologisk kompensations rättsliga status och tillämpning i Sverige.)*

Naturvårdsverket (2023) *Ekologisk kompensation som verktyg i miljömålsarbetet*, Rapport 7103, mars. Tillgänglig på: https://www.naturvardsverket.se/4acd37/globalassets/media/publikationer-pdf/7100/978-91-620-7103-5.pdf (Hämtad: 13 augusti 2026). *(Senare syntesrapport, kompletterar Rapport 7008. Länken verifierad som nåbar; det fullständiga textinnehållet kunde inte extraheras automatiskt och bör läsas i sin helhet innan det citeras i detalj, se avsnitt 13.)*

Solna stad (2019) *Utredning skyddsåtgärder och ekologisk kompensation*, 26 augusti. Tillgänglig på: https://www.solna.se/download/18.1af131d916e45020f6bff6a/1573569803419/Utredning%20skydds%C3%A5tg%C3%A4rder%20och%20ekologisk%20kompensation.pdf (Hämtad: 16 augusti 2026). *(Ett av flera Solna-dokument som bekräftar uppgiften i uppdraget om att kommunen arbetar med frivillig kompensation, kopplat till konkreta planärenden snarare än en övergripande policy.)*

Solna stad (2020) *Skyddsåtgärder och ekologisk kompensation för detaljplan*, 18 november. Tillgänglig på: https://www.solna.se/download/18.38ce9db217623e5214c9c5fd/1607091681559/Skydds%C3%A5tg%C3%A4rder%20och%20ekologisk%20kompensation.pdf (Hämtad: 16 augusti 2026, återkontrollerad 16 augusti 2026). *(Uppföljande dokument för ett specifikt planärende, samma serie som Solna stad, 2019.)*

Statsrådsberedningen (2026) *Svara på remiss: om remisser av betänkanden och andra förslag från Regeringskansliet*, SB PM 2021:1 (rev. 2026). Tillgänglig på: https://www.regeringen.se/rapporter/2021/09/svara-pa-remiss/ (Hämtad: 13 augusti 2026). *(Huvudkälla för den gemensamma sexdelsmodellen, redan etablerad i `struktur.html`.)*

Sveriges riksdag (1998) *Miljöbalk (1998:808)*. Tillgänglig på: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/miljobalk-1998808_sfs-1998-808/ (Hämtad: 13 augusti 2026, kompletterande kontroll av 6 kap. 23–32 §§ 16 augusti 2026). *(Lagtext för MB-sidan av verktyget, redan använd i `struktur.html`. Innehåller även 16 kap. 9 § och 7 kap. 29 § som avsnitt 8.1 bygger på, samt 6 kap. 23–26 §§ (undersökningssamråd, villkorat) och 29–32 §§ (avgränsningssamråd, det enda ordinarie MB-samrådet) som avsnitt 6.2 bygger på.)*

Sveriges riksdag (2010) *Plan- och bygglag (2010:900)*. Tillgänglig på: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/plan-och-bygglag-2010900_sfs-2010-900/ (Hämtad: 16 augusti 2026). *(Lagtext för PBL-sidan av verktyget. 5 kap. 11–13, 18, 21, 23 och 25 §§ är nu fastställda och används i avsnitt 5 och 6.1; en direktläsning av paragraftexten, inte bara en AI-sammanfattning av den, rekommenderas ändå innan de citeras ordagrant i färdigt innehåll.)*

US EPA (u.å.a) *Mitigation Banks under CWA Section 404*. Tillgänglig på: https://www.epa.gov/cwa-404/mitigation-banks-under-cwa-section-404 (Hämtad: 13 augusti 2026). *(Amerikanska miljömyndighetens beskrivning av mitigation banking som föredraget kompensationsverktyg för våtmarksintrång.)*

US EPA (u.å.b) *Background about Compensatory Mitigation Requirements under CWA Section 404*. Tillgänglig på: https://www.epa.gov/cwa-404/background-about-compensatory-mitigation-requirements-under-cwa-section-404 (Hämtad: 13 augusti 2026). *(Bakgrund till "no net loss"-målet och regelverket från 2008 som EPA och U.S. Army Corps of Engineers förvaltar gemensamt.)*
