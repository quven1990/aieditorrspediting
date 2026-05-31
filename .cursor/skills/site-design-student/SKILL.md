---
name: site-design-student
title: 视觉设计与页面生成 Prompt
description: 基于 PRD 和冻结文案生成高保真设计真源：页面、状态、素材、设计系统和前端 handoff。
version: 2.2.0
owner: ShipSolo
agent: moying
category: 做站全流程
stage: 06-design
updated: 2026-05-26
student_level: beginner
source: internal-site-building-flow-publicized
---

# 视觉设计与页面生成 Prompt

基于 PRD 和冻结文案生成高保真设计真源：页面、状态、素材、设计系统和前端 handoff。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`06-design`
- 角色：基于 PRD 和冻结文案生成高保真设计真源：页面、状态、素材、设计系统和前端 handoff。
- 上游：PRD、SEO-Copy Freeze、合规、素材清单。
- 下游：前端实现、QA。

## 什么时候使用

- 要把页面文案变成设计稿
- 要写给 Stitch/Figma/Claude 的页面生成 Prompt
- 要避免通用 AI SaaS 味
- 要给前端可还原的 HTML/CSS 真源

## 输入契约

开始前尽量准备：

- PRD 和页面矩阵
- final copy blocks
- 品牌/视觉参考
- 素材/图标/截图/视频清单
- 关键交互状态

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
- Stitch 或 Figma/设计工具账号
- 环境变量 / Token：
- STITCH_API_KEY（使用 Stitch 自动生成时必须）
- 浏览器登录态：
- Stitch 登录态
- Figma 登录态（如使用 Figma）

### 缺失处理
- 明确要求 Stitch 生成设计真源但缺 STITCH_API_KEY 或登录态：BLOCKED: SETUP_REQUIRED
- 缺 PRD/冻结文案：BLOCKED

### 可以降级继续
- 无参考图可继续，但标待确认
- 无 Stitch 时只能产出设计 Prompt，不能标 Design DONE

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
你现在执行 ShipSolo 做站流水线的「视觉设计与页面生成 Prompt」阶段。

项目：[项目名称]
当前阶段：06-design
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

### 1. 设计方向
先定视觉概念、受众、行业氛围、字体、色彩、密度、非默认组件语言。

### 2. 页面生成
按页面逐个生成：desktop/mobile、空态/错误态/加载态/付费态。

### 3. 反 AI 味检查
避免默认 Inter、紫色渐变、居中 hero + 三卡片、统一圆角阴影和通用占位图。

### 4. 内容适配
SEO 文案不能被裁掉；长文放折叠、详情页或下沉区，但必须有设计落位。

### 5. Handoff
导出 HTML/CSS、截图、资产、设计系统变量、交互说明、实现注意事项。

### 6. 设计验收
PRD、文案、合规、路由、移动端和关键状态全部对齐再交前端。


## 交付物

- 设计 handoff
- 页面 HTML/CSS 或可还原 mockup
- 设计系统
- 资产包
- 移动端截图
- 前端实现说明

## 验收清单 / 质量门槛

- [ ] 设计是真源，不是单张概念图
- [ ] 前端可提取字体/颜色/间距/图标
- [ ] 关键交互状态齐全
- [ ] 视觉和上一个项目不撞脸

## 下游交接格式

```markdown
# 视觉设计与页面生成 Prompt交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：06-design
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
- 下一阶段：前端实现、QA。
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
请加载 ShipSolo Skill：site-design-student，按我的项目资料执行。
```

## 常见坑

- 只给截图不给 HTML/CSS 或变量
- 为了好看删掉 SEO/合规内容
- 临时外链未知素材
- 用通用 SaaS 模板替代站点类型特征

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
