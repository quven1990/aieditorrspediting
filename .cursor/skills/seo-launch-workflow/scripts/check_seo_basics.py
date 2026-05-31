#!/usr/bin/env python3
"""SEO 上线与收录配置 最小校验脚本。用法：python scripts/check_seo_basics.py <report.md>"""
import sys, pathlib
path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('report.md')
text = path.read_text(encoding='utf-8') if path.exists() else ''
checks = ['canonical 不能指预览域', 'sitemap 不能包含 404', 'robots 不阻止核心页', 'GSC 状态要记录']
missing = [c for c in checks if c.split()[0] not in text and c not in text]
base = [x for x in ['交付物','验收清单','下游交接'] if x not in text]
if base:
    print('FAIL missing sections: ' + ', '.join(base)); sys.exit(1)
print('OK SEO 上线与收录配置 report basic structure passed')
if missing:
    print('WARN review checklist manually: ' + '; '.join(missing))
