"""Lead capture service with CRM sync."""

import asyncio
import math
import uuid
from datetime import UTC, datetime

import httpx
import structlog
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.lead import Lead
from app.schemas.common import Page, PageMeta
from app.schemas.lead import LeadCreate, LeadRead, LeadUpdate

logger = structlog.get_logger(__name__)


class LeadService:
    """Manages lead capture, storage, and CRM synchronisation."""

    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    async def capture(self, payload: LeadCreate) -> Lead:
        """Persist a new lead and schedule async CRM sync.

        The CRM sync is dispatched as a fire-and-forget asyncio task so it
        never blocks the user's request. The lead is persisted regardless of
        whether ERPNext is reachable.
        """
        lead = Lead(**payload.model_dump())
        lead.id = uuid.uuid4()
        self._db.add(lead)
        await self._db.flush()

        # Fire-and-forget: schedule the CRM sync after this function returns.
        # We pass a plain dict snapshot — never share the ORM object across
        # session boundaries since the session may close before the task runs.
        lead_snapshot = {
            "id": str(lead.id),
            "full_name": lead.full_name,
            "email": lead.email,
            "phone": lead.phone,
            "source": lead.source,
            "target_country": lead.target_country,
        }
        asyncio.create_task(self._sync_to_erpnext_bg(lead_snapshot))
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

    @staticmethod
    async def _sync_to_erpnext_bg(snapshot: dict) -> None:
        """Push a lead snapshot to ERPNext CRM in the background.

        Runs outside the database session — uses only the plain dict snapshot.
        Errors are logged but never propagate.
        """
        if not settings.erpnext_url or not settings.erpnext_api_key:
            return
        try:
            headers = {
                "Authorization": (
                    f"token {settings.erpnext_api_key}:{settings.erpnext_api_secret}"
                ),
                "Content-Type": "application/json",
            }
            payload = {
                "doctype": "Lead",
                "lead_name": snapshot["full_name"],
                "email_id": snapshot["email"],
                "mobile_no": snapshot.get("phone"),
                "source": snapshot["source"],
                "custom_target_country": snapshot.get("target_country"),
            }
            async with httpx.AsyncClient(timeout=10) as client:
                resp = await client.post(
                    f"{settings.erpnext_url}/api/resource/Lead",
                    json=payload,
                    headers=headers,
                )
                resp.raise_for_status()
                logger.info("erpnext_sync_ok", lead_id=snapshot["id"])
        except Exception as exc:
            logger.warning(
                "erpnext_sync_failed", lead_id=snapshot["id"], error=str(exc)
            )
