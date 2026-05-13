import { PageShell } from '@/components/shared/page-shell'

const licenses = [
  { name: 'Next.js', body: 'MIT License — Vercel, Inc.' },
  { name: 'React', body: 'MIT License — Meta / community contributors' },
  { name: 'Tailwind CSS', body: 'MIT License — Tailwind Labs' },
  { name: 'Radix UI', body: 'MIT License — WorkOS' },
  { name: 'Lucide icons', body: 'ISC License' },
  { name: 'Manrope & Fraunces fonts', body: 'SIL Open Font License' },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Licenses"
      description="Attribution for open-source software and fonts used in this product shell."
    >
      <div className="ep-glass rounded-2xl p-6 sm:p-8">
        <p className="text-sm text-muted-foreground">
          The following are principal dependencies; your deployment may include additional packages under their
          respective licenses in node_modules. Consult legal counsel for compliance in regulated environments.
        </p>
        <ul className="mt-8 space-y-4">
          {licenses.map((license) => (
            <li
              key={license.name}
              className="border-b border-border/40 py-3 last:border-0 last:pb-0"
            >
              <h2 className="font-display text-base font-semibold text-foreground">{license.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{license.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  )
}
