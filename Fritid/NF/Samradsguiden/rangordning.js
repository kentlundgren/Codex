/* Gemensam rangordning för Tabell 6 (prototyp).
   Kräver en tabell #tabell-6 vars rader har data-id och data-titel, och en behållare #rangordning.
   Backend: Supabase (se supabase.md och supabase_setup.sql). Utan inställningar i
   rangordning_config.js körs ett demoläge som sparar i den egna webbläsaren. */
(function () {
  "use strict";

  var cfg = window.RANGORDNING_CONFIG || {};
  var root = document.getElementById("rangordning");
  var tabell = document.getElementById("tabell-6");
  if (!root || !tabell) return;

  var DEMO = !(cfg.supabaseUrl && cfg.anonKey);
  var POLL_MS = 15000;
  var SAVE_DELAY_MS = 700;

  // ---------- Hjälpfunktioner ----------
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
    } catch (e) { /* lagring kan saknas, sidan fungerar ändå */ }
    return null;
  }

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    var b = new Uint8Array(16);
    crypto.getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    var h = Array.prototype.map.call(b, function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
    return h.slice(0, 8) + "-" + h.slice(8, 12) + "-" + h.slice(12, 16) + "-" + h.slice(16, 20) + "-" + h.slice(20);
  }

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function fmtTid(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" });
  }

  function fmtTal(x) { return (Math.round(x * 10) / 10).toString().replace(".", ","); }

  // ---------- Frågorna (läses ur tabellen) ----------
  var rows = Array.prototype.slice.call(tabell.querySelectorAll("tr[data-id]"));
  var items = rows.map(function (r, i) {
    return { id: r.getAttribute("data-id"), titel: r.getAttribute("data-titel"), forslag: i, rad: r };
  });
  var byId = {};
  items.forEach(function (it) { byId[it.id] = it; });
  var forslagOrder = items.map(function (it) { return it.id; });

  // ---------- Tillstånd ----------
  var token = store("rangordning_token");
  if (!token) { token = uuid(); store("rangordning_token", token); }
  var myId = store("rangordning_mitt_id") || null;
  var harRostat = store("rangordning_har_rostat") === "1";
  var namn = store("rangordning_namn") || "";
  var ownOrder = loadOwnOrder();
  var votes = [];            // röster från databasen (alla, även den egna)
  var status = { stangd: false, frist: cfg.frist || "2026-11-06T23:59:59+01:00", antal: 0 };
  var prevRank = null;       // gruppens placering vid förra ritningen, för markeringar
  var connection = "ansluter"; // ansluter | ok | fel
  var saveTimer = null;
  var saveState = "";        // "", "sparar", "sparat", "fel"
  var savedAt = "";
  var focusAfterRender = null;
  var loadedOnce = false;

  function loadOwnOrder() {
    var raw = store("rangordning_min_ordning");
    var arr = [];
    try { arr = JSON.parse(raw) || []; } catch (e) { arr = []; }
    return normalize(arr);
  }

  // Säkerställ att en ordning innehåller alla kända id exakt en gång.
  function normalize(arr) {
    var seen = {}, out = [];
    (arr || []).forEach(function (id) { if (byId[id] && !seen[id]) { seen[id] = 1; out.push(id); } });
    forslagOrder.forEach(function (id) { if (!seen[id]) out.push(id); });
    return out;
  }

  // ---------- Gruppens ordning (medelplats) ----------
  function groupRanking() {
    var list = votes.filter(function (v) { return !(myId && v.id === myId); });
    if (harRostat) list.push({ id: myId || "jag", ordning: ownOrder });
    var sum = {}, n = list.length;
    items.forEach(function (it) { sum[it.id] = 0; });
    list.forEach(function (v) {
      normalize(v.ordning).forEach(function (id, idx) { sum[id] += idx + 1; });
    });
    var mean = {};
    items.forEach(function (it) { mean[it.id] = n ? sum[it.id] / n : it.forslag + 1; });
    var order = forslagOrder.slice().sort(function (a, b) {
      return (mean[a] - mean[b]) || (byId[a].forslag - byId[b].forslag);
    });
    var rank = {};
    order.forEach(function (id, i) { rank[id] = i + 1; });
    return { order: order, mean: mean, rank: rank, n: n };
  }

  // ---------- Backend ----------
  var backend = DEMO ? demoBackend() : supabaseBackend();

  function supabaseBackend() {
    var base = String(cfg.supabaseUrl).replace(/\/$/, "") + "/rest/v1/rpc/";
    function headers() {
      var h = { "apikey": cfg.anonKey, "Content-Type": "application/json" };
      if (/^eyJ/.test(cfg.anonKey)) h["Authorization"] = "Bearer " + cfg.anonKey;
      return h;
    }
    function rpc(fn, body) {
      return fetch(base + fn, { method: "POST", headers: headers(), body: JSON.stringify(body || {}) })
        .then(function (r) {
          if (!r.ok) return r.text().then(function (t) { throw new Error(t || r.status); });
          return r.status === 204 ? null : r.json();
        });
    }
    return {
      hamta: function () {
        return Promise.all([rpc("hamta_roster"), rpc("hamta_status")]).then(function (res) {
          var s = (res[1] && res[1][0]) || {};
          return { votes: res[0] || [], status: { stangd: !!s.stangd, frist: s.frist, antal: Number(s.antal || 0) } };
        });
      },
      spara: function (t, n, o) { return rpc("spara_rost", { p_token: t, p_namn: n || null, p_ordning: o }); },
      radera: function (t) { return rpc("radera_min_rost", { p_token: t }); }
    };
  }

  // Demoläge: några påhittade röster plus den egna, allt i webbläsaren.
  function demoBackend() {
    var KEY = "rangordning_demo_roster";
    function read() {
      var d = null;
      try { d = JSON.parse(store(KEY)); } catch (e) { d = null; }
      if (!d) {
        var rev = forslagOrder.slice().reverse();
        var skift = forslagOrder.slice(2).concat(forslagOrder.slice(0, 2));
        var bytt = forslagOrder.slice(); bytt.splice(0, 2, bytt[1], bytt[0]);
        d = [
          { id: "demo000001", namn: "Demo A", ordning: bytt, andrad: new Date(Date.now() - 3600e3).toISOString() },
          { id: "demo000002", namn: null, ordning: skift, andrad: new Date(Date.now() - 7200e3).toISOString() },
          { id: "demo000003", namn: "Demo C", ordning: rev, andrad: new Date(Date.now() - 9000e3).toISOString() }
        ];
        store(KEY, JSON.stringify(d));
      }
      return d;
    }
    function write(d) { store(KEY, JSON.stringify(d)); }
    return {
      hamta: function () {
        var d = read();
        return Promise.resolve({ votes: d, status: { stangd: false, frist: status.frist, antal: d.length } });
      },
      spara: function (t, n, o) {
        var d = read().filter(function (v) { return v.id !== "demo-jag"; });
        d.push({ id: "demo-jag", namn: n || null, ordning: o, andrad: new Date().toISOString() });
        write(d);
        return Promise.resolve("demo-jag");
      },
      radera: function () {
        write(read().filter(function (v) { return v.id !== "demo-jag"; }));
        return Promise.resolve(null);
      }
    };
  }

  // ---------- Gränssnitt ----------
  var live = el("div", { class: "rg-live", "aria-live": "polite", role: "status" });
  var banner = el("p", { class: "rg-banner", hidden: "" });
  var statusLine = el("p", { class: "rg-status" });
  var nameInput = el("input", { type: "text", id: "rg-namn", maxlength: "40", autocomplete: "off", placeholder: "Frivilligt, lämna tomt för att vara anonym" });
  nameInput.value = namn;
  var nameRow = el("div", { class: "rg-namnrad" }, [
    el("label", { for: "rg-namn", text: "Ditt namn (frivilligt)" }),
    nameInput,
    el("p", { class: "rg-hint", id: "rg-namn-hint", text: "Om du skriver ett namn visas det öppet på sidan, för alla som besöker den. Lämna tomt för att vara anonym." })
  ]);
  nameInput.setAttribute("aria-describedby", "rg-namn-hint");

  var ownList = el("ol", { class: "rg-lista rg-egen", "aria-label": "Din rangordning" });
  var groupList = el("ol", { class: "rg-lista rg-grupp", "aria-label": "Gruppens rangordning" });
  var groupMeta = el("p", { class: "rg-meta" });
  var voters = el("p", { class: "rg-meta" });
  var resetBtn = el("button", { type: "button", class: "button", text: "Återställ min ordning till förslaget" });
  var removeBtn = el("button", { type: "button", class: "button", text: "Ta bort min röst" });
  var actions = el("div", { class: "button-row rg-knappar" }, [resetBtn, removeBtn]);

  var ownBox = el("div", { class: "rg-ruta" }, [
    el("h3", { text: "Din rangordning" }),
    el("p", { class: "rg-hint", text: "Dra en rad, eller använd pilknapparna, för att flytta den. Det du gör räknas in i gruppens ordning direkt." }),
    nameRow, ownList, actions, statusLine
  ]);
  var groupBox = el("div", { class: "rg-ruta rg-ruta--grupp" }, [
    el("h3", { text: "Gruppens rangordning" }),
    groupMeta, groupList, voters
  ]);

  root.appendChild(banner);
  root.appendChild(el("div", { class: "rg-kolumner" }, [ownBox, groupBox]));
  root.appendChild(live);

  // Tabell 6: lägg till kolumnen "Gruppens rang" efter första kolumnen
  var headRow = tabell.querySelector("tr:not([data-id])");
  if (headRow && headRow.cells.length) {
    var th = el("th", { text: "Gruppens rang" });
    headRow.insertBefore(th, headRow.cells[1] || null);
  }
  items.forEach(function (it) {
    it.cell = el("td", { class: "rg-rangcell" });
    it.rad.insertBefore(it.cell, it.rad.cells[1] || null);
  });

  function announce(msg) { live.textContent = ""; setTimeout(function () { live.textContent = msg; }, 30); }

  function render() {
    var closed = !!status.stangd;
    var g = groupRanking();

    banner.hidden = !(DEMO || connection === "fel" || closed);
    if (DEMO) banner.textContent = "Demoläge: ingen databas är ansluten. Rösterna är påhittade och dina ändringar sparas bara i den här webbläsaren.";
    else if (closed) banner.textContent = "Röstningen är stängd" + (status.frist ? " (sista dag " + fmtTid(status.frist) + ")" : "") + ". Tabellen visar den slutliga rangordningen.";
    else if (connection === "fel") banner.textContent = "Det går inte att nå databasen just nu. Din ordning sparas inte, men du kan fortfarande flytta rader för att se hur det ser ut.";
    banner.className = "rg-banner" + (closed || connection === "fel" ? " rg-banner--varning" : "");

    // Din lista
    ownList.textContent = "";
    ownOrder.forEach(function (id, i) {
      var it = byId[id];
      var up = el("button", { type: "button", class: "rg-pil", "aria-label": "Flytta upp: " + it.titel, "data-id": id, "data-dir": "-1", text: "↑" });
      var down = el("button", { type: "button", class: "rg-pil", "aria-label": "Flytta ned: " + it.titel, "data-id": id, "data-dir": "1", text: "↓" });
      if (i === 0) up.disabled = true;
      if (i === ownOrder.length - 1) down.disabled = true;
      if (closed) { up.disabled = true; down.disabled = true; }
      var li = el("li", { class: "rg-rad", draggable: closed ? "false" : "true", "data-id": id }, [
        el("span", { class: "rg-grepp", "aria-hidden": "true", text: "⠿" }),
        el("span", { class: "rg-nr", text: String(i + 1) }),
        el("span", { class: "rg-titel", text: it.titel }),
        up, down
      ]);
      ownList.appendChild(li);
    });
    nameInput.disabled = closed;
    resetBtn.disabled = closed;
    removeBtn.hidden = !harRostat || closed;

    // Gruppens lista
    groupList.textContent = "";
    g.order.forEach(function (id) {
      var it = byId[id];
      var delta = prevRank ? prevRank[id] - g.rank[id] : 0;
      var mark = delta > 0 ? "▲ " + delta : delta < 0 ? "▼ " + (-delta) : "";
      var li = el("li", { class: "rg-rad rg-rad--grupp" + (delta ? " rg-rad--ny" : ""), "data-id": id }, [
        el("span", { class: "rg-nr", text: String(g.rank[id]) }),
        el("span", { class: "rg-titel", text: it.titel }),
        el("span", { class: "rg-medel", text: g.n ? "medelplats " + fmtTal(g.mean[id]) : "förslaget" }),
        el("span", { class: "rg-delta", text: mark, "aria-label": delta > 0 ? "uppåt " + delta + " platser" : delta < 0 ? "nedåt " + (-delta) + " platser" : "" })
      ]);
      groupList.appendChild(li);
    });

    // Tabell 6: ordna om rader och skriv rang
    g.order.forEach(function (id) {
      var it = byId[id];
      it.cell.textContent = String(g.rank[id]);
      tabell.tBodies[0].appendChild(it.rad);
      var delta = prevRank ? prevRank[id] - g.rank[id] : 0;
      it.rad.classList.toggle("rg-tabellrad--ny", !!delta);
    });
    prevRank = g.rank;

    // Metatext
    var senaste = votes.slice().sort(function (a, b) { return new Date(b.andrad) - new Date(a.andrad); })[0];
    var antal = g.n;
    groupMeta.textContent = antal
      ? "Medel av " + antal + (antal === 1 ? " röst" : " röster") + (senaste ? ". Senast ändrad av " + (senaste.namn || "anonym") + " " + fmtTid(senaste.andrad) + "." : ".")
      : "Ingen har röstat än. Tabellen visar förslaget.";
    var namnLista = votes.filter(function (v) { return v.namn; }).map(function (v) { return v.namn; });
    var anonym = votes.length - namnLista.length;
    voters.textContent = votes.length
      ? "Röstat: " + (namnLista.length ? namnLista.join(", ") : "") + (anonym ? (namnLista.length ? " och " : "") + anonym + (anonym === 1 ? " anonym" : " anonyma") : "") + "."
      : "";

    // Status
    var t = "";
    if (saveState === "sparar") t = "Sparar …";
    else if (saveState === "sparat") t = "Sparat " + savedAt + ". Din röst är med i gruppens ordning.";
    else if (saveState === "fel") t = "Kunde inte spara. Försök igen om en stund.";
    else if (!harRostat) t = "Du har inte röstat än. Flytta en rad så räknas din ordning med.";
    else t = "Din röst är med i gruppens ordning.";
    statusLine.textContent = t;
    statusLine.className = "rg-status" + (saveState === "fel" ? " rg-status--fel" : "");

    if (focusAfterRender) {
      var f = ownList.querySelector('button[data-id="' + focusAfterRender.id + '"][data-dir="' + focusAfterRender.dir + '"]');
      if (!f || f.disabled) f = ownList.querySelector('button[data-id="' + focusAfterRender.id + '"]:not(:disabled)');
      if (f) f.focus();
      focusAfterRender = null;
    }
  }

  // ---------- Flytta rader ----------
  function move(id, toIndex, dir) {
    var from = ownOrder.indexOf(id);
    if (from < 0 || toIndex < 0 || toIndex >= ownOrder.length || from === toIndex) return;
    var before = groupRanking().rank[id];
    ownOrder.splice(from, 1);
    ownOrder.splice(toIndex, 0, id);
    harRostat = true;
    store("rangordning_har_rostat", "1");
    store("rangordning_min_ordning", JSON.stringify(ownOrder));
    focusAfterRender = dir ? { id: id, dir: dir } : null;
    var gAfter = groupRanking();
    render();
    markera(id);
    announce("Flyttade " + byId[id].titel + " från plats " + (from + 1) + " till plats " + (toIndex + 1) + " i din ordning. I gruppens ordning ligger den på plats " + gAfter.rank[id] + (before !== gAfter.rank[id] ? " (förut " + before + ")" : "") + ".");
    schemaladSparning();
  }

  function markera(id) {
    [ownList, groupList].forEach(function (l) {
      var li = l.querySelector('li[data-id="' + id + '"]');
      if (li) { li.classList.add("rg-blink"); setTimeout(function () { li.classList.remove("rg-blink"); }, 1400); }
    });
    var tr = byId[id].rad;
    tr.classList.add("rg-blink");
    setTimeout(function () { tr.classList.remove("rg-blink"); }, 1400);
  }

  ownList.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-id]");
    if (!b || b.disabled) return;
    var id = b.getAttribute("data-id");
    var dir = Number(b.getAttribute("data-dir"));
    snapshot();
    move(id, ownOrder.indexOf(id) + dir, String(dir));
  });

  // Dra och släpp
  var dragId = null;
  ownList.addEventListener("dragstart", function (e) {
    var li = e.target.closest("li[data-id]");
    if (!li) return;
    dragId = li.getAttribute("data-id");
    li.classList.add("rg-drar");
    try { e.dataTransfer.setData("text/plain", dragId); e.dataTransfer.effectAllowed = "move"; } catch (x) { /* ok */ }
  });
  ownList.addEventListener("dragover", function (e) {
    if (!dragId) return;
    e.preventDefault();
    var li = e.target.closest("li[data-id]");
    Array.prototype.forEach.call(ownList.children, function (c) { c.classList.remove("rg-over"); });
    if (li) li.classList.add("rg-over");
  });
  ownList.addEventListener("drop", function (e) {
    if (!dragId) return;
    e.preventDefault();
    var li = e.target.closest("li[data-id]");
    if (li) {
      var to = ownOrder.indexOf(li.getAttribute("data-id"));
      snapshot();
      move(dragId, to, null);
    }
    dragId = null;
  });
  ownList.addEventListener("dragend", function () {
    dragId = null;
    Array.prototype.forEach.call(ownList.children, function (c) { c.classList.remove("rg-drar", "rg-over"); });
  });

  // Spara gruppens placering före en ändring, så att render() kan visa vad som flyttats.
  function snapshot() { prevRank = groupRanking().rank; }

  resetBtn.addEventListener("click", function () {
    snapshot();
    ownOrder = forslagOrder.slice();
    store("rangordning_min_ordning", JSON.stringify(ownOrder));
    if (harRostat) schemaladSparning();
    render();
    announce("Din ordning är återställd till förslaget.");
  });

  removeBtn.addEventListener("click", function () {
    if (!window.confirm("Ta bort din röst från gruppens ordning?")) return;
    backend.radera(token).then(function () {
      harRostat = false; myId = null;
      store("rangordning_har_rostat", null); store("rangordning_mitt_id", null);
      saveState = ""; load();
      announce("Din röst är borttagen.");
    }).catch(function () { saveState = "fel"; render(); });
  });

  var nameTimer = null;
  nameInput.addEventListener("input", function () {
    namn = nameInput.value;
    store("rangordning_namn", namn);
    clearTimeout(nameTimer);
    nameTimer = setTimeout(function () { if (harRostat) schemaladSparning(); }, 900);
  });

  // ---------- Spara ----------
  function schemaladSparning() {
    saveState = "sparar";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(spara, SAVE_DELAY_MS);
    renderStatusOnly();
  }

  function renderStatusOnly() { statusLine.textContent = saveState === "sparar" ? "Sparar …" : statusLine.textContent; }

  function spara() {
    backend.spara(token, namn.trim(), ownOrder).then(function (id) {
      if (id) { myId = id; store("rangordning_mitt_id", id); }
      saveState = "sparat";
      savedAt = new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
      connection = "ok";
      return load();
    }).catch(function (err) {
      saveState = "fel";
      if (/stängd/i.test(String(err && err.message))) status.stangd = true;
      render();
    });
  }

  // ---------- Läs ----------
  function load() {
    return backend.hamta().then(function (res) {
      votes = res.votes || [];
      status = res.status || status;
      connection = "ok";
      if (!loadedOnce) { loadedOnce = true; prevRank = null; } // inga pilar vid första laddningen
      if (harRostat && myId && !votes.some(function (v) { return v.id === myId; })) {
        // Min röst finns inte längre i databasen (borttagen); behandla som ej röstat.
        harRostat = false; store("rangordning_har_rostat", null);
      }
      render();
    }).catch(function () {
      connection = "fel";
      render();
    });
  }

  render();
  load();
  setInterval(function () { if (!document.hidden && saveState !== "sparar" && !dragId) load(); }, POLL_MS);
})();
