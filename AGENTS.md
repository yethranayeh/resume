# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Commands

```bash
npm run dev            # Vite dev server, --mode private (real contact details)
npm run build          # Type-check, build, prerender HTML, print PDFs (output: dist/)
npm run build:private  # Same, with the real mobile number (output: dist-private/)
npm run preview        # Preview the Vite build locally
npm run check:private  # Leak guard: fail if private values appear in dist/ or src/
```

`npm run build` is the whole pipeline: `tsc -b`, `vite build`, `scripts/prerender.mjs`,
`scripts/pdf.mjs`. It needs Google Chrome installed; Playwright drives it through
`channel: "chrome"`. The build fails if a PDF is not exactly two pages or if any
content is clipped by a `<page>` sheet.

There are no unit tests. `tsc`, the prerender assertions, the PDF page-count and
overflow checks, and `check:private` are the automated checks. The Pages workflow
runs all of them on every push.

## Architecture

A personal résumé built with **Preact + Vite + TypeScript**, styled as A4 print
sheets. It is deployed to GitHub Pages at `https://www.aktasalper.com/resume/`.

### Rendering model

The deployed pages are **static HTML with no client JavaScript**. The app is used
as a renderer: `scripts/prerender.mjs` serves the Vite build, loads each locale in
headless Chrome, waits for fonts, captures the DOM, strips the script tags, injects
the per-locale metadata, and writes:

```
dist/index.html       (en, /resume/)
dist/de/index.html    (de, /resume/de/)
dist/tr/index.html    (tr, /resume/tr/)
dist/*.pdf            (en + de, printed from the static pages)
```

The client bundle is deleted after prerendering so nothing can hydrate over the
static markup. Language switching is a plain `<a href>` to the other directory;
`src/components/Navbar.tsx` renders it and is hidden in print.

Each page is a `<page size="A4">` element styled to 21cm × 29.7cm. `@media print`
drops the on-screen margin, forces a page break after each sheet, and hides
`.no-print`. `scripts/pdf.mjs` asserts exactly two pages per PDF and fails if a
sheet's content is taller than the sheet.

### Development and the hash router

`npm run dev` still runs the SPA. `react-router-dom` uses a **hash router** so the
prerenderer can select a locale without a server:

- `/#/` — English
- `/#/de`, `/#/tr` — German, Turkish

`src/i18n/init.ts` initialises i18next synchronously (`initImmediate: false`) from
the URL, so the first render is already in the right language. The prerenderer
waits for a locale-specific marker in `<main>` before capturing.

### Internationalisation

All résumé content lives in locale JSON files:

```
src/i18n/
  en/resume.json   ← source of truth; shape drives TypeScript types
  de/resume.json
  tr/resume.json
  config.ts        ← assembles resources, exports i18nResources, Namespace
  init.ts          ← initialises i18next from the URL
  types.ts         ← derives Company type from en/resume.json keys
```

Each JSON also carries a `meta` block (`title`, `description`, `jobTitle`) that the
prerenderer turns into `<title>`, description, Open Graph, and JSON-LD tags. Every
content change must land in all three files.

### Component hierarchy

```
main.tsx
└── App → RouterProvider
    └── LanguageHandler (side-effect only)
    └── Resume
        ├── Navbar              (src/components/Navbar.tsx, .no-print)
        ├── FirstPage
        │   ├── ResumeHeader    (src/components/Header.tsx)
        │   └── ExperienceContent (toCompany={2})
        │       └── Experience → Project
        └── SecondPage
            ├── ExperienceContent (fromCompany={2})
            └── lower grid: ProjectsContent | EducationContent
```

`ExperienceContent` slices the `companies` array with `fromCompany`/`toCompany`.
Page 1 holds Schraubenhandel and Etstur; page 2 holds 1Pixel, Zinn, and education.
Adding enough content to overflow a sheet fails the build rather than clipping it.

### Contact data: public vs private builds

Contact details are **not** in the i18n JSON and **not** hardcoded in components.
They resolve at build time through the `@contact` alias in `vite.config.ts`:

| Build | `@contact` → | Contains |
|---|---|---|
| `npm run build` (default) | `src/data/contact.public.json` (committed) | Alias email + public links. No phone. |
| `npm run build:private` / `npm run dev` | `src/data/contact.private.json` (**gitignored**) | Real email and mobile |

The split is build-time, so private values are physically absent from the public
bundle rather than merely unrendered. `src/data/README.md` has the rationale.

Referee details are **not** part of any build. They live in
`src/data/references.private.json` (gitignored) and are imported by nothing, for
when a specific employer asks for references.

**Rules:**
- Never commit `src/data/*.private.json`. This repo is public.
- Adding a contact field means updating both JSON files *and* the `@contact`
  module declaration in `src/types.d.ts`.
- `Header.tsx` drops empty values, so the two builds can differ in item count
  without layout changes.

### Adding experience entries

1. Add projects to the `companies` array in
   `src/pages/Resume/components/ExperienceContent.tsx` — the `projects` number
   array per company.
2. Add the matching keys to all three `resume.json` files under
   `experience.companies.<name>.role.<n>`.
3. Run `npm run build` and check the PDFs; the build fails on a third page or
   clipped content.

### Styling conventions

- Global typography utilities and page layout are in `src/app.scss`.
- `src/variables.scss` holds design tokens (`$primary`, `$secondary`, spacing).
- Component styles use CSS Modules (`.module.scss`).
- All sizes use physical units (`mm`, `cm`) for accurate print output.
- Roboto is self-hosted through `@fontsource/roboto` (latin + latin-ext in
  `src/main.tsx`). Do not reintroduce a Google Fonts import: it makes the PDF
  depend on the network and leaks visitor IPs to Google.

### Deployment

GitHub Actions builds and publishes the site. `.github/workflows/pages.yml` runs
on every push to `main` (and manually), executes `npm ci`, `npm run build`, and
`npm run check:private`, then uploads `dist/` with `actions/upload-pages-artifact`
and deploys with `actions/deploy-pages`. There is no manual deploy step and no
`gh-pages` branch.

`dist/` and `dist-private/` are gitignored. Do not commit build output; the Pages
artifact is the only published copy. The Vite `base` is `/resume/` for the public
build and `./` for the private build, which is what lets the prerenderer serve
`dist/` at the same path the deployed site uses.
