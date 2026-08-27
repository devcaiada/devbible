# 10 - Loading States, Skeletons & Layout Stability

## 🎯 Why It Matters
Blank screens, sudden layout jumps (Cumulative Layout Shift - CLS), and un-interactive buttons without visual feedback make applications feel sluggish, broken, or unresponsive. Thoughtful loading states and skeleton loaders improve perceived performance and keep users engaged while asynchronous data resolves.

## ✅ Verification Checklist

### Backend & API
- [ ] Fast initial metadata response (e.g. streaming or pagination for large payloads).
- [ ] Endpoints support cursor-based pagination to avoid fetching unbounded arrays.

### Frontend
- [ ] Skeleton loaders match the dimensions and layout of the final incoming content to prevent layout shifts (CLS < 0.1).
- [ ] Submit buttons enter a disabled, spinning loading state immediately upon click to prevent accidental double clicks.
- [ ] Stale-while-revalidate / Optimistic UI updates used for instant perceived feedback on mutations (likes, bookmarks, toggles).
- [ ] Suspense boundaries placed strategically around independent UI cards rather than locking the entire viewport.
- [ ] Progress indicators or bar animations shown for long-running uploads/downloads.

## 💡 Best Practices

### Skeleton Loader Pattern (React & Tailwind)
```tsx
// components/CardSkeleton.tsx
export function CardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 max-w-sm w-full animate-pulse">
      <div className="flex space-x-4">
        <div className="rounded-full bg-gray-200 h-10 w-10"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}
```

## 🔧 Recommended Tools
- **Skeleton Libraries**: [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton), [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/skeleton)
- **Data Caching & Optimistic UI**: [TanStack Query](https://tanstack.com/query), [SWR](https://swr.vercel.app/)
- **Core Web Vitals Metric**: [Web Vitals Chrome Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabajgahdobffbeijdcmlo)

## 📚 Additional Resources
- [Google Web Vitals - Cumulative Layout Shift (CLS)](https://web.dev/cls/)
- [Optimistic UI Patterns by TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)

---
*Last updated: 2026-08-27*
