# 09 - Secure Password Reset & Auth Recovery

## 🎯 Why It Matters
Password reset workflows are prime targets for account takeover attacks. Insecure token generation, predictable tokens, long expiration windows, or leaking whether an email exists in the system (user enumeration) can lead to widespread account breaches.

## ✅ Verification Checklist

### Backend
- [ ] Cryptographically secure random tokens generated (`crypto.randomBytes(32)`).
- [ ] Password reset tokens stored **hashed** in the database (SHA-256) so a database leak doesn't compromise active reset links.
- [ ] Strict token expiration enforced (maximum 15 to 30 minutes).
- [ ] One-time use enforced: Token invalidated immediately upon successful reset.
- [ ] All other active user sessions/JWTs revoked upon password change.
- [ ] User enumeration prevented: Return identical generic success responses (`"If an account exists, a reset link has been sent"`) regardless of whether the email was found.
- [ ] Rate limits applied to request reset and submit reset endpoints.

### Frontend
- [ ] Generic confirmation message displayed without revealing account existence.
- [ ] Real-time password strength meter guiding users to choose secure passwords.
- [ ] Clear error message displayed if token has expired, with a link to request a new one.

## 💡 Best Practices

### Secure Token Generation & Hashing
```typescript
import crypto from 'crypto';

export async function requestPasswordReset(email: string) {
  const user = await db.users.findByEmail(email);

  // Return generic response even if user does not exist
  if (!user) {
    return { success: true, message: 'If an account exists, an email has been sent.' };
  }

  // 1. Generate high-entropy raw token
  const rawToken = crypto.randomBytes(32).toString('hex');

  // 2. Hash token for storage in DB
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

  await db.users.update(user.id, {
    resetPasswordToken: hashedToken,
    resetPasswordExpires: expiresAt,
  });

  // 3. Send raw token in the email link
  const resetLink = `https://myapp.com/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;
  await emailService.sendPasswordReset(user.email, resetLink);

  return { success: true, message: 'If an account exists, an email has been sent.' };
}
```

## 🔧 Recommended Tools
- **Email Delivery**: [Resend](https://resend.com/), [Postmark](https://postmarkapp.com/), [Amazon SES](https://aws.amazon.com/ses/)
- **Password Hashing**: [Argon2](https://github.com/ranisalt/node-argon2), [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Security Check**: [HaveIBeenPwned API (Pwned Passwords)](https://haveibeenpwned.com/API/v3#PwnedPasswords)

## 📚 Additional Resources
- [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
- [NIST Special Publication 800-63B: Digital Identity Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html)

---
*Last updated: 2026-08-27*
