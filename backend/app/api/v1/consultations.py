"""Consultation booking endpoints."""

import uuid
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.middleware.auth import CurrentUser, RequireCounselor
from app.models.consultation import Consultation
from app.schemas.consultation import ConsultationCreate, ConsultationRead, ConsultationUpdate

router = APIRouter()


@router.post("", response_model=ConsultationRead, status_code=status.HTTP_201_CREATED)
async def book_consultation(
    payload: ConsultationCreate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> ConsultationRead:
    """Book a consultation as the current student."""
    consultation = Consultation(
        id=uuid.uuid4(),
        student_id=current_user.id,
        **payload.model_dump(),
    )
    db.add(consultation)
    await db.commit()
    await db.refresh(consultation)
    return ConsultationRead.model_validate(consultation)


@router.get("/my", response_model=list[ConsultationRead])
async def my_consultations(
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> list[ConsultationRead]:
    """Return all consultations for the current user."""
    rows = (
        await db.execute(
            select(Consultation)
            .where(Consultation.student_id == current_user.id, Consultation.deleted_at.is_(None))
            .order_by(Consultation.scheduled_at.desc())
        )
    ).scalars().all()
    return [ConsultationRead.model_validate(c) for c in rows]


@router.patch("/{consultation_id}", response_model=ConsultationRead, dependencies=[RequireCounselor])
async def update_consultation(
    consultation_id: UUID,
    payload: ConsultationUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> ConsultationRead:
    """Update consultation details (counselor+)."""
    result = await db.execute(
        select(Consultation).where(Consultation.id == consultation_id)
    )
    c = result.scalar_one_or_none()
    if c is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Consultation not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(c, field, value)
    await db.commit()
    await db.refresh(c)
    return ConsultationRead.model_validate(c)
