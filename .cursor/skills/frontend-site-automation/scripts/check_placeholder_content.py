#!/usr/bin/env python3
"""前端实现与页面落地 最小校验脚本。用法：python scripts/check_placeholder_content.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['无 Lorem/TODO/href=#', 'title/meta/OG/canonical 完整', '关键事件命名统一', '不能把 secret 写到前端']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 前端实现与页面落地 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
