'use client'

import type { FormEvent } from 'react'
import { FileText, Mail, MessageSquare, Newspaper, Send } from 'lucide-react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SiteAmbientBackdrop } from '@/components/shared/site-ambient-backdrop'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const deskEmail = (local: string) => `${local}@${SITE_CONFIG.domain}`

const lanes = [
  {
    icon: Newspaper,
    title: 'Tips & story leads',
    body: 'Send document links, on-the-record notes, and what you are trying to verify. Include dates and contact windows when possible.',
  },
  {
    icon: FileText,
    title: 'Corrections & updates',
    body: 'Flag a factual error in a published update and we will review and post a clear correction or clarification.',
  },
  {
    icon: MessageSquare,
    title: 'Licensing & syndication',
    body: 'Ask about reprints, partner distribution, or classroom use. Lead with a one-line rights question.',
  },
]

export function ContactPageOverride() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement | null)?.value || ''
    const returnEmail = (form.elements.namedItem('email') as HTMLInputElement | null)?.value || ''
    const subj = (form.elements.namedItem('subject') as HTMLInputElement | null)?.value || 'Contact from website'
    const text = (form.elements.namedItem('body') as HTMLTextAreaElement | null)?.value || ''
    const body = [name && `Name: ${name}`, returnEmail && `Reply-to: ${returnEmail}`, text].filter(Boolean).join('\n\n')
    const href = `mailto:${deskEmail('hello')}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
    window.location.href = href
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <SiteAmbientBackdrop />
      <NavbarShell />
      <main className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="border-b border-border/40 pb-6">
          <p className="editorial-label w-fit">Contact</p>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Reach the desk</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {SITE_CONFIG.name} is a small newsroom surface: we sort requests by topic so you get a clear line instead of a
            catch-all inbox. For time-sensitive safety issues, put URGENT in the subject.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            {lanes.map((lane) => (
              <div key={lane.title} className="ep-glass rounded-2xl p-6 transition hover:border-primary/25">
                <lane.icon className="h-5 w-5 text-primary" aria-hidden />
                <h2 className="mt-3 font-display text-lg font-semibold text-foreground">{lane.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lane.body}</p>
              </div>
            ))}
            <div className="ep-glass rounded-2xl p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Direct</p>
                <a
                  href={`mailto:${deskEmail('hello')}`}
                  className="mt-2 flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary"
                >
                  <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {deskEmail('hello')}
                </a>
              </div>
              <Button variant="outline" asChild className="mt-4 shrink-0 sm:mt-0">
                <Link href="/search">Search coverage</Link>
              </Button>
            </div>
          </div>

          <div className="ep-glass rounded-[1.75rem] p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground">Send a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Opens your mail app with a pre-filled message. You can also email us directly.
            </p>
            <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" name="name" autoComplete="name" placeholder="Your name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Return email (optional, in your mail client)</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-subject">Topic</Label>
                <Input id="contact-subject" name="subject" placeholder="Tip, correction, partnership…" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-body">Message</Label>
                <Textarea
                  id="contact-body"
                  name="body"
                  placeholder="Context, links, and the outcome you need."
                  className="min-h-[160px] resize-y"
                />
              </div>
              <Button type="submit" className="h-11 w-full gap-2 sm:w-auto sm:px-8">
                <Send className="h-4 w-4" aria-hidden />
                Open in email app
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
