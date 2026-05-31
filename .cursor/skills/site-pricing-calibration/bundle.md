# 定价与商业模型校准

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# 定价与商业模型校准 更新记录

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
name: site-pricing-calibration
title: 定价与商业模型校准
description: 根据竞品、成本、免费额度和转化路径，设计 Free/Pro/Lifetime 或咨询型套餐，并算清楚不能亏。
version: 2.2.0
owner: ShipSolo
agent: mozhang
category: 做站全流程
stage: 03-pricing
updated: 2026-05-26
student_level: beginner
source: internal-site-building-flow-publicized
---

# 定价与商业模型校准

根据竞品、成本、免费额度和转化路径，设计 Free/Pro/Lifetime 或咨询型套餐，并算清楚不能亏。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`03-pricing`
- 角色：根据竞品、成本、免费额度和转化路径，设计 Free/Pro/Lifetime 或咨询型套餐，并算清楚不能亏。
- 上游：PRD、竞品定价、成本结构、用户场景。
- 下游：文案、设计、前后端、运营。

## 什么时候使用

- 要设计免费额度和付费套餐
- 要判断 API/存储/计算成本是否可承受
- 要把定价区写成能转化的页面
- 要避免“无限量”“高客单”等误导表达

## 输入契约

开始前尽量准备：

- 竞品价格和免费额度
- 单次任务成本或估算
- 预估 DAU/使用次数
- 付费能力和支付/咨询路径
- 退款、试用、Lifetime 限制

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
- 竞品官网/定价页访问权限
- 环境变量 / Token：
- 无硬性要求；按项目资料推进。
- 浏览器登录态：
- 竞品 pricing 页面

### 缺失处理
- 涉及真实支付、成本、套餐上线：缺成本输入则 BLOCKED
- 不能编造 API 成本或竞品价格

### 可以降级继续
- 可先做价格假设表，但必须标待确认

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
你现在执行 ShipSolo 做站流水线的「定价与商业模型校准」阶段。

项目：[项目名称]
当前阶段：03-pricing
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

### 1. 竞品锚点
列直接竞品、替代方案、现状手动成本，提取价格锚点。

### 2. 成本模型
计算免费用户日成本、付费用户月成本、边际成本和异常滥用风险。

### 3. 套餐设计
默认 Free / Pro / Lifetime；咨询型产品用“申请/咨询/人工开通”而不是标准 SaaS 立即购买误导。

### 4. 额度与限制
每档写清次数、并发、导出、历史记录、API/水印/支持，不写无限。

### 5. 转化口径
定价区先讲价值和适用人群，再讲价格；CTA 与实际支付/咨询路径一致。

### 6. 交接
给文案定价区、给后端 entitlement、给 QA 验证点。


## 交付物

- 定价报告
- 成本假设表
- 套餐矩阵
- 升级/咨询 CTA
- 后端 entitlement 字段建议

## 验收清单 / 质量门槛

- [ ] 价格有竞品锚点和成本依据
- [ ] 免费额度能体验价值但不亏穿
- [ ] 没有“无限”或承诺过度
- [ ] CTA 与真实开通路径一致

## 下游交接格式

```markdown
# 定价与商业模型校准交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：03-pricing
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
- 下一阶段：文案、设计、前后端、运营。
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
请加载 ShipSolo Skill：site-pricing-calibration，按我的项目资料执行。
```

## 常见坑

- 只抄竞品价格不算成本
- 把咨询/线下开通写成在线支付
- 忘记滥用限制
- Lifetime 没有边界

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

# 定价与商业模型校准 使用说明

## 先说结论

这份 Skill 的主路径不是让你运行脚本，而是让你把“一键启动 Prompt”复制给 AI。脚本只是可选辅助，用来检查交接是否完整。

## 开始前先准备

这一版新增 Preflight。先确认缺什么，再让 AI 执行，避免跑到一半才发现没权限。

