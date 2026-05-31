# 前端实现与页面落地

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# 前端实现与页面落地 更新记录

## 2.2.0 — 2026-05-26

- 新增 Preflight：明确每个阶段需要的账号、Token、浏览器登录态和缺失处理。
- 增加安全索要话术：禁止在聊天里索要完整 token、密码、验证码、Cookie；优先使用 .env、Secrets 或浏览器登录。
- 增加可选 setup 检查脚本和 requirements.json，方便新手判断本地环境是否就绪。

## 2.1.0 — 2026-05-23

- 基于最新内部一键做站、上线验收和数据复盘流水线重写学员版。
- 统一输入契约、阶段流程、质量门槛、下游交接和 Prompt-first 使用方式。
- 增加关键闸门：新词硬闸、SEO-Copy Freeze、Route/Data Contract、Design Acceptance、PM Gate、QA_GO、SEO_GO、Compliance_GO、Crawler Hints、HTTPS/canonical、上线后 Kill/Iterate/Scale 复盘。
- 只做必要脱敏：移除私有路径、密钥、账号、内部群聊和生产配置细节，保留可执行方法。

## 1.2.1 — 2026-05-18

- 标准包结构版本：SKILL.md、USAGE、CHANGELOG、references、templates、scripts。



---

## SKILL.md

---
name: frontend-site-automation
title: 前端实现与页面落地
description: 把设计真源落成可访问前端：路由、页面、交互、SEO、分析埋点、Cloudflare 部署和源码同步。
version: 2.2.0
owner: ShipSolo
agent: mojie
category: 做站全流程
stage: 07-frontend
updated: 2026-05-26
student_level: intermediate
source: internal-site-building-flow-publicized
---

# 前端实现与页面落地

把设计真源落成可访问前端：路由、页面、交互、SEO、分析埋点、Cloudflare 部署和源码同步。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`07-frontend`
- 角色：把设计真源落成可访问前端：路由、页面、交互、SEO、分析埋点、Cloudflare 部署和源码同步。
- 上游：设计 handoff、PRD、SEO-Copy Freeze、Route Contract、合规文案。
- 下游：后端联调、SEO 复核、QA、上线运营。

## 什么时候使用

- 要把设计稿变成 Next.js/Cloudflare 站点
- 要修复上线前前端 P0
- 要检查 sitemap/robots/metadata/link/移动端
- 要保证 commit/push/deploy 同步

## 输入契约

开始前尽量准备：

- 代码仓库或初始化要求
- 设计 HTML/CSS 和资产
- route contract
- SEO copy freeze
- 后端 API/data contract
- Cloudflare 项目约束

缺信息时按这个规则处理：

- 影响结论、上线安全、生产数据或真实部署：输出 `[BLOCKED]`，列出缺失项和获取方式。
- 不影响当前阶段 v0 推进：标 `[待确认]`，继续产出可复核草案。
- 没有证据的数据、价格、趋势、法律结论、部署结果：不要编造。
- 密钥、Cookie、Token、支付后台、生产数据库、私有路径：只写变量名或 `[REDACTED]`。

## 开始前检查 / Preflight

先检查账号、Token、浏览器登录态。缺关键权限时要阻断提醒用户，不要假装完成。

### 需要准备
- 新手难度：high
- 账号/后台：
- GitHub
- Cloudflare Pages/Workers
- 分析工具账号（GA4/Clarity/Bing，按项目需要）
- 环境变量 / Token：
- GITHUB_TOKEN 或 gh 登录态
- CLOUDFLARE_API_TOKEN
- NEXT_PUBLIC_* 分析埋点 ID（按项目需要）
- 浏览器登录态：
- 目标站点预览 URL
- Cloudflare Dashboard 登录态（CLI 不足时）

### 缺失处理
- 不能 push/deploy 时：BLOCKED
- 生产域名/DNS/公开发布前必须人工确认
- 缺设计真源时不得自行编造 UI

### 可以降级继续
- 可本地实现和构建，但上线/部署不能 DONE

### 安全索要话术
```text
[BLOCKED: SETUP_REQUIRED]

当前阶段缺少必要账号、Token 或浏览器登录态。
请不要把完整 token、密码、验证码、Cookie 直接发到聊天里。

推荐处理方式：
1. Token / API Key：写入本机 .env 或对应平台的 Secrets，只回复“已配置”。
2. 浏览器登录态：在当前可见浏览器完成登录并保持页面打开，只回复“已登录”。
3. 如果你不确定在哪里配置，把平台名称告诉 AI，让 AI 给你逐步指引。
```

## 一键启动 Prompt

