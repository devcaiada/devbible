from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
import uuid
import logging

logger = logging.getLogger(__name__)

class AppException(Exception):
    def __init__(self, status_code: int, code: str, message: str, details: dict | None = None):
        self.status_code = status_code
        self.code = code
        self.message = message
        self.details = details
        super().__init__(message)

class NotFoundException(AppException):
    def __init__(self, message: str = "Resource not found", details: dict | None = None):
        super().__init__(status.HTTP_404_NOT_FOUND, "NOT_FOUND", message, details)

class BadRequestException(AppException):
    def __init__(self, message: str = "Bad request", details: dict | None = None):
        super().__init__(status.HTTP_400_BAD_REQUEST, "BAD_REQUEST", message, details)

def setup_exception_handlers(app: FastAPI):
    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        correlation_id = request.headers.get("x-correlation-id", str(uuid.uuid4()))
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "status": "error",
                "code": exc.code,
                "message": exc.message,
                "correlationId": correlation_id,
                "details": exc.details,
            },
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        correlation_id = request.headers.get("x-correlation-id", str(uuid.uuid4()))
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "status": "error",
                "code": "VALIDATION_ERROR",
                "message": "Invalid request payload",
                "correlationId": correlation_id,
                "details": exc.errors(),
            },
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        correlation_id = request.headers.get("x-correlation-id", str(uuid.uuid4()))
        logger.exception(f"Unhandled server error [correlationId={correlation_id}]")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": "error",
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected server error occurred.",
                "correlationId": correlation_id,
            },
        )
