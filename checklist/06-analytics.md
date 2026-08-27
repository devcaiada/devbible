# 06 - Analytics & Event Tracking

## 🎯 Why It Matters
Building product features in the dark without analytics leads to wasted engineering cycles on unused functionality. A clean, privacy-respecting analytics implementation provides insights into user journeys, feature adoption, conversion funnels, and drop-off points while respecting user privacy laws (GDPR, CCPA).

## ✅ Verification Checklist

### Backend
- [ ] Server-side event tracking implemented for critical business actions (e.g., successful checkouts, subscription cancellations).
- [ ] PII (passwords, social security numbers, credit cards, exact home addresses) strictly excluded from event properties.
- [ ] Idempotency keys used for billing and conversion tracking to prevent duplicate counts.

### Frontend
- [ ] Page views, button clicks, and funnel steps tracked with descriptive naming conventions (e.g., `object:action` like `button:click_signup`).
- [ ] Do Not Track (DNT) header and cookie consent preferences respected before loading tracking scripts.
- [ ] Analytics scripts loaded asynchronously without blocking first contentful paint (FCP).

## 💡 Best Practices

### Structured Analytics Event Dispatcher
```typescript
// utils/analytics.ts
type AnalyticsEvent =
  | { name: 'user:signed_up'; properties: { method: 'email' | 'google' | 'github' } }
  | { name: 'checkout:completed'; properties: { plan: string; amountCents: number } }
  | { name: 'feature:used'; properties: { featureName: string; durationMs?: number } };

export function trackEvent<E extends AnalyticsEvent>(name: E['name'], properties: E['properties']) {
  // Check user consent before dispatching
  if (typeof window !== 'undefined' && window.localStorage.getItem('cookie_consent') === 'granted') {
    // PostHog / Plausible / Segment call
    (window as any).posthog?.capture(name, properties);
  }
}
```

## 🔧 Recommended Tools
- **Privacy-Friendly Web Analytics**: [Plausible](https://plausible.io/), [Umami](https://umami.is/), [Fathom](https://usefathom.com/)
- **Product Analytics**: [PostHog](https://posthog.com/), [Mixpanel](https://mixpanel.com/), [June](https://june.so/)
- **Customer Data Platform**: [RudderStack](https://www.rudderstack.com/), [Segment](https://segment.com/)

## 📚 Additional Resources
- [PostHog Event Tracking Best Practices](https://posthog.com/tutorials/event-tracking-guide)
- [GDPR Guidelines on Analytics & Cookies](https://gdpr.eu/cookies/)

---
*Last updated: 2026-08-27*
