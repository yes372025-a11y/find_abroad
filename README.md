# Find Abroad — Study Abroad Consultancy Platform

A production-ready, full-stack study abroad consultancy platform built with FastAPI (backend) and Next.js 14 (frontend), following Clean Architecture / Domain-Driven Design principles.

## Architecture Overview

```
find-abroad/
├── backend/               # FastAPI + PostgreSQL + Drizzle
│   ├── app/
│   │   ├── api/v1/        # HTTP layer (routes per domain)
│   │   ├── core/          # Config, DB, Redis, Security
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
│   │   └── (dashboard)/   # Authenticated student dashboard
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React Query hooks
│   └── lib/               # API client, utilities
├── nginx/                 # Reverse proxy config
├── scripts/               # Dev tools and pre-commit hooks
└── docker-compose.yml     # 10-service orchestration
```

## Tech Stack

### Backend
- **Runtime**: Python 3.12+ with `uv` package manager
- **Framework**: FastAPI (async, OpenAPI auto-docs)
- **Database**: PostgreSQL 16 + SQLAlchemy 2 (async) + Alembic migrations
- **Cache**: Redis 7 (rate limiting, session cache)
- **Auth**: JWT (access + refresh tokens), bcrypt password hashing
- **Validation**: Pydantic v2 with strict mode
- **AI**: Ollama (LLaMA 3.2) for SOP/LOR generation and university recommendations
- **Search**: Meilisearch
- **Email**: Listmonk
- **CMS**: Strapi (content management)
- **Analytics**: PostHog (self-hosted)
- **CRM**: ERPNext integration

### Frontend
- **Framework**: Next.js 14 (App Router, RSC)
- **Styling**: Tailwind CSS v3 + CSS variables theming
- **Animation**: Framer Motion
- **Data Fetching**: TanStack Query v5
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Infrastructure
- **Orchestration**: Docker Compose (10 services)
- **Proxy**: Nginx (rate limiting, gzip, security headers)
- **CI/CD**: GitHub Actions (lint, test, build, deploy)
- **Code Quality**: pre-commit, ruff, mypy, ESLint

## Quick Start

```bash
# 1. Clone and setup
git clone https://github.com/your-org/find-abroad.git
cd find-abroad
./scripts/setup.sh

# 2. Configure environment
cp .env.example .env
# Edit .env with your database credentials and secrets

# 3. Start infrastructure
docker compose up -d postgres redis ollama

# 4. Run migrations
cd backend && uv run alembic upgrade head && cd ..

# 5. Start all services
docker compose up
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/api/docs
- **Strapi CMS**: http://localhost:1337
- **Meilisearch**: http://localhost:7700
- **Listmonk**: http://localhost:9000

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
| AI | SOP, LOR, University Recommendations |

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
| POST | `/api/v1/consultations` | Book consultation |
| POST | `/api/v1/documents` | Upload document |
| POST | `/api/v1/ai/sop` | Generate SOP draft |
| POST | `/api/v1/ai/recommend-universities` | AI university picks |

## Role-Based Access Control

| Role | Access Level |
|------|-------------|
| `visitor` | Public endpoints only |
| `student` | Own profile, applications, documents |
| `counselor` | All students, leads, update applications |
| `admin` | Full CRUD on all entities |

## Environment Variables

See `.env.example` for all required and optional environment variables.
Critical ones:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Async PostgreSQL connection string |
| `APP_SECRET_KEY` | Application master secret |
| `JWT_SECRET_KEY` | JWT signing secret |
| `REDIS_URL` | Redis connection string |
| `OLLAMA_URL` | Ollama AI service URL |

## Pre-commit Hooks

```bash
uv run pre-commit install
uv run pre-commit run --all-files
```

Custom hooks (in `scripts/hooks/`):
- `check_env.sh` — blocks committing `.env` files
- `validate_migrations.py` — warns when models change without a migration

## Architecture Decisions

1. **Async-first**: All DB operations use `asyncpg` and SQLAlchemy async sessions for maximum throughput.
2. **Contract-first API**: OpenAPI spec drives Pydantic validation on both request and response, preventing schema drift.
3. **Soft deletes**: All major entities have `deleted_at` timestamps rather than physical deletes for audit trail.
4. **Self-hosted AI**: Ollama runs locally, keeping student data on-premise (GDPR-friendly).
5. **Service layer**: Business logic lives in service classes (`services/`), not in route handlers, making it testable without HTTP overhead.
6. **ERPNext integration**: Leads are synced asynchronously to ERPNext CRM via fire-and-forget HTTP calls with structured error logging.

## License

MIT — see LICENSE file.
