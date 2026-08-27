# 08 - Access Control & Permissions (RBAC/ABAC)

## 🎯 Why It Matters
Broken Object Level Authorization (BOLA) and Broken Function Level Authorization are consistently ranked as the most severe security vulnerabilities by OWASP. If an authenticated regular user can guess another tenant's UUID or access admin-only endpoints, your entire dataset is compromised.

## ✅ Verification Checklist

### Backend
- [ ] Explicit authentication and authorization middleware applied on all private routes.
- [ ] Multi-tenant isolation verified: Queries always scope to the authenticated user's `tenant_id` or `organization_id`.
- [ ] Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC) enforced at the service layer, not just the router level.
- [ ] Object ownership validated before any mutation (`UPDATE`, `DELETE`).
- [ ] Sensitive admin actions logged to an immutable audit trail.

### Frontend
- [ ] UI elements (buttons, navigation tabs, settings pages) conditionally rendered based on user permissions.
- [ ] Client routes protected with auth guards/middleware (redirecting unauthenticated users to `/login`).
- [ ] Clear understanding that client-side UI hiding is for UX only; security must be enforced by the API.

## 💡 Best Practices

### Tenant Scoping & Permission Guard
```typescript
// ❌ Bad: Vulnerable to Insecure Direct Object Reference (IDOR/BOLA)
app.get('/api/invoices/:id', async (req, res) => {
  const invoice = await db.invoices.findById(req.params.id);
  res.json(invoice); // Anyone can read any invoice by ID!
});

// ✅ Good: Scoped by authenticated user's organization and verified permissions
app.get('/api/invoices/:id', requireAuth, async (req, res) => {
  const { orgId, role } = req.user;

  const invoice = await db.invoices.findOne({
    where: {
      id: req.params.id,
      organizationId: orgId, // Mandatory multi-tenant boundary
    },
  });

  if (!invoice) {
    return res.status(404).json({ message: 'Invoice not found.' });
  }

  res.json(invoice);
});
```

## 🔧 Recommended Tools
- **Authorization Engines**: [CASL](https://casl.js.org/), [Oso](https://www.osohq.com/), [Cerbos](https://cerbos.dev/), [Permit.io](https://www.permit.io/)
- **Auth Providers**: [Clerk](https://clerk.com/), [Auth0](https://auth0.com/), [Supabase Auth](https://supabase.com/auth), [Lucia Auth](https://lucia-auth.com/)

## 📚 Additional Resources
- [OWASP Top 10: Broken Object Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/)
- [Designing Multi-Tenant SaaS Systems](https://aws.amazon.com/blogs/apn/building-a-multi-tenant-saas-solution-using-aws-serverless-services/)

---
*Last updated: 2026-08-27*
