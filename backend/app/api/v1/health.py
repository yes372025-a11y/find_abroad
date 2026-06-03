"""Health check endpoint."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HealthResponse(BaseModel):
    """API health status."""

    status: str
    version: str
    environment: str


@router.get("", response_model=HealthResponse, summary="Health check")
async def health_check() -> HealthResponse:
    """Return API health status."""
    from app.core.config import settings

    return HealthResponse(
        status="ok",
        version=settings.app_version,
        environment=settings.app_env,
    )
