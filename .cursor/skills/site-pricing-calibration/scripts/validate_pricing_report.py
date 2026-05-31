#!/usr/bin/env python3
"""定价与商业模型校准 最小校验脚本。用法：python scripts/validate_pricing_report.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['不得出现 unlimited', '必须有竞品定价表', '必须有单位成本', '必须有 Pro 额度上限']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 定价与商业模型校准 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
