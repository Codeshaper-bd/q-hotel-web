<template>
  <section aria-label="Facilities highlights" class="-mt-[120px]">
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      <div
        v-for="highlight in highlights"
        :key="highlight.title"
        class="flex min-h-48 flex-col items-center justify-center bg-white py-[31px] px-[27px] text-center"
      >
        <span
          class="flex size-12 items-center justify-center rounded-full bg-copper/10 text-copper"
          aria-hidden="true"
        >
          <component :is="highlight.icon" />
        </span>
        <h2 class="mt-3 font-display text-xl lg:text-[28px] text-[#0F0F10] font-semibold">
          {{ highlight.title }}
        </h2>
        <p class="mt-1.5 text-base text-[#505155]">
          {{ highlight.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HandCap from "~/components/icons/HandCap.vue";
import HandStar from "~/components/icons/HandStar.vue";
import HelpingHand from "~/components/icons/HelpingHand.vue";
import MultiUser from "~/components/icons/MultiUser.vue";

interface FacilityHighlight {
  title: string;
  description: string;
  icon: Component;
}

const highlights: FacilityHighlight[] = [
  {
    title: "12+ Facilities",
    description:
      "Thoughtfully curated amenities for a comfortable and effortless stay.",
    icon: HandCap,
  },
  {
    title: "Premium Experience",
    description: "Exceptional comfort and quality designed for every guest.",
    icon: HandStar,
  },
  {
    title: "Designed For You",
    description: "Thoughtful spaces, modern comforts, and personalized care.",
    icon: MultiUser,
  },
  {
    title: "Always At Your Service",
    description: "Dedicated support available 24/7 whenever you need us.",
    icon: HelpingHand,
  },
];
</script>
