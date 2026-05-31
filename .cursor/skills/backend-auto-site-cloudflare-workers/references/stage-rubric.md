# Cloudflare 后端与会员系统 阶段判断规则

## 本阶段目标

用 Cloudflare Workers/D1/R2/Auth/API 支撑小站：登录、会员、内容、订单、资产和前端可消费数据合同。

## 必须保留的内部流程精华（已脱敏）

### 1. 架构确认
优先 Cloudflare 全栈：Pages/Workers、D1、R2、KV/Queues（按需）、Google/Auth、Webhook。

### 2. 数据合同
给前端 machine-readable schema/seed/manifest，不只写 Markdown；区分 fixture、launch_data、seo_index。

### 3. API 合约
列 endpoint、method、auth、request/response、错误码、rate limit、权限。

### 4. 迁移与 seed
D1 migrations 可重复执行；R2 bucket/公开访问/签名 URL 明确；seed 数据有来源和 checksum。

### 5. 权限与开通
会员 entitlement、离线订单、人工开通、管理员操作日志都要可验。

### 6. 安全与合规
secret 只放环境变量；不打印 token；用户上传/日志/删除策略与 Privacy 一致。

### 7. 联调
前端用真实 API 或明确 fixture，不得把 mock 当生产。


## 质量门槛

- [ ] 前端拿到机器可读数据合同
- [ ] 生产 secrets 没进代码
- [ ] auth/权限/错误态可测
- [ ] 远端 migration 和本地 schema 对齐
- [ ] 合规披露和实际数据流一致

## 常见失败模式

- 只有后端说明，没有 schema/API 文件
- 在日志或文档里暴露 token
- confirmed 数据不足还让前端当真实上线
- 管理员开通没有审计记录

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。
