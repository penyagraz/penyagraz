// js/intro-control.js

// Prüfen, ob URL den Parameter ?nointro=1 hat
if (window.location.search.includes("nointro=1")) {
  // Intro-Element direkt entfernen
  const intro = document.querySelector('.intro');
  if (intro) {
    intro.style.display = 'none';
  }
}
