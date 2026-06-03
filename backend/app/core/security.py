"""Security utilities: JWT, password hashing, RBAC."""

from datetime import UTC, datetime, timedelta
from enum import StrEnum
from typing import Any

import bcrypt
from jose import JWTError, jwt

from app.core.config import settings


class UserRole(StrEnum):
    """Application user roles."""

    VISITOR = "visitor"
    STUDENT = "student"
    COUNSELOR = "counselor"
    ADMIN = "admin"


ROLE_HIERARCHY: dict[UserRole, int] = {
    UserRole.VISITOR: 0,
    UserRole.STUDENT: 1,
    UserRole.COUNSELOR: 2,
    UserRole.ADMIN: 3,
}


def hash_password(password: str) -> str:
    """Return bcrypt hash of the given password."""
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against its bcrypt hash."""
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())


def create_access_token(
    subject: str | int,
    role: UserRole,
    extra_claims: dict[str, Any] | None = None,
) -> str:
    """Create a signed JWT access token."""
    expire = datetime.now(UTC) + timedelta(
        minutes=settings.jwt_access_token_expire_minutes
    )
    payload: dict[str, Any] = {
        "sub": str(subject),
        "role": role.value,
        "exp": expire,
        "iat": datetime.now(UTC),
        "type": "access",
    }
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def create_refresh_token(subject: str | int) -> str:
    """Create a signed JWT refresh token."""
    expire = datetime.now(UTC) + timedelta(days=settings.jwt_refresh_token_expire_days)
    payload: dict[str, Any] = {
        "sub": str(subject),
        "exp": expire,
        "iat": datetime.now(UTC),
        "type": "refresh",
    }
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict[str, Any]:
    """Decode and validate a JWT token. Raises JWTError on failure."""
    return jwt.decode(  # type: ignore[return-value]
        token,
        settings.jwt_secret_key,
        algorithms=[settings.jwt_algorithm],
    )


def has_role(user_role: UserRole, required_role: UserRole) -> bool:
    """Return True if user_role meets or exceeds required_role in hierarchy."""
    return ROLE_HIERARCHY.get(user_role, -1) >= ROLE_HIERARCHY.get(required_role, 999)
