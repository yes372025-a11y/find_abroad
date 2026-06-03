"""Lead capture and CRM sync model."""

import uuid

from sqlalchemy import Index, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import AuditMixin


class Lead(Base, AuditMixin):
    """Captured lead from any acquisition source."""

    __tablename__ = "leads"
    __table_args__ = (
        Index("ix_leads_email", "email"),
        Index("ix_leads_source", "source"),
        Index("ix_leads_status", "status"),
        {"comment": "Leads from all acquisition channels"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)

    # ─── Source tracking ───────────────────────────────────────────────────────
    source: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        comment="contact_form|loan_tool|scholarship|consultation|blog",
    )
    utm_source: Mapped[str | None] = mapped_column(String(100), nullable=True)
    utm_medium: Mapped[str | None] = mapped_column(String(100), nullable=True)
    utm_campaign: Mapped[str | None] = mapped_column(String(100), nullable=True)
    page_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # ─── Status ────────────────────────────────────────────────────────────────
    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="new",
        comment="new|contacted|qualified|converted|lost",
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    counselor_assigned: Mapped[str | None] = mapped_column(String(255), nullable=True)

    # ─── Interest ─────────────────────────────────────────────────────────────
    target_country: Mapped[str | None] = mapped_column(String(100), nullable=True)
    target_program: Mapped[str | None] = mapped_column(String(255), nullable=True)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)

    # ─── CRM sync ─────────────────────────────────────────────────────────────
    erpnext_lead_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    crm_synced_at: Mapped[str | None] = mapped_column(String(50), nullable=True)
    extra_data: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

    def __repr__(self) -> str:
        return f"<Lead id={self.id} email={self.email} source={self.source}>"
