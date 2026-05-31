#!/usr/bin/env python3
"""产品定义与 PRD 最小校验脚本。用法：python scripts/validate_prd.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['必须有 NOT-DO', '必须有首页 IA', '必须有 SEO 页面矩阵', '必须有下游交接摘要']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 产品定义与 PRD report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