```text
你现在执行 ShipSolo 做站流水线的「前端实现与页面落地」阶段。

项目：[项目名称]
当前阶段：07-frontend
目标市场：[默认 US / English，可修改]
上游输入：[粘贴调研报告 / PRD / 定价 / 合规 / 文案 / 设计 / 代码 / 线上 URL / 数据截图]
限制条件：[时间、预算、技术栈、不能做什么]

请严格按这个 Skill 执行：
1. 先执行“开始前检查 / Preflight”和“输入契约”，缺关键账号、Token、浏览器登录态或关键资料就输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。
2. 如果可以推进，按“阶段流程”逐步产出。
3. 每个重要判断都写依据；没有依据就标 [待确认]。
4. 输出“交付物 + 验收清单自检 + 下游交接摘要”。
5. 涉及公开发布、生产部署、支付、真实用户数据时，先列确认项，不要擅自执行。
6. 最后一行只能是：[DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 阶段流程

### 1. 开工检查
确认 git remote、package scripts、设计真源、route contract、法律页、SEO 文案和后端合同。

### 2. 高保真转换
优先迁移 HTML/CSS 变量、字体、图标、布局；先静态还原再组件化和加交互。

### 3. 路由与 SEO
实现 sitemap/robots/metadata/canonical/schema；内部链接不得 #/404；noindex 页面不进 sitemap。

### 4. 交互落地
按站点类型实现真实任务：工具输入结果、目录筛选、地图 marker、详情页、登录/付费态等。

### 5. 分析闭环
至少一个线上 pageview/核心事件真实上报；无法配置 GA4 等就写明 fallback 和 Privacy。

### 6. 构建部署
lint/build/test → conventional commit → push → 同一 commit 部署 → smoke test → clean status。

### 7. 返修闭环
QA/SEO/PM NO-GO 后只修代码不算 GO，必须再派复核。


## 交付物

- 可访问 URL
- commit SHA 和分支
- 构建/部署日志摘要
- SEO/链接/移动端自检
- 分析事件清单
- 返修说明

## 验收清单 / 质量门槛

- [ ] 线上部署来自同一 commit
- [ ] 核心页面 200，内部链接无 #/404
- [ ] 移动端无横向滚动且触控可用
- [ ] 设计还原度达标
- [ ] Crawler Hints/HTTPS/canonical 等上线闸门明确

## 下游交接格式

```markdown
# 前端实现与页面落地交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：07-frontend
- 上游资料：

## 本阶段交付物
- 文件/内容：
- 核心判断：
- 已确认项：
- 待确认项：

## 质量门槛自检
- 通过项：
- 未通过项：

## 风险
- P0：
- P1：
- P2：

## 给下游的最小必要信息
- 下一阶段：后端联调、SEO 复核、QA、上线运营。
- 必须读取：
- 不能假设：
- 建议启动 Prompt：
```

## 学员怎么用

优先用自然语言，不要求会脚本：

1. 打开 `SKILL.md`。
2. 复制“一键启动 Prompt”。
3. 把你的项目资料填进方括号。
4. 发给 Hermes、OpenClaw、Claude、ChatGPT、Gemini、Cursor 等 AI 工具。
5. 让 AI 按“交付物”和“验收清单”输出，再把交接摘要交给下一阶段。

如果你使用 ShipSolo 一键安装包，安装后在新会话里直接说：

```text
请加载 ShipSolo Skill：frontend-site-automation，按我的项目资料执行。
```

## 常见坑

- 看图重写导致设计失真
- 只部署不提交/不 push
- 把 prototype/placeholder 放进 sitemap
- 用 mock 数据解锁主线但没有标 noindex

## 标准包内容

- `SKILL.md`：阶段入口、输入契约、一键启动 Prompt、流程与验收清单。
- `references/USAGE.md`：学员使用说明，主路径是复制 Prompt 给 AI。
- `requirements.json`：本阶段需要的账号、Token、浏览器登录态和阻断规则。
- `CHANGELOG.md`：本 Skill 独立版本说明。
- `references/stage-rubric.md`：本阶段脱敏判断规则。
- `templates/stage-handoff-template.md`：交给下游的统一摘要模板。
- `scripts/validate_handoff.py`：可选交接完整性检查脚本。
- `scripts/check_setup.py`：可选环境检查脚本，只检查变量是否存在，不打印 secret。

## 更新记录

### 2.2.0 — 2026-05-26
- 新增 Preflight：账号、Token、浏览器登录态、缺失阻断和安全索要话术。
- 更新一键启动 Prompt，要求先检查环境再执行，避免新手在无权限状态下误判 DONE。

### 2.1.0 — 2026-05-23
- 基于最新内部一键做站与数据复盘流水线重写学员版。
- 补齐新词硬闸、SEO-Copy Freeze、Route/Data Contract、PM Gate、QA_GO、Crawler Hints、上线后复盘等关键闸门。
- 保持 Prompt-first 使用方式，脚本仅作为可选辅助。

### 1.2.1 — 2026-05-18
- 标准包结构版本，包含使用说明、模板和辅助脚本。



---

## references/USAGE.md

# 前端实现与页面落地 使用说明

## 先说结论

这份 Skill 的主路径不是让你运行脚本，而是让你把“一键启动 Prompt”复制给 AI。脚本只是可选辅助，用来检查交接是否完整。

## 开始前先准备

这一版新增 Preflight。先确认缺什么，再让 AI 执行，避免跑到一半才发现没权限。

- 账号/后台：GitHub、Cloudflare Pages/Workers、分析工具账号（GA4/Clarity/Bing，按项目需要）
- 环境变量 / Token：GITHUB_TOKEN 或 gh 登录态、CLOUDFLARE_API_TOKEN、NEXT_PUBLIC_* 分析埋点 ID（按项目需要）
- 浏览器登录态：目标站点预览 URL、Cloudflare Dashboard 登录态（CLI 不足时）
- 缺关键权限时：让 AI 输出 `[BLOCKED: SETUP_REQUIRED]`，不要让它猜、不要让它假装完成。
- 安全规则：不要把完整 token、密码、验证码、Cookie 发到聊天；优先写入 `.env`、平台 Secrets，或在浏览器里完成登录。

## 推荐使用方式：复制 Prompt 给 AI

1. 打开 `SKILL.md`，复制 `一键启动 Prompt`。
2. 把 `[项目名称]`、`[上游输入]`、`[限制条件]` 换成你的真实资料。
3. 要求 AI 先做输入检查，再执行阶段流程。
4. AI 输出后，对照 `验收清单 / 质量门槛` 检查。
5. 把 `下游交接摘要` 复制给下一阶段 Skill。

可直接复制：

```text
请按 ShipSolo 学员版 Skill「前端实现与页面落地」执行。
项目：[填写项目]
当前阶段：07-frontend
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：07-frontend
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] 线上部署来自同一 commit
- [ ] 核心页面 200，内部链接无 #/404
- [ ] 移动端无横向滚动且触控可用
- [ ] 设计还原度达标
- [ ] Crawler Hints/HTTPS/canonical 等上线闸门明确

