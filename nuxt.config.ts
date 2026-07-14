export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/fonts'],
  fonts: {
    families: [
      // Display serif for headlines, nav, and brand moments
      { name: 'Cormorant Garamond', provider: 'google', weights: [400, 500, 600, 700] },
      // Body/UI sans — Satoshi ships from Fontshare, not Google
      { name: 'Satoshi', provider: 'fontshare', weights: [400, 500, 700, 900] },
      // Booking-bar field labels per Figma spec
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] }
    ]
  },
  css: ['~/assets/css/main.css'],
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0d1117' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  image: {
    format: ['avif', 'webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },
  routeRules: {
    '/': { prerender: true }
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
      siteName: 'Q Hotel'
    }
  }
})
