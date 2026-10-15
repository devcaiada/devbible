# DevBible 🛡️

<p align="center">
  <img src="assets/images/devbible_cover.png" alt="DevBible - The Ultimate Development Checklist & Guide for Vibecoders" width="100%" />
</p>

> The ultimate open-source development reference built by and for vibecoders and modern builders. Ship robust, production-ready applications without reinventing the wheel.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Checklist Items](https://img.shields.io/badge/Checklist-20%20Items-blue.svg)](checklist/README.md)
[![Maturity Levels](https://img.shields.io/badge/Maturity-3%20Tiers-purple.svg)](checklist/MATURITY-LEVELS.md)
[![Version](https://img.shields.io/badge/Release-v1.0.0-orange.svg)](CHANGELOG.md)

---

## 🌟 What is DevBible?

**DevBible** is an opinionated, practical development reference created for modern full-stack developers, indie hackers, and vibecoders. In the era of rapid AI-assisted development, speed is easy — but shipping **reliable**, **secure**, and **scalable** software is where most builders struggle.

DevBible bridges that gap by providing:
1. **[DevBible CLI Auditor](bin/devbible.js)**: Run `npx devbible audit` to scan your repository in seconds and receive an instant production-readiness scorecard.
2. **[DevBible Agent Skill](skills/devbible-audit/SKILL.md)**: Native skill for Claude Code, Codex, and Gemini to audit codebases and scaffold missing production boilerplate.
3. **[SaaS Security Audit Prompt](resources/security-audit-prompt.md)**: A copy-paste agent prompt to audit 5 critical vulnerability vectors, generate an executive PDF report, and create GitHub Issues.
4. **[Codebase Cleanup & Debt Eradication Prompt](resources/codebase-cleanup-prompt.md)**: A copy-paste prompt to aggressively eliminate dead code, duplicate logic, and tech debt.
5. **[Production-Readiness Checklist](checklist/README.md)**: 20+ comprehensive verification items covering everything from error boundaries and database migrations to rate limiting and privacy policies.
6. **[Project Review Checklist Template](checklist/PROJECT-REVIEW-CHECKLIST.md)**: A copyable markdown audit sheet to review and sign off on your projects before launch.
7. **[Production Maturity Framework](checklist/MATURITY-LEVELS.md)**: A 3-tier roadmap (MVP -> Growth -> Enterprise) with copyable readiness badges.
8. **[Skills Catalog](skills/README.md)**: Curated guides and best practices across modern Frontend, Backend, DevOps, and Database ecosystems.
9. **[Reusable Templates](templates/)**: Drop-in production configurations for logging, error handling, Docker Compose, and environment variables.
10. **[Practical Examples](examples/)**: Real-world code implementations demonstrating good vs. bad patterns.
11. **[Curated Resources](resources/)**: Battle-tested tools, libraries, books, and courses.

---

## 🛠️ Quick Start: Automated CLI & Agent Skill

Audit your codebase in seconds without manually checking 20 documents.

### 1. Run the DevBible CLI
```bash
# Scan current repository and get an instant production readiness score
npx devbible audit

# Run in CI/CD with strict mode to fail build if MVP Level 1 items are missing
npx devbible audit --strict --level 1

# Generate a GitHub-flavored Markdown scorecard for PR comments or CI summaries
npx devbible audit --markdown --output devbible-report.md

# Output raw JSON for custom dashboards and automation
npx devbible audit --json

# List all 20 checklist items & maturity levels (or filter by tier)
npx devbible list --level 1

# Scaffold production-ready templates directly into your project
npx devbible scaffold health-check          # /healthz and /readyz probes
npx devbible scaffold security-headers      # Helmet CSP/HSTS & Next.js security headers
npx devbible scaffold next-error-boundary   # Next.js App Router error.tsx boundary
npx devbible scaffold github-ci             # Production GitHub Actions workflow
npx devbible scaffold pino-logger           # Structured JSON logger with request IDs
npx devbible scaffold express-error-handler # Centralized error middleware
npx devbible scaffold docker-compose        # Production multi-service stack
```

### 2. Install the DevBible Agent Skill
Equip your AI coding agent with the `/devbible:audit` and `/devbible:scaffold` commands:

- **Claude Code**:
  ```bash
  npx skills add https://github.com/devcaiada/devbible --skill devbible-audit
  ```
- **Gemini / Antigravity**:
  ```bash
  mkdir -p ~/.gemini/antigravity/skills/devbible-audit
  curl -s https://raw.githubusercontent.com/devcaiada/devbible/main/skills/devbible-audit/SKILL.md -o ~/.gemini/antigravity/skills/devbible-audit/SKILL.md
  ```
- **Codex**:
  ```bash
  curl -s https://raw.githubusercontent.com/devcaiada/devbible/main/skills/devbible-audit/SKILL.md -o .codex/skills/devbible-audit.md
  ```

---

## 🚨 Ultimate SaaS Security Audit Prompt (Copy & Paste)

> 🛡️ **Scan your SaaS for critical vulnerabilities in minutes.** Copy and paste this master prompt into **Claude Code**, **Cursor**, **Antigravity / Gemini**, **VS Code**, or **Codex**. The AI agent will detect your stack, systematically audit 5 critical vulnerability vectors, generate a comprehensive executive PDF report (`docs/security-audit/security-audit-report.pdf`), and output complete, ready-to-paste **GitHub Issues** for every finding.

📖 Read the full guide & documentation in **[resources/security-audit-prompt.md](resources/security-audit-prompt.md)**.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🛡️ 5 Core Security Audit Checkpoints                                         │
├─────────────────┬───────────────────────────────────────────────────────────┤
│ 1. Tenant Lock  │ Missing multi-tenant isolation, un-scoped queries, no RLS │
│ 2. Client Gates │ Frontend-only role checks (isAdmin) without backend gates │
│ 3. IDOR Bugs    │ Object access/mutation by ID without ownership checks     │
│ 4. Exposed Keys │ Hardcoded API keys, JWT secrets, unsafe default fallbacks │
│ 5. XSS / Inputs │ Unsanitized innerHTML, dangerouslySetInnerHTML, eval, URL │
└─────────────────┴───────────────────────────────────────────────────────────┘
```

<details open>
<summary><b>📋 Click to View / Copy the Complete Security Audit Prompt</b></summary>

```markdown
Review this codebase for five critical security vulnerabilities. Before beginning, detect the project's stack (programming language, framework, ORM/query builder, auth mechanism, frontend, and deployment configurations such as Docker/CI/Helm/Terraform) and adapt each category to its stack-specific equivalent:

1. BROKEN TENANT LOCK (Tenant / Owner Isolation) — In Supabase, this means missing RLS; in custom APIs, it refers to list, search, aggregation, reporting, or export queries that do not filter by the authenticated user or the organization/workspace/tenant to which they belong. First identify the project's isolation mechanism (RLS, tenant middleware, manual user_id filters, etc.) and point out everywhere it is missing, bypassed, or leaky.

2. CLIENT-SIDE ONLY AUTHORIZATION — Privileged operations (admin actions, system settings, user management, mutation endpoints) where the frontend hides UI elements based on roles (isAdmin, canEdit, role...), but the backend server does NOT perform an equivalent check. Cross-reference every frontend role gate with its corresponding API endpoint and confirm that the backend enforces authorization on all sensitive routes.

3. IDOR (Insecure Direct Object Reference) — Routes that retrieve, modify, or delete an object by ID (via path, query param, or request body) without verifying that the object belongs to the requesting user/tenant. Systematically inspect ALL backend route handlers, not just a random sample.

4. EXPOSED KEYS & SECRETS (Hardcoding) — API keys, tokens, passwords, signature secrets (JWT, webhooks), private keys, and default credentials embedded in source code, configuration files, docker-compose, Helm charts, CI pipelines, scripts, or documentation. Pay special attention to public fallback defaults that become real secrets if omitted (e.g. ${VAR:-default-value}) and the absence of startup validations that fail fast when these defaults are detected. Also inspect git history for committed secrets and frontend bundles for leaked keys.

5. UNSANITIZED INPUTS (XSS & Injection) — On the frontend: innerHTML, dangerouslySetInnerHTML, framework equivalents (v-html, [innerHTML], etc.), markdown/HTML rendering without sanitization, user-controlled URLs in href/src (javascript:), eval(), and new Function(). On the backend: unescaped user inputs injected into HTML emails, templates, or raw responses. Verify whether a sanitization library exists in the project and whether it is applied at all vulnerable points.

AUDIT RULES:
- Report only verified findings grounded in the actual codebase. No speculation or hallucinations. For each finding, include: file path, exact line number(s), code snippet, explanation of why it is exploitable, and severity (critical / high / medium / low / informational).
- List findings file-by-file, line-by-line.
- Also record what was inspected and confirmed SECURE (e.g., "Router X properly verifies ownership across all handlers") — this forms the Strengths section and proves comprehensive audit coverage.
- When a category does not apply to the stack (e.g., headless/backend-only project without a frontend), explicitly state this rather than inventing findings.
- Note any specific conditions required for exploitability (e.g., feature flags enabled, insecure configuration required).

AFTER THE AUDIT, generate a visually polished, executive PDF REPORT saved to docs/security-audit/security-audit-report.pdf containing:

a) Cover Page: Title "Security Audit Report — <Project Name>", date, audited scope, and methodology notes (how each category was mapped to the detected stack).
b) Executive Summary: Total findings by severity, a donut chart showing severity breakdown, and a bar chart showing findings by category. Palette: critical #B91C1C, high #EA580C, medium #D97706, low #2563EB, strengths/passing #059669.
c) Strengths (what is verified secure with evidence) and Weaknesses (core architectural risks).
d) Detailed Findings Table by category: Severity | File:Line | Description, with color-coded severity badges.
e) Prioritized Recommendations (P1, P2, P3...).
f) AT THE END OF THE PDF, a "GITHUB ISSUES" section: for every actionable finding, provide the COMPLETE Markdown text of a GitHub Issue, ready to copy and paste, inside a delimited block (e.g. between --- ISSUE n --- and --- END ISSUE n ---). Each issue must contain:
- Title formatted as "[Security] <Short vulnerability summary>"
- Suggested labels: security + severity
- Problem description and why it is exploitable
- Evidence: file:line with code snippet
- Impact
- Remediation guidance
- Acceptance criteria (verifiable checklist)
Group closely related trivial findings into a single issue where appropriate (e.g., multiple default secrets of the same category) to avoid issue tracker spam.

