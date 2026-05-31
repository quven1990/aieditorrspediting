# 前端实现与页面落地 阶段判断规则

## 本阶段目标

把设计真源落成可访问前端：路由、页面、交互、SEO、分析埋点、Cloudflare 部署和源码同步。

## 必须保留的内部流程精华（已脱敏）

### 1. 开工检查
确认 git remote、package scripts、设计真源、route contract、法律页、SEO 文案和后端合同。

### 2. 高保真转换
优先迁移 HTML/CSS 变量、字体、图标、布局；先静态还原再组件化和加交互。

### 3. 路由与 SEO
实现 sitemap/robots/metadata/canonical/schema；内部链接不得 #/404；noindex 页面不进 sitemap。

### 4. 交互落地
按站点类型实现真实任务：工具输入结果、目录筛选、地图 marker、详情页、登录/付费态等。

### 5. 分析闭环
至少一个线上 pageview/核心事件真实上报；无法配置 GA4 等就写明 fallback 和 Privacy。

### 6. 构建部署
lint/build/test → conventional commit → push → 同一 commit 部署 → smoke test → clean status。

### 7. 返修闭环
QA/SEO/PM NO-GO 后只修代码不算 GO，必须再派复核。


## 质量门槛

- [ ] 线上部署来自同一 commit
- [ ] 核心页面 200，内部链接无 #/404
- [ ] 移动端无横向滚动且触控可用
- [ ] 设计还原度达标
- [ ] Crawler Hints/HTTPS/canonical 等上线闸门明确

## 常见失败模式

- 看图重写导致设计失真
- 只部署不提交/不 push
- 把 prototype/placeholder 放进 sitemap
- 用 mock 数据解锁主线但没有标 noindex

## 脱敏原则

- 不写服务器路径、真实 token、私有账号、内部群聊或生产数据库细节。
- 保留判断标准、交接格式、质量闸门和复盘口径。
- 对学员可执行：先自然语言 Prompt，脚本只是可选。
