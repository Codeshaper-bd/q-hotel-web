<template>
  <form
    class="w-full border border-champagne/20 bg-night/70 shadow-2xl shadow-night/60 backdrop-blur-md lg:flex lg:w-auto lg:items-stretch"
    aria-label="Check room availability"
    @submit.prevent="handleSubmit"
  >
    <div class="grid grid-cols-2 lg:flex">
      <!-- Check-in -->
      <div class="flex flex-col gap-1.5 border-b border-r border-paper/10 px-5 py-3.5 lg:border-b-0 lg:border-r-0">
        <label for="hero-check-in" class="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-paper/40">
          Check-in
        </label>
        <div class="flex items-center gap-2">
          <svg class="h-3.5 w-3.5 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <input
            id="hero-check-in"
            v-model="checkIn"
            type="date"
            required
            :min="todayIso"
            class="w-full bg-transparent text-sm text-paper [color-scheme:dark]"
          >
        </div>
      </div>

      <!-- Check-out -->
      <div class="flex flex-col gap-1.5 border-b border-paper/10 px-5 py-3.5 lg:border-b-0 lg:border-l lg:border-paper/10">
        <label for="hero-check-out" class="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-paper/40">
          Check-out
        </label>
        <div class="flex items-center gap-2">
          <svg class="h-3.5 w-3.5 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <input
            id="hero-check-out"
            v-model="checkOut"
            type="date"
            required
            :min="minCheckOut"
            class="w-full bg-transparent text-sm text-paper [color-scheme:dark]"
          >
        </div>
      </div>

      <!-- Guests & Rooms -->
      <div class="flex flex-col gap-1.5 border-r border-paper/10 px-5 py-3.5 lg:border-r-0 lg:border-l lg:border-paper/10">
        <span id="hero-guests-rooms-label" class="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-paper/40">
          Guests &amp; Rooms
        </span>
        <div class="flex items-center gap-2">
          <svg class="h-3.5 w-3.5 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <select
            v-model.number="guests"
            aria-label="Guests"
            class="bg-transparent text-sm text-paper [color-scheme:dark]"
          >
            <option v-for="count in 4" :key="count" :value="count" class="bg-night text-paper">
              {{ count }} {{ count === 1 ? 'Guest' : 'Guests' }}
            </option>
          </select>
          <span class="text-sm text-paper/40" aria-hidden="true">,</span>
          <select
            v-model.number="rooms"
            aria-label="Rooms"
            class="bg-transparent text-sm text-paper [color-scheme:dark]"
          >
            <option v-for="count in 3" :key="count" :value="count" class="bg-night text-paper">
              {{ count }} {{ count === 1 ? 'Room' : 'Rooms' }}
            </option>
          </select>
        </div>
      </div>

      <!-- Special rates / promo -->
      <div class="flex flex-col gap-1.5 px-5 py-3.5 lg:border-l lg:border-paper/10">
        <label for="hero-promo" class="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-paper/40">
          Special Rates
        </label>
        <div class="flex items-center gap-2">
          <svg class="h-3.5 w-3.5 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <input
            id="hero-promo"
            v-model.trim="promoCode"
            type="text"
            autocomplete="off"
            placeholder="Corp/Promo Code"
            class="w-full min-w-28 bg-transparent text-sm text-paper placeholder:text-paper/45"
          >
        </div>
      </div>
    </div>

    <BaseButton type="submit" variant="gold" class="w-full lg:w-auto lg:self-stretch lg:px-9">
      Search
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'

const emit = defineEmits<{
  search: [query: BookingSearchQuery]
}>()

const todayIso = new Date().toISOString().slice(0, 10)

const checkIn = ref(todayIso)
const checkOut = ref('')
const guests = ref(2)
const rooms = ref(1)
const promoCode = ref('')

// Check-out can never be before check-in
const minCheckOut = computed(() => checkIn.value || todayIso)

watch(checkIn, (newCheckIn) => {
  if (checkOut.value && checkOut.value < newCheckIn) {
    checkOut.value = newCheckIn
  }
})

function handleSubmit() {
  emit('search', {
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    guests: guests.value,
    rooms: rooms.value,
    promoCode: promoCode.value,
  })
}
</script>
