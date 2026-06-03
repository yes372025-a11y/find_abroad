"""University and Program schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class UniversityCreate(BaseModel):
    """Schema for creating a university."""

    name: str = Field(min_length=2, max_length=255)
    slug: str = Field(min_length=2, max_length=300)
    country: str = Field(max_length=100)
    city: str | None = None
    website_url: str | None = None
    logo_url: str | None = None
    description: str | None = None
    world_ranking: int | None = Field(default=None, ge=1)
    qs_ranking: int | None = None
    avg_tuition_usd: float | None = None
    avg_living_cost_usd: float | None = None
    min_cgpa: float | None = None
    min_ielts: float | None = None
    intakes: str | None = None
    is_featured: bool = False
    meta_title: str | None = None
    meta_description: str | None = None


class UniversityRead(BaseModel):
    """University read schema."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    slug: str
    country: str
    city: str | None
    logo_url: str | None
    world_ranking: int | None
    qs_ranking: int | None
    avg_tuition_usd: float | None
    min_cgpa: float | None
    min_ielts: float | None
    intakes: str | None
    is_featured: bool
    created_at: datetime


class UniversityUpdate(BaseModel):
    """Partial university update."""

    name: str | None = None
    description: str | None = None
    world_ranking: int | None = None
    avg_tuition_usd: float | None = None
    is_featured: bool | None = None


class ProgramCreate(BaseModel):
    """Schema for creating a program."""

    university_id: uuid.UUID
    name: str = Field(min_length=2, max_length=255)
    slug: str = Field(min_length=2, max_length=300)
    level: str = Field(max_length=50)
    field: str | None = None
    duration_months: int | None = None
    tuition_usd: float | None = None
    description: str | None = None


class ProgramRead(BaseModel):
    """Program read schema."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    university_id: uuid.UUID
    name: str
    slug: str
    level: str
    field: str | None
    duration_months: int | None
    tuition_usd: float | None
    is_active: bool
    created_at: datetime
