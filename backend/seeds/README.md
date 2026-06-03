# Database Seeds

Pre-populated CSV data for universities, scholarships, and lenders.

## Usage

```bash
# Seed all entities (skips if data already exists)
cd backend
uv run python -m seeds.seed

# Seed only one entity type
uv run python -m seeds.seed --only universities
uv run python -m seeds.seed --only scholarships
uv run python -m seeds.seed --only lenders

# Force re-seed (deletes existing rows first — careful in production!)
uv run python -m seeds.seed --force
uv run python -m seeds.seed --only universities --force
```

## Data Files

| File | Entities | Count |
|------|----------|-------|
| `data/universities.csv` | Top world universities | 25 |
| `data/scholarships.csv` | Scholarships across 6 countries | 20 |
| `data/lenders.csv` | Education loan providers | 10 |

## Adding New Data

1. Open the relevant CSV in `data/`
2. Add a new row following the existing column format
3. Re-run `uv run python -m seeds.seed --only <entity>`

The seeder is **idempotent by default** — it skips insertion if rows already exist.
Use `--force` only when you want to fully replace the dataset.

## Docker / First Boot

The `docker-entrypoint.sh` automatically runs:
```
alembic upgrade head && python -m seeds.seed
```
on container start, so seeds are applied on first boot with no manual steps.
