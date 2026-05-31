#!/usr/bin/env python3
"""
Google Keywords Website API client.

Single entry point: submit expand job → poll status → get full results
(including AI filter, SERP competition, trends comparison).

All heavy lifting is server-side. This script submits the job,
polls until complete, then returns the final data.
"""
import os
import sys
import json
import time
import argparse
from pathlib import Path
import requests
from typing import List, Dict, Optional

# Website config
GK_SITE_URL = os.environ.get('GK_SITE_URL', 'https://www.discoverkeywords.co')
GK_API_KEY = os.environ.get('GK_API_KEY', '')
DEFAULT_BENCHMARK = os.environ.get('GK_BENCHMARK', 'gpts')
RECOMMENDED_COMPARE_LIMIT = int(os.environ.get('GK_RECOMMENDED_COMPARE_LIMIT', '50'))
RECOMMENDED_MIN_SCORE = int(os.environ.get('GK_RECOMMENDED_MIN_SCORE', '20'))
RECOMMENDED_HIGH_CONFIDENCE_SCORE = int(os.environ.get('GK_RECOMMENDED_HIGH_CONFIDENCE_SCORE', '60'))
RECOMMENDED_SECTION_QUOTAS = {
    'explosive': int(os.environ.get('GK_RECOMMENDED_EXPLOSIVE_QUOTA', '22')),
    'fastRising': int(os.environ.get('GK_RECOMMENDED_FAST_RISING_QUOTA', '16')),
    'steadyRising': int(os.environ.get('GK_RECOMMENDED_STEADY_RISING_QUOTA', '12')),
}
FALLBACK_DEFAULT_SEEDS = [
    "calculator", "generator", "converter", "maker", "creator",
    "editor", "builder", "designer", "simulator", "translator",
]
shared_defaults_env = os.environ.get('GK_SHARED_DEFAULTS_PATH', '').strip()
SHARED_DEFAULTS_PATH = Path(shared_defaults_env) if shared_defaults_env else None

DEFAULT_SEEDS = FALLBACK_DEFAULT_SEEDS[:]

try:
    if SHARED_DEFAULTS_PATH and SHARED_DEFAULTS_PATH.exists():
        shared_defaults = json.loads(SHARED_DEFAULTS_PATH.read_text())
        keywords = shared_defaults.get('defaultKeywords', [])
        if isinstance(keywords, list):
            parsed = [item.strip() for item in keywords if isinstance(item, str) and item.strip()]
            if parsed:
                DEFAULT_SEEDS = parsed
except Exception:
    DEFAULT_SEEDS = FALLBACK_DEFAULT_SEEDS[:]

raw_default_seeds = os.environ.get('GK_DEFAULT_SEEDS', '').strip()
if raw_default_seeds:
    DEFAULT_SEEDS = [item.strip() for item in raw_default_seeds.split(',') if item.strip()]

def _headers():
    return {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {GK_API_KEY}',
        'Accept': 'application/json',
        'User-Agent': 'curl/8.5.0',
    }

def _api_call(method: str, path: str, body: dict = None, timeout: int = 30) -> Dict:
    url = f'{GK_SITE_URL}{path}'
    resp = requests.request(method, url, headers=_headers(), json=body, timeout=timeout)
    resp.raise_for_status()
    return resp.json()

