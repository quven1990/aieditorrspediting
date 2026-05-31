---
name: keyword-research-agent
title: 关键词研究 Agent（discoverkeywords.co API）
description: 从想法、种子词、收入榜、托管新站和社区信号中筛出真正值得做的关键词机会。
version: 2.2.0
owner: ShipSolo
agent: motan
category: 做站全流程
stage: 01-research
updated: 2026-05-26
student_level: beginner
source: internal-site-building-flow-publicized
---

# 关键词研究 Agent（discoverkeywords.co API）

从想法、种子词、收入榜、托管新站和社区信号中筛出真正值得做的关键词机会。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`01-research`
- 角色：从想法、种子词、收入榜、托管新站和社区信号中筛出真正值得做的关键词机会。
- 上游：项目想法、种子词、目标市场、可用关键词工具账号、竞品或榜单线索。
- 下游：产品定义与 PRD

## 什么时候使用

- 想从 0 找一个 SEO 小产品机会
- 要判断一个关键词今天能不能开站
- 要把收入榜/竞品站拆成可做的任务词
- 要建立观察池而不是硬凑项目

## 输入契约

开始前尽量准备：

- 种子词或项目方向
- 目标市场和语言，默认 US / English
- 关键词指标：volume、KD、CPC、trend（没有就标待查）
- SERP 前 10 或至少 3 个竞品样本
- 是否允许使用老词兜底

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
- Google Trends 或可替代趋势数据源（可手动）
- 关键词工具账号：Ahrefs/Semrush/DataForSEO/discoverkeywords.co 任一即可
- 环境变量 / Token：
- KEYWORD_TOOL_API_KEY（可选，只有自动化采集需要）
- 浏览器登录态：
- Google Trends
- SERP 搜索引擎

### 缺失处理
- 没有任何关键词/竞品/目标市场输入：BLOCKED
- 没有付费关键词工具：可先用公开 SERP，但最终 SEO 证据标 missing_keyword_tool_access

### 可以降级继续
- 公开 SERP + Trends 手动截图可继续轻量研究

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
你现在执行 ShipSolo 做站流水线的「关键词研究 Agent（discoverkeywords.co API）」阶段。

项目：[项目名称]
当前阶段：01-research
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

### 1. 候选池
同时跑新词和老词：Trends rising、模型发布、prompt/workflow/API 二阶词、托管新站信号、社区讨论、收入榜反推、关键词扩展。

### 2. 硬闸门
主推荐必须过 Google Trends 起量、GPTs/ChatGPT 基准对比、12 个月 freshness、工具化意图、SERP 可进入性、ROI。

### 3. 意图分类
只把 transactional / commercial 作为主线；definition、lyrics、crossword、明星/新闻、纯品牌导航默认跳过。

### 4. SERP 实扫
拆 Top 10：强站比例、小站缝隙、工具/目录/内容页形态、是否有可超越的交互或内容缺口。

### 5. 机会分级
A_NOW 立即做；B_QUEUE 排队；C_WATCH 观察；D_SKIP 不做；当天无干净机会时输出 NO_CLEAN_NEW_WORD_TODAY。

### 6. 交接
输出机会报告、证据链接、风险、推荐站点类型、给 PRD 的最小输入。


## 交付物

- 关键词机会报告
- Top 3 推荐及证据
- 观察池/放弃池
- SERP/竞品摘要
- 给 PRD 的项目 brief

## 验收清单 / 质量门槛

- [ ] 主推荐有趋势、基准对比、12 个月 freshness 和 SERP 证据
- [ ] 没有把稳定老词伪装成新词
- [ ] 没有用品牌词或定义词硬做工具站
- [ ] 结论可被 PRD 直接接住

## 下游交接格式

```markdown
# 关键词研究 Agent（discoverkeywords.co API）交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：01-research
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
- 下一阶段：产品定义与 PRD
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
请加载 ShipSolo Skill：keyword-research-agent，按我的项目资料执行。
```

## 常见坑

- 只看一个关键词工具，不看 SERP 和趋势
- 把社区热度当搜索需求
- 把广告/affiliate 一概当风险，而不是商业化信号
- 没有证据却给出精确 volume/KD

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
