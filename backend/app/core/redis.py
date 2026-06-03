"""Redis client and caching utilities."""

from typing import Any

import redis.asyncio as aioredis

from app.core.config import settings

_redis_client: aioredis.Redis | None = None


async def get_redis() -> aioredis.Redis:
    """Return a shared async Redis client.

    The password is embedded in ``settings.redis_url`` (e.g.
    ``redis://:password@host:port/db``), so we do **not** pass it as a
    separate kwarg — doing so would override (and potentially blank out)
    the password already present in the URL.
    """
    global _redis_client
    if _redis_client is None:
        _redis_client = aioredis.from_url(
            str(settings.redis_url),
            encoding="utf-8",
            decode_responses=True,
            max_connections=20,
        )
    return _redis_client


async def cache_set(key: str, value: str, ttl: int = 300) -> None:
    """Set a key in Redis with an optional TTL (seconds)."""
    client = await get_redis()
    await client.set(key, value, ex=ttl)


async def cache_get(key: str) -> str | None:
    """Get a key from Redis. Returns None if not found."""
    client = await get_redis()
    return await client.get(key)


async def cache_delete(key: str) -> None:
    """Delete a key from Redis."""
    client = await get_redis()
    await client.delete(key)


async def cache_delete_pattern(pattern: str) -> None:
    """Delete all keys matching a glob pattern."""
    client = await get_redis()
    keys = await client.keys(pattern)
    if keys:
        await client.delete(*keys)


async def close_redis() -> None:
    """Close the Redis connection pool."""
    global _redis_client
    if _redis_client is not None:
        await _redis_client.aclose()
        _redis_client = None
