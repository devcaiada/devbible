# 15 - Rollback Strategy & Canary Releases

## 🎯 Why It Matters
Even with rigorous automated testing, unexpected bugs or third-party service failures can slip into production. If deploying a fix takes 45 minutes of manual scrambling, downtime and customer dissatisfaction multiply. Having an automated, one-click rollback mechanism and feature flags ensures you can remediate issues within seconds.

## ✅ Verification Checklist

### DevOps & Infrastructure
- [ ] Immutable container tags or deployment artifacts deployed (never deploy mutable `:latest`).
- [ ] One-click or automated rollback triggers configured in your CI/CD or cloud platform.
- [ ] Blue/Green or Rolling deployment strategy with health check gating configured.
- [ ] Automated rollback triggered if error rate exceeds 2% or health check fails post-deploy.

### Application Architecture
- [ ] Feature flagging service integrated to toggle risky new features without redeploying code.
- [ ] New database queries are backwards-compatible with previous application deployment version.

## 💡 Best Practices

### Feature Flag Protection Pattern
```typescript
import { isFeatureEnabled } from './featureFlags';

export async function processPayment(user: User, amount: number) {
  // Feature flag allows instant disabling if new payment provider experiences outage
  if (await isFeatureEnabled('use_new_stripe_checkout', user.id)) {
    try {
      return await stripeV3Service.charge(user, amount);
    } catch (err) {
      logger.error({ err }, 'New payment provider failed, falling back...');
      return await legacyPaymentService.charge(user, amount);
    }
  }

  return await legacyPaymentService.charge(user, amount);
}
```

## 🔧 Recommended Tools
- **Feature Flags**: [LaunchDarkly](https://launchdarkly.com/), [PostHog Feature Flags](https://posthog.com/feature-flags), [Unleash](https://www.getunleash.io/), [Flagsmith](https://www.flagsmith.com/)
- **Hosting Platforms with Instant Rollback**: [Vercel](https://vercel.com/), [Render](https://render.com/), [Fly.io](https://fly.io/), [AWS ECS](https://aws.amazon.com/ecs/)
- **Deployment Controllers**: [Argo CD](https://argo-cd.readthedocs.io/), [Flagger](https://flagger.app/)

## 📚 Additional Resources
- [Martin Fowler - Feature Toggles (Feature Flags)](https://martinfowler.com/articles/feature-toggles.html)
- [Google SRE - Canary Releases](https://sre.google/workbook/canarying-releases/)

---
*Last updated: 2026-08-27*
