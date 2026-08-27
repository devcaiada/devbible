# 13 - Backend Request Validation & Sanitization

## 🎯 Why It Matters
Client-side validation can be bypassed effortlessly using cURL, Postman, or script bots. Relying solely on the frontend to validate inputs leaves your backend vulnerable to SQL injection, NoSQL injection, Cross-Site Scripting (XSS), mass assignment vulnerabilities, and database corruption.

## ✅ Verification Checklist

### Backend
- [ ] Strict schema validation (e.g. Zod, Joi, Pydantic, TypeBox) applied on all `body`, `query`, and `params`.
- [ ] Unknown / extra fields stripped automatically to prevent mass assignment exploits.
- [ ] String inputs trimmed and sanitized against malicious payloads (HTML/XSS injection).
- [ ] Array bounds and file upload size limits explicitly enforced.
- [ ] Standardized `422 Unprocessable Entity` or `400 Bad Request` returned with field-level validation errors.

### Frontend
- [ ] Matching client-side validation schema to provide instant inline form feedback.
- [ ] Server validation errors mapped back to the relevant form field inputs.

## 💡 Best Practices

### Zod Validation Middleware in Node.js
```typescript
import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) req.body = await schema.body.parseAsync(req.body);
      if (schema.query) req.query = await schema.query.parseAsync(req.query);
      if (schema.params) req.params = await schema.params.parseAsync(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          status: 'error',
          code: 'VALIDATION_ERROR',
          message: 'Invalid request payload',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
};

// Example Schema
export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
  age: z.number().int().positive().optional(),
});
```

## 🔧 Recommended Tools
- **TypeScript / Node.js**: [Zod](https://zod.dev/), [TypeBox](https://github.com/sinclairzx81/typebox), [Valibot](https://valibot.dev/)
- **Python**: [Pydantic v2](https://docs.pydantic.dev/)
- **Form Integration**: [React Hook Form](https://react-hook-form.com/) + `@hookform/resolvers`

## 📚 Additional Resources
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP Mass Assignment Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html)

---
*Last updated: 2026-08-27*
