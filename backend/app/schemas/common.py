"""Shared pagination and response schemas."""

from typing import Generic, TypeVar
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

T = TypeVar("T")


class PageMeta(BaseModel):
    """Pagination metadata."""

    total: int
    page: int
    per_page: int
    pages: int


class Page(BaseModel, Generic[T]):
    """Generic paginated response envelope."""

    items: list[T]
    meta: PageMeta


class MessageResponse(BaseModel):
    """Simple message response."""

    message: str


class IDResponse(BaseModel):
    """Response containing a created resource ID."""

    id: UUID
