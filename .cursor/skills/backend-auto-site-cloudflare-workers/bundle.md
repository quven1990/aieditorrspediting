# Cloudflare 后端与会员系统

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# Cloudflare 后端与会员系统 更新记录

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
name: backend-auto-site-cloudflare-workers
title: Cloudflare 后端与会员系统
description: 用 Cloudflare Workers/D1/R2/Auth/API 支撑小站：登录、会员、内容、订单、资产和前端可消费数据合同。
version: 2.2.0
owner: ShipSolo
agent: moshu
category: 做站全流程
stage: 08-backend
updated: 2026-05-26
student_level: intermediate
source: internal-site-building-flow-publicized
---

# Cloudflare 后端与会员系统

用 Cloudflare Workers/D1/R2/Auth/API 支撑小站：登录、会员、内容、订单、资产和前端可消费数据合同。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`08-backend`
- 角色：用 Cloudflare Workers/D1/R2/Auth/API 支撑小站：登录、会员、内容、订单、资产和前端可消费数据合同。
- 上游：PRD、定价、合规、前端数据需求。
- 下游：前端联调、QA、上线运营、数据复盘。

## 什么时候使用

- 站点需要登录、会员、内容库、上传、离线订单或 AI API
- 要设计 D1/R2 schema 和 Workers API
- 要给前端可消费 data contract
- 要避免 secrets/生产数据被误提交

## 输入契约

开始前尽量准备：

- 用户/会员/订单/内容模型
- entitlement 规则
- R2 文件类型和权限
- Auth 提供商
- API 合约
- 环境变量清单

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
- Cloudflare
- Google OAuth Console（如有登录）
- Stripe/支付后台（如有在线支付）
- 环境变量 / Token：
- CLOUDFLARE_API_TOKEN
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET（如有登录）
- STRIPE_SECRET_KEY（如有支付）
- SESSION_SECRET
- 浏览器登录态：
- Cloudflare Dashboard 登录态
- Google Cloud Console 登录态
- Stripe Dashboard 登录态（如有）

### 缺失处理
- 缺 Cloudflare 权限不能创建/迁移 D1/R2/Workers：BLOCKED
- 缺 OAuth/支付密钥不能完成登录/支付闭环
- 不得要求用户在聊天里发送完整 secret

### 可以降级继续
- 可先输出 schema/API 合同和本地 mock，但不能上线 GO

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
你现在执行 ShipSolo 做站流水线的「Cloudflare 后端与会员系统」阶段。

项目：[项目名称]
当前阶段：08-backend
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

### 1. 架构确认
优先 Cloudflare 全栈：Pages/Workers、D1、R2、KV/Queues（按需）、Google/Auth、Webhook。

### 2. 数据合同
给前端 machine-readable schema/seed/manifest，不只写 Markdown；区分 fixture、launch_data、seo_index。

### 3. API 合约
列 endpoint、method、auth、request/response、错误码、rate limit、权限。

### 4. 迁移与 seed
D1 migrations 可重复执行；R2 bucket/公开访问/签名 URL 明确；seed 数据有来源和 checksum。

### 5. 权限与开通
会员 entitlement、离线订单、人工开通、管理员操作日志都要可验。

### 6. 安全与合规
secret 只放环境变量；不打印 token；用户上传/日志/删除策略与 Privacy 一致。

### 7. 联调
前端用真实 API 或明确 fixture，不得把 mock 当生产。


## 交付物

- 架构说明
- D1 schema/migration
- API contract
- R2/asset plan
- env vars checklist
- 联调/seed 报告

## 验收清单 / 质量门槛

- [ ] 前端拿到机器可读数据合同
- [ ] 生产 secrets 没进代码
- [ ] auth/权限/错误态可测
- [ ] 远端 migration 和本地 schema 对齐
- [ ] 合规披露和实际数据流一致

## 下游交接格式

```markdown
# Cloudflare 后端与会员系统交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：08-backend
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
- 下一阶段：前端联调、QA、上线运营、数据复盘。
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
请加载 ShipSolo Skill：backend-auto-site-cloudflare-workers，按我的项目资料执行。
```

## 常见坑

- 只有后端说明，没有 schema/API 文件
- 在日志或文档里暴露 token
- confirmed 数据不足还让前端当真实上线
- 管理员开通没有审计记录

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

# Cloudflare 后端与会员系统 使用说明

## 先说结论

这份 Skill 的主路径不是让你运行脚本，而是让你把“一键启动 Prompt”复制给 AI。脚本只是可选辅助，用来检查交接是否完整。

## 开始前先准备

这一版新增 Preflight。先确认缺什么，再让 AI 执行，避免跑到一半才发现没权限。

- 账号/后台：Cloudflare、Google OAuth Console（如有登录）、Stripe/支付后台（如有在线支付）
- 环境变量 / Token：CLOUDFLARE_API_TOKEN、GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET（如有登录）、STRIPE_SECRET_KEY（如有支付）、SESSION_SECRET
- 浏览器登录态：Cloudflare Dashboard 登录态、Google Cloud Console 登录态、Stripe Dashboard 登录态（如有）
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
请按 ShipSolo 学员版 Skill「Cloudflare 后端与会员系统」执行。
项目：[填写项目]
当前阶段：08-backend
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：08-backend
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] 前端拿到机器可读数据合同
- [ ] 生产 secrets 没进代码
- [ ] auth/权限/错误态可测
- [ ] 远端 migration 和本地 schema 对齐
- [ ] 合规披露和实际数据流一致

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

## references/cloudflare-backend-architecture.md

# Cloudflare 后端与会员系统 — 内部能力脱敏参考

## 阶段核心能力

Workers/D1/R2/KV、Auth Session、AI Proxy、额度、Stripe Webhook 幂等

