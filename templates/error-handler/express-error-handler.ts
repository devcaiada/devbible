import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    statusCode: number,
    code: string,
    message: string,
    isOperational = true,
    details?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: unknown) {
    super(404, 'NOT_FOUND', message, true, details);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Invalid request parameters', details?: unknown) {
    super(400, 'BAD_REQUEST', message, true, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required', details?: unknown) {
    super(401, 'UNAUTHORIZED', message, true, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access denied', details?: unknown) {
    super(403, 'FORBIDDEN', message, true, details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict', details?: unknown) {
    super(409, 'CONFLICT', message, true, details);
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const correlationId = (req.headers['x-correlation-id'] as string) || req.headers['x-request-id'] || 'N/A';
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;
  const code = isAppError ? err.code : 'INTERNAL_SERVER_ERROR';
  const message = isAppError && err.isOperational
    ? err.message
    : 'An unexpected internal server error occurred.';
  const details = isAppError ? err.details : undefined;

  // In production, mask stack traces
  const isDev = process.env.NODE_ENV === 'development';

  res.status(statusCode).json({
    status: 'error',
    code,
    message,
    correlationId,
    ...(details ? { details } : {}),
    ...(isDev && { stack: err.stack }),
  });
};
