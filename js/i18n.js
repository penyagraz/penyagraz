const I18N = { current: "de", dict: {} };

function getByPath(obj, path) {
  return path.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), obj);
}

async function loadDict(lang) {
  const res = await fetch(`data/i18n.${lang}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load data/i18n.${lang}.json`);
  return await res.json();
}

function applyTranslations() {
  document.documentElement.lang = I18N.current;
  document.documentElement.setAttribute("data-lang", I18N.current);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = getByPath(I18N.dict, key);
    if (value == null) return;

    if (el.hasAttribute("data-i18n-html")) el.innerHTML = value;
    else el.textContent = value;
  });
}

function setActiveFlag(lang) {
  document.querySelectorAll(".lang__btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });
}

async function setLanguage(lang) {
  I18N.current = lang === "en" ? "en" : "de";
  localStorage.setItem("lang", I18N.current);

  I18N.dict = await loadDict(I18N.current);
  applyTranslations();
  setActiveFlag(I18N.current);
}

function bindLanguageButtons() {
  document.querySelectorAll(".lang__btn[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
}

async function initI18n() {
  const saved = localStorage.getItem("lang");
  const lang = saved === "en" ? "en" : "de";

  I18N.current = lang;
  I18N.dict = await loadDict(lang);

  applyTranslations();
  bindLanguageButtons();
  setActiveFlag(lang);
}

document.addEventListener("includes:loaded", () => {
  initI18n().catch(console.error);
});
