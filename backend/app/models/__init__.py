"""SQLAlchemy ORM models."""

from app.models.application import Application
from app.models.base import AuditMixin, TimestampMixin
from app.models.consultation import Consultation
from app.models.document import Document
from app.models.lead import Lead
from app.models.lender import Lender, LoanAssessment
from app.models.scholarship import Scholarship
from app.models.university import Program, University
from app.models.user import Student, User

__all__ = [
    "AuditMixin",
    "TimestampMixin",
    "User",
    "Student",
    "Lead",
    "University",
    "Program",
    "Scholarship",
    "Lender",
    "LoanAssessment",
    "Consultation",
    "Application",
    "Document",
]