## 执行顺序

1. 先读上游交接摘要，确认输入是否满足契约。
2. 缺关键输入时输出 `[BLOCKED]`，不要编造数据或替用户做高风险决策。
3. 可推进时按 `SKILL.md` 的 Phase 顺序执行，所有依据写来源或标 `[待确认]`。
4. 完成后用模板生成交付物，再运行脚本做最小校验。
5. 最后一段写下游交接摘要，状态只能是 `[DONE] / [BLOCKED] / [NEEDS_REVIEW]`。

## 质量门槛

- [ ] 前端不直连模型 API
- [ ] Webhook 幂等
- [ ] Session httpOnly/secure
- [ ] env 只写变量名

## 脱敏边界

- 可以保留流程、字段、判断标准、模板、脚本骨架。
- 不保留真实 API Key、Cookie、Token、内部路径、生产库名、群聊 ID、真实客户数据。
- 公开示例统一用 `[PROJECT]`、`[DOMAIN]`、`[API_KEY]`、`[ACCOUNT]` 这类占位符。



---

## references/feishu-tutorial.md

## 第二部分：OpenClaw / Hermes 自动化

### 文件结构

```
backend-auto-site-cloudflare-workers/
├── SKILL.md
├── README.md
├── templates/
│   ├── site.env.example
│   └── site.config.example.json
└── scripts/
    └── one-click-deploy.sh
```

### 需要准备什么

最少准备这些：

```
1. 产品名
2. 域名
3. Cloudflare API Token / 或本机已 wrangler login
4. Google OAuth Client ID / Secret
5. AI API Key：OpenAI / fal / Replicate 三选一
6. 支付 Key：Stripe / PayPal / Creem，可选
```

### 推荐工作流

#### 复制 Skill

```
mkdir -p ~/.hermes/skills/software-development/
cp -R backend-auto-site-cloudflare-workers ~/.hermes/skills/software-development/
```

#### 新开一个 AI 编程会话

提示词：

```
请使用 backend-auto-site-cloudflare-workers Skill，为我的产品一键生成并部署后端。
```

#### 填环境变量

复制：

```
cp templates/site.env.example .env.site
```

填写 .env.site。

不要把 .env.site 提交到 Git。

#### 让 Agent 执行

```
我已经填好了 .env.site。请按 Skill 执行一键部署，完成后输出 deployment-report.md。不要输出任何 secret 值。
```

#### .env.site 示例

```
SITE_NAME="CharGen AI"
SITE_SLUG="chargen-ai"
DOMAIN="chargen.ai"
APP_ORIGIN="https://chargen.ai"
PRODUCT_TYPE="ai-image-generator"
AI_PROVIDER="fal"
PAYMENT_PROVIDER="stripe"
AUTH_PROVIDER="google"

CLOUDFLARE_API_TOKEN=""
CLOUDFLARE_ACCOUNT_ID=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI="https://chargen.ai/api/auth/callback/google"

FAL_KEY=""
OPENAI_API_KEY=""
REPLICATE_API_TOKEN=""

STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_PRICE_ID=""
```

### 一键提示词

```
请使用 backend-auto-site-cloudflare-workers Skill，为下面产品一键生成并部署后端。

产品信息：
- SITE_NAME: CharGen AI
- SITE_SLUG: chargen-ai
- DOMAIN: chargen.ai
- APP_ORIGIN: https://chargen.ai
- PRODUCT_TYPE: ai-image-generator
- AI_PROVIDER: fal
- PAYMENT_PROVIDER: stripe
- AUTH_PROVIDER: google
- 免费额度：匿名每天 3 次，登录送 10 credits
- 付费额度：Stripe 一次性购买 credits，每张图扣 1 credit

我会提供环境变量：
- Cloudflare: CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID
- Google: GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REDIRECT_URI
- AI: FAL_KEY
- Payment: STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET / STRIPE_PRICE_ID

请自动完成：
1. 生成 Cloudflare Workers 项目代码
2. 创建 D1 / R2 / Queues
3. 写 wrangler.toml
4. 写 Cloudflare secrets
5. 执行 D1 migration
6. npx wrangler deploy
7. 绑定域名，如果 Zone 已接入
8. 验证 /api/health、/api/auth/login、/api/auth/me、/api/usage
9. 输出 docs/deployment-report.md

不要输出任何 secret 值。
```

---

## 第三部分：手动实操

### 注册账号（一次性）

#### Cloudflare 账号

1. 打开 https://cloudflare.com → Sign Up
1. 注册后进入 Dashboard
1. 记下你的 Account ID（Dashboard 右侧栏，或 URL 中 https://dash.cloudflare.com/<account_id>）
1. 创建 API Token：
#### Google Cloud 账号（用于 Google 登录）

1. 打开 https://console.cloud.google.com
1. 创建新项目（项目名随意，如 My Sites OAuth）
1. 配置 OAuth 同意屏幕：
1. 切换到生产模式（重要！) :
1. 创建 OAuth Client：
提示词参考（问 AI 帮你操作 GCP Console）：

#### Stripe 账号

1. 打开 https://stripe.com → Start now
1. 注册并完成商户验证（需要公司或个人信息 港卡 + 护照）
1. 获取 API Key：
1. 测试环境先用 sk_test_xxx，上线前换成 sk_live_xxx
#### PayPal 账号

PayPal 目前已经支持个人卖家账户。

这意味着：我们可以用个人身份注册 PayPal，并直接面向全球收款。对很多做海外产品、做独立开发的朋友来说，这确实是个福音。

我刚刚亲自走完了一遍流程，整体很顺，提交后也很快就通过了。

下面把完整流程和几个常见疑问，一次讲清楚。

##### 如何申请个人卖家账户（亲测流程）

###### 打开申请入口

