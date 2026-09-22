// Checklistan på checklista.html: kryss sparas bara i den här webbläsaren.
// Ingen server, ingen inloggning. Nyckeln är versionsmärkt så en framtida
// omnumrering av frågorna inte blandar ihop gamla kryss med nya id:n.
var CHECKLISTA_NYCKEL = "samradsguiden-checklista-v1";

function lasKryss() {
  try {
    var sparat = localStorage.getItem(CHECKLISTA_NYCKEL);
    return sparat ? JSON.parse(sparat) : {};
  } catch (fel) {
    return {};
  }
}

function sparaKryss(lage) {
  localStorage.setItem(CHECKLISTA_NYCKEL, JSON.stringify(lage));
}

function allaRutor() {
  return document.querySelectorAll("[data-check]");
}

function uppdateraRaknare() {
  var rutor = allaRutor();
  var markerade = 0;
  for (var i = 0; i < rutor.length; i += 1) {
    if (rutor[i].checked) markerade += 1;
  }
  var el = document.getElementById("check-progress");
  if (el) el.textContent = markerade + " av " + rutor.length + " markerade";
}

function kopplaChecklista() {
  var lage = lasKryss();
  var rutor = allaRutor();
  for (var i = 0; i < rutor.length; i += 1) {
    var ruta = rutor[i];
    ruta.checked = Boolean(lage[ruta.id]);
    ruta.addEventListener("change", function () {
      var nasta = lasKryss();
      if (this.checked) nasta[this.id] = true;
      else delete nasta[this.id];
      sparaKryss(nasta);
      uppdateraRaknare();
    });
  }

  var rensa = document.getElementById("check-clear");
  if (rensa) {
    rensa.addEventListener("click", function () {
      localStorage.removeItem(CHECKLISTA_NYCKEL);
      var tomma = allaRutor();
      for (var j = 0; j < tomma.length; j += 1) tomma[j].checked = false;
      uppdateraRaknare();
    });
  }

  uppdateraRaknare();
}

kopplaChecklista();
