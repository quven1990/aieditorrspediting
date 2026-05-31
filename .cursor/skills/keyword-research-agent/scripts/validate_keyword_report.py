#!/usr/bin/env python3
import sys
from pathlib import Path

REQUIRED = ["值得做", "可观察", "不值得做", "SERP", "PRD"]

def main():
    if len(sys.argv) < 2:
        print("Usage: validate_keyword_report.py <report.md>", file=sys.stderr)
        return 2
    text = Path(sys.argv[1]).read_text(encoding="utf-8")
    missing = [x for x in REQUIRED if x not in text]
    if missing:
        print("Missing sections: " + ", ".join(missing), file=sys.stderr)
        return 1
    print("OK: keyword report has required sections")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
