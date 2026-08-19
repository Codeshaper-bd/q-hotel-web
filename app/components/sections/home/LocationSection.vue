<script setup lang="ts">
const {
  hotel,
  attractions: nearbyAttractions,
  formatDistance,
} = useNearbyAttractions();

/** null centres the hotel; an id frames that landmark against the hotel */
const activeAttractionId = ref<string | null>(null);

/** The home section spotlights the first four landmarks; the full
 *  neighbourhood guide lives on /nearby-locations */
const featuredAttractions = computed(() => nearbyAttractions.slice(0, 4));

function toggleAttraction(id: string) {
  activeAttractionId.value = activeAttractionId.value === id ? null : id;
}
</script>

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
          <h2
            id="location-title"
            class="mt-6 font-display text-4xl text-paper sm:text-5xl"
          >
            Explore Q Hotel Dhaka
          </h2>
        </div>
      </FadeReveal>

      <FadeReveal :stagger="0.07">
        <div class="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
          <!-- Left column is deliberately empty: it is the window onto the map,
               and it must not swallow the pointer events the map needs -->
          <div class="hidden lg:block" aria-hidden="true" />

          <div class="pointer-events-auto grid gap-6 sm:grid-cols-2">
            <!-- Same panel surface as the facility tiles and review cards, but
                 these now stand ON the map: the ink base and blur are what keep
                 the copy readable over live tiles -->
            <article
              v-for="attraction in featuredAttractions"
              :key="attraction.id"
              data-reveal-item
              :class="[
                'surface-grain flex flex-col bg-ink/70 p-6 backdrop-blur-sm transition-shadow duration-normal ease-premium',
                activeAttractionId === attraction.id
                  ? 'shadow-[inset_0_0_0_1px_rgb(var(--color-champagne))]'
                  : '',
              ]"
            >
              <h3
                class="font-display text-xl text-paper lg:text-[28px] font-semibold"
              >
                {{ attraction.name }}
              </h3>

              <p class="mt-4 text-base font-normal leading-6 text-paper/70">
                {{ attraction.description }}
              </p>

              <p
                class="mt-auto flex items-center gap-2.5 pt-5 text-sm text-[#DFA558]"
              >
                <svg
                  class="h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"
                  />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {{ formatDistance(attraction) }}
              </p>

              <!-- Drives the map beside it; a real button, so it is reachable by
                 keyboard and announces its pressed state -->
              <!-- <p class="mt-4">
                <button
                  type="button"
                  :aria-pressed="activeAttractionId === attraction.id"
                  class="text-[0.65rem] font-semibold uppercase text-[#0F0F10] bg-[#E9C588] hover:bg-[#DFA558] px-2 py-0.5 transition-colors duration-fast"
                  @click="toggleAttraction(attraction.id)"
                >
                  {{
                    activeAttractionId === attraction.id
                      ? "Back to the hotel"
                      : "Show on map"
                  }}
                </button>
              </p> -->
            </article>
          </div>
        </div>
      </FadeReveal>

      <FadeReveal>
        <div class="pointer-events-auto mt-12 flex justify-center">
          <!-- The attractions page holds the full neighbourhood guide -->
          <BaseArrowCta to="/nearby-locations" variant="gold">
            Nearby Locations
          </BaseArrowCta>
        </div>
      </FadeReveal>
    </BaseContainer>
  </section>
</template>
