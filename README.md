# SkillSprint Academy

A portfolio sample of an online learning platform, built with pure HTML, CSS, and vanilla JavaScript — no build step, no external fonts, images, or APIs, so it works fully offline.

> **Sample / demo only.** All courses, prices, and content on this site are sample content created for a portfolio demonstration. There are no real enrolments, no real payments, no real instructors with claimed credentials, and no student statistics or testimonials. The checkout flow is a demo confirmation only.

## What it includes

- **Course catalogue** — 8 sample courses across 4 categories: Web Development, AI & Data, Design, and Business.
- **Search + category filters** — search by course title or topic, and filter by category.
- **Course cards** — each card shows level, duration, number of lessons, and price in PKR.
- **Enrolment cart (demo)** — add courses, remove them, see the running total, and check out to a demo confirmation. No payment is taken.
- **Progress tracker (demo)** — mark sample lessons complete in the "Web Development Sprint" track. Progress is saved in your browser's `localStorage`, so it survives a reload on the same device and browser. No account or server is involved.
- **Responsive design** — the layout adapts to mobile and desktop screens.
- **Offline-friendly styling** — CSS gradients and inline SVG only; nothing is loaded from the internet.

## How to run locally

Option 1 — just open the file:

```bash
# Open index.html in any modern browser.
```

Option 2 — serve it locally (recommended, so relative paths behave exactly like a hosted site):

```bash
cd skillsprint-academy
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## How to deploy on GitHub Pages

1. Create a new GitHub repository (for example, `skillsprint-academy`) and push these files to its `main` branch:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
2. On GitHub, open the repository → **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the `main` branch and the `/ (root)` folder, then save.
4. Wait a minute or two, then open the published URL GitHub shows you (for example, `https://Samroze-24.github.io/skillsprint-academy/`).

Because the site is static and has no build step, no extra configuration is needed.

## Project structure

```text
skillsprint-academy/
├── index.html   # Page structure and sections
├── style.css    # All styling, responsive layout
├── script.js    # Course data, search/filter, cart, progress tracker
└── README.md    # This file
```

## Built by

Built by Muhammad Umer Samroze — Portfolio Sample.
