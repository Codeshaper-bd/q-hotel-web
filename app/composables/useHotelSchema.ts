/**
 * Injects JSON-LD structured data for Q Hotel.
 * Call once per page — pass page-specific overrides as needed.
 * Replace placeholder values with real hotel data before launch.
 *
 * Schema types used:
 *  - LodgingBusiness  → hotel entity (AEO: answers "what is Q Hotel?")
 *  - WebSite          → enables Google Sitelinks Searchbox
 *  - BreadcrumbList   → optional, pass `breadcrumbs` for inner pages
 */

type BreadcrumbItem = {
  name: string
  url: string
}

type HotelSchemaOptions = {
  breadcrumbs?: BreadcrumbItem[]
}

export const useHotelSchema = (options: HotelSchemaOptions = {}) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')
  const siteName = config.public.siteName

  const lodgingBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${siteUrl}/#hotel`,
    name: siteName,
    description: 'A boutique hotel offering measured luxury, thoughtful design, and a calm, considered stay experience.',
    url: siteUrl,
    // TODO: replace with real values before launch
    telephone: '+1-000-000-0000',
    email: 'info@qhotel.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Hotel Street',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '00000',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0.0,   // TODO: real coordinates
      longitude: 0.0
    },
    image: `${siteUrl}/og-image.jpg`,  // TODO: real OG/hero image
    priceRange: '$$$$',
    checkinTime: '15:00',
    checkoutTime: '11:00',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Room Service', value: true }
    ],
    sameAs: [
      // TODO: add social profile URLs
      // 'https://www.instagram.com/qhotel',
      // 'https://www.facebook.com/qhotel'
    ]
  }

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    publisher: { '@id': `${siteUrl}/#hotel` }
  }

  const schemas: object[] = [lodgingBusiness, webSite]

  if (options.breadcrumbs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: options.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
      }))
    })
  }

  useHead({
    script: schemas.map(schema => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema)
    }))
  })
}
