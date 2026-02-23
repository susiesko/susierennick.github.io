# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a lightweight professional portfolio website with a dark developer aesthetic and playful rainbow personality, deployed to GitHub Pages.

**Architecture:** Pure HTML/CSS/JS with no build step. Multi-page site with a shared stylesheet and JS file. `index.html` is a single scrolling page (hero, projects, contact). Project detail pages live in `projects/`. All interactivity is vanilla JS — scroll animations via IntersectionObserver, nav state via scroll listener.

**Tech Stack:** HTML5, CSS3 (custom properties, animations, grid, backdrop-filter), vanilla JavaScript, Google Fonts (Syne, DM Sans, JetBrains Mono). Hosted on GitHub Pages.

**Design doc:** `docs/plans/2026-02-22-portfolio-website-design.md`

---

### Task 1: Project scaffolding and CSS foundation

**Files:**
- Create: `css/styles.css`
- Create: `index.html` (minimal shell only)

**Step 1: Create the directory structure**

```bash
mkdir -p css js assets/images projects
```

**Step 2: Create `css/styles.css` with CSS custom properties, reset, typography, and background**

The stylesheet should include:

```css
/* ── Google Fonts import ── */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;500;600;700;800&display=swap');

/* ── CSS Custom Properties ── */
:root {
  /* Base */
  --bg: #0a0a0f;
  --surface: #141420;
  --border: #1e1e2e;
  --text: #e0e0e6;
  --text-muted: #8888a0;

  /* Dominant rainbow */
  --pink: #f472b6;
  --cyan: #22d3ee;
  --purple: #a78bfa;

  /* Supporting rainbow */
  --blue: #60a5fa;
  --green: #4ade80;
  --yellow: #facc15;
  --orange: #fb923c;

  /* Typography */
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --section-padding: 6rem 2rem;
  --nav-height: 4rem;
}

/* ── Reset ── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--purple) var(--bg);
}

body {
  font-family: var(--font-body);
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
  overflow-x: hidden;
}

/* ── Grain overlay ── */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}

/* ── Webkit scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--pink), var(--purple), var(--cyan), var(--blue), var(--green), var(--yellow), var(--orange));
  border-radius: 3px;
}

/* ── Typography base ── */
h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 700; }
a { color: inherit; text-decoration: none; }
```

**Step 3: Create minimal `index.html` shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Susie Rennick — Developer</title>
  <meta name="description" content="Full-stack developer portfolio">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- Sections will be added in subsequent tasks -->
  <script src="js/main.js"></script>
</body>
</html>
```

**Step 4: Create empty `js/main.js`**

```js
// main.js — shared interactivity
```

**Step 5: Open in browser and verify**

Open `index.html` in browser. Verify: dark background, grain texture visible, rainbow scrollbar visible if page overflows, no console errors.

**Step 6: Commit**

```bash
git add css/styles.css index.html js/main.js
git commit -m "feat: project scaffolding with CSS foundation and design tokens"
```

---

### Task 2: Sticky navigation

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/main.js`

**Step 1: Add nav HTML to `index.html`**

Add inside `<body>`, before the script tag:

```html
<nav class="nav" id="nav">
  <div class="nav__inner">
    <a href="/" class="nav__logo"><span class="mono-rainbow">susie rennick</span></a>
    <button class="nav__toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav__links" id="nav-links">
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>
```

**Step 2: Add nav CSS to `css/styles.css`**

```css
/* ── Navigation ── */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 2rem;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  transition: background 0.3s, backdrop-filter 0.3s;
}

.nav--scrolled {
  background: rgba(20, 20, 32, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav__inner {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__logo {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.mono-rainbow {
  background: linear-gradient(90deg, var(--pink), var(--purple), var(--cyan));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav__links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav__links a {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s;
  position: relative;
}

.nav__links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--pink);
  transition: width 0.3s;
}

.nav__links a:hover { color: var(--text); }
.nav__links a:hover::after { width: 100%; }

/* Hamburger */
.nav__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav__toggle span {
  width: 24px;
  height: 2px;
  background: var(--text);
  transition: transform 0.3s, opacity 0.3s;
}

/* Mobile */
@media (max-width: 768px) {
  .nav__toggle { display: flex; }
  .nav__links {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(20, 20, 32, 0.95);
    backdrop-filter: blur(12px);
    padding: 2rem;
    gap: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
    pointer-events: none;
  }
  .nav__links--open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  .nav__toggle--open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .nav__toggle--open span:nth-child(2) { opacity: 0; }
  .nav__toggle--open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
}
```