- 账号/后台：竞品官网/定价页访问权限
- 环境变量 / Token：无硬性账号要求
- 浏览器登录态：竞品 pricing 页面
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
请按 ShipSolo 学员版 Skill「定价与商业模型校准」执行。
项目：[填写项目]
当前阶段：03-pricing
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：03-pricing
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] 价格有竞品锚点和成本依据
- [ ] 免费额度能体验价值但不亏穿
- [ ] 没有“无限”或承诺过度
- [ ] CTA 与真实开通路径一致

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

### 这个 Skill 做什么

site-pricing-calibration 用来把“拍脑袋定价”变成可计算、可验证的定价方案。

它会输出：

- 竞品定价表
- 成本模型
- 收费模型选择
- 免费层设计
- Pro 价格与用量上限
- 年付折扣
- Lifetime 判断
- Stripe / 支付配置建议
- 上线后验证指标
### 安装方式

把 Skill 解压缩后复制到你的 skills 目录：

```
your-project/
  skills/
    site-pricing-calibration/
      SKILL.md
```

然后让 Agent 读取这个文件执行。

### 最小输入模板

```
请使用 site-pricing-calibration，为这个产品做定价校准。

产品名：
一句话描述：
目标用户：
核心关键词：
产品类型：高频工具 / 低频工具 / 内容数据站 / 纯前端工具
核心成本：
已知竞品：
是否接支付：Stripe / Lemon Squeezy / Paddle / 暂不确定

请输出：竞品定价表、成本模型、收费模型、免费层、Pro 价格、用量上限、年付折扣、Lifetime 判断、支付配置建议、上线后验证指标。
```

### 示例 1：AI 图片工具

```
请使用 site-pricing-calibration。

产品名：AI Background Remover
一句话描述：上传图片，一键去背景并下载透明 PNG。
目标用户：电商卖家、内容创作者、独立站运营者。
核心关键词：AI background remover, remove background online
产品类型：高频 AI 工具
核心成本：每次图片处理约 $0.03，存储暂不计。
已知竞品：remove.bg, PhotoRoom
是否接支付：Stripe

请输出完整定价报告，重点设计免费层、Pro 用量上限和年付折扣。
```

### 示例 2：纯前端工具

```
请使用 site-pricing-calibration。

产品名：JSON Formatter Pro
一句话描述：在线格式化、校验和转换 JSON。
目标用户：开发者、数据分析师。
核心关键词：json formatter, json validator
产品类型：纯前端工具
核心成本：几乎无 API 成本，主要是托管和少量存储。
已知竞品：jsonformatter.org, codebeautify
是否接支付：暂不确定

请判断是否适合订阅制。如果不适合，请给 credits、一次性付费、广告/联盟等替代方案。
```

### 示例 3：上线后调价

```
请使用 site-pricing-calibration 的“上线后验证”部分。

产品名：AI Background Remover
当前月价：$9/mo
免费→付费转化率：0.8%
年付占比：12%
Churn Rate：11%
免费层成本占比：35% 总收入
ARPU：$6.2
重度用户成本：部分用户月成本超过 $12
Lifetime：上线 2 天卖出 80 单

请判断：是否调价、先调什么、不建议做什么、未来 7 天看哪些指标。
```

---

## 第三部分：手动实操

### 准备工作

#### 你需要的输入

#### 准备一个文件

```
touch pricing-你的产品名-$(date +%Y%m%d).md
```

### Step 1：算清单次使用成本（5 分钟）

#### AI 提示词

```
我在做一个 {产品描述} 工具站，核心功能是 {功能描述}。

请帮我估算这个产品每次使用的 API 成本。

已知信息：
- 核心 API：{如果知道就写，不知道就写"请帮我推荐合适的 API"}
- 一次完整使用包含的步骤：{描述用户一次使用的完整流程}

请列出：
1. 每个步骤涉及的 API 调用及其单价
2. 用最便宜的方案算下限，最好的方案算上限
3. 取中位数作为基准成本
4. 如果涉及存储，估算每次使用的存储成本

输出格式：
| 步骤 | API | 单价 | 备注 |
|------|-----|------|------|
总计：$X ~ $Y / 次，基准 $Z / 次
```

#### 预期输出示例

#### 常见坑

