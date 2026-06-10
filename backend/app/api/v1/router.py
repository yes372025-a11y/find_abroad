"""Central v1 API router — mounts all domain routers."""

from fastapi import APIRouter

from app.api.v1 import (
    applications,
    auth,
    consultations,
    documents,
    health,
    leads,
    lenders,
    scholarships,
    universities,
    users,
)

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(leads.router, prefix="/leads", tags=["leads"])
api_router.include_router(universities.router, prefix="/universities", tags=["universities"])
api_router.include_router(scholarships.router, prefix="/scholarships", tags=["scholarships"])
api_router.include_router(lenders.router, prefix="/lenders", tags=["lenders"])
api_router.include_router(consultations.router, prefix="/consultations", tags=["consultations"])
api_router.include_router(applications.router, prefix="/applications", tags=["applications"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
