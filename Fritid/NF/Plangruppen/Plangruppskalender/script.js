// Plangruppskalender: ritar möteslistan, månadsvyn och teknikmodalen.
// Mötena kommer från MOTEN i moten.js.

function parseLokal(iso) {
  // "2026-09-09T17:00" utan Z: tolka som lokal tid, inte UTC.
  const [datum, tid] = iso.split("T");
  const [ar, manad, dag] = datum.split("-").map(Number);
  const [timme, minut] = tid.split(":").map(Number);
  return new Date(ar, manad - 1, dag, timme, minut);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatDatumTid(start, slut) {
  const dagar = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
  const manader = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
  const s = parseLokal(start);
  const e = parseLokal(slut);
  const dagNamn = dagar[s.getDay()];
  const datum = s.getDate() + " " + manader[s.getMonth()] + " " + s.getFullYear();
  const tid = pad(s.getHours()) + ":" + pad(s.getMinutes()) + "–" + pad(e.getHours()) + ":" + pad(e.getMinutes());
  return dagNamn + " " + datum + ", kl. " + tid;
}

function googleMallUrl(mote) {
  const start = parseLokal(mote.start);
  const slut = parseLokal(mote.slut);
  const compact = (d) => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: mote.titel,
    dates: compact(start) + "/" + compact(slut),
    location: mote.plats,
    details: mote.beskrivning,
    ctz: "Europe/Stockholm"
  });
  return "https://calendar.google.com/calendar/render?" + params.toString();
}

function ritaMoten() {
  const lista = document.getElementById("moten-lista");
  const nu = new Date();
  const sorterade = MOTEN.slice().sort((a, b) => parseLokal(a.start) - parseLokal(b.start));

  lista.innerHTML = "";
  sorterade.forEach((mote) => {
    const harVarit = parseLokal(mote.slut) < nu;
    const artikel = document.createElement("article");
    artikel.className = harVarit ? "mote har-varit" : "mote";
    artikel.id = mote.id;

    const rubrik = document.createElement("h3");
    rubrik.textContent = mote.titel + (harVarit ? " (har varit)" : "");

    const nar = document.createElement("p");
    nar.className = "meta";
    nar.textContent = formatDatumTid(mote.start, mote.slut);

    const plats = document.createElement("p");
    plats.className = "meta";
    plats.textContent = mote.plats;

    const om = document.createElement("p");
    om.textContent = mote.beskrivning;

    const länk = document.createElement("a");
    länk.className = "mote-knapp";
    länk.href = googleMallUrl(mote);
    länk.target = "_blank";
    länk.rel = "noopener";
    länk.textContent = "Öppna i Google Kalender";

    artikel.append(rubrik, nar, plats, om, länk);
    lista.append(artikel);
  });
}

function ritaManad() {
  const forsta = MOTEN.length ? parseLokal(MOTEN[0].start) : new Date();
  const ar = forsta.getFullYear();
  const manad = forsta.getMonth();
  const manader = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
  document.getElementById("manad-rubrik").textContent = manader[manad] + " " + ar;

  const moteDagar = new Set(
    MOTEN
      .filter((m) => {
        const d = parseLokal(m.start);
        return d.getFullYear() === ar && d.getMonth() === manad;
      })
      .map((m) => parseLokal(m.start).getDate())
  );

  const rutnat = document.getElementById("manad-rutnat");
  rutnat.innerHTML = "";
  ["mån", "tis", "ons", "tor", "fre", "lör", "sön"].forEach((namn) => {
    const el = document.createElement("span");
    el.className = "veckodag";
    el.textContent = namn;
    rutnat.append(el);
  });

  const forstaVeckodag = new Date(ar, manad, 1).getDay();
  const tomma = forstaVeckodag === 0 ? 6 : forstaVeckodag - 1;
  for (let i = 0; i < tomma; i += 1) {
    const el = document.createElement("span");
    el.className = "tom";
    el.setAttribute("aria-hidden", "true");
    rutnat.append(el);
  }

  const antalDagar = new Date(ar, manad + 1, 0).getDate();
  for (let dag = 1; dag <= antalDagar; dag += 1) {
    const el = document.createElement("span");
    el.className = moteDagar.has(dag) ? "dag har-mote" : "dag";
    el.textContent = String(dag);
    if (moteDagar.has(dag)) {
      el.title = "Plangruppmöte";
    }
    rutnat.append(el);
  }
}

function kopplaTeknikModal() {
  const techBtn = document.getElementById("techBtn");
  const techModal = document.getElementById("techModal");
  const techClose = document.getElementById("techClose");
  const openModal = () => techModal.classList.add("show");
  const closeModal = () => techModal.classList.remove("show");

  techBtn.addEventListener("click", openModal);
  techClose.addEventListener("click", closeModal);
  techModal.addEventListener("click", (e) => {
    if (e.target === techModal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && techModal.classList.contains("show")) closeModal();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  ritaMoten();
  ritaManad();
  kopplaTeknikModal();
});
