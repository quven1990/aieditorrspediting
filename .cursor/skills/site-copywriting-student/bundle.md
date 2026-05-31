# 落地页文案与转化结构

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# 落地页文案与转化结构 更新记录

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
name: site-copywriting-student
title: 落地页文案与转化结构
description: 把 PRD、定价、合规和 SEO 要求转成可设计、可上线、可转化的页面文案。
version: 2.2.0
owner: ShipSolo
agent: mobi
category: 做站全流程
stage: 05-copy
updated: 2026-05-26
student_level: beginner
source: internal-site-building-flow-publicized
---

# 落地页文案与转化结构

把 PRD、定价、合规和 SEO 要求转成可设计、可上线、可转化的页面文案。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`05-copy`
- 角色：把 PRD、定价、合规和 SEO 要求转成可设计、可上线、可转化的页面文案。
- 上游：PRD、定价、合规、SEO 页面矩阵。
- 下游：设计、前端、SEO。

## 什么时候使用

- 要写首页、功能页、FAQ、定价区、CTA
- 要把 SEO 页面文案设计前冻结
- 要去掉 AI 味和空泛承诺
- 要保证禁词/合规不踩线

## 输入契约

开始前尽量准备：

- 定位和 ICP
- 页面矩阵与主关键词
- 定价/套餐/CTA
- 禁词和合规边界
- 竞品文案样本

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
- 缺 PRD/定位/页面矩阵：BLOCKED
- 缺定价/合规口径：NEEDS_REVIEW，不能 DONE

### 可以降级继续
- 可先出文案草案，但 CTA/价格/合规声明标待确认

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
你现在执行 ShipSolo 做站流水线的「落地页文案与转化结构」阶段。

项目：[项目名称]
当前阶段：05-copy
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

### 1. 消息层级
Headline、Subhead、Benefits、Features、Proof、CTA，一层层写清楚。

### 2. 转化结构
Hero → Proof → Problem → Solution → Demo/How it works → Pricing → FAQ → CTA。

### 3. SEO-Copy Freeze
每个 indexable 页面写 H1/H2/H3、目标词数、语义词、FAQ/schema 文案和设计落位建议。

### 4. 风格处理
实用、具体、短句，少形容词；能给数字就给范围，没证据就标待确认。

### 5. 合规扫描
禁词、夸大承诺、官方/背书、免费/无限等表达全部检查。

### 6. 交接
输出 final copy blocks，设计不可随意删 SEO 内容，前端不可现场重写。


## 交付物

- Landing copy
- SEO copy freeze package
- FAQ/schema 文案
- CTA 文案
- 禁词扫描结果
- 设计交接摘要

## 验收清单 / 质量门槛

- [ ] 5 秒内知道 What/Who/Why/CTA
- [ ] 每个页面文案能直接给设计排版
- [ ] 没有空泛 AI 话术
- [ ] 禁词和合规风险已处理

## 下游交接格式

```markdown
# 落地页文案与转化结构交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：05-copy
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
- 下一阶段：设计、前端、SEO。
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
请加载 ShipSolo Skill：site-copywriting-student，按我的项目资料执行。
```

## 常见坑

- 设计后再硬塞 SEO 长文
- 所有 CTA 都叫 Learn More
- 把没有证据的效果写成保证
- 文案很完整但用户不知道下一步做什么

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

# 落地页文案与转化结构 使用说明

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
请按 ShipSolo 学员版 Skill「落地页文案与转化结构」执行。
项目：[填写项目]
当前阶段：05-copy
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：05-copy
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] 5 秒内知道 What/Who/Why/CTA
- [ ] 每个页面文案能直接给设计排版
- [ ] 没有空泛 AI 话术
- [ ] 禁词和合规风险已处理

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

## references/copy-quality-rules.md

# 落地页文案与转化结构 — 内部能力脱敏参考

## 阶段核心能力

Hero、价值主张、CTA、FAQ、Meta、SEO 子页、反 AI 味

