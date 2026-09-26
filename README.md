# pokejev

Browse and search Pokémon (Gen 1–9) on a grass-themed sprite board. Built with Next.js App Router, TypeScript, and Tailwind. Data comes from [PokeAPI](https://pokeapi.co/) and is baked into static JSON at build time.

## Local development

Copy `.env.example` to `.env.local` if you want optional Jev-powered re-ranking for fuzzy searches (not required for name/type/gen/starters).

| Variable | Required | Purpose |
| --- | --- | --- |
| `TYPESAFE_API_KEY` | No | TypeSafe System One (Jev) — re-ranks non-structured queries via `/api/search` (same secret name as `andepants/like-this`) |

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317).

Try searches such as `pika`, `fire`, `gen 3`, or **`starters`** to see starter lines across generations on the canvas.

## Refresh the Pokémon index

The committed index lives at `data/pokemon-index.json`. Regenerate it from PokeAPI:

```bash
npm run generate:index
```

`npm run build` runs the same script automatically via `prebuild`.

## Production build

```bash
npm install
npm run build
npm run start
```

## Deploy on Vercel

1. Import this repository in Vercel.
2. Framework preset: **Next.js** (default).
3. Build command: `npm run build` (runs index generation, then `next build`).
4. Optional: add `TYPESAFE_API_KEY` for Jev semantic re-ranking on fuzzy queries.
5. Deploy.

Remote sprite URLs use `raw.githubusercontent.com/PokeAPI/sprites`; Next.js image config allows that host.

## Attribution

Pokémon, character names, and related assets are trademarks of Nintendo, Game Freak, and The Pokémon Company. **pokejev** is a fan project and is not affiliated with or endorsed by them.
