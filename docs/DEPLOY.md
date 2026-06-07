# Deploy — Cloudflare Pages + GSC + GA4

This site uses **Next.js static export** (`output: "export"` → folder `out/`).  
It is **not** a Workers SSR app. Do **not** use OpenNext or `npx wrangler deploy` with Next.js SSR detection.

---

## 两种部署方式（二选一，避免重复构建）

| 方式 | 在哪里看日志 | 适用 |
|------|----------------|------|
| **A. GitHub Actions**（推荐你要的「Actions 部署」） | GitHub → **Actions** 标签 | 构建 + 发布全在 Actions，Cloudflare 只接产物 |
| **B. Cloudflare 直连 Git** | Cloudflare → **Deployments** | 不用配 Actions secrets，push 后 Cloudflare 自己 build |

**不要同时开 A + B**，否则每次 push 会部署两次。

仓库已包含 **方式 A** 的工作流：`.github/workflows/deploy.yml`。

---

## GitHub Actions 部署（与 Cloudflare 打通）详细步骤

### 第 1 步：确认 Cloudflare 上是 Pages 项目（不是 Worker SSR）

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**。
2. 应有一个名为 **`aieditorrspediting`** 的 **Pages** 项目（或先按下面第 4 步用 Wrangler 创建）。
3. **不要**在 Build 设置里使用：
   - `Deploy command: npx wrangler deploy`
   - `Version command: npx wrangler versions upload`  
   那是 **Worker** 流程，会导致 OpenNext / standalone 报错。

若你当前是 **Worker + Git** 且改不了 Output directory，建议新建 **Pages** 项目，或断开 Worker 的 Git 构建，改由 Actions 部署。

### 第 2 步：创建 Cloudflare API Token

1. Cloudflare → 右上角头像 → **My Profile** → **API Tokens**。
2. **Create Token** → 自定义权限（推荐）：
   - Account → **Cloudflare Pages** → **Edit**
   - Zone → **Zone** → **Read**（用于自动解析 zone id）
   - Zone → **Cache Purge** → **Purge**（部署后清空 CDN 缓存）
3. 复制生成的 Token（只显示一次）→ 待会填入 GitHub Secret。

### 第 3 步：获取 Account ID

1. Cloudflare Dashboard 右侧栏 **Account ID**，或 URL：  
   `https://dash.cloudflare.com/<ACCOUNT_ID>/...`
2. 复制保存。

### 第 4 步：在 GitHub 配置 Secrets

仓库：`https://github.com/quven1990/aieditorrspediting`

1. **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
2. 添加两条：

| Secret 名称 | 值 |
|-------------|-----|
| `CLOUDFLARE_API_TOKEN` | 第 2 步的 API Token |
| `CLOUDFLARE_ACCOUNT_ID` | 第 3 步的 Account ID |
| `CLOUDFLARE_ZONE_ID` | （可选）域名 zone id；不填则 Actions 用 API 按 `aieditorrspediting.xyz` 自动解析 |

（可选）若 GA ID 变更，改 `.github/workflows/deploy.yml` 里的 `NEXT_PUBLIC_GA_MEASUREMENT_ID`。

Actions 使用 **Node 22** + 项目内 `wrangler`（`pages deploy`）。`wrangler.toml` **不要**写 `[assets]`（那是 Worker 配置，会导致 Pages 部署失败）。

### 第 5 步：关闭 Cloudflare 侧的自动 Git 构建（避免双部署）

若 Pages/Worker 已 **Connect Git** 到同一仓库：

1. Cloudflare 项目 → **Settings** → **Build**（或 Git integration）。
2. **Disconnect repository** / 关闭自动构建，**或** 不再向该连接 push 触发构建。  
3. 只保留 **GitHub Actions** 作为唯一发布入口。

若从未连接 Git，可跳过；首次部署用 Actions 跑通即可。

### 第 6 步：提交工作流并触发

