# 关键词研究 Agent（discoverkeywords.co API）

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# 关键词研究 Agent（discoverkeywords.co API） 更新记录

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



---

## references/USAGE.md

# 关键词研究 Agent（discoverkeywords.co API） 使用说明

## 先说结论

这份 Skill 的主路径不是让你运行脚本，而是让你把“一键启动 Prompt”复制给 AI。脚本只是可选辅助，用来检查交接是否完整。

## 开始前先准备

这一版新增 Preflight。先确认缺什么，再让 AI 执行，避免跑到一半才发现没权限。

- 账号/后台：Google Trends 或可替代趋势数据源（可手动）、关键词工具账号：Ahrefs/Semrush/DataForSEO/discoverkeywords.co 任一即可
- 环境变量 / Token：KEYWORD_TOOL_API_KEY（可选，只有自动化采集需要）
- 浏览器登录态：Google Trends、SERP 搜索引擎
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
请按 ShipSolo 学员版 Skill「关键词研究 Agent（discoverkeywords.co API）」执行。
项目：[填写项目]
当前阶段：01-research
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：01-research
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] 主推荐有趋势、基准对比、12 个月 freshness 和 SERP 证据
- [ ] 没有把稳定老词伪装成新词
- [ ] 没有用品牌词或定义词硬做工具站
- [ ] 结论可被 PRD 直接接住

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

## references/stage-rubric.md

# 关键词研究 Agent（discoverkeywords.co API） 阶段判断规则

## 本阶段目标

从想法、种子词、收入榜、托管新站和社区信号中筛出真正值得做的关键词机会。

## 必须保留的内部流程精华（已脱敏）

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


## 质量门槛

- [ ] 主推荐有趋势、基准对比、12 个月 freshness 和 SERP 证据
- [ ] 没有把稳定老词伪装成新词
- [ ] 没有用品牌词或定义词硬做工具站
- [ ] 结论可被 PRD 直接接住

## 常见失败模式

- 只看一个关键词工具，不看 SERP 和趋势
- 把社区热度当搜索需求
- 把广告/affiliate 一概当风险，而不是商业化信号
- 没有证据却给出精确 volume/KD

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## references/workflow.md

# Keyword Research Workflow - discoverkeywords.co API

## Prerequisites

- `GK_API_KEY` environment variable — API key from discoverkeywords.co dashboard (Settings → API Keys)
- `python3` + `requests` (`pip install requests`)
- `whois` for domain age checks (optional, Step 4)

## Environment Setup

```bash
export GK_API_KEY=[REDACTED]
# Optional: override website URL
export GK_SITE_URL="https://discoverkeywords.co"
```

## How to Use

### Option 1: Complete Workflow (Recommended)

```bash
# Navigate to skill directory first
cd /path/to/keyword-research-agent

# Use default seed keywords (127 built-in)
python3 scripts/gk_api.py research --report

# Use custom seed keywords
python3 gk_api.py research "ai tattoo generator" "ai portrait generator" --report

# Output options
python3 gk_api.py research --names-only      # Only keyword names
python3 gk_api.py research --report          # Markdown report (recommended)
python3 gk_api.py research --raw            # Full API response (debug)
```

### Option 2: Expand Only (Without Comparison)

```bash
# Get expanded keywords, no trend comparison
python3 gk_api.py expand "ai generator" --names-only
```

## Understanding Results

### Response Structure

```json
{
  "status": "complete",
  "opportunities": [
    {
      "keyword": "square face generator",
      "verdict": "close",
      "ratio": 1.48,
      "freshness": {
        "status": "new",
        "label": "新词",
        "window": "90d"
      },
      "intent": {
        "label": "Utility Tools",
        "demand": "Find an online tool to generate and customize a square face icon and download it."
      }
    }
  ],
  "stableOld": [...],
  "expand": { "...": "full expand result" },
  "compare": { "...": "full compare result" }
}
```

### Key Fields

| Field | Description | Values |
|---|---|---|
| `verdict` | Trend comparison vs benchmark | `strong` > `pass` > `close` > `watch` > `fail` |
| `freshness.status` | Keyword age/type | `new`, `old_hot`, `stable_old`, `unclear` |
| `freshness.window` | Recent rise window | `7d`, `30d`, `90d`, `none` |
| `intent.label` | User intent category | Utility Tools, Image Generation, etc. |
| `intent.demand` | What user wants | "Find an online tool to..." |
| `ratio` | Trend strength vs benchmark | 1.0x = baseline, >1.0x = stronger |

### Verdict Guide

| Verdict | Action | Description |
|---|---|---|
| `strong` | ✅ Pursue | Trending strongly above benchmark |
| `pass` | ✅ Pursue | Good opportunity, steady or rising |
| `close` | ⚠️ Watch | Close to pass, verify manually |
| `watch` | ⏸️ Observe | Monitor for trend changes |
| `fail` | ❌ Skip | Declining, no opportunity |

### Freshness Guide

| Status | Action | Description |
|---|---|---|
| `new` | ✅ Pursue | Recently emerged (7d/30d/90d window) |
| `old_hot` | ✅ Pursue | Old word with recent surge |
| `stable_old` | ❌ Skip | Stable for years, not a new opportunity |
| `unclear` | ⚠️ Verify | Not enough data, manual check needed |