**Step 3: Add nav JS to `js/main.js`**

```js
// ── Nav scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 50);
});

// ── Mobile menu toggle ──
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

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
```

**Step 4: Open in browser and verify**

- Nav is transparent at top, gains blur on scroll
- Logo has rainbow gradient text
- Links have underline hover animation
- Mobile: hamburger shows, toggles menu open/close
- No console errors

**Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: add sticky navigation with scroll blur and mobile hamburger"
```

---

### Task 3: Hero section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Step 1: Add hero HTML to `index.html`**

Add after `</nav>`:

```html
<section class="hero" id="hero">
  <div class="hero__content">
    <h1 class="hero__name">Susie Rennick</h1>
    <p class="hero__tagline">Full-stack developer who builds things with care and color.</p>
    <a href="#projects" class="hero__cta">See my work <span class="hero__arrow">↓</span></a>
  </div>
  <div class="hero__orb" aria-hidden="true"></div>
</section>
```

**Step 2: Add hero CSS to `css/styles.css`**

```css
/* ── Hero ── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: var(--section-padding);
  padding-top: calc(var(--nav-height) + 4rem);
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse at 30% 50%, rgba(167, 139, 250, 0.08) 0%, transparent 60%);
}

.hero__content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}

.hero__name {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  background: linear-gradient(135deg, var(--pink), var(--purple), var(--cyan), var(--blue), var(--green), var(--yellow), var(--orange), var(--pink));
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-shift 8s ease-in-out infinite;
}

@keyframes rainbow-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero__tagline {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: var(--text-muted);
  margin-top: 1.5rem;
  max-width: 500px;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--cyan);
  transition: color 0.2s;
}

.hero__cta:hover { color: var(--text); }

.hero__arrow {
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

/* Decorative orb */
.hero__orb {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: clamp(250px, 35vw, 450px);
  height: clamp(250px, 35vw, 450px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(244, 114, 182, 0.15), rgba(167, 139, 250, 0.1), rgba(34, 211, 238, 0.05), transparent 70%);
  filter: blur(60px);
  animation: orb-pulse 6s ease-in-out infinite;
}

@keyframes orb-pulse {
  0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.6; }
  50% { transform: translateY(-50%) scale(1.1); opacity: 1; }
}

@media (max-width: 768px) {
  .hero__orb {
    right: -20%;
    width: 300px;
    height: 300px;
  }
}
```

**Step 3: Open in browser and verify**

- Name has animated rainbow gradient
- Tagline is muted text below
- "See my work ↓" bounces gently
- Decorative orb pulses on the right side
- Responsive on mobile — orb shifts off-screen gracefully

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add hero section with rainbow name gradient and decorative orb"
```

---

### Task 4: Projects section with card grid

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Step 1: Add projects HTML to `index.html`**

Add after `</section>` (hero closing tag):

```html
<section class="projects" id="projects">
  <div class="projects__inner">
    <h2 class="section-heading">Projects</h2>
    <div class="projects__grid">

      <article class="card card--pink reveal">
        <div class="card__image">
          <img src="assets/images/placeholder.svg" alt="Beading Platform screenshot" loading="lazy">
        </div>
        <div class="card__body">
          <h3 class="card__title">Beading Platform</h3>
          <p class="card__desc">Full-stack pattern designer for bead artists with inventory tracking and PDF export.</p>
          <div class="card__tags">
            <span class="tag tag--pink">React</span>
            <span class="tag tag--cyan">TypeScript</span>
            <span class="tag tag--purple">Node.js</span>
          </div>
          <div class="card__links">
            <a href="#" class="card__link">View project →</a>
            <a href="#" class="card__link">Source ↗</a>
          </div>
        </div>
      </article>

      <article class="card card--cyan reveal">
        <div class="card__image">
          <img src="assets/images/placeholder.svg" alt="Project 2 screenshot" loading="lazy">
        </div>
        <div class="card__body">
          <h3 class="card__title">Project Two</h3>
          <p class="card__desc">Short description of the project and what it does.</p>
          <div class="card__tags">
            <span class="tag tag--cyan">React</span>
            <span class="tag tag--purple">Tailwind</span>
          </div>
          <div class="card__links">
            <a href="#" class="card__link">View project →</a>
            <a href="#" class="card__link">Source ↗</a>
          </div>
        </div>
      </article>

      <article class="card card--purple reveal">
        <div class="card__image">
          <img src="assets/images/placeholder.svg" alt="Project 3 screenshot" loading="lazy">
        </div>
        <div class="card__body">
          <h3 class="card__title">Project Three</h3>
          <p class="card__desc">Short description of the project and what it does.</p>
          <div class="card__tags">
            <span class="tag tag--pink">HTML</span>
            <span class="tag tag--cyan">CSS</span>
            <span class="tag tag--purple">JS</span>
          </div>
          <div class="card__links">
            <a href="#" class="card__link">View project →</a>
            <a href="#" class="card__link">Source ↗</a>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>
```

