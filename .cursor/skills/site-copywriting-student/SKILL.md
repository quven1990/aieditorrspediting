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
