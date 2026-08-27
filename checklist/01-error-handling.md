# 01 - Error Handling & Standardization

## 🎯 Why It Matters
Without structured and standardized error handling, unhandled exceptions can crash your server processes, leak sensitive internal stack traces and database credentials to end users, and produce inconsistent error structures that break client-side interfaces. Robust error handling ensures application resilience, clean debugging workflows, and a graceful user experience during failures.

## ✅ Verification Checklist

### Backend
- [ ] Centralized global error handler middleware configured.
- [ ] No unhandled Promise rejections or uncaught exceptions crashing the process.
- [ ] Standardized JSON error response format across all API endpoints (`status`, `code`, `message`, `correlationId`, `details`).
- [ ] Internal stack traces and database error messages stripped from production responses.
- [ ] Appropriate HTTP status codes used (e.g., 400 for bad input, 401 for unauthenticated, 403 for unauthorized, 404 for not found, 409 for conflict, 422 for unprocessable, 500 for server crash).

### Frontend
- [ ] React/Vue Error Boundaries wrap major component sections to prevent full-screen whiteouts.
- [ ] User-friendly localized notifications/toasts triggered on API failure instead of silent failures.
- [ ] Network offline and timeout states caught and displayed with retry capabilities.
- [ ] Sensitive error details hidden from end-user UI.

## 💡 Best Practices

### Standardized Error Format
```typescript
// ❌ Bad: Inconsistent strings and leaking raw database errors
app.get('/user/:id', async (req, res) => {
  try {
    const user = await db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message); // Leaks DB syntax or schema!
  }
});

// ✅ Good: Normalized AppError with sanitized output
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details: any = null
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Global error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const code = isAppError ? err.code : 'INTERNAL_SERVER_ERROR';
  const message = isAppError ? err.message : 'An unexpected error occurred. Please try again later.';

  // Log full error internally
  logger.error({ err, correlationId: req.headers['x-correlation-id'] });

  res.status(statusCode).json({
    status: 'error',
    code,
    message,
    correlationId: req.headers['x-correlation-id'],
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});
```

## 🔧 Recommended Tools
- **Node.js**: [http-errors](https://github.com/jshttp/http-errors), [express-async-errors](https://github.com/davidbanham/express-async-errors)
- **Python**: [FastAPI Exception Handlers](https://fastapi.tiangolo.com/tutorial/handling-errors/)
- **Frontend**: [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- **Tracking**: [Sentry](https://sentry.io/), [Highlight.io](https://www.highlight.io/)

## 📚 Additional Resources
- [RFC 7807: Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
- [Node.js Best Practices - Error Handling](https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices)

---
*Last updated: 2026-08-27*
