#!/usr/bin/env python3
"""上线前 QA 验收 最小校验脚本。用法：python scripts/smoke_test.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['无 P0/P1 才能上线', '9 断点无横向滚动', 'Lighthouse 有记录', '核心链路真实跑过']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 上线前 QA 验收 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