先到 PayPal 官方页面，选择申请「个人卖家」：

https://www.paypal.cn/portal/account-selection

###### 用邮箱 + 手机号创建账户

按页面提示填写邮箱、手机号即可创建。

小提醒：如果你之前注册过 PayPal，需要换一个新的邮箱（否则可能无法继续创建）。

###### 验证邮箱与手机号

按提示完成短信验证码/邮箱验证。

###### 身份认证：身份证 + 人脸

接下来是实名认证环节：验证身份证信息并进行人脸识别。

###### 补充职业与商品/行业信息

这里建议如实填写即可。

比如我填写的是：

- 职业：工程技术人员
- 商品/行业：计算机软件开发服务
###### 提交等待审核

信息提交后，流程就结束了。

我这边的体验是：大约半小时左右就通过（不同人可能会有差异）。

审核通过后，你就可以把 PayPal 集成到自己的产品里，开始面向全球收款。

如果你是个人独立开发者，真的建议尽快搞定，越早准备越不被动。

##### 大家最关心的几个问题

###### 税费与手续费怎么收？

根据页面信息，PayPal 结算人民币时：

- 手续费：0.5%
- 代缴增值税：6%
###### 会占用个人外汇额度吗？每笔都要自己申报吗？

从页面说明来看，PayPal 会向银行申报每一笔收益；通过跨境收款结算到人民币，通常会按服务贸易收入处理。

也就是说：

- 无需自己逐笔去申报（PayPal 会做申报）
- 一般不会占用个人外汇额度（但 PayPal 会根据国家政策进行额度限制）
###### 个税要不要管？

更合规是好事，但也意味着更「可追溯」。

建议每年把这块当成一个固定动作：关注自己的个税申报（该申报就申报），别忘了。

#### Creem 账号

##### 打开 https://creem.io → Sign Up

点击登录

点击谷歌登录

选择一个谷歌账号

点继续

#####  创建 store

点击创建，输入一个名字

##### 设置 Creem 测试模式

点击测试模式，使其为打开状态（高亮）

#### AI 服务账号（按需选）

### 创建后端基础设施

这一节负责创建 Cloudflare Workers 后端需要的基础资源：

- Worker 项目（前面已经创建过了）
- D1 数据库
- R2 存储桶
- wrangler 配置
- D1 schema
#### 创建 D1 数据库

```
npx wrangler d1 create chargen-db
```

#### 创建 R2 存储桶（如果产品需要上传/下载文件）

如果产品需要上传、下载、AI 图片、导出文件，创建 R2 bucket：

```
npx wrangler r2 bucket create chargen-assets
```

#### 配置 wrangler.toml

在你的 Next.js 项目根目录创建 wrangler.toml：

```
name = "chargen-ai"
main = "src/worker.ts"
compatibility_date = "2026-04-30"

# 如果前端构建产物是 dist
[assets]
directory = "./dist"
binding = "ASSETS"

[[d1_databases]]
binding = "DB"
database_name = "chargen-db"
database_id = "你的 database_id"

[[r2_buckets]]
binding = "R2"
bucket_name = "chargen-assets"

[vars]
APP_ORIGIN = "https://chargen.ai"
NODE_ENV = "production"
```

#### 设置 Secrets

敏感信息不要写进wrangler.toml。

```
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
npx wrangler secret put SESSION_SECRET
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put FAL_KEY
```

生成 SESSION_SECRET：

```
openssl rand -hex 32
```

建议命名统一：

```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI
APP_ORIGIN
SESSION_SECRET
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
FAL_KEY / OPENAI_API_KEY / REPLICATE_API_TOKEN
```

#### 初始化数据库 Schema（根据你的需求，让 AI 创建）

提示词参考（让 AI 帮你设计 schema）：

例如，创建 migrations/0001_init.sql：

```
-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  google_id TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free',
  credits INTEGER NOT NULL DEFAULT 5,
  stripe_customer_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- AI 生成任务
CREATE TABLE IF NOT EXISTS generation_jobs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  input_json TEXT NOT NULL,
  output_json TEXT,
  error TEXT,
  credits_used INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 使用记录
CREATE TABLE IF NOT EXISTS usage_records (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  job_id TEXT,
  action TEXT NOT NULL,
  credits_used INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (job_id) REFERENCES generation_jobs(id)
);

-- 额度流水
CREATE TABLE IF NOT EXISTS credit_transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL, -- grant | consume | refund | adjust
  amount INTEGER NOT NULL,
  reason TEXT,
  reference_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'stripe',
  provider_session_id TEXT,
  provider_customer_id TEXT,
  plan TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 订阅表
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'stripe',
  provider_subscription_id TEXT UNIQUE,
  plan TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_end TEXT,
  cancel_at_period_end INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Webhook 幂等表
CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  processed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw_json TEXT,
  UNIQUE(provider, event_id)
);

-- 匿名限流记录
CREATE TABLE IF NOT EXISTS anonymous_usage_limits (
  id TEXT PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  action TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(ip_hash, action, window_start)
);

-- 邮件订阅
CREATE TABLE IF NOT EXISTS email_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL DEFAULT 'landing',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_user_id ON generation_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_status ON generation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_usage_user_id ON usage_records(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_job_id ON usage_records(job_id);
CREATE INDEX IF NOT EXISTS idx_credit_tx_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_provider_session ON orders(provider, provider_session_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_provider_event ON webhook_events(provider, event_id);
CREATE INDEX IF NOT EXISTS idx_anon_usage_ip_action_window ON anonymous_usage_limits(ip_hash, action, window_start);
```

执行：

```
# 本地测试
npx wrangler d1 execute chargen-db --file=migrations/0001_init.sql

# 远程（生产环境）—— 部署前必须执行！
npx wrangler d1 execute chargen-db --remote --file=migrations/0001_init.sql
```

