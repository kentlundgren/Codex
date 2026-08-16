// Formulärlogik och exportlogik för den interaktiva guiden.
// Följer SPEC_samradsguiden.md, avsnitt 2–3. Kräver data.js inläst före denna fil.

const state = {
  avsandarroll: null,
  lagrum: null,
  skede: null,
  mottagare: null,
  mottagareAnnanText: "",
  kompensation: { onskas: null, berorNatura2000: null, sparValt: null, lage: null },
  text: { arendetsRam: "", sammanfattning: "", referat: "", synpunkter: "", vadSomBegars: "", kallforteckning: "" },
  malGenererad: false
};

const DELORDNING = ["arendetsRam", "sammanfattning", "referat", "synpunkter", "vadSomBegars", "kallforteckning"];
const DELRUBRIKER = {
  arendetsRam: "Ärendets ram",
  sammanfattning: "Sammanfattning",
  referat: "Referat",
  synpunkter: "Synpunkter",
  vadSomBegars: "Vad som begärs",
  kallforteckning: "Källförteckning"
};

let currentStep = 1;
const totalSteg = 5;

function currentDisposition() {
  if (!state.lagrum || !state.skede) return null;
  return DISPOSITIONER[state.lagrum][state.skede];
}

function renderStepVisibility() {
  for (let i = 1; i <= totalSteg; i++) {
    document.getElementById(`step-${i}`).hidden = i !== currentStep;
  }
  document.getElementById("btn-back").hidden = currentStep === 1;
  document.getElementById("btn-next").hidden = currentStep === totalSteg;
  document.getElementById("btn-generate").hidden = currentStep !== totalSteg;
}

function stepHasValue() {
  if (currentStep === 1) return !!state.avsandarroll;
  if (currentStep === 2) return !!state.lagrum;
  if (currentStep === 3) return !!state.skede;
  if (currentStep === 4) return !!state.mottagare && (state.mottagare !== "annan" || state.mottagareAnnanText.trim() !== "");
  if (currentStep === 5) {
    if (state.kompensation.onskas === false) return true;
    if (state.kompensation.onskas !== true) return false;
    if (!state.kompensation.sparValt) return false;
    if (!state.kompensation.lage) return false;
    return true;
  }
  return false;
}

function goNext() {
  if (!stepHasValue()) return;
  if (currentStep === totalSteg) return;
  currentStep += 1;
  if (currentStep === 3) populateSkedeOptions();
  if (currentStep === 4) populateMottagareOptions();
  if (currentStep === 5) resetKompensationUI();
  renderStepVisibility();
}

function goBack() {
  if (currentStep === 1) return;
  currentStep -= 1;
  renderStepVisibility();
}

// --- Steg 1: avsändarroll ---
document.querySelectorAll('input[name="avsandarroll"]').forEach((el) => {
  el.addEventListener("change", () => { state.avsandarroll = el.value; });
});

// --- Steg 2: lagrum ---
document.querySelectorAll('input[name="lagrum"]').forEach((el) => {
  el.addEventListener("change", () => {
    state.lagrum = el.value;
    state.skede = null;
    state.mottagare = null;
    state.kompensation = { onskas: null, berorNatura2000: null, sparValt: null, lage: null };
  });
});

// --- Steg 3: skede (populeras dynamiskt utifrån lagrum) ---
function populateSkedeOptions() {
  const container = document.getElementById("skede-options");
  container.textContent = "";
  const skeden = DISPOSITIONER[state.lagrum];
  Object.keys(skeden).forEach((key) => {
    const skede = skeden[key];
    const label = document.createElement("label");
    label.className = "option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "skede";
    input.value = key;
    input.addEventListener("change", () => {
      state.skede = key;
      state.mottagare = null;
    });
    const span = document.createElement("span");
    const strong = document.createElement("span");
    strong.className = "option__label";
    strong.textContent = skede.label;
    const hint = document.createElement("span");
    hint.className = "option__hint";
    hint.textContent = skede.lagrumshanvisning + (skede.varningVidRisk ? " " + skede.varningVidRisk : "");
    span.appendChild(strong);
    span.appendChild(hint);
    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });
}

