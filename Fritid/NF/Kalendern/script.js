document.addEventListener("DOMContentLoaded", () => {
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
});
