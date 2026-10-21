// Sökruta för Samrådsguiden. Söker i sokindex.js (skapas av bygg_sokindex.py) direkt i webbläsaren.
// Inget skickas till någon server. Indexet hämtas först när läsaren börjar söka.
(function () {
  const boxar = document.querySelectorAll("[data-sok]");
  if (!boxar.length) return;

  const MAX = 30;
  let indexLaddas = null;

  function basUrl() {
    const s = document.querySelector('script[src$="sok.js"]');
    return s ? s.src.replace(/sok\.js(\?.*)?$/, "") : "";
  }

  function laddaIndex() {
    if (window.SOKINDEX) return Promise.resolve(window.SOKINDEX);
    if (indexLaddas) return indexLaddas;
    indexLaddas = new Promise((klar, fel) => {
      const s = document.createElement("script");
      s.src = basUrl() + "sokindex.js";
      s.onload = () => klar(window.SOKINDEX || []);
      s.onerror = () => fel(new Error("Sökindexet kunde inte hämtas."));
      document.head.appendChild(s);
    });
    return indexLaddas;
  }

  function esc(t) {
    return t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function regex(ord) {
    return new RegExp("(" + ord.map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi");
  }

  function sok(index, fraga) {
    const ord = fraga.toLowerCase().split(/\s+/).filter((o) => o.length > 0);
    if (!ord.length) return [];
    const traffar = [];
    for (const p of index) {
      const rubrik = (p.h || "").toLowerCase();
      const titel = p.t.toLowerCase();
      const text = p.x.toLowerCase();
      let poang = 0;
      let alla = true;
      for (const o of ord) {
        const iRubrik = rubrik.includes(o);
        const iTitel = titel.includes(o);
        const iText = text.includes(o);
        if (!iRubrik && !iTitel && !iText) { alla = false; break; }
        if (iRubrik) poang += 20;
        if (iTitel) poang += 5;
        if (iText) {
          const n = text.split(o).length - 1;
          poang += Math.min(n, 10);
        }
      }
      if (alla) traffar.push({ p, poang });
    }
    traffar.sort((a, b) => b.poang - a.poang);
    return { ord, traffar };
  }

  function utdrag(text, ord) {
    const lc = text.toLowerCase();
    let pos = -1;
    for (const o of ord) {
      const i = lc.indexOf(o);
      if (i !== -1 && (pos === -1 || i < pos)) pos = i;
    }
    if (pos === -1) pos = 0;
    const start = Math.max(0, pos - 70);
    const slut = Math.min(text.length, pos + 150);
    let s = text.slice(start, slut);
    if (start > 0) s = "… " + s.replace(/^\S*\s/, "");
    if (slut < text.length) s = s.replace(/\s\S*$/, "") + " …";
    return esc(s).replace(regex(ord.map(esc)), "<mark>$1</mark>");
  }

  function visa(box, resultat, fraga) {
    const lista = box.querySelector("[data-sok-resultat]");
    const status = box.querySelector("[data-sok-status]");
    lista.innerHTML = "";
    if (!fraga.trim()) { status.textContent = ""; return; }
    const { ord, traffar } = resultat;
    if (!traffar.length) {
      status.textContent = "Inga träffar på ”" + fraga + "”. Prova ett kortare ord, till exempel en ordstam (kompensation i stället för kompensationsåtgärder).";
      return;
    }
    const antal = traffar.length;
    status.textContent = antal + (antal === 1 ? " träff" : " träffar") + (antal > MAX ? ", de " + MAX + " mest relevanta visas" : "") + ".";
    const bit = document.createDocumentFragment();
    traffar.slice(0, MAX).forEach(({ p }) => {
      const li = document.createElement("li");
      const extern = p.m === 1;
      const namn = p.h ? esc(p.h) : esc(p.t);
      const plats = p.h ? esc(p.t) : "";
      li.innerHTML =
        '<a class="sok__titel" href="' + esc(p.u) + '"' + (extern ? ' rel="noopener"' : "") + ">" + namn + "</a>" +
        (plats ? ' <span class="sok__plats">i ' + plats + "</span>" : "") +
        (extern ? ' <span class="sok__plats">(Markdown-fil på GitHub)</span>' : "") +
        '<p class="sok__utdrag">' + utdrag(p.x, ord) + "</p>";
      bit.appendChild(li);
    });
    lista.appendChild(bit);
  }

  boxar.forEach((box) => {
    const falt = box.querySelector("input");
    const status = box.querySelector("[data-sok-status]");
    let timer = null;

    function kor() {
      const fraga = falt.value;
      if (!fraga.trim()) { visa(box, null, ""); return; }
      status.textContent = "Söker …";
      laddaIndex().then((index) => {
        if (falt.value !== fraga) return;
        visa(box, sok(index, fraga), fraga);
      }).catch(() => {
        status.textContent = "Sökningen kunde inte starta. Använd innehållsträdet i stället.";
      });
    }

    const q = new URLSearchParams(location.search).get("q");
    if (q) { falt.value = q; kor(); }

    falt.addEventListener("focus", () => { laddaIndex().catch(() => {}); }, { once: true });
    falt.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(kor, 120); });
    box.querySelector("form").addEventListener("submit", (e) => { e.preventDefault(); kor(); });
    falt.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && falt.value) { falt.value = ""; kor(); }
    });
  });
})();
