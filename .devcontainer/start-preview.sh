#!/usr/bin/env bash

set -euo pipefail

PORT="${PORT:-8000}"
LOG_FILE="/tmp/sonnies-codespaces-preview.log"

if command -v lsof >/dev/null 2>&1 && lsof -iTCP:"${PORT}" -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "Preview server already running on port ${PORT}."
  exit 0
fi

nohup python3 -m http.server "${PORT}" --bind 0.0.0.0 >"${LOG_FILE}" 2>&1 &
echo "Preview server started on port ${PORT}. Log: ${LOG_FILE}"
