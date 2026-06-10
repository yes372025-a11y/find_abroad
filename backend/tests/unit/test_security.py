"""Unit tests for security utilities."""

import pytest
from jose import JWTError

from app.core.security import (
    UserRole,
    create_access_token,
    decode_token,
    has_role,
    hash_password,
    verify_password,
)


def test_password_hash_and_verify() -> None:
    """Hashed password should verify correctly."""
    plain = "SecurePass123!"
    hashed = hash_password(plain)
    assert hashed != plain
    assert verify_password(plain, hashed)
    assert not verify_password("wrong", hashed)


def test_access_token_roundtrip() -> None:
    """Access token should decode to correct subject and role."""
    token = create_access_token("user-123", UserRole.STUDENT)
    payload = decode_token(token)
    assert payload["sub"] == "user-123"
    assert payload["role"] == UserRole.STUDENT.value
    assert payload["type"] == "access"


def test_role_hierarchy() -> None:
    """Role hierarchy should enforce access levels correctly."""
    assert has_role(UserRole.ADMIN, UserRole.STUDENT)
    assert has_role(UserRole.COUNSELOR, UserRole.COUNSELOR)
    assert not has_role(UserRole.STUDENT, UserRole.COUNSELOR)
    assert not has_role(UserRole.VISITOR, UserRole.ADMIN)


@pytest.mark.asyncio
async def test_register_and_login(client) -> None:
    """Register then login should return tokens."""
    reg = await client.post("/api/v1/auth/register", json={
        "email": "test@example.com",
        "full_name": "Test User",
        "password": "StrongPass1!",
    })
    assert reg.status_code == 201

    login = await client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "StrongPass1!",
    })
    assert login.status_code == 200
    data = login.json()
    assert "access_token" in data
    assert "refresh_token" in data
