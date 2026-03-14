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

const skillTooltipTriggers = document.querySelectorAll(".skill[data-tooltip]");

if (skillTooltipTriggers.length) {
  const tooltip = document.createElement("div");
  const tooltipId = "skill-tooltip";
  let activeTrigger = null;

  tooltip.className = "skill-tooltip";
  tooltip.id = tooltipId;
  tooltip.setAttribute("role", "tooltip");
  document.body.appendChild(tooltip);

  function positionTooltip(clientX, clientY) {
    const offset = 18;
    const viewportPadding = 16;
    const rect = tooltip.getBoundingClientRect();
    let left = clientX + offset;
    let top = clientY + offset;

    if (left + rect.width > window.innerWidth - viewportPadding) {
      left = clientX - rect.width - offset;
    }

    if (top + rect.height > window.innerHeight - viewportPadding) {
      top = window.innerHeight - rect.height - viewportPadding;
    }

    tooltip.style.left = `${Math.max(viewportPadding, left)}px`;
    tooltip.style.top = `${Math.max(viewportPadding, top)}px`;
  }

  function showTooltip(trigger, position) {
    const triggerRect = trigger.getBoundingClientRect();
    const clientX = position?.clientX ?? triggerRect.left + triggerRect.width / 2;
    const clientY = position?.clientY ?? triggerRect.bottom;

    tooltip.textContent = trigger.dataset.tooltip;
    tooltip.classList.add("is-visible");
    trigger.setAttribute("aria-describedby", tooltipId);
    activeTrigger = trigger;

    requestAnimationFrame(() => {
      positionTooltip(clientX, clientY);
    });
  }

  function hideTooltip(trigger) {
    if (trigger) {
      trigger.removeAttribute("aria-describedby");
    }

    if (!trigger || activeTrigger === trigger) {
      tooltip.classList.remove("is-visible");
      activeTrigger = null;
    }
  }

  skillTooltipTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", (event) => {
      showTooltip(trigger, event);
    });

    trigger.addEventListener("mousemove", (event) => {
      if (activeTrigger === trigger) {
        positionTooltip(event.clientX, event.clientY);
      }
    });

    trigger.addEventListener("mouseleave", () => {
      hideTooltip(trigger);
    });

    trigger.addEventListener("focus", () => {
      showTooltip(trigger);
    });

    trigger.addEventListener("blur", () => {
      hideTooltip(trigger);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeTrigger) {
      activeTrigger.blur();
      hideTooltip(activeTrigger);
    }
  });

  window.addEventListener("scroll", () => hideTooltip(activeTrigger), true);
  window.addEventListener("resize", () => hideTooltip(activeTrigger));
}

loadTheme();
