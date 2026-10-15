'use client';

/**
 * Production Next.js App Router Error Boundary (`app/error.tsx`)
 * 
 * Features:
 * - Automatically catches runtime React exceptions within the current route segment
 * - Reports errors to Sentry or custom APM in production
 * - Preserves layout stability without refreshing the whole browser
 * - Displays error digests for debugging without leaking internal stack traces
 * - Provides immediate user recovery options (Try Again & Go to Home)
 */

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Report unhandled client-side exception to APM / Sentry
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error);
    } else {
      console.error('[ErrorBoundary caught error]:', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="w-full max-w-md rounded-2xl border border-red-200/60 bg-red-50/40 p-8 shadow-sm backdrop-blur dark:border-red-900/40 dark:bg-red-950/20">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600 dark:bg-red-900/50 dark:text-red-400">
          ⚠️
        </div>

        <h2 className="mb-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Something went wrong
        </h2>

        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          An unexpected error occurred while rendering this page. Our team has been notified.
        </p>

        {error.digest && (
          <div className="mb-6 rounded-lg bg-neutral-100 px-3 py-2 font-mono text-xs text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            Error ID: <span className="select-all font-semibold">{error.digest}</span>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