- 坑 1：只算 API 调用，忘了存储、CDN、日志等隐性成本。虽然通常很小，但在大规模下会累积。
- 坑 2：用错计量单位。有的 API 按 token 计费，有的按图片尺寸，有的按时长。确认单位后再算。
- 坑 3：忘了算"一次使用"包含多少次 API 调用。比如一次角色生成 = 1 次文本 + 1 次图片 = 两次调用。
### Step 2：扫竞品定价（15 分钟）

#### 操作步骤

1. Google 搜你的核心关键词
1. 打开排名前 5-10 的产品站
1. 找到 Pricing 页面
1. 填表
#### AI 提示词

```
帮我调研以下关键词对应的竞品定价情况。

关键词：{你的关键词}

请搜索这个关键词，找到 SERP 前 5-10 个工具站（跳过纯内容站），然后：

1. 打开每个工具站的 Pricing 页面
2. 记录以下信息：

| 竞品 | URL | 免费层额度 | 入门价(月) | 中端价(月) | 高端价(月) | 年付折扣 | 备注 |
|------|-----|-----------|-----------|-----------|-----------|---------|------|

3. 总结：
   - 入门价范围：$X - $Y
   - 中位数：$Z
   - 免费层常见额度：N 次/天 或 N 次/月
   - 年付折扣范围：X% - Y%
   - 有没有 Lifetime 选项？常见价位？

4. 特别关注：
   - 有没有声称"无限"的？翻一下 Terms 看真实限制
   - 有没有用 credits 模式的？每个 credit 约等于多少钱？
   - 有没有用量梯度定价（用得越多单价越便宜）的？
```

#### 常见坑

- 坑 1：只看首页价格，不翻 Terms/FAQ。"Unlimited" 经常有 fair use policy 限制。
- 坑 2：忽略币种。有的站标的是欧元或英镑，需要换算成美元对比。
- 坑 3：竞品在做促销（如首月 $1），把促销价当常规价。看 "regular price" 或 "renews at"。
### Step 3：设计免费层（10 分钟）

#### AI 提示词

```
我在做一个 {产品描述} 工具站。

已知信息：
- 单次使用成本：${基准成本}/次
- 竞品免费层情况：{粘贴 Step 2 的免费层数据}
- 目标用户：{简要描述}

请帮我设计免费层：

1. 每天/每月免费次数：参考竞品但不要过于慷慨
2. 功能限制：哪些功能免费可用，哪些限 Pro
3. 是否需要注册才能使用

然后做成本验算：
- 乐观场景（1,000 MAU）
- 中等场景（5,000 MAU）
- 悲观场景（10,000 MAU）

假设 DAU 率 20-30%，算每月免费层总成本。

最后判断：在 5,000 MAU 时，免费层月成本是否可控（< $500）？如果不可控，给出收紧建议。
```

#### 预期输出

#### 常见坑

- 坑 1：免费层太慷慨，用户够用了不付费。3 次/天通常是甜蜜点——够体验，不够爽。
- 坑 2：不做模型分层。免费层和 Pro 用同样的模型 = 你在花 Pro 的成本补贴免费用户。
- 坑 3：不考虑滥用。IP 指纹 / 设备指纹 / 浏览器缓存是基础反滥用手段，要告诉开发加上。
### Step 4：定 Pro 价格 + 用量上限（10 分钟）

#### AI 提示词

```
基于以下数据，帮我确定 Pro 定价和用量上限。

单次使用成本：${基准成本}/次
竞品入门价范围：${X} - ${Y}/mo，中位数 ${Z}/mo
免费层：{粘贴 Step 3 的免费层设计}
产品类型：{高频工具 / 低频工具 / 内容站}

请计算：

1. Pro 月价推荐（给出激进/稳健/保守三个选项）
2. Pro 月用量上限：
   - 估算正常用户月使用次数
   - 用量上限 = 正常使用 × 1.5（覆盖 95% 用户）
   - 反算：上限 × 单次成本 必须 < 月价 × 85%
3. 验证：Pro 单用户月毛利 = 月价 - (上限 × 单次成本)

如果月毛利 < $1，需要调整定价或上限。

输出格式：
| 方案 | 月价 | 用量上限 | 月成本上限 | 毛利 | 毛利率 |
|------|------|---------|-----------|------|--------|
```

