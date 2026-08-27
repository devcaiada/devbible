---
name: devbible-audit
description: Audits a codebase against the DevBible 20-point production readiness checklist and scaffolds production templates.
version: 1.0.0
---

# DevBible Production Audit & Scaffolding Skill 🛡️⚡

Use this skill when you are asked to audit, inspect, review, or harden a project's production readiness, or when scaffolding production-grade infrastructure (error handling, logging, rate limiting, Docker Compose, etc.).

---

## 🎯 Commands & Workflows

### 1. `/devbible:audit` or "Audit this project with DevBible"
When triggered, follow this 4-step diagnostic protocol:

#### Step 1: Detect Project Stack
- Inspect package manifests (`package.json`, `requirements.txt`, `pyproject.toml`, `go.mod`, `Cargo.toml`).
- Identify frameworks (e.g. Next.js, Express, Fastify, FastAPI, Django, Go Chi, React, Vue).
- Identify persistent stores (PostgreSQL, MySQL, MongoDB, Redis).

#### Step 2: Evaluate the 20 Checklist Items
Perform file and code inspections across all 20 DevBible items:

1. **01 - Error Handling**: Check for centralized error handler middleware and sanitized responses.
2. **02 - Logging**: Check for structured JSON loggers (`pino`, `winston`, `structlog`, `log/slog`) and correlation IDs.
3. **03 - Database Backup**: Check for automated backup scripts, PITR configs, or restore test docs.
4. **04 - Staging & Previews**: Check for `.env.example`, environment separation, and preview deploy configs.
5. **05 - Monitoring**: Check for `/healthz` or `/readyz` endpoints and APM SDKs (Sentry, Datadog, Highlight).
6. **06 - Analytics**: Check for privacy-first event tracking (PostHog, Plausible, Umami).
7. **07 - Rate Limiting**: Check for rate limiting middleware on auth routes (`rate-limit`, `slowapi`).
8. **08 - Access Control (RBAC)**: Check for multi-tenant query scoping and authorization middleware.
9. **09 - Password Reset**: Check for hashed single-use reset tokens with strict expiry.
10. **10 - Loading States**: Check for layout-matching skeletons and disabled loading buttons.
11. **11 - Error States**: Check for React/Vue Error Boundaries and fallback empty states.
12. **12 - Responsiveness**: Check for mobile viewport meta, >=44px touch targets, and mobile font sizing.
13. **13 - Backend Validation**: Check for runtime schema validation (Zod, Pydantic, TypeBox) on inputs.
14. **14 - Database Migrations**: Check for versioned migrations (Prisma, Alembic, Drizzle) and non-locking indexes.
15. **15 - Rollback Strategy**: Check for immutable image tags and feature flags (LaunchDarkly, PostHog, Unleash).
16. **16 - Automated Tests**: Check for unit, integration, and E2E test suites (Vitest, Jest, Pytest, Playwright).
17. **17 - Privacy Policy**: Check for published privacy policy and cookie consent mechanism.
18. **18 - Terms of Service**: Check for terms of service and signup consent notices.
19. **19 - Image Compression**: Check for next-gen image formats (WebP/AVIF) and responsive `srcset`.
20. **20 - Custom 404 Page**: Check for branded not-found routing and recovery CTAs.

#### Step 3: Compute Maturity Score
- **Level 1 (MVP Foundation)**: Items 01, 02, 03, 09, 10, 11, 12, 13, 20.
- **Level 2 (Scale & Security)**: Items 04, 05, 06, 07, 08, 16, 17, 18, 19 + Level 1.
- **Level 3 (Enterprise & Zero-Downtime)**: Items 14, 15 + Level 1 & 2.

#### Step 4: Output the Audit Report & Immediate Next Steps
Present a concise scorecard to the user with the top 3 highest-priority missing items and offer to fix them immediately.

---

### 2. `/devbible:scaffold <item>`
When the user asks to scaffold or fix an item:
- **`error-handler`**: Scaffolds Express or FastAPI standardized error handlers and status codes.
- **`logger`**: Scaffolds Pino (Node.js) or structlog (Python) structured JSON logging with correlation IDs.
- **`docker-compose`**: Scaffolds a multi-service production stack (App + PostgreSQL + Redis + Caddy SSL).
- **`review-checklist`**: Copies `PROJECT-REVIEW-CHECKLIST.md` into the user's root directory.
