# 视觉设计与页面生成 Prompt

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# 视觉设计与页面生成 Prompt 更新记录

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



---

## references/USAGE.md

# 视觉设计与页面生成 Prompt 使用说明

## 先说结论

这份 Skill 的主路径不是让你运行脚本，而是让你把“一键启动 Prompt”复制给 AI。脚本只是可选辅助，用来检查交接是否完整。

## 开始前先准备

这一版新增 Preflight。先确认缺什么，再让 AI 执行，避免跑到一半才发现没权限。

- 账号/后台：Stitch 或 Figma/设计工具账号
- 环境变量 / Token：STITCH_API_KEY（使用 Stitch 自动生成时必须）
- 浏览器登录态：Stitch 登录态、Figma 登录态（如使用 Figma）
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
请按 ShipSolo 学员版 Skill「视觉设计与页面生成 Prompt」执行。
项目：[填写项目]
当前阶段：06-design
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：06-design
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] 设计是真源，不是单张概念图
- [ ] 前端可提取字体/颜色/间距/图标
- [ ] 关键交互状态齐全
- [ ] 视觉和上一个项目不撞脸

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

## references/anti-ai-design-rules.md

# 视觉设计与页面生成 Prompt — 内部能力脱敏参考

## 阶段核心能力

竞品视觉分析、反 AI 味、9 模块生成 Prompt、Logo System、OG/Hero、HANDOFF

## 执行顺序

1. 先读上游交接摘要，确认输入是否满足契约。
2. 缺关键输入时输出 `[BLOCKED]`，不要编造数据或替用户做高风险决策。
3. 可推进时按 `SKILL.md` 的 Phase 顺序执行，所有依据写来源或标 `[待确认]`。
4. 完成后用模板生成交付物，再运行脚本做最小校验。
5. 最后一段写下游交接摘要，状态只能是 `[DONE] / [BLOCKED] / [NEEDS_REVIEW]`。

## 质量门槛

- [ ] 非默认字体
- [ ] 非紫蓝白模板
- [ ] Logo 16px 可辨识
- [ ] 有 desktop/mobile 交付

## 脱敏边界

- 可以保留流程、字段、判断标准、模板、脚本骨架。
- 不保留真实 API Key、Cookie、Token、内部路径、生产库名、群聊 ID、真实客户数据。
- 公开示例统一用 `[PROJECT]`、`[DOMAIN]`、`[API_KEY]`、`[ACCOUNT]` 这类占位符。



---

## references/feishu-tutorial.md

## 第二部分：OpenClaw / Hermes 自动化

### 安装

把文件夹放进你的 skills 目录：

```
mkdir -p skills
cp -R site-design-student-skill skills/site-design-student
```

如果你用 Hermes，也可以放到 profile 目录：

```
mkdir -p ~/.hermes/profiles/default/skills
cp -R site-design-student-skill ~/.hermes/profiles/default/skills/site-design-student
```

default 换成你的 profile 名即可。

---

### 最简单用法

直接把这段发给 Agent：

```
请使用 site-design-student Skill，为我的产品做站点设计。

产品名：
一句话定位：
目标用户：
核心页面：首页 / Pricing / FAQ / SEO 页面
竞品：URL1 URL2 URL3

请输出：
1. 竞品视觉分析
2. 反 AI 味约束表
3. 3 个设计方向
4. 首页页面生成 Prompt
5. Logo / OG / Hero 图提示词
6. HANDOFF.md
```

---

### 推荐用法

先填写：

```
templates/input-brief.md
```

然后发给 Agent：

```
请使用 site-design-student Skill，基于下面的 input brief 生成完整设计交付包。

[粘贴 input brief]
```

---

### 有没有 Key 都能用

#### 无 Key：直接拿 Prompt

#### 有 Key：自动化用法

如果你希望 Agent 直接生成页面或图片，需要按工具配置对应 Key：

Stitch API Key 获取：

https://stitch.withgoogle.com/settings

没有这些 Key 不影响 Skill 使用，只是不能自动出图/自动调用设计工具。

---

## 第三部分：手动实操 — 不用 OpenClaw 也能做

### 开始之前：准备清单

在开始设计之前，确认你手里有这些东西：

### 第一步：竞品视觉分析（10 分钟）

#### 怎么看

打开你 PRD 里列的 2-3 个竞品网站，边看边填这张表：