## Step-by-Step Analysis

### Step 1: Get Results

```bash
python3 gk_api.py research --report > results.md
```

This runs server-side pipeline:
- ✅ Keyword expansion (DataForSEO + Google Trends)
- ✅ AI-powered filtering (removes junk, keeps utility tools)
- ✅ Trend comparison vs benchmark (`gpts`)
- ✅ SERP competition analysis
- ✅ Final opportunity classification

### Step 2: Review Opportunities

From the report's "值得继续" table:

1. **Check user intent** - Does `intent.demand` match a tool/saaS need?
   - ✅ "Find an online tool to..." → Good
   - ❌ "What is...", "How to..." → Informational, skip

2. **Check trend strength** - Is `verdict` strong or pass?
   - ✅ `strong` or `pass` → Pursue
   - ⚠️ `close` → Verify manually
   - ❌ `watch` or `fail` → Skip

3. **Check freshness** - Is it new or old_hot?
   - ✅ `new` (7d/30d/90d) → Fresh opportunity
   - ✅ `old_hot` → Old word with recent surge
   - ❌ `stable_old` → Not a new opportunity

### Step 3: Manual SERP Verification (Optional but Recommended)

For each "值得继续" keyword, verify manually:

1. **Google search** - Open incognito window, search the keyword
2. **Check intent** - Are top 10 mostly tool pages or blog posts?
3. **Check competition** - Are there small niche sites or only big brands?
4. **Check features** - What are competitors doing? Can we differentiate?

**Red flags**:
- Top 10 are mostly blog posts / tutorials / Wikipedia → Informational intent, skip
- AI Overview present → Google already answering, skip
- Featured Snippet present → Hard to rank, skip
- Only big brands (Adobe, Canva, Grammarly) → Authority-heavy, skip

**Green flags**:
- Multiple niche tool sites (.ai, .app, .io) → Niche-friendly
- Mix of authority + niche → Mixed, can compete
- Few or no AI Overview / Featured Snippet → SERP not locked

### Step 4: Competitor Domain Age (Optional)

If manual SERP check passes, check competitor ages:

```bash
# Extract niche domains from Google results, then:
python3 scripts/domain_age.py tattoogen.ai blackink.ai coloringpage.ai
```

**Age guide**:
- < 2 years → ✅ Strong opportunity (new, beatable)
- 2-5 years → ⚠️ Moderate (established, but can compete)
- > 5 years → ❌ Deep moat (skip unless major differentiation)

### Step 5: Product Direction

From the report's "切入方向" column, pick a direction:

| Keyword Type | Suggested Product |
|---|---|
| `generator` | Template-based generation, batch export, customizable parameters |
| `editor` / `enhancer` | Upload-based editor, before/after comparison, no signup required |
| `checker` / `detector` | Quick validation, explain why, give fix suggestions |
| `converter` | Drag-and-drop, instant result, download options |

## Decision Boundaries

**Stop** when:
- Found 2-3 "strong" or "pass" opportunities → Move to project planning
- All remaining `stable_old` or `fail` → Change seed keywords
- Quota exceeded → Wait for next day or increase quota

**Pause** when:
- Have 1 strong + 3-5 close/watch → Pursue strong, observe rest
- No clear winners but several close → Expand seed keywords and retry

## Common Pitfalls

1. **Don't chase volume alone** — High volume + declining trend = bad opportunity
2. **Don't ignore SERP** — Good keyword + authority-heavy SERP = can't rank
3. **Don't assume age** — "Looks small" ≠ actually small (check domain age!)
4. **Don't trust only verdict** — Manual SERP verification is critical
5. **Don't skip intent check** — Informational queries don't convert to tool users

## Output Format

Always use this three-table format:

```
# 一句话总判断
[one sentence summary]

## 值得继续
| 关键词 | 趋势 | 新鲜度 | 用户意图 | 为什么 | 切入方向 |

## 可观察
| 关键词 | 趋势 | 新鲜度 | 为什么观察 | 跟踪什么 |

## 不值得做
| 关键词 | 为什么 |

## 下一步建议
1. ...
```

This matches the `--report` output format and is learner-friendly.



---

## requirements.json

