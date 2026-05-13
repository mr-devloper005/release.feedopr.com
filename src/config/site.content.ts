import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'News desk · elitepressa.com',
  },
  footer: {
    tagline: 'Accountable coverage without the noise.',
  },
  hero: {
    badge: 'Latest wire',
    title: ['Headlines that respect your attention.', 'Context first—noise last.'],
    description:
      'Elite Pressa publishes concise updates and explainers—structured like a newsroom, paced like a modern reader expects.',
    primaryCta: {
      label: 'Open the updates desk',
      href: '/release',
    },
    secondaryCta: {
      label: 'Talk to the desk',
      href: '/contact',
    },
    searchPlaceholder: 'Search coverage',
    focusLabel: 'Now',
    featureCardBadge: 'Field note',
    featureCardTitle: 'New posts surface on the front page first.',
    featureCardDescription:
      'The homepage is built for scanning: lead story, signal stack, then a denser grid for deeper reading.',
  },
  home: {
    metadata: {
      title: 'Elite Pressa — reporting desk & updates',
      description:
        'Independent headlines, explainers, and dispatch-style updates from Elite Pressa.',
      openGraphTitle: 'Elite Pressa — reporting desk & updates',
      openGraphDescription:
        'Editorial updates and press-style coverage with a clean reading layout.',
      keywords: ['Elite Pressa', 'headlines', 'news desk', 'updates', 'reporting'],
    },
    introBadge: 'Our approach',
    introTitle: 'Built for clarity under deadline.',
    introParagraphs: [
      'We keep the front page legible: one lead, a tight spotlight column, and a wire section for everything else.',
      'Story pages stay reader-first—no clutter, no theatrical chrome—so the reporting stays in focus.',
      'If you need the full archive, the updates desk lists every published item with quick filters.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Dispatch-style updates with consistent typography.',
      'Archive routes that stay fast to scan on mobile.',
      'Search across the site when you know what you are looking for.',
    ],
    primaryLink: {
      label: 'Browse updates',
      href: '/release',
    },
    secondaryLink: {
      label: 'Contact',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Reach the desk',
    title: 'Have a tip, correction, or partnership note?',
    description:
      'Use the contact page for editorial inquiries. We read everything—volume permitting.',
    primaryCta: {
      label: 'Contact',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Search coverage',
      href: '/search',
    },
  },
  taskSectionHeading: 'Wire & updates',
  taskSectionDescriptionSuffix: 'Newest dispatches from the desk.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Long-form reporting and essays.',
  },
  listing: {
    title: 'Listings',
    description: 'Directory-style entries when enabled.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Short notices and classified posts.',
  },
  image: {
    title: 'Images',
    description: 'Visual stories and image-led posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'Public profiles and bylines.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Curated links and resources.',
  },
  pdf: {
    title: 'Resources',
    description: 'PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Updates desk',
    description: 'Latest dispatches, briefs, and announcements.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: {
    title: 'Articles',
    paragraphs: [
      'Long-form pieces live here when the article task is enabled—spaced for deep reading and slower headlines.',
    ],
    links: [{ label: 'Home', href: '/' }],
  },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Updates desk',
    paragraphs: [
      'This is the main publishing lane for Elite Pressa: briefs, advisories, and field notes in a single scannable feed.',
      'Use categories to focus a topic, or jump into a story when the headline is enough context.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
