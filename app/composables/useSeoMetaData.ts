type SeoMetaData = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

export const useSeoMetaData = (meta: SeoMetaData) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')
  const canonical = `${siteUrl}${meta.path || '/'}`
  const fullTitle = `${meta.title} | ${config.public.siteName}`

  useSeoMeta({
    title: fullTitle,
    description: meta.description,
    ogTitle: fullTitle,
    ogDescription: meta.description,
    ogType: meta.type || 'website',
    ogUrl: canonical,
    ogSiteName: config.public.siteName,
    ogImage: meta.image,
    twitterCard: meta.image ? 'summary_large_image' : 'summary',
    twitterTitle: fullTitle,
    twitterDescription: meta.description,
    twitterImage: meta.image
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonical
      }
    ]
  })
}
