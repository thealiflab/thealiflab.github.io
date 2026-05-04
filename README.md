# TheAlifLab — Personal Portfolio

Personal portfolio and blog website for Ahmed Alif Swopno, hosted on GitHub Pages.

**Live site:** https://thealiflab.github.io/

---

## Overview

A fully static single-page portfolio built with plain HTML, CSS, and vanilla JavaScript — no build system, no bundler, no package manager. Deployed automatically by pushing to the `main` branch on GitHub Pages.

---

## Sections

| Section | Description |
|---|---|
| **Home** | Hero with typing role animation, location line, CTA buttons, and fun stats widget |
| **About** | Bio and tabbed Skills & Tech Stack (Languages, ML & Data, Frameworks, Cloud, Databases, Tools) |
| **Experiences** | Professional Development timeline — work, education, and achievement entries |
| **Projects** | Filterable project card grid with show more/less and detail modals |
| **My AI Stack** | Visual pyramid of 39 AI tools across 6 tiers, with per-tool modals |
| **Certificates** | Scrollable carousel of awards and certificates |
| **Contact** | Contact form (Formspree) and social links |

---

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no framework
- **Bootstrap 4** — grid and carousel
- **Font Awesome 6.7.2** — icons
- **Particles.js** — hero background particle animation
- **WOW.js + Animate.css** — scroll-triggered entrance animations
- **Formspree** — contact form backend

---

## Project Structure

```
thealiflab.github.io/
├── index.html              # Single-page portfolio (all sections)
├── blog/                   # Blog index and individual article pages
├── projects/               # Project sub-pages (e.g. coronaalert.html)
├── assets/
│   ├── css/
│   │   ├── styles.css      # Primary custom stylesheet
│   │   └── responsive.css  # Responsive / breakpoint overrides
│   ├── js/                 # Third-party scripts (particles.js, custom-scripts.js, etc.)
│   ├── myjs/               # First-party scripts (see below)
│   ├── plugins/            # Vendored CSS/JS (Bootstrap, Owl Carousel, Fancybox)
│   └── images/             # Images and favicon variants
```

### Custom Scripts (`assets/myjs/`)

| File | Purpose |
|---|---|
| `theme-toggle.js` | Light / dark mode toggle — syncs icon, applies `dark-mode` class, persists to `localStorage` |
| `hero-typer.js` | Typing animation for role titles in the hero section |
| `hero-stats.js` | Count-up animation for the fun stats widget (IntersectionObserver) |
| `projects.js` | Project grid filtering and show more / less logic |
| `genai.js` | Renders the AI stack pyramid and tool modals from a data array |
| `submitform.js` | Intercepts `#contactForm` submit, POSTs to Formspree via `fetch` |
| `constant.js` | Defines `HOME_PAGE_URL` constant |
| `pkey.js` | Password prompt on protected pages; redirects on wrong password |

---

## Development

No install step required. Open `index.html` directly in a browser, or use any static file server for live reloading:

```bash
python3 -m http.server 8080
# or
npx serve .
```

There are no linting, test, or build commands.

---

## Deployment

Push to the `main` branch. GitHub Pages serves the site automatically from the repository root.

---

## Dark Mode

A sun/moon toggle button is fixed in the top-right corner. Clicking it adds/removes the `dark-mode` class on `<body>` and saves the preference to `localStorage` so it persists across visits.

Implementation notes:
- An inline `<script>` immediately after the `<body>` tag restores the saved class before any paint, preventing a flash of the wrong theme.
- All dark mode overrides live at the bottom of `styles.css` under the `/* DARK MODE */` comment block, scoped to `body.dark-mode`.
- The existing `white-vertion` class stays on `<body>` at all times; dark mode rules use higher specificity (`body.dark-mode.white-vertion`) to override the light theme defaults.

---

## Asset Path Convention

- `index.html` (root) — uses `assets/...`
- Files inside `blog/` — use `../assets/...`
- `constant.js` must be loaded before `pkey.js` on blog/protected pages
