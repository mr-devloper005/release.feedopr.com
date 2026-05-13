/**
 * Subtle mesh orbs behind content — same visual language as the editorial home hero.
 * Presentational only; use inside a `relative` ancestor or rely on `fixed` stacking.
 */
export function SiteAmbientBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-foreground/5 blur-3xl" />
    </div>
  )
}
