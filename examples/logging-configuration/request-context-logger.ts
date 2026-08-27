import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import pino from 'pino';

const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Extend Express Request interface with context logger
declare global {
  namespace Express {
    interface Request {
      correlationId: string;
      log: pino.Logger;
    }
  }
}

/**
 * Middleware that assigns a correlation ID and attaches a child logger to req.log.
 */
export function requestContextLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const correlationId =
    (req.headers['x-correlation-id'] as string) ||
    (req.headers['x-request-id'] as string) ||
    crypto.randomUUID();

  req.correlationId = correlationId;
  res.setHeader('x-correlation-id', correlationId);

  req.log = baseLogger.child({
    correlationId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  const startTime = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    req.log.info(
      {
        statusCode: res.statusCode,
        durationMs,
      },
      'Request completed'
    );
  });

  next();
}
