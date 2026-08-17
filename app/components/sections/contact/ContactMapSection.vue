<template>
  <BaseSection tone="paper" spacing="lg" container-size="xl" class="!pt-[140px] !pb-12 sm:!pb-16">
    <div class="flex flex-col items-center text-center">
      <BaseKicker>Map</BaseKicker>
      <h2
        class="mt-6 font-display text-4xl text-[#0F0F10] font-semibold sm:text-5xl lg:text-[56px]"
      >
        Get Directions Here
      </h2>
    </div>

    <div class="relative mt-14 h-[800px] overflow-hidden">
      <LocationMap
        :hotel="hotel"
        :attractions="[]"
        :active-attraction-id="null"
        :biased="false"
      />
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { HotelLocation } from "~/types/location";

const hotel: HotelLocation = {
  name: "Q Hotel Dhaka",
  address: "Plot C-11, Block A, Sector 1, Purbachal Road, Dhaka 1229",
  coordinates: [23.8377208, 90.4572272],
  directionsUrl: "https://maps.app.goo.gl/KAggvEKj6dWVGrQE9",
};
</script>
