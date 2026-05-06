# Portfolio Template — Fork and Customize

This is an open-source React + TypeScript portfolio template built around three JSON files. It is intended for developers, students, and career-changers who want a working, deployable portfolio without rebuilding one from scratch. If you are willing to edit JSON and swap an image, you can have a personalized site running in under 30 minutes; deeper customization (routes, colors, custom pages) is documented below and typically takes an hour or two.

## Quick start (5 minutes)

1. Fork or clone the repo.
2. Install dependencies: `npm install`
3. Edit `public/bioinfo.json` — replace the example persona with your own name, title, about copy, experience, skills, and contact links.
4. Edit `public/cardinfo.json` — list your projects as timeline cards.
5. Edit `public/projects.json` — add a detail-page entry for each project whose card should link to an in-app detail page.
6. Replace `public/AISphoto.jpg` with your own portrait (or drop a new image anywhere under `public/` and update `profileImage` in `bioinfo.json`).
7. Run locally: `npm start`

## The three data files

### `bioinfo.json` — your identity, skills, experience, contact

Drives the Home hero, the Bio page, and the floating social buttons. Shape is defined by `BioData` in `src/types/Bio.ts`.

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `name` | string | yes | Your full name. Used in bio header, hero alt text, and page headings. | `"Jane Doe"` |
| `title` | string | yes | Short professional title shown under your name. | `"Product Engineer"` |
| `profileImage` | string | yes | Path to your portrait, relative to `public/`. Use `"./myphoto.jpg"` for `public/myphoto.jpg`. | `"./AISphoto.jpg"` |
| `heroHeading` | string | no | Overrides the Home hero H1. Absent = default copy renders. (D-007) | `"Building thoughtful software."` |
| `heroDescription` | string | no | Overrides the Home hero subcopy. Absent = default renders. (D-007) | `"I ship user-facing tools..."` |
| `about` | string[] | no | Paragraphs for the "About Me" section of the Bio page. | `["I grew up in...", "Today I focus on..."]` |
| `skills` | `BioSkill[]` | no | Short skill pills shown near the bio header. Each is `{ name, color }` where `color` is a CSS-class suffix (e.g. `skill-tag-blue`). | `[{ "name": "React", "color": "blue" }]` |
| `experience` | `BioExperience[]` | no | Work history entries. Each is `{ title, period, description }`. | `[{ "title": "Engineer, Acme", "period": "2022–present", "description": "..." }]` |
| `technicalSkills` | string[] | no | Bulleted list under Skills → Technical. | `["TypeScript", "Postgres"]` |
| `militarySkills` | string[] | no | Bulleted list under Skills → Military. Omit if not applicable. | `["Leadership", "Logistics"]` |
| `certificates` | string[] | no | Bulleted list under Skills → Credentials. | `["AWS SAA", "Scrum Master"]` |
| `education` | `BioEducation[]` | no | Each entry is `{ degree, period, description }`. | `[{ "degree": "B.S. CS", "period": "2018–2022", "description": "..." }]` |
| `contact` | `BioContact[]` | no | Social / contact links. Each is `{ type, url?, display? }`. Drives both `FloatingSocialButtons` and the Bio page contact section. | see below |

**Supported `contact.type` values** (each gets a built-in icon):

- `github` — GitHub profile
- `linkedin` — LinkedIn profile
- `medium` — Medium blog
- `email` — mailto link (use `"url": "mailto:you@example.com"`)
- `twitter` — Twitter / X profile
- `website` — personal website (FloatingSocialButtons) / generic link
- `location` — Bio page only; renders a map-pin icon, typically without a `url`

Any other `type` string falls through to a generic link icon — so `youtube`, `bluesky`, etc. will still render, just without a branded icon.

See `public/bioinfo.example.json` for a complete working example.

### `cardinfo.json` — timeline summary cards

Drives the scrolling timeline on the Home page. Shape is defined by `CardData` in `src/components/Card.tsx`.

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `id` | number | yes | Unique ID for this card. Must match a `projects.json` entry if you want the card to route to an in-app detail page. | `1` |
| `title` | string | yes | Card headline. | `"Realtime Analytics Dashboard"` |
| `description` | string | no | 1–2 sentence blurb shown on the card. | `"Operator-facing dashboard for..."` |
| `overview` | string | no | Longer summary. Not rendered on the card itself — available for `projects.json` reuse. | `"..."` |
| `role` | string | no | Your role label. Rendered as "My Role: …" on the card. | `"Lead engineer"` |
| `technologies` | string | no | Comma-separated tech list. Each token renders as a color-coded pill. | `"React, TypeScript, Postgres"` |
| `year` | string | no | Year pill displayed in the card corner. | `"2024"` |
| `startDate` | string | no | ISO-ish date used for sorting the timeline chronologically. | `"2024-03-01"` |
| `results` | string | no | Short outcome line. Rendered as "Key Results: …". | `"Cut load time 60%."` |
| `type` | `"demo" \| "archived" \| "live"` | no | Status badge. Each value renders with its own color. Omit if none apply. | `"live"` |
| `link` | string | no | Click target for the card. See the convention below. | `"/project/1"` or `"https://example.com"` |

