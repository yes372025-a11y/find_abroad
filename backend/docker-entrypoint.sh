#!/usr/bin/env bash
# Docker container entrypoint — runs migrations + seeds, then starts the server.
set -euo pipefail

echo "[entrypoint] Waiting for PostgreSQL to be ready..."
until pg_isready -h "${POSTGRES_HOST:-postgres}" -U "${POSTGRES_USER:-find_abroad_user}" -d "${POSTGRES_DB:-find_abroad}"; do
  echo "[entrypoint] PostgreSQL not ready yet — retrying in 2s..."
  sleep 2
done
echo "[entrypoint] PostgreSQL is ready."

echo "[entrypoint] Running Alembic migrations..."
alembic upgrade head

echo "[entrypoint] Seeding database (skips if data already exists)..."
python -m seeds.seed

echo "[entrypoint] Starting uvicorn..."
exec uvicorn app.main:app \
  --host 0.0.0.0 \
  --port "${PORT:-8000}" \
  --workers "${UVICORN_WORKERS:-2}" \
  --log-level "${LOG_LEVEL:-info}" \
  --access-log