Note: Use placeholder cards. Susie will swap in real project data later. The "View project →" links on the first card can point to `projects/beading-platform.html` once the detail page exists.

**Step 2: Create placeholder SVG at `assets/images/placeholder.svg`**

```svg
<svg width="600" height="340" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="340" fill="#1e1e2e"/>
  <text x="300" y="170" fill="#8888a0" font-family="monospace" font-size="14" text-anchor="middle" dominant-baseline="middle">screenshot</text>
</svg>
```

**Step 3: Add projects and card CSS to `css/styles.css`**

```css
/* ── Section shared ── */
.section-heading {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 3rem;
  color: var(--text);
}

/* ── Projects ── */
.projects {
  padding: var(--section-padding);
  background: radial-gradient(ellipse at 70% 20%, rgba(34, 211, 238, 0.04) 0%, transparent 50%);
}

.projects__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

/* Staggered offsets */
.projects__grid .card:nth-child(2) { margin-top: 2rem; }
.projects__grid .card:nth-child(3n) { margin-top: 1rem; }

/* ── Cards ── */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.card:hover { transform: translateY(-4px); }
.card--pink:hover { border-color: var(--pink); box-shadow: 0 0 30px rgba(244, 114, 182, 0.15); }
.card--cyan:hover { border-color: var(--cyan); box-shadow: 0 0 30px rgba(34, 211, 238, 0.15); }
.card--purple:hover { border-color: var(--purple); box-shadow: 0 0 30px rgba(167, 139, 250, 0.15); }

.card__image {
  aspect-ratio: 16/9;
  overflow: hidden;
  background: var(--bg);
}

.card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__body { padding: 1.5rem; }

.card__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card__desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  border: 1px solid;
}

.tag--pink { color: var(--pink); border-color: rgba(244, 114, 182, 0.3); }
.tag--cyan { color: var(--cyan); border-color: rgba(34, 211, 238, 0.3); }
.tag--purple { color: var(--purple); border-color: rgba(167, 139, 250, 0.3); }

.card__links {
  display: flex;
  gap: 1.5rem;
}

.card__link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.card__link:hover { color: var(--text); }

/* ── Scroll reveal animation ── */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .projects__grid { grid-template-columns: 1fr; }
  .projects__grid .card:nth-child(n) { margin-top: 0; }
}
```

**Step 4: Open in browser and verify**

- Three project cards display in a staggered grid
- Each card has a different colored hover glow (pink, cyan, purple)
- Tech tags have colored borders
- Placeholder images render
- Responsive: single column on mobile, stagger offsets removed

**Step 5: Commit**

```bash
git add index.html css/styles.css assets/images/placeholder.svg
git commit -m "feat: add projects section with staggered card grid and rainbow hover accents"
```

---

### Task 5: Contact section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Step 1: Add contact HTML to `index.html`**

Add after the projects `</section>`:

```html
<section class="contact" id="contact">
  <div class="contact__inner">
    <h2 class="section-heading">Say hello</h2>
    <a href="mailto:susie@example.com" class="contact__email">susie@example.com</a>
    <div class="contact__socials">
      <a href="https://github.com/susierennick" class="social social--pink" aria-label="GitHub" target="_blank" rel="noopener">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>
      <a href="https://linkedin.com/in/susierennick" class="social social--purple" aria-label="LinkedIn" target="_blank" rel="noopener">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="mailto:susie@example.com" class="social social--cyan" aria-label="Email" target="_blank" rel="noopener">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>
      </a>
    </div>
  </div>
</section>

<footer class="footer">
  <p class="footer__text">Built with care and color. © 2026 Susie Rennick</p>
</footer>
```

Note: Replace `susie@example.com` with real email. Replace social URLs with real profiles.

**Step 2: Add contact and footer CSS to `css/styles.css`**

