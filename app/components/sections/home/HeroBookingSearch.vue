<template>
  <!--
    Reservation bar: one seamless dark console with hairline dividers —
    Check-in | Check-out | Guests & Rooms | Promo Code | Search. The two date
    fields share a range-calendar popover; Guests & Rooms opens a stepper
    panel; promo code is a plain input. Panels open upward (the bar lives at
    the viewport bottom), one at a time; Escape or an outside click closes.
    Stacks into a touch-friendly column on small screens.
  -->
  <form
    ref="rootRef"
    class="w-full border border-champagne/25 bg-night/65 p-2 shadow-[0_28px_80px_-28px] shadow-night/90 backdrop-blur-xl xl:flex xl:items-stretch"
    aria-label="Check room availability"
    @submit.prevent="handleSubmit"
    @keydown.escape="openPanel = null"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:flex-1">
      <!-- Check-in & Check-out: one field, one range calendar -->
      <div class="relative sm:col-span-2 xl:flex-[1.7]">
        <button
          type="button"
          class="hero-bar-field w-full text-left"
          aria-haspopup="dialog"
          :aria-expanded="openPanel === 'dates'"
          @click="togglePanel('dates')"
        >
          <span class="hero-bar-label">Check-in — Check-out</span>
          <span class="mt-1.5 flex items-center gap-2.5">
            <svg class="h-4 w-4 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span class="whitespace-nowrap text-sm text-paper">{{ formatBookingDateLong(checkIn) }}</span>
            <svg class="h-3 w-3 shrink-0 text-champagne/60" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="whitespace-nowrap text-sm" :class="checkOut ? 'text-paper' : 'text-paper/50'">
              {{ checkOut ? formatBookingDateLong(checkOut) : 'Select date' }}
            </span>
          </span>
        </button>

        <div
          v-if="openPanel === 'dates'"
          class="absolute bottom-full left-0 z-30 mb-3 w-[19.5rem] max-w-[calc(100vw-2rem)] md:w-[34rem]"
          role="dialog"
          aria-label="Select stay dates"
        >
          <HeroBookingCalendar
            :check-in="checkIn"
            :check-out="checkOut"
            @change="applyDates"
            @close="openPanel = null"
          />
        </div>
      </div>

      <!-- Guests & Rooms -->
      <div class="relative border-t border-paper/10 xl:border-l xl:border-t-0 xl:flex-[1.15]">
        <button
          type="button"
          class="hero-bar-field w-full text-left"
          aria-haspopup="dialog"
          :aria-expanded="openPanel === 'guests'"
          @click="togglePanel('guests')"
        >
          <span class="hero-bar-label">Guests &amp; Rooms</span>
          <span class="mt-1.5 flex items-center gap-2.5">
            <svg class="h-4 w-4 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span class="truncate text-sm text-paper">{{ guestsSummary }}</span>
            <svg class="h-3 w-3 shrink-0 text-paper/60" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>

        <div
          v-if="openPanel === 'guests'"
          class="absolute bottom-full left-0 z-30 mb-3 w-[19.5rem] max-w-[calc(100vw-2rem)]"
          role="dialog"
          aria-label="Select rooms and guests"
        >
          <div class="border border-champagne/25 bg-night/95 p-5 shadow-[0_28px_80px_-28px] shadow-night backdrop-blur-xl">
            <p class="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-paper/45">
              Maximum {{ MAX_GUESTS_PER_ROOM }} guests per room
            </p>

            <div
              v-for="stepper in steppers"
              :key="stepper.key"
              class="flex items-center justify-between gap-6 border-b border-paper/10 py-3.5 last:border-b-0"
            >
              <div>
                <p class="text-sm text-paper">{{ stepper.title }}</p>
                <p class="text-[0.65rem] text-paper/45">{{ stepper.hint }}</p>
              </div>
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="hero-step-btn"
                  :disabled="!stepper.canDecrease"
                  :aria-label="`Decrease ${stepper.title}`"
                  @click="stepper.change(-1)"
                >
                  <svg class="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6h7" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
                  </svg>
                </button>
                <span class="w-5 text-center text-sm text-paper">{{ stepper.value }}</span>
                <button
                  type="button"
                  class="hero-step-btn"
                  :disabled="!stepper.canIncrease"
                  :aria-label="`Increase ${stepper.title}`"
                  @click="stepper.change(1)"
                >
                  <svg class="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6h7M6 2.5v7" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-4 flex justify-center">
              <button
                type="button"
                class="border border-champagne/50 px-10 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-paper transition-colors duration-fast hover:border-champagne hover:bg-champagne/10"
                @click="openPanel = null"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Promo code -->
      <div class="hero-bar-field border-t border-paper/10 sm:border-l xl:border-t-0 xl:flex-1">
        <label for="hero-promo" class="hero-bar-label">Promo Code</label>
        <div class="mt-1.5 flex items-center gap-2.5">
          <svg class="h-4 w-4 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <input
            id="hero-promo"
            v-model.trim="promoCode"
            type="text"
            autocomplete="off"
            placeholder="Optional"
            class="w-full min-w-0 bg-transparent text-sm text-paper placeholder:text-paper/40"
          >
        </div>
      </div>
    </div>

    <BaseButton type="submit" variant="gold" class="mt-2 w-full xl:ml-2 xl:mt-0 xl:w-auto xl:self-stretch xl:px-8">
      Search
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'

