"""Application tracker endpoints."""

import uuid
from datetime import UTC, datetime
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.middleware.auth import CurrentUser, RequireCounselor
from app.models.application import APPLICATION_STATUSES, Application
from app.schemas.application import ApplicationCreate, ApplicationRead, ApplicationStatusUpdate

router = APIRouter()


@router.post("", response_model=ApplicationRead, status_code=status.HTTP_201_CREATED)
async def create_application(
    payload: ApplicationCreate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> ApplicationRead:
    """Start a new application for the current student."""
    app = Application(
        id=uuid.uuid4(),
        student_id=current_user.id,
        status_history=[],
        **payload.model_dump(),
    )
    db.add(app)
    await db.commit()
    await db.refresh(app)
    return ApplicationRead.model_validate(app)


@router.get("/my", response_model=list[ApplicationRead])
async def my_applications(
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> list[ApplicationRead]:
    """Return all applications for the current student."""
    rows = (
        await db.execute(
            select(Application)
            .where(Application.student_id == current_user.id, Application.deleted_at.is_(None))
            .order_by(Application.created_at.desc())
        )
    ).scalars().all()
    return [ApplicationRead.model_validate(a) for a in rows]


@router.patch("/{application_id}/status", response_model=ApplicationRead, dependencies=[RequireCounselor])
async def update_application_status(
    application_id: UUID,
    payload: ApplicationStatusUpdate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> ApplicationRead:
    """Advance the application workflow status (counselor+)."""
    if payload.status not in APPLICATION_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Allowed: {APPLICATION_STATUSES}",
        )
    result = await db.execute(select(Application).where(Application.id == application_id))
    app = result.scalar_one_or_none()
    if app is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")

    history = list(app.status_history or [])
    history.append({
        "status": payload.status,
        "changed_at": datetime.now(UTC).isoformat(),
        "changed_by": str(current_user.id),
        "note": payload.note,
    })
    app.status = payload.status
    app.status_history = history
    if payload.counselor_notes:
        app.counselor_notes = payload.counselor_notes

    await db.commit()
    await db.refresh(app)
    return ApplicationRead.model_validate(app)