def _detect_role(api_key: str) -> str:
    """Detect if an API key belongs to student or admin."""
    if not api_key:
        return 'unknown'
    try:
        resp = requests.get(f'{GK_SITE_URL}/api/me', headers={'Authorization': f'Bearer {api_key}'}, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            return data.get('role', 'student')
    except:
        pass
    return 'unknown'


def fetch_game_keywords(api_key: str = None) -> List[Dict]:
    """Fetch recommended game keywords.
    
    api_key=None  → use admin key + admin endpoint (all keywords)
    api_key=str   → use provided key + student endpoint (3 per-user)
    """
    key = api_key or GK_API_KEY
    headers = {'Authorization': f'Bearer {key}'}
    
    # Explicit provided key: prefer student-safe endpoint first.
    if api_key:
        try:
            resp = requests.get(f'{GK_SITE_URL}/api/game-keywords', headers=headers, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                items = data.get('keywords', [])
                if items:
                    print(f"  🎮 Found {len(items)} personalized game keywords", file=sys.stderr)
                return items
            if resp.status_code not in (401, 403):
                print(f"  ⚠️ /api/game-keywords returned {resp.status_code}, trying admin path", file=sys.stderr)
        except Exception as e:
            print(f"  ⚠️ Student-safe game keywords failed: {e}", file=sys.stderr)

        # If caller explicitly passed a non-admin key, never hard-fail by falling back to admin.
        if api_key != GK_API_KEY:
            return []

    # Admin key → admin endpoint (all keywords)
    try:
        data = _api_call('GET', '/api/admin/game-keywords?filter=recommended&pageSize=20', timeout=15)
        items = data.get('items') or []
        if items:
            print(f"  🎮 Found {len(items)} recommended game keywords (admin)", file=sys.stderr)
        return items
    except Exception as e:
        print(f"  ⚠️ Game keywords fetch failed: {e}", file=sys.stderr)
        return []

# ── Expand (submit + poll) ──

def expand(keywords: List[str], use_cache: bool = True) -> Dict:
    """POST /api/research/expand. Returns a pending job envelope."""
    return _api_call('POST', '/api/research/expand', {
        'keywords': keywords,
        'useCache': use_cache,
    }, timeout=30)

def poll_expand_status(job_id: str, max_wait: int = 300) -> Dict:
    """Poll /api/research/expand/status until complete."""
    for i in range(max_wait // 10):
        data = _api_call('GET', f'/api/research/expand/status?jobId={job_id}', timeout=15)
        status = data.get('status', '')
        if status == 'complete':
            return data
        elif status == 'failed':
            raise Exception(f"Job failed: {data.get('error')}")
        if i % 3 == 0:
            print(f"  ⏳ Job {job_id}: {status}... ({i*10}s)", file=sys.stderr)
        time.sleep(10)
    raise Exception(f"Job {job_id} timed out after {max_wait}s")

def compare(keywords: List[str], date_from: str, date_to: str, benchmark: str = DEFAULT_BENCHMARK, api_key: str = None) -> Dict:
    """POST /api/research/compare. Ordinary API-key users should hit shared cache."""
    if api_key:
        url = f'{GK_SITE_URL}/api/research/compare'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}',
            'Accept': 'application/json',
            'User-Agent': 'curl/8.5.0',
        }
        resp = requests.post(url, headers=headers, json={
            'keywords': keywords,
            'dateFrom': date_from,
            'dateTo': date_to,
            'benchmark': benchmark,
            'minRuleScore': RECOMMENDED_MIN_SCORE,
        }, timeout=60)
        resp.raise_for_status()
        return resp.json()

    return _api_call('POST', '/api/research/compare', {
        'keywords': keywords,
        'dateFrom': date_from,
        'dateTo': date_to,
        'benchmark': benchmark,
        'minRuleScore': RECOMMENDED_MIN_SCORE,
    }, timeout=60)

def poll_compare_status(job_id: str, max_wait: int = 600) -> Dict:
    """Poll /api/research/compare/status until complete."""
    for i in range(max_wait // 10):
        data = _api_call('GET', f'/api/research/compare/status?jobId={job_id}', timeout=30)
        status = data.get('status', '')
        if status == 'complete':
            return data
        elif status == 'failed':
            raise Exception(f"Compare job failed: {data.get('error')}")
        if i % 3 == 0:
            ready = data.get('ready')
            total = data.get('total')
            print(f"  ⏳ Compare job {job_id}: {status} {ready}/{total}... ({i*10}s)", file=sys.stderr)
        time.sleep(10)
    raise Exception(f"Compare job {job_id} timed out after {max_wait}s")

def get_expanded_keywords(keywords: List[str], use_cache: bool = True) -> Dict:
    """
    Full flow: submit expand job → poll status → return complete results.
    Server-side pipeline: DataForSEO → rule engine → AI filter → SERP → trends.
    """
    if not GK_API_KEY:
        raise Exception("GK_API_KEY env var required.")

    print(f"📡 Calling expand API with {len(keywords)} seed keywords...", file=sys.stderr)
    result = expand(keywords, use_cache)

    job_id = result.get('jobId')
    if job_id:
        if result.get('fromCache'):
            print(f"  ♻️  Reusing cached job: {job_id}, polling...", file=sys.stderr)
        else:
            print(f"  📋 Job submitted: {job_id}, polling...", file=sys.stderr)
        data = poll_expand_status(job_id)
        flat = data.get('flatList', [])
        print(f"  ✅ Got {len(flat)} expanded keywords", file=sys.stderr)
        return data

    if result.get('status') == 'complete':
        flat = result.get('flatList', [])
        print(f"  ✅ Got {len(flat)} expanded keywords", file=sys.stderr)
        return result

    return result

# ── Helpers ──

def extract_keyword_names(results: List[Dict]) -> List[str]:
    return [item.get('keyword', '') for item in results if item.get('keyword')]

def _freshness_label(item: Dict) -> str:
    freshness = item.get('freshness') or {}
    label = freshness.get('label') or freshness.get('status') or '-'
    window = freshness.get('window')
    return f"{label}({window})" if window and window != 'none' else label

def _intent_summary(item: Dict) -> str:
    intent = item.get('intent') or {}
    demand = intent.get('demand') or ''
    label = intent.get('label') or ''
    if demand and label:
        return f"{label}: {demand}"
    return demand or label or '-'

def _why_item(item: Dict) -> str:
    freshness = item.get('freshness') or {}
    parts = []
    if freshness.get('reason'):
        parts.append(str(freshness['reason']))
    if item.get('ratio') is not None:
        parts.append(f"趋势强度 {item.get('ratio')}x")
    if item.get('verdict'):
        parts.append(f"判定 {item.get('verdict')}")
    return '；'.join(parts) or '-'

def _entry_direction(item: Dict) -> str:
    keyword = (item.get('keyword') or '').lower()
    intent = item.get('intent') or {}
    demand = intent.get('demand') or ''
    if any(token in keyword for token in ['generator', 'creator', 'maker']):
        return '做轻量生成器，突出模板、批量生成、可下载结果。'
    if any(token in keyword for token in ['editor', 'enhancer', 'upscaler', 'remover']):
        return '做在线编辑/增强工具，突出上传即用、前后对比、无需注册。'
    if any(token in keyword for token in ['checker', 'detector', 'verifier']):
        return '做检测/校验工具，突出快速判断、解释原因、给修复建议。'
    if any(token in keyword for token in ['calculator', 'planner', 'tracker']):
        return '做交互式计算/规划工具，突出表单输入、结果解释、可保存分享。'
    if demand:
        return f"围绕用户需求切入：{demand}"
    return '先做单页工具 MVP，验证搜索意图和转化。'

def format_game_keywords_section(game_keywords: List[Dict]) -> str:
    """Format game keywords into a human-readable Markdown section."""
    if not game_keywords:
        return ""
    lines = ["\n---\n## 🎮 游戏关键词推荐\n"]
    for g in game_keywords:
        rec = g.get('recommendation', '')
        kw = g.get('keyword', '')
        reason = g.get('reason', '')
        source = g.get('source', '')
        lines.append(f"**{rec} {kw}** (来源: {source})")
        if reason:
            lines.append(f"  - {reason}")
        lines.append("")
    return "\n".join(lines)

def render_report(result: Dict, max_items: int = 10) -> str:
    opportunities = result.get('opportunities') or []
    stable_old = result.get('stableOld') or []
    compare_results = (result.get('compare') or {}).get('results') or []
    watch_items = [
        item for item in compare_results
        if item not in opportunities
        and item.get('verdict') in ('close', 'watch')
        and (item.get('freshness') or {}).get('status') != 'stable_old'
    ]
    rejected = [
        item for item in compare_results
        if item.get('verdict') == 'fail'
        or (item.get('freshness') or {}).get('status') == 'stable_old'
    ]

    verdict = (
        f"本轮发现 {len(opportunities)} 个近期可做机会词。"
        if opportunities
        else "本轮没有发现足够明确的近期可做新词，建议等待下一轮缓存或扩大词根。"
    )
    lines = [
        "# 一句话总判断",
        verdict,
        "",
        "## 值得继续",
        "| 关键词 | 趋势 | 新鲜度 | 用户意图 | 为什么 | 切入方向 |",
        "|---|---:|---|---|---|---|",
    ]

    if opportunities:
        for item in opportunities[:max_items]:
            lines.append(
                "| {keyword} | {ratio}x / {verdict} | {freshness} | {intent} | {why} | {direction} |".format(
                    keyword=item.get('keyword', '-'),
                    ratio=item.get('ratio', '-'),
                    verdict=item.get('verdict', '-'),
                    freshness=_freshness_label(item),
                    intent=_intent_summary(item).replace('|', '/'),
                    why=_why_item(item).replace('|', '/'),
                    direction=_entry_direction(item).replace('|', '/'),
                )
            )
    else:
        lines.append("| - | - | - | - | 暂无 | - |")

    lines.extend([
        "",
        "## 可观察",
        "| 关键词 | 趋势 | 新鲜度 | 为什么观察 | 跟踪什么 |",
        "|---|---:|---|---|---|",
    ])
    observable = watch_items[:max_items]
    if observable:
        for item in observable:
            lines.append(
                "| {keyword} | {ratio}x / {verdict} | {freshness} | {why} | 观察下一轮是否进入 new/old_hot，且 verdict 是否提升。 |".format(
                    keyword=item.get('keyword', '-'),
                    ratio=item.get('ratio', '-'),
                    verdict=item.get('verdict', '-'),
                    freshness=_freshness_label(item),
                    why=_why_item(item).replace('|', '/'),
                )
            )
    else:
        lines.append("| - | - | - | 暂无 | - |")

    lines.extend([
        "",
        "## 不值得做",
        "| 关键词 | 为什么 |",
        "|---|---|",
    ])
    if rejected:
        for item in rejected[:max_items]:
            reason = '稳定老词，不作为近期新词机会。' if (item.get('freshness') or {}).get('status') == 'stable_old' else '趋势判定 fail。'
            lines.append(f"| {item.get('keyword', '-')} | {reason} |")
    else:
        lines.append("| - | 暂无 |")

    lines.extend([
        "",
        "## 下一步建议",
        "1. 优先人工复核“值得继续”里的关键词搜索意图和落地页形态。",
        "2. 不要把 stable_old 当作新词机会，除非有明确差异化产品方案。",
        "3. 下一轮每日缓存更新后，重点观察 old_hot/new 是否持续出现。",
    ])
    # Append game keywords section
    game_keywords = result.get('gameKeywords') or []
    if game_keywords:
        lines.append(format_game_keywords_section(game_keywords))
    # Append old-keywords section if provided
    old_kws = result.get('oldKeywords') or []
    if old_kws:
        lines.append('')
        lines.append(render_old_keywords_report(old_kws))
    return '\n'.join(lines)

def sanitize_for_learner(value):
    """Remove platform/internal transport details from learner-facing output."""
    hidden_keys = {
        'fromCache',
        'cacheFallback',
        'jobId',
        'strategy',
        'sessionId',
        'comparisonId',
        'intentRefreshed',
    }
    if isinstance(value, dict):
        return {
            key: sanitize_for_learner(item)
            for key, item in value.items()
            if key not in hidden_keys
        }
    if isinstance(value, list):
        return [sanitize_for_learner(item) for item in value]
    return value

def _candidate_score(item: Dict) -> float:
    try:
        return float(item.get('score') or 0)
    except (TypeError, ValueError):
        return 0

def build_recommended_selection(expand_data: Dict, limit: int = RECOMMENDED_COMPARE_LIMIT, user_id: str = None) -> List[str]:
    """Mirror the web app recommended compare selection.
    
    If user_id is provided, return a deterministic subset (~2 keywords) for personalization.
    """
    organized = expand_data.get('organized') or {}
    flat_list = expand_data.get('flatList') or expand_data.get('candidates') or []
    picked: List[str] = []
    picked_set = set()

    def add_keyword(item: Dict) -> bool:
        keyword = item.get('keyword') if isinstance(item, dict) else None
        if not keyword or keyword in picked_set:
            return False
        if _candidate_score(item) < RECOMMENDED_MIN_SCORE:
            return False
        picked.append(keyword)
        picked_set.add(keyword)
        return True

    def add_candidates(items: List[Dict], max_count: int) -> None:
        added = 0
        for item in items or []:
            if len(picked) >= limit or added >= max_count:
                break
            if add_keyword(item):
                added += 1

    strong = [
        item for item in flat_list
        if isinstance(item, dict) and _candidate_score(item) >= RECOMMENDED_HIGH_CONFIDENCE_SCORE
    ]
    for item in strong:
        if len(picked) >= limit:
            break
        add_keyword(item)

    add_candidates(organized.get('explosive') or [], RECOMMENDED_SECTION_QUOTAS['explosive'])
    add_candidates(organized.get('fastRising') or [], RECOMMENDED_SECTION_QUOTAS['fastRising'])
    add_candidates(organized.get('steadyRising') or [], RECOMMENDED_SECTION_QUOTAS['steadyRising'])

    if len(picked) < limit:
        slow_ids = {
            id(item) for item in organized.get('slowRising') or []
            if isinstance(item, dict)
        }
        non_slow = [item for item in flat_list if id(item) not in slow_ids]
        add_candidates(non_slow, limit)

    # Keep a broad recommended pool for compare. Student personalization should
    # happen at the final display layer, not by shrinking the candidate pool here.
    return picked[:limit]

def get_complete_keyword_research(
    keywords: List[str],
    use_cache: bool = True,
    benchmark: str = DEFAULT_BENCHMARK,
    student_api_key: str = None,
) -> Dict:
    """Expand from shared cache, then compare against benchmark from shared cache."""
    student_mode = bool(student_api_key and student_api_key != GK_API_KEY)

    # Students must never create new upstream jobs. They always consume the
    # shared precomputed cache keyed by DEFAULT_SEEDS.
    effective_keywords = DEFAULT_SEEDS if student_mode else keywords
    if student_mode:
        print("📚 Student mode: using shared precomputed expand cache", file=sys.stderr)

    expand_data = get_expanded_keywords(effective_keywords, use_cache=use_cache)
    
    if student_mode:
        # Student mode consumes shared compare cache directly. Do not build a
        # per-request compare keyword set, and never create a new compare job.
        selected = []
        print("📊 Student mode: using shared compare cache", file=sys.stderr)
        compare_data = compare(
            [],
            expand_data.get('dateFrom', ''),
            expand_data.get('dateTo', ''),
            benchmark=benchmark,
            api_key=student_api_key,
        )
    else:
        selected = build_recommended_selection(expand_data)
        if not selected:
            return {
                'status': 'complete',
                'expand': expand_data,
                'compare': None,
                'selectedKeywords': [],
                'opportunities': [],
            }

        print(f"📊 Calling compare API with {len(selected)} recommended keywords...", file=sys.stderr)
        compare_data = compare(
            selected,
            expand_data.get('dateFrom', ''),
            expand_data.get('dateTo', ''),
            benchmark=benchmark,
        )
    job_id = compare_data.get('jobId')
    if job_id:
        print(f"  📋 Compare job: {job_id}, polling...", file=sys.stderr)
        compare_data = poll_compare_status(job_id)

    results = compare_data.get('results') or []
    opportunities = [
        item for item in results
        if item.get('verdict') in ('strong', 'pass', 'close', 'watch')
        and (item.get('freshness') or {}).get('status') in ('new', 'old_hot')
    ]
    stable_old = [
        item for item in results
        if (item.get('freshness') or {}).get('status') == 'stable_old'
    ]

    # Fetch game keywords - use student endpoint if student key provided
    recommended_games = fetch_game_keywords(api_key=student_api_key)
    # Filter out skip items
    recommended_games = [g for g in recommended_games if g.get('recommendation') and 'skip' not in g.get('recommendation', '').lower()]

    print(
        f"  ✅ Compare results={len(results)} opportunities={len(opportunities)} stable_old={len(stable_old)} game_keywords={len(recommended_games)}",
        file=sys.stderr,
    )
    return {
        'status': 'complete',
        'benchmark': benchmark,
        'dateFrom': expand_data.get('dateFrom'),
        'dateTo': expand_data.get('dateTo'),
        'selectedKeywords': selected,
        'opportunities': opportunities,
        'stableOld': stable_old,
        'gameKeywords': recommended_games if recommended_games else None,
        'expand': expand_data,
        'compare': compare_data,
    }

def fetch_old_keywords(limit: int = 100, min_score: int = 0, personalized: bool = False) -> List[Dict]:
    """Fetch old-word (low-competition) keyword opportunities.
    
    personalized=True  → /api/old-keywords (3 keywords per user, zero billing)
    personalized=False → /api/admin/old-keywords (all keywords, admin only)
    """
    headers = {'Authorization': f'Bearer {GK_API_KEY}'}
    if personalized:
        resp = requests.get(f'{GK_SITE_URL}/api/old-keywords', headers=headers, timeout=30)
    else:
        params = {'limit': limit, 'minScore': min_score}
        resp = requests.get(f'{GK_SITE_URL}/api/admin/old-keywords', headers=headers, params=params, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    return data.get('keywords', [])


def render_old_keywords_report(keywords: List[Dict]) -> str:
    """Render old-word opportunities as Markdown report."""
    if not keywords:
        return "# \u8001\u8bcd\u673a\u4f1a\u62a5\u544a\n\n\u6682\u65e0\u6570\u636e\u3002\u7b49\u5f85\u540e\u53f0\u7ba1\u7ebf\u8fd0\u884c\u540e\u81ea\u52a8\u586b\u5145\u3002"
    lines = [
        "# \U0001f50d \u8001\u8bcd\u673a\u4f1a\u62a5\u544a",
        "",
        f"\u4ece\u5df2\u6709\u641c\u7d22\u91cf\u4e2d\u6316\u6398\u7684\u4f4e\u7ade\u4e89\u673a\u4f1a\u8bcd\uff08\u5171 {len(keywords)} \u4e2a\uff09",
        "",
        "| # | \u5173\u952e\u8bcd | \u6708\u641c\u7d22\u91cf | CPC | KD | \u7ade\u4e89 | \u8bc4\u5206 | \u610f\u56fe | \u6765\u6e90\u79cd\u5b50 |",
        "|---|--------|---------|-----|----|------|------|------|---------|",
    ]
    for idx, kw in enumerate(keywords[:30], start=1):
        lines.append(
            f"| {idx} | **{kw['keyword']}** | {kw.get('volume', 0):,} | "
            f"${kw.get('cpc', 0):.2f} | {kw.get('kd', 0)} | {kw.get('competition', '')} | "
            f"{kw.get('score', 0):,.0f} | {kw.get('intent', '')} | {kw.get('source_seed', '')} |"
        )
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description='Google Keywords Website API client')
    sub = parser.add_subparsers(dest='command', required=True)

    # research (recommended): expand cache + compare cache, returns opportunity keywords
    p_research = sub.add_parser('research', help='Complete keyword research from shared cache')
    p_research.add_argument('seeds', nargs='*', help='Seed keywords (optional; defaults to shared seeds)')
    p_research.add_argument('--no-cache', action='store_true')
    p_research.add_argument('--benchmark', default=DEFAULT_BENCHMARK)
    p_research.add_argument('--names-only', action='store_true')
    p_research.add_argument('--report', action='store_true', help='Output a learner-friendly Markdown report')
    p_research.add_argument('--raw', action='store_true', help='Output raw API-shaped data including internal fields')

    # expand (candidate discovery only)
    p_expand = sub.add_parser('expand', help='Expand seed keywords (candidate discovery only)')
    p_expand.add_argument('seeds', nargs='*', help='Seed keywords (optional; defaults to built-in seeds)')
    p_expand.add_argument('--no-cache', action='store_true')
    p_expand.add_argument('--names-only', action='store_true')

    # serp (kept for backward compat, but now part of expand pipeline)
    p_serp = sub.add_parser('serp', help='[DEPRECATED] Use expand instead')
    p_serp.add_argument('keywords', nargs='+')

    # trends (kept for backward compat, but now part of expand pipeline)
    p_trends = sub.add_parser('trends', help='[DEPRECATED] Use expand instead')
    p_trends.add_argument('keywords', nargs='+')

    # full (kept for backward compat, same as expand now)
    p_full = sub.add_parser('full', help='Expand + SERP + Trends (same as expand)')
    p_full.add_argument('seeds', nargs='*')

    # old-keywords: low-competition keyword opportunities
    p_old = sub.add_parser('old-keywords', help='Get personalized old-word recommendations')
    p_old.add_argument('--all', action='store_true', help='Show all keywords (admin only)')
    p_old.add_argument('--limit', type=int, default=100, help='Max keywords (admin --all mode)')
    p_old.add_argument('--min-score', type=int, default=0, help='Min score filter (admin --all mode)')
    p_old.add_argument('--report', action='store_true', help='Output Markdown report')
    p_old.add_argument('--names-only', action='store_true', help='Output keyword names only')

    args = parser.parse_args()

    if args.command == 'research':
        seeds = args.seeds or DEFAULT_SEEDS
        if not args.seeds:
            print(f"ℹ️  No seeds provided. Using {len(seeds)} default seeds.", file=sys.stderr)
        results = get_complete_keyword_research(
            seeds,
            use_cache=not getattr(args, 'no_cache', False),
            benchmark=getattr(args, 'benchmark', DEFAULT_BENCHMARK),
            student_api_key=GK_API_KEY,
        )
        if getattr(args, 'names_only', False):
            for kw in extract_keyword_names(results.get('opportunities', [])):
                print(kw)
        elif getattr(args, 'report', False):
            # Auto-fetch old-keywords and merge into report
            try:
                old_kws = fetch_old_keywords(personalized=True)
                if old_kws:
                    results['oldKeywords'] = old_kws
                    print(f'  📚 Got {len(old_kws)} old-word opportunities', file=sys.stderr)
            except Exception as e:
                print(f'  ⚠️ Old-keywords fetch failed: {e}', file=sys.stderr)
            print(render_report(results))
        else:
            output = results if getattr(args, 'raw', False) else sanitize_for_learner(results)
            print(json.dumps(output, indent=2, ensure_ascii=False))

    elif args.command in ('expand', 'full'):
        seeds = args.seeds or DEFAULT_SEEDS
        if not args.seeds:
            print(f"ℹ️  No seeds provided. Using {len(seeds)} default seeds.", file=sys.stderr)
        results = get_expanded_keywords(seeds, use_cache=not getattr(args, 'no_cache', False))
        if args.command == 'expand' and getattr(args, 'names_only', False):
            for kw in extract_keyword_names(results.get('flatList', [])):
                print(kw)
        else:
            print(json.dumps(results, indent=2, ensure_ascii=False))

    elif args.command == 'old-keywords':
        use_all = getattr(args, 'all', False)
        keywords = fetch_old_keywords(
            limit=getattr(args, 'limit', 100),
            min_score=getattr(args, 'min_score', 0),
            personalized=not use_all,
        )
        if getattr(args, 'names_only', False):
            for kw in keywords:
                print(kw['keyword'])
        elif getattr(args, 'report', False):
            print(render_old_keywords_report(keywords))
        else:
            print(json.dumps(keywords, indent=2, ensure_ascii=False))

    elif args.command == 'serp':
        print("⚠️  SERP is now part of the expand pipeline. Use: expand <keywords>", file=sys.stderr)
        print("SERP competition data is included in each candidate's result.", file=sys.stderr)
        sys.exit(1)

    elif args.command == 'trends':
        print("⚠️  Trends comparison is now part of the expand pipeline. Use: expand <keywords>", file=sys.stderr)
        print("Trend data (ratio, verdict, etc.) is included in each candidate's 'trends' field.", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
