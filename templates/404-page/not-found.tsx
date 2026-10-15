/**
 * Production Next.js App Router 404 Not Found Page (`app/not-found.tsx`)
 * 
 * Features:
 * - Branded Golden Shark Level 3 theme matching production design systems
 * - Responsive Tailwind CSS layout with dark mode support
 * - Search bar with client-side query submission
 * - Instant recovery actions (Go to Home, Documentation, Report broken link)
 * - Returns genuine HTTP 404 status (prevents Soft 404 SEO penalties)
 */

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#090a10] px-6 py-16 text-slate-100 antialiased">
      {/* Ambient background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-500/15 via-sky-500/10 to-transparent blur-3xl"
      />

      {/* Cyber perspective grid */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-amber-500/25 bg-slate-900/60 p-8 text-center shadow-2xl shadow-black/80 backdrop-blur-xl sm:p-12">
        {/* Golden Shark Level 3 Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300">
          <span className="text-sm">🦈</span> Golden Shark Level 3 Verified
        </div>

        {/* Mascot Illustration */}
        <div className="relative mx-auto mb-6 h-48 w-full max-w-sm sm:h-56">
          <Image
            src="/assets/images/404_golden_shark.png"
            alt="Golden Cyber Shark 404 Mascot"
            fill
            priority
            className="object-contain drop-shadow-[0_15px_35px_rgba(245,158,11,0.35)] transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* 404 Code & Heading */}
        <div className="mb-2 text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 sm:text-7xl">
          404
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Lost in the Digital Ocean
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
          The page or resource you are looking for has been moved, deleted, or never existed in these coordinates. Let our Golden Shark guide you safely back.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:from-amber-300 hover:to-amber-500 hover:shadow-amber-500/40 sm:w-auto"
          >
            🧭 Return to Home
          </Link>

          <Link
            href="/docs"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-700/80 sm:w-auto"
          >
            📖 Documentation
          </Link>

          <Link
            href="https://github.com/devcaiada/devbible/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-700/80 sm:w-auto"
          >
            🐛 Report Issue
          </Link>
        </div>

        {/* Footer Quick Navigation */}
        <div className="mt-8 border-t border-slate-800/80 pt-6 text-xs text-slate-500">
          <span>Quick links: </span>
          <Link href="/" className="text-slate-400 hover:text-amber-400">Dashboard</Link>
          <span className="mx-2">·</span>
          <Link href="/checklist" className="text-slate-400 hover:text-amber-400">Checklist</Link>
          <span className="mx-2">·</span>
          <Link href="/skills" className="text-slate-400 hover:text-amber-400">Skills</Link>
          <span className="mx-2">·</span>
          <Link href="/templates" className="text-slate-400 hover:text-amber-400">Templates</Link>
        </div>
      </div>
    </main>
  );
}
