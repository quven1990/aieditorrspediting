# QA acceptance — phase 1 static MVP

Per `student-site-qa-acceptance` skill (simplified).

## P0 (must pass before public launch)

- [ ] All routes return 200 on production HTTPS
- [ ] No broken internal links (footer, hub, prompt cards)
- [ ] Disclaimer visible on home + prompt pages
- [ ] No APK / mod / “official RSP” claims
- [ ] sitemap.xml lists all prompt slugs
- [ ] Mobile readable (375px width)

## P1 (first week)

- [ ] GA4 realtime shows visits
- [ ] GSC sitemap status OK
- [ ] Open Graph title/description sane (share preview)
- [ ] Lighthouse performance > 80 on home

## P2 (ongoing)

- [ ] Add 2 new prompts/week per maintenance budget
- [ ] Fix queries with impressions but low CTR (GSC)

## Verdict

| Environment | GO/NO-GO | Notes |
|-------------|----------|-------|
| Local `npm run dev` | — | Run after build |
| Production | PENDING | DNS not configured |
