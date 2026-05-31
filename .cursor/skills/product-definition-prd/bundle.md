# 产品定义与 PRD

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# 产品定义与 PRD 更新记录

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



---

## references/USAGE.md

# 产品定义与 PRD 使用说明

## 先说结论

这份 Skill 的主路径不是让你运行脚本，而是让你把“一键启动 Prompt”复制给 AI。脚本只是可选辅助，用来检查交接是否完整。

## 开始前先准备

这一版新增 Preflight。先确认缺什么，再让 AI 执行，避免跑到一半才发现没权限。

- 账号/后台：无硬性账号要求
- 环境变量 / Token：无硬性账号要求
- 浏览器登录态：无硬性账号要求
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
请按 ShipSolo 学员版 Skill「产品定义与 PRD」执行。
项目：[填写项目]
当前阶段：02-product
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：02-product
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] PRD 不只是关键词说明，而是可开发产品
- [ ] 每个 indexable 页面有真实价值和用户任务
- [ ] NOT-DO 明确
- [ ] 设计/文案/前后端都知道交付边界

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

### 这是什么

这是一个“从关键词到产品 PRD”的做站 Skill。

你给 AI 一个关键词或产品想法，它会按固定流程帮你输出：

- 值不值得做
- SERP 和竞品分析
- 用户场景
- 产品定位
- 功能范围
- 首页信息架构
- SEO 页面矩阵
- 定价草案
- 域名建议
- GTM 和埋点
- 风险评估
- 给文案 / 设计 / 开发的交接摘要
---

### 安装方式

把压缩包里的 product-definition-prd 文件夹放到你的 Skills 目录。

如果你使用 Hermes / OpenClaw / Claude Code 这类支持 Skills 的 Agent，把整个文件夹放进去即可。

目录结构应类似：

```
skills/
└── product-definition-prd/
    ├── SKILL.md
    └── 使用方式.md
```

---

### 最简单用法

直接对 AI 说：

```
请使用 product-definition-prd 这个 Skill，基于下面关键词做一个完整产品定义。

关键词：json formatter
要求：输出 PRD、首页 IA、功能范围、NOT-DO、SEO 页面矩阵、域名建议。
```

---

### 推荐输入格式

信息越完整，输出越准。

```
请使用 product-definition-prd 做站 PRD。

项目背景：我要做一个面向海外用户的 SEO 工具站。
目标关键词：xxx
月搜索量：xxx
CPC：xxx
KD：xxx
目标市场：美国 / 全球 / 中文 / 其他
已知竞品：
1. xxx.com
2. xxx.com
3. xxx.com

要求：
1. 判断这个站值不值得做
2. 分析 SERP 搜索意图
3. 拆 3 类目标用户
4. 给出产品定位
5. 明确 P0 / P1 / NOT-DO
6. 设计首页信息架构
7. 设计 SEO 页面矩阵
8. 给出定价草案
9. 给出域名候选 Top 3
10. 输出给文案、设计、开发的交接摘要
```

---

### 信息不全时怎么用

如果你只有关键词，也可以这样：

```
请使用 product-definition-prd。

我现在只有一个关键词：xxx
请你先基于公开信息补充 SERP 和竞品初扫，再输出一版 PRD。
没有证据的数据请标注为“假设”或“待验证”，不要编造。
```

---

### 输出格式建议

让 AI 按这个结构输出：

```
# [产品名] PRD

## 0. 结论先行
## 1. 市场概述
## 2. SERP 与竞品分析
## 3. 目标用户
## 4. 产品定位
## 5. 功能规划
## 6. 页面信息架构
## 7. 定价设计
## 8. 域名与技术栈
## 9. GTM 策略
## 10. 转化漏斗与埋点
## 11. 风险评估
## 12. 交接摘要
```

---

### 示例 Prompt 1：从关键词做完整 PRD

