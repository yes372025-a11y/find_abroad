"""Loan eligibility assessment service."""

import math
import uuid
from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lender import Lender, LoanAssessment
from app.schemas.lender import LoanAssessmentCreate


class LoanService:
    """Computes loan eligibility and matches eligible lenders."""

    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    async def assess(self, payload: LoanAssessmentCreate) -> LoanAssessment:
        """Run eligibility assessment and return matched lenders."""
        eligible_amount = self._compute_eligibility(payload)
        eligible_lenders = await self._match_lenders(payload, eligible_amount)

        assessment = LoanAssessment(
            id=uuid.uuid4(),
            target_country=payload.target_country,
            target_course=payload.target_course,
            target_university=payload.target_university,
            cgpa=payload.cgpa,
            work_experience_years=payload.work_experience_years,
            family_income_usd=payload.family_income_usd,
            has_co_applicant=payload.has_co_applicant,
            has_collateral=payload.has_collateral,
            collateral_value_usd=payload.collateral_value_usd,
            estimated_eligibility_amount=eligible_amount,
            eligible_lender_ids=[str(lid) for lid in eligible_lenders],
            assessment_result=self._build_result_summary(payload, eligible_amount),
        )
        self._db.add(assessment)
        await self._db.flush()
        return assessment

    def _compute_eligibility(self, payload: LoanAssessmentCreate) -> float:
        """Rule-based eligibility computation (admin-configurable in future)."""
        base = 30_000.0  # USD baseline

        # Income multiplier
        if payload.family_income_usd:
            base = max(base, payload.family_income_usd * 4)

        # Collateral boost
        if payload.has_collateral and payload.collateral_value_usd:
            base = max(base, payload.collateral_value_usd * 0.9)

        # Academic boost
        if payload.cgpa and payload.cgpa >= 8.0:
            base *= 1.15

        # Co-applicant boost
        if payload.has_co_applicant:
            base *= 1.1

        return round(min(base, 100_000.0), 2)

    async def _match_lenders(
        self, payload: LoanAssessmentCreate, eligible_amount: float
    ) -> list[uuid.UUID]:
        """Return IDs of lenders whose criteria the student meets."""
        result = await self._db.execute(
            select(Lender).where(Lender.is_active.is_(True))
        )
        lenders: list[Lender] = result.scalars().all()
        matched: list[uuid.UUID] = []

        for lender in lenders:
            if float(lender.max_loan_amount_usd) < eligible_amount * 0.5:
                continue
            if lender.requires_collateral and not payload.has_collateral:
                continue
            if lender.requires_co_applicant and not payload.has_co_applicant:
                continue
            if (
                lender.min_family_income_usd
                and payload.family_income_usd
                and payload.family_income_usd < float(lender.min_family_income_usd)
            ):
                continue
            matched.append(lender.id)

        return matched

    def _build_result_summary(
        self, payload: LoanAssessmentCreate, amount: float
    ) -> dict[str, Any]:
        """Build a structured result dictionary for storage."""
        return {
            "estimated_amount_usd": amount,
            "currency": "USD",
            "factors": {
                "collateral": payload.has_collateral,
                "co_applicant": payload.has_co_applicant,
                "cgpa": payload.cgpa,
                "family_income": payload.family_income_usd,
            },
            "recommendation": (
                "Strong profile — multiple lenders likely to approve"
                if amount >= 50_000
                else "Moderate profile — consider collateral or co-applicant"
            ),
        }
