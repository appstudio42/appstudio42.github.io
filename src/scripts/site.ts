/**
 * Progressive enhancement: sticky header, mobile menu, theme toggle,
 * and reveal-on-scroll. No framework, no third-party code.
 */

const header = document.querySelector<HTMLElement>("[data-header]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const menuToggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const themeToggle = document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]");

function setScrolled() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  menu?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  document.documentElement.classList.remove("menu-open");
}

function openMenu() {
  menu?.classList.add("is-open");
  menuToggle?.setAttribute("aria-expanded", "true");
  document.documentElement.classList.add("menu-open");
}

menuToggle?.addEventListener("click", () => {
  if (menu?.classList.contains("is-open")) closeMenu();
  else openMenu();
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", setScrolled, { passive: true });
setScrolled();

function currentTheme(): "light" | "dark" {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("as42-theme", theme);
  } catch (_) {
    /* private mode */
  }
  themeToggle.forEach((button) => {
    const next = theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", button.dataset[`label${next[0].toUpperCase()}${next.slice(1)}`] ?? next);
    button.dataset.theme = theme;
  });
}

themeToggle.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
  });
});

applyTheme(currentTheme());

const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
if ("IntersectionObserver" in window && revealNodes.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}
