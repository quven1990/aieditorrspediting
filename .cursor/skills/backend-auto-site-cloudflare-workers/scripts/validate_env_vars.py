#!/usr/bin/env python3
"""Cloudflare 后端与会员系统 最小校验脚本。用法：python scripts/validate_env_vars.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['前端不直连模型 API', 'Webhook 幂等', 'Session httpOnly/secure', 'env 只写变量名']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK Cloudflare 后端与会员系统 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
