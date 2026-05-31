# 全流程主持台 更新记录

## 2.4.0 — 2026-05-27

- 将学员主路径改为“自动做站工厂”：学员提交关键词 + 域名 + 权限，总控自动建 Kanban/DAG、派工、验收、返修、上线和复盘。
- 明确手动复制 Prompt 只是无自动化环境时的 fallback，不再作为主教学路径。
- 新增学员进度汇报格式：当前进度、已有产物、卡点、风险、下一步自动动作。
- 补充“能否复刻内部工作流”的边界：Skills 是能力合同，完整复刻还需要 Kanban、Agent/Profile、浏览器登录态和部署权限。

## 2.3.0 — 2026-05-27

- 强化“工作台/主持台”定位：专业 Skill 负责干活，工作台负责统筹、派工、验收、接棒。
- 新增项目控制板、标准 DAG、前置检查、下一棒 Prompt、BLOCKED 处理表、上线闭环字段。
- 明确 `market-research-opportunity` 是可选增强，核心 13 阶段从 `keyword-research-agent` 开始，降低学员对 13/14 个 Skill 的困惑。

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