PDF GENERATION — TECHNICAL GUIDELINES:
- Do not install dependencies globally. Use an isolated environment (e.g. Python venv with reportlab + matplotlib, or equivalent local tooling; headless browser / wkhtmltopdf / pandoc converting HTML to PDF is also acceptable).
- Keep the generator script in docs/security-audit/ so the report can be regenerated in future CI/CD pipelines.
- Verify the generated PDF: page count, chart rendering quality, and table readability (rasterize pages if necessary). Fix visual defects before finishing.
- Format for standard A4 pages with ~2cm margins, header/footer with report title and page numbers.

Deliver to me at the end: the generated PDF report, the full findings list in chat (file-by-file, line-by-line), and the paths to all created files.
```
</details>

---

## 🧹 Aggressive Codebase Cleanup & Debt Eradication Prompt (Copy & Paste)

> ⚡ **Clean up AI prototyping mess and delete dead code safely.** Rapid AI coding helps vibecoders build fast, but often accumulates unused components, dead imports, duplicate utilities, and abandoned files. Copy and paste this prompt into **Claude Code**, **Cursor**, **Antigravity / Gemini**, **VS Code**, or **Codex** to run an aggressive yet safe code cleanup and technical debt audit.

📖 Read the full guide & execution protocol in **[resources/codebase-cleanup-prompt.md](resources/codebase-cleanup-prompt.md)**.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🧹 8 Codebase Cleanup & Simplification Vectors                              │
├─────────────────┬───────────────────────────────────────────────────────────┤
│ 1. Dead Code    │ Unused functions, routes, APIs, variables, and imports    │
│ 2. Duplication  │ Copy-pasted logic, repetitive helpers, redundant utils    │
│ 3. Orphaned UI  │ Unrendered React/Vue components and dead style tokens     │
│ 4. Over-Complex │ Over-engineered abstractions that can be simplified       │
│ 5. Legacy Code  │ Deprecated shims, outdated polyfills, unused endpoints    │
│ 6. Redundant IO │ Duplicate DB queries, un-cached network fetches           │
│ 7. Abandoned    │ Disconnected files, orphaned assets, scratch scripts      │
│ 8. Tech Debt    │ Brittle patterns, anti-patterns, missing type safety      │
└─────────────────┴───────────────────────────────────────────────────────────┘
```

