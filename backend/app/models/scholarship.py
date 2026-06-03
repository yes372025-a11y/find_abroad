"""Scholarship ORM model."""

import uuid
from datetime import date

from sqlalchemy import Boolean, Date, Index, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import AuditMixin


class Scholarship(Base, AuditMixin):
    """Scholarship opportunity searchable by students."""

    __tablename__ = "scholarships"
    __table_args__ = (
        Index("ix_scholarships_country", "country"),
        Index("ix_scholarships_deadline", "deadline"),
        Index("ix_scholarships_slug", "slug", unique=True),
        {"comment": "Scholarship database for student exploration"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(300), nullable=False, unique=True)
    country: Mapped[str] = mapped_column(String(100), nullable=False)
    university: Mapped[str | None] = mapped_column(String(255), nullable=True)
    provider: Mapped[str | None] = mapped_column(String(255), nullable=True)
    level: Mapped[str | None] = mapped_column(
        String(50), nullable=True, comment="bachelor|master|phd|any"
    )

    # ─── Coverage ─────────────────────────────────────────────────────────────
    coverage_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    max_amount_usd: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    is_fully_funded: Mapped[bool] = mapped_column(Boolean, default=False)

    # ─── Eligibility ──────────────────────────────────────────────────────────
    eligibility_criteria: Mapped[str | None] = mapped_column(Text, nullable=True)
    min_cgpa: Mapped[float | None] = mapped_column(nullable=True)
    fields_of_study: Mapped[str | None] = mapped_column(String(500), nullable=True)
    nationalities_eligible: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ─── Dates ────────────────────────────────────────────────────────────────
    deadline: Mapped[date | None] = mapped_column(Date, nullable=True)
    application_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)

    meta_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    meta_description: Mapped[str | None] = mapped_column(String(500), nullable=True)

    def __repr__(self) -> str:
        return f"<Scholarship id={self.id} name={self.name} country={self.country}>"