#### 常见坑

- 坑 1：上限设太高，等于没设。如果 95% 的用户根本用不完 500 次/月，你的上限可以是 200。
- 坑 2：不考虑重度用户。即使上限是 200 次，如果 5% 的用户每月打满 200 次，那些用户的成本要单独算。
- 坑 3：月价和竞品差距太大。高了没人买，低了让人觉得产品差。保持在竞品中位数的 70-100%。
### Step 5：年付和 Lifetime（5 分钟）

#### AI 提示词

```
帮我设计年付方案和评估是否需要 Lifetime。

Pro 月价：${月价}
Pro 月用量上限：{次数}
单次使用成本：${基准成本}
产品类型：{高频/低频}
用户粘性预判：{高/中/低}

请计算：

1. 年付价格（20-30% 折扣区间，取整到 $X9）
2. 年付等效月价
3. Lifetime 评估：
   - 如果做：价格 = 月价 × 18~24，取整
   - Lifetime 月用量上限应比 Pro 高多少（建议 1.5-2×）
   - 风险评估：假设 Lifetime 用户平均使用 36 个月，你亏不亏？
4. 最终建议：做不做 Lifetime？

输出定价总表：
| Plan | 价格 | 用量 | 功能差异 | 模型 |
|------|------|------|---------|------|
```

### Step 6：汇总 + 成本压力测试（10 分钟）

#### AI 提示词

```
以下是我的完整定价方案，请帮我做最终验算和压力测试。

定价方案：
{粘贴前面所有步骤的输出}

请做以下验算：

### 1. 基准场景（1K 付费用户）
- 假设付费用户月付/年付比 = 60:40
- MRR = ?
- 月 API 成本（假设用户平均用 60% 上限） = ?
- 毛利 = ?

### 2. 增长场景（5K 付费用户）
同上

### 3. 压力测试
- 如果 20% 的 Pro 用户每月打满上限，毛利会怎样？
- 如果免费用户成本占比超过总收入 30%，建议什么调整？
- 如果竞品降价 30%，你的定价还有竞争力吗？

### 4. 快速检查清单
- [ ] 单次成本算清楚了？
- [ ] 竞品扫了至少 5 家？
- [ ] 免费层成本在 5K MAU 时扛得住？
- [ ] Pro 有用量上限？（不是"无限"）
- [ ] 年付折扣在 20-30%？
- [ ] Lifetime 回本 > 18 个月？
- [ ] Lifetime 有月度用量上限？
- [ ] 免费/Pro 用了不同模型？
- [ ] 免费次数是可配置参数？

输出格式：
## 定价报告：{产品名}

### 最终定价表
{表格}

### 成本验算
{数据}

### 压力测试结果
{结论}

### 风险和建议
{列表}
```

### 特殊情况处理

#### 情况 A：纯前端工具，没有 API 成本

```
提示词补充：
我的产品是纯前端计算工具，没有 API 调用成本。
请根据竞品定价和用户付费意愿来设计定价，重点放在：
1. 什么功能值得付费（高级模板、导出格式、去水印等）
2. 付费墙设在哪里最自然
3. 一次性付费 vs 订阅制，哪个更合适
```

#### 情况 B：多 API 组合产品

```
提示词补充：
我的产品一次使用涉及多个 API：
- 步骤 1：{API 名称} ${成本}
- 步骤 2：{API 名称} ${成本}
- 步骤 3（可选，仅 Pro）：{API 名称} ${成本}

请分别计算免费层和 Pro 层的单次成本（Pro 层包含可选步骤）。
```

#### 情况 C：已经上线，需要调价

```
提示词补充：
我的产品已经上线，当前定价是：
{当前定价表}

当前数据：
- 月活：{MAU}
- 付费用户：{数}
- 转化率：{%}
- MRR：${数}
- Churn：{%}
- 免费层月成本：${数}

问题：{转化率太低 / 成本太高 / 竞品降价了 / ...}

请基于数据给出调价建议，以及如何对现有用户做迁移（Grandfather 策略 vs 统一调整）。
```

