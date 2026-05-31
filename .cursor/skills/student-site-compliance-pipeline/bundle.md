# 合规与基础法律页面

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# 合规与基础法律页面 更新记录

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
name: student-site-compliance-pipeline
title: 合规与基础法律页面
description: 把站点的数据、AI、支付、Cookie、IP/素材风险转成可上线的 Privacy、Terms、Cookie/Refund 和禁用表达。
version: 2.2.0
owner: ShipSolo
agent: modun
category: 做站全流程
stage: 04-compliance
updated: 2026-05-26
student_level: beginner
source: internal-site-building-flow-publicized
---

# 合规与基础法律页面

把站点的数据、AI、支付、Cookie、IP/素材风险转成可上线的 Privacy、Terms、Cookie/Refund 和禁用表达。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`04-compliance`
- 角色：把站点的数据、AI、支付、Cookie、IP/素材风险转成可上线的 Privacy、Terms、Cookie/Refund 和禁用表达。
- 上游：PRD、定价、功能、第三方服务、素材来源。
- 下游：文案、设计、前后端、QA。

## 什么时候使用

- 站点涉及登录、支付、AI API、上传、分析埋点、第三方素材
- 要写 Privacy/Terms/Cookie/Refund
- 要判断页面和功能是否有合规红线
- 要给前端法律页和 footer 链接合同

## 输入契约

开始前尽量准备：

- 站点功能清单
- 收集的数据类型
- 第三方服务：analytics、auth、payment、AI API、email、storage
- 目标市场
- 素材/IP/品牌使用情况

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
- 无硬性要求；按项目资料推进。
- 环境变量 / Token：
- 无硬性要求；按项目资料推进。
- 浏览器登录态：
- 无硬性要求；按项目资料推进。

### 缺失处理
- 涉及支付/登录/上传/AI API 但没有功能说明：BLOCKED
- 不能把法律结论写成律师意见

### 可以降级继续
- 可先生成合规问题清单和待确认项

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
你现在执行 ShipSolo 做站流水线的「合规与基础法律页面」阶段。

项目：[项目名称]
当前阶段：04-compliance
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

### 1. 数据清单
列用户数据、自动采集数据、上传内容、日志、Cookie、分析事件。

### 2. 第三方映射
把每个服务映射到 Privacy/Terms：用途、共享对象、保留期、退出方式。

### 3. 风险分级
P0 不能上线；P1 需修复或明确披露；P2 可上线后跟进。

### 4. 法律页合同
输出 canonical routes，默认 /privacy /terms；若用别名必须 308 redirect。

### 5. 禁用表达
列 official、100% accurate、guaranteed、free/open-source 等高风险词或项目特定禁词。

### 6. 交接
给文案禁词、给前端法律页内容、给 QA 合规检查表。


## 交付物

- 合规评估报告
- Privacy/Terms/Cookie/Refund 草稿
- 禁用词/风险词清单
- 法律页 route contract
- QA 合规验收点

## 验收清单 / 质量门槛

- [ ] 法律页与实际数据收集一致
- [ ] 第三方服务全部披露
- [ ] 高风险素材/IP 有免责声明或替代方案
- [ ] footer/legal route 不会 404

## 下游交接格式

```markdown
# 合规与基础法律页面交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：04-compliance
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
- 下一阶段：文案、设计、前后端、QA。
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
请加载 ShipSolo Skill：student-site-compliance-pipeline，按我的项目资料执行。
```

## 常见坑

- 直接套模板，不匹配真实功能
- Analytics 上线但 Privacy 没写
- 用 Gmail/占位邮箱冒充域名邮箱
- 把合规写成法律恐吓，压过产品价值

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

# 合规与基础法律页面 使用说明

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
请按 ShipSolo 学员版 Skill「合规与基础法律页面」执行。
项目：[填写项目]
当前阶段：04-compliance
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：04-compliance
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] 法律页与实际数据收集一致
- [ ] 第三方服务全部披露
- [ ] 高风险素材/IP 有免责声明或替代方案
- [ ] footer/legal route 不会 404

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

## references/compliance-risk-matrix.md

# 合规与基础法律页面 — 内部能力脱敏参考

## 阶段核心能力

产品风险分级、数据字段抽取、Privacy/Terms/Cookie/Refund、AI 内容边界

## 执行顺序

