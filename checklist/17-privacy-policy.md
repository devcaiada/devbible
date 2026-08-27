# 17 - Privacy Policy & Cookie Compliance

## 🎯 Why It Matters
Global privacy regulations such as GDPR (Europe), CCPA/CPRA (California), and LGPD (Brazil) impose severe fines for unauthorized user tracking, lack of data deletion mechanisms, or missing privacy disclosures. Complying with privacy standards also builds trust with your users and enterprise clients.

## ✅ Verification Checklist

### Legal & Disclosures
- [ ] Clear, transparent, and up-to-date Privacy Policy accessible via footer on every page.
- [ ] Explicit disclosure of all third-party sub-processors (e.g. Stripe, AWS, PostHog, OpenAI, Google Analytics).
- [ ] Data retention timeframes defined and communicated.

### Technical Implementation
- [ ] Cookie consent banner shown to EU/EEA visitors before loading non-essential cookies.
- [ ] Self-service "Export My Data" (GDPR Data Portability) mechanism implemented.
- [ ] "Delete My Account & Data" (Right to Be Forgotten) workflow implemented to permanently wipe or anonymize personal data.
- [ ] Data Processing Agreements (DPAs) signed with all critical cloud vendors.

## 💡 Best Practices

### Right to Be Forgotten Hard Deletion
```typescript
export async function deleteUserAccount(userId: string) {
  const transaction = await db.transaction();
  try {
    // 1. Delete or anonymize billing customer records
    await stripeService.customers.del(userId);

    // 2. Anonymize user records if financial audit laws require row retention
    await transaction('users').where({ id: userId }).update({
      email: `deleted_${userId}@anonymized.local`,
      fullName: 'Anonymized User',
      passwordHash: 'REDACTED',
      deletedAt: new Date(),
    });

    // 3. Purge uploaded private user assets from S3/R2
    await s3Service.deleteUserFolder(userId);

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}
```

## 🔧 Recommended Tools
- **Consent Management**: [Klaro!](https://klaro.org/), [Cookiebot](https://www.cookiebot.com/), [Osano](https://www.osano.com/)
- **Policy Generators**: [Termly](https://termly.io/), [Iubenda](https://www.iubenda.com/)
- **Privacy-First Analytics**: [Plausible](https://plausible.io/) (requires no cookie banner)

## 📚 Additional Resources
- [Official GDPR Information Portal](https://gdpr-info.eu/)
- [California Consumer Privacy Act (CCPA) Overview](https://oag.ca.gov/privacy/ccpa)

---
*Last updated: 2026-08-27*
