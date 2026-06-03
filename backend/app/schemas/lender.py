"""Lender and loan assessment schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class LenderCreate(BaseModel):
    """Schema for creating a lender."""

    name: str = Field(min_length=2, max_length=255)
    slug: str = Field(min_length=2, max_length=300)
    logo_url: str | None = None
    website_url: str | None = None
    description: str | None = None
    lender_type: str = "bank"
    interest_rate_min: float = Field(ge=0, le=100)
    interest_rate_max: float = Field(ge=0, le=100)
    processing_fee_pct: float | None = None
    max_loan_amount_usd: float = Field(ge=0)
    min_loan_amount_usd: float | None = None
    moratorium_months: int | None = None
    repayment_tenure_months: int | None = None
    approval_days: int | None = None
    requires_collateral: bool = False
    requires_co_applicant: bool = False
    min_family_income_usd: float | None = None
    eligible_countries: str | None = None
    is_featured: bool = False
    cta_url: str | None = None


class LenderRead(BaseModel):
    """Lender read schema."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    slug: str
    logo_url: str | None
    lender_type: str
    interest_rate_min: float
    interest_rate_max: float
    max_loan_amount_usd: float
    moratorium_months: int | None
    approval_days: int | None
    requires_collateral: bool
    requires_co_applicant: bool
    is_featured: bool
    cta_url: str | None
    created_at: datetime


class LoanAssessmentCreate(BaseModel):
    """Multi-step loan eligibility assessment input."""

    target_country: str
    target_course: str
    target_university: str | None = None
    cgpa: float | None = Field(default=None, ge=0.0, le=10.0)
    work_experience_years: int | None = Field(default=None, ge=0)
    family_income_usd: float | None = Field(default=None, ge=0)
    has_co_applicant: bool = False
    has_collateral: bool = False
    collateral_value_usd: float | None = None
    email: str | None = None
    full_name: str | None = None
    phone: str | None = None


class LoanAssessmentRead(BaseModel):
    """Loan assessment result."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    estimated_eligibility_amount: float | None
    eligible_lender_ids: list | None
    assessment_result: dict | None
    created_at: datetime
