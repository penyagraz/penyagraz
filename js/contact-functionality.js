document.addEventListener("DOMContentLoaded", () => {
  function showTempInfo(id, iconId = null) {
    const el = document.getElementById(id);
    el.classList.add("show");
    /*if (iconId === "phone-icon") {
      const phone = document.getElementById("phone-icon");
      phone.classList.add("vibrate");
      setTimeout(() => phone.classList.remove("vibrate"), 900);
    }*/
    setTimeout(() => el.classList.remove("show"), 7000);
  }

  function copyToClipboard(text, iconElement) {
    navigator.clipboard.writeText(text).then(() => {
      if (iconElement) {
        iconElement.classList.remove("fa-copy");
        iconElement.classList.add("fa-check");
        setTimeout(() => {
          iconElement.classList.remove("fa-check");
          iconElement.classList.add("fa-copy");
        }, 1500);
      }
    });
  }

  document.getElementById("email-icon").addEventListener("click", () => {
    showTempInfo("email-display", "email-icon");
  });

  document.getElementById("phone-icon").addEventListener("click", () => {
    showTempInfo("phone-display", "phone-icon");
  });

  document.querySelectorAll(".copy-icon").forEach(icon => {
    icon.addEventListener("click", (e) => {
      const text = icon.previousElementSibling.textContent;
      copyToClipboard(text, icon);
    });
  });
});
