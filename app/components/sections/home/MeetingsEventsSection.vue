<template>
  <!--
    Meetings & Events: venue cards with a photograph beside capacity and
    venue-size facts, framed by a fine gold rule as in the Figma design. On
    large screens the cards stack softly (position: sticky) while scrolling;
    small screens and reduced-motion keep a plain readable flow.
  -->
  <BaseSection id="meetings-events" labelled-by="meetings-events-title" tone="paper" spacing="lg" container-size="xl">
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Host With Us</BaseKicker>
        <h2 id="meetings-events-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Meetings &amp; Events
        </h2>
      </div>
    </FadeReveal>

    <div class="mt-12 space-y-8 lg:mt-16">
      <FadeReveal
        v-for="venue in venues"
        :key="venue.id"
      >
        <article
          class="venue-card grid gap-8 border border-gold/50 bg-paper p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10"
        >
          <div class="relative aspect-[3/2] overflow-hidden bg-line/40">
            <BaseImage
              :src="venue.image.src"
              :alt="venue.image.alt"
              :width="1596"
              :height="1012"
              sizes="xs:100vw sm:100vw lg:50vw xl:800px"
              class="absolute inset-0"
            />
          </div>

          <div class="flex flex-col">
            <h3 class="font-display text-3xl text-ink sm:text-4xl">
              {{ venue.name }}
            </h3>

            <p class="mt-4 text-sm leading-7 text-muted sm:text-base">
              {{ venue.description }}
            </p>

            <div class="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 class="font-display text-xl text-ink">Capacity:</h4>
                <ul class="mt-4 space-y-2.5 text-sm text-ink/80">
                  <li
                    v-for="capacity in venue.capacities"
                    :key="capacity.layout"
                    class="flex items-center gap-2.5"
                  >
                    <svg class="h-4 w-4 shrink-0 text-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5h15v15h-15z M8 12.5l2.5 2.5L16 9.5" />
                    </svg>
                    {{ capacity.layout }}: {{ capacity.guests }} Guests
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="font-display text-xl text-ink">Venue Size:</h4>
                <ul class="mt-4 space-y-2.5 text-sm text-ink/80">
                  <li class="flex items-center gap-2.5">
                    <svg class="h-4 w-4 shrink-0 text-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5h15v15h-15z M8 12.5l2.5 2.5L16 9.5" />
                    </svg>
                    Area: {{ venue.areaLabel }}
                  </li>
                  <li class="flex items-center gap-2.5">
                    <svg class="h-4 w-4 shrink-0 text-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5h15v15h-15z M8 12.5l2.5 2.5L16 9.5" />
                    </svg>
                    Dimensions: {{ venue.dimensionsLabel }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap gap-4 lg:mt-auto lg:pt-8">
              <BaseButton href="#reserve" variant="gold">
                Book Space
                <svg class="ml-2.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
                </svg>
              </BaseButton>
              <BaseButton href="#reserve" variant="ghost">
                View Details
                <svg class="ml-2.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
                </svg>
              </BaseButton>
            </div>
          </div>
        </article>
      </FadeReveal>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { MeetingVenue } from '~/types/venue'

/** Static showcase content (CMS-ready shape); venue detail pages come later */
const venues: MeetingVenue[] = [
  {
    id: 'business-class-lounge',
    name: 'Business Class Lounge',
    description: 'Adjacent to the Business Class lounge, this private space on the eighth floor accommodates intimate gatherings and full receptions alike. High-speed Wi-Fi and secretarial facilities are available on request.',
    image: { src: '/images/meetings/business-class-lounge.jpg', alt: 'Business Class Lounge with warm armchairs arranged around a round table under a coved ceiling' },
    capacities: [
      { layout: 'Theater', guests: 400 },
      { layout: 'Classroom', guests: 170 },
      { layout: 'U-Shape', guests: 120 },
      { layout: 'Reception', guests: 500 },
      { layout: 'Banquet', guests: 200 },
    ],
    areaLabel: '5,721 sq. ft.',
    dimensionsLabel: '99.6 ft × 57.6 ft × 22 ft',
  },
  {
    id: 'grand-ballroom',
    name: 'Grand Ballroom',
    description: 'Our largest pillar-free venue, suited to weddings, galas, and conferences. Dedicated pre-function space, staging, and in-house catering let one team carry an event from arrival to last dance.',
    image: { src: '/images/meetings/business-class-lounge.jpg', alt: 'Grand Ballroom seating arranged banquet-style beneath warm cove lighting' },
    capacities: [
      { layout: 'Theater', guests: 650 },
      { layout: 'Classroom', guests: 300 },
      { layout: 'U-Shape', guests: 160 },
      { layout: 'Reception', guests: 800 },
      { layout: 'Banquet', guests: 400 },
    ],
    areaLabel: '8,940 sq. ft.',
    dimensionsLabel: '124 ft × 72 ft × 24 ft',
  },
  {
    id: 'executive-boardroom',
    name: 'Executive Boardroom',
    description: 'A quiet, fixed-table boardroom for leadership meetings and private negotiations — video conferencing, writable walls, and butler service within arm’s reach.',
    image: { src: '/images/meetings/business-class-lounge.jpg', alt: 'Executive Boardroom with a fixed conference table and upholstered chairs' },
    capacities: [
      { layout: 'Boardroom', guests: 18 },
      { layout: 'U-Shape', guests: 14 },
      { layout: 'Theater', guests: 30 },
      { layout: 'Classroom', guests: 20 },
      { layout: 'Reception', guests: 40 },
    ],
    areaLabel: '780 sq. ft.',
    dimensionsLabel: '36 ft × 22 ft × 12 ft',
  },
]
</script>

<style scoped>
/* Soft sticky stacking on large screens: each card rests just under the
   fixed header and the next card slides over it. Position-driven (no
   animation), so it degrades gracefully for keyboard and reduced motion. */
@media (min-width: 1024px) {
  .venue-card {
    position: sticky;
    top: calc(var(--header-height) + 2rem);
  }
}
</style>
