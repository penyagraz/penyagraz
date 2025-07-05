// scripts/menu-toggle.js
const hamburger = document.querySelector('.hamburger');
const navCenter = document.querySelector('.navbar-center');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navCenter.classList.toggle('open');
});