### 配置 Google 登录

这一节使用 Google OAuth 直连，不依赖 Clerk / NextAuth / Auth.js。

登录链路：

```
GET /api/auth/login
  ↓
跳转 Google OAuth
  ↓
GET /api/auth/callback/google
  ↓
换 token / 获取用户信息 / 写 D1 / 签 session / 设置 cookie
  ↓
GET /api/auth/me
```

#### 添加 Redirect URI

在 Google Cloud Console：

1. 打开你的 OAuth Client
1. 找到 Authorized redirect URIs
1. 添加：https://chargen.ai/api/auth/callback/google（这个链接找 AI 要）
1. 保存
建议环境变量统一写：

```
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=[REDACTED]
GOOGLE_REDIRECT_URI=https://chargen.ai/api/auth/callback/google
APP_ORIGIN=https://chargen.ai
SESSION_SECRET=[REDACTED]
```

生成 SESSION_SECRET：

```
openssl rand -hex 32
```

写入 Cloudflare Workers secrets：

```
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
npx wrangler secret put GOOGLE_REDIRECT_URI
npx wrangler secret put SESSION_SECRET
```

#### 写鉴权 API Route

如果使用单 Worker 路由，建议结构是：

```
src/
├── worker.ts
├── lib/
│   ├── auth.ts
│   ├── cookies.ts
│   └── session.ts
└── routes/
    └── auth.ts
```

对外 API：

```
GET  /api/auth/login
GET  /api/auth/callback/google
GET  /api/auth/me
POST /api/auth/logout
```

推荐提示词：让 AI 写 Workers 鉴权代码：

#### 登录回调核心代码参考

下面是 Workers 风格伪代码，重点看链路，不建议直接复制上线

