# 05 - Monitoring, APM & Alerting

## 🎯 Why It Matters
If your users are the first ones to tell you that your application is broken, your monitoring has failed. An active monitoring, application performance monitoring (APM), and alerting system alerts on latency spikes, error rate anomalies, CPU/Memory exhaustion, and downtime before customers are impacted.

## ✅ Verification Checklist

### Backend & Infrastructure
- [ ] Dedicated `/healthz` (liveness) and `/readyz` (readiness) endpoints validating DB, cache, and queue connections.
- [ ] Application Performance Monitoring (APM) tracking p95 and p99 response latencies.
- [ ] Uptime checks configured from multiple global geographic regions.
- [ ] Alerting rules routed to Slack, Discord, or PagerDuty with sensible escalation policies.
- [ ] Thresholds set for elevated 5xx error rates, CPU/Memory usage > 85%, and disk space > 80%.

### Frontend
- [ ] Real User Monitoring (RUM) and Core Web Vitals (LCP, FID/INP, CLS) tracked.
- [ ] Client crash reports and unhandled Promise rejections streamed to Sentry or Bugsnag.

## 💡 Best Practices

### Deep Health Check Endpoint
```typescript
import { Router } from 'express';
import { db } from './db';
import { redis } from './redis';

const router = Router();

router.get('/readyz', async (req, res) => {
  const checks: Record<string, 'ok' | 'fail'> = {
    database: 'fail',
    redis: 'fail',
  };

  try {
    await db.raw('SELECT 1');
    checks.database = 'ok';
  } catch (e) {
    // Database connection failed
  }

  try {
    const ping = await redis.ping();
    if (ping === 'PONG') checks.redis = 'ok';
  } catch (e) {
    // Redis ping failed
  }

  const isHealthy = Object.values(checks).every((status) => status === 'ok');
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    checks,
  });
});

export default router;
```

## 🔧 Recommended Tools
- **Error Tracking**: [Sentry](https://sentry.io/), [GlitchTip](https://glitchtip.com/)
- **Uptime & Status Pages**: [Better Stack Uptime](https://betterstack.com/uptime), [Uptime Kuma](https://github.com/louislam/uptime-kuma)
- **APM & Metrics**: [Datadog](https://www.datadoghq.com/), [Prometheus](https://prometheus.io/) + [Grafana](https://grafana.com/), [New Relic](https://newrelic.com/)

## 📚 Additional Resources
- [Google SRE Book - Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- [Web Vitals Guide by Google Chrome](https://web.dev/vitals/)

---
*Last updated: 2026-08-27*
