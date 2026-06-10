"""Document vault endpoints — secure file upload and retrieval."""

import hashlib
import uuid
from pathlib import Path
from typing import Annotated
from uuid import UUID

import aiofiles
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.middleware.auth import CurrentUser, RequireAdmin
from app.models.document import DOCUMENT_TYPES, Document
from app.schemas.document import DocumentRead, DocumentUpdate

router = APIRouter()


@router.post("", response_model=DocumentRead, status_code=status.HTTP_201_CREATED)
async def upload_document(
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
    file: UploadFile = File(...),
    doc_type: str = Form(...),
    application_id: str | None = Form(default=None),
) -> DocumentRead:
    """Upload a document to the secure vault."""
    if doc_type not in DOCUMENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid doc_type. Allowed: {DOCUMENT_TYPES}",
        )

    ext = Path(file.filename or "file").suffix.lower().lstrip(".")
    if ext not in settings.allowed_upload_types_list:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"File type .{ext} not allowed",
        )

    content = await file.read()
    if len(content) > settings.max_upload_size_mb * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds {settings.max_upload_size_mb}MB limit",
        )

    checksum = hashlib.sha256(content).hexdigest()
    doc_id = uuid.uuid4()
    user_dir = Path(settings.upload_dir) / str(current_user.id)
    user_dir.mkdir(parents=True, exist_ok=True)
    stored_filename = f"{doc_id}.{ext}"
    stored_path = user_dir / stored_filename

    async with aiofiles.open(stored_path, "wb") as f:
        await f.write(content)

    doc = Document(
        id=doc_id,
        owner_id=current_user.id,
        application_id=UUID(application_id) if application_id else None,
        doc_type=doc_type,
        original_filename=file.filename or stored_filename,
        stored_path=str(stored_path),
        mime_type=file.content_type or "application/octet-stream",
        file_size_bytes=len(content),
        checksum_sha256=checksum,
    )
    db.add(doc)
    await db.commit()
    await db.refresh(doc)
    return DocumentRead.model_validate(doc)


@router.get("/my", response_model=list[DocumentRead])
async def my_documents(
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> list[DocumentRead]:
    """Return all documents belonging to the current user."""
    rows = (
        await db.execute(
            select(Document)
            .where(Document.owner_id == current_user.id, Document.deleted_at.is_(None))
            .order_by(Document.created_at.desc())
        )
    ).scalars().all()
    return [DocumentRead.model_validate(d) for d in rows]


@router.patch("/{document_id}", response_model=DocumentRead, dependencies=[RequireAdmin])
async def verify_document(
    document_id: UUID,
    payload: DocumentUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> DocumentRead:
    """Mark a document as verified (admin only)."""
    result = await db.execute(select(Document).where(Document.id == document_id))
    doc = result.scalar_one_or_none()
    if doc is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(doc, field, value)
    await db.commit()
    await db.refresh(doc)
    return DocumentRead.model_validate(doc)
