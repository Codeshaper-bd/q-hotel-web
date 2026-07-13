<template>
  <!--
    Explore / Location: a dark band pairing the hotel's map with the landmarks
    around it. The map itself is not embedded yet — its frame is reserved at a
    fixed size so dropping the embed in later cannot shift the layout (and cannot
    cost us CLS). The attraction copy is real server-rendered HTML, never map-only,
    so the neighbourhood is still readable to search engines and screen readers.
  -->
  <BaseSection id="location" labelled-by="location-title" tone="ink" spacing="lg" container-size="xl">
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker tone="ink">Our Location</BaseKicker>
        <h2 id="location-title" class="mt-6 font-display text-4xl text-paper sm:text-5xl">
          Explore Q Hotel Dhaka
        </h2>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div class="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
        <!--
          RESERVED FOR THE MAP EMBED. Deliberately empty for now: the frame holds
          its dimensions so the interactive map (or a static map image) can be
          dropped straight in without moving anything around it.
        -->
        <div
          class="surface-grain min-h-[20rem] bg-paper/10 sm:min-h-[26rem] lg:min-h-[32rem]"
          aria-hidden="true"
        />

        <div class="grid gap-6 sm:grid-cols-2">
          <!-- Same panel surface as the facility tiles and review cards: the
               shared grain wash over the `bg-paper/10` tint -->
          <article
            v-for="attraction in nearbyAttractions"
            :key="attraction.id"
            class="surface-grain flex flex-col bg-paper/10 p-6"
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
          </article>
        </div>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div class="mt-12 flex justify-center">
        <!-- The attractions page arrives with the rest of the content routes;
             the CTA hands off to the reserve entry point until then -->
        <BaseArrowCta to="#reserve" variant="gold">
          Near By Attraction
        </BaseArrowCta>
      </div>
    </FadeReveal>
  </BaseSection>
</template>

<script setup lang="ts">
import type { NearbyAttraction } from '~/types/location'

/** Static showcase content (CMS-ready shape); distances are straight-line */
const nearbyAttractions: NearbyAttraction[] = [
  {
    id: 'army-golf-club',
    name: 'Army Golf Club',
    description: 'A premier nine-hole course spanning fifty-eight scenic acres, with a swimming pool and the well-loved Palm View Restaurant — conveniently close to the airport.',
    distanceMiles: 0.51,
    distanceKm: 0.82,
  },
  {
    id: 'jamuna-future-park',
    name: 'Jamuna Future Park',
    description: 'One of South Asia\'s largest shopping malls: hundreds of retailers, a cinema, and a food court, all a short drive from the hotel lobby.',
    distanceMiles: 1.5,
    distanceKm: 2.0,
  },
  {
    id: 'lalbagh-fort',
    name: 'Lalbagh Fort',
    description: 'The beautiful remnants of an unfinished Mughal fort. The grounds still hold gardens, fortifications, a mosque, and a mausoleum, with excavation ongoing.',
    distanceMiles: 6.2,
    distanceKm: 9.98,
  },
  {
    id: 'ramna-park',
    name: 'Ramna Park',
    description: 'Dhaka\'s favourite green retreat — a serene lake, mature trees, and long walking paths, ideal for an unhurried morning away from the traffic.',
    distanceMiles: 5.44,
    distanceKm: 8.75,
  },
]

function formatDistance(attraction: NearbyAttraction) {
  return `${attraction.distanceMiles} mi / ${attraction.distanceKm} km from the hotel`
}
</script>
