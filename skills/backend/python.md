# Python Backend Guide 🐍

A comprehensive guide for developing robust, asynchronous backend services using Python 3.11+, FastAPI, Pydantic v2, and modern tooling (uv, Ruff).

---

## 🎯 Key Architectural Principles

1. **Async by Default with ASGI**: Use FastAPI / Starlette with `async def` endpoints for non-blocking I/O (database, external HTTP, Redis).
2. **Pydantic v2 for Contract Enforcement**: Define strict request/response DTOs with Pydantic for validation, parsing, and OpenAPI documentation generation.
3. **Dependency Injection**: Utilize FastAPI's `Depends` for managing database sessions, authentication, and service dependencies cleanly.
4. **Modern Tooling**: Use `uv` for blistering fast package management and `ruff` for linting and formatting.

---

## 💡 Best Practices

### 1. Clean FastAPI Architecture & Dependency Injection
```python
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, EmailStr
from typing import AsyncGenerator

app = FastAPI(title="DevBible API")

# Schema DTO
class UserCreate(BaseModel):
    email: EmailStr
    full_name: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str

    class Config:
        from_attributes = True

# Dependency for DB Session
async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise

@app.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: UserCreate,
    db: AsyncSession = Depends(get_db_session)
):
    # Business logic here
    return await user_service.create(db, payload)
```

### 2. Async Safety
- Never call synchronous blocking I/O functions (e.g. `requests.get()`, `time.sleep()`) directly inside `async def` functions. Use `httpx.AsyncClient` and `asyncio.sleep()`.

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Mixing Sync ORM with Async Endpoints**: Running sync SQLAlchemy or Django ORM queries on async endpoints blocks the event loop thread.
- ❌ **Mutable Default Arguments**: Using `def fn(items=[])` creates shared state across requests. Use `def fn(items: list | None = None)`.

---

## 🔧 Recommended Ecosystem

- **Frameworks**: [FastAPI](https://fastapi.tiangolo.com/), [Django](https://www.djangoproject.com/), [Litestar](https://litestar.dev/)
- **ORM & Migrations**: [SQLAlchemy 2.0 (Async)](https://www.sqlalchemy.org/), [Alembic](https://alembic.sqlalchemy.org/)
- **Validation**: [Pydantic v2](https://docs.pydantic.dev/)
- **Task Queues**: [Celery](https://docs.celeryq.dev/), [ARQ](https://arq-docs.helpmanual.io/)
- **Tooling**: [uv](https://github.com/astral-sh/uv), [Ruff](https://astral.sh/ruff), [Pytest](https://pytest.org/)
