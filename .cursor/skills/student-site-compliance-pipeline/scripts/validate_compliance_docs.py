#!/usr/bin/env python3
"""合规与基础法律页面 最小校验脚本。用法：python scripts/validate_compliance_docs.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['必须声明非法律意见', '必须列第三方服务', '必须有联系方式占位', '不得承诺未实现能力']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 合规与基础法律页面 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