<details open>
<summary><b>📋 Click to View / Copy the Complete Codebase Cleanup Prompt</b></summary>

```markdown
Analyze the entire codebase and identify:

1. Dead code (unused functions, files, components, routes, APIs, variables, imports, and dependencies)
2. Duplicate logic that should be consolidated
3. Unused UI components
4. Overlay complex implementations that can be simplified
5. Legacy code that is no longer needed
6. Redundant database queries or APIs calls
7. Files that appear abandoned or disconnected from the application
8. Opportunities to reduce technical debt

For each issue:

* Explains why it is unnecessary
* Estimate the impact of removing it
* Identify any risks before deletion
* Provide a recommended cleanup plan

Be aggressive but safe. Assume the goal is to simplify the codebase, improve maintainability, and remove anything that does not provide value.
```
</details>

---

## ⚡ Top Favorite AI Skills & Power Tools

A hand-picked selection of essential skills and utilities for 10x vibecoders using **Claude Code**, **Codex**, and **Gemini / Antigravity**.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🧠 AI Coding Power Stack                                                    │
├─────────────────┬───────────────────┬───────────────────────────────────────┤
│ Tool / Skill    │ Primary Purpose   │ Target Agents                         │
├─────────────────┼───────────────────┼───────────────────────────────────────┤
│ 1. OmniRoute    │ AI Model Gateway  │ Claude Code · Codex · Gemini          │
│ 2. Claude Code  │ Terminal Coding   │ Claude Code · Codex · Gemini          │
│ 3. Claude-Mem   │ Long-Term Memory  │ Claude Code · Codex · Gemini          │
│ 4. Grill-Me     │ Spec & Plan Align │ Claude Code · Codex · Gemini          │
│ 5. Headroom     │ Token Compression │ Claude Code · Codex · Gemini          │
└─────────────────┴───────────────────┴───────────────────────────────────────┘
```

---

### 1. 🌐 [OmniRoute](https://github.com/diegosouzapw/OmniRoute)
> **Universal local AI gateway & model routing proxy.** Connects your coding assistants to 100+ LLMs with automatic fallbacks, rate limit aggregation across free provider tiers, and automated token compression.

- **Claude Code**:
  ```bash
  # Start local OmniRoute gateway
  npx omniroute start
  # Point Claude Code to OmniRoute local endpoint
  export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
  ```
- **Codex**:
  ```bash
  # Set OpenAI compatible base URL in your environment or ~/.codex/config.json
  export OPENAI_BASE_URL="http://localhost:20128/v1"
  ```
- **Gemini / Antigravity**:
  ```bash
  # Configure custom endpoint in Gemini / Antigravity settings or skill proxy
  export GEMINI_API_BASE="http://localhost:20128/v1"
  ```
- **🔗 GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)

---

### 2. 🤖 [Claude Code Setup](https://github.com/anthropics/claude-code)
> **Agentic terminal coding environment.** Operates directly inside your repository terminal to understand architecture, run tests, fix bugs, and automate Git workflows with deep MCP integration.

- **Claude Code**:
  ```bash
  npm install -g @anthropic-ai/claude-code
  claude
  # Add CLAUDE.md context to your repo root
  ```
- **Codex**:
  ```bash
  # Configure Codex CLI to emulate Claude Code workspace indexing conventions
  npx @anthropic-ai/claude-code --print-config >> ~/.codex/config.json
  ```
- **Gemini / Antigravity**:
  ```bash
  # Use Antigravity / Gemini terminal agents with CLAUDE.md & AGENTS.md conventions
  agy --mode agent
  ```
- **🔗 GitHub**: [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

---

### 3. 🧠 [Claude-Mem](https://github.com/thedotmack/claude-mem)
> **Persistent episodic memory layer.** Automatically records session decisions, architecture insights, and user preferences into a local SQLite FTS5 database, injecting relevant historical memory into future agent sessions.

- **Claude Code**:
  ```bash
  # Install via npx
  npx claude-mem install
  # Or via plugin marketplace
  /plugin marketplace add thedotmack/claude-mem
  /plugin install claude-mem
  ```
- **Codex**:
  ```bash
  # Hook memory sync into Codex workspace
  npx claude-mem --agent codex
  ```
- **Gemini / Antigravity**:
  ```bash
  # Register claude-mem MCP server in Gemini / Antigravity config (~/.gemini/antigravity/mcp_config.json)
  npx claude-mem install --gemini
  ```
- **🔗 GitHub**: [github.com/thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

---

### 4. 🎯 [Grill-Me](https://github.com/mattpocock/skills)
> **Interactive design & scope interrogator by Matt Pocock.** Before generating any code, this skill interrogates you with targeted questions across the "design tree" (architecture, schemas, edge cases) to prevent misunderstood requirements.

- **Claude Code**:
  ```bash
  npx skills add https://github.com/mattpocock/skills --skill grill-me
  # Then invoke in chat:
  /grill-me
  ```
- **Codex**:
  ```bash
  # Copy grill-me prompt instructions into .codex/rules or .codex/skills/grill-me.md
  curl -s https://raw.githubusercontent.com/mattpocock/skills/main/skills/grill-me/SKILL.md -o .codex/skills/grill-me.md
  ```
- **Gemini / Antigravity**:
  ```bash
  # Place into Antigravity builtin or global skills directory
  mkdir -p ~/.gemini/antigravity/skills/grill-me
  curl -s https://raw.githubusercontent.com/mattpocock/skills/main/skills/grill-me/SKILL.md -o ~/.gemini/antigravity/skills/grill-me/SKILL.md
  # Then trigger in chat with /grill-me
  ```
- **🔗 GitHub**: [github.com/mattpocock/skills](https://github.com/mattpocock/skills)

---

### 5. ⚡ [Headroom](https://github.com/headroomlabs-ai/headroom)
> **Real-time token & context compression layer.** Slashes token consumption by 60–95% on JSON payloads and 15–20% on codebase reads using AST-aware compression with lossless, reversible caching (CCR).

- **Claude Code**:
  ```bash
  # Wrap Claude Code directly
  headroom wrap claude
  # Or run Headroom proxy
  headroom proxy --port 8787
  export ANTHROPIC_BASE_URL="http://localhost:8787"
  ```
- **Codex**:
  ```bash
  # Wrap Codex CLI or proxy OpenAI requests
  headroom wrap codex
  export OPENAI_BASE_URL="http://localhost:8787/v1"
  ```
- **Gemini / Antigravity**:
  ```bash
  # Install Headroom MCP server for lossless retrieval
  headroom mcp install
  # Or wrap Gemini CLI
  headroom wrap gemini
  ```
- **🔗 GitHub**: [github.com/headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)

---

## 🏆 Community Favorites & The Harsh Truth About AI Skills

> 💡 **The Core Realization**: Most leaderboard skills *do not* drastically improve model outputs compared to writing a clear, unambiguous prompt. The real superpower lies in **automating repetitive workflows** and creating **internal, repository-specific skills** (e.g. *"how to build a new API endpoint in this exact codebase"*), rather than hoarding generic public skills that pollute agent context.

For full architectural details and guides on building custom repo skills, see the **[Community Skills Guide](skills/community-skills-guide.md)**.

### 📊 Community Skills Summary Table

| Skill / Command | Purpose & Workflow | Official / Ecosystem Source |
| :--- | :--- | :--- |
| **`grill-me`** | Interrogates the dev via a structured design tree before writing code | [mattpocock/skills](https://github.com/mattpocock/skills) |
| **`prototype`** | Builds throwaway sandbox prototypes to validate UI/logic fast | [mattpocock/skills](https://github.com/mattpocock/skills) |
| **`frontend-design`** | 3-step design process (Brainstorm ➔ Review ➔ Implementation) | [anthropics/claude-code](https://github.com/anthropics/claude-code) |
| **`skill-creator`** | Meta-prompt framework for building bespoke repository skills | [anthropics/skills](https://github.com/anthropics/skills) |
| **`systematic-debugging`** | 4-phase root-cause analysis (Investigate ➔ Pattern ➔ Test ➔ Patch) | Community Standard |
| **`tdd`** | Enforces Red ➔ Green ➔ Refactor test-driven cycles | Community Standard |
| **`triage`** | Converts chaotic bug/feature brainstorms into crisp agent briefs | Community Standard |
| **`handoff`** | Serializes and compacts session context to pass to fresh subagents | Community Standard |
| **`improve-architecture`** | Evaluates modularity, coupling, and clean architecture heuristics | Community Standard |
| **`review`** | Native pre-commit & PR git diff reviewer (built-in) | Pre-installed in Claude Code |
| **`find-skills`** | Marketplace search *(⚠️ Caution: risk of context bloat)* | Community Ecosystem |

---

## 🔄 The Production Delivery Lifecycle

```mermaid
graph LR
    subgraph Design & Build
        A[💡 Architecture & Stack] --> B[⚙️ Core Feature Dev]
        B --> C[🎨 Frontend & UX]
    end

    subgraph Verify with DevBible
        C --> D[📋 DevBible Checklist]
        D --> E{Maturity Level?}
        E -->|Level 1| F[🥉 MVP / Launch]
        E -->|Level 2| G[🥈 Scale & Security]
        E -->|Level 3| H[🥇 Enterprise / Zero-Downtime]
    end

    subgraph Ship & Observe
        F & G & H --> I[🚀 Production Deploy]
        I --> J[📊 Observability & APM]
    end
