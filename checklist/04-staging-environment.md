# 04 - Staging & Preview Environments

## 🎯 Why It Matters
Testing in production is a recipe for customer-facing outages and data corruption. An isolated staging environment that closely mirrors production architecture allows you to test complex migrations, third-party webhook integrations, performance bottlenecks, and user flows safely before public rollout.

## ✅ Verification Checklist

### Backend & Infrastructure
- [ ] Staging environment runs on identical architecture, runtime versions, and database engines as production.
- [ ] Complete credential and database isolation: Staging NEVER connects to production databases or third-party live keys (Stripe, Twilio, SendGrid).
- [ ] Sanitized/anonymized seed data used in staging to prevent PII exposure.
- [ ] Ephemeral PR preview environments configured for testing features in isolation.
- [ ] Automated smoke tests executed against staging after deployment.

### Frontend
- [ ] Visible badge or watermark on staging/preview builds to prevent developers from mistaking staging for production.
- [ ] Staging analytics and tracking disabled or routed to separate test properties.

## 💡 Best Practices

### Environment Flag & Staging Watermark
```tsx
// components/StagingBanner.tsx
export function StagingBanner() {
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'staging') return null;

  return (
    <div className="fixed bottom-2 right-2 z-50 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded shadow-lg opacity-80 pointer-events-none">
      🟡 STAGING ENVIRONMENT - TEST DATA ONLY
    </div>
  );
}
```

## 🔧 Recommended Tools
- **Ephemeral Previews**: [Vercel Preview Deployments](https://vercel.com/docs/deployments/preview-deployments), [Coolify](https://coolify.io/), [Render Previews](https://render.com/)
- **Database Branching**: [Neon DB Branching](https://neon.tech/docs/guides/branching-guide), [Supabase Branching](https://supabase.com/docs/guides/platform/branching)
- **Data Anonymization**: [RepliByte](https://github.com/Qovery/replibyte), [Faker.js](https://fakerjs.dev/)

## 📚 Additional Resources
- [Martin Fowler on Staging Environments](https://martinfowler.com/bliki/DeploymentPipeline.html)
- [12-Factor App: X. Dev/prod parity](https://12factor.net/dev-prod-parity)

---
*Last updated: 2026-08-27*
