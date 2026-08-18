<template>
  <div id="reservation-summary" class="scroll-mt-28 bg-white p-6">
    <div class="relative aspect-[5/3]">
      <BaseImage :src="room.images[0]?.src ?? ''" :alt="room.images[0]?.alt ?? room.name" :width="576" :height="345"
        sizes="xs:100vw lg:26rem" class="absolute inset-0" />
    </div>

    <div class="border-b border-line py-6">
      <p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-ink/50">
        <svg class="h-4 w-4 text-copper" viewBox="0 0 51 50" fill="currentColor" aria-hidden="true">
          <path v-for="(markPath, index) in qHotelLogoPaths" :key="index" :d="markPath" />
        </svg>
        Q Hotel Dhaka
      </p>
      <h2 class="mt-2 font-display text-2xl text-ink">{{ room.name }}</h2>
      <p class="mt-1 text-sm text-ink/60">Plot C-11, Block A, Sector 1, Purbachal Road, Dhaka 1229</p>
    </div>

    <div v-for="row in rows" :key="row.label" class="border-b border-line py-[18px]">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase tracking-[0.06em] text-ink">{{ row.label }}</span>
        <span class="text-base text-ink/75">{{ row.value }}</span>
      </div>
    </div>

    <h2 class="mt-8 font-display text-[28px] font-semibold text-[#0F0F10]">Price Breakdown</h2>

    <div v-for="row in rows2" :key="row.label" class="py-3">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase tracking-[0.06em] text-ink">{{ row.label }}</span>
        <span class="text-base text-ink/75">{{ row.value }}</span>
      </div>
    </div>

    <div class="border-b border-line my-6"></div>

    <div v-for="row in rows3" :key="row.label" class="py-3">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase tracking-[0.06em] text-ink">{{ row.label }}</span>
        <span class="text-base text-ink/75">{{ row.value }}</span>
      </div>
    </div>
    <div class="border-b border-line my-6"></div>
    <div class="flex justify-between">
      <span class="text-[28px] font-semibold text-[#000000]">Total Paid</span>
      <span class="text-xl font-medium text-[#0F0F10]">113,563 BDT</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '~/types/room'

const props = withDefaults(defineProps<{
  room: Room
  reservationNumber: string
  checkIn: string
  checkOut: string
  nights: number
  roomsCount: number
  guestsCount: number
  totalPrice: number
  /** "Total Paid" on the confirmation page; a failed attempt never charged
   *  anything, so that page passes a truthful label instead */
  totalLabel?: string
}>(), {
  totalLabel: 'Total Paid',
})

const rows = computed(() => [
  { label: 'Reservation', value: props.reservationNumber },
  { label: 'Room Type', value: props.room.name },
  { label: 'Bed Type', value: props.room.bedType },
  { label: 'Guests', value: `${props.guestsCount} ${props.guestsCount === 1 ? 'Adult' : 'Adults'}` },
  { label: 'Duration', value: `${props.nights} ${props.nights === 1 ? 'Night' : 'Nights'}` },
  { label: 'Check-in', value: `${formatBookingDay(props.checkIn)}, ${isoToDate(props.checkIn).getFullYear()}` },
  { label: 'Check-out', value: `${formatBookingDay(props.checkOut)}, ${isoToDate(props.checkOut).getFullYear()}` },
])

const rows2 = computed(() => [
  { label: 'room total (2 nights)', value: '92,500 BDT' },
  { label: 'rollway bed', value: '2,000 BDT' },
  { label: 'baby cribs', value: '1,500 BDT' },
  { label: 'Accessible room', value: '0 BDT' },
  { label: 'early check-in', value: '3,000 BDT' },
])
const rows3 = computed(() => [
  { label: ' city taxes (1.5%) ', value: '1,485 BDT' },
  { label: ' vat (15%) ', value: '14,850 BDT' },
  { label: 'service charge (12.5%)', value: '12,375 BDT' },
])
</script>
