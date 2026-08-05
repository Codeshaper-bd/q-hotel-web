<template>
  <!--
    One row of the room list: a photo beside a copper-framed dark details
    panel — the same panel language as the home page's RoomsSection card,
    laid out side by side instead of pinned/overlaid since every room is
    visible in the list at once rather than stepped through.
  -->
  <article class="flex flex-col bg-transparent sm:h-[26rem] sm:flex-row sm:gap-6 lg:h-[28rem]">
    <div class="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-line/40 sm:aspect-auto sm:h-full sm:w-[58%]">
      <Transition name="room-image">
        <BaseImage
          :key="selectedImage.src"
          :src="selectedImage.src"
          :alt="selectedImage.alt"
          :width="900"
          :height="675"
          sizes="xs:100vw sm:58vw lg:46vw"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </Transition>

      <div
        v-if="room.images.length > 1"
        class="absolute inset-x-0 bottom-4 flex justify-center gap-1"
      >
        <button
          v-for="(image, imageIndex) in room.images"
          :key="image.src"
          type="button"
          :class="[
            'h-1.5 transition-[width,background-color] duration-fast',
            imageIndex === selectedImageIndex ? 'w-9 bg-copper' : 'w-1.5 bg-paper/80 hover:bg-paper',
          ]"
          :aria-label="`Show photo ${imageIndex + 1} of ${room.name}`"
          :aria-pressed="imageIndex === selectedImageIndex"
          @click="selectedImageIndex = imageIndex"
        />
      </div>
    </div>

    <div class="relative flex w-full flex-col bg-ink p-7 text-paper sm:h-full sm:w-[42%] sm:p-0">
      <div class="flex flex-col sm:absolute sm:inset-5 sm:border sm:border-copper sm:p-7">
        <span class="self-start border border-paper/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-paper">
          ${{ room.nightlyRateUsd }} / Night
        </span>

        <h3 class="mt-4 font-display text-3xl leading-tight">
          {{ room.name }}
        </h3>

        <p class="mt-3 text-sm leading-7 text-paper/80">
          {{ room.description }}
        </p>

        <ul class="mt-6 space-y-3 text-sm text-paper/80 sm:mt-auto sm:pt-6">
          <li class="flex items-center gap-3">
            <svg class="h-5 w-5 shrink-0 text-paper" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M13.333 10.001v1.667a1.667 1.667 0 01-1.666 1.666H7.5a.833.833 0 00-.833.834v2.5a1.667 1.667 0 001.666 1.666h8.334a1.667 1.667 0 001.666-1.666V8.335a1.667 1.667 0 00-1.666-1.667" />
              <path d="M3.334 13.335a1.667 1.667 0 01-1.667-1.667V3.335a1.667 1.667 0 011.667-1.667h8.333a1.667 1.667 0 011.666 1.667v2.5a.833.833 0 01-.833.833H8.334a1.667 1.667 0 00-1.667 1.667v1.666" />
            </svg>
            {{ room.areaSqFt }} Sq Ft Room
          </li>
          <li class="flex items-center gap-3">
            <svg class="h-5 w-5 shrink-0 text-paper" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15.834 17.5v-1.667a3.333 3.333 0 00-3.334-3.333H7.5a3.333 3.333 0 00-3.334 3.333V17.5" />
              <path d="M10 9.167a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667z" />
            </svg>
            {{ room.maxOccupancy }} {{ room.maxOccupancy === 1 ? 'Person' : 'Persons' }}
          </li>
          <li class="flex items-center gap-3">
            <svg class="h-5 w-5 shrink-0 text-paper" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M1.667 16.665V9.999c0-.442.176-.866.488-1.179.313-.312.737-.488 1.179-.488h13.333c.442 0 .866.176 1.179.488.312.313.488.737.488 1.179v6.666" />
              <path d="M3.333 8.332v-3.333c0-.442.176-.867.488-1.179.313-.313.737-.488 1.179-.488h10c.442 0 .866.175 1.179.488.312.312.488.737.488 1.179v3.333" />
              <path d="M10 3.332v5" />
              <path d="M1.667 15h16.667" />
            </svg>
            {{ room.bedType }}
          </li>
        </ul>

        <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <BaseArrowCta :to="`/booking?room=${room.id}`" variant="gold">
            Book Now
          </BaseArrowCta>
          <button
            type="button"
            class="flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.08em] text-paper transition-colors duration-fast hover:text-champagne"
            @click="isDetailsOpen = true"
          >
            Room Details
            <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <RoomDetailsDialog v-model:open="isDetailsOpen" :room="room" />
  </article>
</template>

<script setup lang="ts">
import type { Room } from '~/types/room'

const props = defineProps<{
  room: Room
}>()

const selectedImageIndex = ref(0)
const isDetailsOpen = ref(false)

const selectedImage = computed(() =>
  props.room.images[selectedImageIndex.value] ?? (props.room.images[0] as Room['images'][number]))
</script>

<style scoped>
.room-image-enter-active,
.room-image-leave-active {
  transition: opacity var(--duration-normal) var(--ease-premium);
}

.room-image-enter-from,
.room-image-leave-to {
  opacity: 0;
}
</style>
