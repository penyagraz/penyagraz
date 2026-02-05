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

  // 1) Header: keep your original functionality
  const headerLoaded = await include("#site-header", "partials/header.html");

  // Important: initHeader after header is injected (same as before)
  if (headerLoaded && typeof window.initHeader === "function") {
    window.initHeader();
  }

  // 2) Optional footer support (won't do anything if #site-footer doesn't exist)
  await include("#site-footer", "partials/footer.html");
})();
