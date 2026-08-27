# 📋 Project Production Review Checklist

> **Instructions**: Copy and paste this file (or import it as a GitHub Issue) into your project repository to audit your application before launching to production. Check off each item as verified.

---

## 🎯 Project Information

- **Project / Service Name**: `[Your Project Name]`
- **Review Date**: `YYYY-MM-DD`
- **Lead Reviewer**: `@username`
- **Target Maturity Level**: `[ ] Level 1 (MVP)` | `[ ] Level 2 (Scale)` | `[ ] Level 3 (Enterprise)`

---

## ✅ The 20-Point Production Checklist

### 1. Error Handling ([Guide](01-error-handling.md))
- [ ] Centralized global error handler middleware configured.
- [ ] Internal database error details and stack traces stripped in production.
- [ ] Standardized JSON error response format (`status`, `code`, `message`, `correlationId`).
- [ ] Appropriate HTTP status codes returned across all endpoints.

### 2. Decent Structured Logging ([Guide](02-logging.md))
- [ ] Structured JSON logging enabled (e.g. Pino, Winston, structlog).
- [ ] `x-correlation-id` attached to every request and included in log context.
- [ ] Automatic redaction of sensitive data (passwords, tokens, cookies, PII).
- [ ] Logs written to `stdout`/`stderr` and shipped to a log aggregator.

### 3. Database Backup & Recovery ([Guide](03-database-backup.md))
- [ ] Automated daily snapshots / Point-in-Time Recovery (PITR) configured.
- [ ] Encrypted backups stored in an isolated, off-site storage bucket.
- [ ] Backup restoration drill successfully performed and timed.

### 4. Staging Environment ([Guide](04-staging-environment.md))
- [ ] Isolated staging environment mirroring production architecture.
- [ ] Staging completely separated from production databases and live third-party keys.
- [ ] Anonymized test data used in staging.

### 5. Monitoring & Alerting ([Guide](05-monitoring.md))
- [ ] Deep health checks (`/healthz`, `/readyz`) verifying DB and cache connectivity.
- [ ] APM tracking p95 / p99 response latencies.
- [ ] Real-time error alerting connected to Slack, Discord, or PagerDuty.

### 6. Analytics & Event Tracking ([Guide](06-analytics.md))
- [ ] Critical conversion and business events tracked server-side and client-side.
- [ ] User consent and Do Not Track (DNT) respected before initializing tracking.
- [ ] PII strictly excluded from analytics payloads.

### 7. Rate Limiting ([Guide](07-rate-limiting.md))
- [ ] Strict rate limits configured on `/auth/login`, `/auth/register`, and `/auth/reset-password`.
- [ ] Redis-backed distributed rate limiter for multi-instance services.
- [ ] HTTP `429 Too Many Requests` returned with `RateLimit-*` headers.

### 8. Access Control & RBAC ([Guide](08-access-control.md))
- [ ] Multi-tenant isolation: All queries strictly scoped by `organization_id` or `user_id`.
- [ ] Authorization checks enforced at the business logic layer, not only the router.
- [ ] Mutation endpoints verify object ownership before updating or deleting.

### 9. Secure Password Reset ([Guide](09-password-reset.md))
- [ ] Cryptographically random reset tokens generated and stored **hashed** (SHA-256) in DB.
- [ ] Reset tokens expire in 15–30 minutes and are single-use.
- [ ] Generic confirmation response returned to prevent user enumeration.

### 10. Loading States & Skeletons ([Guide](10-loading-states.md))
- [ ] Skeleton loaders match target content dimensions to prevent Cumulative Layout Shift (CLS < 0.1).
- [ ] Action buttons enter disabled/spinning state immediately on submit.
- [ ] Optimistic UI updates applied for quick feedback where appropriate.

### 11. Error States & Fallback UI ([Guide](11-error-states.md))
- [ ] Granular Error Boundaries wrap distinct UI widgets to prevent whole-page whiteouts.
- [ ] Friendly empty states provided for 0 search results, empty feeds, and missing records.
- [ ] Actionable "Try Again" / "Reload Section" buttons available on component failures.

### 12. True Responsiveness ([Guide](12-responsiveness.md))
- [ ] Tested across screen sizes (320px, 375px, 768px, 1024px, 1440px) with zero horizontal overflow.
- [ ] Touch targets are at least 44x44px with comfortable tap spacing.
- [ ] Inputs have `font-size >= 16px` on mobile to prevent iOS Safari auto-zoom.

### 13. Backend Validation & Sanitization ([Guide](13-backend-validation.md))
- [ ] Strict schema validation (Zod, Pydantic, TypeBox) applied on `body`, `query`, and `params`.
- [ ] Unknown / extraneous fields stripped to prevent mass assignment vulnerabilities.
- [ ] HTML and string inputs sanitized against XSS payloads.

### 14. Organized Database Migrations ([Guide](14-database-migrations.md))
- [ ] Migrations managed via versioned migration files in git (Prisma, Alembic, Drizzle).
- [ ] Expand/Contract pattern followed for breaking column or table changes.
- [ ] Non-locking index creation (`CREATE INDEX CONCURRENTLY` in Postgres).

### 15. Rollback Strategy ([Guide](15-rollback-strategy.md))
- [ ] Immutable deployment tags used (no `:latest`).
- [ ] Fast one-click rollback mechanism tested and documented.
- [ ] Feature flags configured for high-risk new releases.

### 16. Minimum Automated Tests ([Guide](16-testing.md))
- [ ] Unit tests cover core domain calculations and critical logic (>80% coverage).
- [ ] Integration tests verify API endpoints against real test databases.
- [ ] Critical path E2E tests (Signup -> Checkout/Core Action) pass in CI pipeline.

### 17. Privacy Policy & Compliance ([Guide](17-privacy-policy.md))
- [ ] Privacy Policy linked in footer detailing data collection and sub-processors.
- [ ] Cookie consent banner enabled for regions requiring opt-in consent.
- [ ] "Delete My Account & Data" workflow implemented to handle deletion requests.

### 18. Terms of Service ([Guide](18-terms-of-service.md))
- [ ] Terms of Service published with Acceptable Use Policy (AUP) and liability limits.
- [ ] Terms acceptance notice or checkbox presented at user registration.

### 19. Image Compression & Modern Formats ([Guide](19-image-compression.md))
- [ ] Images served in next-gen formats (WebP or AVIF) with responsive `srcset`.
- [ ] Native lazy loading (`loading="lazy"`) enabled on below-the-fold media.
- [ ] User-uploaded media resized and EXIF GPS metadata stripped before storage.

### 20. Custom Branded 404 Error Page ([Guide](20-404-error-page.md))
- [ ] Custom 404 page matches application design and branding.
- [ ] Genuine HTTP 404 status code returned (no soft-404s).
- [ ] Clear call-to-action buttons ("Back to Home", "Search", "Contact Support").

---

## 📝 Review Sign-Off

| Role | Name | Status | Date |
| :--- | :--- | :--- | :--- |
| **Backend Lead** | | [ ] Approved | |
| **Frontend Lead** | | [ ] Approved | |
| **DevOps / Security**| | [ ] Approved | |

**Decision**: `[ ] READY TO SHIP` | `[ ] REVISION REQUIRED`
