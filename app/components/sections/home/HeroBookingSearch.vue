<template>
  <form
    class="rounded-md border border-champagne/25 bg-night/65 p-6 shadow-2xl shadow-night/60 backdrop-blur-md sm:p-7"
    aria-label="Check room availability"
    @submit.prevent="handleSubmit"
  >
    <p class="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-champagne/90">
      Plan your stay
    </p>
    <p class="mt-1.5 text-sm text-paper/55">
      Best rate guaranteed when you book direct.
    </p>

    <div class="mt-6 grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1.5">
        <label for="hero-check-in" class="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper/50">
          Check-in
        </label>
        <input
          id="hero-check-in"
          v-model="checkIn"
          type="date"
          required
          :min="todayIso"
          class="w-full rounded-xs border border-paper/15 bg-paper/5 px-3 py-2.5 text-sm text-paper transition-colors duration-fast [color-scheme:dark] hover:border-paper/30"
        >
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="hero-check-out" class="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper/50">
          Check-out
        </label>
        <input
          id="hero-check-out"
          v-model="checkOut"
          type="date"
          required
          :min="minCheckOut"
          class="w-full rounded-xs border border-paper/15 bg-paper/5 px-3 py-2.5 text-sm text-paper transition-colors duration-fast [color-scheme:dark] hover:border-paper/30"
        >
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="hero-guests" class="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper/50">
          Guests
        </label>
        <select
          id="hero-guests"
          v-model.number="guests"
          class="w-full rounded-xs border border-paper/15 bg-paper/5 px-3 py-2.5 text-sm text-paper transition-colors duration-fast [color-scheme:dark] hover:border-paper/30"
        >
          <option v-for="count in 4" :key="count" :value="count" class="bg-night text-paper">
            {{ count }} {{ count === 1 ? 'guest' : 'guests' }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="hero-rooms" class="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper/50">
          Rooms
        </label>
        <select
          id="hero-rooms"
          v-model.number="rooms"
          class="w-full rounded-xs border border-paper/15 bg-paper/5 px-3 py-2.5 text-sm text-paper transition-colors duration-fast [color-scheme:dark] hover:border-paper/30"
        >
          <option v-for="count in 3" :key="count" :value="count" class="bg-night text-paper">
            {{ count }} {{ count === 1 ? 'room' : 'rooms' }}
          </option>
        </select>
      </div>

      <div class="col-span-2 flex flex-col gap-1.5">
        <label for="hero-promo" class="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper/50">
          Special rate / promo code
          <span class="normal-case tracking-normal text-paper/35">(optional)</span>
        </label>
        <input
          id="hero-promo"
          v-model.trim="promoCode"
          type="text"
          autocomplete="off"
          placeholder="e.g. QWINTER"
          class="w-full rounded-xs border border-paper/15 bg-paper/5 px-3 py-2.5 text-sm text-paper placeholder:text-paper/30 transition-colors duration-fast hover:border-paper/30"
        >
      </div>
    </div>

    <BaseButton type="submit" variant="gold" class="mt-6 w-full">
      Check availability
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
