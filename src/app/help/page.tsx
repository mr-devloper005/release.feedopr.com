import Link from 'next/link'
import { BookOpen, LifeBuoy, Search } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SITE_CONFIG } from '@/lib/site-config'

const topics = [
  {
    title: 'Using the updates desk',
    description: 'How the archive, categories, and story pages work when you are browsing on mobile or desktop.',
    icon: BookOpen,
  },
  {
    title: 'Search & discovery',
    description: 'Query syntax is simple: start broad, then narrow with categories or direct URLs to a story.',
    icon: Search,
  },
  {
    title: 'Account & contact',
    description: 'For publish-side tools, use the contact page. For read-only issues, check the FAQ first.',
    icon: LifeBuoy,
  },
]

const helpFaqs = [
  {
    id: 'faq-archives',
    question: 'How do I read older updates?',
    answer: `Open the primary updates desk (see the top navigation). The grid lists newest first; use your browser search (Ctrl/Cmd+F) on the page for quick name matching.`,
  },
  {
    id: 'faq-tips',
    question: 'How do I send a news tip?',
    answer: `Use the contact page. Put “tip” in the subject line, include what you can verify, and how to reach you if we need a follow-up.`,
  },
  {
    id: 'faq-errors',
    question: 'Something looks wrong in a story—what now?',
    answer: `Use “corrections” in the contact flow. Link the story, quote the line in question, and we will take it seriously.`,
  },
] as const

export default function HelpPage() {
  return (
    <PageShell
      title="Help"
      description={`Practical answers for reading and sharing ${SITE_CONFIG.name} without digging through a manual.`}
      actions={
        <Button asChild>
          <Link href="/contact">Contact the desk</Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Start here</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="ep-glass flex flex-col rounded-2xl p-5 transition hover:border-primary/25 sm:flex-row sm:items-start sm:gap-4"
              >
                <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:mb-0">
                  <topic.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground">{topic.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ep-glass rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold text-foreground">FAQ</h3>
          <p className="mt-1 text-sm text-muted-foreground">Short answers; we keep this list tight on purpose.</p>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {helpFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-border/50">
                <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageShell>
  )
}
