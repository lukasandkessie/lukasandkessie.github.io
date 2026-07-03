const WEDDING_DATE = new Date("2026-12-26T16:30:00");

const envelope = document.getElementById("envelope");
const envelopeScreen = document.getElementById("envelope-screen");
const revealEls = document.querySelectorAll(".reveal");

document.body.style.overflow = "hidden";

envelope.addEventListener("click", () => {
  envelope.classList.add("is-opening");

  setTimeout(() => {
    envelopeScreen.classList.add("opened");
    document.body.style.overflow = "";
    revealVisibleItems();
  }, 650);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", link.getAttribute("href"));
  });
});

const daysEl = document.getElementById("cd-days");
const hoursEl = document.getElementById("cd-hours");
const minsEl = document.getElementById("cd-mins");
const secsEl = document.getElementById("cd-secs");

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const diff = Math.max(0, WEDDING_DATE - new Date());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minsEl.textContent = pad(mins);
  secsEl.textContent = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

function revealVisibleItems() {
  revealEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      el.classList.add("is-visible");
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealVisibleItems();
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
}
