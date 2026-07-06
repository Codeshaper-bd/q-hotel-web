<template>
  <!--
    Reservation console: a floating glass card on the hero's right side.
    Each field sits in its own hairline box that warms on hover and draws a
    gold underline while focused; selects and dates are restyled so no raw
    browser chrome breaks the atmosphere. Single column on small screens.
  -->
  <form
    class="w-full border border-champagne/25 bg-night/60 p-6 shadow-[0_28px_80px_-28px] shadow-night/90 backdrop-blur-xl sm:p-7"
    aria-label="Check room availability"
    @submit.prevent="handleSubmit"
  >
    <p class="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-champagne/70">
      Reserve your stay
    </p>

    <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <!-- Check-in -->
      <div class="hero-field group relative">
        <label for="hero-check-in" class="hero-field-label">Check-in</label>
        <div class="mt-1.5 flex items-center gap-2.5">
          <svg class="h-3.5 w-3.5 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <input
            id="hero-check-in"
            v-model="checkIn"
            type="date"
            required
            :min="todayIso"
            class="hero-field-date w-full bg-transparent text-sm text-paper [color-scheme:dark]"
          >
        </div>
        <span class="hero-console-focus-line" aria-hidden="true" />
      </div>

      <!-- Check-out -->
      <div class="hero-field group relative">
        <label for="hero-check-out" class="hero-field-label">Check-out</label>
        <div class="mt-1.5 flex items-center gap-2.5">
          <svg class="h-3.5 w-3.5 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <input
            id="hero-check-out"
            v-model="checkOut"
            type="date"
            required
            :min="minCheckOut"
            class="hero-field-date w-full bg-transparent text-sm text-paper [color-scheme:dark]"
          >
        </div>
        <span class="hero-console-focus-line" aria-hidden="true" />
      </div>

      <!-- Guests & Rooms -->
      <div class="hero-field group relative">
        <span id="hero-guests-rooms-label" class="hero-field-label">Guests &amp; Rooms</span>
        <div class="mt-1.5 flex items-center gap-2.5">
          <svg class="h-3.5 w-3.5 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span class="relative flex-1">
            <select
              v-model.number="guests"
              aria-label="Guests"
              class="hero-field-select w-full bg-transparent pr-6 text-sm text-paper [color-scheme:dark]"
            >
              <option v-for="count in 4" :key="count" :value="count" class="bg-night text-paper">
                {{ count }} {{ count === 1 ? 'Guest' : 'Guests' }}
              </option>
            </select>
            <svg class="hero-field-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="relative flex-1">
            <select
              v-model.number="rooms"
              aria-label="Rooms"
              class="hero-field-select w-full bg-transparent pr-6 text-sm text-paper [color-scheme:dark]"
            >
              <option v-for="count in 3" :key="count" :value="count" class="bg-night text-paper">
                {{ count }} {{ count === 1 ? 'Room' : 'Rooms' }}
              </option>
            </select>
            <svg class="hero-field-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        <span class="hero-console-focus-line" aria-hidden="true" />
      </div>

      <!-- Rate preference -->
      <div class="hero-field group relative">
        <label for="hero-rate-filter" class="hero-field-label">Rates</label>
        <div class="mt-1.5 flex items-center gap-2.5">
          <svg class="h-3.5 w-3.5 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span class="relative w-full">
            <select
              id="hero-rate-filter"
              v-model="rateFilter"
              class="hero-field-select w-full bg-transparent pr-6 text-sm text-paper [color-scheme:dark]"
            >
              <option value="promo" class="bg-night text-paper">Promo Rate</option>
              <option value="price-high" class="bg-night text-paper">Price: High to Low</option>
              <option value="price-low" class="bg-night text-paper">Price: Low to High</option>
            </select>
            <svg class="hero-field-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        <span class="hero-console-focus-line" aria-hidden="true" />
      </div>
    </div>

    <BaseButton type="submit" variant="gold" class="mt-5 w-full">
      Search
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import type { BookingRateFilter, BookingSearchQuery } from '~/types/booking'

const emit = defineEmits<{
  search: [query: BookingSearchQuery]
}>()

const todayIso = new Date().toISOString().slice(0, 10)

const checkIn = ref(todayIso)
const checkOut = ref('')
const guests = ref(2)
const rooms = ref(1)
const rateFilter = ref<BookingRateFilter>('promo')

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
    rateFilter: rateFilter.value,
  })
}
</script>

<style scoped>
/* Field box: hairline that warms on hover, focuses gold */
.hero-field {
  padding: 0.75rem 1rem 0.875rem;
  border: 1px solid rgb(var(--color-paper) / 0.14);
  background: rgb(var(--color-night) / 0.35);
  transition: border-color var(--duration-fast) var(--ease-premium);
}

.hero-field:hover {
  border-color: rgb(var(--color-champagne) / 0.4);
}

.hero-field:focus-within {
  border-color: rgb(var(--color-champagne) / 0.7);
}

.hero-field-label {
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgb(var(--color-champagne) / 0.6);
}

/* Selects: drop the native chrome, add our champagne chevron */
.hero-field-select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.hero-field-chevron {
  position: absolute;
  right: 0.25rem;
  top: 50%;
  height: 0.75rem;
  width: 0.75rem;
  transform: translateY(-50%);
  pointer-events: none;
  color: rgb(var(--color-champagne) / 0.7);
}

/* Date inputs: tint the native picker glyph champagne so it belongs */
.hero-field-date::-webkit-calendar-picker-indicator {
  opacity: 0.65;
  filter: invert(0.85) sepia(0.4) saturate(2.4) hue-rotate(-12deg);
  cursor: pointer;
}

/* Gold underline that draws in while a field has focus — the console's one
   micro-interaction. Transform-only; reduced motion collapses it. */
.hero-console-focus-line {
  position: absolute;
  inset-inline: -1px;
  bottom: -1px;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-normal) var(--ease-premium);
  background: linear-gradient(90deg, rgb(var(--color-gold)), rgb(var(--color-champagne)));
}

.group:focus-within .hero-console-focus-line {
  transform: scaleX(1);
}
</style>
