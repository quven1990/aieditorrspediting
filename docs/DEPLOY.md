# Deploy — Cloudflare Pages + GSC + GA4

## Prerequisites

- GitHub repo pushed (this project)
- Domain `aieditorrspediting.xyz` in Cloudflare DNS

## Cloudflare Pages

1. Dashboard → **Workers & Pages** → **Create** → **Pages** → Connect Git.
2. Build settings:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 20+
3. **Environment variables** (Production):
   - `NEXT_PUBLIC_SITE_URL` = `https://aieditorrspediting.xyz`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = your GA4 ID (when ready)
4. **Custom domains** → add `aieditorrspediting.xyz` (and optional `www` redirect).
5. Wait for SSL active (full strict).

## DNS (if zone not on Cloudflare yet)

1. Add site to Cloudflare.
2. Change registrar nameservers to Cloudflare’s.
3. Pages will create CNAME when you attach custom domain.

## Google Search Console

1. Add property: URL prefix `https://aieditorrspediting.xyz`
2. Verify via DNS TXT (Cloudflare) or HTML file in `public/` if needed.
3. Submit sitemap: `https://aieditorrspediting.xyz/sitemap.xml`
4. Request indexing for `/` and `/prompts/ai-editor-rsp-editing-guide/`

## GA4

1. Create GA4 property → Web stream for your domain.
2. Copy Measurement ID → Pages env `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
3. Redeploy. Check Realtime after visit.

## Post-deploy smoke

- [ ] Home, prompts list, 2 prompt pages load on mobile
- [ ] Copy button works (HTTPS required)
- [ ] `/robots.txt` and `/sitemap.xml` return 200
- [ ] Privacy / Terms / Safe Use linked in footer

**[BLOCKED: SETUP_REQUIRED]** until you complete Cloudflare DNS — local build can still run.
