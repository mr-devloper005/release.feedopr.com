import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Using the service',
    body: `By accessing ${SITE_CONFIG.name} you agree to use the product as a reader and, where available, a publisher, in line with the rules posted on each publish surface. Do not attempt to disrupt availability, probe non-public systems, or scrape the site in a way that degrades service for others.`,
  },
  {
    title: 'Content & rights',
    body: `You retain rights to what you create. You grant ${SITE_CONFIG.name} a non-exclusive license to host, display, and distribute that content in connection with the service, including in feeds, search, and previews. You confirm you have the right to post what you submit.`,
  },
  {
    title: 'Acceptable use',
    body: 'No illegal content, harassment, malware, or misleading impersonation. We may remove material or limit accounts that create legal risk, safety issues, or sustained spam.',
  },
  {
    title: 'Disclaimers',
    body: 'The service is provided as-is. We do not guarantee uninterrupted operation or that every item in search or feeds is error-free. Third-party links leave our environment.',
  },
  {
    title: 'Contact',
    body: 'For terms questions, use the site contact page. We may update these terms; material changes will be announced in-product when practicable.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of use"
      description={`Rules and expectations for using ${SITE_CONFIG.name}.`}
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
