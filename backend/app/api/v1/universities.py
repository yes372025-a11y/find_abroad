"""University and program CRUD endpoints."""

import math
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.middleware.auth import RequireAdmin
from app.models.university import University
from app.schemas.common import Page, PageMeta
from app.schemas.university import UniversityCreate, UniversityRead, UniversityUpdate

router = APIRouter()


@router.get("", response_model=Page[UniversityRead])
async def list_universities(
    db: Annotated[AsyncSession, Depends(get_db)],
    page: int = Query(default=1, ge=1),
    per_page: int = Query(default=20, ge=1, le=500),
    country: str | None = None,
    featured: bool | None = None,
    search: str | None = None,
) -> Page[UniversityRead]:
    """Paginated, filterable university list."""
    query = select(University).where(
        University.is_active.is_(True), University.deleted_at.is_(None)
    )
    if country:
        query = query.where(University.country.ilike(f"%{country}%"))
    if featured is not None:
        query = query.where(University.is_featured == featured)
    if search:
        query = query.where(University.name.ilike(f"%{search}%"))

    total = (await db.execute(select(func.count()).select_from(query.subquery()))).scalar_one()
    offset = (page - 1) * per_page
    rows = (
        await db.execute(
            query
            .options(selectinload(University.programs))
            .order_by(University.world_ranking.asc())
            .offset(offset)
            .limit(per_page)
        )
    ).scalars().all()

    return Page(
        items=[UniversityRead.model_validate(u) for u in rows],
        meta=PageMeta(total=total, page=page, per_page=per_page, pages=math.ceil(total / per_page) if total else 0),
    )


@router.get("/{slug}", response_model=UniversityRead)
async def get_university(slug: str, db: Annotated[AsyncSession, Depends(get_db)]) -> UniversityRead:
    """Get a single university by slug."""
    result = await db.execute(
        select(University)
        .options(selectinload(University.programs))
        .where(University.slug == slug, University.deleted_at.is_(None))
    )
    uni = result.scalar_one_or_none()
    if uni is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="University not found")
    return UniversityRead.model_validate(uni)


@router.post("", response_model=UniversityRead, status_code=status.HTTP_201_CREATED, dependencies=[RequireAdmin])
async def create_university(
    payload: UniversityCreate, db: Annotated[AsyncSession, Depends(get_db)]
) -> UniversityRead:
    """Create a new university (admin only)."""
    import uuid
    uni = University(id=uuid.uuid4(), **payload.model_dump())
    db.add(uni)
    await db.commit()
    await db.refresh(uni)
    return UniversityRead.model_validate(uni)


@router.patch("/{university_id}", response_model=UniversityRead, dependencies=[RequireAdmin])
async def update_university(
    university_id: UUID,
    payload: UniversityUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> UniversityRead:
    """Update a university (admin only)."""
    result = await db.execute(select(University).where(University.id == university_id))
    uni = result.scalar_one_or_none()
    if uni is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="University not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(uni, field, value)
    await db.commit()
    await db.refresh(uni)
    return UniversityRead.model_validate(uni)
