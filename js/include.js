(async function () {
  async function include(selector, url) {
    const mount = document.querySelector(selector);
    if (!mount) return false;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`[include] Failed to load ${url}: ${res.status}`);
      return false;
    }

    mount.innerHTML = await res.text();
    return true;
  }

  // Header
  const headerLoaded = await include("#site-header", "partials/header.html");
  if (headerLoaded && typeof window.initHeader === "function") {
    window.initHeader();
  }

  // Footer (optional)
  await include("#site-footer", "partials/footer.html");

  // ✅ CRITICAL: tell i18n that header/footer exist now
  document.dispatchEvent(new CustomEvent("includes:loaded"));
})();
