const progressBar = document.querySelector("#scroll-progress-bar");
const revealSections = document.querySelectorAll("[data-reveal]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeRoot = document.documentElement;
const savedTheme = localStorage.getItem("portfolio-theme");

const applyTheme = (theme) => {
  themeRoot.dataset.theme = theme;
  themeToggle.setAttribute("aria-checked", String(theme === "dark"));
};

applyTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const nextTheme = themeRoot.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.transform = `scaleX(${progress})`;
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
  revealSections.forEach((section) => section.classList.add("is-visible"));
} else {
  document.documentElement.classList.add("has-scroll-reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });

  revealSections.forEach((section) => revealObserver.observe(section));
}