## 可选辅助材料

- `references/stage-rubric.md`：本阶段判断规则。
- `templates/stage-handoff-template.md`：把输出整理成下游能接的格式。
- `scripts/validate_handoff.py`：可选脚本，检查交接摘要是否包含状态、风险和下一步。

## 如果你要使用脚本

把下面这段发给 AI，让它解释怎么用，而不是自己硬跑：

```text
请阅读 scripts/validate_handoff.py，告诉我它检查什么、需要什么输入、如何在我的电脑上安全运行。如果我不懂命令行，请给我不用脚本的替代检查方式。
```

## 交给下一阶段

完成后复制这三块给下一阶段：

- 本阶段交付物。
- 验收清单自检结果。
- 下游交接摘要，尤其是 `[BLOCKED]`、`[待确认]` 和 P0/P1/P2 风险。



---

## references/feishu-tutorial.md

## 第二部分：OpenClaw / Hermes 自动化

### 前置环境要求

使用自动化前，确保以下环境已就绪（在服务器上跑命令）：

```
# 1. GitHub CLI 已登录
gh auth status

# 2. Cloudflare CLI 已登录
wrangler whoami
```

### 安装方式

把压缩包解压到 Hermes Skills 目录：

```
mkdir -p ~/.hermes/skills/software-development/frontend-site-automation
unzip frontend-site-automation-skill.zip
cp -r frontend-site-automation-skill/* ~/.hermes/skills/software-development/frontend-site-automation/
```

重启 Hermes / 新开会话后生效。

### 输入材料

至少准备：

```
域名
项目名
PRD 或产品说明
设计交付包目录
GitHub owner
联系邮箱
```

设计交付包建议结构：

```
design-handoff/
├── HANDOFF.md
├── PRD.md
├── landing.html
├── *.html
├── *.png
└── assets/
```

### 推荐输入模板

复制模板：

```
cp ~/.hermes/skills/software-development/frontend-site-automation/templates/site-inputs.yaml.md ./site-inputs.yaml.md
```

填写：

```
domain: example.com
project_name: example
github_owner: your-github-name
workdir: /root/projects/example
design_dir: /absolute/path/to/design-handoff
prd_path: /absolute/path/to/PRD.md
contact_email: hello@example.com
cloudflare_target: workers

analytics:
  plausible_domain:
  ga_id:
  clarity_id:
  ahrefs_analytics_id:
  gsc_verification:

deployment:
  use_cloudflare_git_integration: true
  bind_custom_domain: true
  configure_email_routing: true
```

---

### 对 Agent 怎么说

最短用法：

```
使用 frontend-site-automation skill，把这个 PRD + 设计交付包自动做成 Next.js + Cloudflare Workers 网站。
```

推荐完整 Prompt：

```
使用 frontend-site-automation skill 自动做站。

输入：
- 域名：example.com
- 项目名：example
- GitHub owner：your-github-name
- 设计交付包：/absolute/path/to/design-handoff
- PRD：/absolute/path/to/PRD.md
- 联系邮箱：hello@example.com

要求：
1. 默认使用 Next.js + TypeScript + Tailwind CSS + OpenNext + Cloudflare Workers。
2. 不要使用 Cloudflare Pages。
3. 不要配置 output: "export"。
4. 不要使用 dangerouslySetInnerHTML。
5. 把设计稿 HTML 按 section 拆成 React 组件。
6. 补齐 /privacy-policy、/terms-of-service、sitemap.ts、robots.ts。
7. 如果提供了追踪 ID，就接入 Plausible / GA4 / Clarity / Ahrefs / GSC。
8. 检查 320 / 375 / 390 / 768 / 1024 移动端宽度。
9. 部署前运行 npm run build 和 npm run preview。
10. 如果 gh auth status 和 wrangler whoami 都通过，就部署到 Cloudflare Workers。
11. 最后输出实施报告。
```