```
竞品视觉分析表

竞品 A：[URL]
  主色调：[颜色]
  深色/浅色：[哪种]
  Hero 策略：[放了什么——截图？输入框？视频？动画？]
  Section 数量：[几个]
  CTA 文案：[写的什么]
  整体感觉：[便宜/专业/高端/模板感]
  字体：[什么字体，F12 看]

竞品 B：[URL]
  ...

竞品 C：[URL]
  ...
```

#### 怎么用 F12 看竞品字体

1. 打开竞品网站
1. 按 F12 打开开发者工具
1. 点选左上角的"元素选择"按钮（箭头图标）
1. 点击竞品的标题文字
1. 右侧面板里搜 font-family，就能看到字体名称
#### 做差异化决策

填完表之后，做一轮"反向选择"：

### 第二步：填写反 AI 味约束表（5 分钟）

在写 Stitch prompt 之前，先确定你的约束。复制下面这个表，填好：

### 第三步（可选）：用 AI 帮你选字体和配色

如果你不确定选什么字体和配色，把下面的 prompt 发给 ChatGPT 或 Claude：

```
我在做一个 [一句话产品描述] 的网站。

竞品分析：
- 竞品 A 用了 [颜色/字体/风格]
- 竞品 B 用了 [颜色/字体/风格]

我希望的调性是 [从 8 个里选的那个]。
我希望和竞品有明确视觉差异。

请帮我推荐：
1. 配色方案（4 个颜色，给 HEX 色值）：背景色、主色、强调色、文字色
2. 字体搭配（2 个，从 Google Fonts 选）：Display 字体 + Body 字体
3. Hero 区策略：应该放什么（截图/输入框/动画/对比图）
4. 推荐理由（每个选择 1 句话）

要求：
- 不要用 Inter / Roboto / Arial
- 不要用紫蓝渐变
- 和竞品的方案明确不同
```

### 第四步：注册 Google Stitch + 写 Prompt（15 分钟）

#### 注册

1. 打开 [stitch.withgoogle.com](https%3A%2F%2Fstitch.withgoogle.com)
1. Google 账号登录
1. 免费，无使用限制
### 写 Stitch Prompt

这是整个设计环节最核心的技能。 Prompt 写得好，一次就出好设计；写得差，要来回改 5 次。

把下面的模板复制过来，把 [方括号] 里的内容替换成你自己的：

```
Design a [dark/light]-theme landing page for [产品名] — [一句话定位].

Target users: [目标用户，用英文].

Typography: [Display 字体] for headings, [Body 字体] for body text.

Color scheme: [背景色 HEX] background, [主色 HEX] as primary accent, 
[强调色 HEX] for CTAs and highlights, [文字色 HEX] for text.

Page structure (top to bottom):

1. NAVIGATION: Logo left, nav links center, CTA button right.

2. HERO SECTION: [你选的 Hero 策略]. 
   Large headline "[你的标题，直接写定稿文案]". 
   Subheadline "[你的副标题]". 
   A prominent CTA button "[按钮文案]" in [强调色].
   [Hero 区视觉元素描述].

3. [SECTION 名称]: [具体描述，写清楚内容和布局].

4. HOW IT WORKS: [N] steps — "[步骤1]", "[步骤2]", "[步骤3]".

5. FEATURES: [N] feature items in [你选的布局]:
   - [Feature 1 标题]: [一句话描述]
   - [Feature 2 标题]: [一句话描述]
   ...

6. PRICING: [N] cards:
   - [Plan 1] ($[价格]/[周期]): [权益列表]
   - [Plan 2] ($[价格]/[周期]): [权益列表]
   [哪个 Plan] card highlighted.

7. FAQ: [N] expandable questions:
   - "[问题1]"
   - "[问题2]"
   ...

8. FOOTER: Logo, [links], copyright "[你的版权文字]".

Design constraints:
- [你选的调性] aesthetic
- NOT a typical boring SaaS template
- Do NOT use emoji as icons — use Material Icons or SVG only
- Asymmetric layout where appropriate, not everything centered
- Typography should be bold and distinctive
- [从约束表里补充的其他约束]
```

#### Prompt 写作要点

#### 实战示例（getchargen.com）

