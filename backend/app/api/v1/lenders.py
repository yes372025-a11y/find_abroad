"""Lender comparison and loan assessment endpoints."""

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.middleware.auth import RequireAdmin
from app.models.lender import Lender
from app.schemas.lender import LenderCreate, LenderRead, LoanAssessmentCreate, LoanAssessmentRead
from app.services.loan_service import LoanService

router = APIRouter()


@router.get("", response_model=list[LenderRead])
async def list_lenders(
    db: Annotated[AsyncSession, Depends(get_db)],
    featured: bool | None = None,
    requires_collateral: bool | None = None,
) -> list[LenderRead]:
    """List all active lenders with optional filters."""
    query = select(Lender).where(Lender.is_active.is_(True), Lender.deleted_at.is_(None))
    if featured is not None:
        query = query.where(Lender.is_featured == featured)
    if requires_collateral is not None:
        query = query.where(Lender.requires_collateral == requires_collateral)
    rows = (await db.execute(query.order_by(Lender.display_order.asc()))).scalars().all()
    return [LenderRead.model_validate(l) for l in rows]


@router.post("", response_model=LenderRead, status_code=status.HTTP_201_CREATED, dependencies=[RequireAdmin])
async def create_lender(
    payload: LenderCreate, db: Annotated[AsyncSession, Depends(get_db)]
) -> LenderRead:
    """Create a lender (admin only)."""
    lender = Lender(id=uuid.uuid4(), **payload.model_dump())
    db.add(lender)
    await db.commit()
    await db.refresh(lender)
    return LenderRead.model_validate(lender)


@router.post("/assess", response_model=LoanAssessmentRead, status_code=status.HTTP_201_CREATED)
async def assess_loan_eligibility(
    payload: LoanAssessmentCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> LoanAssessmentRead:
    """Run multi-step loan eligibility assessment."""
    service = LoanService(db)
    assessment = await service.assess(payload)
    await db.commit()
    await db.refresh(assessment)
    return LoanAssessmentRead.model_validate(assessment)
