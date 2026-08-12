const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const techTrigger = document.querySelector('.tech-trigger');
const techModal = document.querySelector('#tech-modal');
const closeModal = document.querySelector('.modal-close');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
techTrigger?.addEventListener('click', () => techModal.showModal());
closeModal?.addEventListener('click', () => techModal.close());
techModal?.addEventListener('click', (event) => {
  const bounds = techModal.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) techModal.close();
});
techModal?.addEventListener('close', () => techTrigger?.focus());