```
请使用 product-definition-prd 这个 Skill，帮我做一个出海工具站 PRD。

目标关键词：yaml validator
市场：全球英文用户
已知信息：搜索量约 22K，CPC 约 $1.35
要求：
- 先判断是否值得做
- 实扫 SERP 并判断搜索意图
- 找 Top 3 竞品
- 明确产品定位
- 规划功能范围，区分 P0 / P1 / NOT-DO
- 输出首页 IA
- 输出 SEO 页面矩阵
- 输出定价草案
- 输出域名候选 Top 3
- 最后给文案、设计、开发各一份交接摘要
```

---

### 示例 Prompt 2：从想法做产品定义

```
请使用 product-definition-prd。

我想做一个 AI YouTube Title Generator，面向英文创作者。
请先判断这个方向是否值得做，再输出完整产品定义。

注意：
- 没有证据的数据标注为待验证
- 不要只写功能，要写用户场景和转化路径
- 明确首版不做什么
```

---

### 示例 Prompt 3：已有竞品时

```
请使用 product-definition-prd，基于以下竞品做一个差异化 PRD。

关键词：ai headshot generator
竞品：
1. aragon.ai
2. headshotpro.com
3. photoai.com

要求：
- 不要做泛泛的 AI 图片工具
- 找一个细分用户切入
- 明确和竞品不同的定位
- 首页首屏必须能 3 秒说清价值
- 输出 P0 功能和 NOT-DO
```

---

### 使用时的注意事项

1. 不要让 AI 只凭感觉写 PRD。必须要求它看 SERP、看竞品、标注假设。
1. 不要一上来堆功能。先判断用户为什么搜、现在怎么解决、为什么会换。
1. NOT-DO 必须写。很多产品失败不是因为做少了，而是首版做散了。
1. 成熟竞品市场，不要拿半成品上线；全新品类或低搜索量方向，可以先 MVP 验证。
1. PRD 最终要能直接交给文案、设计、开发，而不是只给自己看。
---

## 第三部分：手动实操 — 没有 OpenClaw 也能做

你需要准备一个能联网的 AI 工具（Claude / ChatGPT / Gemini 均可）。

### 准备工作

#### 你需要的输入

#### 准备一个文档

建议用 Markdown 文件，从头到尾按步骤填写。最终这个文件就是你的 PRD。

```
touch prd-你的产品名-$(date +%Y%m%d).md
```

### Step 1：快速过滤 — 值不值得做（10 分钟）

#### 操作步骤

1. 打开 Google Trends，搜你的目标关键词
1. 打开 Google，搜你的目标关键词
1. 回答以下 5 个问题
#### 5 问快筛

#### 判断标准

#### AI 辅助提示词

如果你想用 AI 帮你做初步判断，复制以下提示词：

```
我找到一个关键词想做工具站，帮我快速评估值不值得做。

关键词：{你的关键词}
月搜索量：{数字}
KD：{数字}
CPC：${数字}

请回答以下 5 个问题：
1. 这是长期需求还是短期热点？（搜 Google Trends 看 12 个月趋势）
2. SERP 前 10 有几个独立小站？有没有大品牌盘踞？
3. 竞品有没有在收费？用户有没有付费意愿？
4. 市场规模估算：SOM（第一年可获取收入）是否 > $100K/年？
5. 能否用 programmatic SEO 规模化？（是否有 generator/checker/converter 等修饰词可扩展）

对每个问题给出通过/不通过判断，最后给出"做/不做/有条件做"的建议。
```

#### 常见坑

- 坑 1：搜索量高不等于值得做。"free AI" 月搜百万，但用户只想白嫖，无付费场景。
- 坑 2：KD 低不等于容易排。看看 SERP 里的站是不是大平台的子页面，那种虽然 KD 低但你也排不上去。
- 坑 3：Google Trends 的"热门"可能是短期爆发（如某个病毒视频带火的词）。看 12 个月趋势，不看 7 天。
### Step 2：SERP 实扫 — 确认搜索意图（15 分钟）

