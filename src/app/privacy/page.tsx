import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'What we collect',
    body: `We collect information you provide (for example, account details or messages to ${SITE_CONFIG.name}), content you post, and technical data needed to run the product (device or browser signals, security logs, and performance diagnostics). Public posts are visible according to the product’s publishing settings.`,
  },
  {
    title: 'How we use data',
    body: 'We use data to operate the service, secure accounts, improve search and relevance, and communicate about the product. We do not sell your personal information.',
  },
  {
    title: 'Cookies & storage',
    body: 'We use essential cookies and similar storage for sign-in, preferences, and abuse protection. See the cookie policy for categories you can control when those controls exist in-product.',
  },
  {
    title: 'Your choices',
    body: 'Where the product offers export or delete flows, you can use them. You may also contact the desk for data requests subject to applicable law. Some retention is required for security, finance, and legal compliance.',
  },
  {
    title: 'International use',
    body: 'The service may be operated from more than one region. By using the site, you understand data may be processed where we or our providers operate.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy"
      description={`How ${SITE_CONFIG.name} handles personal data.`}
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
