"""User and Student ORM models."""

import uuid

from sqlalchemy import Boolean, Date, ForeignKey, Index, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.core.security import UserRole
from app.models.base import AuditMixin


class User(Base, AuditMixin):
    """Platform user with authentication credentials."""

    __tablename__ = "users"
    __table_args__ = (
        Index("ix_users_email", "email", unique=True),
        Index("ix_users_role", "role"),
        {"comment": "Platform users with role-based access"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    role: Mapped[str] = mapped_column(
        String(20), nullable=False, default=UserRole.STUDENT.value
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # ─── Relationships ─────────────────────────────────────────────────────────
    student_profile: Mapped["Student | None"] = relationship(
        "Student", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    consultations: Mapped[list["Consultation"]] = relationship(  # noqa: F821
        "Consultation", back_populates="student", foreign_keys="Consultation.student_id"
    )
    applications: Mapped[list["Application"]] = relationship(  # noqa: F821
        "Application", back_populates="student"
    )
    documents: Mapped[list["Document"]] = relationship(  # noqa: F821
        "Document", back_populates="owner"
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email} role={self.role}>"


class Student(Base, AuditMixin):
    """Extended student profile linked to a User."""

    __tablename__ = "students"
    __table_args__ = (
        Index("ix_students_user_id", "user_id", unique=True),
        {"comment": "Extended student academic and personal profile"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )

    # ─── Academic details ──────────────────────────────────────────────────────
    cgpa: Mapped[float | None] = mapped_column(nullable=True)
    work_experience_years: Mapped[int | None] = mapped_column(nullable=True)
    highest_qualification: Mapped[str | None] = mapped_column(String(100), nullable=True)
    undergraduate_university: Mapped[str | None] = mapped_column(String(255), nullable=True)
    undergraduate_field: Mapped[str | None] = mapped_column(String(255), nullable=True)
    graduation_year: Mapped[int | None] = mapped_column(nullable=True)

    # ─── Financial details ─────────────────────────────────────────────────────
    family_income_annual: Mapped[float | None] = mapped_column(nullable=True)
    has_co_applicant: Mapped[bool] = mapped_column(Boolean, default=False)
    has_collateral: Mapped[bool] = mapped_column(Boolean, default=False)
    collateral_value: Mapped[float | None] = mapped_column(nullable=True)

    # ─── Preferences ──────────────────────────────────────────────────────────
    target_countries: Mapped[str | None] = mapped_column(Text, nullable=True)
    target_programs: Mapped[str | None] = mapped_column(Text, nullable=True)
    budget_usd: Mapped[float | None] = mapped_column(nullable=True)
    intended_intake: Mapped[str | None] = mapped_column(String(20), nullable=True)

    # ─── Test scores ──────────────────────────────────────────────────────────
    ielts_score: Mapped[float | None] = mapped_column(nullable=True)
    toefl_score: Mapped[int | None] = mapped_column(nullable=True)
    gre_score: Mapped[int | None] = mapped_column(nullable=True)
    gmat_score: Mapped[int | None] = mapped_column(nullable=True)

    # ─── Relationships ─────────────────────────────────────────────────────────
    user: Mapped["User"] = relationship("User", back_populates="student_profile")

    def __repr__(self) -> str:
        return f"<Student id={self.id} user_id={self.user_id}>"
