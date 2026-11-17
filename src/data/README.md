# Contact data — public / private split

Contact details are resolved **at build time**, not at runtime, via a Vite
`resolve.alias` on `@contact` (see `vite.config.ts`).

| Build | Command | `@contact` resolves to | Output |
|---|---|---|---|
| Public | `npm run build` | `contact.public.json` (committed) | `dist/` → published by the Pages workflow |
| Private | `npm run build:private` | `contact.private.json` (gitignored) | `dist-private/` → local PDF only |
| Dev | `npm run dev` | `contact.private.json` | — |

The split is build-time on purpose. A runtime flag (`if (isPrivate)`) would still
leave the real values sitting in the public JS bundle for anyone who opens
devtools. With an alias swap, the private values are **physically absent** from
the public artifact.

## Rules

- `contact.private.json` is gitignored and must stay that way. The repo is public.
- `contact.public.json` is the shape reference. If you add a field, add it to both
  files and to the `@contact` module declaration in `src/types.d.ts`.
- `npm run build` never reads the private file, and the Pages workflow only runs
  the public build. The leak guard (`scripts/check-no-private.mjs`) fails CI if any
  value from a `src/data/*.private.json` file appears in `dist/` or in `src/`.

## Referees

Referee names, phone numbers, and emails live in `references.private.json`
(gitignored). No build imports that file: the résumé says nothing about references,
and the details are only for when a specific employer asks. Keeping them out of
the contact module means no build — public or private — can embed them.

## If a private file is missing

`npm run build` and the public site still work. Only `npm run build:private` and
`npm run dev` need `contact.private.json`. Recreate it by copying
`contact.public.json` and filling in the real values.
