"""Application configuration using pydantic-settings."""

from functools import lru_cache
from typing import Any

from pydantic import AnyHttpUrl, Field, PostgresDsn, RedisDsn, field_validator
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
    app_env: str = Field(default="development")
    app_debug: bool = False
    app_secret_key: str

    # ─── CORS ──────────────────────────────────────────────────────────────────
    # Stored as a raw comma-separated string to avoid pydantic-settings 2.7+
    # attempting JSON-decode on list[str] fields before validators run.
    cors_origins: str = "http://localhost:3000"

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

    # ─── Redis ─────────────────────────────────────────────────────────────────
    redis_url: RedisDsn = Field(default="redis://localhost:6379/0")  # type: ignore[assignment]

    # ─── JWT ───────────────────────────────────────────────────────────────────
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    jwt_refresh_token_expire_days: int = 7

    # ─── External services ─────────────────────────────────────────────────────
    strapi_url: AnyHttpUrl = Field(default="http://strapi:1337")  # type: ignore[assignment]
    strapi_api_token: str | None = None

    meilisearch_url: AnyHttpUrl = Field(default="http://meilisearch:7700")  # type: ignore[assignment]
    meilisearch_master_key: str | None = None

    listmonk_url: AnyHttpUrl = Field(default="http://listmonk:9000")  # type: ignore[assignment]
    listmonk_username: str | None = None
    listmonk_password: str | None = None

    erpnext_url: AnyHttpUrl | None = None
    erpnext_api_key: str | None = None
    erpnext_api_secret: str | None = None

    ollama_url: AnyHttpUrl = Field(default="http://ollama:11434")  # type: ignore[assignment]
    ollama_model: str = "llama3.2"

    posthog_api_key: str | None = None
    posthog_host: AnyHttpUrl | None = None

    # ─── File storage ──────────────────────────────────────────────────────────
    upload_dir: str = "/app/uploads"
    max_upload_size_mb: int = 10
    # Stored as comma-separated string for the same reason as cors_origins
    allowed_upload_types: str = "pdf,doc,docx,jpg,jpeg,png"

    @property
    def allowed_upload_types_list(self) -> list[str]:
        """Return allowed upload types as a list."""
        return [t.strip().lower() for t in self.allowed_upload_types.split(",") if t.strip()]

    # ─── Rate limiting ─────────────────────────────────────────────────────────
    rate_limit_per_minute: int = 60
    rate_limit_auth_per_minute: int = 10

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