---

## 第三部分：手动实操 — 从零开始的完整步骤

### 环境准备

#### 必须安装的工具

```
# Node.js 18+
node -v    # 需要 v18 或更高

# GitHub CLI
brew install gh        # macOS
winget install GitHub.cli  # Windows
gh auth login          # 登录

# Cloudflare CLI
npm install -g wrangler
wrangler login         # 登录

# 验证
gh auth status
wrangler whoami
```

#### 必须准备的素材

### 第一步：创建项目（10 分钟）

#### 创建 GitHub 仓库

```
gh repo create 你的用户名/项目名 --private --clone
cd 项目名
```

#### 初始化 Next.js + Cloudflare Workers 项目

使用 Cloudflare 官方的 C3 工具创建项目：

```
npm create cloudflare@latest -- . --framework=next
```

这个命令会帮你创建：

- Next.js
- TypeScript
- Tailwind CSS
- OpenNext Cloudflare Adapter
- Cloudflare Workers 配置
- Wrangler 配置
如果过程中出现问题，按这个方向选择：

```
框架：Next.js
语言：TypeScript
包管理器：npm
是否部署：No
```

#### 项目目录结构

跑完后，核心目录大概是这样：

```
项目名/
├── src/
│   ├── app/
│   │   ├── layout.tsx       ← 全局布局
│   │   ├── page.tsx         ← 首页
│   │   ├── globals.css      ← 全局样式
│   │   ├── favicon.ico      ← 浏览器图标
│   │   ├── icon.png         ← App / PWA 图标
│   │   └── apple-icon.png   ← iOS 图标
├── public/                  ← 静态资源
├── wrangler.jsonc           ← Cloudflare Workers 配置
├── open-next.config.ts      ← OpenNext 配置，可能由模板生成
├── next.config.ts           ← Next.js 配置
└── package.json
```

#### 清理默认资源

先清理掉默认 SVG：

```
rm -f public/next.svg public/vercel.svg
```

然后把首页清空成最小可运行版本：

```
// src/app/page.tsx
export default function Home() {
  return <div>Hello World</div>;
}
```

清理全局样式，只保留 Tailwind 入口：

```
/* src/app/globals.css */
@import "tailwindcss";
```

#### 放入设计稿

```
mkdir design-v3
cp -r /path/to/设计交付包/* design-v3/
```

目录变成：

```
项目名/
├── design-v3/              ← 设计交付包
│   ├── HANDOFF.md
│   ├── landing.html
│   ├── assets/
│   └── ...
├── src/
├── public/
├── wrangler.jsonc
└── package.json
```

如果用 Tailwind v4，需要让 Tailwind 扫描设计稿 HTML。

在 src/app/globals.css 里添加：

```
@import "tailwindcss";

@source "../../design-v3";

@theme {
  /* 从设计稿 tailwind.config 提取所有 CSS 变量 */
  --color-primary: #71ffe8;
  --color-primary-container: #00e5cc;
  /* ... */
}
```

#### 放入 favicon 和分享图

建议准备这几个文件：

#### 本地运行

先跑开发服务：

```
npm run dev
```

访问：

http://localhost:3000

这一步主要看页面能不能正常开发。

所以部署前还必须跑：

```
npm run preview
```

npm run preview 会用 Cloudflare 的 Workers runtime 预览，更接近线上环境。

#### 首次提交

确认能跑起来后，提交第一版代码：

```
git add -A
git commit -m "chore: init next.js cloudflare workers project"
git push origin main
```

### 第二步：代码落地 — 设计稿变 React 组件（30 分钟）

这一步是整个前端流程里最核心的一步。

#### 先识别页面结构

打开设计稿 HTML，先不要急着写代码。

先识别它的页面结构。

一个 Landing Page 通常可以拆成：

```
Landing Page
├── Header
├── HeroSection
├── FeaturesSection
├── DemoSection
├── HowItWorksSection
├── PricingSection
├── FAQSection
├── CTASection
└── Footer
```

SEO 子页面通常可以拆成：

```
SEO Page
├── Header
├── SeoHeroSection
├── ToolSection
├── UseCasesSection
├── FAQSection
├── RelatedPagesSection
└── Footer
```

#### 创建组件目录

先创建目录：

```
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/ui
```

推荐结构：

```
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── privacy-policy/
│   └── terms-of-service/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── DemoSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── CTASection.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Card.tsx
```

这样后面做多个页面时，不会变成一堆大文件。

#### 用 AI 辅助把 HTML 转成 React 组件

可以把设计稿 HTML 按 section 分段粘给 AI。

不要一次性丢整页。

整页太长，容易漏、容易乱、容易生成不可维护代码。

推荐提示词：