```
Design a premium dark-theme landing page for CharGen.ai — 
an AI Character Generator that creates character portraits 
+ full character sheets in one click.

Target users: DnD players, anime fans, novel writers, 
game developers.

Typography: Space Grotesk for headings, DM Sans for body text.

Color scheme: Deep black (#08080F) background, 
cyber-teal (#00E5CC) as primary accent, 
amber-gold (#FFBF00) for CTAs and highlights, 
soft white (#E8ECF0) for text.

Page structure (top to bottom):

1. HERO SECTION: Large headline "Generate Characters 
   with AI, Instantly". 
   Subheadline "Portrait + full character sheet in one 
   click — for DnD, anime, fantasy, and more". 
   A prominent glowing CTA input box where users can 
   type a character description, with a "Generate" 
   button in cyber-teal. Show a preview of a beautiful 
   fantasy character card floating beside the input.

2. DEMO SECTION: 3 pre-generated character card examples 
   — a DnD warrior, an anime schoolgirl, a fantasy mage. 
   Each shows portrait + name + brief stats.

3. HOW IT WORKS: 3 steps — "Describe Your Character", 
   "AI Generates Portrait + Sheet", "Export & Use".

4. USE CASES: 4 cards — DnD/TTRPG, Novels & Fiction, 
   Game Development, Anime & OC.

5. FEATURES: 6 items — Image+Text in One, Multiple 
   Templates, Structured Export, DnD Mode, Anime Style, 
   Fast Generation.

6. PRICING: 2 cards — Free ($0, 3/day, SDXL, watermark) 
   and Pro ($9/mo, 200/month, Flux, no watermark, all 
   templates, JSON export). Pro highlighted.

7. FAQ: 6 expandable questions.

8. FOOTER: Logo, Privacy, Terms, copyright.

Design constraints:
- Retro-futurism / cinematic / gaming-tool aesthetic
- NOT a boring SaaS template
- Asymmetric layouts, no three-column symmetry
- Do NOT use emoji as icons
- No purple gradients
```

### 第五步：在 Stitch 里生成 + 出 3 个方向（15 分钟）

#### 生成第一个方向

1. 在 Stitch 首页点 "+ New Project"
1. 给项目起个名（如 "CharGen.ai"）
1. 选 Desktop（先做桌面版）
1. 把你写好的 Prompt 粘贴进对话框
1. 按回车，等 1-2 分钟
#### 生成 3 个方向

在同一个 Stitch 项目里，创建 3 个 screen。每个 screen 用同一个 prompt，但改视觉风格：

#### 怎么选

问自己 3 个问题：

1. 哪个一眼看上去最不像 AI 模板？ — 选它
1. 哪个跟竞品差异最大？ — 加分
1. 哪个的 CTA 按钮最醒目？ — 加分
#### 精修

选定方向后，在对话框里继续修改。常用指令：

```
# 结构调整
"Make the hero section taller"
"Move the pricing section above the FAQ"
"Add more whitespace between sections"

# 配色调整
"Change the CTA button color to amber gold #FFBF00"
"Make the section backgrounds slightly different shades"

# 布局调整
"Make the feature cards use a 2x3 grid instead of 3x2"
"Make the hero asymmetric — headline left, visual right"

# 字体调整
"Use Space Grotesk for all headings"
"Make the headline bigger and bolder"
```

### 第六步：生成移动端（5 分钟）

桌面版定稿后，在 Stitch 里新建一个 screen，选 Mobile，prompt 写：

```
Create a mobile version of the desktop landing page above. 
Same content, same design system, same colors and fonts.
Adapt layout for mobile:
- Single column layout
- Hero headline max 2 lines
- Feature cards stack vertically
- Pricing cards stack vertically
- Navigation becomes hamburger menu
- Touch targets minimum 44px
```

### 第七步：导出 HTML/CSS 代码（2 分钟）

#### 操作

1. 选中你定稿的 screen
1. 点右上角 "Get Code"
1. 你会拿到一份完整的 HTML 文件
#### 代码长什么样

```
<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk..."
        rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#00E5CC",
            "background": "#08080F",
            ...
          }
        }
      }
    }
  </script>
</head>
<body>
  <!-- 完整的页面 HTML -->
</body>
</html>
```

### 第八步：生成品牌素材（20 分钟）

#### Logo 图标

方法 1：用 AI 生图（简单）

给 ChatGPT 或 Gemini 发：

```
Generate a minimalist logo icon for [产品名].

Requirements:
- Simple geometric mark, NOT text
- Single color: [你的主色 HEX] on transparent/dark background
- Clean enough to recognize at 32px (favicon size)
- Square format (1:1)
- No gradients, no shadows, no 3D effects
- One memorable visual idea only

The product is: [一句话描述]
The brand personality is: [你选的调性]
```

方法 2：用 SVG 手写/AI 辅助（高级，推荐）

