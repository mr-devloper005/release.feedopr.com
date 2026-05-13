import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { FileEdit, LineChart, Megaphone } from 'lucide-react'

const roles = [
  { title: 'Editorial intern (remote)', location: 'Remote', type: '6 months', level: 'Early career' },
  { title: 'Product designer', location: 'Hybrid', type: 'Full-time', level: 'Mid' },
  { title: 'Audience & distribution', location: 'Remote', type: 'Part-time', level: 'Contract' },
]

const benefits = [
  'Reader-first product reviews—ship only what improves scan and trust.',
  'Stipend for home office and connectivity where applicable.',
  'Stipend for source protection training and safety tooling.',
  'Quarterly editorial retros with the whole desk.',
]

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`We hire slowly and publish carefully. If you like tight typography and high-trust copy, you will fit ${SITE_CONFIG.name}.`}
      actions={
        <Button asChild>
          <Link href="/contact">Email the desk</Link>
        </Button>
      }
    >
      <div className="ep-glass mb-10 max-w-3xl rounded-2xl p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex gap-3">
            <FileEdit className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Editorial.</span> Fact-led briefings and readable layouts.
            </p>
          </div>
          <div className="flex gap-3">
            <LineChart className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Data.</span> Sensible metrics, no engagement hacks.
            </p>
          </div>
          <div className="flex gap-3">
            <Megaphone className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Audience.</span> Distribution that respects the reader.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.title}
              className="ep-glass flex flex-col gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{role.level}</Badge>
                  <Badge variant="outline">{role.type}</Badge>
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold text-foreground">{role.title}</h2>
                <p className="text-sm text-muted-foreground">{role.location}</p>
              </div>
              <Button variant="outline" asChild className="shrink-0 self-start sm:self-center">
                <Link href="/contact">Introduce yourself</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="ep-glass h-fit rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold text-foreground">Principles</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {SITE_CONFIG.name} optimizes for clarity, not hours spent in meetings. We document decisions so the next
            person can move fast.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2 border-l-2 border-primary/40 pl-3">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  )
}