{
  "id": "keyword-research-agent",
  "difficulty": "medium",
  "accounts": [
    "Google Trends 或可替代趋势数据源（可手动）",
    "关键词工具账号：Ahrefs/Semrush/DataForSEO/discoverkeywords.co 任一即可"
  ],
  "env": [
    "KEYWORD_TOOL_API_KEY（可选，只有自动化采集需要）"
  ],
  "browserSessions": [
    "Google Trends",
    "SERP 搜索引擎"
  ],
  "blockingRules": [
    "没有任何关键词/竞品/目标市场输入：BLOCKED",
    "没有付费关键词工具：可先用公开 SERP，但最终 SEO 证据标 missing_keyword_tool_access"
  ],
  "canContinueWithout": [
    "公开 SERP + Trends 手动截图可继续轻量研究"
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

## scripts/domain_age.py

#!/usr/bin/env python3
"""Check domain registration age via WHOIS and web archive."""
import subprocess, json, sys, re

def check_domain(domain):
    age_info = "unknown"
    
    # Try WHOIS for creation date
    try:
        r = subprocess.run(["whois", domain], capture_output=True, text=True, timeout=10)
        for pattern in [r"Creation Date:\s*(.+)", r"created:\s*(.+)", r"Registered on:\s*(.+)", r"Registry Domain ID.*Creation Date:\s*(.+)"]:
            m = re.search(pattern, r.stdout, re.IGNORECASE)
            if m:
                age_info = m.group(1).strip()[:30]
                break
    except Exception:
        pass
    
    # Fallback: web archive first snapshot
    if age_info == "unknown":
        try:
            r = subprocess.run(
                ["curl", "-s", f"https://web.archive.org/cdx/search/cdx?url={domain}&output=json&limit=1&fl=timestamp"],
                capture_output=True, text=True, timeout=10
            )
            data = json.loads(r.stdout)
            if len(data) > 1:
                age_info = f"first archive: {data[1][0][:8]}"
        except Exception:
            pass
    
    return age_info

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: domain_age.py <domain1> [domain2] ...")
        sys.exit(1)
    
    for domain in sys.argv[1:]:
        age = check_domain(domain)
        print(f"{domain}: {age}")
        sys.stdout.flush()



---

## scripts/gk_api.py

#!/usr/bin/env python3
"""
Google Keywords Website API client.

Single entry point: submit expand job → poll status → get full results
(including AI filter, SERP competition, trends comparison).

All heavy lifting is server-side. This script submits the job,
polls until complete, then returns the final data.
"""
import os
import sys
import json
import time
import argparse
from pathlib import Path
import requests
from typing import List, Dict, Optional

# Website config
GK_SITE_URL = os.environ.get('GK_SITE_URL', 'https://www.discoverkeywords.co')
GK_API_KEY = os.environ.get('GK_API_KEY', '')
DEFAULT_BENCHMARK = os.environ.get('GK_BENCHMARK', 'gpts')
RECOMMENDED_COMPARE_LIMIT = int(os.environ.get('GK_RECOMMENDED_COMPARE_LIMIT', '50'))
RECOMMENDED_MIN_SCORE = int(os.environ.get('GK_RECOMMENDED_MIN_SCORE', '20'))
RECOMMENDED_HIGH_CONFIDENCE_SCORE = int(os.environ.get('GK_RECOMMENDED_HIGH_CONFIDENCE_SCORE', '60'))
RECOMMENDED_SECTION_QUOTAS = {
    'explosive': int(os.environ.get('GK_RECOMMENDED_EXPLOSIVE_QUOTA', '22')),
    'fastRising': int(os.environ.get('GK_RECOMMENDED_FAST_RISING_QUOTA', '16')),
    'steadyRising': int(os.environ.get('GK_RECOMMENDED_STEADY_RISING_QUOTA', '12')),
}
FALLBACK_DEFAULT_SEEDS = [
    "calculator", "generator", "converter", "maker", "creator",
    "editor", "builder", "designer", "simulator", "translator",
]
shared_defaults_env = os.environ.get('GK_SHARED_DEFAULTS_PATH', '').strip()
SHARED_DEFAULTS_PATH = Path(shared_defaults_env) if shared_defaults_env else None

DEFAULT_SEEDS = FALLBACK_DEFAULT_SEEDS[:]

try:
    if SHARED_DEFAULTS_PATH and SHARED_DEFAULTS_PATH.exists():
        shared_defaults = json.loads(SHARED_DEFAULTS_PATH.read_text())
        keywords = shared_defaults.get('defaultKeywords', [])
        if isinstance(keywords, list):
            parsed = [item.strip() for item in keywords if isinstance(item, str) and item.strip()]
            if parsed:
                DEFAULT_SEEDS = parsed
except Exception:
    DEFAULT_SEEDS = FALLBACK_DEFAULT_SEEDS[:]

raw_default_seeds = os.environ.get('GK_DEFAULT_SEEDS', '').strip()
if raw_default_seeds:
    DEFAULT_SEEDS = [item.strip() for item in raw_default_seeds.split(',') if item.strip()]

def _headers():
    return {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {GK_API_KEY}',
        'Accept': 'application/json',
        'User-Agent': 'curl/8.5.0',
    }

def _api_call(method: str, path: str, body: dict = None, timeout: int = 30) -> Dict:
    url = f'{GK_SITE_URL}{path}'
    resp = requests.request(method, url, headers=_headers(), json=body, timeout=timeout)
    resp.raise_for_status()
    return resp.json()

def _detect_role(api_key: str) -> str:
    """Detect if an API key belongs to student or admin."""
    if not api_key:
        return 'unknown'
    try:
        resp = requests.get(f'{GK_SITE_URL}/api/me', headers={'Authorization': f'Bearer {api_key}'}, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            return data.get('role', 'student')
    except:
        pass
    return 'unknown'


def fetch_game_keywords(api_key: str = None) -> List[Dict]:
    """Fetch recommended game keywords.
    
    api_key=None  → use admin key + admin endpoint (all keywords)
    api_key=str   → use provided key + student endpoint (3 per-user)
    """
    key = api_key or GK_API_KEY
    headers = {'Authorization': f'Bearer {key}'}
    
    # Explicit provided key: prefer student-safe endpoint first.
    if api_key:
        try:
            resp = requests.get(f'{GK_SITE_URL}/api/game-keywords', headers=headers, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                items = data.get('keywords', [])
                if items:
                    print(f"  🎮 Found {len(items)} personalized game keywords", file=sys.stderr)
                return items
            if resp.status_code not in (401, 403):
                print(f"  ⚠️ /api/game-keywords returned {resp.status_code}, trying admin path", file=sys.stderr)
        except Exception as e:
            print(f"  ⚠️ Student-safe game keywords failed: {e}", file=sys.stderr)

        # If caller explicitly passed a non-admin key, never hard-fail by falling back to admin.
        if api_key != GK_API_KEY:
            return []

    # Admin key → admin endpoint (all keywords)
    try:
        data = _api_call('GET', '/api/admin/game-keywords?filter=recommended&pageSize=20', timeout=15)
        items = data.get('items') or []
        if items:
            print(f"  🎮 Found {len(items)} recommended game keywords (admin)", file=sys.stderr)
        return items
    except Exception as e:
        print(f"  ⚠️ Game keywords fetch failed: {e}", file=sys.stderr)
        return []

# ── Expand (submit + poll) ──

def expand(keywords: List[str], use_cache: bool = True) -> Dict:
    """POST /api/research/expand. Returns a pending job envelope."""
    return _api_call('POST', '/api/research/expand', {
        'keywords': keywords,
        'useCache': use_cache,
    }, timeout=30)

def poll_expand_status(job_id: str, max_wait: int = 300) -> Dict:
    """Poll /api/research/expand/status until complete."""
    for i in range(max_wait // 10):
        data = _api_call('GET', f'/api/research/expand/status?jobId={job_id}', timeout=15)
        status = data.get('status', '')
        if status == 'complete':
            return data
        elif status == 'failed':
            raise Exception(f"Job failed: {data.get('error')}")
        if i % 3 == 0:
            print(f"  ⏳ Job {job_id}: {status}... ({i*10}s)", file=sys.stderr)
        time.sleep(10)
    raise Exception(f"Job {job_id} timed out after {max_wait}s")

def compare(keywords: List[str], date_from: str, date_to: str, benchmark: str = DEFAULT_BENCHMARK, api_key: str = None) -> Dict:
    """POST /api/research/compare. Ordinary API-key users should hit shared cache."""
    if api_key:
        url = f'{GK_SITE_URL}/api/research/compare'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}',
            'Accept': 'application/json',
            'User-Agent': 'curl/8.5.0',
        }
        resp = requests.post(url, headers=headers, json={
            'keywords': keywords,
            'dateFrom': date_from,
            'dateTo': date_to,
            'benchmark': benchmark,
            'minRuleScore': RECOMMENDED_MIN_SCORE,
        }, timeout=60)
        resp.raise_for_status()
        return resp.json()

    return _api_call('POST', '/api/research/compare', {
        'keywords': keywords,
        'dateFrom': date_from,
        'dateTo': date_to,
        'benchmark': benchmark,
        'minRuleScore': RECOMMENDED_MIN_SCORE,
    }, timeout=60)

def poll_compare_status(job_id: str, max_wait: int = 600) -> Dict:
    """Poll /api/research/compare/status until complete."""
    for i in range(max_wait // 10):
        data = _api_call('GET', f'/api/research/compare/status?jobId={job_id}', timeout=30)
        status = data.get('status', '')
        if status == 'complete':
            return data
        elif status == 'failed':
            raise Exception(f"Compare job failed: {data.get('error')}")
        if i % 3 == 0:
            ready = data.get('ready')
            total = data.get('total')
            print(f"  ⏳ Compare job {job_id}: {status} {ready}/{total}... ({i*10}s)", file=sys.stderr)
        time.sleep(10)
    raise Exception(f"Compare job {job_id} timed out after {max_wait}s")

def get_expanded_keywords(keywords: List[str], use_cache: bool = True) -> Dict:
    """
    Full flow: submit expand job → poll status → return complete results.
    Server-side pipeline: DataForSEO → rule engine → AI filter → SERP → trends.
    """
    if not GK_API_KEY:
        raise Exception("GK_API_KEY env var required.")

    print(f"📡 Calling expand API with {len(keywords)} seed keywords...", file=sys.stderr)
    result = expand(keywords, use_cache)

    job_id = result.get('jobId')
    if job_id:
        if result.get('fromCache'):
            print(f"  ♻️  Reusing cached job: {job_id}, polling...", file=sys.stderr)
        else:
            print(f"  📋 Job submitted: {job_id}, polling...", file=sys.stderr)
        data = poll_expand_status(job_id)
        flat = data.get('flatList', [])
        print(f"  ✅ Got {len(flat)} expanded keywords", file=sys.stderr)
        return data

    if result.get('status') == 'complete':
        flat = result.get('flatList', [])
        print(f"  ✅ Got {len(flat)} expanded keywords", file=sys.stderr)
        return result

    return result

# ── Helpers ──

def extract_keyword_names(results: List[Dict]) -> List[str]:
    return [item.get('keyword', '') for item in results if item.get('keyword')]

def _freshness_label(item: Dict) -> str:
    freshness = item.get('freshness') or {}
    label = freshness.get('label') or freshness.get('status') or '-'
    window = freshness.get('window')
    return f"{label}({window})" if window and window != 'none' else label

def _intent_summary(item: Dict) -> str:
    intent = item.get('intent') or {}
    demand = intent.get('demand') or ''
    label = intent.get('label') or ''
    if demand and label:
        return f"{label}: {demand}"
    return demand or label or '-'

def _why_item(item: Dict) -> str:
    freshness = item.get('freshness') or {}
    parts = []
    if freshness.get('reason'):
        parts.append(str(freshness['reason']))
    if item.get('ratio') is not None:
        parts.append(f"趋势强度 {item.get('ratio')}x")
    if item.get('verdict'):
        parts.append(f"判定 {item.get('verdict')}")
    return '；'.join(parts) or '-'

def _entry_direction(item: Dict) -> str:
    keyword = (item.get('keyword') or '').lower()
    intent = item.get('intent') or {}
    demand = intent.get('demand') or ''
    if any(token in keyword for token in ['generator', 'creator', 'maker']):
        return '做轻量生成器，突出模板、批量生成、可下载结果。'
    if any(token in keyword for token in ['editor', 'enhancer', 'upscaler', 'remover']):
        return '做在线编辑/增强工具，突出上传即用、前后对比、无需注册。'
    if any(token in keyword for token in ['checker', 'detector', 'verifier']):
        return '做检测/校验工具，突出快速判断、解释原因、给修复建议。'
    if any(token in keyword for token in ['calculator', 'planner', 'tracker']):
        return '做交互式计算/规划工具，突出表单输入、结果解释、可保存分享。'
    if demand:
        return f"围绕用户需求切入：{demand}"
    return '先做单页工具 MVP，验证搜索意图和转化。'

def format_game_keywords_section(game_keywords: List[Dict]) -> str:
    """Format game keywords into a human-readable Markdown section."""
    if not game_keywords:
        return ""
    lines = ["\n---\n## 🎮 游戏关键词推荐\n"]
    for g in game_keywords:
        rec = g.get('recommendation', '')
        kw = g.get('keyword', '')
        reason = g.get('reason', '')
        source = g.get('source', '')
        lines.append(f"**{rec} {kw}** (来源: {source})")
        if reason:
            lines.append(f"  - {reason}")
        lines.append("")
    return "\n".join(lines)

def render_report(result: Dict, max_items: int = 10) -> str:
    opportunities = result.get('opportunities') or []
    stable_old = result.get('stableOld') or []
    compare_results = (result.get('compare') or {}).get('results') or []
    watch_items = [
        item for item in compare_results
        if item not in opportunities
        and item.get('verdict') in ('close', 'watch')
        and (item.get('freshness') or {}).get('status') != 'stable_old'
    ]
    rejected = [
        item for item in compare_results
        if item.get('verdict') == 'fail'
        or (item.get('freshness') or {}).get('status') == 'stable_old'
    ]

    verdict = (
        f"本轮发现 {len(opportunities)} 个近期可做机会词。"
        if opportunities
        else "本轮没有发现足够明确的近期可做新词，建议等待下一轮缓存或扩大词根。"
    )
    lines = [
        "# 一句话总判断",
        verdict,
        "",
        "## 值得继续",
        "| 关键词 | 趋势 | 新鲜度 | 用户意图 | 为什么 | 切入方向 |",
        "|---|---:|---|---|---|---|",
    ]

    if opportunities:
        for item in opportunities[:max_items]:
            lines.append(
                "| {keyword} | {ratio}x / {verdict} | {freshness} | {intent} | {why} | {direction} |".format(
                    keyword=item.get('keyword', '-'),
                    ratio=item.get('ratio', '-'),
                    verdict=item.get('verdict', '-'),
                    freshness=_freshness_label(item),
                    intent=_intent_summary(item).replace('|', '/'),
                    why=_why_item(item).replace('|', '/'),
                    direction=_entry_direction(item).replace('|', '/'),
                )
            )
    else:
        lines.append("| - | - | - | - | 暂无 | - |")

    lines.extend([
        "",
        "## 可观察",
        "| 关键词 | 趋势 | 新鲜度 | 为什么观察 | 跟踪什么 |",
        "|---|---:|---|---|---|",
    ])
    observable = watch_items[:max_items]
    if observable:
        for item in observable:
            lines.append(
                "| {keyword} | {ratio}x / {verdict} | {freshness} | {why} | 观察下一轮是否进入 new/old_hot，且 verdict 是否提升。 |".format(
                    keyword=item.get('keyword', '-'),
                    ratio=item.get('ratio', '-'),
                    verdict=item.get('verdict', '-'),
                    freshness=_freshness_label(item),
                    why=_why_item(item).replace('|', '/'),
                )
            )
    else:
        lines.append("| - | - | - | 暂无 | - |")

    lines.extend([
        "",
        "## 不值得做",
        "| 关键词 | 为什么 |",
        "|---|---|",
    ])
    if rejected:
        for item in rejected[:max_items]:
            reason = '稳定老词，不作为近期新词机会。' if (item.get('freshness') or {}).get('status') == 'stable_old' else '趋势判定 fail。'
            lines.append(f"| {item.get('keyword', '-')} | {reason} |")
    else:
        lines.append("| - | 暂无 |")

    lines.extend([
        "",
        "## 下一步建议",
        "1. 优先人工复核“值得继续”里的关键词搜索意图和落地页形态。",
        "2. 不要把 stable_old 当作新词机会，除非有明确差异化产品方案。",
        "3. 下一轮每日缓存更新后，重点观察 old_hot/new 是否持续出现。",
    ])
    # Append game keywords section
    game_keywords = result.get('gameKeywords') or []
    if game_keywords:
        lines.append(format_game_keywords_section(game_keywords))
    # Append old-keywords section if provided
    old_kws = result.get('oldKeywords') or []
    if old_kws:
        lines.append('')
        lines.append(render_old_keywords_report(old_kws))
    return '\n'.join(lines)

def sanitize_for_learner(value):
    """Remove platform/internal transport details from learner-facing output."""
    hidden_keys = {
        'fromCache',
        'cacheFallback',
        'jobId',
        'strategy',
        'sessionId',
        'comparisonId',
        'intentRefreshed',
    }
    if isinstance(value, dict):
        return {
            key: sanitize_for_learner(item)
            for key, item in value.items()
            if key not in hidden_keys
        }
    if isinstance(value, list):
        return [sanitize_for_learner(item) for item in value]
    return value

def _candidate_score(item: Dict) -> float:
    try:
        return float(item.get('score') or 0)
    except (TypeError, ValueError):
        return 0

def build_recommended_selection(expand_data: Dict, limit: int = RECOMMENDED_COMPARE_LIMIT, user_id: str = None) -> List[str]:
    """Mirror the web app recommended compare selection.
    
    If user_id is provided, return a deterministic subset (~2 keywords) for personalization.
    """
    organized = expand_data.get('organized') or {}
    flat_list = expand_data.get('flatList') or expand_data.get('candidates') or []
    picked: List[str] = []
    picked_set = set()

    def add_keyword(item: Dict) -> bool:
        keyword = item.get('keyword') if isinstance(item, dict) else None
        if not keyword or keyword in picked_set:
            return False
        if _candidate_score(item) < RECOMMENDED_MIN_SCORE:
            return False
        picked.append(keyword)
        picked_set.add(keyword)
        return True

    def add_candidates(items: List[Dict], max_count: int) -> None:
        added = 0
        for item in items or []:
            if len(picked) >= limit or added >= max_count:
                break
            if add_keyword(item):
                added += 1

    strong = [
        item for item in flat_list
        if isinstance(item, dict) and _candidate_score(item) >= RECOMMENDED_HIGH_CONFIDENCE_SCORE
    ]
    for item in strong:
        if len(picked) >= limit:
            break
        add_keyword(item)

    add_candidates(organized.get('explosive') or [], RECOMMENDED_SECTION_QUOTAS['explosive'])
    add_candidates(organized.get('fastRising') or [], RECOMMENDED_SECTION_QUOTAS['fastRising'])
    add_candidates(organized.get('steadyRising') or [], RECOMMENDED_SECTION_QUOTAS['steadyRising'])

    if len(picked) < limit:
        slow_ids = {
            id(item) for item in organized.get('slowRising') or []
            if isinstance(item, dict)
        }
        non_slow = [item for item in flat_list if id(item) not in slow_ids]
        add_candidates(non_slow, limit)

    # Keep a broad recommended pool for compare. Student personalization should
    # happen at the final display layer, not by shrinking the candidate pool here.
    return picked[:limit]

def get_complete_keyword_research(
    keywords: List[str],
    use_cache: bool = True,
    benchmark: str = DEFAULT_BENCHMARK,
    student_api_key: str = None,
) -> Dict:
    """Expand from shared cache, then compare against benchmark from shared cache."""
    student_mode = bool(student_api_key and student_api_key != GK_API_KEY)

    # Students must never create new upstream jobs. They always consume the
    # shared precomputed cache keyed by DEFAULT_SEEDS.
    effective_keywords = DEFAULT_SEEDS if student_mode else keywords
    if student_mode:
        print("📚 Student mode: using shared precomputed expand cache", file=sys.stderr)

    expand_data = get_expanded_keywords(effective_keywords, use_cache=use_cache)
    
    if student_mode:
        # Student mode consumes shared compare cache directly. Do not build a
        # per-request compare keyword set, and never create a new compare job.
        selected = []
        print("📊 Student mode: using shared compare cache", file=sys.stderr)
        compare_data = compare(
            [],
            expand_data.get('dateFrom', ''),
            expand_data.get('dateTo', ''),
            benchmark=benchmark,
            api_key=student_api_key,
        )
    else:
        selected = build_recommended_selection(expand_data)
        if not selected:
            return {
                'status': 'complete',
                'expand': expand_data,
                'compare': None,
                'selectedKeywords': [],
                'opportunities': [],
            }

        print(f"📊 Calling compare API with {len(selected)} recommended keywords...", file=sys.stderr)
        compare_data = compare(
            selected,
            expand_data.get('dateFrom', ''),
            expand_data.get('dateTo', ''),
            benchmark=benchmark,
        )
    job_id = compare_data.get('jobId')
    if job_id:
        print(f"  📋 Compare job: {job_id}, polling...", file=sys.stderr)
        compare_data = poll_compare_status(job_id)

    results = compare_data.get('results') or []
    opportunities = [
        item for item in results
        if item.get('verdict') in ('strong', 'pass', 'close', 'watch')
        and (item.get('freshness') or {}).get('status') in ('new', 'old_hot')
    ]
    stable_old = [
        item for item in results
        if (item.get('freshness') or {}).get('status') == 'stable_old'
    ]

    # Fetch game keywords - use student endpoint if student key provided
    recommended_games = fetch_game_keywords(api_key=student_api_key)
    # Filter out skip items
    recommended_games = [g for g in recommended_games if g.get('recommendation') and 'skip' not in g.get('recommendation', '').lower()]

    print(
        f"  ✅ Compare results={len(results)} opportunities={len(opportunities)} stable_old={len(stable_old)} game_keywords={len(recommended_games)}",
        file=sys.stderr,
    )
    return {
        'status': 'complete',
        'benchmark': benchmark,
        'dateFrom': expand_data.get('dateFrom'),
        'dateTo': expand_data.get('dateTo'),
        'selectedKeywords': selected,
        'opportunities': opportunities,
        'stableOld': stable_old,
        'gameKeywords': recommended_games if recommended_games else None,
        'expand': expand_data,
        'compare': compare_data,
    }

def fetch_old_keywords(limit: int = 100, min_score: int = 0, personalized: bool = False) -> List[Dict]:
    """Fetch old-word (low-competition) keyword opportunities.
    
    personalized=True  → /api/old-keywords (3 keywords per user, zero billing)
    personalized=False → /api/admin/old-keywords (all keywords, admin only)
    """
    headers = {'Authorization': f'Bearer {GK_API_KEY}'}
    if personalized:
        resp = requests.get(f'{GK_SITE_URL}/api/old-keywords', headers=headers, timeout=30)
    else:
        params = {'limit': limit, 'minScore': min_score}
        resp = requests.get(f'{GK_SITE_URL}/api/admin/old-keywords', headers=headers, params=params, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    return data.get('keywords', [])


def render_old_keywords_report(keywords: List[Dict]) -> str:
    """Render old-word opportunities as Markdown report."""
    if not keywords:
        return "# \u8001\u8bcd\u673a\u4f1a\u62a5\u544a\n\n\u6682\u65e0\u6570\u636e\u3002\u7b49\u5f85\u540e\u53f0\u7ba1\u7ebf\u8fd0\u884c\u540e\u81ea\u52a8\u586b\u5145\u3002"
    lines = [
        "# \U0001f50d \u8001\u8bcd\u673a\u4f1a\u62a5\u544a",
        "",
        f"\u4ece\u5df2\u6709\u641c\u7d22\u91cf\u4e2d\u6316\u6398\u7684\u4f4e\u7ade\u4e89\u673a\u4f1a\u8bcd\uff08\u5171 {len(keywords)} \u4e2a\uff09",
        "",
        "| # | \u5173\u952e\u8bcd | \u6708\u641c\u7d22\u91cf | CPC | KD | \u7ade\u4e89 | \u8bc4\u5206 | \u610f\u56fe | \u6765\u6e90\u79cd\u5b50 |",
        "|---|--------|---------|-----|----|------|------|------|---------|",
    ]
    for idx, kw in enumerate(keywords[:30], start=1):
        lines.append(
            f"| {idx} | **{kw['keyword']}** | {kw.get('volume', 0):,} | "
            f"${kw.get('cpc', 0):.2f} | {kw.get('kd', 0)} | {kw.get('competition', '')} | "
            f"{kw.get('score', 0):,.0f} | {kw.get('intent', '')} | {kw.get('source_seed', '')} |"
        )
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description='Google Keywords Website API client')
    sub = parser.add_subparsers(dest='command', required=True)

    # research (recommended): expand cache + compare cache, returns opportunity keywords
    p_research = sub.add_parser('research', help='Complete keyword research from shared cache')
    p_research.add_argument('seeds', nargs='*', help='Seed keywords (optional; defaults to shared seeds)')
    p_research.add_argument('--no-cache', action='store_true')
    p_research.add_argument('--benchmark', default=DEFAULT_BENCHMARK)
    p_research.add_argument('--names-only', action='store_true')
    p_research.add_argument('--report', action='store_true', help='Output a learner-friendly Markdown report')
    p_research.add_argument('--raw', action='store_true', help='Output raw API-shaped data including internal fields')

    # expand (candidate discovery only)
    p_expand = sub.add_parser('expand', help='Expand seed keywords (candidate discovery only)')
    p_expand.add_argument('seeds', nargs='*', help='Seed keywords (optional; defaults to built-in seeds)')
    p_expand.add_argument('--no-cache', action='store_true')
    p_expand.add_argument('--names-only', action='store_true')

    # serp (kept for backward compat, but now part of expand pipeline)
    p_serp = sub.add_parser('serp', help='[DEPRECATED] Use expand instead')
    p_serp.add_argument('keywords', nargs='+')

    # trends (kept for backward compat, but now part of expand pipeline)
    p_trends = sub.add_parser('trends', help='[DEPRECATED] Use expand instead')
    p_trends.add_argument('keywords', nargs='+')

    # full (kept for backward compat, same as expand now)
    p_full = sub.add_parser('full', help='Expand + SERP + Trends (same as expand)')
    p_full.add_argument('seeds', nargs='*')

    # old-keywords: low-competition keyword opportunities
    p_old = sub.add_parser('old-keywords', help='Get personalized old-word recommendations')
    p_old.add_argument('--all', action='store_true', help='Show all keywords (admin only)')
    p_old.add_argument('--limit', type=int, default=100, help='Max keywords (admin --all mode)')
    p_old.add_argument('--min-score', type=int, default=0, help='Min score filter (admin --all mode)')
    p_old.add_argument('--report', action='store_true', help='Output Markdown report')
    p_old.add_argument('--names-only', action='store_true', help='Output keyword names only')

    args = parser.parse_args()

    if args.command == 'research':
        seeds = args.seeds or DEFAULT_SEEDS
        if not args.seeds:
            print(f"ℹ️  No seeds provided. Using {len(seeds)} default seeds.", file=sys.stderr)
        results = get_complete_keyword_research(
            seeds,
            use_cache=not getattr(args, 'no_cache', False),
            benchmark=getattr(args, 'benchmark', DEFAULT_BENCHMARK),
            student_api_key=GK_API_KEY,
        )
        if getattr(args, 'names_only', False):
            for kw in extract_keyword_names(results.get('opportunities', [])):
                print(kw)
        elif getattr(args, 'report', False):
            # Auto-fetch old-keywords and merge into report
            try:
                old_kws = fetch_old_keywords(personalized=True)
                if old_kws:
                    results['oldKeywords'] = old_kws
                    print(f'  📚 Got {len(old_kws)} old-word opportunities', file=sys.stderr)
            except Exception as e:
                print(f'  ⚠️ Old-keywords fetch failed: {e}', file=sys.stderr)
            print(render_report(results))
        else:
            output = results if getattr(args, 'raw', False) else sanitize_for_learner(results)
            print(json.dumps(output, indent=2, ensure_ascii=False))

    elif args.command in ('expand', 'full'):
        seeds = args.seeds or DEFAULT_SEEDS
        if not args.seeds:
            print(f"ℹ️  No seeds provided. Using {len(seeds)} default seeds.", file=sys.stderr)
        results = get_expanded_keywords(seeds, use_cache=not getattr(args, 'no_cache', False))
        if args.command == 'expand' and getattr(args, 'names_only', False):
            for kw in extract_keyword_names(results.get('flatList', [])):
                print(kw)
        else:
            print(json.dumps(results, indent=2, ensure_ascii=False))

    elif args.command == 'old-keywords':
        use_all = getattr(args, 'all', False)
        keywords = fetch_old_keywords(
            limit=getattr(args, 'limit', 100),
            min_score=getattr(args, 'min_score', 0),
            personalized=not use_all,
        )
        if getattr(args, 'names_only', False):
            for kw in keywords:
                print(kw['keyword'])
        elif getattr(args, 'report', False):
            print(render_old_keywords_report(keywords))
        else:
            print(json.dumps(keywords, indent=2, ensure_ascii=False))

    elif args.command == 'serp':
        print("⚠️  SERP is now part of the expand pipeline. Use: expand <keywords>", file=sys.stderr)
        print("SERP competition data is included in each candidate's result.", file=sys.stderr)
        sys.exit(1)

    elif args.command == 'trends':
        print("⚠️  Trends comparison is now part of the expand pipeline. Use: expand <keywords>", file=sys.stderr)
        print("Trend data (ratio, verdict, etc.) is included in each candidate's 'trends' field.", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()



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

## scripts/validate_keyword_report.py

#!/usr/bin/env python3
import sys
from pathlib import Path

REQUIRED = ["值得做", "可观察", "不值得做", "SERP", "PRD"]

def main():
    if len(sys.argv) < 2:
        print("Usage: validate_keyword_report.py <report.md>", file=sys.stderr)
        return 2
    text = Path(sys.argv[1]).read_text(encoding="utf-8")
    missing = [x for x in REQUIRED if x not in text]
    if missing:
        print("Missing sections: " + ", ".join(missing), file=sys.stderr)
        return 1
    print("OK: keyword report has required sections")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())



---

## templates/opportunity-report-template.md

# 关键词机会报告

## 输入
- 项目方向：
- 种子词：
- 目标市场：
- 排除条件：

## 一句话判断

本轮发现：值得做 X 个，可观察 Y 个，不值得做 Z 个。

## 值得做

| 关键词 | 意图 | 趋势/新鲜度 | 商业信号 | SERP 判断 | 切入方向 |
|---|---|---|---|---|---|

## 可观察

| 关键词 | 为什么观察 | 下次看什么 |
|---|---|---|

## 不值得做

| 关键词 | 排除原因 |
|---|---|

## Top 3 下一步

1. 
2. 
3. 



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