```

---

## 📁 Repository Structure

```text
devbible/
│
├── README.md                    # Overview and guide (You are here)
├── CONTRIBUTING.md              # How to contribute to DevBible
├── CHANGELOG.md                 # Semantic version history
├── LICENSE                      # MIT License
│
├── .github/                     # GitHub Community & Automation
│   ├── ISSUE_TEMPLATE/          # Issue templates (Propose items, report gaps)
│   ├── PULL_REQUEST_TEMPLATE.md # Standard PR review checklist
│   └── workflows/               # CI markdown linting & link checker
│
├── skills/                      # Curated Skills & Stack Reference
│   ├── README.md                # Skills index & stack overview
│   ├── frontend/                # React, Vue, CSS Frameworks
│   ├── backend/                 # Node.js, Python, Go
│   ├── devops/                  # Docker, CI/CD pipelines
│   └── database/                # PostgreSQL, MongoDB
│
├── checklist/                   # 20-Item Production-Readiness Checklist
│   ├── README.md                # Master checklist index & progress tracker
│   ├── MATURITY-LEVELS.md       # 3-Tier maturity framework & badges
│   ├── 01-error-handling.md     # Global exception handling & API error standards
│   ├── 02-logging.md            # Structured JSON logs & correlation IDs
│   ├── 03-database-backup.md    # Automated backups & restore testing
│   ├── 04-staging-environment.md# Isolated staging & preview deploys
│   ├── 05-monitoring.md         # APM, health checks & error alerting
│   ├── 06-analytics.md          # Privacy-friendly product & user analytics
│   ├── 07-rate-limiting.md      # API rate limiting & DDoS protection
│   ├── 08-access-control.md     # Role-based access control (RBAC/ABAC)
│   ├── 09-password-reset.md     # Secure token generation & credential recovery
│   ├── 10-loading-states.md     # Skeletons, spinners & layout stability
│   ├── 11-error-states.md       # Error boundaries & fallback UX
│   ├── 12-responsiveness.md     # Mobile-first design & cross-device layouts
│   ├── 13-backend-validation.md # Schema validation & input sanitization
│   ├── 14-database-migrations.md# Zero-downtime migrations & rollbacks
│   ├── 15-rollback-strategy.md  # Automated deployment rollback triggers
│   ├── 16-testing.md            # Automated testing strategy (Unit, Integration, E2E)
│   ├── 17-privacy-policy.md     # GDPR/CCPA compliance & cookie consent
│   ├── 18-terms-of-service.md   # User terms & legal liability protection
│   ├── 19-image-compression.md  # Modern formats (WebP/AVIF) & responsive delivery
│   └── 20-404-error-page.md     # Actionable 404 page & navigation recovery
│
├── templates/                   # Drop-in Production Templates
│   ├── error-handler/           # Express & FastAPI error handlers
│   ├── logging-config/          # Pino & Structlog JSON loggers
│   ├── docker-compose/          # Multi-service production compose stack
│   ├── health-check/            # Express & FastAPI /healthz and /readyz probes
│   ├── security-headers/        # Helmet CSP/HSTS & Next.js security headers
│   ├── next-error-boundary/     # Next.js App Router app/error.tsx boundary
│   └── github-ci/               # Automated DevBible audit GitHub Actions workflow
│
├── resources/                   # Curated Developer Resources
│   ├── recommended-tools.md     # Vetted developer tools & services
│   └── books-and-courses.md     # Top-tier engineering books & learning paths
│
└── examples/                    # End-to-End Implementation Examples
    ├── error-handling/          # Standard response wrappers & custom errors
    └── logging-configuration/   # Request-scoped logger with correlation IDs
