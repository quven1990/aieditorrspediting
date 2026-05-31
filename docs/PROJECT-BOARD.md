# Kanban — aieditorrspediting.xyz

| Stage | Skill | Owner | Status |
|-------|-------|-------|--------|
| 01 Research | keyword-research-agent | — | DONE |
| 02 PRD | product-definition-prd | — | DONE |
| 03 Pricing | site-pricing-calibration | — | SKIP (free) |
| 04 Compliance | student-site-compliance-pipeline | — | DONE |
| 05 Copy | site-copywriting-student | — | DONE |
| 06 Design | site-design-student | — | DONE (in-code) |
| 07 Frontend | frontend-site-automation | — | DONE |
| 08 Backend | backend-auto-site-cloudflare-workers | — | SKIP |
| 09 QA | student-site-qa-acceptance | — | PENDING |
| 10 SEO | seo-launch-workflow | — | DONE (code) |
| 11 Ops | site-ops-growth-launch | — | setup_required |
| 12 Data | site-data-review-iteration | — | setup_required |
| 13 Orchestrator | site-orchestrator-playbook | — | ACTIVE |

## setup_required (you)

- [ ] Cloudflare account + add zone `aieditorrspediting.xyz`
- [ ] NS → Cloudflare; Pages project connected to this repo
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Pages env (when ready)
- [ ] Google Search Console property + sitemap submit

## Next auto actions

1. Run `npm run build` locally  
2. Deploy to Cloudflare Pages  
3. Post-deploy: QA smoke + GSC  

**[STARTED]** — `npm run build` OK → `out/`; deploy blocked on DNS only.
