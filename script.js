// Northern Invoice Solutions v2
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.nav-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      if (nav) {
        nav.classList.remove('open');
      }
    });
  });

  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
});
