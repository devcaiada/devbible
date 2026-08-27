/**
 * Domain-specific error classes for clean error handling across backend services.
 */

export abstract class BaseCustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly code: string;

  constructor(message: string, public readonly details?: unknown) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends BaseCustomError {
  readonly statusCode = 422;
  readonly code = 'VALIDATION_ERROR';
}

export class AuthenticationError extends BaseCustomError {
  readonly statusCode = 401;
  readonly code = 'UNAUTHENTICATED';
}

export class AuthorizationError extends BaseCustomError {
  readonly statusCode = 403;
  readonly code = 'PERMISSION_DENIED';
}

export class ResourceNotFoundError extends BaseCustomError {
  readonly statusCode = 404;
  readonly code = 'RESOURCE_NOT_FOUND';
}

export class RateLimitExceededError extends BaseCustomError {
  readonly statusCode = 429;
  readonly code = 'RATE_LIMIT_EXCEEDED';
}
