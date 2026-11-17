# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Vite dev server, --mode private (real contact details)
npm run build          # Type-check + build, PUBLIC contact data (output: dist/)
npm run build:private  # Type-check + build, REAL contact data (output: dist-private/)
npm run preview        # Preview the production build locally
npm run check:private  # Leak guard: fail if private values appear in dist/ or src/
npm run pipeline       # Full deploy: build → guard → commit → push → gh-pages
npm run deploy         # Deploy only: git subtree push --prefix dist origin gh-pages
```

There are no tests in this project. `check:private` is the only automated check
beyond `tsc`, and `prepipeline` runs it before every deploy.

## Architecture

This is a personal résumé site built as a **Preact + Vite + TypeScript** SPA, styled to render as A4 print pages. It is deployed to GitHub Pages at `https://www.aktasalper.com/resume/`.

### Rendering model

The app renders `<page size="A4">` custom elements (styled to 21cm × 29.7cm) so the browser can print the résumé directly via Ctrl+P / File → Print. `@media print` hides the `.no-print` navigation overlay. Layout is driven by `src/app.scss` (global) and per-component CSS Modules (`*.module.scss`).

### Routing & language switching

`react-router-dom` with a **hash router** is used. Routes are:
- `/#/` — defaults to English
- `/#/en`, `/#/de`, `/#/tr` — language-specific

`src/pages/LanguageHandler.tsx` listens for route changes and calls `i18n.changeLanguage()`. `src/utils/parseLanguageFromLocation.ts` extracts the locale from the URL.

### Internationalisation (i18next)

All résumé content lives in locale JSON files:
```
src/i18n/
  en/resume.json   ← source of truth; shape drives TypeScript types
  de/resume.json
  tr/resume.json
  config.ts        ← assembles resources, exports i18nResources, Namespace, etc.
  init.ts          ← initialises i18next (reads initial language from URL)
  types.ts         ← derives Company type from en/resume.json keys
```

`src/i18n/en/text.ts` re-exports `en/resume.json` as `const`, making it the TypeScript type source. When adding a new company or field, update all three JSON files.

The namespace for all translations is `"resume"` (single namespace). Component hooks use `useTranslation("resume", { keyPrefix: "..." })`.

### Component hierarchy

```
main.tsx
└── App → RouterProvider
    └── LanguageHandler (side-effect only)
    └── Resume
        └── FirstPage
            ├── ResumeHeader        (src/components/Header.tsx)
            ├── ExperienceContent   (src/pages/Resume/components/ExperienceContent.tsx)
            │   └── Experience      (src/components/Experience/Experience.tsx)
            │       └── Project     (src/components/Experience/Project.tsx)
            └── EducationContent    (src/components/Education/EducationContent.tsx)
```

`SecondPage` (`src/pages/Resume/components/SecondPage.tsx`) **is** mounted in `Resume.tsx`. It is the second print page: the tail of the experience list (via the `cutoffPoint` prop), education, and — in private builds only — references.

### Contact data: public vs private builds

Contact details are **not** in the i18n JSON and **not** hardcoded in components. They resolve at build time through the `@contact` alias in `vite.config.ts`:

| Build | `@contact` → | Contains |
|---|---|---|
| `npm run build` (default) | `src/data/contact.public.json` (committed) | Alias email + public links. No phone, no references. |
| `npm run build:private` / `npm run dev` | `src/data/contact.private.json` (**gitignored**) | Real email, mobile, and referee details. |

The split is build-time, not runtime, so private values are physically absent from the public bundle rather than merely unrendered. `src/data/README.md` has the full rationale.

**Rules:**
- Never commit `src/data/contact.private.json`. This repo is public *and* `dist/` is tracked, so a committed private value is published twice — once live, once permanently in git history.
- Referee details are third-party personal data. Private build only.
- Adding a contact field means updating both JSON files *and* the `@contact` module declaration in `src/types.d.ts`.
- `Header.tsx` and `SecondPage.tsx` drop empty values, so the two builds can differ in item count without layout changes.

### Adding experience entries

1. Add projects to `src/pages/Resume/components/ExperienceContent.tsx` — the `companies` array and the `projects` number array per company.
2. Add corresponding keys to all three `resume.json` files (`experience.companies.<name>.role.<n>`).

### Styling conventions

- Global typography utilities (`.text-bold`, `.text-medium`, `.text-caption`, etc.) and page layout are in `src/app.scss`.
- `src/variables.scss` holds design tokens (`$primary`, `$secondary`, spacing scale).
- Component-level styles use CSS Modules (`.module.scss`).
- All sizes use physical units (`mm`, `cm`) to ensure accurate print output.

### Deployment

The `dist/` folder is pushed to the `gh-pages` branch via `git subtree`. The Vite `base` is hardcoded to `"https://www.aktasalper.com/resume/"` in `vite.config.ts`.
