export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Updates',
    route: '/release',
    description: 'Recent posts and newsroom updates.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/release',
} as const
