# 14 - Database Migrations & Schema Evolution

## 🎯 Why It Matters
Applying non-backwards-compatible schema changes (such as renaming a column, dropping a table, or adding a `NOT NULL` constraint without a default) locks production tables, fails in-flight queries during rolling deployments, and causes severe application downtime. Adopting an Expand/Contract migration workflow guarantees zero-downtime releases.

## ✅ Verification Checklist

### Backend & Database
- [ ] Database migration tool integrated and tracked in source control (Prisma, Drizzle, Flyway, Alembic, Goose).
- [ ] Automated migration execution step added to CI/CD deployment pipeline before application restarts.
- [ ] **Expand and Contract** pattern strictly followed for breaking changes (add new column -> dual write -> backfill old records -> switch reads -> delete old column).
- [ ] Non-locking indexes used (e.g. `CREATE INDEX CONCURRENTLY` in Postgres).
- [ ] Rollback script (`down` migration) written and tested for every schema change.
- [ ] Long-running migration scripts executed outside high-traffic peak hours with transaction timeouts.

## 💡 Best Practices

### The Expand / Contract Migration Pattern
```text
Phase 1 (Expand):
- Add nullable new column `full_name`.
- Application writes to both `first_name` + `last_name` AND `full_name`.

Phase 2 (Backfill):
- Background worker populates `full_name` for all historical rows.

Phase 3 (Contract):
- Application code switches to read exclusively from `full_name`.
- Stop writing to old columns.
- Drop `first_name` and `last_name` in a subsequent release.
```

```sql
-- ✅ Good: Adding a column with a default safely in modern PostgreSQL
ALTER TABLE users ADD COLUMN is_active boolean DEFAULT true NOT NULL;

-- ✅ Good: Creating index without locking table
CREATE INDEX CONCURRENTLY idx_users_org_id ON users (org_id);
```

## 🔧 Recommended Tools
- **Node.js**: [Prisma Migrate](https://www.prisma.io/migrate), [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview), [Knex Migrations](https://knexjs.org/guide/migrations.html)
- **Python**: [Alembic](https://alembic.sqlalchemy.org/)
- **Go**: [golang-migrate](https://github.com/golang-migrate/migrate), [Goose](https://github.com/pressly/goose)
- **Multi-Engine**: [Flyway](https://flywaydb.org/), [Liquibase](https://www.liquibase.org/)

## 📚 Additional Resources
- [Martin Fowler - Evolutionary Database Design](https://martinfowler.com/articles/evodb.html)
- [Zero-Downtime Database Migrations in PostgreSQL](https://medium.com/paypal-tech/zero-downtime-database-migrations-a-step-by-step-guide-2877a56114a8)

---
*Last updated: 2026-08-27*