#### 操作步骤

1. 在 Google 搜索你的目标关键词
1. 逐个打开前 10 个结果
1. 对每个结果记录：名称、类型、是独立站还是大平台
#### 记录模板

#### AI 辅助提示词

```
帮我分析以下关键词的 SERP 结果。

关键词：{你的关键词}

请搜索这个关键词，分析 Google 前 10 的结果：
1. 列出每个结果的名称、URL、类型（工具页/内容页/商业页）
2. 标注哪些是独立小站，哪些是大平台
3. 判断用户搜这个词的真实意图是什么（想用工具？想看文章？想比较？）
4. 独立小站占比多少？>=5 个是好信号
5. 有没有明显质量差但排名还不错的站？（说明 SEO 竞争不激烈）

输出为表格 + 意图判断 + 竞争评估。
```

#### 常见坑

- 坑 1：只看标题不打开网站。标题说是"generator"，打开发现是一篇博客文章。
- 坑 2：忽略 Tier 2/3 竞品。SERP 里可能没有直接竞品，但 ChatGPT 已经能做这件事了。
- 坑 3：不同地区的 SERP 结果不同。如果你面向海外用户，用 VPN 或 Google 的 gl= 参数看目标市场的结果。
### Step 3：竞品分析 + 用户画像（20 分钟）

#### 操作步骤

1. 从 SERP Top 5 中挑 3 个竞品，逐个打开
1. 记录每个竞品的功能、定价、明显缺陷
1. 去 Reddit / G2 / Trustpilot 搜关键词，看用户真实反馈
1. 定义至少 3 类用户
#### 竞品分析模板

#### ICP 定义提示词

```
我在做一个 {你的产品描述} 工具站，目标关键词是 {keyword}。

SERP 实扫结果：
{粘贴你在 Step 2 记录的 SERP 结果}

主要竞品：
{粘贴你记录的竞品信息}

请帮我定义至少 3 类目标用户（ICP）。对每类用户回答 6 个问题：

| 维度 | 问题 |
|------|------|
| Who | 谁？一句话描述（年龄/职业/身份） |
| Pain | 为什么痛？痛有多急？ |
| Current | 目前用什么替代？ |
| Trigger | 什么事件触发他搜索这个词？ |
| Hangout | 在哪出没？（哪个 Reddit sub / Discord / 论坛） |
| Willingness | 愿不愿意付费？多少钱？ |

然后从中选出一个"主力用户"——痛点最明确、付费意愿最强、最容易通过 SEO 触达的那个。
```

#### 常见坑

- 坑 1：编造用户画像。不要凭想象写"25 岁设计师"，去 Reddit 看真实用户在问什么。
- 坑 2：忽略 Tier 3。"用户目前在手动做"才是最大的竞争对手。
- 坑 3：只看竞品首页不看定价页。定价页暴露了竞品的商业模式和成本结构。
### Step 4：产品定位（20 分钟）

#### 操作步骤

1. 走 April Dunford 6 步定位法
1. 输出定位语句
1. 拆消息层级
1. 列禁词
#### 定位提示词

```
我在做一个工具站，以下是前期调研结果：

目标关键词：{keyword}
搜索意图：{工具型/信息型/混合型}

竞品分析：
{粘贴 Step 3 的竞品分析}

目标用户（主力）：
{粘贴 Step 3 选出的主力用户}

请用 April Dunford 的 6 步定位法帮我做产品定位：

1. 列出竞争替代方案（直接竞品 + 相邻方案 + 现状/手动方式）
2. 提取我们可以做到的独有属性（功能、体验、定价结构上的差异）
3. 把每个独有属性映射到用户价值（为用户解决什么具体问题？）
4. 确认最佳用户（谁最在乎这些价值？）
5. 选择市场品类（正面竞争 / 细分切入 / 创造新品类）
6. 叠加趋势（为什么现在做？）

最终输出：
1. 定位语句（用 FOR...WHO...IS A...THAT...UNLIKE... 格式）
2. 消息层级表（Headline / Subhead / Benefits / Features / Proof）
3. 禁词列表（不能把产品说成什么）
4. 差异化策略（用哪个方向差异化，为什么）
```

