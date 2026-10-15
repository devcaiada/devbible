# Changelog 📜

All notable changes to the **DevBible** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.1] - 2026-10-15

### Fixed
- **Action**: shortened the `description` in `action.yml` to under 125 characters, as the GitHub Marketplace requires.

## [1.1.0] - 2026-10-15

### Added
- **GitHub Action** (`action.yml`): audits a repository on every pull request, posts and keeps updated a scorecard comment through the GitHub API, writes a job summary and can fail the build below a minimum score (`fail-under`). Outputs: `score`, `maturity`, `passed`, `warnings`, `failed`.
- **CLI**: `devbible audit --json` prints the audit as machine-readable JSON (no banner, no colors).
- `scripts/report-markdown.js` renders the JSON report as Markdown (used by the Action).
- `.github/workflows/devbible-audit.yml`: the repository audits itself with its own Action.

## [1.0.1] - 2026-10-15

### Documentation
- **README**: every `npx devbible …` command now reads `npx github:devcaiada/devbible …`. The package is not published on npm (`npx devbible` returned 404), while the GitHub form works out of the box.
- **README**: added a Stars badge, a Discussions badge and a "Questions & Community" section. GitHub Discussions are now enabled, which also fixes the link in the issue-template chooser.

### Fixed
- **CLI audit**: checks `[12] Mobile Responsiveness` and `[19] Image Compression & Media CDN` returned `PASS` on both branches of the condition, so an empty project always passed them and the readiness score was inflated. They now return `WARN` when no evidence is found.
- **CLI banner**: the version is read from `package.json` instead of being hardcoded as `v1.0.0`.

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
