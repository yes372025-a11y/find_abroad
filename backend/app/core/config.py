"""Application configuration using pydantic-settings."""

from functools import lru_cache
from typing import Any

from pydantic import PostgresDsn, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Central configuration loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ─── Application ────────────────────────────────────────────────────────────
    app_name: str = "Find Abroad API"
    app_version: str = "0.1.0"
    app_env: str = "development"
    app_debug: bool = False
    app_secret_key: str

    # ─── CORS ──────────────────────────────────────────────────────────────────
    # Stored as a raw comma-separated string to avoid pydantic-settings 2.7+
    # attempting JSON-decode on list[str] fields before validators run.
    cors_origins: str = "http://localhost:3000,https://3xt8kq12-3000.inc1.devtunnels.ms,https://friendly-robot-p7jpxpvx96g7h6wqw-3000.app.github.dev"

    @property
    def cors_origins_list(self) -> list[str]:
        """Return CORS origins as a list, split on commas."""
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    # ─── Database ──────────────────────────────────────────────────────────────
    database_url: PostgresDsn

    @field_validator("database_url", mode="before")
    @classmethod
    def coerce_async_driver(cls, v: Any) -> Any:
        """Normalise postgres:// and postgresql:// to postgresql+asyncpg://."""
        if isinstance(v, str):
            if v.startswith("postgres://"):
                v = v.replace("postgres://", "postgresql+asyncpg://", 1)
            elif v.startswith("postgresql://"):
                v = v.replace("postgresql://", "postgresql+asyncpg://", 1)
        return v

    # ─── JWT ───────────────────────────────────────────────────────────────────
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    jwt_refresh_token_expire_days: int = 7

    # ─── Default counselor seed ──────────────────────────────────────────────
    counselor_email: str | None = None
    counselor_password: str | None = None
    counselor_name: str = "Find Abroad Counselor"

    # ─── File storage ──────────────────────────────────────────────────────────
    upload_dir: str = "/app/uploads"
    max_upload_size_mb: int = 10
    # Stored as comma-separated string for the same reason as cors_origins
    allowed_upload_types: str = "pdf,doc,docx,jpg,jpeg,png"

    @property
    def allowed_upload_types_list(self) -> list[str]:
        """Return allowed upload types as a list."""
        return [t.strip().lower() for t in self.allowed_upload_types.split(",") if t.strip()]

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"

    @property
    def database_url_sync(self) -> str:
        """Synchronous database URL for Alembic (uses psycopg2)."""
        return str(self.database_url).replace(
            "postgresql+asyncpg://", "postgresql+psycopg2://"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]


settings: Settings = get_settings()
