# Juridisk förstagranskning inför Samrådsguiden 2.0

*Utkast 2026-10-19, Kent Lundgren. En läsning av lagtext och några vägledande källor, inte juridisk rådgivning och inte granskad av jurist. Syftet är att sortera vad som är **läst i lagtext**, vad som bygger på **sekundär källa** och vad som **kräver jurist**, och att formulera juristfrågorna så exakt att de kan ställas som de är. Kontrollera mot källan innan något återges.*

**Hur granskningen gjordes.** Lagtexterna är hämtade som rå HTML från lagen.nu den 19 oktober 2026 och lästa i klartext: [Miljöbalken (1998:808)](https://lagen.nu/1998:808), [Lag (2010:921) om mark- och miljödomstolar](https://lagen.nu/2010:921) och [Lag (1996:242) om domstolsärenden](https://lagen.nu/1996:242). Förordning (EU) 2020/741 är hämtad från EU:s publikationsbyrå ([resource/celex/32020R0741](https://publications.europa.eu/resource/celex/32020R0741)). EUR-Lex egen sida blockerade automatiska hämtningar. Sökträffar (Naturvårdsverket, domstol.se, MÖD-referat) är sekundära källor och markeras som sådana. Lagen.nu är en privat tjänst och visar konsoliderade texter. Gällande lydelse bör kontrolleras mot [riksdagen.se](https://www.riksdagen.se/sv/dokument-och-lagar/) före publicering.

**Statusmarkeringar:** **L** = läst i lagtext. **S** = stöds av sekundär källa. **J** = kräver jurist.

---

## 1. Rättelser av vad PRD:n påstod

Fem uppgifter i `PRD_samradsguiden_2_0.md` var fel eller otillräckligt belagda och har rättats i PRD:n.

**Tabell 1. Rättelser**

| # | PRD:n sa | Lagtexten säger | Status |
|---|---|---|---|
| 1 | MÖD är "sista instans" (avsnitt 5.2) | MÖD:s domar och beslut får överklagas till Högsta domstolen, om inte annat är föreskrivet ([2010:921, 1 kap. 2 §](https://lagen.nu/2010:921)). HD prövar bara om HD meddelar prövningstillstånd ([1996:242, 40 §](https://lagen.nu/1996:242)). | **L** |
| 2 | Prövotid finns i "22 kap. 25 §" | Uppskov med villkor och provisoriska föreskrifter finns i **22 kap. 27 §**. 22 kap. 25 § listar vad en tillståndsdom ska innehålla och att domstolen får överlåta åt tillsynsmyndigheten att besluta villkor av mindre betydelse. Ordet "prövotid" förekommer inte i 22, 24 eller 26 kap. | **L** |
| 3 | "Kommunalt veto" som en annan väg (avsnitt 5.2, B7) | 16 kap. 4 § ger kommunen en tillstyrkansrätt **bara för vindkraftsanläggningar**. Det är inte ett generellt veto. | **L** |
| 4 | Regeringens tillåtlighetsprövning som en annan väg | 17 kap. 1 § anger att regeringen prövar tillåtligheten av **kärntekniska anläggningar, allmänna farleder och geologisk lagring av koldioxid**. Ett avloppsreningsverk ingår inte. | **L** |
| 5 | Talerätten (16 kap. 13 §) som en fast regel | Paragrafen **ändras 2027-01-01** (lydelse enligt SFS 2026:935 gäller till dess, ny lydelse enligt SFS 2026:1238 därefter). Skillnaden jag kan se är ett tillägg om beslut om skogsbruksåtgärd. Övergångsbestämmelserna är inte lästa. Flera andra bestämmelser ändras 2027-01-01 eller 2027-07-01 (24 kap. 1 och 11 §§, delar av lag 2010:921) och 22 kap. 25 § 2029-01-01. | **L**, tillämpning **J** |

Rättelse 5 är särskilt viktig för MAXIMA: domstolens tidsplan anger dom vecka 15 2027 (aktbilaga 310), alltså efter flera ikraftträdandedatum. Vilken lydelse som gäller för ett överklagande då är en juristfråga (J7 nedan).

---

## 2. Vad som är läst och belagt

**Tabell 2. Belagt i lagtext (L)**

| Fråga | Svar enligt lagtexten | Källa |
|---|---|---|
| Vem är MÖD? | Svea hovrätt. | 2010:921, 1 kap. 1 § |
| Vart överklagas mark- och miljödomstolens dom? | Till MÖD, och därefter till HD, om inte annat är föreskrivet. | 2010:921, 1 kap. 2 § |
| Klagotid | Skriftligt överklagande ska ha kommit in till den domstol som meddelat avgörandet **inom tre veckor** från dagen för beslutet (om det meddelats vid ett sammanträde eller tidpunkten angetts där), annars från den dag klaganden fick del av beslutet. | 1996:242, 38 § |
| Prövningstillstånd i andra instansen | Krävs. Det ska meddelas om (1) det finns anledning att betvivla riktigheten av slutet, (2) riktigheten inte går att bedöma utan tillstånd, (3) det är av vikt för ledning av rättstillämpningen, eller (4) synnerliga skäl finns. | 1996:242, 39 §. Att ansökningsmål behandlas enligt denna lag framgår av 2010:921, 4 kap. 1 § |
| Prövningstillstånd i HD | Krävs. | 1996:242, 40 § |
| Nya omständigheter och bevis | Begränsning anges i lagen bara för HD ("särskilda skäl"). Jag har inte hittat någon motsvarande begränsning för MÖD i dessa lagar. | 1996:242, 41 § |
| Huvudförhandling i MÖD | Kan avgöras utan huvudförhandling om en sådan skulle sakna betydelse. Begär både part och motpart den ska den hållas, om den inte uppenbart är utan betydelse. | MB 23 kap. 6 § |
| Överklagande med kungörelse | MÖD kan i stället för delgivning kungöra överklagandet. Svarstiden ska vara minst tre veckor efter kungörandet. | MB 23 kap. 5 § |
| Vem får överklaga som förening? | Ideell förening som (1) har naturskydds- eller miljöskyddsintressen som huvudsakligt ändamål, (2) inte är vinstdrivande, (3) har bedrivit verksamhet i Sverige i minst tre år, och (4) har minst 100 medlemmar eller visar allmänhetens stöd. Rätten gäller även om överklagandet bara avser ett villkor. Man ska överklaga **inom tiden för parter och sakägare**. | MB 16 kap. 13 § |
| Talerätt vid anmälningsärenden | Föreningen får överklaga beslut där tillsynsmyndigheten bedömt om en anmälningspliktig verksamhet kan antas medföra betydande miljöpåverkan. | MB 16 kap. 13 a § |
| Särskild dom | Domstolen kan på sökandens yrkande avgöra tillåtligheten i särskild dom och, om snart genomförande är angeläget, meddela tillstånd till vissa arbeten. | MB 22 kap. 26 § |
| Uppskov och provisoriska föreskrifter | När verkningarna inte kan förutses med tillräcklig säkerhet får domstolen vid tillstånd skjuta upp frågan om ersättning eller andra villkor till dess erfarenhet har vunnits. Provisoriska föreskrifter ska meddelas för skador och olägenheter. | MB 22 kap. 27 § |
| Verkställighetsförordnande | Domstolen får förordna att tillstånd får tas i anspråk före laga kraft. Säkerhet ska ställas hos länsstyrelsen. MÖD kan undanröja förordnandet innan talan i övrigt prövas. | MB 22 kap. 28 § |
| Villkor och delegering | Tillstånd får ges för begränsad tid och förenas med villkor (16 kap. 2 §). Domstolen får överlåta åt tillsynsmyndigheten att besluta villkor av mindre betydelse (22 kap. 25 §). | MB 16 kap. 2 §, 22 kap. 25 § |
| Vad en tillståndsdom ger | När domen vunnit laga kraft gäller tillståndet mot alla i de frågor som prövats, men kan ändras genom omprövning enligt 24 kap. | MB 24 kap. 1 § |
| Omprövning | Tillståndsmyndigheten får ompröva bland annat efter tio år, om verksamheten medverkar till att en miljökvalitetsnorm inte följs, om oförutsedd olägenhet uppkommer, om förhållandena ändras väsentligt eller om ny teknik ger en väsentlig förbättring. | MB 24 kap. 5 § |
| Vem kan ansöka om omprövning? | **Naturvårdsverket, Havs- och vattenmyndigheten, Myndigheten för civilt försvar och länsstyrelsen** (samt kommun som övertagit tillsynen). **Inte en förening.** | MB 24 kap. 11 § |
| Tillsyn | Sker på eget initiativ **eller efter anmälan**. Tillsynsmyndigheten kan förelägga och förbjuda, men får inte begränsa ett tillstånd som har rättskraft, utom vid brådskande och nödvändiga fall. | MB 26 kap. 1, 9 §§ |
| Rättegångskostnader | I mål om miljöfarlig verksamhet gäller inte rättegångsbalken om kostnader (25:1). I vissa vattenverksamhetsmål svarar sökanden för egna och motparternas kostnader i mark- och miljödomstolen, och en förening enligt 16 kap. 13 § **har inte rätt till ersättning och är inte skyldig att betala** (25:2). | MB 25 kap. 1–2 §§ |
| Hänsynsreglerna vid tillståndsprövning | Vid prövning av tillåtlighet, tillstånd och villkor är verksamhetsutövaren **skyldig att visa att kapitlets förpliktelser iakttas**. Kraven gäller i den utsträckning det inte är orimligt (2 kap. 7 §), men de krav som behövs för att följa 5 kap. 4–5 §§ (miljökvalitetsnormer) ska alltid ställas. | MB 2 kap. 1, 3, 7 §§ |
| Stoppregeln | Kan en verksamhet befaras ge väsentlig skada eller olägenhet trots försiktighetsmått får den bedrivas bara om regeringen finner särskilda skäl. Verksamhet får inte bedrivas om den medför risk att ett stort antal människor får försämrade levnadsförhållanden eller miljön försämras avsevärt. Gäller inte om regeringen tillåtit verksamheten enligt 17 kap. 1, 3 eller 4 §. | MB 2 kap. 9 § |
| Försämringsförbudet | Myndighet eller kommun får inte tillåta en verksamhet som försämrar vattenmiljön otillåtet eller äventyrar en miljökvalitetsnorm. Vid nytt tillstånd ska de villkor beslutas som behövs. | MB 5 kap. 4 § |
| EU-förordning 2020/741 | Är tillämplig **när renat avloppsvatten återanvänds** för sådan bevattning inom jordbruket som anges i bilaga I (artikel 2.1). Medlemsstat får besluta att återanvändning för jordbruksbevattning inte är lämplig i ett avrinningsdistrikt (artikel 2.2). Syftet (artikel 1.2) nämner att främja den cirkulära ekonomin och motverka vattenbrist. Förordningen kräver alltså inte att något vatten ska återanvändas. | Förordning (EU) 2020/741, art. 1–2 |

---

## 3. Vad detta betyder för frågorna i Maxima-diskussionen

*Nedan är läsningar av lagtexten, inte rättsliga slutsatser. Se Tabell 3 för vad som fortfarande kräver jurist.*

1. **Hänsynsreglerna är inte "inte tvingande".** Lagtexten lägger bevisbördan på verksamhetsutövaren vid tillståndsprövning (2 kap. 1 §). Rimlighetsreservationen i 2 kap. 7 § begränsar kraven, men inte kraven enligt 5 kap. 4–5 §§. Naturvårdsverkets vägledning hänvisar till MÖD 2011:26 för att samtliga hänsynsregler ska uppfyllas i den utsträckning det inte är orimligt (**S**, hämtad via sökning, ej läst i original). Det talar för att Thomas avsnitt om 2 kap. 3 § (bästa möjliga teknik) och bevisbördan har lagstöd, och att meningen "hänsynsreglerna är inte tvingande" bör prövas av en jurist innan den står i ett yttrande.
2. **Stoppregeln (2 kap. 9 §)** gäller höga trösklar: *väsentlig* skada eller olägenhet *trots* försiktighetsmått, och regeringen har en roll. Den är ett svårt huvudargument. Hur och när domstolar tillämpar den är inte läst (**J**).
3. **EU-förordning 2020/741:** Lars har rätt i sak. Förordningen gäller bara när vatten faktiskt återanvänds för bevattning, och den kräver ingen återanvändning. Ett påstående att den "bryts" eller "kan inte följas" om allt släpps i Öresund bär inte. Syftet i artikel 1.2 (cirkulär ekonomi, vattenbrist) ger däremot stöd för ett *alternativ- och hushållningsargument*. Det kan formuleras som att VA SYD inte har utrett om en del av vattnet kan återanvändas lokalt, inte som lagbrott.
4. **Alternativt yrkande.** Lagtexten har verktyg som ligger nära Höjeådalens drifttagningsvillkor: tillstånd får förenas med villkor (16 kap. 2 §), domstolen kan skjuta upp villkor till dess erfarenhet vunnits och meddela provisoriska föreskrifter (22 kap. 27 §), och delegera villkor av mindre betydelse till tillsynsmyndigheten (22 kap. 25 §). Praxisreferat som sökningen pekade på ([MÖD 2004:12](https://lagen.nu/dom/mod/2004:12), [MÖD 2008:22](https://lagen.nu/dom/mod/2008:22)) berör utredningsvillkor, prövotid och gränsen för delegering till tillsynsmyndigheten (**S**, inte lästa). Vad som är **strategiskt** klokt (Leifs "smitväg") är inte en lagfråga och kan inte avgöras ur lagtexten (**J**, erfaren processförare).
5. **Efter laga kraft är föreningens verktyg få.** Omprövning kan bara begäras av myndigheterna (24 kap. 11 §). Tillsynsmyndigheten får inte begränsa ett tillstånd med rättskraft (26 kap. 9 §). Föreningen kan anmäla till tillsynsmyndigheten (26 kap. 1 §). **Konsekvens för Samrådsguiden och för yttrandet:** det som inte blir ett villkor i domen är svårt att få in senare. Det stärker Lars poäng om att skriva för nästa instans och att få allt väsentligt i domstolens akt nu.
6. **Kostnadsrisk för föreningen** är begränsad i de mål som omfattas av 25 kap. 2 §: föreningen är inte skyldig att betala. Hur 25 kap. tillämpas i ett **blandat** mål (miljöfarlig verksamhet och vattenverksamhet) vid ett överklagande *av föreningen* är inte klarlagt här (**J**, J4).

---

## 4. Juristfrågor, formulerade så att de kan ställas

**Tabell 3. Vad som kräver jurist (J)**

| # | Fråga till juristen | Varför | Prioritet |
|---|---|---|---|
| J1 | Krävs prövningstillstånd i MÖD för en dom i ett ansökningsmål enligt MB 9 och 11 kap. (som MAXIMA)? Ändras det 2027-01-01? | Lagtexten (1996:242, 39 §) anger det, men jag har inte sett en MÖD-källa som bekräftar det för tillståndsmål, och lag 2010:921 ändras 2027. | Hög |
| J2 | Vad gäller för nya omständigheter och nytt bevis i MÖD? Räcker det att de "borde" ha åberopats i mark- och miljödomstolen? | Lars farhåga. Lagen begränsar uttryckligen bara i HD (41 §). | Hög |
| J3 | Hur räknas klagotiden (tre veckor) för en sakägare eller förening som inte särskilt delgetts domen? Gäller kungörelse av domen? Och vad innebär 16 kap. 13 § sista meningen ("innan tiden för överklagande har gått ut för parterna och sakägarna")? | Frist är avgörande och kan inte repareras. | Hög |
| J4 | Vem bär kostnaderna om föreningen överklagar ett blandat mål (miljöfarlig verksamhet och vattenverksamhet)? Gäller 25:1 eller 25:2, och vad gäller i MÖD (25:2 andra stycket, 25:5 med rättegångsbalken 18 kap. 6 och 8 §§)? | Föreningar måste veta kostnadsrisken. | Hög |
| J5 | Är ett andrahandsyrkande om villkor förenligt med ett avslagsyrkande, och hur formuleras det så att det inte läses som medgivande? Vilka villkorsformer finns (utredningsvillkor, uppskov enligt 22 kap. 27 §, delegering enligt 22 kap. 25 §) och vad säger MÖD 2004:12 och 2008:22? | Leifs fråga, Thomas yrkande, och VA SYDs eget överväganden om utredningsvillkor. | Hög |
| J6 | Ger 2 kap. 1 och 7 §§ en självständig grund för avslag om BAT inte är redovisat, eller vägs de in i helhetsbedömningen? Vad betyder MÖD 2011:26? | Skillnaden mellan Leif och Thomas. | Medel |
| J7 | Vilken lydelse av 16 kap. 13 §, 24 kap. och lag 2010:921 gäller för ett mål där domen meddelas vecka 15 2027 (övergångsbestämmelser till SFS 2026:935, 2026:1238 och 2026:589)? | Flera ändringar träder i kraft 2027-01-01 och 2027-07-01. | Hög |
| J8 | Har en förening talerätt när en verksamhet (t.ex. nedläggning av ett reningsverk) hanteras som anmälningsärende? 16 kap. 13 a § täcker bara beslut om betydande miljöpåverkan. | Leifs spår om nedläggningen. | Medel |
| J9 | Hur tillämpas stoppregeln (2 kap. 9 §) i praktiken, och är den realistisk att åberopa? | Leifs fråga. | Låg |
| J10 | Vilka frågor kan vara "följdverksamhet" som måste prövas i samma mål, och när kan en sökande avgränsa bort dem? | Kärnan i nedläggningsdiskussionen. | Hög |

---

## 5. Vad jag inte har gjort

- Läst praxis i original. MÖD 2004:12, 2008:22 och 2011:26 är nämnda via sökträffar och ska läsas av en jurist eller i referatet.
- Läst övergångsbestämmelserna till 2026 års ändringar.
- Läst miljöprövningsförordningen, förordningen om miljöfarlig verksamhet och 9 kap. MB om anmälan.
- Läst Länsstyrelsens eller Naturvårdsverkets vägledning i original (utom träffar via sökning).
- Granskat tolkningar av Weserdomen (C-461/13) här. Den kontrollerades i ett tidigare steg.
- Bedömt vad som är **rimligt** för ett visst yttrande i MAXIMA. Det är en sakfråga och en processfråga för gruppen och en jurist.

## 6. Källor

- [Miljöbalk (1998:808)](https://lagen.nu/1998:808), hämtad 2026-10-19. *(Konsoliderad lagtext, privat tjänst. Kontrollera mot riksdagen.se.)*
- [Lag (2010:921) om mark- och miljödomstolar](https://lagen.nu/2010:921), hämtad 2026-10-19. *(Instansordning, sammansättning, tillämpning av domstolsärendelagen.)*
- [Lag (1996:242) om domstolsärenden](https://lagen.nu/1996:242), hämtad 2026-10-19. *(Klagotid och prövningstillstånd.)*
- [Europaparlamentets och rådets förordning (EU) 2020/741](https://publications.europa.eu/resource/celex/32020R0741), hämtad 2026-10-19. *(Artikel 1–2 lästa.)*
- [MÖD 2004:12](https://lagen.nu/dom/mod/2004:12) och [MÖD 2008:22](https://lagen.nu/dom/mod/2008:22) på lagen.nu. *(Nämnda via sökträff om utredningsvillkor, ej lästa.)*
- [Naturvårdsverket, Hänsynsreglerna, kapitel 2 miljöbalken](https://www.naturvardsverket.se/vagledning-och-stod/miljobalken/hansynsreglerna--kapitel-2-miljobalken/). *(Vägledning, inte bindande. Hänvisar till MÖD 2011:26 för rimlighetsavvägningen.)*
