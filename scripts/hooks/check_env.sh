#!/usr/bin/env bash
# Pre-commit hook: block committing .env files with real secrets
set -e

for f in "$@"; do
  if [[ "$f" == ".env" || "$f" =~ ^\.env\.[^e] ]]; then
    echo "ERROR: Attempting to commit a .env file: $f"
    echo "  Remove the file from staging before committing."
    exit 1
  fi
done
