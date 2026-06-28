document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const reveals = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-count]");

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.14 });

  reveals.forEach(el => revealObserver.observe(el));

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.count);
    const suffix = counter.textContent.includes("%") ? "%" : "+";
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 55));

    const update = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target + suffix;
      } else {
        counter.textContent = current + suffix;
        requestAnimationFrame(update);
      }
    };
    update();
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
});
