"""Lead capture and management endpoints."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.middleware.auth import RequireCounselor
from app.schemas.common import MessageResponse, Page
from app.schemas.lead import LeadCreate, LeadRead, LeadUpdate
from app.services.lead_service import LeadService

router = APIRouter()


@router.post("", response_model=LeadRead, status_code=status.HTTP_201_CREATED)
async def capture_lead(
    payload: LeadCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> LeadRead:
    """Capture a new lead from any acquisition source."""
    service = LeadService(db)
    lead = await service.capture(payload)
    await db.commit()
    await db.refresh(lead)
    return LeadRead.model_validate(lead)


@router.get("", response_model=Page[LeadRead], dependencies=[RequireCounselor])
async def list_leads(
    db: Annotated[AsyncSession, Depends(get_db)],
    page: int = Query(default=1, ge=1),
    per_page: int = Query(default=20, ge=1, le=100),
    status_filter: str | None = Query(default=None, alias="status"),
) -> Page[LeadRead]:
    """Paginated list of leads (counselor+)."""
    service = LeadService(db)
    return await service.get_page(page=page, per_page=per_page, status=status_filter)


@router.patch("/{lead_id}", response_model=LeadRead, dependencies=[RequireCounselor])
async def update_lead(
    lead_id: str,
    payload: LeadUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> LeadRead:
    """Update a lead's status or notes."""
    from uuid import UUID
    service = LeadService(db)
    lead = await service.update(UUID(lead_id), payload)
    if lead is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    await db.commit()
    await db.refresh(lead)
    return LeadRead.model_validate(lead)
