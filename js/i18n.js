// Placeholder for later.
// Plan: read data/i18n.de.json or data/i18n.en.json and replace elements with [data-i18n="key"].

async function loadJson(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return await res.json();
}

// Not enabled yet — we’ll wire it when you add language toggle in header.
// document.addEventListener("DOMContentLoaded", async () => {
//   const lang = document.documentElement.getAttribute("data-lang") || "de";
//   const dict = await loadJson(`data/i18n.${lang}.json`);
// });
