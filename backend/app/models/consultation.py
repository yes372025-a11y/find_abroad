"""Consultation booking ORM model."""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import AuditMixin


class Consultation(Base, AuditMixin):
    """Scheduled consultation session between student and counselor."""

    __tablename__ = "consultations"
    __table_args__ = (
        Index("ix_consultations_student_id", "student_id"),
        Index("ix_consultations_counselor_id", "counselor_id"),
        Index("ix_consultations_status", "status"),
        Index("ix_consultations_scheduled_at", "scheduled_at"),
        {"comment": "Consultation bookings between students and counselors"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    student_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    counselor_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )

    # ─── Booking details ───────────────────────────────────────────────────────
    scheduled_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    duration_minutes: Mapped[int] = mapped_column(default=30, nullable=False)
    consultation_type: Mapped[str] = mapped_column(
        String(50), nullable=False, default="video",
        comment="video|phone|in_person"
    )
    status: Mapped[str] = mapped_column(
        String(30), nullable=False, default="scheduled",
        comment="scheduled|confirmed|completed|cancelled|no_show"
    )

    # ─── Content ──────────────────────────────────────────────────────────────
    topic: Mapped[str | None] = mapped_column(String(255), nullable=True)
    student_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    counselor_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    meeting_link: Mapped[str | None] = mapped_column(String(500), nullable=True)
    calcom_booking_id: Mapped[str | None] = mapped_column(String(100), nullable=True)

    # ─── Follow-up ────────────────────────────────────────────────────────────
    action_items: Mapped[str | None] = mapped_column(Text, nullable=True)
    next_steps: Mapped[str | None] = mapped_column(Text, nullable=True)
    rating: Mapped[int | None] = mapped_column(nullable=True)
    feedback: Mapped[str | None] = mapped_column(Text, nullable=True)

    student: Mapped["User"] = relationship(
        "User", back_populates="consultations", foreign_keys=[student_id]
    )
    counselor: Mapped["User | None"] = relationship(
        "User", foreign_keys=[counselor_id]
    )

    def __repr__(self) -> str:
        return f"<Consultation id={self.id} status={self.status}>"
