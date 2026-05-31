---
name: product-definition-prd
title: 产品定义与 PRD
description: 把关键词机会转成可执行 PRD：定位、ICP、站点类型、页面矩阵、真实用户任务和下游合同。
version: 2.2.0
owner: ShipSolo
agent: moce
category: 做站全流程
stage: 02-product
updated: 2026-05-26
student_level: beginner
source: internal-site-building-flow-publicized
---

# 产品定义与 PRD

把关键词机会转成可执行 PRD：定位、ICP、站点类型、页面矩阵、真实用户任务和下游合同。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`02-product`
- 角色：把关键词机会转成可执行 PRD：定位、ICP、站点类型、页面矩阵、真实用户任务和下游合同。
- 上游：关键词机会报告、SERP/竞品样本、目标市场、用户限制。
- 下游：定价、合规、文案、设计、前后端。

## 什么时候使用

- 已有关键词或机会，需要变成站点方案
- 要定义 MVP/NOT-DO/页面矩阵
- 要给设计和开发一个不返工的输入
- 要判断产品形态是不是能打 SERP 前三

## 输入契约

开始前尽量准备：

- 推荐关键词和证据
- SERP Top 3-5 竞品
- 目标用户和使用场景
- 站点类型：工具/数据/地图/目录/内容/混合
- 商业约束和上线期限

缺信息时按这个规则处理：

- 影响结论、上线安全、生产数据或真实部署：输出 `[BLOCKED]`，列出缺失项和获取方式。
- 不影响当前阶段 v0 推进：标 `[待确认]`，继续产出可复核草案。
- 没有证据的数据、价格、趋势、法律结论、部署结果：不要编造。
- 密钥、Cookie、Token、支付后台、生产数据库、私有路径：只写变量名或 `[REDACTED]`。

## 开始前检查 / Preflight

先检查账号、Token、浏览器登录态。缺关键权限时要阻断提醒用户，不要假装完成。

### 需要准备
- 新手难度：low
- 账号/后台：
- 无硬性要求；按项目资料推进。
- 环境变量 / Token：
- 无硬性要求；按项目资料推进。
- 浏览器登录态：
- 无硬性要求；按项目资料推进。

### 缺失处理
- 缺关键词机会或目标市场：BLOCKED
- 缺竞品证据：NEEDS_REVIEW，不能直接给 DONE

### 可以降级继续
- 信息不完整时可产出 PRD v0，但必须标待确认

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
你现在执行 ShipSolo 做站流水线的「产品定义与 PRD」阶段。

项目：[项目名称]
当前阶段：02-product
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

### 1. 读取机会
确认关键词、搜索意图、SERP 缝隙、竞品最低能力和风险。

### 2. 定义 ICP
至少拆 3 类用户，选主 ICP：痛点急、付费/转化明确、可触达。

### 3. 定位与边界
写一句话定位、替代方案、差异化、NOT-DO，避免范围漂移。

### 4. 站点类型化
先判断是工具、目录、地图、数据、计算器、benchmark 还是混合型，再定交互基线。

### 5. 页面矩阵
列 URL、index/noindex、主词、H1/H2、CTA、schema、内链、素材/数据需求。

### 6. 合同闸门
输出 Route Contract、SEO-Copy Freeze 输入、数据/素材 inventory、下游 handoff。

### 7. 产品验收标准
定义真实用户任务和 competitive minimum，后续 PM Gate 按它复验。


## 交付物

- PRD v1
- 页面矩阵
- Route Contract 初稿
- 交互/数据/素材需求清单
- 下游交接摘要

## 验收清单 / 质量门槛

- [ ] PRD 不只是关键词说明，而是可开发产品
- [ ] 每个 indexable 页面有真实价值和用户任务
- [ ] NOT-DO 明确
- [ ] 设计/文案/前后端都知道交付边界

## 下游交接格式

```markdown
# 产品定义与 PRD交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：02-product
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
- 下一阶段：定价、合规、文案、设计、前后端。
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
请加载 ShipSolo Skill：product-definition-prd，按我的项目资料执行。
```

## 常见坑

- 所有站都套 SaaS landing 模板
- 没有用户任务，只写页面名
- 没有 route contract，后面出现 /privacy /terms 404
- 为了完整堆功能，首版失焦

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