```css
/* ── Contact ── */
.contact {
  padding: var(--section-padding);
  text-align: center;
  background: radial-gradient(ellipse at 50% 80%, rgba(167, 139, 250, 0.06) 0%, transparent 50%);
}

.contact__inner {
  max-width: 600px;
  margin: 0 auto;
}

.contact__email {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: var(--cyan);
  margin-bottom: 2rem;
  position: relative;
  transition: color 0.2s;
}

.contact__email::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--cyan);
  transition: width 0.3s;
}

.contact__email:hover { color: var(--text); }
.contact__email:hover::after { width: 100%; }

.contact__socials {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border);
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.social:hover { transform: scale(1.15); }
.social--pink { color: var(--pink); }
.social--pink:hover { border-color: var(--pink); box-shadow: 0 0 20px rgba(244, 114, 182, 0.2); }
.social--purple { color: var(--purple); }
.social--purple:hover { border-color: var(--purple); box-shadow: 0 0 20px rgba(167, 139, 250, 0.2); }
.social--cyan { color: var(--cyan); }
.social--cyan:hover { border-color: var(--cyan); box-shadow: 0 0 20px rgba(34, 211, 238, 0.2); }

/* ── Footer ── */
.footer {
  padding: 2rem;
  text-align: center;
  border-top: 1px solid var(--border);
}

.footer__text {
  font-size: 0.8rem;
  color: var(--text-muted);
}
```

**Step 3: Open in browser and verify**

- Contact section centered with heading, email, and social icons
- Each social icon is a different rainbow color
- Icons scale up on hover with colored glow
- Email has underline slide-in on hover
- Footer renders at bottom with muted text

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add contact section with rainbow social icons and footer"
```

---

### Task 6: Scroll reveal animations

**Files:**
- Modify: `index.html` (add `reveal` class to hero elements and contact)
- Modify: `js/main.js`

**Step 1: Add `reveal` classes to hero and contact elements in `index.html`**

Add class `reveal` to:
- `.hero__content` → `<div class="hero__content reveal">`
- `.contact__inner` → `<div class="contact__inner reveal">`

The project cards already have `reveal` from Task 4.

**Step 2: Add IntersectionObserver to `js/main.js`**

```js
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
```

**Step 3: Open in browser and verify**

- Hero content fades in on load
- Project cards stagger in as you scroll down
- Contact section fades in on scroll
- Animations only trigger once (unobserved after reveal)

**Step 4: Commit**

```bash
git add index.html js/main.js
git commit -m "feat: add scroll reveal animations with staggered card entrance"
```

---

### Task 7: Project detail page template

**Files:**
- Create: `projects/beading-platform.html`
- Modify: `css/styles.css`
- Modify: `index.html` (update first card's "View project" link)

**Step 1: Create `projects/beading-platform.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beading Platform — Susie Rennick</title>
  <meta name="description" content="Full-stack pattern designer for bead artists">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <nav class="nav" id="nav">
    <div class="nav__inner">
      <a href="/" class="nav__logo"><span class="mono-rainbow">susie rennick</span></a>
      <ul class="nav__links" id="nav-links">
        <li><a href="/#projects">Projects</a></li>
        <li><a href="/#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <article class="project-detail">
    <div class="project-detail__inner">
      <a href="/#projects" class="project-detail__back">← Back to projects</a>
      <h1 class="project-detail__title">Beading Platform</h1>
      <p class="project-detail__subtitle">Full-stack pattern designer for bead artists with inventory tracking and PDF export.</p>

      <div class="project-detail__screenshot">
        <img src="../assets/images/placeholder.svg" alt="Beading Platform screenshot" loading="lazy">
      </div>

      <div class="project-detail__content">
        <h2>About</h2>
        <p>A comprehensive web platform for bead artists. Features include a visual pattern designer for peyote stitch (rectangular and radial grids), personal bead inventory management, a public bead catalog with Miyuki data, and PDF pattern export.</p>

        <h2>Tech Stack</h2>
        <div class="card__tags">
          <span class="tag tag--pink">React</span>
          <span class="tag tag--cyan">TypeScript</span>
          <span class="tag tag--purple">Node.js</span>
          <span class="tag tag--pink">Express</span>
          <span class="tag tag--cyan">PostgreSQL</span>
          <span class="tag tag--purple">Prisma</span>
          <span class="tag tag--pink">Tailwind CSS</span>
          <span class="tag tag--cyan">Konva</span>
        </div>

        <h2>Links</h2>
        <div class="project-detail__links">
          <a href="#" class="card__link">Live demo ↗</a>
          <a href="#" class="card__link">Source code ↗</a>
        </div>
      </div>
    </div>
  </article>

  <footer class="footer">
    <p class="footer__text">Built with care and color. © 2026 Susie Rennick</p>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

