// Teknikmodal för Skryllerådet-sidan.
function kopplaTeknikModal() {
  const knapp = document.getElementById("techBtn");
  const modal = document.getElementById("techModal");
  const stang = document.getElementById("techClose");
  if (!knapp || !modal || !stang) return;

  const openModal = () => {
    modal.classList.add("show");
    stang.focus();
  };
  const closeModal = () => {
    modal.classList.remove("show");
    knapp.focus();
  };

  knapp.addEventListener("click", openModal);
  stang.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", kopplaTeknikModal);
