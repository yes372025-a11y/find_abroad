"""Student application tracker ORM model."""

import uuid

from sqlalchemy import ForeignKey, Index, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import AuditMixin


APPLICATION_STATUSES = [
    "lead",
    "consultation",
    "university_shortlisted",
    "applied",
    "offer_received",
    "visa_processing",
    "completed",
    "rejected",
    "withdrawn",
]


class Application(Base, AuditMixin):
    """University application lifecycle tracker for a student."""

    __tablename__ = "applications"
    __table_args__ = (
        Index("ix_applications_student_id", "student_id"),
        Index("ix_applications_university_id", "university_id"),
        Index("ix_applications_status", "status"),
        {"comment": "Student applications with status workflow"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    student_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    university_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("universities.id", ondelete="SET NULL"),
        nullable=True,
    )
    program_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("programs.id", ondelete="SET NULL"),
        nullable=True,
    )

    # ─── Status ───────────────────────────────────────────────────────────────
    status: Mapped[str] = mapped_column(
        String(50), nullable=False, default="lead"
    )
    intake: Mapped[str | None] = mapped_column(String(20), nullable=True)
    intake_year: Mapped[int | None] = mapped_column(nullable=True)

    # ─── Counselor notes ──────────────────────────────────────────────────────
    counselor_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    rejection_reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    offer_letter_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    visa_decision: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # ─── Timeline snapshots (JSON) ────────────────────────────────────────────
    status_history: Mapped[list | None] = mapped_column(
        JSONB, nullable=True, comment="Array of {status, changed_at, changed_by, note}"
    )

    student: Mapped["User"] = relationship("User", back_populates="applications")
    university: Mapped["University | None"] = relationship("University")  # noqa: F821
    program: Mapped["Program | None"] = relationship("Program")  # noqa: F821

    def __repr__(self) -> str:
        return f"<Application id={self.id} status={self.status}>"
