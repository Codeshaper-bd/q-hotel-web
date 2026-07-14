<template>
  <div>
    <!--
      Site map: the whole site laid out as real, crawlable HTML links. This is
      the human counterpart to /sitemap.xml — every route the navigation and
      footer can reach, grouped the way a guest thinks about them, plus the
      home page's own sections so deep links are discoverable too.
    -->
    <section
      aria-labelledby="sitemap-title"
      class="relative isolate overflow-hidden bg-ink text-paper"
    >
      <!-- Cover: the suite-by-firelight photograph, full bleed behind the
           heading. The ink scrim and left-hand gradient keep the copy
           readable; `bg-ink` behind it keeps the band intact if the image
           ever fails to load. -->
      <div class="absolute inset-0 -z-10" aria-hidden="true">
        <BaseImage
          src="/images/sitemap/hero-cover.jpg"
          alt=""
          :width="1920"
          :height="616"
          sizes="xs:100vw xl:1920px"
          priority
        />
        <div class="absolute inset-0 bg-ink/45" />
      </div>

      <BaseContainer size="xl" class="pb-16 pt-[calc(var(--header-height)+4rem)] sm:pb-24 sm:pt-[calc(var(--header-height)+6rem)]">
        <FadeReveal>
          <div class="flex flex-col items-center text-center">
            <!-- Breadcrumb: Home → here -->
            <nav aria-label="Breadcrumb">
              <ol class="flex items-center gap-2.5 text-xs text-paper/70" role="list">
                <li>
                  <NuxtLink to="/" class="transition-colors duration-fast hover:text-champagne">
                    Home
                  </NuxtLink>
                </li>
                <li aria-hidden="true">
                  <svg class="h-3 w-3 text-paper/50" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </li>
                <li aria-current="page" class="text-paper">
                  Sitemap
                </li>
              </ol>
            </nav>

            <h1
              id="sitemap-title"
              class="mt-4 font-display text-4xl font-semibold sm:text-5xl"
            >
              Site Map
            </h1>
          </div>
        </FadeReveal>
      </BaseContainer>
    </section>

    <BaseSection tone="paper" spacing="lg" container-size="xl">
      <div class="grid gap-16 md:grid-cols-2">
        <FadeReveal
          v-for="(group, groupIndex) in siteMapGroups"
          :key="group.id"
          class="h-full"
        >
          <section :aria-labelledby="`sitemap-group-${group.id}`" class="flex h-full flex-col">
            <!-- Editorial index: the quiet numbering is what sells the page as
                 curated rather than generated -->
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-copper" aria-hidden="true">
              {{ String(groupIndex + 1).padStart(2, '0') }}
            </p>
            <h2
              :id="`sitemap-group-${group.id}`"
              class="mt-4 font-display text-3xl text-ink"
            >
              {{ group.title }}
            </h2>
            <p class="mt-3 max-w-md text-sm leading-7 text-muted">
              {{ group.summary }}
            </p>

            <!-- The LAST row keeps no bottom rule: each group ends open, so the
                 next group's index number never sits pressed under a hairline -->
            <ul class="mt-10 border-t border-line" role="list">
              <li
                v-for="link in group.links"
                :key="link.to"
                class="border-b border-line last:border-b-0"
              >
                <NuxtLink
                  :to="link.to"
                  class="sitemap-link flex items-center justify-between gap-6 py-5 text-ink transition-colors duration-fast ease-premium hover:text-copper"
                >
                  <span class="text-[0.9375rem]">{{ link.label }}</span>
                  <svg
                    class="sitemap-arrow h-3.5 w-3.5 shrink-0 text-line"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </NuxtLink>
              </li>
            </ul>
          </section>
        </FadeReveal>
      </div>

      <FadeReveal>
        <div class="mt-28 border-t border-line pt-20 text-center sm:mt-36 sm:pt-24">
          <h2 class="font-display text-3xl text-ink sm:text-4xl">
            Still looking for something?
          </h2>
          <p class="mx-auto mt-6 max-w-xl text-base leading-8 text-muted">
            Our team answers every enquiry personally — reservations, events,
            long stays, or anything the site does not cover.
          </p>
          <div class="mt-10 flex justify-center">
            <BaseArrowCta to="/contact" variant="gold">
              Contact Us
            </BaseArrowCta>
          </div>
        </div>
      </FadeReveal>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
/** One column of the site map: a theme, and the routes that sit under it */
interface SiteMapGroup {
  id: string
  title: string
  summary: string
  links: { label: string, to: string }[]
}

/**
 * Mirrors the real information architecture — the header navigation, the
 * footer's link columns, and the home page's own sections. Keep this in step
 * with those, or the site map starts describing a site that no longer exists.
 */
const siteMapGroups: SiteMapGroup[] = [
  {
    id: 'stay',
    title: 'Your Stay',
    summary: 'Rooms, suites, and the ways to make a stay longer.',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Rooms & Suites', to: '/#rooms' },
      { label: 'Offers & Packages', to: '/offers' },
      { label: 'Long Stay', to: '/long-stay' },
      { label: 'Gallery', to: '/gallery' },
    ],
  },
  {
    id: 'experiences',
    title: 'Experiences',
    summary: 'Dining, facilities, and the spaces we host you in.',
    links: [
      { label: 'Dining / Restaurant', to: '/dining' },
      { label: 'Services & Facilities', to: '/services' },
      { label: 'Meetings & Events', to: '/meetings-events' },
      { label: 'Blogs & Articles', to: '/blog' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    id: 'hotel',
    title: 'The Hotel',
    summary: 'Who we are, where we are, and what guests say.',
    links: [
      { label: 'About Us', to: '/#about' },
      { label: 'Facilities & Amenities', to: '/#facilities' },
      { label: 'Guest Reviews', to: '/#reviews' },
      { label: 'Our Location', to: '/#location' },
      { label: 'Experience Q Hotel', to: '/#experience' },
    ],
  },
  {
    id: 'support',
    title: 'Help & Support',
    summary: 'Reach us, and read the answers before you ask.',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Site Map', to: '/sitemap' },
    ],
  },
  {
    id: 'legal',
    title: 'Policies',
    summary: 'The terms your booking and your data are held to.',
    links: [
      { label: 'Hotel Policy', to: '/hotel-policy' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms' },
    ],
  },
  {
    id: 'booking',
    title: 'Book Direct',
    summary: 'The shortest route from browsing to a confirmed room.',
    links: [
      { label: 'Check Availability', to: '/#hero' },
      { label: 'Reserve Now', to: '/#reserve' },
      { label: 'Meetings & Events Enquiry', to: '/meetings-events' },
    ],
  },
]

useSeoMetaData({
  title: 'Site Map',
  description: 'Every page of Q Hotel Dhaka in one place — rooms and suites, dining, offers, meetings and events, facilities, policies, and support.',
  path: '/sitemap',
})
</script>

<style scoped>
/* The arrow leans out along its own diagonal on hover — the link itself is
   what carries the colour change, so the motion stays a whisper */
.sitemap-arrow {
  transition:
    transform var(--duration-fast) var(--ease-premium),
    color var(--duration-fast) var(--ease-premium);
}

.sitemap-link:hover .sitemap-arrow,
.sitemap-link:focus-visible .sitemap-arrow {
  color: rgb(var(--color-copper));
  transform: translate(0.15rem, -0.15rem);
}
</style>
