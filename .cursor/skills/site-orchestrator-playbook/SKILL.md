---
name: site-orchestrator-playbook
title: 全流程主持台（自动做站工厂）
description: 把 12 个专业 Skill 串成一条自动做站流水线：学员提交关键词和域名，总控建 Kanban/DAG，自动派工、验收、返修、上线和复盘。
version: 2.4.0
owner: ShipSolo
agent: xiaomo
category: 做站全流程
stage: 13-orchestrator
updated: 2026-05-27
student_level: intermediate
source: internal-site-building-flow-publicized
---

# 全流程主持台

把 12 个专业 Skill 串成一条自动做站流水线：学员提交关键词和域名，总控建 Kanban/DAG，自动派工、验收、返修、上线和复盘。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`13-orchestrator`
- 角色：把 12 个专业 Skill 串成一条自动做站流水线：学员提交关键词和域名，总控建 Kanban/DAG，自动派工、验收、返修、上线和复盘。
- 上游：用户项目目标、关键词或已有资产。
- 下游：全部阶段。

## 什么时候使用

- 要从一个想法完整跑到上线
- 要用和 ShipSolo 内部一样的自动化方式跑项目
- 要知道每个阶段当前状态、阻塞原因和解锁动作
- 要在 QA_GO 后推进上线和复盘

## 输入契约

开始前学员只需要准备“项目启动卡”：

- 项目名称：建议英文 slug
- 目标关键词 / 种子词：1-5 个即可
- 已注册域名：可以先给候选域名，但正式上线前必须完成注册和 DNS 权限
- 目标市场：默认 US / English
- 项目类型：工具站 / 目录站 / 内容站 / 计算器 / 数据站 / 混合站
- 技术栈权限：GitHub、Cloudflare、域名 DNS、GSC/Bing、Stitch/设计工具等，按阶段需要逐步补齐
- 禁止事项：不能蹭品牌、不能采集的数据、不能对外发布的渠道
- 期限：普通 / same-day / 指定日期

缺信息时按这个规则处理：

- 影响结论、上线安全、生产数据或真实部署：输出 `[BLOCKED]`，列出缺失项和获取方式。
- 不影响当前阶段 v0 推进：标 `[待确认]`，继续产出可复核草案。
- 没有证据的数据、价格、趋势、法律结论、部署结果：不要编造。
- 密钥、Cookie、Token、支付后台、生产数据库、私有路径：只写变量名或 `[REDACTED]`。

## 开始前检查 / Preflight

先检查账号、Token、浏览器登录态。缺关键权限时要阻断提醒用户，不要假装完成。

### 需要准备
- 新手难度：medium
- 账号/后台：
- 按被调用阶段准备：GitHub/Cloudflare/Stitch/GSC 等
- 环境变量 / Token：
- 按被调用阶段准备对应环境变量
- 浏览器登录态：
- 按被调用阶段准备对应登录态

### 缺失处理
- 任一阶段进入生产部署/公开发布/支付/真实用户数据时，缺权限必须 BLOCKED
- 不得让下游假装完成

### 可以降级继续
- 可以先编排 DAG 和任务清单，缺权限的阶段标 setup_required

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

这是学员主路径：不是手动复制 13 次 Prompt，而是把项目启动卡交给总控，由总控自动建任务、派发阶段、追踪状态。

```text
请按 ShipSolo「自动做站工厂」模式启动一个新项目。

项目启动卡：
- 项目名：<英文 slug>
- 已注册域名：<domain.com；如果还没注册，写候选域名并标注未注册>
- 目标市场：<默认 US / English>
- 种子词：<1-5 个关键词>
- 项目类型：<工具站 / 目录站 / 内容站 / 计算器 / 数据站 / 混合站>
- 技术栈：<默认 Cloudflare-first；如有特殊要求写明>
- 商业化：<免费 / 广告 / 订阅 / 线索 / 暂不确定>
- 禁止事项：<品牌、数据、合规、素材、外部发布限制>
- 上线期望：<普通 / same-day / 指定日期>

请你作为总控执行：
1. 先做 Preflight，列出账号、DNS、GitHub、Cloudflare、GSC/Bing、Stitch、数据源等缺口。
2. 如果缺口不影响前期调研/PRD/文案，继续建 Kanban/DAG；把缺口标为 setup_required，不要停全线。
3. 自动创建 13 阶段任务板：research → PRD → pricing/compliance → copy → design → backend/data → frontend → SEO/PM/compliance recheck → QA → launch → data review。
4. 自动给每个阶段绑定对应 Skill、输入、输出、验收闸门、BLOCKED 条件和 owner。
5. 按依赖关系推进：能并行就并行，不能跳过硬闸门。
6. 学员只需要看进度、补账号/域名/DNS/人工决策、确认公开发布；不要让学员手动复制每一棒 Prompt。
7. 每次汇报只输出：当前进度、已完成产物、阻塞项、需要学员处理的卡点、下一步自动动作。

最后一行只能是：[STARTED] / [BLOCKED: SETUP_REQUIRED] / [NEEDS_DECISION]。
```

