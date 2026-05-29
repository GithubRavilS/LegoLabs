#!/usr/bin/env bash
# Project stop hook: validate Labs Lend embed; delegate to global hook when present.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

if [ -f "$ROOT/scripts/validate_lending_embed.py" ]; then
  set +e
  OUT=$(python3 "$ROOT/scripts/validate_lending_embed.py" 2>&1)
  CODE=$?
  set -e
  if [ "$CODE" -ne 0 ]; then
    jq -n --arg msg "Labs Lend embed validation failed:${OUT}" '{followup_message: $msg}'
    exit 0
  fi
fi

GLOBAL="$HOME/.cursor/hooks/nano-staged-stop.sh"
if [ -x "$GLOBAL" ]; then
  exec "$GLOBAL"
fi

if [ -x "$ROOT/node_modules/.bin/nano-staged" ] && [ -f "$ROOT/.nano-staged.json" ]; then
  cd "$ROOT"
  ./node_modules/.bin/nano-staged --unstaged --quiet --bail && echo '{}' || {
    jq -n --arg msg "Fix lint/format (nano-staged failed). Run: npm run lint" '{followup_message: $msg}'
  }
  exit 0
fi

echo '{}'
