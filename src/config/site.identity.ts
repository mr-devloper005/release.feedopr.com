export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 't25xaz0chp',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Release Feedopr',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Independent media updates',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A media-distribution newsroom for announcements, coverage, and press updates on Release Feedopr.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'release.feedopr.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://release.feedopr.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
