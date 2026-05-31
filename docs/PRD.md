# PRD: AI Editor RSP Editing Hub

**Project slug:** `aieditorrspediting`  
**Domain:** `aieditorrspediting.xyz`  
**Market:** US / English  
**Type:** Content hub (prompt recipes + guides)  
**Phase 1:** Static site, zero backend, free, no account  

## Positioning

Unofficial English resource hub for **RSP-style AI photo prompts**, template recipes, and safer editing workflows—not affiliated with RSP Editing, CapCut, VN, Adobe, or ByteDance.

**Competitor:** aieditorrspediting.com (same niche; differentiate via dated trend notes, mistake sections, and clearer FAQ/schema.)

## ICP (primary)

Mobile creators (Instagram Reels, TikTok, YouTube Shorts) who want copy-paste AI portrait prompts without risky downloads.

## NOT-DO (phase 1)

- No hosted template/APK/mod files  
- No “official RSP” claims  
- No login, payment, or backend  
- No scraped verbatim pages from competitors  

## Page matrix (MVP)

| URL | Index | Primary keyword | Purpose |
|-----|-------|-----------------|---------|
| `/` | yes | ai editor rsp editing | Hub + disclaimers |
| `/what-is-rsp-editing/` | yes | what is rsp editing ai | Pillar explainer |
| `/prompts/` | yes | rsp editing ai prompts | Listing |
| `/prompts/*` | yes | long-tail | 10 prompt guides |
| `/safe-use/` | yes | — | Safety / rights |
| `/privacy/` | yes | — | Privacy policy |
| `/terms/` | yes | — | Terms |

## Route contract

- Trailing slash: consistent via Next config  
- Canonical base: `https://aieditorrspediting.xyz`  
- Internal links: Home → Prompts → pillar → long-tail; footer legal  

## Gates

| Stage | Status | Note |
|-------|--------|------|
| Research | DONE | Keyword sheet from user |
| PRD | DONE | This doc |
| Pricing | SKIP | Free launch |
| Compliance | DONE | privacy/terms/safe-use |
| Copy | DONE | In `content/prompts/*.json` |
| Design | DONE | Tailwind system in repo |
| Backend | SKIP | Static only |
| Frontend | IN PROGRESS | Next static export |
| SEO | DONE | metadata + sitemap |
| QA | PENDING | User DNS + deploy |
| Ops launch | BLOCKED | After QA GO |
| Data review | BLOCKED | After GSC live |

## [DONE] PRD v1