手动复制下一棒 Prompt 只作为降级模式：当学员没有 Kanban、多 Agent 或自动化执行环境时才使用。

## 阶段流程

### 1. 总控原则

工作台是自动做站工厂的控制面。学员体验必须和 ShipSolo 内部一致：

```text
学员给：关键词 + 域名 + 基本限制
总控做：建项目板 → 拆 DAG → 自动派工 → 追踪产物 → 卡闸门 → 返修 → 上线 → 复盘
学员看：进度、反馈、证据、BLOCKED 卡点
学员处理：注册域名、配置账号、授权登录、人工决策、确认公开发布
```

不要把主路径设计成“学员手动复制 13 段 Prompt”。那只是无自动化环境时的 fallback。

### 2. 启动后先建 Project Control Board + Kanban DAG

收到项目启动卡后，总控必须立刻建立事实源：

```markdown
# Project Control Board

项目：<slug>
域名：<domain>
目标市场：<market>
当前模式：automation_factory
当前状态：STARTED / BLOCKED_SETUP / RUNNING / QA_REPAIR / LAUNCH_READY / LIVE / REVIEWING
事实源：Kanban + project-control.md

## 学员只需要处理
- [ ] 域名是否已注册
- [ ] DNS/Cloudflare 权限是否可用
- [ ] GitHub/Cloudflare/GSC/Bing/Stitch 登录态是否可用
- [ ] 是否允许生产部署
- [ ] 是否允许公开发布/外链提交

## 自动流水线
- 01 research：keyword-research-agent
- 02 PRD：product-definition-prd
- 03 pricing：site-pricing-calibration
- 04 compliance：student-site-compliance-pipeline
- 05 copy：site-copywriting-student
- 06 design：site-design-student
- 08 backend/data：backend-auto-site-cloudflare-workers
- 07 frontend：frontend-site-automation
- 10 SEO：seo-launch-workflow
- 09 QA：student-site-qa-acceptance
- 11 launch：site-ops-growth-launch
- 12 review：site-data-review-iteration

## 当前状态
- running：
- waiting：
- blocked：
- done：
```

### 3. 标准自动化 DAG

```text
00 setup / domain / repo / permissions
  → 01 research
    → 02 PRD / route contract / user tasks
      → 03 pricing
      → 04 compliance
        → 05 SEO-copy freeze
          → 06 design source + content-fit matrix
            → 08 backend / data contract
            → 07 frontend implementation
              → 10 SEO recheck
              → 04 compliance recheck
              → 02 PM acceptance
                → 09 QA
                  → 07/08 repair loop if needed
                    → 11 launch ops
                      → 12 data review
```

并行规则：
- 03 定价和 04 合规可并行。
- 07 前端和 08 后端可并行，但必须已有 Route Contract、Copy Freeze、Design Source、Data Contract。
- 10 SEO、04 合规复核、02 PM 复核可以在实现后并行。
- QA 不能由实现者自证；P0/P1 必须回流返修。

### 4. 自动派工要求

每个任务卡必须包含：

```markdown
- task_id：
- stage：
- skill：
- owner：
- input_paths：
- output_paths：
- gate：
- blocked_if：
- downstream：
- status：[READY / RUNNING / BLOCKED / NEEDS_REPAIR / DONE]
```

如果当前环境支持 Kanban，总控直接创建/更新任务；如果不支持，则输出等价的 `project-control.md`，但仍按自动工厂口径汇报。

### 5. 学员进度汇报格式

每轮只向学员汇报这 5 件事：

```markdown
## 当前进度
- done：
- running：
- waiting：

## 已有产物
- <路径 / URL / evidence>

## 卡点
- <需要学员处理的账号、域名、DNS、付款、人工判断>

## 风险
- <P0/P1/P2>

## 下一步自动动作
- <不需要学员操作的后续动作>
```

### 6. BLOCKED 不是让学员接管项目

BLOCKED 只表示自动化缺一个外部条件。总控必须明确告诉学员：

```markdown
## 需要你处理
- 类型：域名 / DNS / 登录态 / API Key / 付款 / 人工确认 / 合规决策
- 你要做什么：
- 做完后回复什么：例如“域名已注册”“Cloudflare 已授权”“允许发布”
- 系统会自动继续的阶段：
```