1. 先读上游交接摘要，确认输入是否满足契约。
2. 缺关键输入时输出 `[BLOCKED]`，不要编造数据或替用户做高风险决策。
3. 可推进时按 `SKILL.md` 的 Phase 顺序执行，所有依据写来源或标 `[待确认]`。
4. 完成后用模板生成交付物，再运行脚本做最小校验。
5. 最后一段写下游交接摘要，状态只能是 `[DONE] / [BLOCKED] / [NEEDS_REVIEW]`。

## 质量门槛

- [ ] 必须声明非法律意见
- [ ] 必须列第三方服务
- [ ] 必须有联系方式占位
- [ ] 不得承诺未实现能力

## 脱敏边界

- 可以保留流程、字段、判断标准、模板、脚本骨架。
- 不保留真实 API Key、Cookie、Token、内部路径、生产库名、群聊 ID、真实客户数据。
- 公开示例统一用 `[PROJECT]`、`[DOMAIN]`、`[API_KEY]`、`[ACCOUNT]` 这类占位符。



---

## references/feishu-tutorial.md

## 第二部分：OpenClaw / Hermes 自动化

### 这是什么

这是一个可复制到 Hermes / Claude Code / 其他 Agent Skill 系统里的「做站合规审查流水线」。

它解决的问题：

- 不再上线前一晚复制 Privacy Policy 模板。
- 先按产品实际行为梳理数据流、第三方、支付、AI 内容边界。
- 再生成 Privacy Policy / Terms / Cookie / Refund / Disclaimer 草稿。
### 安装方式

把整个文件夹复制到你的 Hermes skills 目录，例如：

```
mkdir -p ~/.hermes/skills/compliance
cp -r student-site-compliance-pipeline ~/.hermes/skills/compliance/
```

然后在对话中说：

```
使用 student-site-compliance-pipeline，帮我审查这个站点的合规风险。
```

### 推荐使用流程

#### 第一步：先做风险分级

让 AI 只输出：

- 低/中/高风险
- 为什么
- 缺哪些信息
- 哪些页面必须有
#### 第二步：补数据处理表

用 templates/data-processing-table.md 填：

- 数据类型
- 用途
- lawful basis
- 第三方
- 保留期限
- 用户是否可删除
#### 第三步：生成法律页面草稿

让 AI 输出：

- Privacy Policy
- Terms of Service
- Cookie Policy
- Refund Policy
- Disclaimer / Content Policy（如需要）
#### 第四步：上线前 checklist

用 templates/launch-checklist.md 核对：

- 页面是否存在
- 页脚是否链接
- Checkout 是否披露退款/续费
- Cookie 是否按地区触发
- AI 内容是否有三层过滤
- 第三方列表是否与实际一致
### 一句话用法

```
请使用下面的做站合规 Skill，基于我的 PRD 输出：风险等级、数据流、第三方清单、必需合规页面、数据处理表、支付/订阅检查、AI 内容安全检查、上线 checklist，以及 Privacy/Terms/Cookie/Refund 草稿。信息不足请标 [待确认]，不要编造。
```

---

## 第三部分：手动实操 — 一步步教你怎么做

### Step 1：搞清楚你的站碰了什么数据

在纸上（或文档里）回答这 5 个问题：

写完这 5 个答案，你就知道合规要做多少事了。

#### 举个例子

一个 AI 角色生成工具（类似 chargen.ai）：

### Step 2：确定需要哪些合规页面

根据 Step 1 的答案，对照打勾：

#### 最小配置（MVP 工具站）

大多数 AI 工具站 MVP 只需要：

- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ 页面上的免责声明（一句话）
### Step 3：用 AI 辅助写 Privacy Policy

#### 提示词模板

复制以下提示词，把 [方括号] 里的内容替换成你的实际信息，发给 Claude 或 ChatGPT：

```
你是一个专注 SaaS/工具站的法务合规专家。请帮我写一份 Privacy Policy（英文），要求：

1. 运营主体：[Your Company LLC]，注册地：[Wyoming, USA]
2. 产品名称：[你的产品名]
3. 产品描述：[一句话说清楚产品是什么]
4. 数据收集范围：
   - [列出所有收集的数据，如：IP address, user input text, generated images, analytics data]
5. 第三方服务：
   - [列出所有第三方，如：OpenAI (text generation), fal.ai (image generation), Cloudflare (hosting), Plausible (analytics), Stripe (payments)]
6. 数据存储：
   - [说清楚存在哪里、存多久，如：Images cached on Cloudflare R2 for 30 days, IP data in D1 for 90 days]
7. 用户注册：[是否需要注册，收集哪些注册信息]
8. 目标市场：[全球/美国/欧洲？是否需要 GDPR/CCPA]
9. 支付：[有无支付功能，用什么支付平台]
10. 联系邮箱：[privacy@yourdomain.com]

格式要求：
- 用清晰的英文，不要太法律腔
- 分章节，有标题和编号
- 每项数据对应说明用途和保留期限
- 覆盖 GDPR 用户权利（access/deletion/portability/objection）
- 覆盖 CCPA（Do Not Sell 声明）
- 最后声明"本政策不构成法律意见"
- 年龄限制声明（13+）
```

