# Portfolio Website Design

**Date:** 2026-02-22
**Status:** Approved

## Overview

A lightweight professional portfolio website for Susie Rennick. Dark developer aesthetic with a playful rainbow personality that rewards attention — cohesive at first glance, delightful on interaction.

## Decisions

| Aspect | Decision |
|---|---|
| Purpose | Portfolio / project showcase |
| Tech | Pure HTML / CSS / JS — zero dependencies |
| Structure | Multi-page with shared layout |
| Hosting | GitHub Pages (`susierennick.github.io`) |
| Sections | Hero, Projects (card grid), Contact (email + socials) |
| Style | Dark base + rainbow accents |

## Site Structure

```
susierennick.github.io/
├── index.html              # Landing page (hero + project cards + contact)
├── projects/
│   └── {project}.html      # Individual project detail pages
├── css/
│   └── styles.css          # Shared stylesheet
├── js/
│   └── main.js             # Nav toggle, smooth scroll, scroll animations
└── assets/
    └── images/             # Project thumbnails, favicon
```

## Visual Design

### Color Palette

**Base colors:**

| Role | Hex | Usage |
|---|---|---|
| Background | `#0a0a0f` | Deep near-black base |
| Surface | `#141420` | Cards, nav |
| Border | `#1e1e2e` | Subtle dividers |
| Text primary | `#e0e0e6` | Body text |
| Text muted | `#8888a0` | Secondary info |

**Rainbow accent system:**

Dominant accents (used for default/resting states):

| Color | Hex |
|---|---|
| Pink | `#f472b6` |
| Cyan | `#22d3ee` |
| Purple | `#a78bfa` |

Supporting accents (appear on key moments — hero gradient, hover across full grid):

| Color | Hex |
|---|---|
| Blue | `#60a5fa` |
| Green | `#4ade80` |
| Yellow | `#facc15` |
| Orange | `#fb923c` |

**Strategy:** 2-3 dominant colors in resting state. Full rainbow reveals itself on interaction (hero name gradient, hovering across project grid, social icons).

### Typography

| Role | Font | Source |
|---|---|---|
| Headings / Display | Syne | Google Fonts |
| Body | DM Sans | Google Fonts |
| Code / Monospace | JetBrains Mono | Google Fonts |

### Background & Texture

- Faint radial gradient (dark purple/blue center fading to `#0a0a0f`)
- CSS noise/grain overlay via full-page `::after` pseudo-element at low opacity
- Adds depth and atmosphere without images

## Page Designs

### Hero Section

- **Layout:** Asymmetric — name and tagline left-aligned (~60/40 split). Right side has a decorative CSS gradient orb/geometric shape.
- **Name:** Large Syne bold with animated rainbow gradient text (`background-clip: text`, slow color shift)
- **Tagline:** One line in DM Sans beneath the name
- **Scroll prompt:** Subtle down-arrow or "See my work" link
- **Background:** Faint radial gradient with grain overlay

### Projects Section

- **Layout:** Staggered card grid — cards have small vertical offsets via `nth-child` varied `margin-top` to break rigid grid pattern
- **Card design:**
  - Dark surface (`#141420`) with subtle border
  - Project thumbnail at top
  - Title (Syne), description (DM Sans), tech tags (JetBrains Mono pills)
  - "View project" and "Source" links
- **Color:** Dominant accents (pink, cyan, purple) distributed across cards for borders/tags in resting state
- **Hover:** Card's accent color blooms into a border glow — full rainbow reveals as you hover across the grid
- **Animation:** Staggered fade-up on page load / scroll into view

### Contact Section

- **Layout:** Centered, minimal
- **Content:** Heading ("Say hello" or similar), prominent email (monospace, `mailto:` link), social icons row
- **Social icons:** Each in a different rainbow color, subtle scale-up on hover
- **Background:** Slightly lighter radial gradient to visually separate from projects

### Project Detail Pages (`projects/{name}.html`)

- Shared nav + back link to index
- Larger screenshots
- Longer project description
- Tech stack breakdown
- Links to live demo and GitHub repo

## Shared Elements

### Navigation

- Sticky, transparent background
- Gains backdrop-blur + surface color on scroll (via JS scroll listener)
- Name on the left (monospace, small rainbow gradient)
- Section links on the right
- Hamburger menu on mobile

### Scrollbar

- Thin custom scrollbar with rainbow gradient track (CSS `::webkit-scrollbar`)

### Scroll Animations

- `IntersectionObserver` in `main.js` triggers fade-up animations as sections enter viewport
- Project cards stagger in sequentially with `animation-delay`

## Interactions Summary

| Element | Interaction |
|---|---|
| Hero name | Slow animated rainbow gradient shift |
| Nav | Transparent → blurred surface on scroll |
| Project cards | Colored border glow on hover, staggered fade-in |
| Tech tags | Colored monospace pills |
| Social icons | Individual rainbow colors, scale on hover |
| Links | Colored underline slide-in |
| Scrollbar | Rainbow gradient track |

## Non-Goals

- No JavaScript framework
- No build step
- No CMS or blog (for now)
- No contact form — direct email + social links only
