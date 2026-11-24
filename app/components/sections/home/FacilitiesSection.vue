<script setup lang="ts">
import FacilityMorphIcon from "~/components/icons/FacilityMorphIcon.vue";
import type { FacilityIconName } from "~/types/facility";

/**
 * Amenity tile: label plus its Figma icon. `composite` icons already include
 * the circular frame; glyph-only icons are centered inside the shared circle.
 */
interface FacilityAmenity {
  id: FacilityIconName;
  label: string;
  composite?: boolean;
}

const amenities: FacilityAmenity[] = [
  { id: "airport-shuttle", label: "Airport Shuttle", composite: true },
  { id: "parking", label: "Parking" },
  { id: "dining", label: "Dining", composite: true },
  { id: "swimming-pool", label: "Swimming Pool" },
  { id: "wellness", label: "Wellness" },
  { id: "room-service", label: "24hrs Room Service" },
  { id: "ip-tv", label: "IP TV" },
  { id: "security", label: "24 Hours Security" },
  { id: "mini-bar", label: "Mini Bar", composite: true },
  { id: "valet-laundry", label: "Valet Laundry", composite: true },
];

const GRID_COLUMNS = 5;

/** Checkerboard tint for the 5-column desktop grid, matching the Figma */
function tileTintClass(index: number): string {
  const column = index % GRID_COLUMNS;
  const row = Math.floor(index / GRID_COLUMNS);
  return (column + row) % 2 === 1 ? "lg:bg-white/50" : "lg:bg-transparent";
}

// ─── Tile entrance ────────────────────────────────────────────────
// Diagonal wave as the tiles scroll into view (see useWaveReveal).
const gridRef = ref<HTMLElement | null>(null);
useWaveReveal(gridRef, "[data-tile]");
</script>

<template>
  <!--
    Facilities & Amenities: light section with a five-column checkerboard of
    amenity tiles (circled icon above a serif label) and a closing
    "View All Facilities" CTA, following the Figma design.
  -->
  <BaseSection
    id="facilities"
    labelled-by="facilities-title"
    tone="paper"
    container-size="xl"
    class="!pt-9 sm:!pt-[65px] !pb-0"
  >
    <BaseTitle id="facilities-title">Facilities &amp; Amenities</BaseTitle>

    <!-- Tiles rise in row by row as each row scrolls into view (see the
         tile entrance script) -->
    <div>
      <ul
        ref="gridRef"
        class="mt-10 grid grid-cols-2 gap-px bg-line/20 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5 lg:gap-0 lg:bg-transparent"
      >
        <li
          v-for="(amenity, amenityIndex) in amenities"
          :key="amenity.id"
          data-tile
          :class="[
            'facility-tile group relative isolate flex h-[168px] flex-col items-center justify-center gap-4 overflow-hidden bg-paper px-3 text-center sm:h-[200px] sm:gap-5 lg:h-[240px] 2xl:h-[280px]',
            tileTintClass(amenityIndex),
          ]"
        >
          <span
            class="relative flex size-14 shrink-0 items-center justify-center sm:size-[68px]"
          >
            <img
              v-if="!amenity.composite"
              src="/images/facilities/icons/circle.svg"
              alt=""
              width="68"
              height="68"
              class="absolute inset-0 size-14 sm:size-[68px]"
              aria-hidden="true"
            />
            <FacilityMorphIcon
              :name="amenity.id"
              class="relative max-sm:scale-[0.82]"
            />
            <span
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 rounded-full border border-ink/20"
            />
          </span>
          <span class="relative block font-display text-lg text-ink sm:text-2xl">
            {{ amenity.label }}
          </span>
        </li>
      </ul>
    </div>

    <FadeReveal class="mt-10 flex justify-center lg:mt-16">
      <BaseArrowCta to="/facilities-amenities" variant="gold">
        View All Facilities
      </BaseArrowCta>
    </FadeReveal>
  </BaseSection>
</template>
