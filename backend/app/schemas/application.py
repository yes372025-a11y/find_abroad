"""Application tracker schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ApplicationCreate(BaseModel):
    """Schema for creating a student application."""

    university_id: uuid.UUID | None = None
    program_id: uuid.UUID | None = None
    intake: str | None = None
    intake_year: int | None = None


class ApplicationRead(BaseModel):
    """Application read schema."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    student_id: uuid.UUID
    university_id: uuid.UUID | None
    program_id: uuid.UUID | None
    status: str
    intake: str | None
    intake_year: int | None
    counselor_notes: str | None
    offer_letter_url: str | None
    visa_decision: str | None
    status_history: list | None
    created_at: datetime
    updated_at: datetime


class ApplicationStatusUpdate(BaseModel):
    """Update an application's workflow status."""

    status: str
    note: str | None = None
    counselor_notes: str | None = None
