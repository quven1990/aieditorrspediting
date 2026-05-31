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