```
type Env = {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: [REDACTED]
  GOOGLE_REDIRECT_URI: string;
  APP_ORIGIN: string;
  SESSION_SECRET: [REDACTED]
};

export async function handleGoogleCallback(request: Request, env: Env) {
  const url = new URL(request.url);

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return new Response('Missing code or state', { status: 400 });
  }

  // 1. 校验 OAuth state，防 CSRF
  const cookieState = [REDACTED] 'oauth_state');
  if (!cookieState || cookieState !== state) {
    return new Response('Invalid OAuth state', { status: 400 });
  }

  // 2. 用 code 换 token
  const tokenRes = [REDACTED] fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: [REDACTED]
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenRes.ok) {
    return new Response('Google token exchange failed', { status: 401 });
  }

  const tokenJson = [REDACTED] tokenRes.json() as {
    access_token: [REDACTED]
  };

  // 3. 获取 Google 用户信息
  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${tokenJson.access_token}`,
    },
  });

  if (!userRes.ok) {
    return new Response('Google userinfo failed', { status: 401 });
  }

  const googleUser = await userRes.json() as {
    id: string;
    email: string;
    name?: string;
    picture?: string;
  };

  // 4. 写 D1：创建或更新用户
  const userId = `usr_${crypto.randomUUID()}`;

  await env.DB.prepare(`
    INSERT INTO users (id, email, name, avatar_url, google_id, updated_at)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(email) DO UPDATE SET
      name = excluded.name,
      avatar_url = excluded.avatar_url,
      google_id = excluded.google_id,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    userId,
    googleUser.email,
    googleUser.name ?? null,
    googleUser.picture ?? null,
    googleUser.id,
  ).run();

  const user = await env.DB.prepare(`
    SELECT id, email, plan, credits
    FROM users
    WHERE email = ?
  `).bind(googleUser.email).first<{
    id: string;
    email: string;
    plan: string;
    credits: number;
  }>();

  if (!user) {
    return new Response('User upsert failed', { status: 500 });
  }

  // 5. 签 session
  const session = [REDACTED] signSession({
    user_id: user.id,
    email: user.email,
    plan: user.plan,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  }, env.SESSION_SECRET);

  // 6. 设置 cookie，并清除 oauth_state
  const res = new Response(null, {
    status: 302,
    headers: {
      Location: env.APP_ORIGIN,
    },
  });

  res.headers.append(
    'Set-Cookie',
    serializeCookie('session', session, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    }),
  );

  res.headers.append(
    'Set-Cookie',
    serializeCookie('oauth_state', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: 0,
    }),
  );

  return res;
}
```

#### 关键实现细节

##### login 时必须生成 state

```
GET /api/auth/login
  ↓
生成随机 state
  ↓
写入 oauth_state cookie
  ↓
Google OAuth URL 带上 state
```

示例：

```
const state = crypto.randomUUID();
```

更严格可以用：

```
crypto.getRandomValues(new Uint8Array(32))
```

##### callback 时必须验证 state

##### Cookie 不要放 localStorage

Session 应放 HttpOnly Cookie：

```
HttpOnly
Secure
SameSite=Lax
Path=/
Max-Age=604800
```

##### Session payload 不要太大

建议只放：

```
{
  "user_id": "usr_xxx",
  "email": "a@example.com",
  "plan": "free",
  "exp": 1770000000
}
```

不要把 Google access token 放进 session cookie。

##### 生产环境要处理错误分支

至少处理：

- code 缺失
- state 缺失
- state 不匹配
- Google token exchange 失败
- Google userinfo 失败
- email 缺失
- D1 upsert 失败
- session 签名失败
### 配置 AI API 代理

AI API 不允许前端直连。

所有生成请求都必须先进入 Worker，由 Worker 统一处理：

- 鉴权
- 限流
- 额度检查
- AI API 调用
- 结果存 R2
- 额度扣减
- usage 记录
- 错误处理
推荐链路：

```
前端
  ↓ POST /api/generate
Cloudflare Worker
  ├─ 校验用户 / 匿名身份
  ├─ 检查限流
  ├─ 检查额度
  ├─ 创建 generation_jobs
  ├─ 调 AI API
  ├─ 结果存 R2
  ├─ 成功后扣额度
  ├─ 写 usage_records / credit_transactions
  └─ 返回结果或 task_id
```

#### API Route 结构

如果使用单 Worker 路由，推荐结构：

```
src/
├── worker.ts
├── routes/
│   ├── generate.ts
│   └── usage.ts
├── lib/
│   ├── auth.ts
│   ├── rate-limit.ts
│   ├── credits.ts
│   ├── ai.ts
│   └── r2.ts
└── types.ts
```

对外 API：

```
POST /api/generate          提交生成任务
GET  /api/generate/:id      查询异步任务状态
GET  /api/usage             查询用量和额度
```

#### 同步还是异步

#### 同步生成核心代码参考

```
type Env = {
  DB: D1Database;
  R2: R2Bucket;
  FAL_KEY: [REDACTED]
};

export async function handleGenerate(request: Request, env: Env) {
  // 1. 验证登录态
  const user = await getUser(request, env);
  if (!user) {
    return json({ error: 'Unauthorized' }, 401);
  }

  // 2. 解析和校验输入
  const body = await request.json() as {
    prompt?: string;
  };

  const prompt = body.prompt?.trim();

  if (!prompt) {
    return json({ error: 'Missing prompt' }, 400);
  }

  if (prompt.length > 2000) {
    return json({ error: 'Prompt too long' }, 400);
  }

  // 3. 原子预占额度：避免并发打穿
  const reserved = await reserveCredit(env.DB, user.id, 1);
  if (!reserved) {
    return json({ error: 'No credits' }, 402);
  }

  const jobId = `job_${crypto.randomUUID()}`;

  try {
    // 4. 创建任务记录
    await env.DB.prepare(`
      INSERT INTO generation_jobs (id, user_id, status, input_json, credits_used)
      VALUES (?, ?, 'running', ?, 1)
    `).bind(
      jobId,
      user.id,
      JSON.stringify({ prompt }),
    ).run();

    // 5. 调 AI API
    const aiRes = await fetch('https://fal.run/fal-ai/flux/dev', {
      method: 'POST',
      headers: {
        Authorization: `Key ${env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!aiRes.ok) {
      throw new Error(`AI service error: ${aiRes.status}`);
    }

    const aiJson = await aiRes.json() as {
      images?: { url: string }[];
    };

    const imageUrl = aiJson.images?.[0]?.url;
    if (!imageUrl) {
      throw new Error('AI result missing image URL');
    }

    // 6. 下载 AI 结果并存 R2
    const storedUrl = await saveRemoteFileToR2(env.R2, imageUrl, {
      key: [REDACTED]
      contentType: 'image/png',
    });

    // 7. 更新任务和 usage
    await env.DB.prepare(`
      UPDATE generation_jobs
      SET status = 'completed',
          output_json = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      JSON.stringify({ image_url: storedUrl }),
      jobId,
    ).run();

    await env.DB.prepare(`
      INSERT INTO usage_records (id, user_id, job_id, action, credits_used)
      VALUES (?, ?, ?, 'generate', 1)
    `).bind(
      `use_${crypto.randomUUID()}`,
      user.id,
      jobId,
    ).run();

    return json({
      job_id: jobId,
      status: 'completed',
      image_url: storedUrl,
    });
  } catch (err) {
    // 8. AI 失败：退还预占额度
    await refundCredit(env.DB, user.id, 1, jobId);

    await env.DB.prepare(`
      UPDATE generation_jobs
      SET status = 'failed',
          error = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      err instanceof Error ? err.message : 'Unknown error',
      jobId,
    ).run();

    return json({ error: 'AI service error' }, 503);
  }
}
```

#### 额度扣减必须原子化

```
async function reserveCredit(db: D1Database, userId: string, amount: number) {
  const result = await db.prepare(`
    UPDATE users
    SET credits = credits - ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND credits >= ?
  `).bind(amount, userId, amount).run();

  return result.meta.changes === 1;
}
```

失败退还：

```
async function refundCredit(
  db: D1Database,
  userId: string,
  amount: number,
  referenceId: string,
) {
  await db.prepare(`
    UPDATE users
    SET credits = credits + ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(amount, userId).run();

  await db.prepare(`
    INSERT INTO credit_transactions (id, user_id, type, amount, reason, reference_id)
    VALUES (?, ?, 'refund', ?, 'ai_failed', ?)
  `).bind(
    `ctx_${crypto.randomUUID()}`,
    userId,
    amount,
    referenceId,
  ).run();
}
```

#### 图片生成建议默认异步

图片生成通常不稳定，可能 5 秒，也可能 30 秒。

更推荐：

```
POST /api/generate
  ↓
创建 generation_jobs
  ↓
返回 task_id
  ↓
Queue Consumer 调 AI API
  ↓
结果存 R2
  ↓
更新 generation_jobs
  ↓
前端 GET /api/generate/:id 轮询
```

API 返回示例：

```
{
  "task_id": "job_xxx",
  "status": "pending"
}
```

查询任务：

```
GET /api/generate/job_xxx
```

返回：

```
{
  "task_id": "job_xxx",
  "status": "completed",
  "image_url": "https://chargen.ai/api/assets/generations/job_xxx.png"
}
```

#### R2 存储 AI 结果

不要长期依赖 fal / Replicate 返回的临时 URL。

生产站建议下载结果，存入 R2。

```
async function saveRemoteFileToR2(
  bucket: R2Bucket,
  remoteUrl: string,
  options: {
    key: [REDACTED]
    contentType: string;
  },
) {
  const res = await fetch(remoteUrl);
  if (!res.ok || !res.body) {
    throw new Error('Failed to fetch remote file');
  }

  await bucket.put(options.key, res.body, {
    httpMetadata: {
      contentType: options.contentType,
    },
  });

  return `/api/assets/${options.key}`;
}
```

#### SSE 流式返回（进阶）

适合“先出文本，再出图片”的产品。

流程：

```
前端 POST /api/generate/stream
  ↓
Worker 返回 text/event-stream
  ↓
event: text
  ↓
event: image
  ↓
event: done
```

提示词参考：

```
帮我实现 Cloudflare Workers 的 SSE 流式生成接口。

流程：
1. 前端 POST /api/generate/stream，传 description 和 type
2. Worker 校验登录态、限流、额度
3. 后端并行调两个 AI：
   - OpenAI 生成文本
   - fal.ai 生成图片
4. 文本先回来，通过 SSE event: text 推给前端
5. 图片后回来，存 R2 后通过 SSE event: image 推 URL
6. 最后发 event: done

要求：
- 部署在 Cloudflare Workers
- 不用 Next.js API Route
- 不用 Node-only API
- 用 fetch 直调 AI HTTP API
- 用 ReadableStream + TextEncoder 实现 SSE
- Content-Type: text/event-stream
- 调用失败时发送 event: error
- 成功后扣额度，失败要退还预占额度
```

#### 提示词参考：让 AI 写 AI 代理

```
帮我写 Cloudflare Workers 的 AI 图片生成后端代理。

技术约束：
- TypeScript
- 部署在 Cloudflare Workers
- 不用 Next.js API Route
- 不用 Node-only API
- 用 fetch 直调 fal.ai HTTP API
- D1 通过 env.DB 访问
- R2 通过 env.R2 访问
- 密钥通过 env.FAL_KEY 读取

功能：
- POST /api/generate：接收 prompt
- 校验登录态，从 HttpOnly session cookie 获取 user
- 未登录返回 401
- prompt 不能为空，最长 2000 字符
- 登录用户按 credits 扣减
- 扣减必须原子化，防止并发打穿
- 失败时退还额度
- 创建 generation_jobs
- 调 fal.ai 生成图片
- 下载图片并存到 R2
- 写 usage_records 和 credit_transactions
- 返回 { job_id, status, image_url }

错误码：
- 400 参数错误
- 401 未登录
- 402 额度不足
- 413 输入过大
- 429 限流
- 503 AI 服务不可用

fal.ai API：
- Endpoint: https://fal.run/fal-ai/flux/dev
- Auth: Header "Authorization: Key <FAL_KEY>"
- Body: {"prompt": "xxx"}
- Response: {"images": [{"url": "https://..."}]}
```

### 配置 Stripe 支付

#### 创建 Stripe 产品和价格

在 Stripe Dashboard 操作（图形界面更直观）：

1. Products → Add product
1. 名称
1. 添加价格：
1. 记下两个 Price ID（price_xxx）
或者用命令行（效果一样）：

```
# 创建产品
curl -s -X POST https://api.stripe.com/v1/products \
  -u sk_test_你的key: [REDACTED]
  -d name="CharGen Pro"

# 创建月付价格（990 分 = $9.90）
curl -s -X POST https://api.stripe.com/v1/prices \
  -u sk_test_你的key: [REDACTED]
  -d product=prod_xxx \
  -d unit_amount=990 \
  -d currency=usd \
  -d "recurring[interval]"=month

# 创建年付价格
curl -s -X POST https://api.stripe.com/v1/prices \
  -u sk_test_你的key: [REDACTED]
  -d product=prod_xxx \
  -d unit_amount=4900 \
  -d currency=usd \
  -d "recurring[interval]"=year
```

#### 创建 Webhook

Stripe Dashboard → Developers → Webhooks → Add endpoint:

- URL: https://chargen.ai/api/webhooks/stripe
- Events 选择：
- 创建后复制 Signing secret（whsec_xxx）
#### 写支付 API Route

```
src/app/api/
├── checkout/stripe/route.ts     # POST: 创建 Checkout Session
└── webhooks/stripe/route.ts     # POST: Webhook 回调
```

提示词参考：

#### Webhook 签名验证核心代码

```
// src/app/api/webhooks/stripe/route.ts
export const runtime = 'edge';

export async function POST(request: Request) {
  // 必须用 text()，不能用 json()！
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  // 解析签名
  const elements = signature.split(',');
  const timestamp = elements.find(e => e.startsWith('t='))?.slice(2);
  const sig = elements.find(e => e.startsWith('v1='))?.slice(3);

  // HMAC-SHA256 验证
  const key = [REDACTED] crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(process.env.STRIPE_WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const expected = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${timestamp}.${body}`)
  );
  const expectedHex = [...new Uint8Array(expected)]
    .map(b => b.toString(16).padStart(2, '0')).join('');

  if (expectedHex !== sig) {
    return new Response('Invalid signature', { status: 400 });
  }

  // 签名通过，处理事件
  const event = JSON.parse(body);
  // ... 更新数据库
}
```

#### 验证支付

查看 webhook 事件回调：

### PayPal 支付配置

#### 获取 PayPal API 凭证

1. 打开 https://developer.paypal.com/dashboard，使用你前面注册的账号进行登录
1. 创建一个 App： Apps & Credentials → Create App
1.  在弹出的创建创建弹窗中输入 APP Name， Type 选择默认 Merchant ， 点击 Create App 按钮。
1. 复制 Client ID 和 Secret Key
#### 创建产品和订阅计划

在 PayPal 没有像 Stripe 一样便捷的 Dashboard 操作界面，推荐用命令行：

```
# 获取 access token
TOKEN=[REDACTED] -s -X POST "https://api-m.paypal.com/v1/oauth2/token" \
  -u "你的CLIENT_ID:你的SECRET" \
  -d "grant_type=client_credentials" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

