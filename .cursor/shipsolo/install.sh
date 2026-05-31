#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${SHIPSOLO_SKILLS_BASE_URL:-https://shipsolo.io/shipsolo-skills}"
APP_ORIGIN="${SHIPSOLO_APP_ORIGIN:-${BASE_URL%/shipsolo-skills}}"
SKILL_ID="${1:-all}"
TOKEN="${SHIPSOLO_SKILLS_TOKEN:-}"
HERMES_HOME_DIR="${HERMES_HOME:-$HOME/.hermes}"
INSTALL_ROOT="${SHIPSOLO_SKILLS_DIR:-$HERMES_HOME_DIR/skills/shipsolo}"
INSTALL_ROOT="$(python3 - <<'PY' "$INSTALL_ROOT"
import os, sys
print(os.path.abspath(os.path.expanduser(os.path.expandvars(sys.argv[1]))))
PY
)"
PROFILE_CONFIG_MODE="${SHIPSOLO_CONFIGURE_PROFILES:-auto}"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing required command: $1" >&2; exit 1; }; }
need curl
need unzip
need python3

if [ -z "$TOKEN" ]; then
  echo "Missing SHIPSOLO_SKILLS_TOKEN." >&2
  echo "请先登录 shipsolo.io 领航计划账号，在 /app/skills 页面复制带令牌的安装命令。" >&2
  exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
  SHA_CMD="sha256sum -c"
elif command -v shasum >/dev/null 2>&1; then
  SHA_CMD="shasum -a 256 -c"
else
  echo "Missing sha256sum or shasum" >&2
  exit 1
fi

configure_profiles() {
  case "$PROFILE_CONFIG_MODE" in
    0|false|off) return 0 ;;
  esac
  local profiles_dir="$HERMES_HOME_DIR/profiles"
  [ -d "$profiles_dir" ] || return 0
  python3 - <<'PY' "$profiles_dir" "$INSTALL_ROOT"
from pathlib import Path
import sys, shutil, datetime
profiles_dir = Path(sys.argv[1]).expanduser()
skill_dir = str(Path(sys.argv[2]).expanduser().resolve())
changed=[]

def find_skills_block(lines):
    start = None
    end = len(lines)
    for i, line in enumerate(lines):
        if line.startswith('skills:'):
            start = i
            break
    if start is None:
        return None, None
    for j in range(start + 1, len(lines)):
        if lines[j] and not lines[j].startswith((' ', '	')) and not lines[j].startswith('#'):
            end = j
            break
    return start, end

for cfg in sorted(profiles_dir.glob('*/config.yaml')):
    text = cfg.read_text(encoding='utf-8') if cfg.exists() else ''
    if skill_dir in text:
        continue
    lines = text.splitlines()
    start, end = find_skills_block(lines)
    if start is None:
        if lines and lines[-1].strip():
            lines.append('')
        lines += ['skills:', '  external_dirs:', f'    - {skill_dir}']
    else:
        ext = None
        for i in range(start + 1, end):
            if lines[i].startswith('  external_dirs:'):
                ext = i
                break
        if ext is None:
            lines[start + 1:start + 1] = ['  external_dirs:', f'    - {skill_dir}']
        else:
            insert = ext + 1
            while insert < end and (lines[insert].startswith('    ') or lines[insert].startswith('  - ')):
                insert += 1
            lines.insert(insert, f'    - {skill_dir}')
    backup = cfg.with_suffix(cfg.suffix + '.shipsolo-bak-' + datetime.datetime.utcnow().strftime('%Y%m%d%H%M%S'))
    shutil.copy2(cfg, backup)
    cfg.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    changed.append(cfg.parent.name)
if changed:
    print('Configured ShipSolo shared skills for profiles: ' + ', '.join(changed))
else:
    print('No profile config changes needed.')
PY
}

download() {
  local file="$1"
  local out="$2"
  curl -fsSL -H "Authorization: Bearer $TOKEN" "$APP_ORIGIN/api/download?file=$file" -o "$out"
}

download "shipsolo-skills/index.json" "$TMP_DIR/index.json"
REMOTE_VERSION="$(python3 - <<'PY' "$TMP_DIR/index.json"
import json, sys
print(json.load(open(sys.argv[1])).get('bundleVersion', 'latest'))
PY
)"
LOCK_FILE="$INSTALL_ROOT/.shipsolo-skills-lock.json"
LOCAL_VERSION=""
if [ -f "$LOCK_FILE" ]; then
  LOCAL_VERSION="$(python3 - <<'PY' "$LOCK_FILE" 2>/dev/null || true
import json, sys
print(json.load(open(sys.argv[1])).get('bundleVersion', ''))
PY
)"
fi

mkdir -p "$INSTALL_ROOT"
if [ -n "$LOCAL_VERSION" ] && [ "$LOCAL_VERSION" != "$REMOTE_VERSION" ]; then
  BACKUP_DIR="$INSTALL_ROOT/.backup/$LOCAL_VERSION-$(date +%Y%m%d%H%M%S)"
  mkdir -p "$BACKUP_DIR"
  find "$INSTALL_ROOT" -mindepth 1 -maxdepth 1 ! -name '.backup' -exec mv {} "$BACKUP_DIR" \;
  echo "Backup: $BACKUP_DIR"
fi

if [ "$SKILL_ID" = "all" ] || [ -z "$SKILL_ID" ]; then
  ARCHIVE_URL="/shipsolo-skills/shipsolo-skills-latest.zip"
  ARCHIVE_NAME="shipsolo-skills-latest.zip"
  TARGET_DIR="$INSTALL_ROOT"
else
  ARCHIVE_URL="$(python3 - <<'PY' "$TMP_DIR/index.json" "$SKILL_ID"
import json, sys
idx=json.load(open(sys.argv[1]))
skill=next((s for s in idx.get('skills', []) if s.get('id') == sys.argv[2]), None)
if not skill:
    raise SystemExit(f"Unknown ShipSolo skill: {sys.argv[2]}")
print(skill['archiveUrl'])
PY
)"
  ARCHIVE_NAME="$(basename "$ARCHIVE_URL")"
  TARGET_DIR="$INSTALL_ROOT/$SKILL_ID"
  mkdir -p "$TARGET_DIR"
fi

ARCHIVE_FILE="${ARCHIVE_URL#/}"
download "$ARCHIVE_FILE" "$TMP_DIR/$ARCHIVE_NAME"
download "$ARCHIVE_FILE.sha256" "$TMP_DIR/$ARCHIVE_NAME.sha256"
(cd "$TMP_DIR" && $SHA_CMD "$ARCHIVE_NAME.sha256") >/dev/null
unzip -oq "$TMP_DIR/$ARCHIVE_NAME" -d "$TARGET_DIR"

cat > "$LOCK_FILE" <<JSON
{
  "source": "ShipSolo 做站 Skills",
  "bundleVersion": "$REMOTE_VERSION",
  "skill": "$SKILL_ID",
  "installedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "baseUrl": "$BASE_URL"
}
JSON
cat > "$INSTALL_ROOT/update.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
export SHIPSOLO_SKILLS_TOKEN="$TOKEN"
curl -fsSL "$BASE_URL/install.sh" | bash
EOF
chmod +x "$INSTALL_ROOT/update.sh"
configure_profiles

echo "ShipSolo Skills installed/updated: $REMOTE_VERSION"
echo "Location: $INSTALL_ROOT"
echo "Profiles: shared through skills.external_dirs when profiles exist"
echo "Next: start a new Hermes session; gateway users should run: hermes gateway restart"
