<template>
  <BaseSection id="room-list" labelled-by="room-list-title" tone="paper" spacing="md" container-size="xl" class="!pt-8 sm:!pt-0">
    <h2 id="room-list-title" class="sr-only">Available Rooms</h2>

    <div class="flex items-center justify-between gap-4">
      <p v-if="hasQuery" class="font-medium text-ink">
        Search Result ({{ rooms.length }})
      </p>

      <!-- Filtering (price, view, bed type) arrives with the availability
           search integration; the control is present per the design but
           inert until there is a filter model to drive -->
      <button
        type="button"
        class="ml-auto flex items-center gap-2 border border-ink/15 px-5 py-3 text-sm uppercase tracking-[0.06em] text-ink transition-colors duration-fast hover:border-ink/40"
      >
        Filter
        <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2 4.5h12M4.5 8h7M6.5 11.5h3" />
        </svg>
      </button>
    </div>

    <div class="mt-8 lg:grid lg:grid-cols-[26rem_1fr] lg:items-start lg:gap-10">
      <div class="lg:sticky lg:top-28">
        <RoomsSidebar />
      </div>

      <div class="mt-10 flex flex-col gap-6 lg:mt-0">
        <RoomListCard v-for="room in rooms" :key="room.id" :room="room" />
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { useRoomsCatalog, parseBookingRouteQuery } from '#imports'

const route = useRoute()
const rooms = useRoomsCatalog()
const hasQuery = computed(() => !!parseBookingRouteQuery(route.query))
</script>
