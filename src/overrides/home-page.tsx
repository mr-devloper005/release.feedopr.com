import Link from 'next/link'
import { ArrowRight, Radio, ChevronRight, Newspaper, Globe, Building2, TrendingUp } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function excerpt(text?: string | null, max = 200) {
  const value = (text || '').trim()
  if (!value) return 'Read the full press release for complete details and official statements.'
  return value.length > max ? value.slice(0, max - 3).trimEnd() + '...' : value
}

function getCategory(post: any): string {
  const cat = post?.content?.category
  if (typeof cat === 'string' && cat.trim()) return cat.trim()
  const tag = post?.tags?.find((t: any) => typeof t === 'string' && t !== 'mediaDistribution')
  if (typeof tag === 'string') return tag
  return 'Press Release'
}

function getCategoryColor(cat: string): string {
  const map: Record<string, string> = {
    Corporate: '#B20600',
    Technology: '#00092C',
    Finance: '#B20600',
    Healthcare: '#00092C',
    Energy: '#FF5F00',
    Media: '#B20600',
  }
  return map[cat] || '#00092C'
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 16, { fresh: true })
  const featured = posts[0]
  const spotlight = posts.slice(1, 4)
  const wire = posts.slice(4, 10)
  const archive = posts.slice(10, 16)

  return (
    <div className="min-h-screen" style={{ background: '#EEEEEE', color: '#00092C', fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <NavbarShell />

      {/* Breaking marquee ticker */}
      <div className="w-full overflow-hidden" style={{ background: '#B20600' }}>
        <div className="flex items-center">
          <span
            className="z-10 shrink-0 px-5 py-3 text-[13px] font-black uppercase tracking-widest text-white"
            style={{ background: '#FF5F00' }}
          >
            Breaking
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="pw-marquee flex items-center whitespace-nowrap py-2">
              {[...posts, ...posts].map((p, i) => (
                <span key={i} className="inline-flex items-center">
                  <Link
                    href={`/release/${p.slug}`}
                    className="px-5 text-[15px] font-semibold text-white/95 transition hover:text-white hover:underline"
                  >
                    {p.title}
                  </Link>
                  <span className="text-[10px] text-white/40">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          .pw-marquee { animation: pw-scroll 60s linear infinite; }
          .pw-marquee:hover { animation-play-state: paused; }
          @keyframes pw-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ── Hero: lead + spotlight ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Lead release */}
          {featured ? (
            <article
              className="overflow-hidden rounded-xl"
              style={{ background: 'white', border: '1px solid rgba(0,9,44,0.1)', boxShadow: '0 4px 24px rgba(0,9,44,0.07)' }}
            >
              <div className="flex items-center px-6 py-3" style={{ background: '#00092C' }}>
                <span
                  className="rounded px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white"
                  style={{ background: '#FF5F00' }}
                >
                  {getCategory(featured)}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-3 flex items-center gap-2">
                  <Radio className="h-3.5 w-3.5 animate-pulse" style={{ color: '#B20600' }} />
                  <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#B20600' }}>
                    Lead Release
                  </span>
                </div>

                <h2 className="text-2xl font-black leading-tight sm:text-3xl lg:text-[2rem]" style={{ color: '#00092C', fontFamily: 'inherit' }}>
                  {featured.title}
                </h2>

                <p className="mt-4 text-[15px] leading-7" style={{ color: 'rgba(0,9,44,0.62)' }}>
                  {excerpt(featured.summary, 300)}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/release/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                    style={{ background: '#FF5F00' }}
                  >
                    Read Full Release
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="text-sm" style={{ color: 'rgba(0,9,44,0.4)' }}>
                    by {featured.authorName || 'Press Desk'}
                  </span>
                </div>
              </div>
            </article>
          ) : (
            <div
              className="flex items-center justify-center rounded-xl p-10"
              style={{ background: 'white', border: '1px solid rgba(0,9,44,0.1)' }}
            >
              <div className="text-center">
                <Newspaper className="mx-auto mb-4 h-10 w-10" style={{ color: 'rgba(0,9,44,0.18)' }} />
                <p className="text-lg font-bold" style={{ color: '#00092C' }}>Press releases will appear here</p>
                <p className="mt-1 text-sm" style={{ color: 'rgba(0,9,44,0.45)' }}>Official announcements and media advisories</p>
              </div>
            </div>
          )}

          {/* Spotlight sidebar */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2" style={{ borderBottom: '2px solid #FF5F00' }}>
              <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF5F00' }} />
              <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#00092C' }}>
                Latest Releases
              </p>
            </div>

            {spotlight.length ? (
              spotlight.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/release/${post.slug}`}
                  className="group block rounded-lg p-4 transition hover:shadow-md"
                  style={{ background: 'white', border: '1px solid rgba(0,9,44,0.08)' }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded text-[11px] font-black text-white"
                      style={{ background: i === 0 ? '#FF5F00' : '#B20600' }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#B20600' }}>
                        {getCategory(post)}
                      </span>
                      <h3 className="mt-1 text-sm font-bold leading-snug group-hover:underline" style={{ color: '#00092C' }}>
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="rounded-lg p-4 text-sm" style={{ background: 'white', color: 'rgba(0,9,44,0.45)' }}>
                More releases coming soon.
              </p>
            )}

            <Link
              href="/release"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition hover:opacity-90"
              style={{ background: '#00092C', color: '#EEEEEE' }}
            >
              View All Press Releases
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ── Press Wire divider ── */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: 'rgba(0,9,44,0.12)' }} />
          <div className="flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: '#00092C' }}>
            <Globe className="h-3.5 w-3.5" style={{ color: '#FF5F00' }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Press Wire</span>
          </div>
          <div className="h-px flex-1" style={{ background: 'rgba(0,9,44,0.12)' }} />
        </div>

        {/* ── Wire feed grid ── */}
        {wire.length > 0 && (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black" style={{ color: '#00092C', fontFamily: 'inherit' }}>Wire Feed</h2>
              <Link
                href="/release"
                className="text-xs font-bold uppercase tracking-widest transition hover:opacity-70"
                style={{ color: '#FF5F00' }}
              >
                Full Archive →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wire.map((post) => {
                const cat = getCategory(post)
                return (
                  <Link
                    key={post.id}
                    href={`/release/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg transition hover:shadow-lg"
                    style={{ background: 'white', border: '1px solid rgba(0,9,44,0.08)' }}
                  >
                    <div
                      className="flex items-center px-4 py-2.5"
                      style={{ background: getCategoryColor(cat) }}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{cat}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-[15px] font-bold leading-snug group-hover:underline" style={{ color: '#00092C', fontFamily: 'inherit' }}>
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-6" style={{ color: 'rgba(0,9,44,0.58)' }}>
                        {excerpt(post.summary, 110)}
                      </p>
                      <div className="mt-4 flex items-center justify-end">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold" style={{ color: '#FF5F00' }}>
                          Read <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ── About / CTA banner ── */}
        <div className="mt-12 overflow-hidden rounded-xl" style={{ background: '#00092C' }}>
          <div className="flex flex-col sm:flex-row">

            {/* Left: text + CTAs */}
            <div className="flex-1 p-8 sm:p-10">
              <div className="mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4" style={{ color: '#FF5F00' }} />
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#FF5F00' }}>
                  About PressWire Hub
                </span>
              </div>
              <h2 className="text-2xl font-black text-white sm:text-3xl" style={{ fontFamily: 'inherit' }}>
                The authoritative source for official press releases and corporate announcements.
              </h2>
              <p className="mt-4 text-sm leading-7" style={{ color: 'rgba(238,238,238,0.6)' }}>
                PressWire Hub distributes official press releases, media advisories, and corporate announcements from organizations worldwide. Your news reaches journalists, analysts, and the public with speed and credibility.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/release"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                  style={{ background: '#FF5F00' }}
                >
                  Browse All Releases <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition hover:opacity-90"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#EEEEEE', border: '1px solid rgba(255,255,255,0.14)' }}
                >
                  Submit a Release
                </Link>
              </div>
            </div>

            {/* Right: stats */}
            <div
              className="flex shrink-0 flex-row items-center justify-around gap-0 border-t p-8 sm:w-64 sm:flex-col sm:items-start sm:justify-center sm:gap-6 sm:border-l sm:border-t-0 sm:p-10"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              {[
                { label: 'Press Releases', value: `${posts.length || 0}+` },
                { label: 'Categories', value: 'Multi-sector' },
                { label: 'Distribution', value: 'Global' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(238,238,238,0.45)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Archive list ── */}
        {archive.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px flex-1" style={{ background: 'rgba(0,9,44,0.12)' }} />
              <h2 className="text-base font-black uppercase tracking-widest" style={{ color: '#00092C', fontFamily: 'inherit' }}>
                More from the Wire
              </h2>
              <div className="h-px flex-1" style={{ background: 'rgba(0,9,44,0.12)' }} />
            </div>

            <div className="space-y-2">
              {archive.map((post) => (
                <Link
                  key={post.id}
                  href={`/release/${post.slug}`}
                  className="group flex items-start gap-4 rounded-lg p-4 transition hover:shadow-md"
                  style={{ background: 'white', border: '1px solid rgba(0,9,44,0.07)' }}
                >
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: '#FF5F00' }} />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#B20600' }}>
                      {getCategory(post)}
                    </span>
                    <h3 className="mt-1 text-sm font-bold leading-snug group-hover:underline" style={{ color: '#00092C' }}>
                      {post.title}
                    </h3>
                  </div>
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 opacity-30 transition group-hover:opacity-100" style={{ color: '#FF5F00' }} />
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/release"
                className="inline-flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-bold text-white transition hover:opacity-90"
                style={{ background: '#00092C' }}
              >
                View Complete Press Release Archive
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}
