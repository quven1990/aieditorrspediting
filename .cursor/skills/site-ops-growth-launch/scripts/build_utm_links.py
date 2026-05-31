#!/usr/bin/env python3
"""上线发布与冷启动增长 最小校验脚本。用法：python scripts/build_utm_links.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['首周只选 2-3 个主渠道', '每个外发内容需人工确认', '必须带 UTM', '不能刷屏/垃圾外链']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 上线发布与冷启动增长 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