#### 预期输出格式

```
## 定位语句

FOR indie 开发者和创业者
WHO 需要快速计算不同 LLM 的真实使用成本
LLMPrice IS A LLM 定价计算器
THAT 一键对比所有主流模型的真实成本
UNLIKE 手动翻文档或用 ChatGPT 算
LLMPrice 实时更新、支持自定义用量、可视化对比

## 消息层级

| 层级 | 内容 |
|------|------|
| Headline | Compare LLM Costs in Seconds |
| Subhead | Real-time pricing for every major AI model |
| Benefit 1 | Save hours — no more digging through pricing pages |
| Benefit 2 | ... |
| Proof | ... |

## 禁词
- 不要说"AI-powered"（用户来就是为了 AI，不需要强调）
- 不要说"next-generation"（空洞）
```

### Step 5：功能规划（30 分钟）

#### 操作步骤

1. 打开 Top 3 竞品，列出每个竞品的所有功能
1. 合并成一张功能清单
1. 按 4 类分组
1. 写 NOT-DO 列表
#### 功能规划提示词

```
我在做一个 {产品描述} 工具站。

产品定位：
{粘贴 Step 4 的定位语句}

竞品功能（从实际竞品网站提取）：
竞品 A：{列出功能}
竞品 B：{列出功能}
竞品 C：{列出功能}

请帮我做功能规划。要求：
1. 对标竞品 Top 3 的功能集，一个不少
2. 在差异化点上超越竞品
3. 付费转化闭环必须完整（免费→限制→升级提示→支付→Pro解锁）
4. SEO 页面矩阵一次铺好

按以下 4 类输出：

### 核心功能
（产品的核心使用流程）

### Landing Page & SEO
（首页 + 子场景页 + 博客 + FAQ）

### 付费 & 转化
（免费限制 + 升级提示 + Stripe + Pro 解锁）

### 合规 & 基础设施
（PP/ToS + 内容过滤 + Plausible 埋点）

### NOT-DO（明确不做的功能 + 原因）
```

#### 关于 MVP vs 完整版

### Step 6：信息架构（15 分钟）

#### 首页结构模板

#### SEO 页面矩阵提示词

```
我的工具站关键词是 {keyword}，产品功能是 {简要描述}。

请帮我规划 SEO 页面矩阵，包括：

1. 首页（/）— 目标主关键词
2. 子场景页（/{场景}）— 每个页面瞄准一个长尾词，KD <= 15
3. 对比页（/compare/{a}-vs-{b}）— 如果适用
4. 博客页（/blog/{slug}）— 瞄准信息型关键词
5. 工具变体页（/tools/{slug}）— 如果有 programmatic SEO 机会

对每个页面给出：路径、目标关键词、页面类型、预估搜索量。

至少列 10 个页面。
```

### Step 7：域名调研（10 分钟）

#### 操作步骤

1. 根据目标关键词生成候选域名
1. 用域名查询工具批量检查注册状态
1. 记录可注册域名
1. 选 Top 3 推荐
#### 查询工具

优先用：

- NameBeta: https://namebeta.com/
- QueryDomain: https://query.domains/
- Namecheap / GoDaddy / Porkbun 域名搜索
- Cloudflare Registrar（如已接入）
#### 候选域名生成

每个关键词可以按以下方式查询变体域名：

##### 直接关键词型

- {keyword}.com
- {keyword}.app
- {keyword}.tools
- {keyword}.dev
- {keyword}.co
##### 前缀型

- get{keyword}.com
- try{keyword}.com
- use{keyword}.com
- my{keyword}.com
##### AI / Tool 组合型