给 Claude 发：

```
为 [产品名] 设计一个 SVG 矢量 Logo icon。

要求：
- 输出原始 SVG 代码（不是图片）
- 单色，用 [你的主色 HEX]
- viewBox="0 0 64 64"
- 几何化设计，从圆/方/三角的基形出发
- 必须在 16px 可辨识（细节不能太多）
- 只有一个记忆点
- 和产品概念有关联：[你的产品是做什么的]

同时生成 wordmark SVG：
- 用 [你的 Display 字体] 的路径
- 全小写 / 首字母大写（选一个）
- letter-spacing 微调

最后生成两个组合版本：
- stacked.svg：icon 上 + wordmark 下，居中
- horizontal.svg：icon 左 + wordmark 右，垂直居中
```

#### Favicon

方法 A（最简单，现代浏览器）：直接用 SVG 做 favicon

```
<link rel="icon" type="image/svg+xml" href="/icon.svg">
```

方法 B（兼容性好）：把 SVG/PNG 上传到 [realfavicongenerator.net](https%3A%2F%2Frealfavicongenerator.net%2F)，一键生成全套（favicon.ico + 多尺寸 PNG + apple-touch-icon）。

方法 C（命令行，需要 ImageMagick）：

```
convert icon.svg -resize 16x16 favicon-16.png
convert icon.svg -resize 32x32 favicon-32.png
convert icon.svg -resize 180x180 apple-touch-icon.png
convert icon.svg -resize 512x512 favicon-512.png
convert favicon-16.png favicon-32.png favicon.ico
```

#### OG Image（社交分享预览图）

方法 1：AI 生图

```
Generate a social media preview image (OG image) for [产品名].

Size: 1200x630 pixels (wide format, like a movie poster banner).
Background: [你的背景色 HEX]
Left side: Large bold headline "[你的首页标题]" in white/[文字色]
Right side: [产品截图描述 / 核心视觉元素]
Bottom left: Brand name "[产品名]" in [主色 HEX], small
Overall style: [你的调性], premium, not template-looking
```

方法 2：snapog API（如果有 key）

```
curl -X POST https://api.snapog.dev/v1/generate \
  -H "Authorization: Bearer $SNAPOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "template": "product",
    "params": {
      "title": "[你的产品名]",
      "accentColor": "[主色 HEX]"
    },
    "fontFamily": "[你的 Display 字体]"
  }' --output og-image.png
```

方法 3：Canva / Figma 模板

在 Canva 搜 "OG image template"，选一个改文字和颜色。免费。

#### Hero 配图

用 ChatGPT / Midjourney / nano-banana-pro 生成产品主视觉：

```
Generate a hero image for [产品名] landing page.

Style: [你的调性], premium quality
Content: [描述你想在 Hero 区展示什么——产品截图？使用场景？抽象视觉？]
Color palette: [主色] + [背景色] tones
Aspect ratio: 16:9 or custom
No text in the image (text will be added via HTML)
```

### 第九步：替换占位内容（15 分钟）

Stitch 生成的 HTML 里有两类东西需要替换：

#### 替换占位图片

Stitch 用 Google CDN 临时图片（lh3.googleusercontent.com/aida-public/...）。这些图片：

- 看起来还行，但不是你产品的真实图
- 可能过一段时间失效
你要做的：

1. 把 Hero 配图替换到 Hero 区
1. 把 Logo SVG 替换到导航栏
1. 其他占位图先用着，后面逐步替换
#### 核对文案

Stitch 有时会：

- 微调你的措辞（把 "Instantly" 改成 "In Seconds"）
- 给 FAQ 编答案（你要换成自己定稿的）
- 给 Feature 描述润色（检查是否还准确）
搜索替换法：

1. Ctrl+F 搜你的 Headline，看是否完全匹配
1. 逐个 section 过一遍文案
1. 把不对的替换成定稿文案
#### 加上 Meta 标签

在 <head> 里加：

```
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- OG Image -->
<meta property="og:title" content="[你的产品名] — [一句话定位]">
<meta property="og:description" content="[你的副标题]">
<meta property="og:image" content="https://[你的域名]/og-image.png">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[你的产品名] — [一句话定位]">
<meta name="twitter:description" content="[你的副标题]">
<meta name="twitter:image" content="https://[你的域名]/og-image.png">
```

#### 替换链接

Stitch 生成的按钮默认都是 href="#"。替换成真实链接：

