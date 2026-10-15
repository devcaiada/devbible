/**
 * Production Health & Readiness Check Handlers
 * Compatible with Express, Node.js HTTP, or adaptable to Next.js API Routes.
 * 
 * Provides:
 * - /healthz: Liveness probe (shallow check: process is alive and responsive)
 * - /readyz: Readiness probe (deep check: verifies database, cache, and dependency connectivity)
 */

import { Request, Response, Router } from 'express';

export interface HealthCheckOptions {
  checkDatabase?: () => Promise<boolean>;
  checkCache?: () => Promise<boolean>;
  version?: string;
}

export function createHealthCheckRouter(options: HealthCheckOptions = {}): Router {
  const router = Router();
  const startTime = Date.now();
  const version = options.version || process.env.APP_VERSION || '1.0.0';

  /**
   * Shallow Liveness Check
   * Kubernetes / Load balancer ping to ensure process is not deadlocked.
   */
  router.get('/healthz', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      uptime: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString(),
      version,
    });
  });

  /**
   * Deep Readiness Check
   * Ensures database and cache connections are active before routing user traffic.
   */
  router.get('/readyz', async (_req: Request, res: Response) => {
    const checks: Record<string, 'ok' | 'down' | 'skipped'> = {
      database: 'skipped',
      cache: 'skipped',
    };

    let isHealthy = true;

    // Database Connectivity Check
    if (options.checkDatabase) {
      try {
        const dbOk = await options.checkDatabase();
        checks.database = dbOk ? 'ok' : 'down';
        if (!dbOk) isHealthy = false;
      } catch {
        checks.database = 'down';
        isHealthy = false;
      }
    }

    // Cache / Redis Connectivity Check
    if (options.checkCache) {
      try {
        const cacheOk = await options.checkCache();
        checks.cache = cacheOk ? 'ok' : 'down';
        if (!cacheOk) isHealthy = false;
      } catch {
        checks.cache = 'down';
        isHealthy = false;
      }
    }

    const memUsage = process.memoryUsage();
    const payload = {
      status: isHealthy ? 'ready' : 'degraded',
      checks,
      system: {
        uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
        memoryUsageMB: {
          rss: Math.round(memUsage.rss / 1024 / 1024),
          heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
        },
      },
      timestamp: new Date().toISOString(),
      version,
    };

    const statusCode = isHealthy ? 200 : 503;
    res.status(statusCode).json(payload);
  });

  return router;
}

export default createHealthCheckRouter;
