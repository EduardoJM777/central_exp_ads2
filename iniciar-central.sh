#!/usr/bin/env bash
set -e
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -d "$PROJECT_DIR/../.tools/node-v24.20.0-win-x64" ]; then
  export PATH="$PROJECT_DIR/../.tools/node-v24.20.0-win-x64:$PATH"
fi
(cd "$PROJECT_DIR" && npm start) &
PORTAL_PID=$!
(cd "$PROJECT_DIR/sistema-invadido/backend" && npm run dev) &
API_PID=$!
trap 'kill "$PORTAL_PID" "$API_PID" 2>/dev/null || true' EXIT INT TERM
echo "Portal: http://localhost:4300 — API compartilhada: http://localhost:3333"
wait
