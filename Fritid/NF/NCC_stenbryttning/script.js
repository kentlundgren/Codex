document.querySelectorAll("[data-accordion] button").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.querySelector("span").textContent = expanded ? "+" : "–";
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
