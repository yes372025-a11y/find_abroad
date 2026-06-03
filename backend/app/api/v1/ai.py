"""AI-powered endpoints: SOP, LOR, university recommendations."""

from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.middleware.auth import CurrentUser
from app.services.ai_service import AIService

router = APIRouter()


class SOPRequest(BaseModel):
    """Inputs for SOP generation."""

    program: str
    university: str
    goals: str
    background: str
    achievements: str | None = None


class LORRequest(BaseModel):
    """Inputs for LOR template generation."""

    program: str
    recommender_type: str = "Professor"
    achievements: str


class UniversityRecommendationRequest(BaseModel):
    """Inputs for AI university recommendation."""

    cgpa: float
    budget_usd: float
    countries: list[str]
    program: str


@router.post("/sop", response_model=dict)
async def generate_sop(
    payload: SOPRequest,
    current_user: CurrentUser,
) -> dict[str, Any]:
    """Generate a personalized SOP draft using Ollama."""
    service = AIService()
    try:
        sop = await service.generate_sop({
            "name": current_user.full_name,
            **payload.model_dump(),
        })
        return {"sop_draft": sop, "word_count": len(sop.split())}
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"AI service unavailable: {exc}",
        )


@router.post("/lor", response_model=dict)
async def generate_lor(
    payload: LORRequest,
    current_user: CurrentUser,
) -> dict[str, Any]:
    """Generate a LOR template using Ollama."""
    service = AIService()
    try:
        lor = await service.generate_lor({
            "name": current_user.full_name,
            **payload.model_dump(),
        })
        return {"lor_template": lor}
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"AI service unavailable: {exc}",
        )


@router.post("/recommend-universities", response_model=list[dict])
async def recommend_universities(
    payload: UniversityRecommendationRequest,
    current_user: CurrentUser,
) -> list[dict[str, Any]]:
    """Return AI-powered university recommendations."""
    service = AIService()
    try:
        return await service.recommend_universities(
            cgpa=payload.cgpa,
            budget_usd=payload.budget_usd,
            countries=payload.countries,
            program=payload.program,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"AI service unavailable: {exc}",
        )
