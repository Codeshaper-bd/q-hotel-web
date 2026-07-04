<template>
  <!--
    Facilities & Amenities: a dark, staggered grid of amenity tiles over a
    faint architectural skyline, mirroring the Figma layout (row one starts at
    the left edge, row two shifts one column right, the closing tile and the
    supporting copy share the final row on large screens).
  -->
  <BaseSection id="facilities" labelled-by="facilities-title" tone="ink" spacing="lg" container-size="xl">
    <div class="relative">
      <!-- Faint skyline line-art anchored to the bottom-left — texture, not content -->
      <img
        src="/images/facilities-skyline.svg"
        alt=""
        width="916"
        height="508"
        loading="lazy"
        class="pointer-events-none absolute -bottom-24 -left-8 hidden w-[36rem] opacity-40 sm:-bottom-32 lg:block"
        aria-hidden="true"
      >

      <FadeReveal>
        <div class="flex flex-col items-center text-center">
          <BaseKicker tone="ink">What We Offer</BaseKicker>
          <h2 id="facilities-title" class="mt-6 font-display text-4xl text-paper sm:text-5xl">
            Facilities &amp; Amenities
          </h2>
        </div>
      </FadeReveal>

      <FadeReveal>
        <div class="relative mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6 lg:gap-5">
          <div
            v-for="amenity in amenities"
            :key="amenity.id"
            :class="['flex aspect-square flex-col items-center justify-center gap-4 bg-paper/[0.08] px-4 text-center', amenity.gridClass]"
          >
            <svg
              class="h-8 w-8 text-paper/90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path v-for="(iconPath, index) in amenity.iconPaths" :key="index" :d="iconPath" />
            </svg>
            <span class="font-display text-lg text-paper sm:text-xl">{{ amenity.label }}</span>
          </div>

          <!-- Supporting copy + CTA share the final grid row on large screens -->
          <div class="col-span-2 mt-4 flex flex-col items-start justify-center gap-6 sm:col-span-3 lg:col-span-2 lg:col-start-3 lg:row-start-3 lg:mt-0 lg:px-2">
            <p class="font-display text-lg leading-8 text-paper/80 sm:text-xl">
              From airport pickup to late-night dining, every facility is
              designed to make your stay effortless — quiet comfort, warm
              service, and real measured care.
            </p>
            <BaseButton href="#reserve" variant="gold">
              View All Facilities
              <svg class="ml-2.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
            </BaseButton>
          </div>
        </div>
      </FadeReveal>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
/** Amenity tile: label, restrained line-icon paths, optional grid placement */
interface FacilityAmenity {
  id: string
  label: string
  iconPaths: string[]
  /** Explicit placement for the staggered large-screen grid */
  gridClass?: string
}

const amenities: FacilityAmenity[] = [
  {
    id: 'airport-shuttle',
    label: 'Airport Shuttle',
    iconPaths: [
      'M4 5.5h16a1 1 0 011 1V16a1 1 0 01-1 1H4a1 1 0 01-1-1V6.5a1 1 0 011-1z',
      'M3 11.5h18',
      'M7.5 17v1.5M16.5 17v1.5',
      'M8 8.5h.01M12 8.5h.01M16 8.5h.01',
    ],
  },
  {
    id: 'vehicle-parking',
    label: 'Free Vehicle Parking',
    iconPaths: [
      'M4.5 4.5h15v15h-15z',
      'M10 16.5V8h2.75a2.25 2.25 0 010 4.5H10',
    ],
  },
  {
    id: 'two-restaurants',
    label: 'Two Restaurants',
    iconPaths: [
      'M7 3.5v5.5M10 3.5v5.5M7 9a1.5 1.5 0 003 0M8.5 10.5V20.5',
      'M16.5 3.5c-1.8 2.6-1.8 6.4 0 9v8',
    ],
  },
  {
    id: 'swimming-pool',
    label: 'Swimming Pool',
    iconPaths: [
      'M3 17.5c1.5 1.1 3.5 1.1 5 0s3.5-1.1 5 0 3.5 1.1 5 0 2.2-1 3-.6',
      'M13.5 4.5v9.5M18.5 4.5v9.5M13.5 7.5h5M13.5 11h5',
    ],
  },
  {
    id: 'fitness-spa',
    label: 'Fitness & Spa',
    iconPaths: [
      'M6.5 9v6M4 10.5v3M17.5 9v6M20 10.5v3M6.5 12h11',
    ],
  },
  {
    id: 'breakfast',
    label: 'Breakfast',
    gridClass: 'lg:col-start-2',
    iconPaths: [
      'M4 17.5h16M5 17.5a7 7 0 0114 0',
      'M12 10.5V9M12 9a1 1 0 100-2 1 1 0 000 2z',
    ],
  },
  {
    id: 'free-wifi',
    label: 'Free WIFI',
    iconPaths: [
      'M4 10a12 12 0 0116 0M7 13.2a8 8 0 0110 0M9.8 16.4a4 4 0 014.4 0',
      'M12 19.5h.01',
    ],
  },
  {
    id: 'tea-coffee',
    label: 'Tea/Coffee Maker',
    iconPaths: [
      'M5 10h11v5.5a4 4 0 01-4 4H9a4 4 0 01-4-4V10z',
      'M16 11h1.5a2.25 2.25 0 010 4.5H16',
      'M9 7c0-1.2 1-1.3 1-2.5M13 7c0-1.2 1-1.3 1-2.5',
    ],
  },
  {
    id: 'cctv-security',
    label: 'CCTV Security',
    iconPaths: [
      'M3.5 9l11.5-3.5 1.3 4.3-11.5 3.5z',
      'M6.5 13.5l.9 3.5h4.5',
      'M19.5 8.5l2-1v5l-2-1',
    ],
  },
  {
    id: 'bbq-bar',
    label: 'BBQ & Bar',
    iconPaths: [
      'M5 8.5h14a7 7 0 01-14 0z',
      'M12 15.5V19M8.5 21.5h7',
      'M9 3.5v1.5M12 3v1.5M15 3.5v1.5',
    ],
  },
  {
    id: 'smoke-free',
    label: 'Smoke-Free Hotel',
    gridClass: 'lg:col-start-5 lg:row-start-3',
    iconPaths: [
      'M4 14.5h12v3H4zM18.5 14.5v3M21 14.5v3',
      'M17 11c0-1.5-1.2-2-2.5-2M18 7.5c2 .3 3 1.6 3 3.5',
      'M3.5 3.5l17 17',
    ],
  },
]
</script>
