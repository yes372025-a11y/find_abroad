"""Lender and Loan Assessment ORM models."""

import uuid

from sqlalchemy import Boolean, ForeignKey, Index, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import AuditMixin


class Lender(Base, AuditMixin):
    """Education loan lender with configurable terms."""

    __tablename__ = "lenders"
    __table_args__ = (
        Index("ix_lenders_slug", "slug", unique=True),
        Index("ix_lenders_is_active", "is_active"),
        {"comment": "Education loan lenders for comparison tool"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(300), nullable=False, unique=True)
    logo_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    website_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    lender_type: Mapped[str] = mapped_column(
        String(50), nullable=False, default="bank",
        comment="bank|nbfc|government|fintech"
    )

    # ─── Loan terms ────────────────────────────────────────────────────────────
    interest_rate_min: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    interest_rate_max: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    processing_fee_pct: Mapped[float | None] = mapped_column(
        Numeric(5, 2), nullable=True
    )
    max_loan_amount_usd: Mapped[float] = mapped_column(Numeric(14, 2), nullable=False)
    min_loan_amount_usd: Mapped[float | None] = mapped_column(
        Numeric(14, 2), nullable=True
    )
    moratorium_months: Mapped[int | None] = mapped_column(nullable=True)
    repayment_tenure_months: Mapped[int | None] = mapped_column(nullable=True)
    approval_days: Mapped[int | None] = mapped_column(nullable=True)

    # ─── Requirements ──────────────────────────────────────────────────────────
    requires_collateral: Mapped[bool] = mapped_column(Boolean, default=False)
    collateral_description: Mapped[str | None] = mapped_column(
        String(500), nullable=True
    )
    requires_co_applicant: Mapped[bool] = mapped_column(Boolean, default=False)
    min_family_income_usd: Mapped[float | None] = mapped_column(
        Numeric(12, 2), nullable=True
    )
    eligible_countries: Mapped[str | None] = mapped_column(Text, nullable=True)
    eligible_programs: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ─── Display ──────────────────────────────────────────────────────────────
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    display_order: Mapped[int] = mapped_column(default=0)
    cta_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    loan_assessments: Mapped[list["LoanAssessment"]] = relationship(
        "LoanAssessment", back_populates="lender"
    )

    def __repr__(self) -> str:
        return f"<Lender id={self.id} name={self.name}>"


class LoanAssessment(Base, AuditMixin):
    """Result of a student's loan eligibility assessment."""

    __tablename__ = "loan_assessments"
    __table_args__ = (
        Index("ix_loan_assessments_lead_id", "lead_id"),
        {"comment": "Loan eligibility assessment results"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    lead_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("leads.id"), nullable=True
    )
    lender_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("lenders.id"), nullable=True
    )

    # ─── Input snapshot ────────────────────────────────────────────────────────
    target_country: Mapped[str | None] = mapped_column(String(100), nullable=True)
    target_course: Mapped[str | None] = mapped_column(String(255), nullable=True)
    target_university: Mapped[str | None] = mapped_column(String(255), nullable=True)
    cgpa: Mapped[float | None] = mapped_column(nullable=True)
    work_experience_years: Mapped[int | None] = mapped_column(nullable=True)
    family_income_usd: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    has_co_applicant: Mapped[bool] = mapped_column(Boolean, default=False)
    has_collateral: Mapped[bool] = mapped_column(Boolean, default=False)
    collateral_value_usd: Mapped[float | None] = mapped_column(
        Numeric(12, 2), nullable=True
    )

    # ─── Output ───────────────────────────────────────────────────────────────
    estimated_eligibility_amount: Mapped[float | None] = mapped_column(
        Numeric(14, 2), nullable=True
    )
    eligible_lender_ids: Mapped[list | None] = mapped_column(JSONB, nullable=True)
    assessment_result: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    session_id: Mapped[str | None] = mapped_column(String(100), nullable=True)

    lender: Mapped["Lender | None"] = relationship(
        "Lender", back_populates="loan_assessments"
    )

    def __repr__(self) -> str:
        return f"<LoanAssessment id={self.id}>"
