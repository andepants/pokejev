# pokejev — agent notes

Optional Jev integration: `lib/jev-fetch.ts` + `app/api/search/route.ts` (uses `TYPESAFE_API_KEY`; see `.env.example`). Lexical search in `lib/search.ts` works without it.

When **pstack** is available in the environment, prefer **`/poteto-mode`** for implementation work on this repo (read the skill before editing).

## Project

- Next.js App Router, TypeScript, Tailwind.
- Pokémon data: static `data/pokemon-index.json` from PokeAPI (`npm run generate:index`).
- UI: client search over JSON; sprites on a CSS grass canvas (no table UI).

## Refresh data

```bash
npm run generate:index
```

Commit updated JSON when the index changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
