<template>
  <!--
    Nearby attractions page content: a wide, framed light map of Q Hotel and
    its landmarks, followed by the Explore Nearby Locations card grid. Each
    card's SHOW ON MAP action drives the map (framing that landmark against
    the hotel) and scrolls to it — the same interaction the homepage uses.
  -->
  <div>
    <!-- Map -->
    <BaseSection
      tone="paper"
      spacing="sm"
      container-size="xl"
      aria-labelledby="nearby-map-title"
    >
      <div
        id="nearby-map"
        class="relative h-[760px] scroll-mt-24 overflow-hidden border-[15px] border-[#50515533] bg-cream"
      >
        <NearbyLocationMap
          :hotel="hotel"
          :attractions="attractions"
          :active-attraction-id="activeAttractionId"
        />
      </div>
      <h2 id="nearby-map-title" class="sr-only">
        Map of Q Hotel Dhaka and nearby attractions
      </h2>
      <h3
        id="explore-nearby-title"
        class="text-sm font-medium text-[#0F0F10] mt-10 uppercase"
      >
        Explore Nearby Locations
    </h3>

      <div
        class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 l mt-6"
      >
        <article
          v-for="(attraction, index) in attractions"
          :key="attraction.id"
          :aria-labelledby="`explore-nearby-card-${index}`"
          class="group flex flex-col border border-[#EED4A380]/50"
        >
          <div class="relative aspect-[16/10] overflow-hidden">
            <BaseImage
              :src="attraction.image"
              :alt="attraction.name"
              :width="800"
              :height="500"
              sizes="xs:100vw sm:50vw lg:33vw"
              class="absolute inset-0 transition-transform duration-[900ms] ease-premium motion-safe:group-hover:scale-[1.035]"
            />
          </div>

          <div class="flex flex-1 flex-col p-5 sm:p-6">
            <h3
              :id="`explore-nearby-card-${index}`"
              class="font-display text-xl font-semibold text-ink sm:text-[22px]"
            >
              {{ attraction.name }}
            </h3>

            <p class="mt-3 text-sm text-[#505155]">
              {{ attraction.description }}
            </p>

            <p
              class="mt-auto flex items-center gap-2.5 pt-5 text-sm font-medium text-[#0F0F10]"
            >
              <svg
                class="h-4 w-4 shrink-0 text-copper"
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

            <p class="mt-4">
              <button
                type="button"
                class="text-sm font-medium uppercase tracking-[0.16em] text-[#C9752D] underline-offset-4 transition-colors duration-fast hover:text-ink hover:underline"
                @click="showOnMap(attraction.id)"
              >
                Show on Map
                <span aria-hidden="true">&nbsp;&#8599;</span>
              </button>
            </p>
          </div>
        </article>
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
const { hotel, attractions, formatDistance } = useNearbyAttractions();
const { prefersReducedMotion } = useReducedMotion();

/** null centres the hotel; an id frames that landmark against the hotel */
const activeAttractionId = ref<string | null>(null);

function showOnMap(id: string) {
  activeAttractionId.value = id;
  const mapFrame = document.getElementById("nearby-map");
  mapFrame?.scrollIntoView({
    behavior: prefersReducedMotion.value ? "auto" : "smooth",
    block: "start",
  });
}
</script>
