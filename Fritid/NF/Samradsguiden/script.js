document.querySelectorAll("[data-accordion] button").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.querySelector(".accordion__toggle").textContent = expanded ? "+" : "–";
    panel.hidden = expanded;
  });
});

const techButton = document.querySelector(".tech-button");
const techDialog = document.querySelector("#tech-dialog");
const closeTechDialog = document.querySelector(".dialog__close");

techButton.addEventListener("click", () => {
  techDialog.showModal();
  techButton.setAttribute("aria-expanded", "true");
  closeTechDialog.focus();
});

techDialog.addEventListener("close", () => {
  techButton.setAttribute("aria-expanded", "false");
  techButton.focus();
});

closeTechDialog.addEventListener("click", () => techDialog.close());

// Svepnavigering (mobil) mellan index.html och fordjupning.html.
// Höger = tillbaka (fordjupning → index), vänster = framåt (index → fordjupning).
(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  const SWIPE_TARGETS = {
    "index.html": { left: "fordjupning.html" },
    "": { left: "fordjupning.html" },
    "fordjupning.html": { right: "index.html" }
  };
  const targets = SWIPE_TARGETS[page];
  if (!targets) return;

  const THRESHOLD = 70;
  const MAX_OFF_AXIS = 60;
  const MAX_DURATION = 600;
  let startX = 0;
  let startY = 0;
  let startTime = 0;

  document.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) { startTime = 0; return; }
    if (document.querySelector("dialog[open]")) { startTime = 0; return; }
    const scrollable = e.target.closest(".table-scroll, pre");
    if (scrollable && scrollable.scrollWidth > scrollable.clientWidth) { startTime = 0; return; }
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    if (!startTime) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    const dt = Date.now() - startTime;
    startTime = 0;
    if (dt > MAX_DURATION || Math.abs(dy) > MAX_OFF_AXIS || Math.abs(dx) < THRESHOLD) return;
    if (dx < 0 && targets.left) window.location.href = targets.left;
    else if (dx > 0 && targets.right) window.location.href = targets.right;
  }, { passive: true });
})();
