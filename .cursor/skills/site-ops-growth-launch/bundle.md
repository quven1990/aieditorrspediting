# 上线发布与冷启动增长

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# 上线发布与冷启动增长 更新记录

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
name: site-ops-growth-launch
title: 上线发布与冷启动增长
description: 在 QA/SEO/合规 GO 后执行冷启动：目录提交、社区发布、周刊投稿、首周监控和风险回传。
version: 2.2.0
owner: ShipSolo
agent: moyun
category: 做站全流程
stage: 11-ops
updated: 2026-05-26
student_level: beginner
source: internal-site-building-flow-publicized
---

# 上线发布与冷启动增长

在 QA/SEO/合规 GO 后执行冷启动：目录提交、社区发布、周刊投稿、首周监控和风险回传。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`11-ops`
- 角色：在 QA/SEO/合规 GO 后执行冷启动：目录提交、社区发布、周刊投稿、首周监控和风险回传。
- 上游：QA GO、SEO GO、合规 GO、生产 URL、发布素材。
- 下游：数据复盘。

## 什么时候使用

- 站点已上线，需要冷启动
- 要规划 Product Hunt/Reddit/目录/周刊/X 发布
- 要准备发布素材和 UTM
- 要避免未验收就公开推广

## 输入契约

开始前尽量准备：

- 生产 URL
- 一句话定位和截图/OG
- 目标关键词和用户社区
- QA/SEO/合规结论
- 禁止发布的风险点

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
- Product Hunt/Reddit/X/目录站账号（按渠道）
- 邮箱账号（投稿/联系）
- 环境变量 / Token：
- 无硬性要求；按项目资料推进。
- 浏览器登录态：
- 各发布平台登录态

### 缺失处理
- 任何公开发布/投稿/社媒发帖前必须人工确认
- 缺平台登录态时不能标 Launch DONE

### 可以降级继续
- 可先生成发布素材、目录清单、投稿文案草案

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
你现在执行 ShipSolo 做站流水线的「上线发布与冷启动增长」阶段。

项目：[项目名称]
当前阶段：11-ops
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

### 1. 上线闸门
没有 QA_GO/SEO_GO/合规 GO 不公开发布；只有预览链接时先内部试用。

### 2. 素材包
准备标题、短描述、长描述、截图、Logo、OG、FAQ、创始人说明、UTM。

### 3. 渠道选择
目录/AI 工具站、Reddit、HN、Product Hunt、X、周刊、合作伙伴，按站点类型选 2-3 个打透。

### 4. 发布节奏
Day 0 目录和自有渠道；Day 1-3 社区反馈；Day 3-7 周刊/PH/外链。

### 5. 监控
看流量、转化、错误、排名、用户反馈；P0 反馈立即回前端/后端/PRD。

### 6. 记录
每个渠道记录 URL、时间、文案、UTM、结果和下一步。


## 交付物

- Launch asset pack
- 渠道发布计划
- UTM 链接表
- 提交/发布记录
- 首周监控清单

## 验收清单 / 质量门槛

- [ ] 没有在 QA_GO 前公开发布
- [ ] 每个发布链接有 UTM 或来源记录
- [ ] 文案与实际功能一致
- [ ] 反馈能回流到复盘和返修

## 下游交接格式

```markdown
# 上线发布与冷启动增长交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：11-ops
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
- 下一阶段：数据复盘。
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
请加载 ShipSolo Skill：site-ops-growth-launch，按我的项目资料执行。
```

## 常见坑

- 为了曝光提前发半成品
- 一篇通稿复制到所有社区
- 没有记录提交 URL
- 社区硬广被删后没有复盘

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

# 上线发布与冷启动增长 使用说明

## 先说结论

这份 Skill 的主路径不是让你运行脚本，而是让你把“一键启动 Prompt”复制给 AI。脚本只是可选辅助，用来检查交接是否完整。

## 开始前先准备

这一版新增 Preflight。先确认缺什么，再让 AI 执行，避免跑到一半才发现没权限。

- 账号/后台：Product Hunt/Reddit/X/目录站账号（按渠道）、邮箱账号（投稿/联系）
- 环境变量 / Token：无硬性账号要求
- 浏览器登录态：各发布平台登录态
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
请按 ShipSolo 学员版 Skill「上线发布与冷启动增长」执行。
项目：[填写项目]
当前阶段：11-ops
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：11-ops
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] 没有在 QA_GO 前公开发布
- [ ] 每个发布链接有 UTM 或来源记录
- [ ] 文案与实际功能一致
- [ ] 反馈能回流到复盘和返修

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

