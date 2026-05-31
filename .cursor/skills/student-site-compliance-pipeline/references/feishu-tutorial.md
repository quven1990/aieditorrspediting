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
