# Changelog 📜

All notable changes to the **DevBible** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-10-15

### 🚀 CI/CD Automation & Expanded Boilerplates

#### Added
- **CLI CI/CD Capabilities**:
  - `--strict` flag: exits with non-zero code if any checklist item fails.
  - `--level <1|2|3>` flag: filters checklist evaluation to target maturity tier (e.g. `--level 1` for MVP foundation).
  - `--format <text|json|markdown>` (`--json`, `--markdown`): outputs structured JSON for custom dashboards or formatted Markdown for GitHub Actions PR comments and step summaries.
  - `--output <file>`: direct output export to specified file.
  - Deep codebase scanning removing arbitrary 50-file limit.
- **Production Boilerplate Templates**:
  - `health-check`: Node.js/Express liveness (`/healthz`) and deep readiness (`/readyz`) check router with DB/cache ping.
  - `fastapi-health-check`: FastAPI async health router with database ping and uptime tracking.
  - `security-headers`: Production Helmet configuration with strict CSP/HSTS and Next.js `headers()` config.
  - `next-error-boundary`: Next.js App Router `app/error.tsx` boundary with Sentry reporting and user recovery actions.
  - `github-ci`: Production GitHub Actions workflow running automated DevBible audit with automated PR comment reporting.
- **Documentation & Agent Skills**:
  - Updated `skills/devbible-audit/SKILL.md` with new scaffolding commands.
  - Complete English translation across all prompts and README sections.

---

## [1.0.0] - 2026-08-27

### 🚀 Initial Public Release

#### Added
- **Automated CLI & Agent Skill**:
  - `devbible` CLI binary (`bin/devbible.js`) with `audit`, `list`, `info`, and `scaffold` commands.
  - Native Agent Skill `devbible-audit` (`skills/devbible-audit/SKILL.md`) for automated project audits in Claude Code, Codex, and Gemini/Antigravity.
- **20-Item Production-Readiness Checklist**:
  - Comprehensive guides covering Error Handling, Logging, DB Backups, Staging, Monitoring, Analytics, Rate Limiting, RBAC Access Control, Password Reset, Loading States, Error States, Responsiveness, Backend Validation, Migrations, Rollback Strategy, Testing, Privacy Policy, Terms of Service, Image Compression, and 404 Routing.
- **Curated Skills Catalog**:
  - Frontend: React (RSC/Next.js/TanStack Query), Vue.js (Pinia/Nuxt), CSS Frameworks (Tailwind CSS v4).
  - Backend: Node.js/TypeScript, Python (FastAPI/Pydantic v2), Go.
  - DevOps: Docker (multi-stage/rootless), CI/CD (GitHub Actions).
  - Database: PostgreSQL (indexing/PgBouncer), MongoDB (ESR indexing/schema validation).
- **Reusable Production Templates**:
  - Standardized Express and FastAPI error handlers.
  - High-performance Pino and Python structlog JSON loggers.
  - Production-ready Docker Compose stack with PostgreSQL, Redis, and Caddy SSL reverse proxy.
- **Examples & Resources**:
  - Ultimate SaaS Security Audit Prompt guide (`resources/security-audit-prompt.md`) with copy-paste instructions for Claude Code, Cursor, Antigravity, VS Code, and Codex.
  - Aggressive Codebase Cleanup & Debt Eradication Prompt (`resources/codebase-cleanup-prompt.md`) for eliminating dead code, duplicate logic, and abandoned assets.
  - Featured AI Skills power stack guide (`OmniRoute`, `Claude Code`, `Claude-Mem`, `Grill-Me`, `Headroom`) with install instructions for Claude Code, Codex, and Gemini.
  - Community AI Skills guide & analysis (`skills/community-skills-guide.md`) covering `grill-me`, `prototype`, `frontend-design`, `skill-creator`, `systematic-debugging`, `tdd`, `triage`, `handoff`, `improve-architecture`, and `review`.
  - API response wrapper & custom error classes.
  - Request-scoped correlation ID logger middleware.
  - Curated developer tools, hosting providers, and recommended engineering books/courses.
- **Community & Governance**:
  - Interactive copyable **Project Production Review Checklist** (`checklist/PROJECT-REVIEW-CHECKLIST.md`).
  - GitHub Issue Templates for proposals, gap reports, and project launch audits.
  - GitHub Pull Request Template with quality checklist.
  - GitHub Actions CI workflow for markdown and link validation.
  - 3-Tier Production Maturity Framework & copyable verification badges.
