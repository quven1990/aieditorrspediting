# Deploy — Cloudflare Pages + GSC + GA4

This site uses **Next.js static export** (`output: "export"` → folder `out/`).  
It is **not** a Workers SSR app. Do **not** use OpenNext or `npx wrangler deploy` with Next.js SSR detection.

---

## Correct Cloudflare setup (important)

In **Workers & Pages** → your project → **Settings** → **Build**:

| Setting | Value |
|---------|--------|
| **Framework preset** | `None` (recommended) or **Next.js (Static HTML Export)** |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Deploy command** | **leave empty** (best) **or** `npm run deploy` |

**Do not use** `npx wrangler deploy` alone — it fails on Pages projects. If your dashboard forces a deploy command, set:

```bash
npm run deploy
```

(which runs `wrangler pages deploy out`).

### If you see this error

```
ENOENT: .../.next/standalone/.next/server/pages-manifest.json
npx opennextjs-cloudflare build
```

Cause: **Deploy command** is `npx wrangler deploy`, which is for Workers SSR — not this static `out/` site.

**Fix (pick one):**

1. **Recommended:** Delete **Deploy command** entirely; set **Build output directory** = `out`; redeploy.
2. **If deploy command is required:** set it to `npm run deploy` (not `npx wrangler deploy`).
3. Set **Build output directory** to `out` (not `.next`).

### If you see `Missing entry-point to Worker script or to assets directory`

Wrangler was run without static assets config. Use **Deploy command** = `npm run deploy`, or delete deploy command and use output dir `out` only.

---


## Step-by-step

1. Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select repo `quven1990/aieditorrspediting`, branch `main`.
3. Use the build table above.
4. **Environment variables** (Production):
   - `NEXT_PUBLIC_SITE_URL` = `https://aieditorrspediting.xyz`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = your GA4 ID (optional)
5. **Custom domains** → add `aieditorrspediting.xyz`.
6. Wait for SSL (Full).

## DNS (if zone not on Cloudflare yet)

1. Add site to Cloudflare.
2. Point registrar nameservers to Cloudflare.
3. Attach custom domain in Pages (creates CNAME).

## Google Search Console

1. Property: `https://aieditorrspediting.xyz`
2. Verify (DNS TXT in Cloudflare is easiest).
3. Submit sitemap: `https://aieditorrspediting.xyz/sitemap.xml`

## GA4

1. Create Web stream → copy Measurement ID.
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Pages env → redeploy.

## Post-deploy smoke

- [ ] Home + `/prompts/` + one prompt page load on mobile
- [ ] Copy button works (HTTPS)
- [ ] `/robots.txt` and `/sitemap.xml` return 200
- [ ] Footer links: Privacy, Terms, Safe Use

## Local verify before push

```bash
npm run build
npx serve out
```
