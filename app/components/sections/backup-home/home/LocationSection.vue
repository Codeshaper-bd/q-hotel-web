<template>
  <!--
    Explore / Location: a dark band pairing the hotel's interactive map with the
    landmarks around it. Each attraction card can drive the map (framing itself
    against the hotel), while the card copy stays real server-rendered HTML —
    never map-only — so the neighbourhood remains readable to search engines,
    screen readers, and anyone the map fails to load for.
  -->
  <section
    id="location"
    aria-labelledby="location-title"
    class="relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32"
  >
    <!-- The map IS the section's backdrop, bled to the full width. It sits
         behind the copy, and the copy passes pointer events through to it, so
         the open left half stays a real, draggable map. -->
    <LocationMap
      class="absolute inset-0 -z-10"
      :hotel="hotel"
      :attractions="nearbyAttractions"
      :active-attraction-id="activeAttractionId"
    />

    <BaseContainer size="xl" class="pointer-events-none">
      <FadeReveal>
        <div class="pointer-events-auto flex flex-col items-center text-center">
          <BaseKicker tone="ink">Our Location</BaseKicker>
          <h2 id="location-title" class="mt-6 font-display text-4xl text-paper sm:text-5xl">
            Explore Q Hotel Dhaka
          </h2>
        </div>
      </FadeReveal>

      <FadeReveal>
        <div class="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
          <!-- Left column is deliberately empty: it is the window onto the map,
               and it must not swallow the pointer events the map needs -->
          <div class="hidden lg:block" aria-hidden="true" />

          <div class="pointer-events-auto grid gap-6 sm:grid-cols-2">
            <!-- Same panel surface as the facility tiles and review cards, but
                 these now stand ON the map: the ink base and blur are what keep
                 the copy readable over live tiles -->
            <article
              v-for="attraction in nearbyAttractions"
              :key="attraction.id"
              :class="[
                'surface-grain flex flex-col bg-ink/70 p-6 backdrop-blur-sm transition-shadow duration-normal ease-premium',
                activeAttractionId === attraction.id ? 'shadow-[inset_0_0_0_1px_rgb(var(--color-champagne))]' : '',
              ]"
            >
            <h3 class="font-display text-xl text-paper">
              {{ attraction.name }}
            </h3>

            <p class="mt-3 text-sm leading-6 text-paper/65">
              {{ attraction.description }}
            </p>

            <p class="mt-auto flex items-center gap-2.5 pt-5 text-xs text-champagne">
              <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {{ formatDistance(attraction) }}
            </p>

            <!-- Drives the map beside it; a real button, so it is reachable by
                 keyboard and announces its pressed state -->
            <p class="mt-4">
              <button
                type="button"
                :aria-pressed="activeAttractionId === attraction.id"
                class="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper/60 underline-offset-4 transition-colors duration-fast hover:text-champagne hover:underline"
                @click="toggleAttraction(attraction.id)"
              >
                {{ activeAttractionId === attraction.id ? 'Back to the hotel' : 'Show on map' }}
              </button>
            </p>
          </article>
        </div>
      </div>
    </FadeReveal>

      <FadeReveal>
        <div class="pointer-events-auto mt-12 flex justify-center">
          <!-- The attractions page arrives with the rest of the content routes;
               the CTA hands off to the reserve entry point until then -->
          <BaseArrowCta to="#reserve" variant="gold">
            Near By Attraction
          </BaseArrowCta>
        </div>
      </FadeReveal>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { HotelLocation, NearbyAttraction } from '~/types/location'

const hotel: HotelLocation = {
  name: 'Q Hotel Dhaka',
  address: 'Uttara, Dhaka, Bangladesh',
  coordinates: [23.8377208, 90.4572272],
  directionsUrl: 'https://maps.app.goo.gl/KAggvEKj6dWVGrQE9',
}

/**
 * Static showcase content (CMS-ready shape). Coordinates are the landmarks'
 * real positions and the distances are the straight-line distances computed
 * from them — the map and the copy have to agree, or one of them is lying.
 */
const nearbyAttractions: NearbyAttraction[] = [
  {
    id: 'army-golf-club',
    name: 'Army Golf Club',
    description: 'A premier nine-hole course spanning fifty-eight scenic acres, with a swimming pool and the well-loved Palm View Restaurant — conveniently close to the airport.',
    distanceMiles: 3.05,
    distanceKm: 4.91,
    coordinates: [23.8199143, 90.4130827],
  },
  {
    id: 'jamuna-future-park',
    name: 'Jamuna Future Park',
    description: 'One of South Asia\'s largest shopping malls: hundreds of retailers, a cinema, and a food court, all a short drive from the hotel lobby.',
    distanceMiles: 2.68,
    distanceKm: 4.31,
    coordinates: [23.8134982, 90.4240893],
  },
  {
    id: 'lalbagh-fort',
    name: 'Lalbagh Fort',
    description: 'The beautiful remnants of an unfinished Mughal fort. The grounds still hold gardens, fortifications, a mosque, and a mausoleum, with excavation ongoing.',
    distanceMiles: 9.30,
    distanceKm: 14.97,
    coordinates: [23.7188430, 90.3881528],
  },
  {
    id: 'ramna-park',
    name: 'Ramna Park',
    description: 'Dhaka\'s favourite green retreat — a serene lake, mature trees, and long walking paths, ideal for an unhurried morning away from the traffic.',
    distanceMiles: 7.66,
    distanceKm: 12.33,
    coordinates: [23.7402535, 90.3995197],
  },
]

/** null centres the hotel; an id frames that landmark against the hotel */
const activeAttractionId = ref<string | null>(null)

function toggleAttraction(id: string) {
  activeAttractionId.value = activeAttractionId.value === id ? null : id
}

function formatDistance(attraction: NearbyAttraction) {
  return `${attraction.distanceMiles} mi / ${attraction.distanceKm} km from the hotel`
}
</script>
