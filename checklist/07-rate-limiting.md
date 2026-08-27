# 07 - Rate Limiting & DDoS Defense

## 🎯 Why It Matters
Unprotected public endpoints leave your backend vulnerable to brute-force credential stuffing, API scraping, denial of service (DDoS) attacks, and unexpected cloud compute/database bills. Enforcing granular rate limits guarantees fair resource allocation and shields your core infrastructure from bad actors.

## ✅ Verification Checklist

### Backend
- [ ] Tiered rate limits configured (e.g., strict limits on `/auth/login` and `/auth/reset-password`, generous limits on standard read endpoints).
- [ ] Distributed rate limiting backed by Redis (sliding window or token bucket algorithm) for multi-instance deployments.
- [ ] Standard rate limit headers returned in responses (`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, `Retry-After`).
- [ ] Proper HTTP status code `429 Too Many Requests` returned when limits are exceeded.
- [ ] Reverse proxy or CDN edge rate limiting active (Cloudflare WAF / AWS Shield).

### Frontend
- [ ] `429 Too Many Requests` responses caught gracefully.
- [ ] Form submit buttons disabled immediately after the initial click to prevent accidental double submissions.
- [ ] Countdown timer or "Please wait X seconds" message presented to the user when rate-limited.

## 💡 Best Practices

### Redis Sliding Window Rate Limiting (Express / Upstash)
```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from './redis';

// Strict limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per window
  standardHeaders: true, // Return RateLimit-* headers
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(...args),
  }),
  message: {
    status: 'error',
    code: 'TOO_MANY_REQUESTS',
    message: 'Too many login attempts. Please try again in 15 minutes.',
  },
});
```

## 🔧 Recommended Tools
- **Libraries**: [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit), [slowapi](https://github.com/laurentS/slowapi) (FastAPI/Python), [tollbooth](https://github.com/didip/tollbooth) (Go)
- **Redis Providers**: [Upstash Redis](https://upstash.com/), [Redis Cloud](https://redis.io/cloud/)
- **Edge / WAF**: [Cloudflare Rate Limiting](https://www.cloudflare.com/rate-limiting/), [AWS WAF](https://aws.amazon.com/waf/)

## 📚 Additional Resources
- [OWASP Denial of Service Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html)
- [IETF RFC 6585 - HTTP 429 Status Code](https://datatracker.ietf.org/doc/html/rfc6585#section-4)

---
*Last updated: 2026-08-27*
