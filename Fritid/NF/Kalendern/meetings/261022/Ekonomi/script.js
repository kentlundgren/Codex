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

function esc(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Skillnad mellan det här beräknade resultatet (summan av huvudbokens delsummor)
// och huvudbokens egen slutrad. null om slutraden inte angetts eller stämmer.
function ledgerDiff(data) {
  if (typeof data.huvudbokSlutrad !== "number") return null;
  const calc = sum(data.intakter) + sum(data.kostnader);
  const diff = Math.round((data.huvudbokSlutrad - calc) * 100) / 100;
  return Math.abs(diff) < 0.005 ? null : { calc, ledger: data.huvudbokSlutrad, diff };
}

function fileLink(file, label) {
  return file ? `<a href="${esc(file.fil)}">${esc(label || file.etikett)}</a>` : "";
}

function resultRow(data, result) {
  const d = ledgerDiff(data);
  if (!d) return totalRow("Resultat", result);
  const higher = d.diff > 0 ? "högre" : "lägre";
  const links = [
    data.underlag && `<li>${fileLink(data.underlag)} – underlaget som siffrorna är hämtade ur</li>`,
    data.avstamning && `<li>${fileLink(data.avstamning)} – visar var skillnaden uppstår</li>`,
  ].filter(Boolean).join("");
  const analys = data.avstamning && data.avstamning.analys
    ? `<span class="diff-text">${esc(data.avstamning.analys)}</span>` : "";
  return `
    <tr class="row-total">
      <td>Resultat</td>
      <td class="amount">
        <span class="diff-wrap">
          <button type="button" class="diff-flag" id="diffBtn" aria-expanded="false" aria-describedby="diffTip">${formatSEK(result, { forceSign: true })} <span aria-hidden="true">ⓘ</span></button>
          <span class="diff-tip" id="diffTip" role="tooltip">
            <strong>Skiljer sig från huvudboken</strong>
            <span class="diff-text">Resultatet här är summan av huvudbokens delsummor: ${formatSEK(d.calc, { forceSign: true })}. Huvudbokens egen slutrad anger ${formatSEK(d.ledger, { forceSign: true })}, alltså ${formatSEK(Math.abs(d.diff))} ${higher}.</span>
            ${analys}
            <ul>${links}</ul>
            <a class="diff-more" href="#underlag">Mer under Underlag och avstämning</a>
          </span>
        </span>
      </td>
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
    resultRow(data, result),
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

function renderSources(data) {
  const box = document.getElementById("sourceLinks");
  const items = [];
  if (data.underlag) {
    items.push(`<li><strong>Underlag:</strong> ${fileLink(data.underlag)}. Det är huvudboken som tabellen ovan är byggd på (laddas ned som Word-fil).</li>`);
  }
  const d = ledgerDiff(data);
  if (d) {
    const analys = data.avstamning && data.avstamning.analys ? " " + esc(data.avstamning.analys) : "";
    items.push(`<li class="diff-note"><strong>Avvikelse:</strong> summan av huvudbokens delsummor ger ${formatSEK(d.calc, { forceSign: true })}, men huvudbokens egen slutrad anger ${formatSEK(d.ledger, { forceSign: true })} (skillnad ${formatSEK(Math.abs(d.diff))}). Tabellen visar summan av delsummorna.${analys}</li>`);
    if (data.avstamning) {
      items.push(`<li><strong>Analys:</strong> ${fileLink(data.avstamning)}. Excel-fil med huvudbokens rader, avstämning per kategori och ett blad som låter dig pröva vilka rader som kan förklara skillnaden.</li>`);
    }
  } else if (typeof data.huvudbokSlutrad === "number") {
    items.push(`<li><strong>Avstämning:</strong> resultatet stämmer med huvudbokens egen slutrad (${formatSEK(data.huvudbokSlutrad, { forceSign: true })}).</li>`);
  }
  box.innerHTML = items.join("");
  document.getElementById("underlag").hidden = items.length === 0;
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
  renderSources(data);
}

function placeDiffTip() {
  const wrap = document.querySelector(".diff-wrap");
  if (!wrap) return;
  const btn = wrap.querySelector("#diffBtn");
  const tip = wrap.querySelector("#diffTip");
  const b = btn.getBoundingClientRect();
  const width = Math.min(384, window.innerWidth * 0.86);
  const below = window.innerHeight - b.bottom;
  if (below < 300 && b.top > below) { // för lite plats under knappen: lägg rutan ovanför
    tip.style.top = "auto";
    tip.style.bottom = `${window.innerHeight - b.top}px`;
    tip.style.maxHeight = `${b.top - 8}px`;
  } else {
    tip.style.bottom = "auto";
    tip.style.top = `${b.bottom}px`;
    tip.style.maxHeight = `${Math.max(120, below - 8)}px`;
  }
  tip.style.left = `${Math.max(8, Math.min(b.right - width, window.innerWidth - width - 8))}px`;
}

function closeDiffTip() {
  const wrap = document.querySelector(".diff-wrap.open");
  if (!wrap) return;
  wrap.classList.remove("open");
  const btn = wrap.querySelector("#diffBtn");
  if (btn) btn.setAttribute("aria-expanded", "false");
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
    if (e.key === "Escape") closeDiffTip();
  });

  document.addEventListener("mouseover", (e) => { if (e.target.closest(".diff-wrap")) placeDiffTip(); });
  document.addEventListener("focusin", (e) => { if (e.target.closest(".diff-wrap")) placeDiffTip(); });
  window.addEventListener("scroll", placeDiffTip, { passive: true });
  window.addEventListener("resize", placeDiffTip);

  // Förklaringen vid avvikande resultat: hover och fokus via CSS, tryck/klick här.
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#diffBtn");
    if (btn) {
      placeDiffTip();
      const open = btn.closest(".diff-wrap").classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    } else if (!e.target.closest(".diff-tip")) {
      closeDiffTip();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