# 创建产品
curl -s -X POST "https://api-m.paypal.com/v1/catalogs/products" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"CharGen Pro","type":"SERVICE","category":"SOFTWARE"}'
# 记下 PROD-xxx

# 创建月付计划
curl -s -X POST "https://api-m.paypal.com/v1/billing/plans" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id":"PROD-xxx",
    "name":"CharGen Pro Monthly",
    "billing_cycles":[{
      "frequency":{"interval_unit":"MONTH","interval_count":1},
      "tenure_type":"REGULAR","sequence":1,"total_cycles":0,
      "pricing_scheme":{"fixed_price":{"value":"9.90","currency_code":"USD"}}
    }],
    "payment_preferences":{"auto_bill_outstanding":true}
  }'
# 记下 P-xxx

# 创建 Webhook
curl -s -X POST "https://api-m.paypal.com/v1/notifications/webhooks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url":"https://chargen.ai/api/webhooks/paypal",
    "event_types":[
      {"name":"BILLING.SUBSCRIPTION.ACTIVATED"},
      {"name":"BILLING.SUBSCRIPTION.CANCELLED"},
      {"name":"PAYMENT.SALE.COMPLETED"}
    ]
  }'
```

#### 写 PayPal API Route

提示词参考：

将刚刚复制下来的密钥信息直接发给 OpenClaw 即可

#### 添加 webhook

添加 webhook，输入 webhook URL，选择相应的事件类型，点击保存即可

添加完毕之后的效果

#### 沙箱支付测试

找到价格页，点击购买试试看

获取沙箱个人账户

点击右侧的测试工具标签，选择标签下面的沙盒账户

找到个人，点击进去；复制电子邮件和密码

这里是沙箱环境；因此我们需要登录 Paypal 沙箱账户，用上一步获取到账户和密码进行登录

登录之后，选择 Paypal 余额，点击完成购物

支付成功，积分加 10；

积分果然增加了 10 分

看下余额有没有减少，刚刚我们看见的账户余额是 5000 美元；账户余额果然少了

#### 真实环境支付

现在沙箱支付跑通了；我们把沙箱环境改成真实环境，这里需要和沙箱环境一样，创建应用获取凭证

回到首页，把沙箱模式切换为正式环境；点击应用和凭证，开始进行创建

获取 API 凭证和密钥

添加 Webhook

然后把真实环境的 Client ID 与 Client Secret 发给 OpenClaw， 跟它说 沙箱环境已跑通；现在需要将沙箱环境改为真实环境

更新完毕，现在我们测试一下正式环境的支付；看下面地址框里面的地址，现在是正式环境

### Creem 支付配置

#### 获取 Creem API Key

1. 打开 https://creem.io → 注册
1. Dashboard → Developers → API Keys → 创建
1. 复制 API Key
#### 创建产品

点击产品，点击创建

输入产品信息

输入价格

点击创建

```
# 月付
curl -s -X POST "https://api.creem.io/v1/products" \
  -H "x-api-key: [REDACTED]" \
  -H "Content-Type: application/json" \
  -d '{"name":"CharGen Pro Monthly","price":990,"currency":"usd","billing_type":"recurring","billing_period":"month"}'

