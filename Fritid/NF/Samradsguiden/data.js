// Datamodell för Samrådsguidens interaktiva verktyg.
// Struktur enligt SPEC_samradsguiden.md, avsnitt 1. Sakligt innehåll enligt
// PRD_samradsguiden.md, avsnitt 5–8.

const AVSANDARROLL = {
  privatperson: {
    label: "Privatperson",
    arendetsRamFalt: ["Namn", "Adress", "Datum"],
    mandatFalt: false,
    hjalptext: "Du skriver i eget namn. Ange namn, adress och datum. Inget mandat eller styrelsebeslut krävs."
  },
  forening: {
    label: "På uppdrag av en förening eller organisation",
    arendetsRamFalt: ["Föreningens namn", "Organisationsnummer (om tillämpligt)", "Undertecknare", "Mandat — t.ex. vilket styrelsebeslut som ger rätt att företräda föreningen", "Datum"],
    mandatFalt: true,
    hjalptext: "Ange tydligt vem som för föreningens talan och med vilket mandat. Ett yttrande utan angivet mandat är lättare för mottagaren att avfärda på formalia — det hände i ett tidigare granskat utkast i det här projektet."
  }
};

const MOTTAGARE = {
  kommun: {
    label: "Kommunen",
    hjalptext: "Normal mottagare för PBL-samråd och PBL-granskning. Kontrollera i planhandlingen exakt vilken nämnd eller vilket kontor yttrandet ska skickas till."
  },
  lansstyrelsen: {
    label: "Länsstyrelsen",
    hjalptext: "Vanlig mottagare för tidiga MB-samråd (avgränsningssamråd, kompletterande samråd) och för tillsynsfrågor. Kontrollera alltid i samrådsunderlaget."
  },
  markOchMiljodomstolen: {
    label: "Mark- och miljödomstolen",
    hjalptext: "Mottagare när en ansökan har kungjorts och målet handläggs. Ange domstolens målnummer om det är känt."
  },
  annan: {
    label: "Annan mottagare (ange själv)",
    hjalptext: "Om samrådsunderlaget anger en annan mottagare än de tre ovan, skriv in den här. Kontrollera alltid mot det aktuella underlaget — det förekommer att avsändare, mottagare och sista svarsdag saknas helt i ett samrådsunderlag, vilket i sig är en brist värd att påtala."
  }
};

// Gemensamma hjälptexter för de delar som inte varierar mycket mellan skedena.
const DELBASHJALP = {
  arendetsRam: "Vad yttrandet avser, diarienummer (om känt), mottagare och sista svarsdag. Vem som står bakom texten och vilket mandat den har. Ange tydligt vad som är utkast och vad som är beslutat.",
  sammanfattning: "De viktigaste synpunkterna på högst en halv sida. Skriv den sist, även om den läses först. Den ska gå att läsa fristående och beskriver — den begär inte.",
  referat: "Valfri del. Om underlaget behöver återges görs det här, under egen rubrik och utan värderingar, så att referatet går att skilja från synpunkterna. Lämna fältet tomt om det inte behövs — det utelämnas då helt ur den färdiga texten.",
  vadSomBegars: "Besvarar frågan: vad ska mottagaren göra? Varje punkt ska gå att bifalla eller avslå. Skilj på begäran om komplettering, förslag till villkor, och ett eventuellt tillstyrkande eller avstyrkande.",
  kallforteckning: "Harvardhänvisningar med fungerande länkar, hämtdatum och en kort notis om vad varje källa är och varför den är med. Markera huvudkällan särskilt."
};

