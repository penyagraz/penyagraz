document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("birthDate");

  input.addEventListener("input", () => {
    // Rohtext & Cursor-Pos vor der Formatierung
    const raw      = input.value;
    const cursorIn = input.selectionStart;

    // Alle Nicht-Ziffern entfernen, max 8 Ziffern
    const digits = raw.replace(/\D/g, "").slice(0, 8);

    /* ---------- neue formatierte Ausgabe bauen ---------- */
    let formatted = "";

    if (digits.length >= 1)  formatted += digits.slice(0, 2);
    if (digits.length === 2) formatted += ".";               // Punkt nach Tag

    if (digits.length >= 3)  formatted += "." + digits.slice(2, 4);
    if (digits.length === 4) formatted += ".";               // Punkt nach Monat

    if (digits.length >= 5)  formatted += "." + digits.slice(4);

    /* ---------- Cursor-Position anpassen ---------- */
    // Zähl, wie viele Ziffern VOR dem alten Cursor standen
    const digitsBeforeCursor = raw.slice(0, cursorIn).replace(/\D/g, "").length;

    // Finde die Position im neuen String, an der dieselbe Anzahl Ziffern erreicht ist
    let newCursor = 0, digitCount = 0;
    while (newCursor < formatted.length && digitCount < digitsBeforeCursor) {
      if (/\d/.test(formatted[newCursor])) digitCount++;
      newCursor++;
    }

    input.value = formatted;
    input.setSelectionRange(newCursor, newCursor);
  });
});
