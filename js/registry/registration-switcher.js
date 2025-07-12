document.addEventListener("DOMContentLoaded", () => {
  const tabGenerate = document.getElementById("tab-generate");
  const tabBlank = document.getElementById("tab-blank");
  const sectionGenerate = document.getElementById("section-generate");
  const sectionBlank = document.getElementById("section-blank");

  tabGenerate.addEventListener("click", () => {
    tabGenerate.classList.add("active");
    tabBlank.classList.remove("active");
    sectionGenerate.classList.add("active");
    sectionBlank.classList.remove("active");
  });

  tabBlank.addEventListener("click", () => {
    tabBlank.classList.add("active");
    tabGenerate.classList.remove("active");
    sectionBlank.classList.add("active");
    sectionGenerate.classList.remove("active");
  });
});
