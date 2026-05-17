import Link from 'next/link'
import { Search, Radio, Mail, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { siteContent } from '@/config/site.content'
import { SITE_RECIPE } from '@/config/site.recipe'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  const enabled = SITE_CONFIG.tasks.filter((t) => t.enabled)
  const primary = enabled.find((t) => t.key === SITE_RECIPE.primaryTask) || enabled[0]
  const moreTasks = enabled.filter((t) => t.key !== primary?.key)

  return (
    <footer style={{ background: '#00092C', color: '#EEEEEE' }}>
      {/* Orange accent bar */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #FF5F00, #B20600)' }} />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ background: '#FF5F00' }}
              >
                <Radio className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-display text-xl font-bold tracking-tight text-white">
                  {SITE_CONFIG.name}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#FF5F00' }}>
                  Official Press Releases
                </p>
              </div>
            </div>
            <p className="text-sm leading-7" style={{ color: 'rgba(238,238,238,0.65)' }}>
              {SITE_CONFIG.description}
            </p>
            {primary ? (
              <Link
                href={primary.route}
                className="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                style={{ background: '#FF5F00' }}
              >
                <Radio className="h-4 w-4" />
                {primary.label}
              </Link>
            ) : null}
          </div>

          {/* Navigation column */}
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#FF5F00' }}
            >
              Press Desk
            </p>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(238,238,238,0.7)' }}>
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              {moreTasks.length ? (
                moreTasks.map((t) => (
                  <li key={t.key}>
                    <Link href={t.route} className="hover:text-white transition">
                      {t.label}
                    </Link>
                  </li>
                ))
              ) : null}
              <li>
                <Link href="/search" className="inline-flex items-center gap-2 hover:text-white transition">
                  <Search className="h-3.5 w-3.5" />
                  Search Releases
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Media Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & info column */}
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#FF5F00' }}
            >
              {siteContent.footer.tagline}
            </p>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(238,238,238,0.7)' }}>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: 'rgba(238,238,238,0.1)' }}
        >
          <p className="text-sm" style={{ color: 'rgba(238,238,238,0.45)' }}>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: 'rgba(238,238,238,0.35)' }}>
            Official Press Release Distribution
          </p>
        </div>

        {categories.length ? (
          <div className="mt-8 border-t border-current/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

      </div>
    </footer>
  )
}
