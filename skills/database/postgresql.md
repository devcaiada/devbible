# PostgreSQL Production Guide 🐘

A comprehensive guide for schema modeling, index optimization, connection management, and transactional integrity in PostgreSQL.

---

## 🎯 Key Architectural Principles

1. **Explicit Constraints**: Enforce foreign keys, unique constraints, and check constraints at the database level rather than solely relying on application code.
2. **Index Selectivity**: Index foreign keys and columns frequently used in `WHERE`, `JOIN`, and `ORDER BY` clauses. Use partial indexes for soft-deleted or status-filtered queries.
3. **Connection Pooling**: Use connection poolers like PgBouncer or Supabase Supavisor to prevent connection spikes from exhausting server memory.
4. **Statement Timeouts**: Set `statement_timeout` to kill runaway queries before they degrade database performance.

---

## 💡 Best Practices

### 1. Partial & Composite Indexes
```sql
-- Partial index: only index active records to save disk and memory
CREATE INDEX idx_users_active_email ON users (email) WHERE deleted_at IS NULL;

-- Composite index: order columns from most selective (equality) to range
CREATE INDEX idx_orders_user_created ON orders (user_id, created_at DESC);
```

### 2. Zero-Downtime Index Creation
Always create indexes concurrently in production to avoid table locking:
```sql
CREATE INDEX CONCURRENTLY idx_users_company_id ON users (company_id);
```

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Using `SELECT *` in Production**: Fetches unnecessary columns (e.g., large text or JSON blobs) and degrades cache efficiency.
- ❌ **Missing Foreign Key Indexes**: PostgreSQL does not automatically create indexes on foreign key columns, causing full table scans during cascading deletes.

---

## 🔧 Recommended Tools

- **Managed Platforms**: [Neon](https://neon.tech/), [Supabase](https://supabase.com/), [AWS Aurora](https://aws.amazon.com/rds/aurora/)
- **Poolers & Proxies**: [PgBouncer](https://www.pgbouncer.org/)
- **GUI Clients**: [TablePlus](https://tableplus.com/), [DBeaver](https://dbeaver.io/)