- {keyword}ai.com
- {keyword}tool.com
- {shortword}ai.com
- {shortword}tools.com
#### 推荐优先级

#### 域名调研结果

目标关键词：xxx

#### 域名购买（以 DynaDot 为例）

https://www.dynadot.com/

进入购物车，确认价格，点击结账：

选择支付宝付款即可：

### Step 8：定价设计（15 分钟）

#### 操作步骤

1. 列出竞品定价（从 Step 3 提取）
1. 确定用户心理锚点
1. 设计套餐
1. 做成本验算
#### 定价提示词

```
我在做一个 {产品描述} 工具站。

竞品定价：
- 竞品 A：{定价模式}
- 竞品 B：{定价模式}
- 竞品 C：{定价模式}

核心功能调用一次的 API 成本：约 ${单次成本}
（如果不确定成本，请帮我估算主流 API 的调用成本）

请帮我设计定价方案：

1. Free 层：让用户体验核心价值，但有明确限制
2. Pro 层：主力付费层，月付
3. Lifetime 层（可选）：早期用户钩子

要求：
- 不要写"无限"，Pro 必须设月次数上限
- 做成本验算：免费用户日成本 / Pro 用户月成本 / 验证 Pro 月费 > Pro 月成本
- 参考竞品定价设锚点
- 免费额度要让用户感受到价值但不够用

输出格式：

| Plan | 价格 | 核心权益 | 月成本上限 |
|------|------|----------|-----------|
| Free | $0 | ... | $... |
| Pro | $X/mo | ... | $... |
```

#### 成本验算模板

```
成本验算

单次 API 成本：$X
免费用户：
日限制：N 次
预估日活：Y 人
日成本：N x $X x Y = $Z

Pro 用户：
月上限：M 次
月成本：M x $X = $W
月费：$P
毛利率：（$P - $W） / $P = XX%

验证：Pro 月费 > Pro 月成本 → 通过/不通过
```

#### 常见坑

- 坑 1：定价写"无限生成 $9/月"。重度用户一个月调 5000 次，你直接亏穿。
- 坑 2：免费层太慷慨。如果免费就够用，没人付费。
- 坑 3：不看竞品定价。你定 $19/月，竞品 $5/月，你需要极强的差异化才行。
### Step 9：汇总 PRD + 写交接摘要（10 分钟）

#### 交接顺序（不能乱）

```
PRD 完成
  ↓
定价校准 + 合规审查（可并行）
  ↓
文案（必须等定价和合规确认）
  ↓
设计（必须等文案定稿）
  ↓
开发（等设计确认）
```

#### 交接摘要提示词

```
以下是我的完整 PRD：
{粘贴你之前所有步骤的产出}

请帮我生成三份交接摘要：

### 给文案
- 产品定位语句
- 消息层级（Headline / Subhead / Benefits / Proof）
- 禁词（不能把产品说成什么）
- CTA 格式要求（动词+结果，如"Generate My Character"，不是"Submit"）
- FAQ 必须覆盖的问题

### 给设计
- 首页 section 顺序
- Hero 区必须有内嵌工具入口
- Mobile-first
- 首版必须有的 section vs 可后补的
- 视觉风格参考建议

### 给开发
- 完整功能范围（核心 + SEO + 付费 + 合规）
- 技术栈建议（Cloudflare Pages + Workers / D1 / Stripe / Plausible）
- NOT-DO 列表
- 首版不做的功能（登录/历史记录/批量API/队列，除非业务必须）
```

### 完整 PRD 自查清单

写完 PRD 后，逐条对照：

