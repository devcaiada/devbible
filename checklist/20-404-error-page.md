# 20 - Helpful 404 & Empty State Routing

## 🎯 Why It Matters
A user encountering a broken link or a mistyped URL will bounce immediately if presented with a generic browser error or an unhelpful dead end. A well-crafted 404 Not Found page reassures the user, matches your branding, and provides immediate navigation paths back to safety (search bar, popular links, dashboard button).

## ✅ Verification Checklist

### Backend & Routing
- [ ] Returns genuine HTTP status `404 Not Found` (avoids "Soft 404" antipattern where 200 OK is returned with error text).
- [ ] Catch-all route handler configured to capture missing API endpoints and return standard JSON errors.

### Frontend
- [ ] Custom branded 404 page created matching application typography and theme.
- [ ] Primary Call to Action (CTA) clearly visible (e.g. "Return to Dashboard" or "Back to Home").
- [ ] Search input or links to top documentation / features provided.
- [ ] Helpful contact or issue reporting link available for broken links.

## 💡 Best Practices

### Next.js Custom 404 Not Found Component
```tsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
          <Link href="/support" className="text-sm font-semibold text-gray-900 hover:text-gray-700">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
```

## 🔧 Recommended Tools
- **Framework Routing**: [Next.js `not-found.js`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found), [Nuxt `error.vue`](https://nuxt.com/docs/getting-started/error-handling)
- **Broken Link Checkers**: [Broken Link Checker CLI](https://github.com/stevenvachon/broken-link-checker), [W3C Link Checker](https://validator.w3.org/checklink)

## 📚 Additional Resources
- [Google Search Central: Soft 404 Errors and Best Practices](https://developers.google.com/search/docs/crawling-indexing/http-network-errors#soft-404-errors)
- [Nielsen Norman Group - 404 Page Design Guidelines](https://www.nngroup.com/articles/404-error-pages/)

---
*Last updated: 2026-08-27*
