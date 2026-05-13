import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { SiteAmbientBackdrop } from '@/components/shared/site-ambient-backdrop'
import { Link2, Newspaper, Rss } from 'lucide-react'

const highlights = [
  { label: 'Dispatch focus', value: 'Daily' },
  { label: 'Read time', value: 'Lean' },
  { label: 'Clutter', value: 'Low' },
]

const valueIcons = [Newspaper, Rss, Link2] as const

const values = [
  {
    title: 'Accuracy over velocity',
    description: 'We publish when the claim is defensible, not when the feed is empty—especially on fast-moving stories.',
  },
  {
    title: 'Clarity in layout',
    description: 'Headlines, summaries, and story pages stay typographically calm so the reporting stays the hero.',
  },
  {
    title: 'Stable links',
    description: 'The archive, search, and per-story URLs stay consistent so links keep working in newsletters and search.',
  },
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <SiteAmbientBackdrop />
      <h1 className="sr-only">About {SITE_CONFIG.name}</h1>
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="editorial-label w-fit">About the desk</p>
          <p className="font-display mt-5 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            {SITE_CONFIG.name} is built for clear briefings—not endless feeds.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We combine a tight front page, a scannable update archive, and story pages that stay readable on phones. The
            product goal is simple: get people to the right fact quickly, with context that holds up a day later.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/60 bg-card/50 shadow-sm backdrop-blur-sm">
            <CardContent className="space-y-5 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Newspaper className="h-3.5 w-3.5" /> Story
                </Badge>
                <span className="text-xs text-muted-foreground">Why we exist</span>
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground">A newsroom-shaped surface</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {SITE_CONFIG.name} is set up for dispatch-style coverage: a lead, a small spotlight stack, and a wire
                section for the rest. That rhythm keeps the homepage from turning into a generic “product landing” layout.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.label} className="ep-glass rounded-xl p-4 text-center">
                    <div className="text-xl font-semibold text-foreground sm:text-2xl">{item.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {values.map((value, i) => {
              const Icon = valueIcons[i] || Newspaper
              return (
                <div key={value.title} className="ep-glass rounded-2xl p-6">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Masthead (sample)</p>
          <p className="mt-1 text-sm text-muted-foreground">Placeholder bios for layout—swap in your real roster anytime.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <Card
                key={member.id}
                className="border-border/60 bg-card/50 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-border/50">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{member.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
