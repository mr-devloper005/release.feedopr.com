'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SiteAmbientBackdrop } from '@/components/shared/site-ambient-backdrop'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <SiteAmbientBackdrop />
      <NavbarShell />
      <main className="relative">
        <section className="border-b border-border/50 bg-background/40 backdrop-blur-sm">
          <div className="ep-kicker-rule" aria-hidden />
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
                  {title}
                </h1>
                {description && (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {description}
                  </p>
                )}
              </div>
              {actions && (
                <div className="ep-glass flex flex-wrap gap-3 rounded-2xl p-2 sm:rounded-full sm:p-1">
                  {actions}
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
