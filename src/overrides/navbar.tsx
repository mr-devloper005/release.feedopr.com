'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { SITE_RECIPE } from '@/config/site.recipe'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const utilityLinks = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  if (pathname === '/about' || pathname?.startsWith('/about/')) {
    return null
  }

  const enabled = useMemo(() => SITE_CONFIG.tasks.filter((t) => t.enabled), [])
  const primary =
    enabled.find((t) => t.key === SITE_RECIPE.primaryTask) || enabled[0]
  const secondary = useMemo(
    () => enabled.filter((t) => t.key !== primary?.key).slice(0, 2),
    [enabled, primary?.key]
  )
  const navTasks = useMemo(() => {
    const list = [...(primary ? [primary] : []), ...secondary]
    return list.length ? list : enabled.slice(0, 3)
  }, [primary, secondary, enabled])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[oklch(0.2_0.045_220)] via-[oklch(0.24_0.05_210)] to-[oklch(0.22_0.05_200)] text-white shadow-[0_12px_40px_oklch(0.15_0.04_230/0.35)] backdrop-blur-xl">
      <div className="border-b border-white/5 bg-black/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-[12px] text-white/70 sm:px-6">
          <span className="font-medium tracking-wide text-white/90">
            {siteContent.navbar.tagline}
          </span>
          <nav className="hidden flex-wrap gap-x-4 sm:flex" aria-label="Utility">
            {utilityLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition hover:text-amber-300/95"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-1.5 sm:h-16 sm:w-16 sm:rounded-3xl sm:p-2">
            <img
              src="/favicon.png?v=20260426"
              alt=""
              width={56}
              height={56}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <span className="block truncate font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-amber-200/80 sm:block">
              {siteContent.footer.tagline}
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <div
            className="flex flex-wrap items-center justify-end gap-1 rounded-full border border-white/10 bg-white/5 p-1"
            role="navigation"
            aria-label="Main"
          >
            <Link
              href="/"
              className={cn(
                'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition',
                pathname === '/'
                  ? 'bg-amber-400 text-[oklch(0.18_0.04_250)] shadow-md'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              Home
            </Link>
            {navTasks.map((task) => {
              const active = pathname === task.route || pathname.startsWith(`${task.route}/`)
              return (
                <Link
                  key={task.key}
                  href={task.route}
                  className={cn(
                    'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition',
                    active
                      ? 'bg-amber-400 text-[oklch(0.18_0.04_250)] shadow-md'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {task.label}
                </Link>
              )
            })}
            <Link
              href="/search"
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition',
                pathname.startsWith('/search')
                  ? 'bg-amber-400 text-[oklch(0.18_0.04_250)] shadow-md'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <Search className="h-3.5 w-3.5" />
              Search
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[oklch(0.18_0.04_230)]/95 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 sm:px-6">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-white/90"
            >
              Home
            </Link>
            {navTasks.map((task) => (
              <Link
                key={task.key}
                href={task.route}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-white/90"
              >
                {task.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-white/90"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            {utilityLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-white/70"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
