//header.js

(function () {
  const toggleBtn = document.getElementById("menuToggle");
  const closeBtn  = document.getElementById("menuClose");
  const overlay   = document.getElementById("overlay");
  const offcanvas = document.getElementById("offcanvas");

  if (!toggleBtn || !overlay || !offcanvas) return;

  const openMenu = () => {
    offcanvas.hidden = false;
    overlay.hidden = false;

    // let browser apply hidden=false before transition
    requestAnimationFrame(() => offcanvas.classList.add("is-open"));

    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    offcanvas.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    window.setTimeout(() => {
      offcanvas.hidden = true;
      overlay.hidden = true;
    }, 200);
  };

  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);
  closeBtn?.addEventListener("click", closeMenu);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });
})();