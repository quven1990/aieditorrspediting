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
