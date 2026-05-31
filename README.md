# aieditorrspediting.xyz

Static English content hub for **AI Editor RSP Editing** prompts and workflows.

Built with Next.js (static export) for Cloudflare Pages.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

Output: `out/` — deploy this folder to **Cloudflare Pages** (static).  
Do not use `npx wrangler deploy` / OpenNext — see [docs/DEPLOY.md](docs/DEPLOY.md).

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — canonical URL (default `https://aieditorrspediting.xyz`)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 measurement ID (optional until you have one)

## Content

Edit `src/content/prompts.json` to add or update guides (weekly maintenance).

## Docs

- [docs/PRD.md](docs/PRD.md) — product scope
- [docs/PROJECT-BOARD.md](docs/PROJECT-BOARD.md) — pipeline status
- [docs/DEPLOY.md](docs/DEPLOY.md) — Cloudflare + GSC
- [docs/QA-CHECKLIST.md](docs/QA-CHECKLIST.md) — pre-launch QA

## ShipSolo skills

This repo was scaffolded following `.cursor/skills/` stage contracts (PRD → compliance → copy → frontend → SEO).
