"""
Production Health & Readiness Check Handlers for FastAPI.

Provides:
- /healthz: Shallow liveness probe (checks process responsiveness)
- /readyz: Deep readiness probe (checks database and cache connectivity)
"""

import time
import os
from typing import Callable, Awaitable, Optional
from fastapi import APIRouter, status, Response
from pydantic import BaseModel

router = APIRouter(tags=["Health"])
START_TIME = time.time()
APP_VERSION = os.getenv("APP_VERSION", "1.0.0")

class HealthResponse(BaseModel):
    status: str
    uptime_seconds: int
    version: str

class ReadinessResponse(BaseModel):
    status: str
    checks: dict[str, str]
    uptime_seconds: int
    version: str

@router.get("/healthz", response_model=HealthResponse, status_code=status.HTTP_200_OK)
async def liveness_check():
    """Shallow liveness check for load balancers and orchestrators."""
    return HealthResponse(
        status="ok",
        uptime_seconds=int(time.time() - START_TIME),
        version=APP_VERSION,
    )

def setup_readiness_router(
    db_ping_fn: Optional[Callable[[], Awaitable[bool]]] = None,
    cache_ping_fn: Optional[Callable[[], Awaitable[bool]]] = None,
) -> APIRouter:
    """Configures deep dependency check routes."""

    @router.get("/readyz", response_model=ReadinessResponse)
    async def readiness_check(response: Response):
        checks = {"database": "skipped", "cache": "skipped"}
        is_ready = True

        if db_ping_fn:
            try:
                db_healthy = await db_ping_fn()
                checks["database"] = "ok" if db_healthy else "down"
                if not db_healthy:
                    is_ready = False
            except Exception:
                checks["database"] = "down"
                is_ready = False

        if cache_ping_fn:
            try:
                cache_healthy = await cache_ping_fn()
                checks["cache"] = "ok" if cache_healthy else "down"
                if not cache_healthy:
                    is_ready = False
            except Exception:
                checks["cache"] = "down"
                is_ready = False

        if not is_ready:
            response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

        return ReadinessResponse(
            status="ready" if is_ready else "degraded",
            checks=checks,
            uptime_seconds=int(time.time() - START_TIME),
            version=APP_VERSION,
        )

    return router
