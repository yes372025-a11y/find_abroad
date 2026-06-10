"""User-related Pydantic schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    """Shared user fields."""

    email: EmailStr
    full_name: str = Field(min_length=2, max_length=255)
    phone: str | None = Field(default=None, max_length=20)


class UserCreate(UserBase):
    """Schema for new user registration."""

    password: str = Field(min_length=8, max_length=100)


class UserUpdate(BaseModel):
    """Schema for partial user updates."""

    full_name: str | None = Field(default=None, min_length=2, max_length=255)
    phone: str | None = Field(default=None, max_length=20)
    avatar_url: str | None = None


class UserRead(UserBase):
    """Public user representation."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    role: str
    is_active: bool
    is_verified: bool
    avatar_url: str | None
    created_at: datetime


class StudentProfileUpdate(BaseModel):
    """Schema for updating the student profile."""

    cgpa: float | None = Field(default=None, ge=0.0, le=10.0)
    work_experience_years: int | None = Field(default=None, ge=0)
    highest_qualification: str | None = None
    undergraduate_university: str | None = None
    undergraduate_field: str | None = None
    graduation_year: int | None = Field(default=None, ge=1990, le=2030)
    family_income_annual: float | None = Field(default=None, ge=0)
    has_co_applicant: bool = False
    has_collateral: bool = False
    collateral_value: float | None = None
    target_countries: str | None = None
    target_programs: str | None = None
    budget_usd: float | None = None
    intended_intake: str | None = None
    ielts_score: float | None = Field(default=None, ge=0.0, le=9.0)
    toefl_score: int | None = Field(default=None, ge=0, le=120)
    gre_score: int | None = Field(default=None, ge=0, le=340)
    gmat_score: int | None = Field(default=None, ge=0, le=800)


class TokenResponse(BaseModel):
    """JWT token pair response."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    """Login credentials."""

    email: EmailStr
    password: str
