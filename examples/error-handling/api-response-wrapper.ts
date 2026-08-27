import { Response } from 'express';

export interface ApiResponseSuccess<T> {
  status: 'success';
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiResponseError {
  status: 'error';
  code: string;
  message: string;
  correlationId?: string;
  details?: unknown;
}

/**
 * Sends a standardized successful JSON API response.
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta?: Record<string, unknown>
): Response {
  const payload: ApiResponseSuccess<T> = {
    status: 'success',
    data,
    ...(meta ? { meta } : {}),
  };
  return res.status(statusCode).json(payload);
}

/**
 * Sends a standardized error JSON API response.
 */
export function sendError(
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  correlationId?: string,
  details?: unknown
): Response {
  const payload: ApiResponseError = {
    status: 'error',
    code,
    message,
    ...(correlationId ? { correlationId } : {}),
    ...(details ? { details } : {}),
  };
  return res.status(statusCode).json(payload);
}
