# Skills Catalog 🧠⚡

Welcome to the **DevBible Skills Catalog**. This directory contains curated, battle-tested guides and architecture patterns organized by technical domain. Each guide highlights modern idioms, core patterns, state management strategies, security recommendations, and common pitfalls to avoid.

---

## 📂 Catalog Directory

### 🎨 [Frontend](frontend/)
Build fast, accessible, and maintainable user interfaces.
- **[React](frontend/react.md)**: Server Components (RSC), Next.js App Router, TanStack Query, state management, and render performance.
- **[Vue.js](frontend/vue.md)**: Vue 3 Composition API, Pinia, Nuxt.js, reactivity performance, and TypeScript integration.
- **[CSS Frameworks](frontend/css-frameworks.md)**: Tailwind CSS v4, CSS Modules, design systems, and responsive tokenization.

### ⚙️ [Backend](backend/)
Design resilient, scalable, and secure APIs and microservices.
- **[Node.js](backend/nodejs.md)**: TypeScript, Fastify/Express, async performance, event loop safety, and worker threads.
- **[Python](backend/python.md)**: FastAPI, Pydantic v2, async concurrency, SQLAlchemy/Alembic, and Celery task queues.
- **[Go](backend/go.md)**: Idiomatic Go, HTTP router patterns, goroutine lifecycle management, channels, and zero-allocation tips.

### 🚀 [DevOps & Infrastructure](devops/)
Automate builds, containerize reliably, and ship without downtime.
- **[Docker](devops/docker.md)**: Multi-stage builds, rootless containers, `.dockerignore` optimization, and minimal base images (Alpine/Distroless).
- **[CI/CD](devops/ci-cd.md)**: GitHub Actions pipelines, automated test matrices, caching strategies, and automated deployments.

### 🗄️ [Database](database/)
Model, query, and scale persistence layers safely.
- **[PostgreSQL](database/postgresql.md)**: Schema normalization, partial & composite indexes, connection pooling (PgBouncer), and locking strategies.
- **[MongoDB](database/mongodb.md)**: Document modeling (embedding vs. referencing), compound indexes, aggregation pipelines, and sharding basics.

---

## 🎯 Guiding Philosophy

1. **Pragmatic Simplicity**: Avoid over-engineering. Choose proven patterns that your team can maintain.
2. **Type Safety End-to-End**: Enforce strict compile-time types across frontend, API boundaries, and database queries.
3. **Observability First**: Design components and services to be easily debuggable, measurable, and testable from day one.
