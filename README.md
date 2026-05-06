# Sean Thomas — Portfolio

Personal portfolio site for Sean Thomas — a business-first full-stack software engineer graduating from the University of Alabama (MIS, May 2026) and joining Valent Partners in Dallas in August 2026. Founder of Signal Surge LLC and [WhoBrew](https://whobrew.us). Sergeant, 20th Special Forces Group, Alabama Army National Guard.

Live site: built from React + TypeScript and deployed via Netlify.

## Local development

```bash
npm install
npm start
```

Content lives in three JSON files under `public/`:

- `public/bioinfo.json` — bio, experience, skills, contact
- `public/cardinfo.json` — timeline summary cards
- `public/projects.json` — long-form project detail pages

## Forking This Site / Use as Template

This site is also the basis of an open-source portfolio template. If you want to reuse it for your own portfolio (or for a student-portfolio platform like [WhoBrew](https://whobrew.us)):

1. Fork or clone the repo.
2. Install dependencies: `npm install`
3. Replace the contents of `public/bioinfo.json`, `public/cardinfo.json`, and `public/projects.json` with your own data. Reference examples are provided as `public/*.example.json`.
4. Replace `public/AISphoto.jpg` with your own portrait (or drop a new image anywhere under `public/` and update `profileImage` in `bioinfo.json`).
5. Update `<title>` in `public/index.html`, `name` / `short_name` in `public/manifest.json`, and `name` in `package.json` to your own.
6. Run locally: `npm start`

For the full fork-and-customize guide — field-by-field tables for every JSON file, link-routing convention, brand colors, and adding custom routes — see [`docs/TEMPLATE.md`](docs/TEMPLATE.md). Worked examples for adding a custom page live under [`examples/custom-pages/`](examples/custom-pages/).

## Project decisions

Architectural decisions and rationale live in [`artifacts/context/decision-log.md`](artifacts/context/decision-log.md) and [`artifacts/design/`](artifacts/design/).

## Recent updates

- **2026-05-05** — Added MySupply (DaVita capstone) and BSG Forecasting cards. TODO: replace `default.jpg` for cards 10 and 11 with real screenshots when available.
