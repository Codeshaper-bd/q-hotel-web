<template>
  <!--
    Full-bleed 4-photo strip of everyday life at the hotel. Composes
    <section> directly (not BaseSection) so the photographs can reach both
    viewport edges while the heading stays within the xl container.
  -->
  <section aria-labelledby="careers-life-title" class="bg-paper text-ink">
    <BaseContainer size="xl" class="pb-14 sm:pb-16">
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Employee Activity</BaseKicker>
        <h2 id="careers-life-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Life At Q Hotel Dhaka
        </h2>
      </div>
    </BaseContainer>

    <div class="grid grid-cols-2 lg:grid-cols-4">
      <div v-for="photo in photos" :key="photo.src" class="relative aspect-[5/6] overflow-hidden">
        <BaseImage :src="photo.src" :alt="photo.alt" :width="600" :height="720" sizes="xs:50vw lg:25vw" class="absolute inset-0" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ImageAsset } from '~/types/media'

const photos: ImageAsset[] = [
  { src: '/images/careers/life-01.jpg', alt: 'Q Hotel Dhaka kitchen staff preparing dishes at the buffet counter' },
  { src: '/images/careers/life-02.jpg', alt: 'Restaurant server setting a table in the dining room' },
  { src: '/images/careers/life-03.jpg', alt: 'Hotel colleague holding a luggage trolley near the entrance' },
  { src: '/images/careers/life-04.jpg', alt: 'Waitstaff serving guests at a table in the restaurant' },
]
</script>
