#!/usr/bin/env python3
"""
Utility to add rows from a custom CSV into an existing seeded table.

Usage:
    uv run python -m seeds.add_rows --entity universities --file my_unis.csv
    uv run python -m seeds.add_rows --entity scholarships --file extras.csv
    uv run python -m seeds.add_rows --entity lenders --file new_lenders.csv

The CSV must use the same column headers as the seed data CSVs in data/.
Duplicate slugs are silently skipped.
"""

from __future__ import annotations

import argparse
import asyncio
import csv
import sys
import uuid
from pathlib import Path

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

sys.path.insert(0, str(Path(__file__).parents[1]))

from app.core.config import settings
from app.models.lender import Lender
from app.models.scholarship import Scholarship
from app.models.university import University
from seeds.seed import (
    _parse_lender_row,
    _parse_scholarship_row,
    _parse_university_row,
)

logger = structlog.get_logger(__name__)

MODEL_MAP = {
    "universities": (University, _parse_university_row),
    "scholarships": (Scholarship, _parse_scholarship_row),
    "lenders": (Lender, _parse_lender_row),
}


async def add_rows(entity: str, csv_path: Path) -> None:
    """Load rows from csv_path, skip existing slugs, and insert the rest."""
    if entity not in MODEL_MAP:
        print(f"ERROR: unknown entity '{entity}'. Choose from: {list(MODEL_MAP)}")
        sys.exit(1)

    Model, parser = MODEL_MAP[entity]

    engine = create_async_engine(settings.database_url, echo=False)
    session_factory = async_sessionmaker(engine, expire_on_commit=False)

    async with session_factory() as session:
        async with session.begin():
            # Load existing slugs to detect duplicates
            existing_slugs = {
                row[0]
                for row in (await session.execute(select(Model.slug))).all()
            }

            inserted = 0
            skipped = 0

            with csv_path.open(newline="", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for i, row in enumerate(reader, start=1):
                    slug = row.get("slug", "").strip()
                    if slug in existing_slugs:
                        logger.debug("skip_existing_slug", slug=slug)
                        skipped += 1
                        continue
                    try:
                        instance = Model(**parser(row))
                        session.add(instance)
                        existing_slugs.add(slug)
                        inserted += 1
                    except Exception as exc:
                        logger.error("parse_error", row=i, slug=slug, error=str(exc))

    await engine.dispose()
    print(
        f"\n✅ Done: {inserted} rows inserted, {skipped} duplicate slugs skipped."
    )


def main() -> None:
    """CLI entry point."""
    parser = argparse.ArgumentParser(description="Add rows from a custom CSV")
    parser.add_argument(
        "--entity",
        required=True,
        choices=list(MODEL_MAP),
        help="Entity type to insert into",
    )
    parser.add_argument(
        "--file",
        required=True,
        type=Path,
        help="Path to the CSV file with new rows",
    )
    args = parser.parse_args()

    if not args.file.exists():
        print(f"ERROR: file not found: {args.file}")
        sys.exit(1)

    asyncio.run(add_rows(entity=args.entity, csv_path=args.file))


if __name__ == "__main__":
    main()