（仅示意，需要自己实际提供真实的公司/个人、邮箱等信息）

#### 生成后必须检查的 5 个点

AI 生成的 Privacy Policy 经常出错，逐项检查：

### Step 4：用 AI 辅助写 Terms of Service

#### 提示词模板

```
你是一个专注 SaaS/工具站的法务合规专家。请帮我写一份 Terms of Service（英文），要求：

1. 运营主体：[Your Company LLC]，注册地：[Wyoming, USA]
2. 产品名称：[你的产品名]
3. 产品描述：[一句话说清楚产品是什么]
4. 产品类型：[AI 文本工具 / AI 图片工具 / AI 视频工具 / 数据工具 / 开发者工具]
5. 用户行为限制：
   - 不可生成违法、有害、滥用内容
   - [根据产品类型补充，如：不可生成 NSFW 内容 / 不可生成真实人物肖像 / 不可侵犯知识产权]
6. AI 生成内容归属：
   - Free 用户：[个人非商业使用]
   - Pro 用户：[个人 + 商业使用]
   - 不保证 AI 生成内容可获版权保护
7. 免责声明：服务按"现状"提供，不保证准确性、唯一性、适用性
8. 适用法律：[Wyoming 州法 + 美国联邦法]
9. [如有支付] 价格、续费、取消、退款规则

格式要求：
- 用清晰的英文，可以有法律术语但要可读
- 分章节，有标题和编号
- 包含 AI 输出的免责声明
- 包含知识产权条款（安全写法，不过度承诺）
- 包含服务变更/终止条款
```

（仅示意，需要自己实际提供真实的公司/个人、邮箱、产品等信息）

### Step 5：AI 内容边界设计

如果你是 AI 生成类工具，需要设计内容边界。

#### 提示词模板

```
你是一个 AI 产品安全专家。我正在做一个 [产品描述]，请帮我设计内容过滤方案。

产品类型：[AI 图片生成 / AI 文本生成 / AI 视频处理]
使用的 AI API：[OpenAI / Anthropic / fal.ai / Replicate / 等]
目标用户：[DnD 玩家 / 开发者 / 内容创作者 / 等]

请输出：

1. 必须过滤的内容清单（Hard Block）
   - 哪些类别绝对不能生成
   - 每个类别用什么方式过滤

2. 需要谨慎处理的内容（Soft Filter）
   - 哪些内容不直接拦截，但需要引导
   - 版权角色怎么处理
   - 品牌商标怎么处理

3. 三层过滤技术方案
   - 输入层：用什么做关键词过滤
   - Prompt 层：系统 prompt 怎么写安全约束
   - 输出层：用什么检测器做二次检查

4. 用户提示文案
   - 当触发 Hard Block 时展示什么
   - 当触发 Soft Filter 时展示什么
```

### Step 6：品牌/商标风险自查

#### 自查清单（逐项过一遍）

#### 必须加的通用声明

在每个站的 Footer 或 Terms 中加入：

```
[Brand names] and other product names, logos, and brands are trademarks 
or registered trademarks of their respective owners. Use of these names 
does not imply affiliation or endorsement.
```

### Step 7：有支付时的合规补充

#### 用 AI 生成 Refund Policy

```
你是一个 SaaS 退款政策专家。请帮我写一份 Refund Policy（英文），要求：

1. 产品名称：[你的产品名]
2. 支付方式：Stripe
3. 定价模式：[月付 / 年付 / 一次性 / 按量计费]
4. 退款条件：
   - 首次订阅 [7] 天内不满意可退全款
   - [是否按比例退？已消耗额度怎么算？]
5. 不退款的情况：
   - 超过退款期限
   - 已大量使用服务
   - [其他情况]
6. 退款流程：
   - 发邮件到 [hello@yourdomain.com]
   - [几个工作日内响应]
   - [退款到账时间：5-10 个工作日]
7. 取消订阅：
   - 当月/当年有效期内继续可用
   - 到期后不自动续费
8. Chargeback 说明
```