- CTA 按钮 → 注册页 / 应用入口
- Privacy → /privacy
- Terms → /terms
- Logo → /
---

### 常见问题

#### Q：我没有设计基础，能跟这个教程做吗？

能。你需要的不是"设计能力"，而是"描述能力"——能说清楚你想要什么。如果你能写 PRD 和文案，你就能写 Stitch prompt。

#### Q：Stitch 收费吗？

免费。Google 账号登录就行。

#### Q：生成的代码能直接部署吗？

能用，但生产环境建议做几个改动：

1. 把 cdn.tailwindcss.com 换成本地 Tailwind 构建（性能更好）
1. 替换所有 Google CDN 临时图片
1. 给按钮加上真实链接
1. 加上统计代码（Google Analytics / Plausible）
1. 加上 Favicon 和 OG 标签
#### Q：Stitch 生成的设计不好看怎么办？

80% 是 prompt 问题。检查：

- 有没有给 HEX 色值？（不给色值 = AI 用默认配色 = AI 味）
- 有没有逐 section 描述？（笼统 prompt = 笼统结果）
- 有没有写"不要什么"？（约束比引导更有效）
- 有没有指定字体？（不指定 = Inter = AI 味）
- 试试加调性词："editorial layout"、"asymmetric"、"cinematic"
#### Q：除了 Stitch 还有什么工具？

#### Q：我的产品不是工具站，也能用这套流程吗？

能。Stitch 支持任何类型：工具站、SaaS、个人作品集、博客、活动页。流程通用，只是 prompt 内容不同。

#### Q：真的需要做 3 个方向吗？

强烈建议。原因：

1. 第一个方向往往不是最好的，但你不知道——因为你没有对比
1. 3 个方向的边际成本很低（改 3 个词重新生成就行）
1. 有对比才能做出好决策
#### Q：Logo 用 AI 生成的会不会有版权问题？

SVG Logo（方法 2）是你自己写的代码，没有版权问题。AI 生图（方法 1）的版权取决于使用的工具和条款：

- ChatGPT/DALL·E：商用可以，版权归你
- Midjourney：付费版商用可以
- 建议用 SVG 方法，既无版权问题，又矢量不失真
---



---

## references/stage-rubric.md

# 视觉设计与页面生成 Prompt 阶段判断规则

## 本阶段目标

基于 PRD 和冻结文案生成高保真设计真源：页面、状态、素材、设计系统和前端 handoff。

## 必须保留的内部流程精华（已脱敏）

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


## 质量门槛

- [ ] 设计是真源，不是单张概念图
- [ ] 前端可提取字体/颜色/间距/图标
- [ ] 关键交互状态齐全
- [ ] 视觉和上一个项目不撞脸

## 常见失败模式

- 只给截图不给 HTML/CSS 或变量
- 为了好看删掉 SEO/合规内容
- 临时外链未知素材
- 用通用 SaaS 模板替代站点类型特征

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## requirements.json

{
  "id": "site-design-student",
  "difficulty": "high",
  "accounts": [
    "Stitch 或 Figma/设计工具账号"
  ],
  "env": [
    "STITCH_API_KEY（使用 Stitch 自动生成时必须）"
  ],
  "browserSessions": [
    "Stitch 登录态",
    "Figma 登录态（如使用 Figma）"
  ],
  "blockingRules": [
    "明确要求 Stitch 生成设计真源但缺 STITCH_API_KEY 或登录态：BLOCKED: SETUP_REQUIRED",
    "缺 PRD/冻结文案：BLOCKED"
  ],
  "canContinueWithout": [
    "无参考图可继续，但标待确认",
    "无 Stitch 时只能产出设计 Prompt，不能标 Design DONE"
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

## scripts/validate_design_handoff.py

#!/usr/bin/env python3
"""视觉设计与页面生成 Prompt 最小校验脚本。用法：python scripts/validate_design_handoff.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['非默认字体', '非紫蓝白模板', 'Logo 16px 可辨识', '有 desktop/mobile 交付']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 视觉设计与页面生成 Prompt report basic structure passed')
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

## templates/page-generation-prompt.md

# 视觉设计与页面生成 Prompt — 标准交付物模板

## 1. 基本信息

- 项目：`[PROJECT]`
- 域名/候选域名：`[DOMAIN]`
- 当前阶段：`06-design`
- 执行人/Agent：`moying`
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

- [ ] 非默认字体
- [ ] 非紫蓝白模板
- [ ] Logo 16px 可辨识
- [ ] 有 desktop/mobile 交付

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

