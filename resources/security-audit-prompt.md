# Ultimate SaaS Security Audit Prompt 🛡️🔍

> **One-click copy-and-paste security audit prompt** for **Claude Code**, **Cursor**, **Antigravity / Gemini**, **VS Code (Copilot/Cline/Roo)**, and **Codex**. Automatically audits your codebase for the 5 most critical SaaS security vulnerabilities, generates a professional executive PDF report with charts, and provides complete, ready-to-paste GitHub Issues for all findings.

---

## 🎯 The 5 Vulnerability Vectors Inspected

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🛡️ 5 Critical SaaS Security Checkpoints                                      │
├─────────────────┬───────────────────────────────────────────────────────────┤
│ 1. Multi-Tenant │ Broken tenant/owner boundaries, missing Supabase RLS,     │
│    Isolation    │ un-scoped queries in listing, aggregation, or exports.    │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 2. Frontend-Only│ UI hidden by role (isAdmin/canEdit) without server-side   │
│    Authorization│ enforcement on corresponding backend API endpoints.       │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 3. IDOR Bugs    │ Direct object references in path/query/body without       │
│                 │ verifying caller ownership across all route handlers.     │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 4. Exposed Keys │ Hardcoded API keys, JWT secrets, webhook tokens, fallback │
│    & Secrets    │ defaults (${VAR:-default}), and un-sanitized git history.  │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 5. Unsanitized  │ Frontend XSS (innerHTML, unescaped markdown, javascript:) │
│    Inputs (XSS) │ and backend template injection in emails and responses.   │
└─────────────────┴───────────────────────────────────────────────────────────┘
```

---

## 📋 The Full Copy-Paste Prompt

Copy the entire block below and paste it directly into your AI coding assistant:

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

---

## 🚀 How to Run in Different AI Tools

| Environment | How to Execute |
| :--- | :--- |
| **Claude Code** | Open your project terminal, run `claude`, and paste the prompt directly into the prompt box. |
| **Cursor** | Open the Composer (`Cmd/Ctrl + I`) or Chat (`Cmd/Ctrl + L`), switch to Agent Mode, and paste the prompt. |
| **Antigravity / Gemini** | Open the workspace session and paste the prompt into the agent chat. |
| **VS Code (Copilot / Cline / Roo)** | Open the agent chat panel, ensure full workspace access is enabled, and paste the prompt. |

---

## 📊 Expected Deliverables Generated by the Agent

1. **Terminal / Chat Output**: File-by-file, line-by-line breakdown of every verified vulnerability and safe verification points.
2. **PDF Report (`docs/security-audit/security-audit-report.pdf`)**: Executive summary, severity donut charts, category distribution, and prioritized recommendations.
3. **GitHub Issue Templates**: Formatted Markdown blocks ready to be pasted directly into GitHub Issues with reproduction steps and acceptance criteria.
4. **Reproducible Script (`docs/security-audit/`)**: Python or Node.js generator script to re-run the audit reporting in future CI/CD cycles.
