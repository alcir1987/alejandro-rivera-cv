const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const themeToggle = document.querySelector(".theme-toggle");
const html = document.documentElement;

function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    html.setAttribute("data-theme", saved);
    updateThemeButton(saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    html.setAttribute("data-theme", "dark");
    updateThemeButton("dark");
  }
}

function updateThemeButton(theme) {
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeButton(next);
  });
}

const yearSpan = document.querySelector("[data-year]");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

loadTheme();