```

---

## 🔍 Searchable Topic & Keyword Index

Looking for a specific topic? Jump directly to the relevant guide:

| Tag / Keyword | Related Files |
| :--- | :--- |
| `#security` `#auth` | [08-access-control.md](checklist/08-access-control.md), [09-password-reset.md](checklist/09-password-reset.md), [07-rate-limiting.md](checklist/07-rate-limiting.md) |
| `#observability` `#logging` | [02-logging.md](checklist/02-logging.md), [05-monitoring.md](checklist/05-monitoring.md), [pino-logger.ts](templates/logging-config/pino-logger.ts) |
| `#frontend` `#ux` `#performance` | [10-loading-states.md](checklist/10-loading-states.md), [11-error-states.md](checklist/11-error-states.md), [12-responsiveness.md](checklist/12-responsiveness.md), [19-image-compression.md](checklist/19-image-compression.md), [20-404-error-page.md](checklist/20-404-error-page.md) |
| `#database` `#migrations` | [03-database-backup.md](checklist/03-database-backup.md), [14-database-migrations.md](checklist/14-database-migrations.md), [postgresql.md](skills/database/postgresql.md), [mongodb.md](skills/database/mongodb.md) |
| `#devops` `#deployment` | [04-staging-environment.md](checklist/04-staging-environment.md), [15-rollback-strategy.md](checklist/15-rollback-strategy.md), [docker.md](skills/devops/docker.md), [ci-cd.md](skills/devops/ci-cd.md) |
| `#compliance` `#legal` | [17-privacy-policy.md](checklist/17-privacy-policy.md), [18-terms-of-service.md](checklist/18-terms-of-service.md) |

