import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Official Press Releases & Media Advisories · PressWire Hub',
  },
  footer: {
    tagline: 'Trusted press distribution for organizations worldwide.',
  },
  hero: {
    badge: 'Breaking Release',
    title: ['Official press releases delivered to the world.', 'Credible. Timely. Authoritative.'],
    description:
      'PressWire Hub is the definitive platform for official press releases, corporate announcements, media advisories, and breaking news from organizations worldwide.',
    primaryCta: {
      label: 'View All Press Releases',
      href: '/release',
    },
    secondaryCta: {
      label: 'Submit a Release',
      href: '/contact',
    },
    searchPlaceholder: 'Search press releases',
    focusLabel: 'Latest Releases',
    featureCardBadge: 'Press Release',
    featureCardTitle: 'New releases surface on the front page first.',
    featureCardDescription:
      'The homepage is built for media professionals: lead release, wire stack, then a full archive grid for research.',
  },
  home: {
    metadata: {
      title: 'PressWire Hub — Official Press Releases & Media Announcements',
      description:
        'Official press releases, corporate announcements, media advisories, and breaking news from organizations worldwide.',
      openGraphTitle: 'PressWire Hub — Official Press Releases & Media Announcements',
      openGraphDescription:
        'Your authoritative source for official press releases and corporate media communications.',
      keywords: ['press release', 'media advisory', 'corporate announcement', 'news wire', 'PressWire Hub', 'media distribution'],
    },
    introBadge: 'Why PressWire Hub',
    introTitle: 'Built for media professionals and communications teams.',
    introParagraphs: [
      'We keep the front page focused: one lead release, a tight wire column, and a full archive for deeper research.',
      'Release pages stay reader-first—clean typography, no clutter—so the announcement stays in focus.',
      'If you need the full archive, the press desk lists every published release with quick category filters.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Official press releases with consistent, professional formatting.',
      'Archive routes that stay fast to scan on mobile and desktop.',
      'Search across all releases when you know what you are looking for.',
    ],
    primaryLink: {
      label: 'Browse Press Releases',
      href: '/release',
    },
    secondaryLink: {
      label: 'Contact',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Media Inquiries',
    title: 'Have a press release, media inquiry, or partnership note?',
    description:
      'Use the contact page for media and editorial inquiries. Our team reviews all submissions.',
    primaryCta: {
      label: 'Contact Us',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Search Releases',
      href: '/search',
    },
  },
  taskSectionHeading: 'Press Wire',
  taskSectionDescriptionSuffix: 'Latest official releases from the wire.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Long-form press coverage and feature articles.',
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
    description: 'Public profiles and organization pages.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Curated links and media resources.',
  },
  pdf: {
    title: 'Resources',
    description: 'PDFs, media kits, and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press Releases',
    description: 'Official press releases, media advisories, and corporate announcements.',
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
      'Long-form press coverage and feature articles for in-depth media reporting.',
    ],
    links: [{ label: 'Home', href: '/' }],
  },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and media galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Organization profiles and media contact pages.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated media resources and reference links.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Media kits, press packs, and downloadable documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and social activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and corporate entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press Releases',
    paragraphs: [
      'This is the official press release desk for PressWire Hub: corporate announcements, media advisories, and breaking news in a single scannable feed.',
      'Use categories to filter by industry or topic, or jump directly into a release when the headline is enough context.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
