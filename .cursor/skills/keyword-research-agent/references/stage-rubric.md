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
