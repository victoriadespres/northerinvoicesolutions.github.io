// Northern Invoice Solutions Website V2

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-links");
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });

      if (nav) {
        nav.classList.remove("open");
      }
    });
  });

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader);

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  const form = document.querySelector(".contact-card");

  if (form) {
    form.addEventListener("submit", (event) => {
      const email = form.querySelector('input[type="email"]');
      const message = form.querySelector("textarea");

      if (email && !email.value.trim()) {
        event.preventDefault();
        alert("Please enter your email address.");
        email.focus();
        return;
      }

      if (message && !message.value.trim()) {
        event.preventDefault();
        alert("Please tell me a little about your billing needs.");
        message.focus();
      }
    });
  }
});