// --- Steg 4: mottagare ---
function populateMottagareOptions() {
  const container = document.getElementById("mottagare-options");
  container.textContent = "";
  const forslag = currentDisposition() ? currentDisposition().mottagareForslag : null;
  Object.keys(MOTTAGARE).forEach((key) => {
    const m = MOTTAGARE[key];
    const label = document.createElement("label");
    label.className = "option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "mottagare";
    input.value = key;
    if (key === forslag) input.checked = true;
    input.addEventListener("change", () => {
      state.mottagare = key;
      document.getElementById("mottagare-annan-field").hidden = key !== "annan";
    });
    const span = document.createElement("span");
    const strong = document.createElement("span");
    strong.className = "option__label";
    strong.textContent = m.label + (key === forslag ? " (föreslagen)" : "");
    const hint = document.createElement("span");
    hint.className = "option__hint";
    hint.textContent = m.hjalptext;
    span.appendChild(strong);
    span.appendChild(hint);
    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });
  if (forslag) state.mottagare = forslag;
  document.getElementById("mottagare-annan-field").hidden = true;
}

document.getElementById("mottagare-annan-text").addEventListener("input", (e) => {
  state.mottagareAnnanText = e.target.value;
});

// --- Steg 5: kompensation ---
function resetKompensationUI() {
  document.getElementById("komp-natura-field").hidden = state.lagrum !== "mb";
  document.getElementById("komp-spar-options").hidden = true;
  document.getElementById("komp-lage-options").hidden = true;
  document.querySelectorAll('input[name="kompOnskas"]').forEach((el) => { el.checked = false; });
  document.getElementById("berorNatura2000").checked = false;
}

document.querySelectorAll('input[name="kompOnskas"]').forEach((el) => {
  el.addEventListener("change", () => {
    state.kompensation.onskas = el.value === "ja";
    const visa = state.kompensation.onskas === true;
    document.getElementById("komp-natura-field").hidden = !(visa && state.lagrum === "mb");
    document.getElementById("komp-spar-options").hidden = !visa;
    document.getElementById("komp-lage-options").hidden = !visa;
    if (visa) populateKompensationSparOptions();
  });
});

document.getElementById("berorNatura2000").addEventListener("change", (e) => {
  state.kompensation.berorNatura2000 = e.target.checked;
  populateKompensationSparOptions();
});

function populateKompensationSparOptions() {
  const container = document.getElementById("komp-spar-options");
  container.textContent = "";
  const val = { lagrum: state.lagrum, berorNatura2000: state.kompensation.berorNatura2000 };
  const tillgangliga = Object.keys(KOMPENSATION).filter((key) => KOMPENSATION[key].tillgangligOm(val));

  if (state.lagrum === "pbl" && tillgangliga.length === 1) {
    state.kompensation.sparValt = tillgangliga[0];
  }

  tillgangliga.forEach((key) => {
    const spar = KOMPENSATION[key];
    const label = document.createElement("label");
    label.className = "option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "kompSpar";
    input.value = key;
    if (state.lagrum === "pbl") input.checked = true;
    input.addEventListener("change", () => { state.kompensation.sparValt = key; });
    const span = document.createElement("span");
    const strong = document.createElement("span");
    strong.className = "option__label";
    strong.textContent = spar.label;
    const hint = document.createElement("span");
    hint.className = "option__hint";
    hint.textContent = spar.rattsligtLage;
    span.appendChild(strong);
    span.appendChild(hint);
    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });
}

document.querySelectorAll('input[name="kompLage"]').forEach((el) => {
  el.addEventListener("change", () => { state.kompensation.lage = el.value; });
});

// --- Navigering ---
document.getElementById("btn-next").addEventListener("click", goNext);
document.getElementById("btn-back").addEventListener("click", goBack);
document.getElementById("btn-generate").addEventListener("click", () => {
  if (!stepHasValue()) return;
  if (state.malGenererad) {
    const bekrafta = window.confirm("Du har redan skrivit text. Vill du skriva över den ifyllda mallen?");
    if (!bekrafta) return;
  }
  genereraMall();
});

