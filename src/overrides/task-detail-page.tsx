import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, User, Tag, ChevronRight, Radio } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function getCategory(post: any): string {
  const cat = post?.content?.category
  if (typeof cat === 'string' && cat.trim()) return cat.trim()
  const tag = post?.tags?.find((t: any) => typeof t === 'string' && t !== 'mediaDistribution')
  if (typeof tag === 'string') return tag
  return 'Press Release'
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const recent = (await fetchTaskPosts('mediaDistribution', 8, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 5)

  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Post body will appear here.')
  const category = getCategory(post)

  return (
    <div className="min-h-screen" style={{ background: '#EEEEEE', color: '#00092C', fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <NavbarShell />

      {/* Hero header */}
      <section style={{ background: '#00092C' }}>
        {/* Orange top accent line */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #FF5F00, #B20600)' }} />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-[12px]" style={{ color: 'rgba(238,238,238,0.5)' }}>
            <Link href="/" className="transition hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/release" className="transition hover:text-white">Press Releases</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate max-w-[200px]" style={{ color: 'rgba(238,238,238,0.75)' }}>{post.title}</span>
          </div>

          {/* Category badge */}
          <div className="mb-4 flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white"
              style={{ background: '#FF5F00' }}
            >
              <Tag className="h-3 w-3" />
              {category}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: 'rgba(238,238,238,0.5)' }}>
              <Radio className="h-3 w-3 animate-pulse" style={{ color: '#FF5F00' }} />
              Official Press Release
            </span>
          </div>

          {/* Title */}
          <h1 className="max-w-4xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm" style={{ color: 'rgba(238,238,238,0.55)' }}>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" style={{ color: '#FF5F00' }} />
              {post.authorName || 'Press Desk'}
            </span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* Article body */}
          <article>
            {/* Summary callout */}
            {post.summary && (
              <div
                className="mb-8 rounded-lg border-l-4 p-5"
                style={{ background: 'white', borderLeftColor: '#FF5F00', boxShadow: '0 2px 12px rgba(0,9,44,0.06)' }}
              >
                <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: '#FF5F00' }}>
                  Summary
                </p>
                <p className="text-[15px] leading-7" style={{ color: 'rgba(0,9,44,0.75)' }}>
                  {post.summary}
                </p>
              </div>
            )}

            {/* Body content */}
            <div
              className="rounded-xl p-6 sm:p-8"
              style={{ background: 'white', border: '1px solid rgba(0,9,44,0.08)', boxShadow: '0 2px 16px rgba(0,9,44,0.05)' }}
            >
              <div
                className="prose prose-lg max-w-none"
                style={{
                  '--tw-prose-headings': '#00092C',
                  '--tw-prose-body': 'rgba(0,9,44,0.78)',
                  '--tw-prose-links': '#FF5F00',
                  '--tw-prose-bold': '#00092C',
                  '--tw-prose-hr': 'rgba(0,9,44,0.1)',
                  '--tw-prose-quotes': '#00092C',
                  '--tw-prose-quote-borders': '#FF5F00',
                } as React.CSSProperties}
              >
                <RichContent html={html} />
              </div>
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link
                href="/release"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition hover:opacity-90"
                style={{ background: '#00092C', color: '#EEEEEE' }}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Press Releases
              </Link>
            </div>

            {/* Prev / Next */}
            {recent.slice(0, 2).length > 0 && (
              <div
                className="mt-8 grid overflow-hidden rounded-xl md:grid-cols-2"
                style={{ border: '1px solid rgba(0,9,44,0.1)' }}
              >
                {recent.slice(0, 2).map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/release/${item.slug}`}
                    className="group block p-6 transition hover:bg-white"
                    style={{
                      background: index === 0 ? 'white' : '#EEEEEE',
                      borderRight: index === 0 ? '1px solid rgba(0,9,44,0.08)' : undefined,
                    }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#FF5F00' }}>
                      {index === 0 ? '← Previous Release' : 'Next Release →'}
                    </p>
                    <p className="text-sm font-bold leading-snug group-hover:underline" style={{ color: '#00092C' }}>
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">

            {/* Search */}
            <div
              className="overflow-hidden rounded-xl"
              style={{ background: 'white', border: '1px solid rgba(0,9,44,0.08)' }}
            >
              <div className="px-5 py-3" style={{ background: '#00092C' }}>
                <p className="text-[11px] font-black uppercase tracking-widest text-white">Search Releases</p>
              </div>
              <div className="p-4">
                <div className="flex overflow-hidden rounded-lg" style={{ border: '1px solid rgba(0,9,44,0.15)' }}>
                  <input
                    className="h-11 flex-1 bg-transparent px-4 text-sm outline-none"
                    placeholder="Search press releases..."
                    style={{ color: '#00092C' }}
                  />
                  <button
                    className="flex h-11 w-11 shrink-0 items-center justify-center text-white transition hover:opacity-90"
                    style={{ background: '#FF5F00' }}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent releases */}
            <div
              className="overflow-hidden rounded-xl"
              style={{ background: 'white', border: '1px solid rgba(0,9,44,0.08)' }}
            >
              <div className="px-5 py-3" style={{ background: '#00092C' }}>
                <p className="text-[11px] font-black uppercase tracking-widest text-white">Recent Releases</p>
              </div>
              <div className="divide-y p-2" style={{ '--tw-divide-opacity': '1', borderColor: 'rgba(0,9,44,0.06)' } as React.CSSProperties}>
                {recent.map((item) => (
                  <Link
                    key={item.id}
                    href={`/release/${item.slug}`}
                    className="group flex items-start gap-3 rounded-lg p-3 transition hover:bg-[#EEEEEE]"
                  >
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#FF5F00' }} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug group-hover:underline" style={{ color: '#00092C' }}>
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA box */}
            <div
              className="rounded-xl p-5"
              style={{ background: '#00092C' }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Radio className="h-4 w-4" style={{ color: '#FF5F00' }} />
                <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#FF5F00' }}>
                  Submit a Release
                </p>
              </div>
              <p className="text-sm leading-6" style={{ color: 'rgba(238,238,238,0.65)' }}>
                Have an official announcement? Submit your press release for distribution.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                style={{ background: '#FF5F00' }}
              >
                Get in Touch
              </Link>
            </div>

          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