## 执行顺序

1. 先读上游交接摘要，确认输入是否满足契约。
2. 缺关键输入时输出 `[BLOCKED]`，不要编造数据或替用户做高风险决策。
3. 可推进时按 `SKILL.md` 的 Phase 顺序执行，所有依据写来源或标 `[待确认]`。
4. 完成后用模板生成交付物，再运行脚本做最小校验。
5. 最后一段写下游交接摘要，状态只能是 `[DONE] / [BLOCKED] / [NEEDS_REVIEW]`。

## 质量门槛

- [ ] Headline 结果导向
- [ ] CTA 是动词+结果
- [ ] FAQ 首句直答
- [ ] 禁用空泛 AI 味词

## 脱敏边界

- 可以保留流程、字段、判断标准、模板、脚本骨架。
- 不保留真实 API Key、Cookie、Token、内部路径、生产库名、群聊 ID、真实客户数据。
- 公开示例统一用 `[PROJECT]`、`[DOMAIN]`、`[API_KEY]`、`[ACCOUNT]` 这类占位符。



---

## references/feishu-tutorial.md

## 第二部分：OpenClaw / Hermes 自动化

### 安装方式

把整个目录放到你的 skills 目录下：

```
skills/site-copywriting-student/SKILL.md
```

如果是 Hermes / OpenClaw / Claude Code 这类支持 Skill 的 Agent，放好后新开会话，让 Agent 加载或使用：

```
使用 site-copywriting-student skill，为下面产品生成英文首页文案：
[粘贴产品信息]
```

## 最短口令

```
用 site-copywriting-student skill，按 9 区块首页结构，为这个产品写英文落地页文案。框架：Hero=PAS，Use Cases=BAB，Features=FAB，Pricing=4Ps，Final CTA=SSS。不要编假数据，信息不足标 [待确认]，最后做 8 条铁律自查。
```

## 产品信息模板

```
product_name: ""
one_liner: ""
target_users:
  - ""
  - ""
  - ""
main_pain_points:
  - ""
  - ""
  - ""
core_value: ""
differentiation: ""
primary_keyword: ""
pricing:
  free: ""
  pro: ""
  lifetime: ""
proof:
  users: ""
  usage: ""
  testimonials: ""
compliance_notes:
  - ""
```

---

## 第三部分：手动实操 — 一步步教你怎么做

### Step 1：准备原材料（10 分钟）

写文案之前，这些信息必须已经有了。没有 = 先补齐再来。

把这些信息列在一个文档里：

```
产品名：[xxx]
一句话说清楚：[产品做什么]
目标用户：[3-4 个人群]
用户痛点（从 Reddit 扒的原话）：
  - "[痛点1]"
  - "[痛点2]"
  - "[痛点3]"
竞品弱点：
  - [竞品A]：[弱点]
  - [竞品B]：[弱点]
我们的差异化：[一句话]
定价：Free [限制] → Pro $[价格]/月 [额度] → Lifetime $[价格]
合规禁词：[从墨盾拿到的禁用表述列表]
```

### Step 2：写 Hero 区（10 分钟）

#### 提示词模板

```
你是一个专注 SaaS/工具站的转化文案专家。请用 PAS（Problem-Agitate-Solve）框架
帮我写首页 Hero 区。

产品信息：
- 产品名：[你的产品名]
- 一句话描述：[产品做什么]
- 目标用户：[给谁用]
- 用户最大痛点：[从 Reddit/G2 扒的用户原话]
- 竞品弱点：[竞品做不好的地方]
- 我们的差异化：[我们比竞品强在哪]

输出要求：
1. Headline：≤10 个英文词，包含核心卖点
2. Subhead：1-2 句话，补充说明 how 或 for whom
3. CTA 按钮文案：用「动词 + 结果 + 降低摩擦」公式
4. CTA 按钮下方小字：降低门槛（如 "No signup required"）
5. 给 3 个 Headline 变体（Action-Outcome / Benefit-First / Problem-Solution 各一个）

注意：
- "you/your" 出现频率必须高于 "we/our"
- 不用模糊形容词（如 powerful、ultimate、innovative），用具体数字
- 第一句话必须是用户的痛点，不是你的产品介绍
```

