"""User domain service."""

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password, verify_password
from app.models.user import Student, User
from app.schemas.user import StudentProfileUpdate, UserCreate, UserUpdate


class UserService:
    """Handles user creation, retrieval, and profile management."""

    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    async def get_by_id(self, user_id: UUID) -> User | None:
        """Fetch a user by primary key."""
        result = await self._db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> User | None:
        """Fetch an active user by email address."""
        result = await self._db.execute(
            select(User).where(User.email == email.lower(), User.deleted_at.is_(None))
        )
        return result.scalar_one_or_none()

    async def create(self, payload: UserCreate) -> User:
        """Create a new user with a hashed password."""
        user = User(
            email=payload.email.lower(),
            hashed_password=hash_password(payload.password),
            full_name=payload.full_name,
            phone=payload.phone,
        )
        self._db.add(user)
        await self._db.flush()
        # Create empty student profile
        student = Student(user_id=user.id)
        self._db.add(student)
        return user

    async def authenticate(self, email: str, password: str) -> User | None:
        """Return user if credentials are valid, else None."""
        user = await self.get_by_email(email)
        if user is None:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    async def update(self, user: User, payload: UserUpdate) -> User:
        """Apply partial user updates."""
        for field, value in payload.model_dump(exclude_none=True).items():
            setattr(user, field, value)
        return user

    async def update_student_profile(
        self, user: User, payload: StudentProfileUpdate
    ) -> Student:
        """Update the student's academic and financial profile."""
        if user.student_profile is None:
            student = Student(user_id=user.id)
            self._db.add(student)
        else:
            student = user.student_profile

        for field, value in payload.model_dump(exclude_none=True).items():
            setattr(student, field, value)
        return student

    async def email_exists(self, email: str) -> bool:
        """Return True if an active account with this email already exists."""
        result = await self._db.execute(
            select(User.id).where(
                User.email == email.lower(), User.deleted_at.is_(None)
            )
        )
        return result.scalar_one_or_none() is not None
