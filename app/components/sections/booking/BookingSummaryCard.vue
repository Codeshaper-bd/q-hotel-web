<template>
  <div class="bg-white">
    <div class="relative aspect-[5/3]">
      <BaseImage
        :src="room.images[0]?.src ?? ''"
        :alt="room.images[0]?.alt ?? room.name"
        :width="576"
        :height="345"
        sizes="xs:100vw lg:26rem"
        class="absolute inset-0"
      />
    </div>

    <div class="border-b border-line p-6">
      <p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-ink/50">
        <svg class="h-4 w-4 text-copper" viewBox="0 0 51 50" fill="currentColor" aria-hidden="true">
          <path v-for="(markPath, index) in qHotelLogoPaths" :key="index" :d="markPath" />
        </svg>
        Q Hotel Dhaka
      </p>
      <h2 class="mt-2 font-display text-2xl text-ink">{{ room.name }}</h2>
      <p class="mt-1 text-sm text-ink/60">Plot C-11, Block A, Sector 1, Purbachal Road, Dhaka 1229</p>
    </div>

    <div class="border-b border-line p-6">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase tracking-[0.06em] text-ink">Total Price</span>
        <span class="text-base text-ink/75">${{ totalPrice.toLocaleString('en-US') }}</span>
      </div>
      <p class="mt-3 flex items-center gap-2 text-sm font-medium text-moss">
        <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 1.333A6.667 6.667 0 1014.667 8 6.674 6.674 0 008 1.333zm3.53 5.137l-4 4a.667.667 0 01-.943 0l-2-2a.667.667 0 11.943-.943L7 9.057l3.53-3.53a.667.667 0 01.943.943z" />
        </svg>
        Well done! You're getting a great price.
      </p>
    </div>

    <div class="border-b border-line p-6">
      <div class="flex items-start justify-between gap-4 text-sm">
        <span class="font-medium uppercase tracking-[0.06em] text-ink">Dates</span>
        <span class="text-right">
          <span class="block text-base text-ink/75">{{ dateRangeLabel }} ({{ nights }} {{ nights === 1 ? 'Night' : 'Nights' }})</span>
          <span class="mt-1 block text-sm text-ink/55">Check In 3:00 pm</span>
        </span>
      </div>
    </div>

    <div class="border-b border-line p-6">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase tracking-[0.06em] text-ink">Reservation</span>
        <span class="text-base text-ink/75">{{ roomsCount }} {{ roomsCount === 1 ? 'Room' : 'Rooms' }}, {{ guestsCount }} {{ guestsCount === 1 ? 'Guest' : 'Guests' }}</span>
      </div>
    </div>

    <div class="border-b border-line p-6">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase tracking-[0.06em] text-ink">Room Type</span>
        <span class="text-base text-ink/75">{{ room.name }}</span>
      </div>
    </div>

    <div class="border-b border-line p-6">
      <div class="flex items-start justify-between gap-4 text-sm">
        <span>
          <span class="block font-medium uppercase tracking-[0.06em] text-ink">{{ nights }} {{ nights === 1 ? 'Night' : 'Nights' }} Stay</span>
          <span class="mt-1 block text-sm text-ink/55">{{ dateRangeLabel }}</span>
        </span>
        <span class="text-base text-ink">${{ roomSubtotal.toLocaleString('en-US') }}</span>
      </div>
    </div>

    <div class="border-b border-line p-6">
      <div class="flex items-start justify-between gap-4 text-sm">
        <span>
          <span class="block font-medium uppercase tracking-[0.06em] text-ink">Taxes</span>
          <span class="mt-1 block text-sm text-ink/55">Tax ({{ taxRatePercent }}%)</span>
        </span>
        <span class="text-base text-ink">${{ taxes.toLocaleString('en-US') }}</span>
      </div>
    </div>

    <div class="border-b border-line p-6">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase tracking-[0.06em] text-ink">Total Price</span>
        <span class="text-base text-ink/75">${{ totalPrice.toLocaleString('en-US') }}</span>
      </div>
    </div>

    <p class="flex items-center gap-2 p-6 text-sm text-ink/75">
      <svg class="h-4 w-4 shrink-0 text-ink/50" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" />
        <path stroke-linecap="round" d="M8 7.5v3.5M8 5.25h.01" />
      </svg>
      Earn an estimated {{ points.toLocaleString('en-US') }} points for this stay.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '~/types/room'

const props = defineProps<{
  room: Room
  checkIn: string
  checkOut: string
  nights: number
  roomsCount: number
  guestsCount: number
  roomSubtotal: number
  taxes: number
  totalPrice: number
  taxRatePercent: number
}>()

const dateRangeLabel = computed(() => `${formatBookingDay(props.checkIn)} – ${formatBookingDay(props.checkOut)}`)
const points = computed(() => Math.round(props.totalPrice * 4))
</script>
