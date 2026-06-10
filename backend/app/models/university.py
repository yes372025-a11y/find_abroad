"""University and Program ORM models."""

import uuid

from sqlalchemy import Boolean, ForeignKey, Index, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import AuditMixin


class University(Base, AuditMixin):
    """University with metadata for exploration and comparison."""

    __tablename__ = "universities"
    __table_args__ = (
        Index("ix_universities_country", "country"),
        Index("ix_universities_slug", "slug", unique=True),
        Index("ix_universities_ranking", "world_ranking"),
        {"comment": "Universities available for study abroad applications"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(300), nullable=False, unique=True)
    country: Mapped[str] = mapped_column(String(100), nullable=False)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    website_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    logo_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    banner_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ─── Rankings ─────────────────────────────────────────────────────────────
    world_ranking: Mapped[int | None] = mapped_column(Integer, nullable=True)
    qs_ranking: Mapped[int | None] = mapped_column(Integer, nullable=True)
    times_ranking: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # ─── Financials ───────────────────────────────────────────────────────────
    avg_tuition_usd: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    avg_living_cost_usd: Mapped[float | None] = mapped_column(
        Numeric(12, 2), nullable=True
    )

    # ─── Admissions ───────────────────────────────────────────────────────────
    min_cgpa: Mapped[float | None] = mapped_column(nullable=True)
    min_ielts: Mapped[float | None] = mapped_column(nullable=True)
    min_toefl: Mapped[int | None] = mapped_column(Integer, nullable=True)
    acceptance_rate: Mapped[float | None] = mapped_column(nullable=True)
    intakes: Mapped[str | None] = mapped_column(String(100), nullable=True)

    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # ─── SEO ──────────────────────────────────────────────────────────────────
    meta_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    meta_description: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # ─── Relationships ─────────────────────────────────────────────────────────
    programs: Mapped[list["Program"]] = relationship(
        "Program", back_populates="university", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<University id={self.id} name={self.name} country={self.country}>"


class Program(Base, AuditMixin):
    """Academic program offered by a university."""

    __tablename__ = "programs"
    __table_args__ = (
        Index("ix_programs_university_id", "university_id"),
        Index("ix_programs_level", "level"),
        Index("ix_programs_slug", "slug", unique=True),
        {"comment": "Degree programs linked to universities"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    university_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("universities.id", ondelete="CASCADE"),
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(300), nullable=False, unique=True)
    level: Mapped[str] = mapped_column(
        String(50), nullable=False, comment="bachelor|master|phd|diploma|certificate"
    )
    field: Mapped[str | None] = mapped_column(String(100), nullable=True)
    duration_months: Mapped[int | None] = mapped_column(Integer, nullable=True)
    tuition_usd: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    requirements: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    university: Mapped["University"] = relationship(
        "University", back_populates="programs"
    )

    def __repr__(self) -> str:
        return f"<Program id={self.id} name={self.name}>"
