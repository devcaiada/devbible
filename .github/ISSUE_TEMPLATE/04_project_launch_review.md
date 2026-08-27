---
name: "🚀 Production Launch Review Checklist"
about: "Run a full 20-point production-readiness review for your project or feature"
title: "[LAUNCH REVIEW] <Project / Feature Name>"
labels: ["launch-review", "production-readiness"]
assignees: []
---

## 🎯 Target Maturity
- [ ] Level 1 (MVP Launch)
- [ ] Level 2 (Scale & Security)
- [ ] Level 3 (Enterprise & Zero-Downtime)

---

## 📋 20-Point Production Readiness Checklist

### Core Architecture & Stability
- [ ] **1. Error Handling**: Centralized error middleware, sanitized production responses, standard status codes.
- [ ] **2. Decent Logging**: Structured JSON logger, `x-correlation-id` tracing, automatic PII redaction.
- [ ] **3. Database Backup**: Automated snapshots/PITR, offsite encrypted storage, verified restore drills.
- [ ] **4. Staging Environment**: Isolated staging environment, separated credentials, test data.
- [ ] **5. Monitoring & Alerting**: Deep `/healthz` endpoints, latency tracking, real-time alert notifications.
- [ ] **6. Analytics**: Privacy-first event tracking, user consent respected, no PII logged.

### Security & Access Control
- [ ] **7. Rate Limiting**: Distributed rate limits on auth and resource-intensive endpoints.
- [ ] **8. Access Control (RBAC)**: Multi-tenant query scoping, resource ownership verification.
- [ ] **9. Secure Password Reset**: Hashed single-use tokens, 15m expiration, user enumeration defense.
- [ ] **13. Backend Validation**: Strict schema validation (Zod/Pydantic), mass assignment protection, XSS sanitization.

### Frontend & User Experience
- [ ] **10. Loading States**: Skeletons matching layouts, disabled loading buttons, CLS < 0.1.
- [ ] **11. Error States**: Isolated error boundaries, graceful fallback views, empty states.
- [ ] **12. True Responsiveness**: 320px–1440px viewport verified, >=44px touch targets, mobile input font >= 16px.
- [ ] **19. Image Compression**: Modern WebP/AVIF formats, responsive `srcset`, EXIF metadata stripped.
- [ ] **20. Custom 404 Page**: Branded not-found UX, valid HTTP 404 status, recovery navigation links.

### DevOps & Data Integrity
- [ ] **14. Database Migrations**: Expand/Contract pattern for zero downtime, non-locking indexes.
- [ ] **15. Rollback Strategy**: Immutable deployment tags, automated/one-click rollback mechanism.
- [ ] **16. Minimum Tests**: Core business unit tests, API integration tests, critical journey E2E tests.

### Legal & Compliance
- [ ] **17. Privacy Policy**: Privacy policy published, cookie consent banner, data deletion workflow.
- [ ] **18. Terms of Service**: Terms of service published, acceptable use policy, signup consent notice.

---

## 📝 Launch Notes & Sign-Off
- **Backend Sign-off**: `@username`
- **Frontend Sign-off**: `@username`
- **DevOps/Infra Sign-off**: `@username`
