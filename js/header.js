function initHeader() {
  const toggleBtn = document.getElementById("menuToggle");
  const overlay   = document.getElementById("overlay");
  const offcanvas = document.getElementById("offcanvas");

  if (!toggleBtn || !overlay || !offcanvas) return;

  const openMenu = () => {
    offcanvas.hidden = false;
    overlay.hidden = false;
    requestAnimationFrame(() => offcanvas.classList.add("is-open"));
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    offcanvas.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    setTimeout(() => {
      offcanvas.hidden = true;
      overlay.hidden = true;
    }, 200);
  };

  toggleBtn.addEventListener("click", () => {
    toggleBtn.getAttribute("aria-expanded") === "true"
      ? closeMenu()
      : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  window.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });
}

window.initHeader = initHeader;
