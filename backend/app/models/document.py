"""Document vault ORM model."""

import uuid

from sqlalchemy import BigInteger, ForeignKey, Index, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import AuditMixin

DOCUMENT_TYPES = [
    "passport",
    "sop",
    "lor",
    "mark_sheet",
    "offer_letter",
    "bank_statement",
    "visa",
    "other",
]


class Document(Base, AuditMixin):
    """Uploaded document in the secure student document vault."""

    __tablename__ = "documents"
    __table_args__ = (
        Index("ix_documents_owner_id", "owner_id"),
        Index("ix_documents_doc_type", "doc_type"),
        {"comment": "Uploaded student documents with role-based access"},
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    owner_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    application_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("applications.id", ondelete="SET NULL"),
        nullable=True,
    )

    doc_type: Mapped[str] = mapped_column(String(50), nullable=False)
    original_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    stored_path: Mapped[str] = mapped_column(String(500), nullable=False)
    mime_type: Mapped[str] = mapped_column(String(100), nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(BigInteger, nullable=False)
    checksum_sha256: Mapped[str | None] = mapped_column(String(64), nullable=True)

    # ─── Access control ────────────────────────────────────────────────────────
    is_verified: Mapped[bool] = mapped_column(default=False)
    verified_by: Mapped[str | None] = mapped_column(String(36), nullable=True)
    notes: Mapped[str | None] = mapped_column(String(500), nullable=True)

    owner: Mapped["User"] = relationship("User", back_populates="documents")

    def __repr__(self) -> str:
        return f"<Document id={self.id} type={self.doc_type} owner={self.owner_id}>"
