# Find Abroad — Study Abroad Consultancy Platform

A full-stack study abroad consultancy platform built with FastAPI (backend) and Next.js 14 (frontend), following Clean Architecture / Domain-Driven Design principles.

## Architecture Overview

```
find-abroad/
├── backend/               # FastAPI + PostgreSQL
│   ├── app/
│   │   ├── api/v1/        # HTTP layer (routes per domain)
│   │   ├── core/          # Config, Security
│   │   ├── middleware/    # JWT auth, RBAC
│   │   ├── migrations/    # Alembic (async)
│   │   ├── models/        # SQLAlchemy ORM models
│   │   ├── schemas/       # Pydantic v2 request/response schemas
│   │   └── services/      # Domain services (business logic)
│   └── tests/             # pytest + httpx async tests
├── frontend/              # Next.js 14 App Router
│   ├── app/
│   │   ├── (public)/      # Marketing pages
│   │   ├── (auth)/        # Login / Register
│   │   └── (dashboard)/   # Authenticated dashboard (Student & Counselor)
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React Query hooks
│   └── lib/               # API client, utilities
└── docker-compose.yml     # Orchestration
```

## Tech Stack

### Backend
- **Runtime**: Python 3.12+ with `uv` package manager
- **Framework**: FastAPI (async, OpenAPI auto-docs)
- **Database**: PostgreSQL 16 + SQLAlchemy 2 (async) + Alembic migrations
- **Auth**: JWT (access + refresh tokens), bcrypt password hashing
- **Validation**: Pydantic v2 with strict mode

### Frontend
- **Framework**: Next.js 14 (App Router, RSC)
- **Styling**: Pure CSS + CSS variables theming
- **Data Fetching**: TanStack Query v5
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Infrastructure
- **Orchestration**: Docker Compose (Frontend, Backend, Postgres)

## Quick Start

```bash
# 1. Clone and setup
git clone https://github.com/your-org/find-abroad.git
cd find-abroad

# 2. Configure environment
cp .env.example .env
# Edit .env with your database credentials and secrets

# 3. Start all services
docker compose up -d
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/api/docs

## Development

```bash
# Backend (runs with hot reload)
cd backend
uv run uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm run dev

# Run tests
cd backend && uv run pytest -v

# Run type checks
cd backend && uv run mypy app/

# Lint and format
uv run ruff check . --fix
uv run ruff format .
```

## Domain Model

| Domain | Core Entities |
|--------|--------------|
| Users  | User, StudentProfile |
| CRM    | Lead |
| Discovery | University, Program, Scholarship |
| Finance | Lender, LoanAssessment |
| Engagement | Consultation |
| Workflow | Application, Document |

## API Routes (v1)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Register new student |
| POST | `/api/v1/auth/login` | Login → JWT tokens |
| GET | `/api/v1/universities` | Paginated university list |
| GET | `/api/v1/scholarships` | Paginated scholarship list |
| GET | `/api/v1/lenders` | Lender comparison list |
| POST | `/api/v1/lenders/assess` | Loan eligibility assessment |
| POST | `/api/v1/leads` | Capture a lead (public) |
| GET | `/api/v1/leads` | List all leads (counselor only) |
| POST | `/api/v1/consultations` | Book consultation |
| POST | `/api/v1/documents` | Upload document |

## Role-Based Access Control

| Role | Access Level |
|------|-------------|
| `visitor` | Public endpoints only |
| `student` | Own profile, applications, documents |
| `counselor` | All students, leads view, update applications |
| `admin` | Full CRUD on all entities |

## Environment Variables

See `.env.example` for all required and optional environment variables.
Critical ones:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Async PostgreSQL connection string |
| `APP_SECRET_KEY` | Application master secret |
| `JWT_SECRET_KEY` | JWT signing secret |
| `COUNSELOR_EMAIL` | Admin email created on boot |
| `COUNSELOR_PASSWORD` | Admin password created on boot |

## Architecture Decisions

1. **Async-first**: All DB operations use `asyncpg` and SQLAlchemy async sessions for maximum throughput.
2. **Contract-first API**: OpenAPI spec drives Pydantic validation on both request and response, preventing schema drift.
3. **Soft deletes**: All major entities have `deleted_at` timestamps rather than physical deletes for audit trail.
4. **Service layer**: Business logic lives in service classes (`services/`), not in route handlers, making it testable without HTTP overhead.

## License

MIT — see LICENSE file.