学员不需要理解每个专业 Skill 的细节，也不需要手动跑完每一步。

### 7. 硬闸门

必须显式检查这些闸门：

- Research Gate：关键词机会、SERP、竞品最低能力。
- PRD / Route Contract Gate：canonical URL、用户任务、NOT-DO、站点类型。
- SEO-Copy Freeze Gate：设计前冻结 title/meta/H1/H2/FAQ/schema 文案。
- Design Source Gate：页面、状态、移动端、content-fit matrix、frontend handoff。
- Data Contract Gate：frontend-consumable schema/seed/API；自然语言说明不算通过。
- SEO GO：indexability、schema、sitemap、robots、canonical、AI-answer readiness。
- Compliance GO：Privacy/Terms/Cookie/Refund/claims/IP/source policy。
- PM Gate：产品负责人确认实现仍满足 PRD 和竞品最低能力。
- QA GO：真实用户任务、移动端、网络/控制台、P0/P1/P2 证据。
- Launch Gate：commit/push/deploy/smoke/analytics/sitemap/IndexNow/Crawler Hints。
- Data Review Gate：数据四态、渠道归因、Kill/Iterate/Scale。

### 8. 上线闭环

生产部署必须同一 commit，至少记录：

- commit_sha
- pushed_branch
- deploy_url
- production_url
- smoke test
- analytics evidence
- sitemap / robots / canonical
- IndexNow / Crawler Hints
- git_status_after

公开发布、付费 listing、发帖、邮件、社媒发布前必须人工确认。

### 9. 对“能否复刻内部工作流”的判断

这些 Skills 已经覆盖内部做站工作流的能力合同：阶段、输入、输出、闸门、返修、上线、复盘都齐。

但完整复刻还依赖自动化执行层：Kanban、Agent/Profile、浏览器登录态、GitHub/Cloudflare/GSC/Bing/Stitch 权限、域名和 DNS。Skill 负责“让每个 Agent 按同一套标准干活”，总控负责“自动派工和验收”。两者合起来，学员体验才等同内部流程。

## 交付物

工作台每次运行至少输出：

- `project-control.md`：项目控制板和事实源。
- `stage-dag.md`：阶段 DAG 与依赖关系。
- `kanban-plan.md`：自动任务卡、owner、依赖、状态和闸门。
- `stage-status.md`：每阶段 READY / WAITING / RUNNING / BLOCKED / DONE。
- `blocked-log.md`：阻塞原因、解锁动作、责任人。
- `next-prompt.md`：下一棒可复制 Prompt。
- `handoff.md`：当前状态和下游交接摘要。
- 上线后追加 `launch-gates.md` 与 `review-plan.md`。

## 验收清单 / 质量门槛

- [ ] 每阶段都有 [DONE]/[BLOCKED]/[NEEDS_REVIEW]
- [ ] 没有跳过定价/合规/SEO/QA
- [ ] QA_GO 后才运营发布
- [ ] 复盘有数据口径和决策
- [ ] 公开发布和生产变更有人确认

## 下游交接格式

```markdown
# 全流程主持台交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：13-orchestrator
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
- 下一阶段：全部阶段。
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
请加载 ShipSolo Skill：site-orchestrator-playbook，按我的项目资料执行。
```

## 常见坑

- 让一个 AI 一口气从调研写到上线
- 聊天里说完成但没有交付物
- QA 未过就开始发目录/社区
- 重跑时不隔离旧资产导致污染

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

### 2.3.0 — 2026-05-27
- 强化“工作台”定位：专业 Skill 负责干活，工作台负责统筹、派工、验收和接棒。
- 新增项目控制板、标准 DAG、前置检查、下一棒 Prompt、BLOCKED 处理表和上线闭环字段。
- 明确 `market-research-opportunity` 是可选增强，核心流水线从 `keyword-research-agent` 开始，避免学员混淆 13/14 个 Skill。

### 2.2.0 — 2026-05-26
- 新增 Preflight：账号、Token、浏览器登录态、缺失阻断和安全索要话术。
- 更新一键启动 Prompt，要求先检查环境再执行，避免新手在无权限状态下误判 DONE。

### 2.1.0 — 2026-05-23
- 基于最新内部一键做站与数据复盘流水线重写学员版。
- 补齐新词硬闸、SEO-Copy Freeze、Route/Data Contract、PM Gate、QA_GO、Crawler Hints、上线后复盘等关键闸门。
- 保持 Prompt-first 使用方式，脚本仅作为可选辅助。

### 1.2.1 — 2026-05-18
- 标准包结构版本，包含使用说明、模板和辅助脚本。