// --- Mallgenerering (SPEC avsnitt 2.3) ---
function genereraMall() {
  const disposition = currentDisposition();
  if (!disposition) return;

  DELORDNING.forEach((del) => { state.text[del] = ""; });

  // Del 1: förifyll verkligt värde utifrån avsändarroll och mottagare.
  const roll = AVSANDARROLL[state.avsandarroll];
  const mottagareLabel = state.mottagare === "annan" ? state.mottagareAnnanText : MOTTAGARE[state.mottagare].label;
  const falt = roll.arendetsRamFalt.map((f) => `${f}: `).join("\n");
  state.text.arendetsRam = `Mottagare: ${mottagareLabel}\n${falt}`;

  // Del 5: förifyll med kompensationsmall om kompensation önskas.
  if (state.kompensation.onskas === true && state.kompensation.sparValt) {
    const spar = KOMPENSATION[state.kompensation.sparValt];
    const innehall = state.kompensation.lage === "begaran" ? spar.begaran.text : spar.konstruktivtForslag.mall;
    state.text.vadSomBegars = innehall;
  }

  state.malGenererad = true;
  renderMall(disposition);
  document.getElementById("mall-section").hidden = false;
  document.getElementById("mall-section").scrollIntoView({ behavior: "smooth" });
}

function renderMall(disposition) {
  const container = document.getElementById("disposition-parts");
  container.textContent = "";
  DELORDNING.forEach((del) => {
    const wrap = document.createElement("div");
    wrap.className = "disposition-part";
    const h3 = document.createElement("h3");
    h3.textContent = DELRUBRIKER[del] + (disposition.delar[del].valfri ? " (valfri)" : "");
    const hint = document.createElement("p");
    hint.className = "disposition-part__hint";
    hint.textContent = disposition.delar[del].hjalptext + (disposition.delar[del].rubrikKalla ? " Rubriker hämtas från: " + disposition.delar[del].rubrikKalla : "");
    const textarea = document.createElement("textarea");
    textarea.id = `del-${del}`;
    textarea.placeholder = del === "arendetsRam" ? "" : "Skriv din text här …";
    textarea.value = state.text[del];
    textarea.addEventListener("input", (e) => {
      state.text[del] = e.target.value;
      uppdateraSammanstallning();
    });
    wrap.appendChild(h3);
    wrap.appendChild(hint);
    wrap.appendChild(textarea);
    container.appendChild(wrap);
  });
  uppdateraSammanstallning();
}

// --- Sammanställning (SPEC avsnitt 2.4). Renderas alltid med textContent. ---
function byggSammanstallning() {
  return DELORDNING
    .filter((del) => del !== "referat" || state.text.referat.trim() !== "")
    .map((del) => `${DELRUBRIKER[del].toUpperCase()}\n\n${state.text[del].trim()}`)
    .join("\n\n---\n\n");
}

function uppdateraSammanstallning() {
  const text = byggSammanstallning();
  document.getElementById("summary-box").textContent = text;
  const harPlatshallare = /\{[a-zA-ZåäöÅÄÖ]+\}/.test(text);
  document.getElementById("placeholder-warning").hidden = !harPlatshallare;
}

// --- Export (SPEC avsnitt 3) ---
document.getElementById("btn-copy").addEventListener("click", async () => {
  const text = byggSammanstallning();
  const statusEl = document.getElementById("copy-status");
  try {
    await navigator.clipboard.writeText(text);
    visaKopieringsstatus(statusEl, "Kopierat!");
  } catch (fel) {
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand("copy");
      visaKopieringsstatus(statusEl, "Kopierat!");
    } catch (fel2) {
      visaKopieringsstatus(statusEl, "Kunde inte kopiera automatiskt — markera texten ovan och kopiera med Ctrl+C.");
    }
    document.body.removeChild(temp);
  }
});

function visaKopieringsstatus(el, meddelande) {
  el.textContent = meddelande;
  el.hidden = false;
  setTimeout(() => { el.hidden = true; }, 4000);
}

document.getElementById("btn-download").addEventListener("click", () => {
  const text = byggSammanstallning();
  const disposition = currentDisposition();
  const filnamn = `yttrande-${disposition.id}.md`;
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filnamn;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

document.getElementById("btn-regenerate").addEventListener("click", () => {
  const bekrafta = window.confirm("Detta startar om guiden från steg 1. Ifylld text i den nuvarande mallen går förlorad om du inte redan kopierat eller laddat ner den. Fortsätta?");
  if (!bekrafta) return;
  location.reload();
});

renderStepVisibility();
