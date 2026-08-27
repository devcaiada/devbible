# 16 - Automated Testing Strategy

## 🎯 Why It Matters
Manual testing cannot scale as your application grows in complexity. A strong automated testing suite prevents regressions, allows fearless refactoring, and acts as living documentation for your business logic and API contracts.

## ✅ Verification Checklist

### Testing Pyramid
- [ ] **Unit Tests**: Core domain logic, mathematical calculations, formatters, and utility functions tested in isolation (>80% coverage on pure functions).
- [ ] **Integration Tests**: API endpoints tested against real test database instances (via Docker/Testcontainers) rather than superficial database mocks.
- [ ] **End-to-End (E2E) Tests**: Critical user journeys covered (Registration -> Login -> Checkout -> Export).
- [ ] **CI Pipeline Integration**: Test suite runs automatically on every pull request and blocks merge on failure.

### Test Hygiene
- [ ] Tests run fast (< 5 minutes total for standard PR test suite).
- [ ] Tests are deterministic and free of flaky network or timing dependencies.
- [ ] Test databases reset cleanly between test suites.

## 💡 Best Practices

### Integration Test Example (Vitest & Supertest)
```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { db } from '../src/db';

describe('POST /api/v1/workspaces', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('creates a workspace when payload is valid', async () => {
    const res = await request(app)
      .post('/api/v1/workspaces')
      .set('Authorization', 'Bearer valid-test-token')
      .send({ name: 'Acme Corp' });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.name).toBe('Acme Corp');
  });

  it('returns 422 if workspace name is missing', async () => {
    const res = await request(app)
      .post('/api/v1/workspaces')
      .set('Authorization', 'Bearer valid-test-token')
      .send({});

    expect(res.status).toBe(422);
    expect(res.body.code).toBe('VALIDATION_ERROR');
  });
});
```

## 🔧 Recommended Tools
- **Unit & Integration Runners**: [Vitest](https://vitest.dev/), [Jest](https://jestjs.io/), [Pytest](https://pytest.org/)
- **E2E Testing**: [Playwright](https://playwright.dev/), [Cypress](https://www.cypress.io/)
- **Integration Test Containers**: [Testcontainers](https://testcontainers.com/)
- **API Mocks**: [MSW (Mock Service Worker)](https://mswjs.io/)

## 📚 Additional Resources
- [Martin Fowler - The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Kent C. Dodds - Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)

---
*Last updated: 2026-08-27*