const emit = defineEmits<{
  search: [query: BookingSearchQuery]
}>()

const MAX_ROOMS = 3
const MAX_GUESTS_PER_ROOM = 8
const MAX_CHILDREN = 6

const rootRef = ref<HTMLElement | null>(null)
const openPanel = ref<'dates' | 'guests' | null>(null)

// Default stay: tonight, one night — the console is always submittable
const checkIn = ref(todayIsoDate())
const checkOut = ref(addDaysIso(todayIsoDate(), 1))
const rooms = ref(1)
const adults = ref(2)
const children = ref(0)
const promoCode = ref('')

const totalGuests = computed(() => adults.value + children.value)

const guestsSummary = computed(() => {
  const guests = `${totalGuests.value} ${totalGuests.value === 1 ? 'Guest' : 'Guests'}`
  const roomsPart = `${rooms.value} ${rooms.value === 1 ? 'Room' : 'Rooms'}`
  return `${guests}, ${roomsPart}`
})

/** Total guests may not exceed the per-room maximum across booked rooms */
const guestCapacity = computed(() => MAX_GUESTS_PER_ROOM * rooms.value)

interface StepperRow {
  key: string
  title: string
  hint: string
  value: number
  canDecrease: boolean
  canIncrease: boolean
  change: (delta: number) => void
}

const steppers = computed<StepperRow[]>(() => [
  {
    key: 'rooms',
    title: 'Rooms',
    hint: `Max: ${MAX_ROOMS} rooms`,
    value: rooms.value,
    canDecrease: rooms.value > 1 && totalGuests.value <= MAX_GUESTS_PER_ROOM * (rooms.value - 1),
    canIncrease: rooms.value < MAX_ROOMS,
    change: delta => (rooms.value += delta),
  },
  {
    key: 'adults',
    title: 'Adults',
    hint: `Max: ${MAX_GUESTS_PER_ROOM} total guests/room`,
    value: adults.value,
    canDecrease: adults.value > 1,
    canIncrease: totalGuests.value < guestCapacity.value,
    change: delta => (adults.value += delta),
  },
  {
    key: 'children',
    title: 'Children',
    hint: `Max: ${MAX_CHILDREN} children`,
    value: children.value,
    canDecrease: children.value > 0,
    canIncrease: children.value < MAX_CHILDREN && totalGuests.value < guestCapacity.value,
    change: delta => (children.value += delta),
  },
])

function togglePanel(panel: 'dates' | 'guests') {
  openPanel.value = openPanel.value === panel ? null : panel
}

function applyDates(range: { checkIn: string, checkOut: string }) {
  checkIn.value = range.checkIn
  checkOut.value = range.checkOut
}

function handleSubmit() {
  // An incomplete range sends the guest back to the calendar, not to an error
  if (!checkOut.value) {
    openPanel.value = 'dates'
    return
  }
  openPanel.value = null
  emit('search', {
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    rooms: rooms.value,
    adults: adults.value,
    children: children.value,
    promoCode: promoCode.value,
  })
}

// Close panels on any click outside the console (same pattern as AppHeader)
function handleDocumentClick(event: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    openPanel.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style scoped>
/* Bar field: no box of its own — the bar is one surface, fields separated by
   hairline dividers, warming softly under the pointer */
.hero-bar-field {
  display: block;
  padding: 0.875rem 1.375rem 1rem;
  transition: background-color var(--duration-fast) var(--ease-premium);
}

.hero-bar-field:hover {
  background-color: rgb(var(--color-paper) / 0.04);
}

.hero-bar-label {
  display: block;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  white-space: nowrap;
  color: rgb(var(--color-champagne) / 0.6);
}

/* Stepper buttons: quiet rounds that warm on hover */
.hero-step-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
  border: 1px solid rgb(var(--color-paper) / 0.25);
  color: rgb(var(--color-paper) / 0.85);
  transition: border-color var(--duration-fast) var(--ease-premium), opacity var(--duration-fast) var(--ease-premium);
}

.hero-step-btn:hover:not(:disabled) {
  border-color: rgb(var(--color-champagne) / 0.6);
}

.hero-step-btn:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
