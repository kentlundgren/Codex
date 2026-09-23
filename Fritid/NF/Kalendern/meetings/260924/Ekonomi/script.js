const MONTHS = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
const PROJECT_CLASSES = ["proj-a", "proj-b", "proj-c"]; // fast, kategorisk ordning – inte gissade per period

function formatSwedishDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function formatSEK(amount, { forceSign = false } = {}) {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let sign = "";
  if (amount < 0) sign = "−";
  else if (forceSign && amount > 0) sign = "+";
  return `${sign}${formatted} kr`;
}

function sum(items) {
  return items.reduce((acc, item) => acc + item.belopp, 0);
}

function projectClassFor(data, projektId) {
  if (!projektId) return "";
  // Färgidentiteten ska inte bero på i vilken ordning raderna listas i JSON:en
  // (den ordningen ändras för att styra läsordningen i tabellen) – sortera
  // projekt-id:na alfabetiskt så samma projekt alltid får samma färg.
  const ids = [...new Set((data.projekt || []).map((p) => p.id))].sort();
  const idx = ids.indexOf(projektId);
  return idx >= 0 ? PROJECT_CLASSES[idx % PROJECT_CLASSES.length] : "";
}

function dataRow(data, item) {
  const cls = projectClassFor(data, item.projekt);
  return `
    <tr class="${cls}">
      <td>${item.namn}</td>
      <td class="amount">${formatSEK(item.belopp)}</td>
    </tr>
  `;
}

function sectionRow(label) {
  return `<tr class="row-section"><td colspan="2">${label}</td></tr>`;
}

function totalRow(label, amount) {
  return `
    <tr class="row-total">
      <td>${label}</td>
      <td class="amount">${formatSEK(amount, { forceSign: true })}</td>
    </tr>
  `;
}

function renderTable(data) {
  const income = sum(data.intakter);
  const cost = sum(data.kostnader);
  const result = income + cost;

  const rows = [
    sectionRow("Intäkter"),
    ...data.intakter.map((item) => dataRow(data, item)),
    totalRow("Summa intäkter", income),
    sectionRow("Kostnader"),
    ...data.kostnader.map((item) => dataRow(data, item)),
    totalRow("Summa kostnader", cost),
    totalRow("Resultat", result),
  ];

  document.getElementById("tableBody").innerHTML = rows.join("");
}

function renderCommentary(data) {
  const projekt = data.projekt || [];
  const list = document.getElementById("projectNetList");
  const closing = document.getElementById("closingText");

  if (projekt.length === 0) {
    list.innerHTML = "";
    closing.textContent = "";
    return;
  }

  list.innerHTML = projekt
    .map((p) => {
      const incomeItem = data.intakter.find((i) => i.projekt === p.id);
      const costItem = data.kostnader.find((i) => i.projekt === p.id);
      const incomeAmt = incomeItem ? incomeItem.belopp : 0;
      const costAmt = costItem ? costItem.belopp : 0;
      const net = incomeAmt + costAmt;
      const nollsummespel = Math.abs(net) < 100 ? " (i praktiken nollsummespel)" : "";
      return `<li>${p.namn}: ${formatSEK(costAmt)} kostnad mot ${formatSEK(incomeAmt)} intäkt (${incomeItem ? incomeItem.namn : "–"}) → <strong>${formatSEK(net, { forceSign: true })} netto</strong>${nollsummespel}</li>`;
    })
    .join("");

  const projectIds = new Set(projekt.map((p) => p.id));
  const ownItems = [...data.intakter, ...data.kostnader].filter((item) => !projectIds.has(item.projekt));
  const ownResult = sum(ownItems);
  const projectNet = sum(data.intakter) + sum(data.kostnader) - ownResult;
  const total = ownResult + projectNet;

  closing.textContent = `Det betyder att periodens resultat (${formatSEK(total, { forceSign: true })}) i praktiken kommer från den löpande verksamheten (${formatSEK(ownResult, { forceSign: true })}) – cykelkartan och fotoutställningen bidrar tillsammans med ${formatSEK(projectNet, { forceSign: true })} netto.`;
}

function renderSourceNote(data) {
  const from = formatSwedishDate(data.period.fran);
  const to = formatSwedishDate(data.period.till);
  document.getElementById("sourceNote").textContent =
    `Period: ${from}–${to}. Källa: ${data.kalla}.`;
}

function renderLede(data) {
  const projekt = data.projekt || [];
  document.getElementById("ledeText").textContent =
    projekt.length > 0
      ? "Cykelkartan och fotoutställningen är markerade nedan eftersom de har både en egen kostnad och en riktad intäkt (ersättning respektive miljöanslag) i huvudboken – ställda mot varandra syns det att de i praktiken är nära nog självfinansierade."
      : "Intäkter och kostnader sammanställda ur föreningens huvudbok.";
}

function renderAll(data) {
  renderLede(data);
  renderTable(data);
  renderCommentary(data);
  renderSourceNote(data);
}

async function loadPeriod(dateStr) {
  const res = await fetch(`data/${dateStr}.json`);
  const data = await res.json();
  renderAll(data);
}

async function init() {
  try {
    const manifestRes = await fetch("data/manifest.json");
    if (!manifestRes.ok) throw new Error(`manifest.json: ${manifestRes.status}`);
    const dates = await manifestRes.json();
    const sorted = [...dates].sort().reverse(); // senaste perioden först

    const select = document.getElementById("periodSelect");
    select.innerHTML = "";
    sorted.forEach((dateStr) => {
      const opt = document.createElement("option");
      opt.value = dateStr;
      opt.textContent = formatSwedishDate(dateStr);
      select.appendChild(opt);
    });

    select.addEventListener("change", () => loadPeriod(select.value));
    await loadPeriod(sorted[0]);
  } catch (err) {
    document.getElementById("fetchWarning").hidden = false;
    document.querySelector(".period-row").hidden = true;
    console.error("Kunde inte läsa in resultaträkningens data:", err);
  }

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

document.addEventListener("DOMContentLoaded", init);
