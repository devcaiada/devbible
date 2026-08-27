# React Production Guide ⚛️

A concise reference for building scalable, high-performance React applications using modern patterns (React 18/19, Next.js App Router, Server Components, and TanStack Query).

---

## 🎯 Key Architectural Principles

1. **Colocation of State & Logic**: Keep state as close to where it is used as possible. Avoid premature global state.
2. **Server-First Mindset**: Fetch data on the server when using Next.js/Remix to reduce client bundle size and eliminate loading waterfalls.
3. **Compound Components**: For complex UI widgets (modals, dropdowns, tabs), use compound components with React Context to provide flexible composition.
4. **Resilient Data Fetching**: Use TanStack Query (React Query) or SWR for client-side caching, deduplication, and automatic background refetching.

---

## 💡 Best Practices

### 1. Server Components vs Client Components
- By default, keep components as Server Components (`async function Component()`).
- Add `'use client'` only when using hooks (`useState`, `useEffect`, `useContext`) or browser event listeners (`onClick`, `onChange`).
- Push `'use client'` down to the smallest leaf components in the component tree.

### 2. State Management Strategy
- **Server Cache / Remote State**: TanStack Query / RTK Query / SWR.
- **URL State**: Query parameters for filters, pagination, search queries (`nuqs` or `useSearchParams`).
- **Local State**: `useState` / `useReducer`.
- **Global Client State**: Zustand or Jotai for cross-component client state (e.g., audio player, shopping cart, theme).

```typescript
// ✅ Recommended: Zustand store for lightweight global client state
import { create } from 'zustand';

interface CartState {
  items: string[];
  addItem: (item: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clearCart: () => set({ items: [] }),
}));
```

### 3. Performance Optimization
- **Prevent Unnecessary Re-renders**: Wrap expensive computations with `useMemo` and memoize callbacks passed to deeply nested children with `useCallback`.
- **Code Splitting**: Dynamically import heavy modals and charts using `React.lazy()` or `next/dynamic`.
- **Avoid Waterfall Rendering**: Parallelize data fetches with `Promise.all` or parallel Server Components with Suspense boundaries.

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Using `useEffect` for Data Fetching without Caching**: Leads to race conditions, double fetches in React Strict Mode, and unhandled memory leaks.
- ❌ **Prop Drilling 5+ Levels**: Leads to brittle refactoring; use Context, Zustand, or component composition (`children`) instead.
- ❌ **Mutating State Directly**: Mutating arrays or objects directly prevents React from detecting state updates.

---

## 🔧 Recommended Ecosystem

- **Frameworks**: [Next.js](https://nextjs.org/), [Remix](https://remix.run/), [Vite](https://vitejs.dev/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query), [SWR](https://swr.vercel.app/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand), [Jotai](https://jotai.org/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **UI & Headless Components**: [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/)
