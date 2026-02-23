// ── Nav scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 50);
});

// ── Mobile menu toggle ──
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('nav__toggle--open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Scroll reveal ──
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger cards in the project grid
      const delay = entry.target.closest('.projects__grid')
        ? index * 150
        : 0;
      setTimeout(() => {
        entry.target.classList.add('reveal--visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
