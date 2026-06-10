"""Scholarship schemas."""

import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class ScholarshipCreate(BaseModel):
    """Schema for creating a scholarship."""

    name: str = Field(min_length=2, max_length=255)
    slug: str = Field(min_length=2, max_length=300)
    country: str = Field(max_length=100)
    university: str | None = None
    provider: str | None = None
    level: str | None = None
    coverage_description: str | None = None
    max_amount_usd: float | None = None
    is_fully_funded: bool = False
    eligibility_criteria: str | None = None
    min_cgpa: float | None = None
    fields_of_study: str | None = None
    deadline: date | None = None
    application_url: str | None = None
    description: str | None = None
    is_featured: bool = False


class ScholarshipRead(BaseModel):
    """Scholarship read schema."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    slug: str
    country: str
    university: str | None
    provider: str | None
    level: str | None
    max_amount_usd: float | None
    is_fully_funded: bool
    min_cgpa: float | None
    deadline: date | None
    is_featured: bool
    created_at: datetime


class ScholarshipUpdate(BaseModel):
    """Partial scholarship update."""

    name: str | None = None
    coverage_description: str | None = None
    max_amount_usd: float | None = None
    deadline: date | None = None
    is_active: bool | None = None
    is_featured: bool | None = None
