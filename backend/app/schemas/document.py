"""Document schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DocumentRead(BaseModel):
    """Document read schema."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    owner_id: uuid.UUID
    application_id: uuid.UUID | None
    doc_type: str
    original_filename: str
    mime_type: str
    file_size_bytes: int
    is_verified: bool
    notes: str | None
    created_at: datetime


class DocumentUpdate(BaseModel):
    """Admin update for document verification."""

    is_verified: bool | None = None
    notes: str | None = None
