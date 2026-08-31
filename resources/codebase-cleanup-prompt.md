# Aggressive Codebase Cleanup & Debt Eradication Prompt 🧹⚡

> **One-click copy-and-paste refactoring & cleanup prompt** for **Claude Code**, **Cursor**, **Antigravity / Gemini**, **VS Code**, and **Codex**. Rapid AI-assisted prototyping helps vibecoders move fast, but it often leaves behind abandoned components, duplicate logic, and dead dependencies. This prompt safely and aggressively strips out clutter, boosts maintainability, and slashes technical debt.

---

## 🎯 The 8 Cleanup Vectors Inspected

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🧹 8 Codebase Cleanup & Simplification Vectors                              │
├─────────────────┬───────────────────────────────────────────────────────────┤
│ 1. Dead Code    │ Unused functions, routes, APIs, variables, and imports.   │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 2. Duplication  │ Copy-pasted logic, repetitive helpers, redundant utils.   │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 3. Orphaned UI  │ Unrendered React/Vue components and dead style tokens.    │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 4. Over-Complex │ Over-engineered abstractions that can be simplified.      │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 5. Legacy Code  │ Deprecated shims, outdated polyfills, unused endpoints.   │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 6. Redundant I/O│ Duplicate DB queries, un-cached network fetches.          │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 7. Abandoned    │ Disconnected files, orphaned assets, scratch scripts.     │
├─────────────────┼───────────────────────────────────────────────────────────┤
│ 8. Tech Debt    │ Brittle patterns, anti-patterns, missing type safety.     │
└─────────────────┴───────────────────────────────────────────────────────────┘
```

---

## 📋 The Full Copy-Paste Prompt

Copy the entire block below and paste it directly into your AI coding assistant:

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

---

## 💡 How to Execute Safely (The Vibecoder Cleanup Protocol)

1. **Create a Clean Git Branch**:
   ```bash
   git checkout -b chore/codebase-cleanup-audit
   ```
2. **Run the Prompt in Your Agent**:
   - Paste the prompt into Claude Code, Cursor, Antigravity, or VS Code.
   - Let the agent generate the full diagnostic breakdown first.
3. **Execute in Atomic Commits**:
   - **Pass 1: Safe Deletions**: Delete unused files, abandoned assets, and dead imports. Run tests.
   - **Pass 2: Deduplication**: Consolidate duplicate helpers into shared utils. Run tests.
   - **Pass 3: Simplification**: Refactor over-complex functions with minimal implementations. Run tests.
4. **Verify & Merge**:
   - Run your automated test suite (`pnpm test` or `pytest`) and build pipeline (`pnpm build`).
