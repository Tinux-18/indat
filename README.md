# indat

Personal site and portfolio of Constantin Rigu — **[indat.tech](https://www.indat.tech)**.

A Next.js App Router site (work experience, studies, projects, multi-language) plus **Tonight**, a small full-stack side feature for picking an evening activity, backed by its own Postgres database and an AI-powered suggestion flow.

## Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack) on [React 19](https://react.dev/) + TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [flowbite-react](https://flowbite-react.com/)
- **i18n**: [next-intl](https://next-intl.dev/) — English, German, Romanian
- **Animation**: [Motion](https://motion.dev/)
- **Database**: [Neon](https://neon.tech/) (serverless Postgres) for the Tonight feature
- **AI**: [Claude API](https://platform.claude.com/) (Opus) for the Tonight suggestion feature
- **Observability**: OpenTelemetry via [@vercel/otel](https://vercel.com/docs/observability/otel-overview), Vercel Analytics & Speed Insights
- **Deployment**: [Vercel](https://vercel.com/)
- **Package manager**: [pnpm](https://pnpm.io/)

## ✨ Featured: Tonight

Open `/tonight` on your phone: swipe through an editable, photo-backed list of evening activities Tinder-style, pick one (one per day, re-picking updates the same entry), and browse history/stats by week, month, or year. Out of ideas? A ✨ card asks Claude for a location- and time-aware suggestion, auto-illustrated with a matching Pexels photo.

It's gated behind a shared passcode (this is a private tool for two people, not a public feature) and lives entirely inside this same codebase and deployment — see [`DEVELOPMENT.md`](./DEVELOPMENT.md#tonight-architecture) for how it's built.

## Getting started

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). For environment variables, database setup, and everything else needed to actually run the Tonight feature locally, see **[DEVELOPMENT.md](./DEVELOPMENT.md)**.

## Documentation

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** — full setup, environment variables, scripts, architecture, and known quirks. Start here if you're picking this project back up after a while.
