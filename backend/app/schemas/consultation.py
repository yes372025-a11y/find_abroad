"""Consultation schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ConsultationCreate(BaseModel):
    """Schema for booking a consultation."""

    scheduled_at: datetime
    duration_minutes: int = Field(default=30, ge=15, le=120)
    consultation_type: str = "video"
    topic: str | None = Field(default=None, max_length=255)
    student_notes: str | None = None


class ConsultationRead(BaseModel):
    """Consultation read schema."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    student_id: uuid.UUID
    counselor_id: uuid.UUID | None
    scheduled_at: datetime
    duration_minutes: int
    consultation_type: str
    status: str
    topic: str | None
    meeting_link: str | None
    created_at: datetime


class ConsultationUpdate(BaseModel):
    """Schema for updating a consultation."""

    status: str | None = None
    counselor_notes: str | None = None
    meeting_link: str | None = None
    action_items: str | None = None
    rating: int | None = Field(default=None, ge=1, le=5)
    feedback: str | None = None
