# Contact data — public / private split

Contact details are resolved **at build time**, not at runtime, via a Vite
`resolve.alias` on `@contact` (see `vite.config.ts`).

| Build | Command | `@contact` resolves to | Output |
|---|---|---|---|
| Public | `npm run build` | `contact.public.json` (committed) | `dist/` → deployed to gh-pages |
| Private | `npm run build:private` | `contact.private.json` (gitignored) | `dist-private/` → print to PDF |
| Dev | `npm run dev` | `contact.private.json` | — |

The split is build-time on purpose. A runtime flag (`if (isPrivate)`) would still
leave the real values sitting in the public JS bundle for anyone who opens
devtools. With an alias swap, the private values are **physically absent** from
the public artifact.

## Rules

- `contact.private.json` is gitignored and must stay that way. This repo is
  public **and** `dist/` is tracked, so a committed private value is published twice.
- `contact.public.json` is the shape reference. If you add a field, add it to both
  files and to the `@contact` module declaration in `src/types.d.ts`.
- Referee details are third-party personal data. They belong in the private build
  only, and only because you hand that PDF to one employer at a time.
- `npm run pipeline` runs `scripts/check-no-private.mjs` first, which fails the
  deploy if any private value appears anywhere in `dist/`. Do not bypass it.

## If `contact.private.json` is missing

`npm run build` and `npm run preview` still work — only the private/dev builds
need it. Recreate it by copying `contact.public.json` and filling in real values.
