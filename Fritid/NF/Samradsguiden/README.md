# Samrådsguiden

Ett verktyg för hur privatpersoner och miljöorganisationer kan disponera och lägga upp yttranden och synpunkter under ett samråd — enligt både plan- och bygglagen (PBL) och miljöbalken (MB), med en fördjupad modul om betydande miljöpåverkan, en om kompensationsåtgärder, ett strategilager om hur man påverkar i rätt tid, en granskningschecklista för sakfrågor, och de tio viktigaste lagtexterna ordagrant. Materialet är ett bidrag till fortsatt diskussion, inte ett beslutat ställningstagande, och företräder inte någon organisation.

## Live-sida

[Öppna Samrådsguiden](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/)

- Så påverkar vi: [paverka.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/paverka.html)
- Granska planen (checklista): [checklista.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/checklista.html)
- Dispositionerna (fördjupning): [fordjupning.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/fordjupning.html)
- Lagtexterna: [lagtexter.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/lagtexter.html)
- Bygg ditt yttrande (interaktiv guide): [verktyg.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/verktyg.html)
- NCC:s samråd i Lund, två yttranden att lära av (Lunds kommun och Lunds Naturskyddsförening): [lund-ncc.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/lund-ncc.html) (fristående sida, inte i toppmenyn)
- Struktur i en stor tillståndsprocess, lärdomar från MAXIMA: [maxima.html](https://kentlundgren.github.io/Codex/Fritid/NF/Samradsguiden/maxima.html) (fristående sida, inte i toppmenyn)

## Lokal sökväg

`C:\Users\kentl\OneDrive\AI\Codex\Fritid\NF\Samradsguiden\` — i repot `kentlundgren/Codex`, mappen `Fritid/NF/Samradsguiden/`.

## Status

PRD, SPEC och samtliga sju sidor är byggda och testade lokalt (formulärflöde, alla villkorliga fält, kopiera- och nedladdningsfunktion, accordion-komponenter, toppmeny, tidslinjer, granskningschecklista). Innehållsproduktionen har några kvarvarande öppna frågor för kompensationsmodulen, se `PRD_samradsguiden.md`, avsnitt 13.

Ankar-retrofit av `index.html` och `fordjupning.html` är gjord (varje H2 och `.subhead`-H3 har ett stabilt `#`-ankare). `verktyg.html` är en JS-guide där stegen har egna div-id:n och behöver inga rubrikankare.

Sidorna är ett levande dokument och versionsnumreras i sidfoten på var och en. **Version 1.21**, senast ändrad 20 oktober 2026.

- **v1.0** — första publicerade versionen: grunddispositionen, kompensationsmodulens tre spår, det interaktiva verktyget.
- **v1.1** — jämförelsen av de tre sätten att disponera ett yttrande; de fyra kommunexemplen.
- **v1.2** — översiktsplanen (PBL 3 kap.) som två egna dispositionsmallar; skillnaden mellan miljöbedömning och miljökonsekvensbeskrivning.
- **v1.3** — rättade en missvisande symmetri i MB-sidans skeden: lade till det villkorade undersökningssamrådet och gjorde tydligt att bara avgränsningssamrådet är ett ordinarie, alltid lagstadgat samråd.
- **v1.4** — gjorde startsidans text om de tre dispositionssätten neutral; navigeringsknapp tillbaka till startsidan; svepnavigering på mobil; tog bort en död länk (Solna stad 2024).
- **v1.5** — rättade ytterligare en död länk (Boverkets kompensationsexempel) och kontrollerade samtliga externa källor.
- **v1.6** — rättade grundorsaken till ett länkfel: `.md`-filer med YAML-frontmatter (som `SKILL.md`) 404:ar på GitHub Pages eftersom Jekyll bygger om dem till `.html`, så interna länkar till PRD/SKILL-filer pekar nu på GitHub:s blob-vy.
- **v1.7** — lade till strategilagret *Så påverkar vi* (`paverka.html`) med tre vertikala tidslinjer och en anknytning till Lunds kommuns process, samt sidan *Lagtexterna* (`lagtexter.html`) med de tio viktigaste lagtexterna ordagrant, verifierade mot riksdagen.se och Regeringskansliets rättsdatabas 10 september 2026. En gemensam toppmeny lades till på alla fem sidor, och `index.html` och `fordjupning.html` fick djuplänkbara rubrikankare.
- **v1.8** — förtydligade översiktens jämförelse av PBL och MB: miljöbalkens 6 kapitel styr miljöbedömningen även för kommunala planer, och MKB:n är dokumentet.
- **v1.9** — lagrummen i jämförelsetabellen på Dispositionerna länkar till miljöbalkens lydelse.
- **v1.10** — rubriken för avsnittet om vad som händer innan vi yttrar oss förtydligad.
- **v1.11** — ny fördjupning: *Betydande miljöpåverkan — när gränsen är omtvistad*. Tre nivåer (kategoriskt, osäkert/undersökningssamråd, kopplat till en plan), de fyra kriteriegrupperna i miljöbedömningsförordningens 10–13 §§, en argumentationsmetod, och NCC/Skrylle som exempel på den kategoriska (inte omtvistade) vägen.
- **v1.12** — balanseringsprincipen: kompensationsmodulen i `fordjupning.html` fick SOU 2017:34 (statlig utredning som föreslog kompensationskrav i både MB och PBL) och det tyska Ökokonto/Ökopunkte-systemet. `paverka.html` fick ett nytt avsnitt om proaktivt påverkansarbete, med Lunds Naturskyddsförenings (Per Blomberg) begäran om balanseringsprincip i Lunds kommun som exempel, källhänvisat till `Underlag/Balanseringsprincipen_260913.docx` — presenterat som föreningens egen ståndpunkt, inte Samrådsguidens.
- **v1.13** — ny terminologiruta i `fordjupning.html`: hur balanseringsprincipen och kompensationsåtgärder hänger ihop (policyåtagande om hela skadelindringshierarkin, kontra det sista, konkreta steget i den). Texten om Per Blombergs förslag i `paverka.html` mjukades till för att göra tydligt att det är ett utkast, ännu inte behandlat av föreningens styrelse — inte en beslutad ståndpunkt. `fordjupning.html` och `paverka.html` fick var sin innehållsförteckning (samma `.snabbnav`-mönster som redan fanns på `lagtexter.html`), och hero-ingresserna kortades ner i motsvarande grad.
- **v1.14** — kompensationsavsnittets inledning i `fordjupning.html` förtydligar redan från början att det är verkningsfullt att verka för en generell policy enligt skadelindringshierarkin, inte bara agera i enskilda ärenden. Tre verifierade internationella motsvarigheter till balanseringsprincipen tillagda: No Net Loss (NNL), IFC Performance Standard 6 (2012) och EU:s naturrestaureringsförordning ((EU) 2024/1991, kräver no net loss av grönyta/trädtäckning i städer till 2030).
- **v1.15** — `paverka.html` länkar nu även till `Underlag/Balanseringsprincip_260913B.md` (en omstrukturerad version av Per Blombergs utkast, med fullständig källförteckning) bredvid originalutkastet, både i "Ett exempel"-avsnittet och i källförteckningen.
- **v1.16** — ny sida *Granska planen* (`checklista.html`): sakfrågor från kapitel 9 i Naturskyddsföreningens preliminära vägledning för hållbar stadsutveckling, som kryssbar arbetschecklista. Originalet ligger kvar i `Plangruppen/Vagledning/`; en avskrift av just kapitel 9 finns i `Underlag/Vagledning_kap9_260830.md`.
- **v1.17** — ny exempelsida *NCC:s samråd i Lund: två yttranden att lära av* (`lund-ncc.html`): en genomgång av hur Lunds kommunkontor (tjänsteskrivelse KS 2026/0700) och Lunds Naturskyddsförening (avsända samrådssynpunkter 2026-09-04) har byggt upp sina yttranden, jämförda med sexdelsmodellen och med varandra, med fyra saker att låna och en diskussion om vad en förening kan hämta från en kommun. Sidan är ett utkast till fortsatt diskussion, kommunens del bygger bara på tjänsteskrivelsen (bilagan "Förslag till yttrande" är inte granskad) och sidan ligger medvetet inte i toppmenyn. Nås via ett nytt kort i `fordjupning.html` (Så ser det ut i praktiken) och via direktlänk. Versionsnumret höjt på alla sidor.

- **v1.18** — ny exempelsida *Struktur i en stor tillståndsprocess: lärdomar från MAXIMA* (`maxima.html`): VA SYDs ansökan om MAXIMA som exempel på hur synpunkter och yttranden bör struktureras för att vara lätta att följa genom en lång process. Förloppet, en förklaring av aktbilaga, hur motparten sorterade synpunkterna, en fråga följd genom fyra skeden och elva lärdomar om numrering, begäran och spårbarhet. Ny fördjupning *Så bemöter motparten: numrering och spårbarhet* i `fordjupning.html`, utökad miljöbalkstidslinje i `paverka.html` (samrådsredogörelse, sökandens bemötande, yttrande över bemötandet), nytt skede *Yttrande över motpartens bemötande* i verktyget (`data.js`, `verktyg.js`) och nya regler i skillen. Sidan förklarar också begreppen i domstolsskedet (kungörelse, underrättelse, svarstid, synpunkt och yttrande, yrkande, verkställighetsförordnande, aktbilaga) med lagrum i miljöbalkens 22 kap. och MAXIMA som exempel. Ankarlänkarna är synliga hela tiden på den nya sidan. Planen finns i `PRD_samradsguiden_maxima.md`.
- **Prototyp, 20 oktober 2026** — gemensam rangordning av frågorna i Tabell 6 (`Maxima/rangordning_prototyp.html`, ej länkad från menyn; allmän sida om rangordningar i `rangordning/`, gemensam kod där; den gamla adressen `rangordning_prototyp.html` är en ersättningssida). Läsare ordnar om frågorna utan inloggning, med frivilligt namn, och tabellen ordnas efter gruppens medelplats direkt. Databas: Supabase (`supabase_setup.sql`, beskrivning och jämförelse med Firebase i [`supabase.md`](https://github.com/kentlundgren/Codex/blob/main/Fritid/NF/Samradsguiden/supabase.md)). Utan inställningar i `rangordning_config.js` körs ett demoläge. Kopplad till projektet `samradsguiden` på Supabase och provad 2026-10-20 (databasen är tom inför start).
- **v1.21** — `maxima.html`, avsnittet *Förslag till rangordning* (`#skede5-rangordning`), har fått en ruta (`#skede5-rangordna-sjalv`) som länkar till omröstningen [`Maxima/rangordning_prototyp.html`](Maxima/rangordning_prototyp.html) och till den allmänna sidan [`rangordning/`](rangordning/). Huvudmenyn har dessutom fått menyvalet *Rangordningar* (sist i raden) på alla sidor.
- **v1.20** — `maxima.html` har fått avsnittet *Skede 5: att välja vilka frågor som ska med* (`#skede5-val`), med utmaningen, sju mått för att väga en fråga, Tabell 5 (hur många frågor beroende på hur man räknar) och Tabell 6 (förslag till rangordning, utkast och inte beslutat), vad som bör bort eller mjukas upp, ett förslag på upplägg och de val som återstår. Nyckelorden i första kolumnen av Tabell 3 är fetmarkerade, och noteringen om skede 5 säger nu att skedet pågår. Källförteckningen har fått Länsstyrelsens vägledning (rapport 2023:23) och EU-förordning 2020/741.
- **v1.19** — enhetlig numrering av skedena i MAXIMA-förloppet, på `maxima.html` och i [`Maxima/Struktur/`](../Maxima/Struktur/): skede 1 samrådsbrev, 2 samrådsredogörelse, 3 yttrande, 4 bemötande, 5 yttrande över bemötandet, och 6–8 sökandens uppdaterade sammanställning, huvudförhandling och dom (enligt domstolens tidsplan). Ordet "steg" används inte längre för föreningens tre dokument i Struktur, som nu heter skede 1, 3 och 5 (de gamla ankarna `#steg1`–`#steg4` fungerar fortfarande). Tabell 3 och Tabell 2 har skedesnummer i kolumnerna, Diagram 1 har skedesnummer på de rader som är handlingar, sidan har ett eget avsnitt och en ordlisteuppgift om *skede*, och Tabell 8 i Struktur är omskriven från tre steg till åtta skeden. Skede 5 i Struktur har fått ett förslag på upplägg (yrkanden, sammanfattning, några få huvudskäl, tabell i bilaga, reservation) som bygger på hur Mark- och miljööverdomstolen ordnar sina domskäl i NCC-målet.


Tumregel för framtida ändringar: innehållstillägg höjer siffran efter punkten (1.1 → 1.2), en grundläggande omstrukturering av hela verktyget höjer heltalet (1.x → 2.0).

## Innehåll

- `PRD_samradsguiden.md` — planeringsdokument för grundverktyget: mål, avgränsning, skillnaden mellan PBL och MB, dispositioner per samrådssteg, kompensationsmodulen, funktionella och tekniska krav, öppna frågor och källor.
- `PRD_samradsguiden_fordjupning.md` — planeringsdokument för tillägget i v1.7 (strategilagret och lagtexterna).
- `SPEC_samradsguiden.md` — teknisk specifikation för grundverktyget: datamodell, formulärlogik, exportlogik, gränsfall, verifieringschecklista.
- `SPEC_lagtexter.md` — teknisk specifikation för `lagtexter.html` och `paverka.html`: urval av de tio posterna, HTML-mallar, CSS-tillägg, tidslinjernas innehåll, Lund-anknytningen, källhantering.
- `index.html` — kort översikt: grundprincipen, jämförelsetabell PBL/MB, de tre skedena, introduktion till granskningschecklistan och kompensationsmodulen.
- `paverka.html` — strategilagret: vilken lag som styr när kommunen antar en plan respektive när ett bolag söker tillstånd, tre vertikala tidslinjer över när synpunkter kan lämnas, klagorättsregeln, miljöorganisationers talerätt, en ruta om hur Lunds kommun beskriver processen, och ett exempel på proaktivt påverkansarbete (LNF:s begäran om balanseringsprincip).
- `checklista.html` — arbetschecklista vid granskning av planer och byggprojekt, hämtad ur kapitel 9 i Naturskyddsföreningens preliminära vägledning. Kryss sparas i webbläsaren.
- `lund-ncc.html` — exempelsida: Lunds kommunkontors tjänsteskrivelse och Lunds Naturskyddsförenings yttrande över NCC:s samråd, analyserade mot sexdelsmodellen och mot varandra. Första sidan i en tänkt serie av exempel.
- `maxima.html` — exempelsida: ett stort miljöbalksmål (MAXIMA) som underlag för lärdomar om numrering, begäran och spårbarhet, med en förklaring av aktbilaga och en tabell som följer fem frågor genom fem skeden. Ligger utanför toppmenyn.
- `PRD_samradsguiden_maxima.md` — planeringsdokument för tillägget i v1.18.
- `PRD_samradsguiden_2_0.md` — utkast (v0.1, ej byggt) till ett utökat omfång: hela vägen från samråd till dom, överklagande till MÖD och tiden efter laga kraft, med öppna beslut och källplan för de juridiska delarna.
- `Juridisk_forstagranskning_261019.md` — förstagranskning av lagtext inför 2.0: vad som är läst i lagtext, rättelser av PRD:n och tio frågor (J1–J10) som kräver jurist.
- `fordjupning.html` — fullständigt sakinnehåll: alla dispositionsmallar, modulen om betydande miljöpåverkan, hela kompensationsmodulen, de två konkreta exemplen, källförteckning.
- `lagtexter.html` — de tio viktigaste lagtexterna ordagrant, med källa och datum, en förklaring i klartext bakom ett klick per post, en ordlista och en bakgrundsruta om Århuskonventionen.
- `verktyg.html` — den interaktiva guiden: fem steg som genererar en ifyllningsbar mall med sex delar, sammanställningsvy, kopiera- och nedladdningsfunktion.
- `data.js` — all sakdata verktyget använder: dispositionsmallarna och kompensationsmodulens spår.
- `verktyg.js` — formulärlogiken och exportlogiken bakom `verktyg.html`.
- `checklista.js` — kryss och rensning på `checklista.html`, sparade i webbläsarens `localStorage`.
- `styles.css`, `script.js` — delad formgivning och delade komponenter (toppmeny, utfällbara avsnitt, teknikmodal, tidslinjer, direktlänkshantering).
- `Underlag/` — bakgrundsmaterial som länkas som källa från sidorna, t.ex. `Balanseringsprincipen_260913.docx` (Per Blomberg, Lunds Naturskyddsförening) och `Vagledning_kap9_260830.md` (avskrift av kapitel 9 ur den nationella vägledningen).

## Djuplänkar

Varje H2 och H3 på sidorna har ett stabilt `#`-ankare. Hovra över en rubrik och klicka på `#` för att kopiera länken till just det avsnittet. Ankar-id:n är oföränderliga efter publicering och listas inte här.

## Relation till NCC_stenbryttning

Det här verktyget är fristående och generellt, men bygger vidare på metoden som redan etablerats i `../NCC_stenbryttning/struktur.html`. Sedan september 2026 bor den delade skillen som metoden vilar på här i projektet, i [`Skills/samradsguiden/`](Skills/samradsguiden/) — den täcker både PBL och MB, och NCC/Skrylle-ärendet används som konkret exempel där det är pedagogiskt användbart.
