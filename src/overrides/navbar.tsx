'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, Radio } from 'lucide-react'
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
    <header className="sticky top-0 z-50 w-full shadow-[0_4px_24px_rgba(0,9,44,0.18)]" style={{ background: '#00092C' }}>
      {/* Top utility bar */}
      <div style={{ background: '#B20600' }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1.5 text-[11px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Radio className="h-3 w-3 text-white/90 animate-pulse" />
            <span className="font-semibold tracking-wide text-white">
              {siteContent.navbar.tagline}
            </span>
          </div>
          <nav className="hidden flex-wrap gap-x-4 sm:flex" aria-label="Utility">
            {utilityLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/80 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3 sm:gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg p-1.5 sm:h-14 sm:w-14"
            style={{ background: '#FF5F00' }}
          >
            <img
              src="/favicon.png?v=20260426"
              alt=""
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <span className="block truncate font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] sm:block" style={{ color: '#FF5F00' }}>
              Official Press Releases
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          <nav
            className="flex flex-wrap items-center justify-end gap-1 rounded-full p-1"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Main"
          >
            <Link
              href="/"
              className={cn(
                'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition',
                pathname === '/'
                  ? 'text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
              style={pathname === '/' ? { background: '#FF5F00' } : {}}
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
                    'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition',
                    active
                      ? 'text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                  style={active ? { background: '#FF5F00' } : {}}
                >
                  {task.label}
                </Link>
              )
            })}
            <Link
              href="/search"
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition',
                pathname.startsWith('/search')
                  ? 'text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
              style={pathname.startsWith('/search') ? { background: '#FF5F00' } : {}}
            >
              <Search className="h-3.5 w-3.5" />
              Search
            </Link>
          </nav>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t md:hidden" style={{ borderColor: 'rgba(255,255,255,0.1)', background: '#00092C' }}>
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-bold text-white/90 hover:bg-white/10"
            >
              Home
            </Link>
            {navTasks.map((task) => (
              <Link
                key={task.key}
                href={task.route}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-bold text-white/90 hover:bg-white/10"
              >
                {task.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-bold text-white/90 hover:bg-white/10"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <div className="mt-2 border-t pt-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {utilityLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-white/60 hover:text-white/90"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
