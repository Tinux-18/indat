# Development guide

Technical reference for working on this repo — written for picking it back up after months away as much as for anyone else.

## Prerequisites

- **Node 24+** — use [fnm](https://github.com/Schniz/fnm) (recommended) or nvm; a `.nvmrc` pins the version so `cd`-ing into the repo auto-switches.
  ```bash
  curl -fsSL https://fnm.vercel.app/install | bash   # once per machine
  fnm install 24 && fnm default 24
  ```
- **pnpm** — the pinned version lives in `package.json`'s `packageManager` field. With Node's built-in [Corepack](https://nodejs.org/api/corepack.html) it's picked up automatically; if `pnpm` isn't on your `PATH`, run it via `corepack pnpm ...`.
- `preinstall` actively blocks installing with anything other than pnpm (via `npm-only-allow`) — this is intentional, not a bug.

## Setup

```bash
pnpm install --frozen-lockfile
```

### Environment variables

Copy these into `.env.local` (validated at build/runtime via `env.mjs`, using [T3 Env](https://env.t3.gg/)). Everything is optional at the schema level so the main site builds without them — only the Tonight routes need them.

| Variable | Used for | Where to get it |
| --- | --- | --- |
| `DATABASE_URL` / `DATABASE_URL_UNPOOLED` | Tonight's Neon Postgres connection | Vercel dashboard → Storage → the Neon integration, or `vercel env pull .env.local` after `vercel link` |
| `TONIGHT_PASSCODE` | Shared passcode gating `/tonight` | Pick your own (≥4 chars) |
| `PEXELS_API_KEY` | Auto-fetched activity photos | Free key at [pexels.com/api](https://www.pexels.com/api/) |
| `CLAUDE_API_KEY` | The "suggest an idea" feature | [Anthropic Console](https://console.anthropic.com/) |
| `ANALYZE` | Bundle analyzer (`pnpm analyze`) | Not needed day-to-day |

`vercel env pull` will also dump a bunch of `DATABASE_PG*`/`DATABASE_POSTGRES_*` variables from the Neon integration — only `DATABASE_URL` and `DATABASE_URL_UNPOOLED` are actually read by the app; the rest are unused aliases, harmless to leave in `.env.local`.

### Database (Tonight feature only)

```bash
pnpm tonight:migrate            # idempotent — creates tables, seeds 3 default activities
pnpm tonight:backfill-images    # one-off: fetches Pexels photos for any activity missing one
```

`db/tonight/schema.sql` is the source of truth; `migrate.mjs` just runs it against `DATABASE_URL_UNPOOLED`. Re-running is always safe.

## Scripts

| Script | What it does |
| --- | --- |
| `dev` | Dev server (Turbopack, colorized output) |
| `build` / `start` | Production build / serve |
| `lint` / `fix` | ESLint (flat config) — `fix` auto-fixes |
| `prettier` / `prettier:fix` | Format check / write |
| `test` | Jest (jsdom environment) |
| `analyze` | Production build with the bundle analyzer enabled |
| `tonight:migrate`, `tonight:backfill-images` | See above |
| `coupling-graph` | Generates `graph.svg` — a [Madge](https://github.com/pahen/madge) coupling/cohesion diagram of internal modules |

## Project structure

```
app/[locale]/         Routes (Next.js App Router, next-intl locale segment: en/de/ro)
app/api/               API routes, incl. app/api/tonight/*
components/            One folder per feature area (Home/, Tonight/, Locale/, ThemeToggle/)
lib/tonight/            Tonight's server-side logic: db.ts, auth.ts, pexels.ts, suggest.ts
models/                 Shared TypeScript types
i18n/messages/          en.json / de.json / ro.json translation strings
db/tonight/             Schema + migration/backfill scripts
proxy.tsx               Next.js middleware: locale routing + Tonight's passcode gate
```

## Tonight architecture

A private, self-contained feature living inside the main site:

- **Data model** (`db/tonight/schema.sql`): `tonight_activities` (the editable list — each item *is* a category like "Watch a film", not a specific title) and `tonight_picks` (one row per calendar day; picking again the same day **updates** the existing row via an upsert rather than inserting a new one — see `recordPick` in `lib/tonight/db.ts`).
- **Auth** (`lib/tonight/auth.ts` + `proxy.tsx`): a single shared passcode, stored as a SHA-256 hash in an httpOnly cookie. `proxy.tsx` gates both the `/tonight` pages and `/api/tonight/*` routes — the API is protected independently of the UI, not just hidden behind a client-side redirect.
- **Photos** (`lib/tonight/pexels.ts`): activities get a photo auto-fetched from Pexels on creation. Regenerating ("New photo" / a new AI suggestion) fetches from a pool of 10 candidates and picks randomly, excluding the current photo — a plain "search again" would deterministically return the same top result every time.
- **AI suggestions** (`lib/tonight/suggest.ts` + `app/api/tonight/suggest/route.ts`): calls Claude (`claude-opus-5`) with a fixed brief (couple activity, tonight 9–11pm, ≤2 hours, within a 10-minute trip of home) and structured JSON output. Each request excludes the existing activity list plus everything already suggested that session, so "Try another idea" doesn't loop.
- **Stats** (`app/api/tonight/stats/route.ts`): grouped counts by activity, filtered by week/month/year with an `offset` param to step through previous periods.

## Testing & verification

```bash
pnpm lint && pnpm exec tsc --noEmit -p . && pnpm test && pnpm build
```

There's no CI configured (no `.github/workflows`) — this is the manual sequence to run before pushing anything non-trivial. `pnpm build` is the most reliable single check since it runs both the TypeScript compiler and Next's own build-time validation.

## Deployment

Zero-config on Vercel — pushes to `main` deploy automatically, other branches get preview deployments. Vercel auto-detects pnpm from `pnpm-lock.yaml` and picks up Node 24 from Project Settings (already configured; independent of `engines.node` in `package.json`, which is just a declared minimum, not what actually provisions the runtime). Env vars need to be set separately in the Vercel dashboard (Production + Preview) — they aren't read from `.env.local`.

## Known quirks worth remembering

- **`next.config.mjs` plugin ordering is load-bearing.** `next-compose-plugins`' `withPlugins()` returns a config-as-*function*; `next-intl`'s plugin merges via `Object.assign(nextConfig, ...)`, which silently drops everything if `nextConfig` is a function (functions have no enumerable own properties). `withNextIntl` must wrap the plain config object *before* `withPlugins` touches it, not after — get this backwards and most of `next.config.mjs` (images, rewrites, `reactStrictMode`, ...) is silently ignored with no error.
- **`eslint.config.mjs` registers `@typescript-eslint` exactly once, deliberately.** `eslint-config-next`'s `next/typescript` preset and `typescript-eslint`'s own `configs.recommended` each try to register their own (different-instance) copy of the plugin under the same name, which ESLint rejects as a duplicate. The fix is a small helper (`withoutTypescriptEslintPlugin`) that strips the plugin key from every source except one explicit top-level registration.
- **pnpm blocks native build scripts by default.** `pnpm-workspace.yaml`'s `allowBuilds` explicitly approves the ones this project actually needs (`@swc/core`, `sharp`, etc. — several are load-bearing for Next.js). If a fresh install complains about `ERR_PNPM_IGNORED_BUILDS` after adding a new dependency, add it there.
- **`next-themes` is effectively unmaintained.** It always renders its anti-flash `<script>` with an executable type, which React 19 warns about whenever the provider remounts client-side (e.g. this app's locale switch, since `[locale]` is the outermost layout segment holding `<html>`/`<body>`). `app/providers/theme-provider.tsx` works around it by only using the real executable script type during actual SSR; see the comment there and [pacocoursey/next-themes#387](https://github.com/pacocoursey/next-themes/issues/387) for the upstream thread.
