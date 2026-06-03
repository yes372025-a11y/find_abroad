"""AI features: SOP assistant, university recommendation via Ollama."""

from typing import Any

import httpx
import structlog

from app.core.config import settings

logger = structlog.get_logger(__name__)

SYSTEM_SOP = """You are an expert academic writing assistant specializing in
Statements of Purpose (SOP) for international university applications.
Generate a compelling, personalized SOP draft based on the student's profile.
Use formal academic English, avoid clichés, and highlight unique strengths."""

SYSTEM_LOR = """You are an expert academic writing assistant. Generate a
professional Letter of Recommendation (LOR) template that a professor or
employer can customize. Base it on the student's background and achievements."""

SYSTEM_UNI = """You are a study abroad counselor. Recommend universities based
on the student's profile. Return a JSON array of objects with fields:
name, country, program, reason, fit_score (1-10). Max 5 recommendations."""


class AIService:
    """Wrapper around Ollama for AI-powered student assistance."""

    def __init__(self) -> None:
        self._base_url = str(settings.ollama_url)
        self._model = settings.ollama_model

    async def generate_sop(self, student_data: dict[str, Any]) -> str:
        """Generate a Statement of Purpose draft."""
        prompt = self._build_sop_prompt(student_data)
        return await self._chat(SYSTEM_SOP, prompt)

    async def generate_lor(self, student_data: dict[str, Any]) -> str:
        """Generate a Letter of Recommendation template."""
        prompt = self._build_lor_prompt(student_data)
        return await self._chat(SYSTEM_LOR, prompt)

    async def recommend_universities(
        self, cgpa: float, budget_usd: float, countries: list[str], program: str
    ) -> list[dict[str, Any]]:
        """Return AI-recommended universities as structured data."""
        prompt = (
            f"Student profile:\n"
            f"- CGPA: {cgpa}\n"
            f"- Budget: ${budget_usd:,.0f} USD/year\n"
            f"- Preferred countries: {', '.join(countries)}\n"
            f"- Program: {program}\n\n"
            "Recommend the best-fit universities. Return JSON only."
        )
        raw = await self._chat(SYSTEM_UNI, prompt)
        try:
            import json  # noqa: PLC0415
            start = raw.find("[")
            end = raw.rfind("]") + 1
            return json.loads(raw[start:end])
        except Exception:
            logger.warning("ai_json_parse_failed", raw=raw[:200])
            return []

    async def _chat(self, system: str, user: str) -> str:
        """Send a chat completion request to Ollama."""
        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.post(
                f"{self._base_url}/api/chat",
                json={
                    "model": self._model,
                    "messages": [
                        {"role": "system", "content": system},
                        {"role": "user", "content": user},
                    ],
                    "stream": False,
                },
            )
            resp.raise_for_status()
            data = resp.json()
            return data["message"]["content"]

    def _build_sop_prompt(self, data: dict[str, Any]) -> str:
        return (
            f"Generate a 600-word SOP for:\n"
            f"Name: {data.get('name', 'Student')}\n"
            f"Program: {data.get('program', '')}\n"
            f"University: {data.get('university', '')}\n"
            f"CGPA: {data.get('cgpa', '')}\n"
            f"Work Experience: {data.get('work_experience', 'None')}\n"
            f"Goals: {data.get('goals', '')}\n"
            f"Background: {data.get('background', '')}"
        )

    def _build_lor_prompt(self, data: dict[str, Any]) -> str:
        return (
            f"Generate a LOR template for:\n"
            f"Student: {data.get('name', 'Student')}\n"
            f"Program applied: {data.get('program', '')}\n"
            f"Recommender type: {data.get('recommender_type', 'Professor')}\n"
            f"Key achievements: {data.get('achievements', '')}"
        )
