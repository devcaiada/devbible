# 03 - Database Backup & Recovery

## 🎯 Why It Matters
A database backup is completely useless until you have verified that you can successfully restore it. Data corruption, accidental deletions, ransomware, or cloud provider outages will eventually happen. Having automated, immutable, and regularly tested backups guarantees business continuity and eliminates catastrophic data loss.

## ✅ Verification Checklist

### Backend & Infrastructure
- [ ] Automated daily snapshots or Point-in-Time Recovery (PITR) enabled (e.g. WAL archiving for Postgres).
- [ ] Backups stored in an isolated, multi-region, off-site storage bucket (e.g. AWS S3 Glacier, GCP Cloud Storage) with object lock/immutability enabled.
- [ ] Backup encryption at rest enabled (AES-256 / KMS).
- [ ] Automated restore drill performed and documented at least once a quarter.
- [ ] Recovery Time Objective (RTO) and Recovery Point Objective (RPO) defined and agreed upon.
- [ ] Backup retention policies configured (e.g. daily for 30 days, monthly for 1 year).

### Frontend / Client
- [ ] Graceful maintenance banner displayed if the database enters read-only or maintenance mode during recovery.

## 💡 Best Practices

### Automated PostgreSQL Dump Script
```bash
#!/usr/bin/env bash
set -euo pipefail

# Automated backup script with timestamp and compression
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/postgres"
BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"
S3_BUCKET="s3://my-company-db-backups-secure/postgres/"

mkdir -p "${BACKUP_DIR}"

echo "Starting database backup at ${TIMESTAMP}..."
pg_dump -h "${DB_HOST}" -U "${DB_USER}" -d "${DB_NAME}" | gzip > "${BACKUP_FILE}"

echo "Uploading encrypted backup to offsite S3 storage..."
aws s3 cp "${BACKUP_FILE}" "${S3_BUCKET}" --sse aws:kms

echo "Cleaning up local backups older than 7 days..."
find "${BACKUP_DIR}" -type f -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed successfully!"
```

## 🔧 Recommended Tools
- **Managed Databases**: AWS RDS / Aurora Automated Backups, Supabase Point-in-Time Recovery, Neon Branching & Restore
- **Backup Utilities**: [pgBackRest](https://pgbackrest.org/), [Wal-G](https://github.com/wal-g/wal-g), [Litestream](https://litestream.io/) (for SQLite)
- **Object Storage**: AWS S3 with Object Lock, Cloudflare R2

## 📚 Additional Resources
- [PostgreSQL Continuous Archiving and Point-in-Time Recovery (PITR)](https://www.postgresql.org/docs/current/continuous-archiving.html)
- [AWS Well-Architected Framework: Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)

---
*Last updated: 2026-08-27*
