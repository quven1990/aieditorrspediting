# 上线前 QA 验收

> ShipSolo public skill bundle. Sensitive server paths and credential-like values are redacted.



---

## CHANGELOG.md

# 上线前 QA 验收 更新记录

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
name: student-site-qa-acceptance
title: 上线前 QA 验收
description: 用真实用户任务做最终验收，输出 GO/NO-GO、P0/P1/P2、证据和返修闭环。
version: 2.2.0
owner: ShipSolo
agent: motest
category: 做站全流程
stage: 09-qa
updated: 2026-05-26
student_level: beginner
source: internal-site-building-flow-publicized
---

# 上线前 QA 验收

用真实用户任务做最终验收，输出 GO/NO-GO、P0/P1/P2、证据和返修闭环。

> 这是内部做站、上线、复盘流水线的脱敏学员版：保留阶段顺序、判断标准、质量闸门、交接格式和返修闭环；移除私有路径、账号、密钥、内部群聊和生产环境细节。

## 流水线位置

- 当前阶段：`09-qa`
- 角色：用真实用户任务做最终验收，输出 GO/NO-GO、P0/P1/P2、证据和返修闭环。
- 上游：可访问站点、PRD、PM Gate、SEO/合规复核、部署信息。
- 下游：上线运营或返修。

## 什么时候使用

- 上线前要验收
- 改完 P0 要复测
- 要检查移动端、SEO、链接、登录/会员/支付/内容
- 要区分能不能交给运营

## 输入契约

开始前尽量准备：

- 线上 URL
- PRD 和核心用户任务
- 测试账号/权限（如有）
- 页面清单
- 已知风险和修复清单

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
- 测试账号/会员账号/管理员账号（按功能需要）
- 环境变量 / Token：
- 无硬性要求；按项目资料推进。
- 浏览器登录态：
- 已登录测试账号
- 移动端或浏览器自动化会话

### 缺失处理
- 无登录态只能测公开页，不能给全站 QA_GO
- 无生产/预览 URL：BLOCKED

### 可以降级继续
- 可做公开页、移动端、SEO 基础检查，并列出未测范围

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
你现在执行 ShipSolo 做站流水线的「上线前 QA 验收」阶段。

项目：[项目名称]
当前阶段：09-qa
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

### 1. 准入检查
确认 PM/SEO/合规必要 gate；没有就标风险，不盲目 GO。

### 2. 5 秒测试
首屏能否说清 What/Who/Why/CTA，核心价值是否先出现。

### 3. 真实任务
按用户任务点击，不只看页面存在；工具、地图、目录、会员、内容、后台按站点类型测。

### 4. 技术 smoke
HTTP 200/301、HTTPS、robots、sitemap、canonical、H1、metadata、schema、链接、移动端。

### 5. 权限和数据
登录/会员/支付/订单/上传/API 错误态按真实路径测；无权限时明确 BLOCKED。

### 6. 分级结论
P0 阻断上线；P1 修复后可复测；P2 可上线后跟进。

### 7. 返修闭环
修复完成后必须独立 Re-QA，不能由实现者自证。


## 交付物

- QA 验收报告
- P0/P1/P2 列表
- 截图/请求/浏览器证据
- GO/NO-GO 结论
- 返修交接

## 验收清单 / 质量门槛

- [ ] 不是只测首页 200
- [ ] 移动端真实点击过
- [ ] 所有 P0 有复现步骤
- [ ] GO 结论有证据支撑
- [ ] 修复项有复测记录

## 下游交接格式

```markdown
# 上线前 QA 验收交接摘要

## 当前结论
- 状态：[DONE] / [BLOCKED] / [NEEDS_REVIEW]
- 一句话结论：

## 关键输入
- 项目：
- 当前阶段：09-qa
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
- 下一阶段：上线运营或返修。
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
请加载 ShipSolo Skill：student-site-qa-acceptance，按我的项目资料执行。
```

## 常见坑

- 用 DOM 存在代替真实点击
- 忽略移动端触控和横向滚动
- 把 preview 域名 sitemap 指向生产误判为 P0
- 没有测试账号却假装会员流程通过

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

# 上线前 QA 验收 使用说明

## 先说结论

这份 Skill 的主路径不是让你运行脚本，而是让你把“一键启动 Prompt”复制给 AI。脚本只是可选辅助，用来检查交接是否完整。

## 开始前先准备

这一版新增 Preflight。先确认缺什么，再让 AI 执行，避免跑到一半才发现没权限。

