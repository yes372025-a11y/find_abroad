"""FastAPI application factory."""

import time
from collections.abc import AsyncGenerator, Awaitable, Callable
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.redis import close_redis

logger = structlog.get_logger(__name__)

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application startup and shutdown lifecycle."""
    logger.info("startup", env=settings.app_env, version=settings.app_version)
    yield
    await close_redis()
    logger.info("shutdown")


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        docs_url="/api/docs" if not settings.is_production else None,
        redoc_url="/api/redoc" if not settings.is_production else None,
        openapi_url="/api/openapi.json" if not settings.is_production else None,
        lifespan=lifespan,
    )

    # ─── Routes ────────────────────────────────────────────────────────────────
    app.include_router(api_router, prefix="/api/v1")

    # ─── Rate limiting ─────────────────────────────────────────────────────────
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    app.add_middleware(SlowAPIMiddleware)

    # ─── Request logging ───────────────────────────────────────────────────────
    # Use add_middleware directly (not the @app.middleware decorator) so the
    # registration order below controls the final stack unambiguously.
    from starlette.middleware.base import BaseHTTPMiddleware

    async def _log_requests(
        request: Request,
        call_next: Callable[[Request], Awaitable[Response]],
    ) -> Response:
        start = time.perf_counter()
        response = await call_next(request)
        duration_ms = round((time.perf_counter() - start) * 1000, 2)
        logger.info(
            "http_request",
            method=request.method,
            path=request.url.path,
            status=response.status_code,
            duration_ms=duration_ms,
        )
        return response

    app.add_middleware(BaseHTTPMiddleware, dispatch=_log_requests)

    # ─── CORS ──────────────────────────────────────────────────────────────────
    # MUST be the last add_middleware call — Starlette inserts each middleware at
    # position 0 of its internal list, so the last registration becomes the
    # outermost layer (first to handle every incoming request).  CORS must be
    # outermost so it can respond to OPTIONS preflight requests before the rate-
    # limiter or logger touch them.
    #
    # In development, also allow any localhost / 127.0.0.1 port via regex so the
    # frontend dev server works on any port without editing .env.
    allow_origin_regex: str | None = (
        r"http://(localhost|127\.0\.0\.1)(:\d+)?"
        if not settings.is_production
        else None
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_origin_regex=allow_origin_regex,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )

    return app


app = create_app()
