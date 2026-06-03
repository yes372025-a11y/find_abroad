"""Scholarship CRUD endpoints."""

import math
import uuid
from datetime import date
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.middleware.auth import RequireAdmin
from app.models.scholarship import Scholarship
from app.schemas.common import Page, PageMeta
from app.schemas.scholarship import ScholarshipCreate, ScholarshipRead, ScholarshipUpdate

router = APIRouter()


@router.get("", response_model=Page[ScholarshipRead])
async def list_scholarships(
    db: Annotated[AsyncSession, Depends(get_db)],
    page: int = Query(default=1, ge=1),
    per_page: int = Query(default=20, ge=1, le=100),
    country: str | None = None,
    level: str | None = None,
    fully_funded: bool | None = None,
    search: str | None = None,
) -> Page[ScholarshipRead]:
    """Paginated scholarship list with filters."""
    query = select(Scholarship).where(
        Scholarship.is_active.is_(True), Scholarship.deleted_at.is_(None)
    )
    if country:
        query = query.where(Scholarship.country.ilike(f"%{country}%"))
    if level:
        query = query.where(Scholarship.level == level)
    if fully_funded is not None:
        query = query.where(Scholarship.is_fully_funded == fully_funded)
    if search:
        query = query.where(Scholarship.name.ilike(f"%{search}%"))

    total = (await db.execute(select(func.count()).select_from(query.subquery()))).scalar_one()
    offset = (page - 1) * per_page
    rows = (
        await db.execute(query.order_by(Scholarship.deadline.asc()).offset(offset).limit(per_page))
    ).scalars().all()

    return Page(
        items=[ScholarshipRead.model_validate(s) for s in rows],
        meta=PageMeta(total=total, page=page, per_page=per_page, pages=math.ceil(total / per_page) if total else 0),
    )


@router.get("/{slug}", response_model=ScholarshipRead)
async def get_scholarship(slug: str, db: Annotated[AsyncSession, Depends(get_db)]) -> ScholarshipRead:
    """Get a scholarship by slug."""
    result = await db.execute(
        select(Scholarship).where(Scholarship.slug == slug, Scholarship.deleted_at.is_(None))
    )
    s = result.scalar_one_or_none()
    if s is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scholarship not found")
    return ScholarshipRead.model_validate(s)


@router.post("", response_model=ScholarshipRead, status_code=status.HTTP_201_CREATED, dependencies=[RequireAdmin])
async def create_scholarship(
    payload: ScholarshipCreate, db: Annotated[AsyncSession, Depends(get_db)]
) -> ScholarshipRead:
    """Create a scholarship (admin only)."""
    s = Scholarship(id=uuid.uuid4(), **payload.model_dump())
    db.add(s)
    await db.commit()
    await db.refresh(s)
    return ScholarshipRead.model_validate(s)
