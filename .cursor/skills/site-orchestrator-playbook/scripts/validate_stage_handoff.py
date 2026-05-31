#!/usr/bin/env python3
"""全流程主持台 最小校验脚本。用法：python scripts/validate_stage_handoff.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['每阶段有输入/输出', '阻塞项有 owner', '交接含状态标记', '下一阶段 Prompt 可直接复制']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK 全流程主持台 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