---



---

## references/pricing-cost-rubric.md

# 定价与商业模型校准 — 内部能力脱敏参考

## 阶段核心能力

竞品定价、Free/Pro/Lifetime、成本验算、ROI 场景、付费墙触发

## 执行顺序

1. 先读上游交接摘要，确认输入是否满足契约。
2. 缺关键输入时输出 `[BLOCKED]`，不要编造数据或替用户做高风险决策。
3. 可推进时按 `SKILL.md` 的 Phase 顺序执行，所有依据写来源或标 `[待确认]`。
4. 完成后用模板生成交付物，再运行脚本做最小校验。
5. 最后一段写下游交接摘要，状态只能是 `[DONE] / [BLOCKED] / [NEEDS_REVIEW]`。

## 质量门槛

- [ ] 不得出现 unlimited
- [ ] 必须有竞品定价表
- [ ] 必须有单位成本
- [ ] 必须有 Pro 额度上限

## 脱敏边界

- 可以保留流程、字段、判断标准、模板、脚本骨架。
- 不保留真实 API Key、Cookie、Token、内部路径、生产库名、群聊 ID、真实客户数据。
- 公开示例统一用 `[PROJECT]`、`[DOMAIN]`、`[API_KEY]`、`[ACCOUNT]` 这类占位符。



---

## references/stage-rubric.md

# 定价与商业模型校准 阶段判断规则

## 本阶段目标

根据竞品、成本、免费额度和转化路径，设计 Free/Pro/Lifetime 或咨询型套餐，并算清楚不能亏。

## 必须保留的内部流程精华（已脱敏）

### 1. 竞品锚点
列直接竞品、替代方案、现状手动成本，提取价格锚点。

### 2. 成本模型
计算免费用户日成本、付费用户月成本、边际成本和异常滥用风险。

### 3. 套餐设计
默认 Free / Pro / Lifetime；咨询型产品用“申请/咨询/人工开通”而不是标准 SaaS 立即购买误导。

### 4. 额度与限制
每档写清次数、并发、导出、历史记录、API/水印/支持，不写无限。

### 5. 转化口径
定价区先讲价值和适用人群，再讲价格；CTA 与实际支付/咨询路径一致。

### 6. 交接
给文案定价区、给后端 entitlement、给 QA 验证点。


## 质量门槛

- [ ] 价格有竞品锚点和成本依据
- [ ] 免费额度能体验价值但不亏穿
- [ ] 没有“无限”或承诺过度
- [ ] CTA 与真实开通路径一致

## 常见失败模式

- 只抄竞品价格不算成本
- 把咨询/线下开通写成在线支付
- 忘记滥用限制
- Lifetime 没有边界

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## requirements.json

{
  "id": "site-pricing-calibration",
  "difficulty": "medium",
  "accounts": [
    "竞品官网/定价页访问权限"
  ],
  "env": [],
  "browserSessions": [
    "竞品 pricing 页面"
  ],
  "blockingRules": [
    "涉及真实支付、成本、套餐上线：缺成本输入则 BLOCKED",
    "不能编造 API 成本或竞品价格"
  ],
  "canContinueWithout": [
    "可先做价格假设表，但必须标待确认"
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

## scripts/validate_pricing_report.py

#!/usr/bin/env python3
"""定价与商业模型校准 最小校验脚本。用法：python scripts/validate_pricing_report.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['不得出现 unlimited', '必须有竞品定价表', '必须有单位成本', '必须有 Pro 额度上限']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 定价与商业模型校准 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))



---

## templates/pricing-report-template.md

# 定价与商业模型校准 — 标准交付物模板

## 1. 基本信息

- 项目：`[PROJECT]`
- 域名/候选域名：`[DOMAIN]`
- 当前阶段：`03-pricing`
- 执行人/Agent：`mozhang`
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

- [ ] 不得出现 unlimited
- [ ] 必须有竞品定价表
- [ ] 必须有单位成本
- [ ] 必须有 Pro 额度上限

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

