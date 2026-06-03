#!/usr/bin/env python3
"""
Seed the database with universities, scholarships, and lenders from CSV files.

Usage:
    uv run python -m seeds.seed                  # seed all
    uv run python -m seeds.seed --only universities
    uv run python -m seeds.seed --only scholarships
    uv run python -m seeds.seed --only lenders
    uv run python -m seeds.seed --force          # re-seed even if data exists
"""

from __future__ import annotations

import argparse
import asyncio
import csv
import sys
import uuid
from datetime import date
from pathlib import Path
from typing import Any

import structlog
from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

# Adjust sys.path so seeds can be run from the backend/ directory
sys.path.insert(0, str(Path(__file__).parents[1]))

from app.core.config import settings
from app.models.lender import Lender
from app.models.scholarship import Scholarship
from app.models.university import University

logger = structlog.get_logger(__name__)

DATA_DIR = Path(__file__).parent / "data"

# ─── Helpers ──────────────────────────────────────────────────────────────────


def _bool(value: str) -> bool:
    """Parse CSV boolean strings."""
    return value.strip().lower() in {"true", "1", "yes"}


def _optional_float(value: str) -> float | None:
    """Parse optional float, return None for empty strings."""
    value = value.strip()
    return float(value) if value else None


def _optional_int(value: str) -> int | None:
    """Parse optional int, return None for empty strings."""
    value = value.strip()
    return int(value) if value else None


def _optional_str(value: str) -> str | None:
    """Return None for empty strings."""
    value = value.strip()
    return value if value else None


def _parse_date(value: str) -> date | None:
    """Parse YYYY-MM-DD date strings, returning None for empty."""
    value = value.strip()
    if not value:
        return None
    return date.fromisoformat(value)


# ─── Row parsers ──────────────────────────────────────────────────────────────


def _parse_university_row(row: dict[str, str]) -> dict[str, Any]:
    """Convert a CSV row dict to University model kwargs."""
    return {
        "id": uuid.uuid4(),
        "name": row["name"].strip(),
        "slug": row["slug"].strip(),
        "country": row["country"].strip(),
        "city": _optional_str(row.get("city", "")),
        "world_ranking": _optional_int(row.get("world_ranking", "")),
        "qs_ranking": _optional_int(row.get("qs_ranking", "")),
        "avg_tuition_usd": _optional_float(row.get("avg_tuition_usd", "")),
        "avg_living_cost_usd": _optional_float(row.get("avg_living_cost_usd", "")),
        "min_cgpa": _optional_float(row.get("min_cgpa", "")),
        "min_ielts": _optional_float(row.get("min_ielts", "")),
        "intakes": _optional_str(row.get("intakes", "")),
        "is_featured": _bool(row.get("is_featured", "false")),
        "website_url": _optional_str(row.get("website_url", "")),
        "description": _optional_str(row.get("description", "")),
        "is_active": True,
    }


def _parse_scholarship_row(row: dict[str, str]) -> dict[str, Any]:
    """Convert a CSV row dict to Scholarship model kwargs."""
    return {
        "id": uuid.uuid4(),
        "name": row["name"].strip(),
        "slug": row["slug"].strip(),
        "country": row["country"].strip(),
        "university": _optional_str(row.get("university", "")),
        "provider": _optional_str(row.get("provider", "")),
        "level": _optional_str(row.get("level", "")),
        "coverage_description": _optional_str(row.get("coverage_description", "")),
        "max_amount_usd": _optional_float(row.get("max_amount_usd", "")),
        "is_fully_funded": _bool(row.get("is_fully_funded", "false")),
        "min_cgpa": _optional_float(row.get("min_cgpa", "")),
        "fields_of_study": _optional_str(row.get("fields_of_study", "")),
        "deadline": _parse_date(row.get("deadline", "")),
        "application_url": _optional_str(row.get("application_url", "")),
        "is_featured": _bool(row.get("is_featured", "false")),
        "description": _optional_str(row.get("description", "")),
        "is_active": True,
    }


def _parse_lender_row(row: dict[str, str]) -> dict[str, Any]:
    """Convert a CSV row dict to Lender model kwargs."""
    return {
        "id": uuid.uuid4(),
        "name": row["name"].strip(),
        "slug": row["slug"].strip(),
        "lender_type": row.get("lender_type", "bank").strip(),
        "interest_rate_min": float(row["interest_rate_min"]),
        "interest_rate_max": float(row["interest_rate_max"]),
        "max_loan_amount_usd": float(row["max_loan_amount_usd"]),
        "min_loan_amount_usd": _optional_float(row.get("min_loan_amount_usd", "")),
        "processing_fee_pct": _optional_float(row.get("processing_fee_pct", "")),
        "moratorium_months": _optional_int(row.get("moratorium_months", "")),
        "repayment_tenure_months": _optional_int(row.get("repayment_tenure_months", "")),
        "approval_days": _optional_int(row.get("approval_days", "")),
        "requires_collateral": _bool(row.get("requires_collateral", "false")),
        "requires_co_applicant": _bool(row.get("requires_co_applicant", "false")),
        "min_family_income_usd": _optional_float(row.get("min_family_income_usd", "")),
        "eligible_countries": _optional_str(row.get("eligible_countries", "")),
        "is_featured": _bool(row.get("is_featured", "false")),
        "website_url": _optional_str(row.get("website_url", "")),
        "description": _optional_str(row.get("description", "")),
        "cta_url": _optional_str(row.get("cta_url", "")),
        "display_order": 0,
        "is_active": True,
    }


