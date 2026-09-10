#!/usr/bin/env bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
export PATH="$PROJECT_DIR/.tools/node-v24.20.0-win-x64:$PATH"

echo "Node em uso: $(node --version)"
echo "Iniciando Cidade Inteligente..."

(cd "$PROJECT_DIR/backend" && npm run dev) &
BACKEND_PID=$!
(cd "$PROJECT_DIR/frontend" && npm start) &
FRONTEND_PID=$!

stop_project() {
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}

trap stop_project EXIT INT TERM
echo "Abra http://localhost:4201 e mantenha este terminal aberto."
wait
