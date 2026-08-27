# CI/CD Pipelines Guide ⚙️

Guide for designing automated, fast, and secure Continuous Integration and Continuous Deployment workflows using GitHub Actions.

---

## 🎯 Key Architectural Principles

1. **Fail Fast**: Run linting, type checks, and unit tests early before running slow integration or E2E suites.
2. **Aggressive Caching**: Cache package manager dependencies and build artifacts (`actions/cache`, `actions/setup-node` caching).
3. **Environment Isolation**: Separate test secrets, staging configurations, and production deploy environments with protection rules.
4. **Immutability**: Build a Docker image once, push to a container registry, and deploy that exact digest across staging and production.

---

## 💡 Recommended GitHub Actions CI Workflow

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  validate:
    name: Lint, Typecheck & Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js & pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Linting
        run: pnpm lint

      - name: Type Checking
        run: pnpm typecheck

      - name: Run Tests with Coverage
        run: pnpm test --coverage
```

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Not using Concurrency Cancel**: Wasting runner minutes by letting outdated PR commits run full test suites.
- ❌ **Hardcoding Production Secrets in Scripts**: Always use GitHub Secrets or OIDC (OpenID Connect) for cloud provider access (AWS, GCP, Azure).