# 年付
curl -s -X POST "https://api.creem.io/v1/products" \
  -H "x-api-key: [REDACTED]" \
  -H "Content-Type: application/json" \
  -d '{"name":"CharGen Pro Yearly","price":4900,"currency":"usd","billing_type":"recurring","billing_period":"year"}'
```

#### 配置 Webhook

Creem 的 Webhook 不能通过 API 创建，需要在 Dashboard 手动配：

1. Creem Dashboard → Developers → Webhook
1. URL: https://chargen.ai/api/webhooks/creem
1. Events: checkout.completed, subscription.active, subscription.canceled
1. 保存后复制 Webhook Secret
验证支付

看creem文档：

https://docs.creem.io/introduction

https://docs.creem.io/api-reference/introduction

Claude Code 输入：

```
1. 帮我实现Pricing页面，参考https://nanobanana.ai/pricing
2. 接入Creem支付，这是两个creem文档：https://docs.creem.io/introduction，https://docs.creem.io/api-reference/introduction
```

Claude Code提示，需要修改CREEM_API_KEY，CREEM_WEBHOOK_SECRET，详细配置在生成的PAYMENT_SETUP.md文档。

修改 .env.local 中的两个环境变量，保存

#### 本地测试

终端输入：

```
npm run dev
```

点击价格界面

根据 creem 手册，输入测试卡信息。

点击支付

显示支付成功

#### 正式测试

关闭测试模式

把测试模式里的步骤重新做一遍

重新创建产品

重新设置Webhook

修改 .env.local 中的两个环境变量，保存。

部署后，用真实支付方式支付测试。

正式模式需要审核，第一次会收到如下信息。

根据文档链接中的清单逐一完善，截图，发邮件给creem。

### 设置环境变量（Secrets）

```
# 必须的
npx wrangler pages secret put GOOGLE_CLIENT_ID --project-name chargen-ai
npx wrangler pages secret put GOOGLE_CLIENT_SECRET --project-name chargen-ai
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name chargen-ai
npx wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name chargen-ai
npx wrangler pages secret put JWT_SECRET --project-name chargen-ai
# JWT_SECRET 生成：openssl rand -hex 32

# AI API Key（按你用的服务）
npx wrangler pages secret put FAL_KEY --project-name chargen-ai
# 或 OPENAI_API_KEY / REPLICATE_API_TOKEN

