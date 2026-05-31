#!/usr/bin/env python3
"""视觉设计与页面生成 Prompt 最小校验脚本。用法：python scripts/validate_design_handoff.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['非默认字体', '非紫蓝白模板', 'Logo 16px 可辨识', '有 desktop/mobile 交付']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 视觉设计与页面生成 Prompt report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