---

## 🛡️ Production Readiness Badges

Showcase your project's production readiness in your repository's README:

```markdown
<!-- Level 1: MVP Ready -->
[![DevBible Verified: Level 1 MVP](https://img.shields.io/badge/DevBible-Level%201%20MVP-blue?style=for-the-badge&logo=rocket)](https://github.com/devcaiada/devbible/blob/main/checklist/MATURITY-LEVELS.md)

<!-- Level 2: Scale Ready -->
[![DevBible Verified: Level 2 Scale](https://img.shields.io/badge/DevBible-Level%202%20Scale-green?style=for-the-badge&logo=checkmarx)](https://github.com/devcaiada/devbible/blob/main/checklist/MATURITY-LEVELS.md)

<!-- Level 3: Enterprise Ready -->
[![DevBible Verified: Level 3 Enterprise](https://img.shields.io/badge/DevBible-Level%203%20Enterprise-purple?style=for-the-badge&logo=shield)](https://github.com/devcaiada/devbible/blob/main/checklist/MATURITY-LEVELS.md)
```

---

## 🤝 Contributing

We welcome contributions from everyone! Whether you want to propose a new checklist item, report a missing topic, or share a battle-tested template:

1. Read our [Contribution Guide](CONTRIBUTING.md).
2. Use one of our [GitHub Issue Templates](.github/ISSUE_TEMPLATE/).
3. Submit a pull request following our standard format.

---

## 📄 License

DevBible is open-source software licensed under the [MIT License](LICENSE).