```
把下面这段 HTML 转换成 React TypeScript 组件，适配 Next.js App Router。

要求：
- 保留原来的 Tailwind class
- class 改为 className
- for 改为 htmlFor
- 自闭合标签补全，例如 <img />、<br />
- 删除 <script> 标签
- 删除 <html>、<head>、<body> 外壳
- 只输出一个组件
- 组件名：[组件名]
- 不要使用 dangerouslySetInnerHTML
- 不要引入额外依赖
- 普通展示组件不要加 "use client"
- 只有需要 useState / onClick / 表单交互时才加 "use client"

HTML：
[粘贴某一个 section 的 HTML]
```

如果是 FAQ、Tab、价格切换这类交互组件，用这个提示词：

```
把下面这段 HTML 转换成 React TypeScript 组件，适配 Next.js App Router。

这是一个有交互的组件，需要：
- 文件顶部加 "use client"
- 使用 useState 管理展开/收起状态
- 保留原来的 Tailwind class
- class 改为 className
- 不要使用 dangerouslySetInnerHTML
- 不要直接操作 DOM
- 不要使用 document.querySelector
- 输出完整组件代码

HTML：
[粘贴 HTML]
```

#### 示例：FAQSection

FAQ 通常需要展开 / 收起。

这里可以用 React state。

