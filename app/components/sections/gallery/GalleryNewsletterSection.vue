<template>
  <!-- Stay Connected: newsletter/social CTA band closing the gallery page —
       tagline + heading + photo strip on a cream surface, a sand social-links
       bar, and three feature blurbs. -->
  <BaseSection id="gallery-connect" labelled-by="gallery-connect-title" tone="paper" spacing="lg" container-size="xl" class="!pt-[70px]">
    <FadeReveal>
      <div class="bg-cream p-8 sm:p-12">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div class="flex flex-col">
            <div class="flex items-center gap-5">
              <span class="flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-full bg-champagne text-copper" aria-hidden="true">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <p class="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Stay Connected</p>
            </div>

            <h2 id="gallery-connect-title" class="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Stay up to date with Q Hotel Dhaka
            </h2>
            <hr class="mt-6 w-[3.75rem] border-t-2 border-gold">
            <p class="mt-6 max-w-md text-base leading-6 text-ink/70">
              Follow us on social media and be the first to know about exclusive offers, special events, and memorable moments at Q Hotel Dhaka.
            </p>

            <div class="mt-10 grid grid-cols-3 gap-4 pt-4 sm:mt-auto">
              <div v-for="blurb in blurbs" :key="blurb.title" class="flex flex-col items-center gap-2 text-center">
                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-sand text-copper" aria-hidden="true">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path v-for="(iconPath, index) in blurb.iconPaths" :key="index" :d="iconPath" />
                  </svg>
                </span>
                <p class="text-sm font-medium text-ink">{{ blurb.title }}</p>
                <p class="text-xs leading-4 text-ink/60">{{ blurb.subtitle }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-8 lg:border-l lg:border-gold/30 lg:pl-16">
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <div v-for="photo in stripPhotos" :key="photo.src" class="relative aspect-[238/330] overflow-hidden bg-line/40">
                <BaseImage
                  :src="photo.src"
                  :alt="photo.alt"
                  :width="238"
                  :height="330"
                  sizes="xs:50vw sm:25vw lg:12vw"
                  class="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div class="flex flex-col items-start justify-between gap-6 bg-sand p-6 sm:flex-row sm:items-center">
              <div>
                <p class="text-xs font-medium uppercase tracking-[0.14em] text-ink/60">Follow us on</p>
                <p class="mt-1 font-display text-2xl font-semibold text-ink">Social Media</p>
              </div>

              <ul class="flex items-center gap-2.5" aria-label="Q Hotel on social media">
                <li v-for="social in socialLinks" :key="social.label">
                  <a
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex h-[3.75rem] w-[3.75rem] items-center justify-center bg-cream text-ink transition-colors duration-fast hover:text-copper"
                    :aria-label="`Q Hotel on ${social.label}`"
                  >
                    <svg class="h-6 w-6" viewBox="0 0 24 24" :fill="social.fill ? 'currentColor' : 'none'" :stroke="social.fill ? 'none' : 'currentColor'" stroke-width="1.6" aria-hidden="true">
                      <path v-for="(iconPath, index) in social.iconPaths" :key="index" :d="iconPath" />
                      <template v-if="social.label === 'Instagram'">
                        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                        <circle cx="12" cy="12" r="3.8" />
                        <circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
                      </template>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FadeReveal>
  </BaseSection>
</template>

<script setup lang="ts">
const stripPhotos = [
  { src: '/images/gallery/feature-07.jpg', alt: 'Lobby lounge seating at Q Hotel Dhaka' },
  { src: '/images/gallery/feature-08.jpg', alt: 'Private dining room at Q Hotel Dhaka' },
  { src: '/images/gallery/newsletter-01.jpg', alt: 'Fine dining hall at Q Hotel Dhaka' },
  { src: '/images/gallery/newsletter-02.jpg', alt: 'Courtyard pool at Q Hotel Dhaka' },
]

interface FeatureBlurb {
  title: string
  subtitle: string
  iconPaths: string[]
}

const blurbs: FeatureBlurb[] = [
  {
    title: 'Exclusive Offers',
    subtitle: 'Special deals & packages',
    iconPaths: ['M4 12l1.6-6.4A2 2 0 017.5 4h9a2 2 0 011.9 1.6L20 12M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M4 12h16', 'M9 16h6'],
  },
  {
    title: 'Events & Update',
    subtitle: 'What’s happening',
    iconPaths: ['M8 3v3M16 3v3M4 9h16M5 6h14a1 1 0 011 1v11a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z'],
  },
  {
    title: 'Memorable Moments',
    subtitle: 'Captured at Q Hotel',
    iconPaths: ['M4 8a2 2 0 012-2h2l1.5-2h5L16 6h2a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z', 'M12 17a4 4 0 100-8 4 4 0 000 8z'],
  },
]

interface SocialLink {
  label: string
  href: string
  fill?: boolean
  iconPaths: string[]
}

const socialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    fill: true,
    iconPaths: ['M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.13-2.41-.13-2.39 0-4.03 1.46-4.03 4.14v2.31H7.5V13h2.76v8h3.24z'],
  },
  { label: 'Instagram', href: 'https://instagram.com', iconPaths: [] },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    fill: true,
    iconPaths: ['M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.3h3.1V19H3.4V8.3zm5.3 0h2.97v1.47h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V19h-3.1v-4.76c0-1.14-.02-2.6-1.58-2.6-1.58 0-1.83 1.24-1.83 2.52V19H8.7V8.3z'],
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    fill: true,
    iconPaths: ['M21.6 7.9s-.19-1.36-.78-1.96c-.75-.79-1.58-.79-1.96-.83C16.14 4.9 12 4.9 12 4.9h-.01s-4.13 0-6.85.21c-.38.04-1.21.04-1.96.83-.59.6-.78 1.96-.78 1.96s-.2 1.6-.2 3.2v1.5c0 1.6.2 3.2.2 3.2s.19 1.36.78 1.96c.75.79 1.74.76 2.18.85 1.58.15 6.64.2 6.64.2s4.14-.01 6.86-.21c.38-.05 1.21-.05 1.96-.84.59-.6.78-1.96.78-1.96s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2zM9.9 14.6V9.3l5.3 2.66-5.3 2.64z'],
  },
]
</script>
