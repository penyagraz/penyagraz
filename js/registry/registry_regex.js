/* registry_regex.js  (Version 3)
 * - zeigt Fehlermeldung erst nach erster Benutzung des Feldes
 * - aktualisierte Regeln (kein Check für fcbCode, Leerzeichen in phone ok)
 */

document.addEventListener("DOMContentLoaded", () => {
  const form        = document.getElementById("membership-form");
  const generateBtn = document.getElementById("generate-pdf-btn");

  /* ---------- Prüfregeln ---------- */
  const patterns = {
    firstName : /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/,
    lastName  : /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/,
    birthDate : /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/,
    idNumber  : /.+/,                           // darf nicht leer sein
    address   : /^.{5,}$/,
    email     : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone     : /^\+?[\d\s]{7,20}$/            // Ziffern + Leerzeichen
  };

  /* ---------- Meldungs-Element ---------- */
  function ensureMsg(el) {
    if (el.previousElementSibling?.classList.contains("error-msg")) {
      return el.previousElementSibling;
    }
    const span = document.createElement("span");
    span.className   = "error-msg";
    span.textContent = "Fehlerhafte Eingabe";
    span.style.cssText = "color:#A50044;font-size:0.8em;display:none;";
    el.parentNode.insertBefore(span, el);
    return span;
  }

  /* ---------- Feld prüfen ---------- */
  function validate(el, showMsg = true) {
    const id  = el.id;
    const msg = ensureMsg(el);
    if (!patterns[id]) { msg.style.display = "none"; return true; }

    const val = id === "phone" ? el.value.replace(/\s/g, "") : el.value.trim();
    const ok  = patterns[id].test(val);

    if (showMsg && el.dataset.touched === "true") {
      msg.style.display = ok ? "none" : "block";
    }
    return ok;
  }

  /* ---------- Button aktivieren/deaktivieren ---------- */
  function toggleButton() {
    const invalid = [...form.querySelectorAll("input, select")].some(el => !validate(el, false));
    const disable = invalid;
    generateBtn.style.pointerEvents = disable ? "none" : "auto";
    generateBtn.style.opacity       = disable ? "0.5"  : "1";
  }

  /* ---------- Events ---------- */
  form.querySelectorAll("input, select").forEach(el => {
    // Markiere das Feld als 'benutzt', sobald der User interagiert
    el.addEventListener("input", () => {
      el.dataset.touched = "true";
      validate(el);
      toggleButton();
    });
    el.addEventListener("blur", () => {
      el.dataset.touched = "true";
      validate(el);
      toggleButton();
    });
  });

  toggleButton(); // initial -> Button gesperrt bis Pflichtfelder ausgefüllt
});
