import { PageShell } from '@/components/shared/page-shell'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const services = [
  { name: 'Site & reading pages', status: 'Operational' as const },
  { name: 'Search (site scope)', status: 'Operational' as const },
  { name: 'Publish / connector feeds', status: 'Operational' as const },
]

const incidents = [
  { date: 'Mar 5, 2026', title: 'Elevated time-to-index for a subset of new posts', status: 'Resolved' },
  { date: 'Jan 19, 2026', title: 'Brief CDN cache skew on static assets in one region', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="Status"
      description={`Live component health for ${SITE_CONFIG.name}. Status here is human-maintained; subscribe to your provider’s alerts for infrastructure you control.`}
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.name} className="ep-glass rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-base font-semibold text-foreground">{service.name}</h2>
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[oklch(0.65_0.15_150)]" aria-hidden />
              </div>
              <Badge className="mt-3 bg-primary/15 text-foreground hover:bg-primary/20">{service.status}</Badge>
            </div>
          ))}
        </div>

        <div className="ep-glass rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold text-foreground">Recent incidents</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A short, honest list. If something is broken on your end, also try a hard refresh and another network.
          </p>
          <div className="mt-6 space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident.title}
                className="flex flex-col gap-1 border-b border-border/50 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground sm:w-32">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {incident.date}
                </div>
                <p className="min-w-0 flex-1 text-sm font-medium text-foreground">{incident.title}</p>
                <Badge variant="secondary" className="w-fit">
                  {incident.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