# ─── Seeders ──────────────────────────────────────────────────────────────────


async def seed_universities(session: AsyncSession, force: bool = False) -> int:
    """Seed universities from CSV. Returns count of rows inserted."""
    existing_count = (
        await session.execute(select(func.count()).select_from(University))
    ).scalar_one()

    if existing_count > 0 and not force:
        logger.info("universities_skip", existing=existing_count)
        return 0

    if force and existing_count > 0:
        await session.execute(text("DELETE FROM universities"))
        logger.info("universities_cleared", deleted=existing_count)

    csv_path = DATA_DIR / "universities.csv"
    rows: list[University] = []

    with csv_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader, start=1):
            try:
                rows.append(University(**_parse_university_row(row)))
            except Exception as exc:
                logger.error("university_row_parse_error", row=i, error=str(exc))

    session.add_all(rows)
    logger.info("universities_seeded", count=len(rows))
    return len(rows)


async def seed_scholarships(session: AsyncSession, force: bool = False) -> int:
    """Seed scholarships from CSV. Returns count of rows inserted."""
    existing_count = (
        await session.execute(select(func.count()).select_from(Scholarship))
    ).scalar_one()

    if existing_count > 0 and not force:
        logger.info("scholarships_skip", existing=existing_count)
        return 0

    if force and existing_count > 0:
        await session.execute(text("DELETE FROM scholarships"))
        logger.info("scholarships_cleared", deleted=existing_count)

    csv_path = DATA_DIR / "scholarships.csv"
    rows: list[Scholarship] = []

    with csv_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader, start=1):
            try:
                rows.append(Scholarship(**_parse_scholarship_row(row)))
            except Exception as exc:
                logger.error("scholarship_row_parse_error", row=i, error=str(exc))

    session.add_all(rows)
    logger.info("scholarships_seeded", count=len(rows))
    return len(rows)


async def seed_lenders(session: AsyncSession, force: bool = False) -> int:
    """Seed lenders from CSV. Returns count of rows inserted."""
    existing_count = (
        await session.execute(select(func.count()).select_from(Lender))
    ).scalar_one()

    if existing_count > 0 and not force:
        logger.info("lenders_skip", existing=existing_count)
        return 0

    if force and existing_count > 0:
        await session.execute(text("DELETE FROM lenders"))
        logger.info("lenders_cleared", deleted=existing_count)

    csv_path = DATA_DIR / "lenders.csv"
    rows: list[Lender] = []

    with csv_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader, start=1):
            try:
                rows.append(Lender(**_parse_lender_row(row)))
            except Exception as exc:
                logger.error("lender_row_parse_error", row=i, error=str(exc))

    session.add_all(rows)
    logger.info("lenders_seeded", count=len(rows))
    return len(rows)


# ─── Entry point ──────────────────────────────────────────────────────────────


async def run_seeds(only: str | None = None, force: bool = False) -> None:
    """Run all (or selected) seed operations."""
    engine = create_async_engine(str(settings.database_url), echo=False)
    session_factory = async_sessionmaker(engine, expire_on_commit=False)

    totals: dict[str, int] = {}

    async with session_factory() as session:
        async with session.begin():
            if only is None or only == "universities":
                totals["universities"] = await seed_universities(session, force)
            if only is None or only == "scholarships":
                totals["scholarships"] = await seed_scholarships(session, force)
            if only is None or only == "lenders":
                totals["lenders"] = await seed_lenders(session, force)

    await engine.dispose()

    logger.info("seed_complete", totals=totals)
    print(
        f"\n✅ Seeding complete:\n"
        + "\n".join(f"   {k}: {v} rows inserted" for k, v in totals.items())
    )


def main() -> None:
    """Parse CLI args and run seeds."""
    parser = argparse.ArgumentParser(description="Seed Find Abroad database from CSV files")
    parser.add_argument(
        "--only",
        choices=["universities", "scholarships", "lenders"],
        help="Seed only a specific entity type",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Delete existing rows and re-seed (use with caution in production)",
    )
    args = parser.parse_args()
    asyncio.run(run_seeds(only=args.only, force=args.force))


if __name__ == "__main__":
    main()