## references/channel-selection-matrix.md

# 上线发布与冷启动增长 — 内部能力脱敏参考

## 阶段核心能力

渠道选择、素材包、目录提交、社区发布、UTM、反馈归类、实验日志

## 执行顺序

1. 先读上游交接摘要，确认输入是否满足契约。
2. 缺关键输入时输出 `[BLOCKED]`，不要编造数据或替用户做高风险决策。
3. 可推进时按 `SKILL.md` 的 Phase 顺序执行，所有依据写来源或标 `[待确认]`。
4. 完成后用模板生成交付物，再运行脚本做最小校验。
5. 最后一段写下游交接摘要，状态只能是 `[DONE] / [BLOCKED] / [NEEDS_REVIEW]`。

## 质量门槛

- [ ] 首周只选 2-3 个主渠道
- [ ] 每个外发内容需人工确认
- [ ] 必须带 UTM
- [ ] 不能刷屏/垃圾外链

## 脱敏边界

- 可以保留流程、字段、判断标准、模板、脚本骨架。
- 不保留真实 API Key、Cookie、Token、内部路径、生产库名、群聊 ID、真实客户数据。
- 公开示例统一用 `[PROJECT]`、`[DOMAIN]`、`[API_KEY]`、`[ACCOUNT]` 这类占位符。



---

## references/stage-rubric.md

# 上线发布与冷启动增长 阶段判断规则

## 本阶段目标

在 QA/SEO/合规 GO 后执行冷启动：目录提交、社区发布、周刊投稿、首周监控和风险回传。

## 必须保留的内部流程精华（已脱敏）

### 1. 上线闸门
没有 QA_GO/SEO_GO/合规 GO 不公开发布；只有预览链接时先内部试用。

### 2. 素材包
准备标题、短描述、长描述、截图、Logo、OG、FAQ、创始人说明、UTM。

### 3. 渠道选择
目录/AI 工具站、Reddit、HN、Product Hunt、X、周刊、合作伙伴，按站点类型选 2-3 个打透。

### 4. 发布节奏
Day 0 目录和自有渠道；Day 1-3 社区反馈；Day 3-7 周刊/PH/外链。

### 5. 监控
看流量、转化、错误、排名、用户反馈；P0 反馈立即回前端/后端/PRD。

### 6. 记录
每个渠道记录 URL、时间、文案、UTM、结果和下一步。


## 质量门槛

- [ ] 没有在 QA_GO 前公开发布
- [ ] 每个发布链接有 UTM 或来源记录
- [ ] 文案与实际功能一致
- [ ] 反馈能回流到复盘和返修

## 常见失败模式

- 为了曝光提前发半成品
- 一篇通稿复制到所有社区
- 没有记录提交 URL
- 社区硬广被删后没有复盘

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## requirements.json

{
  "id": "site-ops-growth-launch",
  "difficulty": "high",
  "accounts": [
    "Product Hunt/Reddit/X/目录站账号（按渠道）",
    "邮箱账号（投稿/联系）"
  ],
  "env": [],
  "browserSessions": [
    "各发布平台登录态"
  ],
  "blockingRules": [
    "任何公开发布/投稿/社媒发帖前必须人工确认",
    "缺平台登录态时不能标 Launch DONE"
  ],
  "canContinueWithout": [
    "可先生成发布素材、目录清单、投稿文案草案"
  ]
}



---

## scripts/build_utm_links.py

#!/usr/bin/env python3
"""上线发布与冷启动增长 最小校验脚本。用法：python scripts/build_utm_links.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['首周只选 2-3 个主渠道', '每个外发内容需人工确认', '必须带 UTM', '不能刷屏/垃圾外链']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 上线发布与冷启动增长 report basic structure passed')
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

## templates/launch-asset-pack.md

# 上线发布与冷启动增长 — 标准交付物模板

## 1. 基本信息

- 项目：`[PROJECT]`
- 域名/候选域名：`[DOMAIN]`
- 当前阶段：`11-ops`
- 执行人/Agent：`moyun`
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

- [ ] 首周只选 2-3 个主渠道
- [ ] 每个外发内容需人工确认
- [ ] 必须带 UTM
- [ ] 不能刷屏/垃圾外链

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