```
"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is this AI character generator free?",
    answer:
      "Yes. You can generate basic character ideas for free. Advanced features may require a paid plan.",
  },
  {
    question: "Can I use the characters commercially?",
    answer:
      "You can use generated ideas in your projects, but you should review the final output before commercial use.",
  },
  {
    question: "Does it work for games and stories?",
    answer:
      "Yes. It works for game characters, story characters, avatars, roleplay profiles, and creative prompts.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-gray-950 py-24 text-white">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key=[REDACTED]
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between text-left font-semibold"
                >
                  <span>{faq.question}</span>
                  <span>{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <p className="mt-4 text-gray-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

#### 组装首页

所有 section 写好后，在首页组装：

```
// src/app/page.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
```

#### 替换占位内容

逐个替换 Stitch 的占位文案为真实定稿内容：

- [ ] Hero 标题 / 副标题
- [ ] 功能描述
- [ ] 定价信息（Plan 名称、价格、权益）
- [ ] FAQ 问答
- [ ] CTA 文案
- [ ] Footer 信息
- [ ] 页面 metadata
#### 替换图片

先把图片放到 public/images：

```
mkdir -p public/images
cp -r design-v3/assets/* public/images/
```

普通图片可以先用：

```
<img
  src="/images/hero.png"
  alt="AI Character Generator"
  className="w-full rounded-2xl"
/>
```

Hero 大图、影响 LCP 的图片，再考虑用 next/image：

```
import Image from "next/image";

<Image
  src="/images/hero.png"
  alt="AI Character Generator"
  width={800}
  height={600}
  priority
/>
```

#### 链接串联（强制，开工第一件事）

#### 交叉导航（强制）

每个子页面底部、footer 之前，加一个"浏览所有页面"区块：

```
<section className="py-20 px-8 border-t">
  <div className="mx-auto max-w-6xl">
    <h2 className="mb-6 text-3xl font-bold">
      Browse All Generators
    </h2>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <a href="/">Home</a>
      <a href="/anime-character-generator">Anime</a>
      <a
        href="/dnd-character-generator"
        className="border-primary text-primary"
      >
        DnD Character Generator
      </a>
    </div>
  </div>
</section>
```

#### 法律页（自写，不需要设计稿）

每个站点至少要有：

- /privacy-policy
- /terms-of-service
创建目录：

```
mkdir -p src/app/privacy-policy src/app/terms-of-service
```

把之前合规生成的文案放进去就好。

### 第四步：接入数据追踪（15 分钟）

#### 五个平台各有分工

这几个工具不是互相替代，而是分工不同。

#### 创建 Analytics 组件

新建：

```
mkdir -p src/components
touch src/components/Analytics.tsx
```

写入：

```
// src/components/Analytics.tsx
import Script from "next/script";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL ||
  "https://plausible.io/js/script.js";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const AHREFS_ID = process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_ID;

function PlausibleScript() {
  if (!PLAUSIBLE_DOMAIN) return null;

  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src={PLAUSIBLE_SCRIPT_URL}
      strategy="afterInteractive"
    />
  );
}

function GA4Script() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

function ClarityScript() {
  if (!CLARITY_ID) return null;

  return (
    <Script id="clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);
          t.async=1;
          t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}

function AhrefsScript() {
  if (!AHREFS_ID) return null;

  return (
    <Script
      src="https://analytics.ahrefs.com/analytics.js"
      data-key=[REDACTED]
      strategy="afterInteractive"
    />
  );
}

export function AnalyticsScripts() {
  return (
    <>
      <PlausibleScript />
      <GA4Script />
      <ClarityScript />
      <AhrefsScript />
    </>
  );
}
```

#### 加到全局 Layout

```
// src/app/layout.tsx
import type { Metadata } from "next";
import { AnalyticsScripts } from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Your Site Name",
  description: "Your site description.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
```

#### 配置环境变量

本地开发用 。env.local:

```
# .env.local，不提交到 Git
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=你的域名.com
NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL=https://plausible.io/js/script.js

NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
NEXT_PUBLIC_AHREFS_ANALYTICS_ID=xxxxxxxxxx
```

#### 怎么拿到这些 ID（手动方式）

##### GA4

analytics.google.com → 管理 → 创建媒体资源 → Web 数据流 → 拿到 G- 开头的 Measurement ID

##### Clarity

clarity.microsoft.com → New Project → 填域名 → 拿到 Project ID

##### Ahrefs

app.ahrefs.com → Web Analytics → 添加项目 → 拿到 data-key

##### GSC

search.google.com/search-console → 添加资源 → URL 前缀 → HTML 标记验证 → 拿到 content 值

##### Plausible

https://plausible.shipsolo.io/后台添加站点；data-domain 就填你的域名

#### 自定义事件追踪

新建：

```
mkdir -p src/lib
touch src/lib/analytics.ts
```

写入：

```
// src/lib/analytics.ts
type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: EventProps }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, props?: EventProps) {
  if (typeof window === "undefined") return;

  if (window.plausible) {
    window.plausible(name, { props });
  }

  if (window.gtag) {
    window.gtag("event", name, props || {});
  }
}
```

在 CTA 按钮上调用：

```
"use client";

import { trackEvent } from "@/lib/analytics";

export function HeroCTA() {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("cta_click", {
          location: "hero",
          destination: "generator",
        });
      }}
    >
      Get Started
    </button>
  );
}
```

#### 推荐事件命名规范

不要随便写事件名。

建议统一用小写蛇形命名：

- cta_click
- hero_cta_click
- pricing_cta_click
- faq_open
- example_click
- tool_submit
- tool_result_view
- copy_result_click
- download_click
- outbound_click
事件属性也要统一：

```
trackEvent("cta_click", {
  location: "hero",
  destination: "generator",
});
```

常用属性：

### 第五步：移动端检查（10 分钟）

对 SEO 工具站来说，大量流量来自手机。

如果移动端标题溢出、按钮太小、菜单打不开，用户会直接走。

这一节重点检查三件事：

- 能不能看
- 能不能点
- 有没有横向滚动
#### 检查方法

1. Chrome DevTools → F12 → 点手机图标
1. 逐设备检查：
#### 检查清单

- [ ] 没有横向滚动条（最常见的移动端 bug）
- [ ] 文字能读（标题不溢出、正文不太小）
- [ ] 按钮够大（至少 44×44px）
- [ ] 图片不变形
- [ ] 汉堡菜单能打开/关闭
- [ ] 定价卡片信息完整
#### 常见修复

##### 标题小屏太大

不要写固定大字号：

```
<h1 className="text-6xl">
```

改成响应式：

```
<h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
  AI Character Generator
</h1>
```

##### 内容容器溢出

给 section 和容器加安全边距：

```
<section className="overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">
    ...
  </div>
</section>
```

##### 图片撑破容器

```
<img
  src="/images/hero.png"
  alt="Hero preview"
  className="h-auto w-full max-w-full rounded-2xl"
/>
```

##### 按钮移动端太挤

```
<a
  href="#generator"
  className="inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 py-3 text-center font-semibold sm:w-auto"
>
  Start Generating
</a>
```

##### 多列布局小屏溢出

不要小屏就三列：

```
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  ...
</div>
```

##### 长文本 / URL 撑破页面

```
<p className="break-words">
  ...
</p>
```

如果是代码块：

```
<pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words">
  <code>...</code>
</pre>
```

##### iOS 输入框自动放大

iOS 上 input 字号小于 16px 时，聚焦会自动放大页面。

全局加：

```
input,
select,
textarea {
  font-size: 16px;
}
```

或者 Tailwind：

```
<input className="min-h-11 w-full rounded-xl px-4 text-base" />
```

### 第六步：部署上线（10 分钟）

这一步的目标是把本地 Next.js 项目部署到 Cloudflare Workers。

流程是：

```
本地构建
  ↓
Workers runtime 预览
  ↓
提交代码
  ↓
部署到 Cloudflare Worker
  ↓
绑定域名
  ↓
配置环境变量和邮箱
```

#### 部署前本地检查

部署前先跑两条命令：

```
npm run build
npm run preview
```

含义：

#### 代码提交（部署前必做）

确认 build 和 preview 都没问题后，再提交代码：

```
git status
git add -A
git commit -m "feat: launch site on cloudflare workers"
git push origin main
```

#### 部署到 Cloudflare Workers

##### 方法 A：命令行部署

如果项目是用 C3 创建的，通常已经有部署脚本：

```
npm run deploy
```

部署成功后，会得到一个 Worker 地址，类似：

```
https://项目名.你的账号.workers.dev
```

##### 方法 B：Cloudflare Git Integration（推荐）

站点矩阵更推荐接 GitHub / GitLab 自动部署。

路径：

推荐配置：

#### 域名和 DNS 配置

##### 购买域名

参见 [域名购买](https%3A%2F%2Fmy.feishu.cn%2Fwiki%2FESJXwViP3isGwykztGGcDDBjnrg%23share-JxbydIrfYo6pCgxaJz7c3RKGnCd)

##### 把域名接入 Cloudflare

如果域名不是在 CF 买的：

1. CF Dashboard → Add a site → 输入域名
1. 选 Free plan
1. CF 给你两个 NS 记录
1. 去域名注册商 → 改 Nameserver → 填 CF 给的两个 NS
1. 等 DNS 传播（通常 10 分钟，最长 48 小时）
#### 绑定域名

部署成功后，把正式域名绑定到 Worker。

方法 A：Cloudflare Dashboard

输入：

- yourdomain.com
- www.yourdomain.com
方法 B：命令行配置 Route

如果想用 wrangler.jsonc 管理，也可以配置 route。

示例：

```
{
  "name": "your-project",
  "compatibility_date": "2026-04-30",
  "routes": [
    {
      "pattern": "yourdomain.com/*",
      "zone_name": "yourdomain.com"
    },
    {
      "pattern": "www.yourdomain.com/*",
      "zone_name": "yourdomain.com"
    }
  ]
}
```

然后部署：

```
npm run deploy
```

#### 配置线上环境变量

Cloudflare Workers 里要区分两类变量。

##### 第一类：构建期变量

例如：

- NEXT_PUBLIC_PLAUSIBLE_DOMAIN
- NEXT_PUBLIC_GA_ID
- NEXT_PUBLIC_CLARITY_ID
- NEXT_PUBLIC_AHREFS_ANALYTICS_ID
这些变量会被打进前端 JS 包。

它们不是 secret。

如果使用 Cloudflare Git Integration，要配置在：

改完后需要重新触发 build。

##### 第二类：运行时变量 / Secrets

例如：

- DATABASE_URL
- OPENAI_API_KEY
- RESEND_API_KEY
- AUTH_SECRET
这些是 Worker 运行时使用的，不应该暴露到前端。

配置位置：

或命令行：

```
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put AUTH_SECRET
```

如果项目用 D1 / KV / R2 / Queues，需要在 wrangler.jsonc里配置 bindings：

```
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "your-project-db",
      "database_id": "xxxx"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "xxxx"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2",
      "bucket_name": "your-project-assets"
    }
  ]
}
```

#### 域名邮箱

域名邮箱不是部署必须项，但建议上线当天一起配置。

用 Cloudflare Email Routing 可以免费做收信转发。

路径：

添加规则：

- hello@yourdomain.com → yourname@gmail.com
- support@yourdomain.com → yourname@gmail.com
然后去目标 Gmail 里确认验证邮件。（可以自己给自己发一个邮件）

#### 部署后验收

---



---

## references/frontend-quality-gate.md

# 前端实现与页面落地 — 内部能力脱敏参考

## 阶段核心能力

Next.js/Cloudflare 取舍、SEO 元信息、埋点、响应式、predeploy 检查

## 执行顺序

1. 先读上游交接摘要，确认输入是否满足契约。
2. 缺关键输入时输出 `[BLOCKED]`，不要编造数据或替用户做高风险决策。
3. 可推进时按 `SKILL.md` 的 Phase 顺序执行，所有依据写来源或标 `[待确认]`。
4. 完成后用模板生成交付物，再运行脚本做最小校验。
5. 最后一段写下游交接摘要，状态只能是 `[DONE] / [BLOCKED] / [NEEDS_REVIEW]`。

## 质量门槛

- [ ] 无 Lorem/TODO/href=#
- [ ] title/meta/OG/canonical 完整
- [ ] 关键事件命名统一
- [ ] 不能把 secret 写到前端

## 脱敏边界

- 可以保留流程、字段、判断标准、模板、脚本骨架。
- 不保留真实 API Key、Cookie、Token、内部路径、生产库名、群聊 ID、真实客户数据。
- 公开示例统一用 `[PROJECT]`、`[DOMAIN]`、`[API_KEY]`、`[ACCOUNT]` 这类占位符。



---

## references/stage-rubric.md

# 前端实现与页面落地 阶段判断规则

## 本阶段目标

把设计真源落成可访问前端：路由、页面、交互、SEO、分析埋点、Cloudflare 部署和源码同步。

## 必须保留的内部流程精华（已脱敏）

### 1. 开工检查
确认 git remote、package scripts、设计真源、route contract、法律页、SEO 文案和后端合同。

### 2. 高保真转换
优先迁移 HTML/CSS 变量、字体、图标、布局；先静态还原再组件化和加交互。

### 3. 路由与 SEO
实现 sitemap/robots/metadata/canonical/schema；内部链接不得 #/404；noindex 页面不进 sitemap。

### 4. 交互落地
按站点类型实现真实任务：工具输入结果、目录筛选、地图 marker、详情页、登录/付费态等。

### 5. 分析闭环
至少一个线上 pageview/核心事件真实上报；无法配置 GA4 等就写明 fallback 和 Privacy。

### 6. 构建部署
lint/build/test → conventional commit → push → 同一 commit 部署 → smoke test → clean status。

### 7. 返修闭环
QA/SEO/PM NO-GO 后只修代码不算 GO，必须再派复核。


## 质量门槛

- [ ] 线上部署来自同一 commit
- [ ] 核心页面 200，内部链接无 #/404
- [ ] 移动端无横向滚动且触控可用
- [ ] 设计还原度达标
- [ ] Crawler Hints/HTTPS/canonical 等上线闸门明确

## 常见失败模式

- 看图重写导致设计失真
- 只部署不提交/不 push
- 把 prototype/placeholder 放进 sitemap
- 用 mock 数据解锁主线但没有标 noindex

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## requirements.json

{
  "id": "frontend-site-automation",
  "difficulty": "high",
  "accounts": [
    "GitHub",
    "Cloudflare Pages/Workers",
    "分析工具账号（GA4/Clarity/Bing，按项目需要）"
  ],
  "env": [
    "GITHUB_TOKEN 或 gh 登录态",
    "CLOUDFLARE_API_TOKEN",
    "NEXT_PUBLIC_* 分析埋点 ID（按项目需要）"
  ],
  "browserSessions": [
    "目标站点预览 URL",
    "Cloudflare Dashboard 登录态（CLI 不足时）"
  ],
  "blockingRules": [
    "不能 push/deploy 时：BLOCKED",
    "生产域名/DNS/公开发布前必须人工确认",
    "缺设计真源时不得自行编造 UI"
  ],
  "canContinueWithout": [
    "可本地实现和构建，但上线/部署不能 DONE"
  ]
}



---

## scripts/check_placeholder_content.py

#!/usr/bin/env python3
"""前端实现与页面落地 最小校验脚本。用法：python scripts/check_placeholder_content.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['无 Lorem/TODO/href=#', 'title/meta/OG/canonical 完整', '关键事件命名统一', '不能把 secret 写到前端']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 前端实现与页面落地 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))



---

## scripts/check_setup.py

#!/usr/bin/env python3
"""Optional ShipSolo learner setup checker. It never prints secret values."""
from pathlib import Path
import os, json, shutil

ROOT = Path(__file__).resolve().parents[1]
REQ_FILE = ROOT / "requirements.json"
req = json.loads(REQ_FILE.read_text(encoding="utf-8")) if REQ_FILE.exists() else {}
print(f"ShipSolo setup check: {req.get('id', ROOT.name)}")
print("\nEnvironment variables:")
for name in req.get("env", []):
    key = name.split()[0].split('（')[0].strip()
    ok = bool(os.getenv(key))
    print(f"- {'OK' if ok else 'MISSING'} {key}")
print("\nCommon commands:")
for cmd in ["git", "node", "npm", "python3", "curl", "wrangler", "gh"]:
    print(f"- {'OK' if shutil.which(cmd) else 'missing'} {cmd}")
print("\nBrowser/login requirements:")
for item in req.get("browser", []):
    print(f"- manual check: {item}")
print("\nNote: this script only checks local readiness. It cannot verify every web login state.")



---

## scripts/validate_handoff.py

#!/usr/bin/env python3
"""Minimal public handoff validator for ShipSolo student skills."""
from pathlib import Path
import sys
required = ["[DONE]", "[BLOCKED]", "[NEEDS_REVIEW]"]
text = Path(sys.argv[1]).read_text(encoding="utf-8") if len(sys.argv) > 1 else sys.stdin.read()
checks = {
    "has_status": any(x in text for x in required),
    "has_risk": "P0" in text and "P1" in text and "P2" in text,
    "has_next": "下一" in text or "handoff" in text.lower(),
}
for k, v in checks.items():
    print(f"{k}: {'PASS' if v else 'FAIL'}")
if not all(checks.values()):
    raise SystemExit(1)



---

## templates/analytics-events.ts

// ShipSolo 学员版：前端埋点事件模板
// 只保留事件名和字段约定，不包含任何生产 Measurement ID 或密钥。

export type AnalyticsEventName =
  | "pageview"
  | "cta_click"
  | "tool_start"
  | "tool_complete"
  | "pricing_click"
  | "signup"
  | "purchase_start";

export type AnalyticsPayload = {
  project?: string;
  page?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  plan?: string;
  tool?: string;
  status?: "success" | "failed" | "blocked";
};

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  // Plausible 示例：window.plausible?.(name, { props: payload });
  // GA4 示例：window.gtag?.("event", name, payload);
  console.info("analytics:event", name, payload);
}

export const requiredEvents: AnalyticsEventName[] = [
  "pageview",
  "cta_click",
  "tool_start",
  "tool_complete",
  "pricing_click",
  "signup",
  "purchase_start",
];



---

## templates/stage-handoff-template.md

# 阶段交接摘要模板

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 输入来源
- 上游阶段：
- 关键材料：
- 待确认项：

## 本阶段交付物
- 文件/链接：
- 核心判断：
- 证据：

## 风险分级
- P0：
- P1：
- P2：

## 给下一阶段的最小必要信息
- 下一阶段：
- 必须读取：
- 不能改动：
- 启动 Prompt：

