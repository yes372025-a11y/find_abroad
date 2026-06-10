"""User profile management endpoints."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.middleware.auth import CurrentUser, RequireAdmin
from app.schemas.user import StudentProfileUpdate, UserRead, UserUpdate
from app.services.user_service import UserService

router = APIRouter()


@router.patch("/me", response_model=UserRead)
async def update_profile(
    payload: UserUpdate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> UserRead:
    """Update the authenticated user's profile."""
    service = UserService(db)
    user = await service.update(current_user, payload)
    await db.commit()
    await db.refresh(user)
    return UserRead.model_validate(user)


@router.patch("/me/student-profile", response_model=dict)
async def update_student_profile(
    payload: StudentProfileUpdate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> dict:
    """Update the student's academic and financial profile."""
    service = UserService(db)
    await service.update_student_profile(current_user, payload)
    await db.commit()
    return {"message": "Student profile updated successfully"}
