<template>
  <div>
    <SitemapHeroBanner />

    <BaseSection tone="paper" spacing="lg" container-size="xl">
      <div class="flex flex-col gap-16">
        <SitemapLinkGroup title="Main Pages" :links="mainPages" />
        <SitemapLinkGroup title="Help & Support" :links="helpAndSupport" />
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
/**
 * Mirrors the real information architecture — the header navigation, the
 * footer's link columns, and the home page's own sections. Keep this in step
 * with those, or the site map starts describing a site that no longer exists.
 * Pages not yet built use the same forward-looking route the footer already
 * declares for them; in-page sections link to their real anchor.
 */
const mainPages = [
  { label: 'Home Page / Overview', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Accommodations / Room & Suites', to: '/rooms' },
  { label: 'Room Details', to: '/rooms' },
  { label: 'Offer & Packages', to: '/offers' },
  { label: 'Facilities / Services / Amenities', to: '/#facilities' },
  { label: 'Meetings & Events', to: '/meetings-events' },
  { label: 'Event Details', to: '/meetings-events' },
  { label: 'Dining / Restaurant', to: '/dining' },
  { label: 'Long Stay', to: '/long-stay' },
  { label: 'Gallery Preview', to: '/gallery' },
  { label: 'Nearby Attractions', to: '/#location' },
  { label: 'Blogs & Articles', to: '/blog' },
  { label: 'Blog Details', to: '/blog' },
]

const helpAndSupport = [
  { label: 'Contact Us', to: '/contact' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Hotel Policy', to: '/hotel-policy' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
]

useSeoMetaData({
  title: 'Site Map',
  description: 'Every page of Q Hotel Dhaka in one place — rooms and suites, dining, offers, meetings and events, facilities, policies, and support.',
  path: '/sitemap',
})
</script>
