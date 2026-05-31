# Project Control Board — 自动做站工厂

## 1. 项目启动卡

- 项目：`[PROJECT]`
- 域名：`[DOMAIN]`
- 目标市场：`[MARKET]`
- 种子词：`[KEYWORDS]`
- 项目类型：`[TOOL / DIRECTORY / CONTENT / CALCULATOR / DATA / HYBRID]`
- 商业化：`[FREE / ADS / SUBSCRIPTION / LEAD / TBD]`
- 上线期望：`[NORMAL / SAME_DAY / DATE]`
- 状态：`[STARTED / BLOCKED_SETUP / RUNNING / QA_REPAIR / LAUNCH_READY / LIVE / REVIEWING]`

## 2. 学员只需要处理

- [ ] 域名已注册
- [ ] DNS / Cloudflare 权限可用
- [ ] GitHub 权限可用
- [ ] GSC / Bing 权限可用
- [ ] Stitch / 设计工具登录态可用
- [ ] 生产部署已确认
- [ ] 公开发布已确认

## 3. 自动流水线状态

| 阶段 | Skill | Owner | 状态 | 输入 | 输出 | 闸门 |
|---|---|---|---|---|---|---|
| 01 research | keyword-research-agent | motan | READY | seed keywords | keyword-report | Research Gate |
| 02 PRD | product-definition-prd | moce | WAITING | keyword-report | PRD + route contract | PRD Gate |
| 03 pricing | site-pricing-calibration | mozhang | WAITING | PRD | pricing strategy | Pricing Gate |
| 04 compliance | student-site-compliance-pipeline | modun | WAITING | PRD + pricing | compliance report | Compliance Gate |
| 05 copy | site-copywriting-student | mobi | WAITING | PRD + compliance | SEO-copy freeze | Copy Freeze |
| 06 design | site-design-student | moying | WAITING | copy freeze | design source | Design Gate |
| 08 backend/data | backend-auto-site-cloudflare-workers | moshu | WAITING | PRD + data needs | data contract/API | Data Gate |
| 07 frontend | frontend-site-automation | mojie | WAITING | design + data | deployed preview | Build Gate |
| 10 SEO | seo-launch-workflow | moyin | WAITING | preview | SEO_GO | SEO Gate |
| 09 QA | student-site-qa-acceptance | motest | WAITING | preview + gates | QA report | QA_GO |
| 11 launch | site-ops-growth-launch | moyun | WAITING | QA_GO | launch report | Launch Gate |
| 12 review | site-data-review-iteration | moxi | WAITING | live site + analytics | review report | Review Gate |

## 4. 当前汇报

### done
- 

### running
- 

### waiting
- 

### blocked
- 

## 5. 卡点处理

- 类型：`[domain / DNS / login / API key / payment / decision / public publishing]`
- 学员动作：
- 做完后回复：
- 自动继续阶段：

## 6. 下一步自动动作

- 
