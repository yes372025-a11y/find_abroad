"""Lead capture service."""

import math
import uuid

import structlog
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lead import Lead
from app.schemas.common import Page, PageMeta
from app.schemas.lead import LeadCreate, LeadRead, LeadUpdate

logger = structlog.get_logger(__name__)


class LeadService:
    """Manages lead capture and storage."""

    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    async def capture(self, payload: LeadCreate) -> Lead:
        """Persist a new lead."""
        lead = Lead(**payload.model_dump())
        lead.id = uuid.uuid4()
        self._db.add(lead)
        await self._db.flush()
        return lead

    async def get_page(
        self, page: int = 1, per_page: int = 20, status: str | None = None
    ) -> Page[LeadRead]:
        """Return a paginated list of leads with optional status filter."""
        query = select(Lead).where(Lead.deleted_at.is_(None))
        if status:
            query = query.where(Lead.status == status)

        count_query = select(func.count()).select_from(query.subquery())
        total = (await self._db.execute(count_query)).scalar_one()

        offset = (page - 1) * per_page
        leads_result = await self._db.execute(
            query.order_by(Lead.created_at.desc()).offset(offset).limit(per_page)
        )
        leads = leads_result.scalars().all()

        return Page(
            items=[LeadRead.model_validate(lead) for lead in leads],
            meta=PageMeta(
                total=total,
                page=page,
                per_page=per_page,
                pages=math.ceil(total / per_page) if total else 0,
            ),
        )

    async def update(self, lead_id: uuid.UUID, payload: LeadUpdate) -> Lead | None:
        """Update a lead's status, notes, or assigned counselor."""
        result = await self._db.execute(
            select(Lead).where(Lead.id == lead_id, Lead.deleted_at.is_(None))
        )
        lead = result.scalar_one_or_none()
        if lead is None:
            return None
        for field, value in payload.model_dump(exclude_none=True).items():
            setattr(lead, field, value)
        return lead
