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
