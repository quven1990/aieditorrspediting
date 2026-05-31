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