# PayPal（如果接了）
npx wrangler pages secret put PAYPAL_CLIENT_ID --project-name chargen-ai
npx wrangler pages secret put PAYPAL_CLIENT_SECRET --project-name chargen-ai

# Creem（如果接了）
npx wrangler pages secret put CREEM_API_KEY --project-name chargen-ai
npx wrangler pages secret put CREEM_WEBHOOK_SECRET --project-name chargen-ai
```

每条命令会提示你输入值，粘贴后回车即可。

### CF 安全配置

在 Cloudflare Dashboard → 你的域名 → Settings：

API 限流（在 Security → WAF → Rate limiting rules）：

- 规则：http.request.uri.path matches "^/api/"
- 限制：100 requests / minute / IP
- 动作：Block
提示词参考（问 AI 帮你用 CF API 配置）：

### 部署上线

```
git add -A
git commit -m "feat: initial backend setup"
git push origin main
```

#### 部署后验证清单

- [ ] 网站能访问
- [ ] Google 登录流程完整（跳转 → 授权 → 回调 → 看到用户信息）
- [ ] AI 功能正常（输入 → 调 AI → 返回结果 → 额度扣减）
- [ ] 支付流程可用（点付款 → 跳 Stripe → 测试卡付款 → Webhook 回调 → plan 更新）
- [ ] /api/usage 返回正确的用量数据
- [ ] Stripe Webhook 签名验证通过（在 Stripe Dashboard → Webhooks 里查看事件状态）
---



---

## references/stage-rubric.md

# Cloudflare 后端与会员系统 阶段判断规则

## 本阶段目标

用 Cloudflare Workers/D1/R2/Auth/API 支撑小站：登录、会员、内容、订单、资产和前端可消费数据合同。

## 必须保留的内部流程精华（已脱敏）

### 1. 架构确认
优先 Cloudflare 全栈：Pages/Workers、D1、R2、KV/Queues（按需）、Google/Auth、Webhook。

### 2. 数据合同
给前端 machine-readable schema/seed/manifest，不只写 Markdown；区分 fixture、launch_data、seo_index。

### 3. API 合约
列 endpoint、method、auth、request/response、错误码、rate limit、权限。

### 4. 迁移与 seed
D1 migrations 可重复执行；R2 bucket/公开访问/签名 URL 明确；seed 数据有来源和 checksum。

### 5. 权限与开通
会员 entitlement、离线订单、人工开通、管理员操作日志都要可验。

### 6. 安全与合规
secret 只放环境变量；不打印 token；用户上传/日志/删除策略与 Privacy 一致。

### 7. 联调
前端用真实 API 或明确 fixture，不得把 mock 当生产。


## 质量门槛

- [ ] 前端拿到机器可读数据合同
- [ ] 生产 secrets 没进代码
- [ ] auth/权限/错误态可测
- [ ] 远端 migration 和本地 schema 对齐
- [ ] 合规披露和实际数据流一致

## 常见失败模式

- 只有后端说明，没有 schema/API 文件
- 在日志或文档里暴露 token
- confirmed 数据不足还让前端当真实上线
- 管理员开通没有审计记录

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## requirements.json

{
  "id": "backend-auto-site-cloudflare-workers",
  "difficulty": "high",
  "accounts": [
    "Cloudflare",
    "Google OAuth Console（如有登录）",
    "Stripe/支付后台（如有在线支付）"
  ],
  "env": [
    "CLOUDFLARE_API_TOKEN",
    "GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET（如有登录）",
    "STRIPE_SECRET_KEY（如有支付）",
    "SESSION_SECRET"
  ],
  "browserSessions": [
    "Cloudflare Dashboard 登录态",
    "Google Cloud Console 登录态",
    "Stripe Dashboard 登录态（如有）"
  ],
  "blockingRules": [
    "缺 Cloudflare 权限不能创建/迁移 D1/R2/Workers：BLOCKED",
    "缺 OAuth/支付密钥不能完成登录/支付闭环",
    "不得要求用户在聊天里发送完整 secret"
  ],
  "canContinueWithout": [
    "可先输出 schema/API 合同和本地 mock，但不能上线 GO"
  ]
}



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

## scripts/validate_env_vars.py

#!/usr/bin/env python3
"""Cloudflare 后端与会员系统 最小校验脚本。用法：python scripts/validate_env_vars.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['前端不直连模型 API', 'Webhook 幂等', 'Session httpOnly/secure', 'env 只写变量名']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK Cloudflare 后端与会员系统 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))



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

## templates/api-contract.md

# Cloudflare 后端与会员系统 — 标准交付物模板

## 1. 基本信息

- 项目：`[PROJECT]`
- 域名/候选域名：`[DOMAIN]`
- 当前阶段：`08-backend`
- 执行人/Agent：`moshu`
- 日期：`YYYY-MM-DD`
- 状态：`[DONE] / [BLOCKED] / [NEEDS_REVIEW]`

## 2. 上游输入

- 输入文件/链接：`[LINK_OR_PATH]`
- 关键假设：
  - `[ASSUMPTION_1]`
- 缺失信息：
  - `[MISSING_OR_NONE]`

## 3. 本阶段结论

- 结论一句话：`[...]`
- 证据：
  - `[...]`
- 风险：
  - `[...]`

## 4. 交付物

- `[DELIVERABLE_1]`
- `[DELIVERABLE_2]`
- `[DELIVERABLE_3]`

## 5. 验收清单

- [ ] 前端不直连模型 API
- [ ] Webhook 幂等
- [ ] Session httpOnly/secure
- [ ] env 只写变量名

## 6. 下游交接

- 给下游 Skill：`[NEXT_SKILL]`
- 下游必须读取：`[...]`
- 下游不能改动：`[...]`
- 下游启动 Prompt：见 `templates/stage-handoff-template.md`



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

