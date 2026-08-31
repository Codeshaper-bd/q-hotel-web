<template>
  <!--
    Thoughtful Amenities For A Seamless Stay: four photo cards, each with a
    circular icon badge overlapping the photo's bottom edge and a label below.
  -->
  <BaseSection
    id="long-stay-amenities"
    labelled-by="long-stay-amenities-title"
    tone="paper"
    spacing="lg"
    container-size="xl"
  >
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>What's Included</BaseKicker>
        <h2
          id="long-stay-amenities-title"
          class="mt-6 font-display text-4xl text-ink sm:text-5xl lg:text-[56px] font-semibold"
        >
          Thoughtful Amenities For A <br />
          Seamless Stay
        </h2>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div
        class="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-4 lg:mt-16"
      >
        <div
          v-for="amenity in amenities"
          :key="amenity.label"
          class="flex flex-col items-center text-center"
        >
          <div class="relative w-full">
            <div class="aspect-square w-full overflow-hidden bg-line/40">
              <BaseImage
                :src="amenity.image"
                :alt="amenity.label"
                :width="418"
                :height="420"
                sizes="xs:50vw sm:25vw lg:22vw"
                class="h-full w-full object-cover"
              />
            </div>
            <span
              class="absolute -bottom-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-[#0F0F10] text-paper"
              aria-hidden="true"
            >
              <svg
                class="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  v-for="(iconPath, index) in amenity.iconPaths"
                  :key="index"
                  :d="iconPath"
                />
              </svg>
            </span>
          </div>
          <span class="mt-14 block font-display text-lg lg:text-[36px]  font-semibold text-ink">{{
            amenity.label
          }}</span>
        </div>
      </div>
    </FadeReveal>
  </BaseSection>
</template>

<script setup lang="ts">
interface AmenityTile {
  label: string;
  image: string;
  iconPaths: string[];
}

const amenities: AmenityTile[] = [
  {
    label: "Fully Furnished",
    image: "/images/rooms/deluxe-1.jpg",
    iconPaths: ["M4 21V9l8-6 8 6v12M9 21v-6h6v6"],
  },
  {
    label: "Laundry Service",
    image: "/images/hero/lobby-interior.jpg",
    iconPaths: [
      "M4 4h16v16H4z",
      "M12 15a4 4 0 100-8 4 4 0 000 8z",
      "M7 6.5h.01",
    ],
  },
  {
    label: "Fitness Access",
    image: "/images/offers/stressless-spa.jpg",
    iconPaths: ["M6.5 9v6M4 10.5v3M17.5 9v6M20 10.5v3M6.5 12h11"],
  },
  {
    label: "Work Friendly Space",
    image: "/images/meetings/business-class-lounge.jpg",
    iconPaths: ["M4 6h16v10H4zM2 19h20", "M10 9h4"],
  },
];
</script>