const DISPOSITIONER = {
  pbl: {
    programsamrad: {
      id: "pbl-programsamrad",
      label: "PBL — Programsamråd",
      lagrum: "PBL",
      mottagareForslag: "kommun",
      lagrumshanvisning: "Frivilligt skede. Inget eget lagrum i PBL 5 kap. — förekommer inte i alla planer.",
      delar: {
        arendetsRam: { hjalptext: DELBASHJALP.arendetsRam },
        sammanfattning: { hjalptext: DELBASHJALP.sammanfattning },
        referat: { hjalptext: DELBASHJALP.referat, valfri: true },
        synpunkter: { hjalptext: "Skedet gäller idéer och inriktning, inte ett låst förslag: vilka alternativ bör utredas, vilka värden bör vägas in innan ett förslag tas fram.", rubrikKalla: "Planprogrammets egna avsnitt, om sådana finns." },
        vadSomBegars: { hjalptext: DELBASHJALP.vadSomBegars + " I detta tidiga skede handlar det oftast om att begära att vissa alternativ eller värden utreds vidare." },
        kallforteckning: { hjalptext: DELBASHJALP.kallforteckning }
      }
    },
    samrad: {
      id: "pbl-samrad",
      label: "PBL — Samråd",
      lagrum: "PBL",
      mottagareForslag: "kommun",
      lagrumshanvisning: "PBL 5 kap. 11–13 §§. Kommunen ska samråda med länsstyrelsen, lantmäterimyndigheten, berörda kommuner, kända sakägare och boende, samt myndigheter och organisationer med väsentligt intresse (5 kap. 11 §). Syftet är enligt lagtexten “att få fram ett så bra beslutsunderlag som möjligt” (5 kap. 12 §).",
      delar: {
        arendetsRam: { hjalptext: DELBASHJALP.arendetsRam },
        sammanfattning: { hjalptext: DELBASHJALP.sammanfattning },
        referat: { hjalptext: DELBASHJALP.referat, valfri: true },
        synpunkter: { hjalptext: "Gäller ett konkret planförslag. Kommunen sammanställer inkomna synpunkter i en samrådsredogörelse.", rubrikKalla: "Planbeskrivningens och plankartans egna avsnitt." },
        vadSomBegars: { hjalptext: DELBASHJALP.vadSomBegars + " Möjliga krav: ändrad planbestämmelse, ändrad plankarta, kompletterande utredning, eller att planen inte bör antas i föreslagen form." },
        kallforteckning: { hjalptext: DELBASHJALP.kallforteckning }
      }
    },
    granskning: {
      id: "pbl-granskning",
      label: "PBL — Granskning",
      lagrum: "PBL",
      mottagareForslag: "kommun",
      lagrumshanvisning: "PBL 5 kap. 18, 21 och 23 §§ (25 § vid ny granskning om kommunen ändrar förslaget väsentligt efteråt). Planförslaget granskas under minst två veckor (5 kap. 18 §) och hålls tillgängligt tillsammans med samrådsredogörelsen (5 kap. 21 §). Kommunen sammanställer ett granskningsutlåtande (5 kap. 23 §).",
      varningVidRisk: "Sista ordinarie tillfället att lämna synpunkter innan planen antas. Den som inte yttrar sig i granskningen riskerar att förlora rätten att överklaga planen senare.",
      delar: {
        arendetsRam: { hjalptext: DELBASHJALP.arendetsRam },
        sammanfattning: { hjalptext: DELBASHJALP.sammanfattning },
        referat: { hjalptext: DELBASHJALP.referat, valfri: true },
        synpunkter: { hjalptext: "Kallas ibland “utställning”. Formulera synpunkterna skarpare än i samrådet — detta är sista ordinarie chansen.", rubrikKalla: "Planbeskrivningens och plankartans egna avsnitt." },
        vadSomBegars: { hjalptext: DELBASHJALP.vadSomBegars + " Skarpare formulering rekommenderas här än i samrådsskedet." },
        kallforteckning: { hjalptext: DELBASHJALP.kallforteckning }
      }
    }
  },
  mb: {
    avgransningssamrad: {
      id: "mb-avgransningssamrad",
      label: "MB — Avgränsningssamråd",
      lagrum: "MB",
      mottagareForslag: "lansstyrelsen",
      lagrumshanvisning: "MB 6 kap. 29 §. Gäller verksamhetens lokalisering, omfattning och utformning, de miljöeffekter som kan antas uppstå, samt miljökonsekvensbeskrivningens (MKB) innehåll och utformning — inte ansökans slutliga utfall.",
      delar: {
        arendetsRam: { hjalptext: DELBASHJALP.arendetsRam },
        sammanfattning: { hjalptext: DELBASHJALP.sammanfattning },
        referat: { hjalptext: DELBASHJALP.referat, valfri: true },
        synpunkter: { hjalptext: "Följ samrådsunderlagets egen disposition och avsnittsnumrering. Hitta inte på en egen tematisk indelning.", rubrikKalla: "Samrådsunderlagets egna avsnitt och numrering." },
        vadSomBegars: { hjalptext: DELBASHJALP.vadSomBegars + " Ett avstyrkande i detta skede förutsätter ett beslut hos avsändaren — formulera det inte löst." },
        kallforteckning: { hjalptext: DELBASHJALP.kallforteckning }
      }
    },
    kompletterandeSamrad: {
      id: "mb-kompletterande-samrad",
      label: "MB — Kompletterande/utökat samråd",
      lagrum: "MB",
      mottagareForslag: "lansstyrelsen",
      lagrumshanvisning: "Inget eget lagrum. Genomförs när förutsättningarna ändrats väsentligt mellan avgränsningssamrådet och den slutliga ansökan.",
      delar: {
        arendetsRam: { hjalptext: DELBASHJALP.arendetsRam },
        sammanfattning: { hjalptext: DELBASHJALP.sammanfattning },
        referat: { hjalptext: DELBASHJALP.referat, valfri: true },
        synpunkter: { hjalptext: "Fokusera på vad som förändrats sedan avgränsningssamrådet, inte en upprepning av tidigare synpunkter.", rubrikKalla: "Det uppdaterade underlagets egna avsnitt." },
        vadSomBegars: { hjalptext: DELBASHJALP.vadSomBegars },
        kallforteckning: { hjalptext: DELBASHJALP.kallforteckning }
      }
    },
    yttrandeVidKungorelse: {
      id: "mb-yttrande-vid-kungorelse",
      label: "MB — Yttrande vid kungörelse av ansökan",
      lagrum: "MB",
      mottagareForslag: "markOchMiljodomstolen",
      lagrumshanvisning: "Formellt inte längre ett samråd, utan ett yttrande i ett pågående mål hos mark- och miljödomstolen.",
      delar: {
        arendetsRam: { hjalptext: DELBASHJALP.arendetsRam },
        sammanfattning: { hjalptext: DELBASHJALP.sammanfattning },
        referat: { hjalptext: DELBASHJALP.referat, valfri: true },
        synpunkter: { hjalptext: "Följ ansökans och MKB:ns egen disposition.", rubrikKalla: "Ansökans och MKB:ns egna avsnitt." },
        vadSomBegars: { hjalptext: DELBASHJALP.vadSomBegars + " Första skedet där ett tydligt tillstyrkande eller avstyrkande är juridiskt meningsfullt att uttala." },
        kallforteckning: { hjalptext: DELBASHJALP.kallforteckning }
      }
    }
  }
};

