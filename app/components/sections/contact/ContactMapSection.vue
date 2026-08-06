<template>
  <BaseSection tone="paper" spacing="lg" container-size="xl">
    <div class="flex flex-col items-center text-center">
      <BaseKicker>Google Map</BaseKicker>
      <h2 class="mt-6 font-display text-4xl text-ink sm:text-5xl">
        Get Direction Here
      </h2>
    </div>

    <div class="relative mt-14 h-[24rem] overflow-hidden sm:h-[30rem]">
      <LocationMap :hotel="hotel" :attractions="[]" :active-attraction-id="null" :biased="false" />
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { HotelLocation } from '~/types/location'

const hotel: HotelLocation = {
  name: 'Q Hotel Dhaka',
  address: 'Plot C-11, Block A, Sector 1, Purbachal Road, Dhaka 1229',
  coordinates: [23.8377208, 90.4572272],
  directionsUrl: 'https://maps.app.goo.gl/KAggvEKj6dWVGrQE9',
}
</script>
