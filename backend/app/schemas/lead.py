"""Lead schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, HttpUrl


class LeadCreate(BaseModel):
    """Schema for capturing a new lead."""

    email: EmailStr
    full_name: str = Field(min_length=2, max_length=255)
    phone: str | None = Field(default=None, max_length=20)
    source: str = Field(max_length=50)
    target_country: str | None = None
    target_program: str | None = None
    message: str | None = None
    utm_source: str | None = None
    utm_medium: str | None = None
    utm_campaign: str | None = None
    page_url: str | None = None


class LeadRead(BaseModel):
    """Public lead representation."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: str
    full_name: str
    phone: str | None
    source: str
    status: str
    target_country: str | None
    target_program: str | None
    created_at: datetime


class LeadUpdate(BaseModel):
    """Schema for updating a lead's status or notes."""

    status: str | None = None
    notes: str | None = None
    counselor_assigned: str | None = None
