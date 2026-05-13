import Link from 'next/link'
import { Search, Rss } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { SITE_RECIPE } from '@/config/site.recipe'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  const enabled = SITE_CONFIG.tasks.filter((t) => t.enabled)
  const primary = enabled.find((t) => t.key === SITE_RECIPE.primaryTask) || enabled[0]
  const moreTasks = enabled.filter((t) => t.key !== primary?.key)

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-[oklch(0.2_0.04_220)] to-[oklch(0.16_0.04_230)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="ep-glass-dark grid gap-10 rounded-[1.75rem] p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {SITE_CONFIG.name}
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
              {SITE_CONFIG.description}
            </p>
            {primary ? (
              <Link
                href={primary.route}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[oklch(0.16_0.04_250)] transition hover:brightness-105"
              >
                <Rss className="h-4 w-4" />
                {primary.label}
              </Link>
            ) : null}
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
                Desk
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {moreTasks.length ? (
                  moreTasks.map((t) => (
                    <li key={t.key}>
                      <Link href={t.route} className="hover:text-amber-200">
                        {t.label}
                      </Link>
                    </li>
                  ))
                ) : null}
                <li>
                  <Link href="/search" className="inline-flex items-center gap-2 hover:text-amber-200">
                    <Search className="h-3.5 w-3.5" />
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-amber-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
                {siteContent.footer.tagline}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li>
                  <Link href="/privacy" className="hover:text-amber-200">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-amber-200">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
