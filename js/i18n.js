const I18N = { current: "de", dict: {} };

let LAST_DROPDOWN_LANG = null;


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

// Sync UI controls:
// - If lang is de/en => highlight button, dropdown shows "More"
// - If lang is from dropdown => no button active, dropdown shows that language
function syncLanguageControls(lang) {
  const buttons = document.querySelectorAll(".lang__btn[data-lang]");
  const moreSelect = document.getElementById("langMore") || document.querySelector(".lang__more");

  buttons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  if (!moreSelect) return;

  const isPrimary = (lang === "de" || lang === "en");

  if (isPrimary) {
    // show placeholder
    moreSelect.value = "more";
    return;
  }

  // otherwise show the chosen dropdown language
  const hasOption = Array.from(moreSelect.options).some((o) => o.value === lang);
  moreSelect.value = hasOption ? lang : "more";
}



async function setLanguage(lang) {
  // allow ANY lang suffix: de, en, catalan, spanish, french, ...
  const next = (lang || "de").trim();

  try {
    I18N.current = next;
    localStorage.setItem("lang", I18N.current);

    I18N.dict = await loadDict(I18N.current);
    applyTranslations();
    syncLanguageControls(I18N.current);
  } catch (err) {
    console.warn(`[i18n] Failed to load "${next}", falling back to "de".`, err);

    I18N.current = "de";
    localStorage.setItem("lang", "de");

    try {
      I18N.dict = await loadDict("de");
      applyTranslations();
      syncLanguageControls("de");
    } catch (err2) {
      console.error("[i18n] Failed to load fallback language 'de' too.", err2);
    }
  }
}

function bindLanguageButtons() {
  document.querySelectorAll(".lang__btn[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
}

function bindMoreDropdown() {
  const moreSelect = document.getElementById("langMore") || document.querySelector(".lang__more");
  if (!moreSelect) return;

  moreSelect.addEventListener("change", () => {
    const val = moreSelect.value;
    if (!val || val === "more") return; // "more" can't be chosen anyway, but safe
    setLanguage(val);
  });
}



async function initI18n() {
  const saved = localStorage.getItem("lang");
  const initial = saved ? saved : "de";

  I18N.current = initial;
  I18N.dict = await loadDict(initial);

  applyTranslations();
  bindLanguageButtons();
  bindMoreDropdown();
  syncLanguageControls(initial);
}

document.addEventListener("includes:loaded", () => {
  initI18n().catch((err) => {
    console.error("[i18n] init failed:", err);
    // last-resort fallback
    setLanguage("de");
  });
});
