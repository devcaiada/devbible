# Docker Production Guide 🐳

Best practices for writing secure, optimized, and reproducible Dockerfiles and container configurations.

---

## 🎯 Key Architectural Principles

1. **Multi-Stage Builds**: Separate build dependencies from runtime artifacts to produce tiny, secure production images.
2. **Non-Root User**: Never run containerized applications as `root`. Create and switch to a dedicated unprivileged user.
3. **Layer Caching Optimization**: Copy dependency definition files first (`package.json`, `requirements.txt`, `go.mod`) before source code to maximize Docker layer caching.
4. **Proper `.dockerignore`**: Always exclude `.git`, `node_modules`, `.env`, build artifacts, and test logs.

---

## 💡 Production Multi-Stage Node.js Dockerfile

```dockerfile
# 1. Base stage
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

# 2. Dependencies stage
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 3. Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# 4. Production runner stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Run as non-root user
USER node

COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Baking Secrets into Image Layers**: Using `ENV API_KEY=secret` in the Dockerfile embeds the secret permanently in image layer history. Use runtime environment variables or Docker build secrets.
- ❌ **Using `latest` Tag**: Always pin explicit versions (e.g. `node:20.11-alpine`) for reproducible builds.

---

## 🔧 Recommended Tools

- **Base Images**: Alpine, Google Distroless, Chainguard Images
- **Security Scanners**: [Trivy](https://github.com/aquasecurity/trivy), [Docker Scout](https://docs.docker.com/scout/), [Snyk](https://snyk.io/)
- **Linting**: [Hadolint](https://github.com/hadolint/hadolint)