#### 生成后检查 5 个点

### Step 3：写 How It Works（5 分钟）

#### 铁律：永远 3 步

#### 提示词模板

```
我的产品是 [产品名]，[一句话描述]。

请帮我写 "How It Works" 区块，要求：
1. 只能有 3 步（Step 1 / Step 2 / Step 3）
2. 每步标题 3-5 词，用动词开头
3. 每步描述 1 句话，≤20 词
4. 从用户视角写（"You upload..." 不是 "Our system processes..."）
```

### Step 4：写场景卡片（15 分钟）

#### 提示词模板

```
我的产品是 [产品名]，目标用户包括：
1. [用户群 A]
2. [用户群 B]
3. [用户群 C]

请用 BAB（Before-After-Bridge）框架，为每个用户群写一张场景卡片。

每张卡片格式：
- 场景名：[面向哪个用户群]
- Before：1-2 句话描述没有这个产品时用户怎么受苦（用用户的语言）
- After：1-2 句话描述用了产品之后的理想状态（描述结果，不描述过程）
- Bridge：1 句话说怎么做到的（越短越好）

注意：
- Before 部分尽量用 Reddit/G2 上的用户原话
- After 部分包含具体数字或时间对比
- Bridge 部分不超过 15 个词
```

### Step 5：写功能区（10 分钟）

#### 提示词模板

```
我的产品核心功能：
1. [功能 A]
2. [功能 B]
3. [功能 C]
4. [功能 D]

请用 FAB（Feature-Advantage-Benefit）框架，为每个功能写一条文案。

每条格式：
- Feature Title：3-5 词
- Feature Description：1-2 句话
  - 第 1 句：这个功能是什么 + 比竞品强在哪（Advantage）
  - 第 2 句：用户得到什么好处（Benefit，必须从用户视角写）

注意：
- 选 4-6 个最核心的功能，不要列 10 个
- 每个 Benefit 回答"所以用户能......"
- 不用 "powerful" / "advanced" / "state-of-the-art" 这些空词
```

### Step 6：写定价区（10 分钟）

#### 提示词模板

```
我的定价方案：
- Free：[限制和权益]
- Pro：$[价格]/月，[权益]
- Lifetime（可选）：$[价格]，[权益]

竞品定价参考：
- [竞品 A]：[价格和模式]
- [竞品 B]：[价格和模式]

请帮我写定价区文案，用 4Ps（Promise-Picture-Proof-Push）框架：
1. 每个 Plan 的名称和一行 tagline
2. 权益列表（正面表述："5 free images daily" 不是 "Limited to 5"）
3. 帮我算单价（$X/月 ÷ 次数 = $X/次），用来做价格锚定
4. CTA 按钮文案 + 下方小字
5. 如果有 Lifetime，加稀缺性文案

注意：
- 免费层叫 "Free" 或 "Starter"，不叫 "Basic"（暗示低质量）
- 先展示价值再展示价格
- "No credit card required" / "Cancel anytime" 这类信任文案必须有
- 如有合规要求的自动续费说明，写在小字里
```

### Step 7：写 FAQ（10 分钟）

#### 核心逻辑

FAQ 不是"回答问题"，是处理购买异议。用户不买，无非这几个原因：

#### 提示词模板

```
我的产品是 [产品名]，[一句话描述]。
定价：[Free/Pro/Lifetime 方案]

请帮我写 6-10 条 FAQ，要求：
1. 每条 FAQ 对应一个购买异议
2. 答案第一句必须直接回答 Yes/No 或给出结论
3. 答案总长不超过 3 句话
4. 每条 FAQ 的答案控制在 40-60 词（为 Google Featured Snippet 优化）
5. 语气友好直接，不要法律腔

❌ 不要写成这样：
"Our platform offers a generous free tier that allows users to explore..."

✅ 写成这样：
"Yes. 3 free per day. No sign-up, no credit card."
```

