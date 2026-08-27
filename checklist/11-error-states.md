# 11 - Error Boundaries & Fallback States

## 🎯 Why It Matters
A single unhandled JavaScript error in a minor widget (like a sidebar widget or comment feed) should never crash the entire page and present the user with a blank white screen of death. Granular error boundaries isolate component crashes and provide clear recovery options (like a "Try Again" button).

## ✅ Verification Checklist

### Backend & API
- [ ] Network failures and 5xx responses return structured payload formats so the UI knows how to handle the error state.

### Frontend
- [ ] React Error Boundaries or Vue `onErrorCaptured` wrapped around critical UI regions (navigation, main content, widgets).
- [ ] Empty states designed for: 0 search results, empty feeds, empty shopping carts, deleted items.
- [ ] Actionable fallback UI provided: "Reload section", "Back to Home", or "Contact Support".
- [ ] Failed background queries provide an inline retry button instead of a permanent dead state.

## 💡 Best Practices

### React Error Boundary Component
```tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
}

export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center border border-red-200 bg-red-50 rounded-lg">
          <h3 className="text-sm font-semibold text-red-800">
            {this.props.fallbackTitle || 'Unable to load this section'}
          </h3>
          <p className="text-xs text-red-600 mt-1">An unexpected error occurred.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-3 px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

## 🔧 Recommended Tools
- **Libraries**: [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- **UI Kits with Empty States**: [shadcn/ui](https://ui.shadcn.com/), [Tailwind UI](https://tailwindui.com/)

## 📚 Additional Resources
- [React Official Documentation - Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

---
*Last updated: 2026-08-27*
