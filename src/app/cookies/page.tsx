import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'Essential',
    body: 'Required to keep sessions secure, route traffic safely, and prevent basic abuse. These are not used for ad profiling.',
  },
  {
    title: 'Preferences',
    body: 'Remember light choices and UI state where the app exposes controls (for example, reduced motion or saved filters on supported surfaces).',
  },
  {
    title: 'Analytics',
    body: 'Where enabled, we may use first-party or privacy-respecting tools to see aggregate usage—pages viewed, performance timings—to prioritize fixes. You can use browser settings to block non-essential cookies, understanding some features may degrade.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie policy"
      description="What cookies and similar storage we use, in plain terms."
    >
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground">Last updated: April 24, 2026</p>
        {sections.map((section) => (
          <div key={section.title} className="ep-glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
