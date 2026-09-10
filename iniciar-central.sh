#!/usr/bin/env bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Iniciando a Central de Experiências ADS..."
(cd "$PROJECT_DIR" && npm start) &
PORTAL_PID=$!
(cd "$PROJECT_DIR/sistema-invadido/backend" && npm run dev) &
INVASAO_API_PID=$!
(cd "$PROJECT_DIR/sistema-invadido/frontend" && npm start) &
INVASAO_WEB_PID=$!
(cd "$PROJECT_DIR/cidade-inteligente/backend" && npm run dev) &
CIDADE_API_PID=$!
(cd "$PROJECT_DIR/cidade-inteligente/frontend" && npm start) &
CIDADE_WEB_PID=$!

stop_central() {
  kill "$PORTAL_PID" "$INVASAO_API_PID" "$INVASAO_WEB_PID" "$CIDADE_API_PID" "$CIDADE_WEB_PID" 2>/dev/null || true
}

trap stop_central EXIT INT TERM
echo "Portal: http://localhost:4300"
echo "Mantenha este terminal aberto. Use Ctrl+C para encerrar tudo."
wait
