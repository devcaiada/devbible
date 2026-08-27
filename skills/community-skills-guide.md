# Community AI Skills Guide & The Harsh Truth About Skills 🏆🤖

A comprehensive breakdown of the most popular community AI skills for Claude Code, Codex, and Gemini — including an honest assessment of what actually works, what is hype, and how to write high-impact custom skills.

---

## 🧠 The Harsh Truth About AI Skills

> *"Most leaderboard skills do not drastically change your output compared to simply writing a clear, unambiguous prompt. The real superpower is writing repository-specific internal skills for your own codebase."*

### 1. The Context Pollution Trap
Tools that encourage installing dozens of generic skills (like `find_skills`) frequently backfire. Every loaded skill occupies precious context tokens, injects overlapping instructions, and confuses the agent's decision-making loop. **Keep your skill stack lean.**

### 2. Generic vs. Codebase-Specific Value
- **Low Value**: A generic "how to write Python" public skill that regurgitates PEP 8.
- **High Value**: An internal repository skill (`/new-endpoint`) detailing your exact folder structure, DTO validation schema, Prisma/SQLAlchemy transaction rules, and error middleware format.

---

## 📊 Community Favorites Catalog

| Skill / Command | Primary Function | Source / Ecosystem | Context Impact |
| :--- | :--- | :--- | :---: |
| **`grill-me`** | Pre-implementation requirement interrogation | [mattpocock/skills](https://github.com/mattpocock/skills) | 🟢 Lightweight |
| **`prototype`** | Throwaway sandbox prototyping for rapid validation | [mattpocock/skills](https://github.com/mattpocock/skills) | 🟢 Lightweight |
| **`frontend-design`** | 3-phase design thinking (Brainstorm ➔ Review ➔ Build) | [anthropics/claude-code](https://github.com/anthropics/claude-code) | 🟡 Moderate |
| **`skill-creator`** | Meta-prompt framework for building custom repo skills | [anthropics/skills](https://github.com/anthropics/skills) | 🟢 On-Demand |
| **`systematic-debugging`** | 4-phase structured root-cause diagnostic process | Community Standard | 🟡 Moderate |
| **`tdd`** | Enforces Red ➔ Green ➔ Refactor test development cycle | Community Standard | 🟡 Moderate |
| **`triage`** | Transforms messy user brain-dumps into structured briefs | Community Standard | 🟢 Lightweight |
| **`handoff`** | Compresses session context for handover to fresh agents | Community Standard | 🟢 Lightweight |
| **`improve-architecture`** | Evaluates codebase modularity and design heuristics | Community Standard | 🟡 On-Demand |
| **`review`** | Built-in pull request & git diff reviewer | Pre-installed in Claude Code | 🟢 Built-in |
| **`find-skills`** | Dynamic skill marketplace discovery & installer | Community Ecosystem | 🔴 High Clutter Risk |

---

## 🔍 In-Depth Breakdown of Each Skill

### 1. 🎯 `grill-me` (by Matt Pocock)
- **What it does**: Instead of immediately generating code based on incomplete assumptions, the agent interviews the developer across a structured "design tree" (architecture, data flow, UI states, failure cases).
- **When to use**: Before starting any non-trivial feature or refactor.
- **Repository**: [github.com/mattpocock/skills](https://github.com/mattpocock/skills)

### 2. 🧪 `prototype` (by Matt Pocock)
- **What it does**: Creates disposable, isolated prototypes (e.g. temporary sandboxes or single-file test rigs) to validate UI interactions, algorithm complexity, or third-party APIs without polluting main application code.
- **When to use**: When answering "is this feasible?" before committing to an architecture.
- **Repository**: [github.com/mattpocock/skills](https://github.com/mattpocock/skills)

### 3. 🎨 `frontend-design` (Anthropic Official)
- **What it does**: Guides the agent through deliberate frontend design decisions (typography scales, color harmony, responsiveness tokens) following a strict 3-step workflow: Brainstorm ➔ Design Review ➔ Implementation.
- **When to use**: When building user-facing dashboards, landing pages, or complex UI components.
- **Repository**: [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

### 4. 🛠️ `skill-creator` (Anthropic Official)
- **What it does**: A structured meta-prompt that helps developers author clean, modular, and effective custom skills tailored to their unique repository workflows.
- **When to use**: When standardizing team conventions (e.g. creating endpoints, writing database migrations, scaffolding tests).
- **Repository**: [github.com/anthropics/skills](https://github.com/anthropics/skills)

### 5. 🔬 `systematic-debugging`
- **What it does**: Prevents the agent from applying random "spray-and-pray" code edits by enforcing a rigorous 4-step diagnostic method:
  1. **Root Cause Analysis**: Inspect stack traces and verify inputs.
  2. **Pattern Identification**: Check if similar bugs exist elsewhere in the codebase.
  3. **Hypothesis Testing**: Write a failing reproduction test.
  4. **Minimal Patch**: Apply the targeted fix and verify regression safety.
- **When to use**: Deep, elusive bugs, race conditions, or memory leaks.

### 6. 🚦 `tdd` (Test-Driven Development)
- **What it does**: Forces the agent to write a failing test first, verify the failure, implement the minimal passing code, and then refactor cleanly.
- **When to use**: Critical domain logic, financial computations, and authentication helpers.

### 7. 📥 `triage`
- **What it does**: Takes raw customer bug reports, disorganized Slack threads, or feature ideas and converts them into structured, categorized, and prioritized task briefs ready for agent execution.
- **When to use**: Sprint planning, backlog grooming, and incident response.

### 8. 🤝 `handoff`
- **What it does**: Summarizes in-flight progress, files modified, unresolved blockers, and next steps into a compact payload. Allows you to reset the agent context window or pass the task to a fresh subagent with zero context loss.
- **When to use**: Long-running debugging sessions or when hitting context limits.

### 9. 🏛️ `improve-architecture`
- **What it does**: Analyzes code modularity, coupling, dependency flow, and single-responsibility compliance to suggest actionable refactoring roadmaps.
- **When to use**: Technical debt reduction sprints and legacy codebase modernizations.

### 10. 👀 `review`
- **What it does**: Built-in diff reviewer that checks git staging or pull request branches for syntax anomalies, unhandled error paths, security leaks, and style violations.
- **When to use**: Pre-commit and pre-PR submission sanity checks.

### 11. 🔎 `find-skills`
- **What it does**: Searches online registries for third-party skills and automates their installation.
- **⚠️ Warning**: Use with caution. Installing multiple external skills often bloats the agent context without providing tangible accuracy gains over clear prompting.

---

## 💡 How to Build Your Own Repo-Specific Skill

The most valuable skill you will ever write is one customized for your team. Here is the recommended structure:

```markdown
---
name: create-endpoint
description: Scaffolds a production-ready API endpoint adhering to DevBible standards
---

# Create Endpoint Workflow

When the user asks to create a new API endpoint:
1. Define the Zod request validation schema in `src/schemas/<resource>.schema.ts`.
2. Implement business logic inside `src/services/<resource>.service.ts`.
3. Wrap responses with `sendSuccess` or throw `AppError` subclasses.
4. Add an integration test in `tests/api/<resource>.test.ts` verifying 200, 400, and 401 cases.
5. Update OpenAPI documentation definitions.
```
