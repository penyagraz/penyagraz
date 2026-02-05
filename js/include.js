(async function () {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  const res = await fetch("partials/header.html", { cache: "no-store" });
  mount.innerHTML = await res.text();

  if (typeof window.initHeader === "function") {
    window.initHeader();
  }
})();