**Link routing convention** (D-001):

- Starts with `http://` or `https://` → external link, opens in a new tab.
- Starts with `/` → internal React Router `<Link>` to that path (e.g. `/whobrew`, `/resume`).
- Absent or anything else → falls back to `/project/:id` using the card's numeric `id`. This is the common case — the card links to a detail page rendered from `projects.json`.

See `public/cardinfo.example.json` for a worked example.

### `projects.json` — detail-page content

Drives the `/project/:id` detail pages. Shape is defined by the `Project` type in `src/types/Project.ts`, which extends `CardData` with optional long-form fields.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | number | yes | **Must match a `cardinfo.json` id** for the `/project/:id` route to resolve. |
| `title`, `description`, `overview`, `role`, `technologies`, `year`, `startDate`, `results`, `type`, `link` | see `CardData` above | inherited | Same semantics as on the timeline card; detail page falls back to these where long-form fields are absent. |
| `subtitle` | string | no | Shown under the title on the detail page. |
| `client` | string | no | Client / company name. |
| `duration` | string | no | Project duration label (e.g. `"6 months"`). |
| `highlights` | string[] | no | Bulleted top-line achievements. |
| `challenges` | string[] | no | Bulleted challenges / constraints you navigated. |
| `features` | `{ title, description }[]` | no | Feature callouts. |
| `approach` | `{ step, title, description }[]` | no | Numbered methodology / process steps. |
| `roleDetails` | `{ scrumMaster?: string[], dataEngineer?: string[] }` | no | Role-specific bulleted contributions. Only `scrumMaster` and `dataEngineer` keys render out of the box. To add more role types, edit `src/components/ProjectDetail.tsx`. |
| `outcomes` | string[] | no | Bulleted results / impact statements. |
| `team` | `{ name, role, linkedIn }[]` | no | Team members with LinkedIn URLs. |

See `public/projects.example.json` for a worked example.

## Customizing beyond the data files

### Profile image

Put your image anywhere under `public/` and reference it in `bioinfo.json` as `profileImage`. Paths are relative to `public/`, so `./headshot.jpg` means `public/headshot.jpg`.

### Site title and meta

Edit:

- `public/index.html` — the `<title>` tag and the meta description
- `public/manifest.json` — `name` and `short_name`
- `package.json` — `name`

### Brand color and theme

Edit `src/styles/theme.css`. The template defines six CSS custom properties:

- `--color-accent` — primary brand color (links, highlights)
- `--color-bg` — page background
- `--color-surface` — card backgrounds
- `--color-text` — primary text
- `--color-text-muted` — secondary text
- `--color-border` — borders and dividers

Change a value in one place and it applies everywhere the token is referenced. (Per D-004, the initial template refactor only rewired `--color-accent` and `--color-bg` globally — the other four tokens are defined but not yet referenced throughout every CSS file. As you customize, you can wire up more literals to these tokens.)

### Adding a custom route (e.g., a product page, resume page, essay)

See `examples/custom-pages/WhoBrew/` for a worked example. Copy the folder into `src/components/`, import it in `src/App.tsx`, and add a `<Route path="/your-path" element={<YourComponent />} />` entry. Link to it from a card by setting that card's `link` field to `/your-path` in `cardinfo.json`.

### Social links

Populate the `contact` array in `bioinfo.json`. `FloatingSocialButtons` (the floating pills on Home) and the Bio page's "Connect With Me" section both read from it. Supported types render with a built-in icon: `github`, `linkedin`, `medium`, `email`, `twitter`, `website`. Any other type renders with a generic link icon.

## Deploying

The repo ships with `netlify.toml`. Deploy directly to Netlify, Vercel, or any static host — `npm run build` outputs to `build/`.

## Migrating Sean's personal content off `main`

This template was generalized from Sean Thomas's personal portfolio. If you want to see the original Sean Thomas configuration, check out the `sean-personal` branch (if present on the remote) or browse commit history before 2026-04-20. The WhoBrew custom-page source is preserved at `examples/custom-pages/WhoBrew/` as a reference implementation for adding your own routes (see D-001, D-002).

## File structure reference

```
public/
  bioinfo.json          <- your identity
  cardinfo.json         <- timeline cards
  projects.json         <- detail pages
  *.example.json        <- worked examples (not loaded at runtime)
  index.html            <- site shell
src/
  App.tsx               <- routes
  components/           <- UI components
  styles/theme.css      <- brand tokens
  styles/               <- CSS per component
  types/                <- TypeScript types for JSON data
examples/
  custom-pages/         <- reference implementations for custom routes
artifacts/
  context/decision-log.md     <- why things are the way they are
  design/                     <- plans and ADRs
```

## Questions?

Open an issue or check the ADRs in `artifacts/design/decisions/`.