### Step 8：写社会证明区（5 分钟）

#### 已有用户数据

- 用具体结果："I generated 5 NPCs in 10 minutes"
- 带来源标注："— Reddit r/DnD user"
- 数字牌："X，XXX characters generated"
#### MVP 刚上线（冷启动）

- ✅ 用活动指标替代用户数："10,000+ images extended this week"
- ✅ 用产品特性做信任信号："5 free daily， no watermark， no signup"
- ✅ 用 Product Hunt badge（如果有）
- ❌ 不要编假评价
- ❌ 不要用假 testimonial
### Step 9：通读 + 砍 30%（10 分钟）

1. 把整篇文案从头到尾读出声
1. 读到卡壳的句子 → 重写
1. 读到"正确但不惊艳"的段落 → 删掉
1. 数 "you/your" vs "we/our" → you 要是 we 的 2 倍
1. 检查每个 CTA → 是不是"动词+结果"格式
1. 检查每个数字 → 具体吗？能更具体吗？
---



---

## references/stage-rubric.md

# 落地页文案与转化结构 阶段判断规则

## 本阶段目标

把 PRD、定价、合规和 SEO 要求转成可设计、可上线、可转化的页面文案。

## 必须保留的内部流程精华（已脱敏）

### 1. 消息层级
Headline、Subhead、Benefits、Features、Proof、CTA，一层层写清楚。

### 2. 转化结构
Hero → Proof → Problem → Solution → Demo/How it works → Pricing → FAQ → CTA。

### 3. SEO-Copy Freeze
每个 indexable 页面写 H1/H2/H3、目标词数、语义词、FAQ/schema 文案和设计落位建议。

### 4. 风格处理
实用、具体、短句，少形容词；能给数字就给范围，没证据就标待确认。

### 5. 合规扫描
禁词、夸大承诺、官方/背书、免费/无限等表达全部检查。

### 6. 交接
输出 final copy blocks，设计不可随意删 SEO 内容，前端不可现场重写。


## 质量门槛

- [ ] 5 秒内知道 What/Who/Why/CTA
- [ ] 每个页面文案能直接给设计排版
- [ ] 没有空泛 AI 话术
- [ ] 禁词和合规风险已处理

## 常见失败模式

- 设计后再硬塞 SEO 长文
- 所有 CTA 都叫 Learn More
- 把没有证据的效果写成保证
- 文案很完整但用户不知道下一步做什么

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## requirements.json

{
  "id": "site-copywriting-student",
  "difficulty": "low",
  "accounts": [],
  "env": [],
  "browserSessions": [],
  "blockingRules": [
    "缺 PRD/定位/页面矩阵：BLOCKED",
    "缺定价/合规口径：NEEDS_REVIEW，不能 DONE"
  ],
  "canContinueWithout": [
    "可先出文案草案，但 CTA/价格/合规声明标待确认"
  ]
}



---

## scripts/audit_copy_quality.py

#!/usr/bin/env python3
"""落地页文案与转化结构 最小校验脚本。用法：python scripts/audit_copy_quality.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['Headline 结果导向', 'CTA 是动词+结果', 'FAQ 首句直答', '禁用空泛 AI 味词']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 落地页文案与转化结构 report basic structure passed')
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

## templates/landing-copy-template.md

# 落地页文案与转化结构 — 标准交付物模板

## 1. 基本信息

- 项目：`[PROJECT]`
- 域名/候选域名：`[DOMAIN]`
- 当前阶段：`05-copy`
- 执行人/Agent：`mobi`
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

- [ ] Headline 结果导向
- [ ] CTA 是动词+结果
- [ ] FAQ 首句直答
- [ ] 禁用空泛 AI 味词

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

