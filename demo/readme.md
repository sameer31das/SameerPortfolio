# Sameer Kumar Das — Portfolio

Animated single-page portfolio. Plain HTML, CSS and JavaScript with GSAP + ScrollTrigger (vendored in `assets/vendor`, no build step, no npm install).

## Run locally

```sh
node server.js
```

Open http://localhost:5500. Use `?intro` to replay the terminal boot intro (it shows once per browser session) or `?nointro` to skip it.

## Edit content

All text lives in [js/data.js](js/data.js): profile, roles, stats, section headings, experience, skills, AI practices, projects, certifications, education and accomplishments. Change it there; no HTML edits needed.

**Photo:** put the image at `assets/photo.jpg` (portrait, roughly 4:5) and set `photo: 'assets/photo.jpg'` in `profile`. Until then the About section shows an "SD" monogram.

**Resume:** replace `assets/Sameer_Kumar_Das_Resume.pdf`.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page shell: intro, nav, hero and empty section containers |
| `css/tokens.css` | Colours (dark + light theme), fonts, spacing |
| `css/base.css` | Reset, buttons, utilities |
| `css/sections.css` | Styles for every section |
| `js/render.js` | Builds each section's HTML from `data.js` |
| `js/animations.js` | Hero entrance timeline and all scroll scenes |
| `js/effects.js` | Typewriter, counters, magnetic buttons, tilt, text scramble, spotlight, cursor ring |
| `js/particles.js` | Hero particle network (canvas) |
| `js/intro.js` | Terminal boot sequence |
| `js/main.js` | Boot: theme, nav, filters, copy-email, wiring |

Everything stays readable without JavaScript animation: reduced-motion users get the full content with no movement, and if GSAP fails to load, a failsafe reveals the page after 4 s.
