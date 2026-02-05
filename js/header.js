(function () {
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

    window.setTimeout(() => {
      offcanvas.hidden = true;
      overlay.hidden = true;
    }, 200);
  };

  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

  // ✅ Only close when clicking outside (overlay)
  overlay.addEventListener("click", closeMenu);

  // (Optional) ESC close — remove if you want STRICTLY outside click only
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });
})();