- [ ] 有明确的关键词数据支撑（搜索量 / KD / CPC）
- [ ] SERP 经过实扫，搜索意图和产品方向一致
- [ ] 竞品做了三层分级（直接/相邻/现状）
- [ ] 产品定位走了 April Dunford 框架，有结构化定位语句
- [ ] 消息层级拆清楚了（headline / subhead / benefits / features / proof）
- [ ] 明确选定了主力用户（ICP）
- [ ] 差异化不是靠"功能更多"
- [ ] 功能对标竞品 Top 3，上线即有竞争力
- [ ] 有明确的 NOT-DO 列表
- [ ] 域名经过四重验证
- [ ] 定价有竞品锚点 + 成本验算
- [ ] 首页 IA 可以直接给设计师用
- [ ] 有 Kill/Iterate/Scale 判断标准
- [ ] 交接顺序正确：定价+合规 → 文案 → 设计 → 开发
- [ ] 风险列表写了缓解措施
---



---

## references/prd-quality-gate.md

# 产品定义与 PRD — 内部能力脱敏参考

## 阶段核心能力

ICP、April Dunford 定位、功能边界、IA、SEO 页面矩阵、域名和 GTM

## 执行顺序

1. 先读上游交接摘要，确认输入是否满足契约。
2. 缺关键输入时输出 `[BLOCKED]`，不要编造数据或替用户做高风险决策。
3. 可推进时按 `SKILL.md` 的 Phase 顺序执行，所有依据写来源或标 `[待确认]`。
4. 完成后用模板生成交付物，再运行脚本做最小校验。
5. 最后一段写下游交接摘要，状态只能是 `[DONE] / [BLOCKED] / [NEEDS_REVIEW]`。

## 质量门槛

- [ ] 必须有 NOT-DO
- [ ] 必须有首页 IA
- [ ] 必须有 SEO 页面矩阵
- [ ] 必须有下游交接摘要

## 脱敏边界

- 可以保留流程、字段、判断标准、模板、脚本骨架。
- 不保留真实 API Key、Cookie、Token、内部路径、生产库名、群聊 ID、真实客户数据。
- 公开示例统一用 `[PROJECT]`、`[DOMAIN]`、`[API_KEY]`、`[ACCOUNT]` 这类占位符。



---

## references/stage-rubric.md

# 产品定义与 PRD 阶段判断规则

## 本阶段目标

把关键词机会转成可执行 PRD：定位、ICP、站点类型、页面矩阵、真实用户任务和下游合同。

## 必须保留的内部流程精华（已脱敏）

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


## 质量门槛

- [ ] PRD 不只是关键词说明，而是可开发产品
- [ ] 每个 indexable 页面有真实价值和用户任务
- [ ] NOT-DO 明确
- [ ] 设计/文案/前后端都知道交付边界

## 常见失败模式

- 所有站都套 SaaS landing 模板
- 没有用户任务，只写页面名
- 没有 route contract，后面出现 /privacy /terms 404
- 为了完整堆功能，首版失焦

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## requirements.json

{
  "id": "product-definition-prd",
  "difficulty": "low",
  "accounts": [],
  "env": [],
  "browserSessions": [],
  "blockingRules": [
    "缺关键词机会或目标市场：BLOCKED",
    "缺竞品证据：NEEDS_REVIEW，不能直接给 DONE"
  ],
  "canContinueWithout": [
    "信息不完整时可产出 PRD v0，但必须标待确认"
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

## scripts/validate_prd.py

#!/usr/bin/env python3
"""产品定义与 PRD 最小校验脚本。用法：python scripts/validate_prd.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['必须有 NOT-DO', '必须有首页 IA', '必须有 SEO 页面矩阵', '必须有下游交接摘要']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 产品定义与 PRD report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))



---

## templates/prd-template.md

# 产品定义与 PRD — 标准交付物模板

## 1. 基本信息

- 项目：`[PROJECT]`
- 域名/候选域名：`[DOMAIN]`
- 当前阶段：`02-product`
- 执行人/Agent：`moce`
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

- [ ] 必须有 NOT-DO
- [ ] 必须有首页 IA
- [ ] 必须有 SEO 页面矩阵
- [ ] 必须有下游交接摘要

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

