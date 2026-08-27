# 02 - Logging & Observability

## 🎯 Why It Matters
When an incident strikes in production, plain text `console.log` statements are impossible to parse, search, or aggregate across distributed services. Structured logging with correlation IDs enables rapid root-cause analysis, helps trace individual user journeys, and ensures that sensitive data (PII, tokens, credit card numbers) is never inadvertently persisted to log aggregators.

## ✅ Verification Checklist

### Backend
- [ ] Structured JSON logging format enabled in production (e.g. Pino, Winston, structlog).
- [ ] Log levels properly utilized (`trace`, `debug`, `info`, `warn`, `error`, `fatal`).
- [ ] Unique `x-request-id` or `x-correlation-id` attached to every incoming request and propagated downstream.
- [ ] Sensitive fields redacted automatically (passwords, `Authorization` headers, credit card numbers, JWT tokens).
- [ ] Logs streamed to `stdout`/`stderr` rather than written to local files (12-Factor App rule).
- [ ] Log aggregation service integrated (e.g. Datadog, Better Stack, Grafana Loki, CloudWatch).

### Frontend
- [ ] Production console logs stripped or disabled via build tools (e.g., Terser, Vite `drop_console`).
- [ ] Client-side error telemetry hooked up to remote monitoring (e.g., Sentry, LogRocket).
- [ ] User ID attached to error context when authenticated.

## 💡 Best Practices

### Structured Logging with Redaction
```typescript
// ❌ Bad: Unstructured, unsearchable, leaks auth tokens
console.log(`User ${user.email} logged in with headers: ${JSON.stringify(req.headers)}`);

// ✅ Good: High-performance structured logger with automated redaction (Pino)
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'password', 'token', 'creditCard'],
    censor: '[REDACTED]',
  },
  base: {
    env: process.env.NODE_ENV,
    service: 'api-service',
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
```

## 🔧 Recommended Tools
- **Loggers (Node.js)**: [Pino](https://github.com/pinojs/pino), [Winston](https://github.com/winstonjs/winston)
- **Loggers (Python)**: [structlog](https://www.structlog.org/), [Loguru](https://github.com/Delgan/loguru)
- **Aggregators**: [Better Stack](https://betterstack.com/), [Datadog](https://www.datadoghq.com/), [Grafana Loki](https://grafana.com/oss/loki/), [Axiom](https://axiom.co/)

## 📚 Additional Resources
- [The 12-Factor App: XI. Logs](https://12factor.net/logs)
- [OpenTelemetry Logging Specifications](https://opentelemetry.io/docs/specs/otel/logs/)

---
*Last updated: 2026-08-27*