**Step 2: Add project detail CSS to `css/styles.css`**

```css
/* ── Project detail ── */
.project-detail {
  padding: var(--section-padding);
  padding-top: calc(var(--nav-height) + 4rem);
}

.project-detail__inner {
  max-width: 800px;
  margin: 0 auto;
}

.project-detail__back {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: color 0.2s;
  display: inline-block;
  margin-bottom: 2rem;
}

.project-detail__back:hover { color: var(--cyan); }

.project-detail__title {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
}

.project-detail__subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  max-width: 600px;
}

.project-detail__screenshot {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
  margin-bottom: 3rem;
}

.project-detail__screenshot img {
  width: 100%;
  display: block;
}

.project-detail__content h2 {
  font-size: 1.3rem;
  margin: 2rem 0 1rem;
  color: var(--text);
}

.project-detail__content p {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.project-detail__content .card__tags {
  margin-bottom: 1rem;
}

.project-detail__links {
  display: flex;
  gap: 1.5rem;
}
```

**Step 3: Update first card link in `index.html`**

Change the first card's "View project" link from `#` to `projects/beading-platform.html`:

```html
<a href="projects/beading-platform.html" class="card__link">View project →</a>
```

**Step 4: Open in browser and verify**

- Navigate to `projects/beading-platform.html` directly
- Nav links point back to `/#projects` and `/#contact`
- "← Back to projects" link works
- Page layout is clean with proper spacing
- Tech tags display with colors
- Click "View project →" on first card from index.html navigates to detail page

**Step 5: Commit**

```bash
git add projects/beading-platform.html css/styles.css index.html
git commit -m "feat: add project detail page template with beading platform example"
```

---

### Task 8: Final polish and GitHub Pages setup

**Files:**
- Create: `.nojekyll` (tells GitHub Pages not to process with Jekyll)
- Create: `CNAME` (optional — only if custom domain)
- Modify: `index.html` (add favicon link, Open Graph meta tags)

**Step 1: Create `.nojekyll`**

```bash
touch .nojekyll
```

Empty file — its presence tells GitHub Pages to serve files as-is.

**Step 2: Add meta tags and favicon to `index.html` `<head>`**

Add after the existing `<meta>` tags:

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌈</text></svg>">
<meta property="og:title" content="Susie Rennick — Developer">
<meta property="og:description" content="Full-stack developer portfolio">
<meta property="og:type" content="website">
<meta property="og:url" content="https://susierennick.github.io">
```

**Step 3: Also add favicon to `projects/beading-platform.html` `<head>`**

Same favicon link as above.

**Step 4: Open in browser and do a full walkthrough**

Verify checklist:
- [ ] Nav: transparent at top, blurred on scroll, mobile hamburger works
- [ ] Hero: rainbow name animation, tagline, bouncing arrow, orb pulses
- [ ] Projects: staggered grid, hover glows in different colors, cards fade in on scroll
- [ ] Contact: email with hover underline, colored social icons with scale
- [ ] Detail page: navigation back to index works, layout is clean
- [ ] Scrollbar: rainbow gradient visible
- [ ] Grain texture: subtle overlay visible
- [ ] No console errors
- [ ] Responsive on mobile

**Step 5: Commit**

```bash
git add .nojekyll index.html projects/beading-platform.html
git commit -m "feat: add GitHub Pages config, favicon, and Open Graph meta tags"
```

**Step 6: Push to GitHub**

```bash
# Create the repo on GitHub first
gh repo create susierennick.github.io --public --source=. --remote=origin
git push -u origin main
```

Then enable GitHub Pages in repo settings (Settings → Pages → Source: main branch, root folder).

---

## Summary

| Task | What it builds |
|---|---|
| 1 | Project scaffolding, CSS foundation, design tokens |
| 2 | Sticky nav with scroll blur and mobile menu |
| 3 | Hero section with rainbow gradient name and orb |
| 4 | Projects section with staggered card grid |
| 5 | Contact section with rainbow social icons |
| 6 | Scroll reveal animations |
| 7 | Project detail page template |
| 8 | GitHub Pages setup, favicon, meta tags, deploy |
