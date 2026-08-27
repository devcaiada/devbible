# CSS Frameworks & Modern Styling Guide 🎨

A guide to structuring scalable, maintainable, and responsive UI styles using Tailwind CSS, CSS Modules, and modern CSS primitives.

---

## 🎯 Modern Styling Approaches

| Approach | Best For | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Tailwind CSS** | Rapid prototyping & design systems | Zero context switching, tiny production bundles, design tokens | Class attribute verbosity |
| **CSS Modules** | Component-scoped isolation | Scoped names, standard CSS syntax | Requires separate `.module.css` files |
| **Vanilla Extract / StyleX** | Zero-runtime CSS-in-JS | Type-safe styles, atomic output | Build tooling setup required |

---

## 💡 Best Practices

### 1. Tailwind CSS Best Practices
- **Use `clsx` and `tailwind-merge` (`cn` helper)**: Prevent class collision bugs when creating reusable component wrappers.

```typescript
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// components/Button.tsx
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500': variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
        },
        className
      )}
      {...props}
    />
  );
}
```

### 2. Design Tokens & CSS Variables
Define semantic tokens (colors, spacing, radii) using CSS custom properties to allow easy dark mode toggling:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
  --accent-color: #6366f1;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f8fafc;
  --accent-color: #818cf8;
}
```

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Hardcoding Arbitrary Values**: Avoid random values like `w-[327px]` or `bg-[#134958]`. Stick to predefined design scale tokens to maintain visual harmony.
- ❌ **Over-using `@apply`**: Overusing `@apply` in CSS files defeats the purpose of utility classes and recreates monolithic CSS maintenance overhead.

---

## 🔧 Recommended Tools

- **Frameworks**: [Tailwind CSS v4](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- **Component Libraries**: [shadcn/ui](https://ui.shadcn.com/), [Tailwind UI](https://tailwindui.com/), [DaisyUI](https://daisyui.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/), [Heroicons](https://heroicons.com/)
- **Animation**: [Motion (Framer Motion)](https://motion.dev/), [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate)
