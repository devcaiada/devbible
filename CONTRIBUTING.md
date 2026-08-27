# Contributing to DevBible 📚✨

Thank you for your interest in contributing to **DevBible**! DevBible is a community-driven development reference, and your real-world production insights help make it better for every developer.

---

## 🧭 Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for all contributors. Please be respectful, constructive, and kind.

---

## 🛠️ How Can You Contribute?

You can contribute to DevBible in many ways:
- **Improving Checklist Items**: Add missing edge cases, update code examples, or suggest modern tooling.
- **Expanding Skills Guides**: Add emerging best practices, performance tips, or security patterns for specific stacks.
- **Adding Templates**: Submit reusable, battle-tested configuration templates (e.g., Nginx, GitHub Actions, Terraform, Kubernetes).
- **Fixing Typos & Broken Links**: Keep the documentation pristine and up-to-date.

---

## 📝 Checklist Item Format Standard

When adding or updating any file in `checklist/`, you **MUST** follow this exact format:

```markdown
# [Number] - [Item Name]

## 🎯 Why It Matters
Explain the technical and business impact of not implementing this item. What can go wrong in production?

## ✅ Verification Checklist

### Backend
- [ ] Actionable check item 1
- [ ] Actionable check item 2

### Frontend
- [ ] Actionable check item 1
- [ ] Actionable check item 2

## 💡 Best Practices
Provide clear, side-by-side code examples showing anti-patterns (Bad) vs. recommended patterns (Good).

```typescript
// ❌ Bad: Leaking raw internal errors
// ✅ Good: Sanitized response with correlation ID
```

## 🔧 Recommended Tools
List production-grade libraries, services, or open-source tools relevant to this topic with brief descriptions.

## 📚 Additional Resources
Curated links to official documentation, RFC standards, or authoritative engineering blogs.

---
*Last updated: YYYY-MM-DD*
```

---

## 🚀 Pull Request Process

1. **Fork the Repository**: Create your own fork on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/add-item-name
   # or
   git checkout -b fix/update-logging-template
   ```
3. **Keep Changes Focused**: Ensure each pull request focuses on a single topic, skill, or template.
4. **Adhere to Style & Tone**:
   - Write in clear, concise, and professional English.
   - Use emojis tastefully (1–2 per section header).
   - Ensure all code blocks specify syntax highlighting (`ts`, `py`, `go`, `yml`, `json`).
5. **Submit your PR**:
   - Provide a concise description of your changes and why they improve DevBible.
   - Link any related issues or discussions.

---

## 📄 License Notice

By contributing to DevBible, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
