export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  components: [
    // backup-home holds a pre-redesign snapshot of the home sections, kept
    // for reference only. Excluded so its files never shadow the live
    // same-named components under sections/home during auto-import.
    { path: '~/components', pathPrefix: false, ignore: ['**/sections/backup-home/**'] }
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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap' },
        { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap' }
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
    strict: true
    // Type-checking runs separately via `pnpm typecheck`. Running it again
    // inside `nuxt build` (typeCheck: true) reads the auto-generated
    // `#imports` declarations, which broke on Vercel when a restored build
    // cache served stale types for newly added composables/utils.
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
      siteName: 'Q Hotel'
    }
  }
})
