#!/usr/bin/env python3
"""Pre-commit hook: warn when models change without a new migration."""

import subprocess
import sys


def main() -> int:
    """Check that model changes have a corresponding migration."""
    result = subprocess.run(
        ["git", "diff", "--cached", "--name-only"],
        capture_output=True,
        text=True,
    )
    changed = result.stdout.splitlines()

    model_changed = any("app/models" in f for f in changed)
    migration_added = any("app/migrations/versions" in f for f in changed)

    if model_changed and not migration_added:
        print(
            "WARNING: Model files changed without a new Alembic migration.\n"
            "  Run: alembic revision --autogenerate -m 'describe_change'\n"
            "  Then add the generated file to your commit.",
            file=sys.stderr,
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