// Kompensationsmodulen: tre rättsliga spår × två lägen.
// Platshållarna {naturvarde}, {jamforbartFall}, {atgard} och {uppfoljning}
// är avsiktligt kvar i "konstruktivt förslag"-texterna — användaren ersätter
// dem själv. Verktyget exporterar texten som den är, se SPEC avsnitt 3.3.
const KOMPENSATION = {
  pbl: {
    label: "PBL — frivillig kommunal praxis",
    rattsligtLage: "Plan- och bygglagen ger i sig ingen möjlighet att ställa krav på kompensation i en detaljplan. Det som förekommer är helt frivilliga åtaganden — antingen från den som exploaterar, eller för att kommunen har egna riktlinjer. Göteborgs stad, Lomma kommun, Helsingborgs stad och Solna stad är exempel på kommuner som arbetar med detta.",
    tillgangligOm: (val) => val.lagrum === "pbl",
    begaran: {
      text: "Har frivilliga kompensationsåtgärder övervägts för de naturvärden som planen tar i anspråk, och i så fall vilka? Flera kommuner (bland dem Lomma, Göteborg, Helsingborg och Solna) arbetar med detta som egen policy, trots att plan- och bygglagen inte kräver det."
    },
    konstruktivtForslag: {
      mall: "I linje med hur andra kommuner — till exempel {jamforbartFall} — arbetar med frivillig ekologisk kompensation, uppmanas kommunen att överväga motsvarande åtgärder för {naturvarde}: exempelvis {atgard}, med uppföljning enligt {uppfoljning}."
    }
  },
  mb16kap9: {
    label: "MB 16 kap. 9 § — fakultativt villkor",
    rattsligtLage: "Ger prövningsmyndigheten rätt att villkora ett tillstånd eller en dispens med krav på kompensation för intrång i allmänna intressen. Bestämmelsen är fakultativ — myndigheten får, men måste inte — och omfattningen avgörs genom en rimlighetsavvägning. Gäller bara vid faktisk tillstånds- eller dispensprövning.",
    tillgangligOm: (val) => val.lagrum === "mb",
    begaran: {
      text: "Om tillstånd ändå ges, bör prövningsmyndigheten pröva om villkor om kompensation enligt 16 kap. 9 § miljöbalken är motiverat för {naturvarde}, och i så fall av vilken omfattning."
    },
    konstruktivtForslag: {
      mall: "I linje med hur kompensationen för {jamforbartFall} löstes — genom {atgard}, med uppföljning genom {uppfoljning} — uppmanas [verksamhetsutövaren] att redan i ansökan redovisa motsvarande möjligheter för {naturvarde}. Förslaget läggs fram som ett villkor för det fall tillstånd ändå ges, inte som ett skäl att bevilja det."
    }
  },
  mb7kap29: {
    label: "MB 7 kap. 29 § — obligatoriskt, Natura 2000 (undantagsfall)",
    rattsligtLage: "Gäller bara i det ovanliga fallet att regeringen prövar tillåtlighet enligt 7 kap. 29 § MB, efter att en verksamhet bedömts skada eller störa utpekade Natura 2000-värden så att ordinarie tillstånd enligt 7 kap. 28 § inte kan ges. I det fallet är kompensation en förutsättning för tillåtlighet, inte en möjlighet myndigheten kan välja bort.",
    tillgangligOm: (val) => val.lagrum === "mb" && val.berorNatura2000 === true,
    begaran: {
      text: "Om ärendet skulle komma att prövas av regeringen enligt 7 kap. 29 § miljöbalken, är kompensation för {naturvarde} en förutsättning för att tillåtlighet över huvud taget ska kunna ges. Detta spår är ovanligt och förutsätter att skada på Natura 2000-området inte går att undvika — det är inte aktuellt i varje ärende som berör ett Natura 2000-område."
    },
    konstruktivtForslag: {
      mall: "Om domstolen skulle bedöma att skada på {naturvarde} inte går att undvika, och ärendet därför kan komma att prövas av regeringen enligt 7 kap. 29 § miljöbalken, uppmanas [verksamhetsutövaren] att redan nu redovisa hur en obligatorisk kompensation — motsvarande {atgard}, med uppföljning enligt {uppfoljning} — skulle kunna utformas."
    }
  }
};