- 账号/后台：测试账号/会员账号/管理员账号（按功能需要）
- 环境变量 / Token：无硬性账号要求
- 浏览器登录态：已登录测试账号、移动端或浏览器自动化会话
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
请按 ShipSolo 学员版 Skill「上线前 QA 验收」执行。
项目：[填写项目]
当前阶段：09-qa
上游输入：[粘贴已有资料]
限制条件：[填写]
请先执行 Preflight 和输入契约检查；缺账号、Token、浏览器登录态或关键资料时输出 [BLOCKED: SETUP_REQUIRED] / [BLOCKED]，不要猜。再输出交付物、验收清单自检、下游交接摘要。最后一行只能是 [DONE] / [BLOCKED] / [NEEDS_REVIEW]。
```

## 最小作业模板

```markdown
# 我的项目资料
- 项目名：
- 目标市场：
- 当前阶段：09-qa
- 已有资料：
- 缺失资料：
- 不能做什么：
- 我希望 AI 交付：
```

## 怎么判断 AI 输出能不能用

- [ ] 不是只测首页 200
- [ ] 移动端真实点击过
- [ ] 所有 P0 有复现步骤
- [ ] GO 结论有证据支撑
- [ ] 修复项有复测记录

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

## references/qa-severity-rubric.md

# 上线前 QA 验收 — 内部能力脱敏参考

## 阶段核心能力

功能、UI、9 断点、性能、安全、埋点、SEO、Go/No-Go

## 执行顺序

1. 先读上游交接摘要，确认输入是否满足契约。
2. 缺关键输入时输出 `[BLOCKED]`，不要编造数据或替用户做高风险决策。
3. 可推进时按 `SKILL.md` 的 Phase 顺序执行，所有依据写来源或标 `[待确认]`。
4. 完成后用模板生成交付物，再运行脚本做最小校验。
5. 最后一段写下游交接摘要，状态只能是 `[DONE] / [BLOCKED] / [NEEDS_REVIEW]`。

## 质量门槛

- [ ] 无 P0/P1 才能上线
- [ ] 9 断点无横向滚动
- [ ] Lighthouse 有记录
- [ ] 核心链路真实跑过

## 脱敏边界

- 可以保留流程、字段、判断标准、模板、脚本骨架。
- 不保留真实 API Key、Cookie、Token、内部路径、生产库名、群聊 ID、真实客户数据。
- 公开示例统一用 `[PROJECT]`、`[DOMAIN]`、`[API_KEY]`、`[ACCOUNT]` 这类占位符。



---

## references/stage-rubric.md

# 上线前 QA 验收 阶段判断规则

## 本阶段目标

用真实用户任务做最终验收，输出 GO/NO-GO、P0/P1/P2、证据和返修闭环。

## 必须保留的内部流程精华（已脱敏）

### 1. 准入检查
确认 PM/SEO/合规必要 gate；没有就标风险，不盲目 GO。

### 2. 5 秒测试
首屏能否说清 What/Who/Why/CTA，核心价值是否先出现。

### 3. 真实任务
按用户任务点击，不只看页面存在；工具、地图、目录、会员、内容、后台按站点类型测。

### 4. 技术 smoke
HTTP 200/301、HTTPS、robots、sitemap、canonical、H1、metadata、schema、链接、移动端。

### 5. 权限和数据
登录/会员/支付/订单/上传/API 错误态按真实路径测；无权限时明确 BLOCKED。

### 6. 分级结论
P0 阻断上线；P1 修复后可复测；P2 可上线后跟进。

### 7. 返修闭环
修复完成后必须独立 Re-QA，不能由实现者自证。


## 质量门槛

- [ ] 不是只测首页 200
- [ ] 移动端真实点击过
- [ ] 所有 P0 有复现步骤
- [ ] GO 结论有证据支撑
- [ ] 修复项有复测记录

## 常见失败模式

- 用 DOM 存在代替真实点击
- 忽略移动端触控和横向滚动
- 把 preview 域名 sitemap 指向生产误判为 P0
- 没有测试账号却假装会员流程通过

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。



---

## requirements.json

{
  "id": "student-site-qa-acceptance",
  "difficulty": "medium",
  "accounts": [
    "测试账号/会员账号/管理员账号（按功能需要）"
  ],
  "env": [],
  "browserSessions": [
    "已登录测试账号",
    "移动端或浏览器自动化会话"
  ],
  "blockingRules": [
    "无登录态只能测公开页，不能给全站 QA_GO",
    "无生产/预览 URL：BLOCKED"
  ],
  "canContinueWithout": [
    "可做公开页、移动端、SEO 基础检查，并列出未测范围"
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

## scripts/smoke_test.py

#!/usr/bin/env python3
"""上线前 QA 验收 最小校验脚本。用法：python scripts/smoke_test.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['无 P0/P1 才能上线', '9 断点无横向滚动', 'Lighthouse 有记录', '核心链路真实跑过']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 上线前 QA 验收 report basic structure passed')
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

## templates/qa-acceptance-report.md

# 上线前 QA 验收 — 标准交付物模板

## 1. 基本信息

- 项目：`[PROJECT]`
- 域名/候选域名：`[DOMAIN]`
- 当前阶段：`09-qa`
- 执行人/Agent：`motest`
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

- [ ] 无 P0/P1 才能上线
- [ ] 9 断点无横向滚动
- [ ] Lighthouse 有记录
- [ ] 核心链路真实跑过

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