（仅示意，需要自己实际提供真实的公司/个人、邮箱、产品等信息）

#### Cookie Banner 何时需要

### Step 8：上线前 Checklist

---

### 常见问题

#### Q: Privacy Policy 用英文还是中文？

看你的用户。 面向海外用户 → 英文。面向国内 → 中文。两边都有 → 英文为主，可加中文版。

#### Q: 可以用免费的 Privacy Policy 生成器吗？

可以作为起点，但必须自己改。生成器不知道你用了哪些第三方 API、存了什么数据。这些你得自己填。用本教程的提示词模板生成更精准。

#### Q: 没有公司，个人能做吗？

能做，合规页面可以用个人名义，风险自担。

#### Q: GDPR 罚款真的会罚到小站吗？

大概率不会主动查你，但用户投诉了就可能。而且 Google Ads、Stripe 等平台会审核你的合规页面，没有就不让你用。做好合规不是怕罚款，是让平台和用户信任你。

#### Q: 多个产品可以共用一套合规文档吗？

不建议。 每个产品的数据流不同、第三方不同、保留策略不同。如果共用，要么遗漏要么冗余。每个产品单独出一套，用模板复制改动更快。

#### Q: 合规文档多久更新一次？

每次产品有功能变更（加了新 API、加了支付、换了分析工具）都要同步更新。建议至少每季度 review 一次。

#### Q: 比较页（/vs/competitor）会不会被起诉？

做比较本身不违法，但做不好会被投诉。核心原则：不用对方 logo、不写 official/approved、比较内容要客观可验证、加商标归属声明。按这个边界做，风险可控。

---



---

## references/stage-rubric.md

# 合规与基础法律页面 阶段判断规则

## 本阶段目标

把站点的数据、AI、支付、Cookie、IP/素材风险转成可上线的 Privacy、Terms、Cookie/Refund 和禁用表达。

## 必须保留的内部流程精华（已脱敏）

### 1. 数据清单
列用户数据、自动采集数据、上传内容、日志、Cookie、分析事件。

### 2. 第三方映射
把每个服务映射到 Privacy/Terms：用途、共享对象、保留期、退出方式。

### 3. 风险分级
P0 不能上线；P1 需修复或明确披露；P2 可上线后跟进。

### 4. 法律页合同
输出 canonical routes，默认 /privacy /terms；若用别名必须 308 redirect。

### 5. 禁用表达
列 official、100% accurate、guaranteed、free/open-source 等高风险词或项目特定禁词。

### 6. 交接
给文案禁词、给前端法律页内容、给 QA 合规检查表。


## 质量门槛

- [ ] 法律页与实际数据收集一致
- [ ] 第三方服务全部披露
- [ ] 高风险素材/IP 有免责声明或替代方案
- [ ] footer/legal route 不会 404

## 常见失败模式

- 直接套模板，不匹配真实功能
- Analytics 上线但 Privacy 没写
- 用 Gmail/占位邮箱冒充域名邮箱
- 把合规写成法律恐吓，压过产品价值

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## requirements.json

{
  "id": "student-site-compliance-pipeline",
  "difficulty": "medium",
  "accounts": [],
  "env": [],
  "browserSessions": [],
  "blockingRules": [
    "涉及支付/登录/上传/AI API 但没有功能说明：BLOCKED",
    "不能把法律结论写成律师意见"
  ],
  "canContinueWithout": [
    "可先生成合规问题清单和待确认项"
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

## scripts/validate_compliance_docs.py

#!/usr/bin/env python3
"""合规与基础法律页面 最小校验脚本。用法：python scripts/validate_compliance_docs.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['必须声明非法律意见', '必须列第三方服务', '必须有联系方式占位', '不得承诺未实现能力']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 合规与基础法律页面 report basic structure passed')
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

## templates/compliance-report-template.md

# 合规与基础法律页面 — 标准交付物模板

## 1. 基本信息

- 项目：`[PROJECT]`
- 域名/候选域名：`[DOMAIN]`
- 当前阶段：`04-compliance`
- 执行人/Agent：`modun`
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

- [ ] 必须声明非法律意见
- [ ] 必须列第三方服务
- [ ] 必须有联系方式占位
- [ ] 不得承诺未实现能力

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

