document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("[data-count]");

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.count);
    const suffix = counter.textContent.includes("%") ? "%" : "+";
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 50));

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

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
});
