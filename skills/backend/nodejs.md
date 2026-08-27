# Node.js & TypeScript Backend Guide 🟩

Production guide for building resilient, high-throughput backend services using Node.js, Fastify/Express, and TypeScript.

---

## 🎯 Key Architectural Principles

1. **Non-Blocking Event Loop**: Never execute CPU-heavy sync tasks (crypto, heavy compression, complex regex) on the main event loop thread; offload to Worker Threads.
2. **Strict TypeScript & Runtime Validation**: Type annotations disappear at runtime. Combine TypeScript with Zod or TypeBox to validate incoming payloads at network boundaries.
3. **Structured Logging & Tracing**: Always use structured JSON loggers (e.g., Pino) and include a `traceId` / `correlationId` in every request context.
4. **Graceful Shutdown**: Always handle `SIGTERM` and `SIGINT` signals to close active database pools and in-flight HTTP connections before process termination.

---

## 💡 Best Practices

### 1. Graceful Shutdown Handler
```typescript
import { Server } from 'http';
import { db } from './database';
import { logger } from './logger';

export function setupGracefulShutdown(server: Server) {
  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'Received termination signal, shutting down gracefully...');
    server.close(async () => {
      logger.info('HTTP server closed.');
      try {
        await db.destroy();
        logger.info('Database connections closed.');
        process.exit(0);
      } catch (err) {
        logger.error({ err }, 'Error during database disconnection.');
        process.exit(1);
      }
    });

    // Force exit if shutdown hangs
    setTimeout(() => {
      logger.error('Forced shutdown due to timeout.');
      process.exit(1);
    }, 10000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}
```

### 2. Fastify vs Express
- **Fastify**: First choice for high throughput, built-in schema validation (JSON Schema/Ajv), and native async/await plugin architecture.
- **Express**: Massive ecosystem, great for standard APIs and monolithic web applications.

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Uncaught Exceptions Crashing the Process**: Missing global error handlers or unhandled Promise rejections.
- ❌ **Memory Leaks**: Global caches without TTL/eviction policies, lingering event listeners on long-lived objects.
- ❌ **Logging Secrets or PII**: Logging un-redacted `req.headers.authorization` or `req.body` containing passwords or tokens.

---

## 🔧 Recommended Ecosystem

- **Frameworks**: [Fastify](https://fastify.dev/), [Express](https://expressjs.com/), [NestJS](https://nestjs.com/), [Hono](https://hono.dev/)
- **ORM / Query Builders**: [Prisma](https://www.prisma.io/), [Drizzle ORM](https://orm.drizzle.team/), [Kysely](https://kysely.dev/)
- **Validation**: [Zod](https://zod.dev/), [TypeBox](https://github.com/sinclairzx81/typebox)
- **Logging**: [Pino](https://github.com/pinojs/pino)
- **Job Queues**: [BullMQ](https://bullmq.io/) (Redis-backed)
