# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio/blog website hosted on GitHub Pages at https://thealiflab.github.io/. No build system, bundler, or package manager — pure HTML, CSS, and vanilla JavaScript. Deploy by pushing to the `main` branch.

## Development

Open files directly in a browser. For live reloading, use any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

There are no linting, test, or build commands.

## Architecture

### Directory layout

- `index.html` — single-page portfolio (all sections: home, about, skills, projects, contact)
- `blog/` — blog index (`index.html`) plus one HTML file per article
- `projects/` — projects sub-page and app-specific pages (e.g. `coronaalert.html`)
- `assets/css/` — custom stylesheets (`styles.css`, `responsive.css`)
- `assets/js/` — third-party scripts bundled locally (custom-scripts.js, particles.js, etc.)
- `assets/myjs/` — custom first-party scripts (see below)
- `assets/plugins/` — vendored CSS/JS (Bootstrap, Owl Carousel, Fancybox)
- `assets/images/` — all images and favicon variants

### Custom JS (`assets/myjs/`)

| File | Purpose |
|---|---|
| `constant.js` | Defines `HOME_PAGE_URL` constant (`https://thealiflab.github.io/`) |
| `pkey.js` | Password prompt on `window.onload`; redirects to `HOME_PAGE_URL` (the variable, not a string) on wrong password |
| `submitform.js` | Intercepts the `#contactForm` submit, POSTs to Formspree via `fetch`, shows `#resultMessage` on success |

### Asset path convention

- Root-level `index.html` uses paths like `assets/...`
- Files inside `blog/` use `../assets/...` for all assets
- `pkey.js` and `constant.js` must be loaded (in that order: constant first, then pkey) from `../assets/myjs/` in blog pages

### Contact form

`index.html` form posts to `https://formspree.io/f/mgvewpgv`. The `submitform.js` handler reads `form.action` dynamically, so the endpoint is set on the `<form>` tag, not hardcoded in JS.

### Particles.js

Background particle animation on the main hero section is driven by `assets/js/particles.js` and configured inline in `index.html` via `particlesJS(...)`.
