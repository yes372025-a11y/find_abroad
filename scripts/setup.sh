#!/usr/bin/env bash
# First-time project setup script
set -euo pipefail

echo "Setting up Find Abroad development environment..."

# Check prerequisites
for cmd in uv docker node; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "ERROR: '$cmd' is required but not installed." >&2
    exit 1
  fi
done

# Copy env file
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example - please fill in your secrets!"
else
  echo ".env already exists - skipping copy"
fi

# Install Python dependencies
echo "Installing Python dependencies with uv..."
uv sync

# Install pre-commit hooks
echo "Installing pre-commit hooks..."
uv run pre-commit install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo ""
echo "Setup complete! Next steps:"
echo "   1. Edit .env with your database credentials and secrets"
echo "   2. Run: docker compose up -d postgres redis"
echo "   3. Run: cd backend && uv run alembic upgrade head"
echo "   4. Run: docker compose up to start all services"
