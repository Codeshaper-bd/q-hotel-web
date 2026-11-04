<script setup lang="ts">
/**
 * Amenity tile: label plus its Figma icon. `composite` icons already include
 * the circular frame; glyph-only icons are centered inside the shared circle.
 */
interface FacilityAmenity {
  id: string;
  label: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
  composite?: boolean;
}

const ICON_BASE_PATH = "/images/facilities/icons";

const amenities: FacilityAmenity[] = [
  {
    id: "airport-shuttle",
    label: "Airport Shuttle",
    iconSrc: `${ICON_BASE_PATH}/airport-shuttle.svg`,
    iconWidth: 68,
    iconHeight: 68,
    composite: true,
  },
  {
    id: "parking",
    label: "Parking",
    iconSrc: `${ICON_BASE_PATH}/parking-glyph.svg`,
    iconWidth: 31,
    iconHeight: 25,
  },
  {
    id: "dining",
    label: "Dining",
    iconSrc: `${ICON_BASE_PATH}/dining.svg`,
    iconWidth: 68,
    iconHeight: 68,
    composite: true,
  },
  {
    id: "swimming-pool",
    label: "Swimming Pool",
    iconSrc: `${ICON_BASE_PATH}/swimming-pool-glyph.svg`,
    iconWidth: 31,
    iconHeight: 24,
  },
  {
    id: "wellness",
    label: "Wellness",
    iconSrc: `${ICON_BASE_PATH}/wellness-glyph.svg`,
    iconWidth: 31,
    iconHeight: 25,
  },
  {
    id: "room-service",
    label: "24hrs Room Service",
    iconSrc: `${ICON_BASE_PATH}/room-service-glyph.svg`,
    iconWidth: 31,
    iconHeight: 31,
  },
  {
    id: "ip-tv",
    label: "IP TV",
    iconSrc: `${ICON_BASE_PATH}/iptv-glyph.svg`,
    iconWidth: 31,
    iconHeight: 31,
  },
  {
    id: "security",
    label: "24 Hours Security",
    iconSrc: `${ICON_BASE_PATH}/security-glyph.svg`,
    iconWidth: 31,
    iconHeight: 19,
  },
  {
    id: "mini-bar",
    label: "Mini Bar",
    iconSrc: `${ICON_BASE_PATH}/mini-bar.svg`,
    iconWidth: 68,
    iconHeight: 68,
    composite: true,
  },
  {
    id: "valet-laundry",
    label: "Valet Laundry",
    iconSrc: `${ICON_BASE_PATH}/valet-laundry.svg`,
    iconWidth: 68,
    iconHeight: 68,
    composite: true,
  },
];

const GRID_COLUMNS = 5;

/** Checkerboard tint for the 5-column desktop grid, matching the Figma */
function tileTintClass(index: number): string {
  const column = index % GRID_COLUMNS;
  const row = Math.floor(index / GRID_COLUMNS);
  return (column + row) % 2 === 1 ? "lg:bg-white/50" : "lg:bg-transparent";
}
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
    class="!pb-0"
  >
    <BaseTitle id="facilities-title">Facilities &amp; Amenities</BaseTitle>

    <!-- The delay lets the title's word reveal land first; the tiles then
         follow one by one -->
    <FadeReveal :stagger="0.09" :delay="0.9" start="top 88%">
      <ul
        class="mt-10 grid grid-cols-2 gap-px bg-line/20 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5 lg:gap-0 lg:bg-transparent"
      >
        <li
          v-for="(amenity, amenityIndex) in amenities"
          :key="amenity.id"
          data-reveal-item
          :class="[
            'group relative isolate flex h-[200px] flex-col items-center justify-center gap-5 overflow-hidden bg-paper px-3 text-center lg:h-[240px] 2xl:h-[280px]',
            tileTintClass(amenityIndex),
          ]"
        >
          <span
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 bg-sand/0 transition-colors duration-fast ease-premium group-hover:bg-sand/80"
          />
          <span
            class="relative flex size-[68px] shrink-0 items-center justify-center transition-transform duration-fast ease-premium motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-[1.04]"
          >
            <img
              v-if="!amenity.composite"
              src="/images/facilities/icons/circle.svg"
              alt=""
              width="68"
              height="68"
              class="absolute inset-0 size-[68px]"
              aria-hidden="true"
            />
            <img
              :src="amenity.iconSrc"
              alt=""
              :width="amenity.iconWidth"
              :height="amenity.iconHeight"
              loading="lazy"
              class="relative"
              aria-hidden="true"
            />
          </span>
          <span
            class="relative block font-display text-xl text-ink transition-colors duration-fast ease-premium group-hover:text-copper sm:text-2xl"
          >
            {{ amenity.label }}
            <span
              aria-hidden="true"
              class="absolute -bottom-2 left-1/2 h-px w-8 -translate-x-1/2 scale-x-0 bg-copper transition-transform duration-fast ease-premium motion-reduce:transition-none group-hover:scale-x-100"
            />
          </span>
        </li>
      </ul>
    </FadeReveal>

    <FadeReveal class="mt-10 flex justify-center lg:mt-16">
      <BaseArrowCta to="/facilities-amenities" variant="gold">
        View All Facilities
      </BaseArrowCta>
    </FadeReveal>
  </BaseSection>
</template>