仓库内已有 `.github/workflows/deploy.yml`。推送到 `main` 后：

1. GitHub → **Actions** → 工作流 **Deploy to Cloudflare Pages**。
2. 应看到：Checkout → `npm ci` → `npm run build` → `pages deploy out` → **Purge Cloudflare CDN cache**。
3. 构建日志末尾应有：
   - `verify-static-assets: OK (... HTML files checked)`
   - `append-html-cache-headers: ... HTML routes`
4. Wrangler 输出部署 URL；生产域名仍在 Pages → **Custom domains** 绑定 `aieditorrspediting.xyz`。

**手动触发（等同空 push）：** Actions → 该工作流 → **Run workflow** → Branch `main`。

### 第 7 步：绑定自定义域名（一次性）

Cloudflare Pages 项目 → **Custom domains** → 添加 `aieditorrspediting.xyz`（及需要的 www 跳转）。  
DNS 在 Cloudflare _ZONE 里用 Pages 提供的 CNAME 即可。

### 第 8 步：部署后自检

- [ ] Actions 为绿色 ✅  
- [ ] https://aieditorrspediting.xyz/ 样式正常  
- [ ] Network：`/_next/static/css/*.css` → **200**  
- [ ] `/sitemap.xml`、`/robots.txt` → **200**

### 常见问题

| 现象 | 处理 |
|------|------|
| Actions 报 `Authentication error` | 检查 `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` |
| `Project not found` | Actions 会自动 `pages project create`；若仍失败，在 Dashboard 手动新建 **Pages** 项目 `aieditorrspediting`（不是 Worker） |
| `does not support "assets"` | 从 `wrangler.toml` 删除 `[assets]` 段（仅 Worker 用） |
| `Wrangler requires Node.js v22` | Actions 已用 Node 22；本地部署也需 Node 22+ |
| Purge 失败 | Token 需 **Zone Read** + **Cache Purge**；或手动设 `CLOUDFLARE_ZONE_ID` |
| 仍走 `npx wrangler deploy` | 关掉 Cloudflare Git 的 Worker 构建，只用 Actions 里的 `pages deploy out` |
| GitHub 红字 / fetch org failed | Cloudflare 里重连 GitHub App；Actions 部署**不依赖** Cloudflare 读 GitHub，只依赖你 push 到 GitHub |

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
3. Submit sitemap: `sitemap.xml`（资源请用 **https://aieditorrspediting.xyz**，不要用 www）  
   详见 [SEO-GSC.md](./SEO-GSC.md) 若抓取失败。

## GA4

1. Create Web stream → copy Measurement ID.
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Pages env → redeploy.

## Post-deploy smoke

- [ ] Home + `/prompts/` + one prompt page load on mobile
- [ ] Copy button works (HTTPS)
- [ ] `/robots.txt` and `/sitemap.xml` return 200
- [ ] Footer links: Privacy, Terms, Safe Use
- [ ] **Styles load** — DevTools → Network: `/_next/static/css/*.css` returns **200** (not 404)

### If CSS looks broken right after a deploy

**Cause:** Each build renames hashed files under `/_next/static/`. Cached **HTML** can still point at the previous CSS hash (e.g. `cda6942….css`), which 404s after the new deploy.

**Fix (already in repo):** `public/_headers` sets:

- `/*` → `Cache-Control: no-cache` + `CDN-Cache-Control: no-store` (HTML always fresh at Cloudflare edge)
- `/_next/static/*` → `immutable` long cache (safe because filenames are content-hashed)

After changing `_headers`, redeploy once. If a page still looks unstyled, hard-refresh (Cmd+Shift+R) or purge Cloudflare cache: **Caching** → **Configuration** → **Purge Everything** (one-time).

**Do not** enable “Cache Everything” page rules for `aieditorrspediting.xyz` — it will cache HTML and recreate this bug.

## Local verify before push

```bash
npm run build
npx serve out
```
