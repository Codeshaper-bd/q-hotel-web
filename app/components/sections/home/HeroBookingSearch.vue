<template>
  <!--
    Reservation console: one dark glass bar — Check-In | Check-Out |
    Guests & Rooms | Special Rates | Search — separated by hairline
    dividers, Search overlapping the bar's trailing edge. Check-In and
    Check-Out are separate triggers that share one range-calendar popover;
    Guests & Rooms opens a stepper panel. Panels open upward (the bar sits
    near the viewport bottom), one at a time; Escape or an outside click
    closes. Stacks into a touch-friendly column on small screens.
  -->
  <form
    ref="rootRef"
    :class="['w-full xl:flex xl:items-center', tone === 'light' ? 'tone-light' : 'tone-dark']"
    aria-label="Check room availability"
    @submit.prevent="handleSubmit"
    @keydown.escape="openPanel = null"
  >
    <div :class="['hero-bar-glass grid grid-cols-1 border shadow-[0_28px_80px_-28px] sm:grid-cols-2 xl:flex xl:h-[94px] xl:flex-1', barClass]">
      <!-- Check-In -->
      <div class="relative xl:flex-1">
        <button
          type="button"
          class="hero-bar-field w-full text-left"
          aria-haspopup="dialog"
          :aria-expanded="openPanel === 'dates'"
          @click="togglePanel('dates')"
        >
          <span :class="['hero-bar-label', labelClass]">Check-In</span>
          <span class="mt-3 flex items-center gap-2">
            <svg :class="['h-4 w-4 shrink-0', iconClass]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5.33 1.336v2.667M10.667 1.336v2.667M12.667 2.664H3.333c-.736 0-1.333.597-1.333 1.333v9.334c0 .736.597 1.333 1.333 1.333h9.334c.736 0 1.333-.597 1.333-1.333V3.997c0-.736-.597-1.333-1.333-1.333z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 6.664h12M5.334 9.336h.007M8 9.336h.007M10.667 9.336h.006M5.334 12h.007M8 12h.007M10.667 12h.006" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span :class="['whitespace-nowrap leading-6', checkInValueClass]">{{ checkIn ? formatBookingDateLong(checkIn) : checkInPlaceholder }}</span>
          </span>
        </button>

        <div
          v-if="openPanel === 'dates'"
          :class="['absolute left-0 z-50 w-[19.5rem] max-w-[calc(100vw-2rem)] md:w-[34rem]', popoverDirection === 'down' ? 'top-full mt-3' : 'bottom-full mb-3']"
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

      <div class="hero-bar-divider" aria-hidden="true" />

      <!-- Check-Out -->
      <div :class="['relative border-t sm:border-l sm:border-t-0 xl:flex-1 xl:border-l-0', dividerBorderClass]">
        <button
          type="button"
          class="hero-bar-field w-full text-left"
          aria-haspopup="dialog"
          :aria-expanded="openPanel === 'dates'"
          @click="togglePanel('dates')"
        >
          <span :class="['hero-bar-label', labelClass]">Check-Out</span>
          <span class="mt-3 flex items-center gap-2">
            <svg :class="['h-4 w-4 shrink-0', iconClass]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5.33 1.336v2.667M10.667 1.336v2.667M12.667 2.664H3.333c-.736 0-1.333.597-1.333 1.333v9.334c0 .736.597 1.333 1.333 1.333h9.334c.736 0 1.333-.597 1.333-1.333V3.997c0-.736-.597-1.333-1.333-1.333z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 6.664h12M5.334 9.336h.007M8 9.336h.007M10.667 9.336h.006M5.334 12h.007M8 12h.007M10.667 12h.006" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="whitespace-nowrap leading-6" :class="checkOutValueClass">
              {{ checkOut ? formatBookingDateLong(checkOut) : checkOutPlaceholder }}
            </span>
          </span>
        </button>
      </div>

      <div class="hero-bar-divider" aria-hidden="true" />

      <!-- Guests & Rooms -->
      <div :class="['relative border-t xl:border-l-0 xl:border-t-0 xl:flex-1', dividerBorderClass]">
        <button
          type="button"
          class="hero-bar-field w-full text-left"
          aria-haspopup="dialog"
          :aria-expanded="openPanel === 'guests'"
          @click="togglePanel('guests')"
        >
          <span :class="['hero-bar-label', labelClass]">Guests &amp; Rooms</span>
          <span class="mt-3 flex items-center gap-2">
            <svg :class="['h-4 w-4 shrink-0', iconClass]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12.667 14v-1.333A2.667 2.667 0 0010 10H6a2.667 2.667 0 00-2.667 2.667V14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 7.333A2.667 2.667 0 108 2a2.667 2.667 0 000 5.333z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span :class="['truncate text-base leading-6 min-w-[140px]', placeholders ? mutedValueClass : valueClass]">{{ placeholders ? 'Select guests & rooms' : guestsSummary }}</span>
            <svg :class="['h-4 w-4 shrink-0', chevronClass]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>

        <div
          v-if="openPanel === 'guests'"
          :class="['absolute left-0 z-50 w-[19.5rem] max-w-[calc(100vw-2rem)]', popoverDirection === 'down' ? 'top-full mt-3' : 'bottom-full mb-3']"
          role="dialog"
          aria-label="Select rooms and guests"
        >
          <div class="border border-champagne/25 bg-ink/95 p-5 shadow-[0_28px_80px_-28px] shadow-ink backdrop-blur-xl">
            <p class="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-paper/45">
              Maximum {{ MAX_GUESTS_PER_ROOM }} guests per room
            </p>

            <div
              v-for="stepper in steppers"
              :key="stepper.key"
              class="flex items-center justify-between gap-6 border-b border-paper/10 py-3.5 last:border-b-0"
            >
              <div>
                <p class="text-xs text-paper">{{ stepper.title }}</p>
                <p class="text-[0.65rem] text-paper/60">{{ stepper.hint }}</p>
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
                <span class="w-5 text-center text-xs text-paper">{{ stepper.value }}</span>
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

      <div v-if="showSpecialRates" class="hero-bar-divider" aria-hidden="true" />

      <!-- Special Rates -->
      <div
        v-if="showSpecialRates"
        :class="['hero-bar-field border-t xl:flex-1 xl:border-t-0', dividerBorderClass]"
      >
        <label for="hero-special-rates" :class="['hero-bar-label', labelClass]">Special Rates</label>
        <div :class="['mt-1.5 flex h-[30px] items-center mr-10', rateFieldClass]">
          <input
            id="hero-special-rates"
            v-model.trim="promoCode"
            type="text"
            autocomplete="off"
            placeholder="Optional"
            :class="['h-full w-full min-w-0 border bg-transparent px-2.5 text-sm leading-6 outline-none transition-colors duration-fast focus-visible:outline-none focus:border-champagne/60', valueClass, tone === 'light' ? 'border-ink/15 placeholder:text-ink/40' : 'border-champagne/30 placeholder:text-paper/40']"
          >
        </div>
      </div>
    </div>

    <BaseButton type="submit" variant="gold" class="mt-2 w-full !rounded-none !tracking-normal xl:relative xl:z-10 xl:-ml-8 xl:mt-0 xl:h-[60px] xl:w-[7.5rem]">
      {{ submitLabel }} 
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'

const props = withDefaults(defineProps<{
  /** `dark` (default) matches the hero's glass bar; `light` is the white,
   *  champagne-bordered bar used on the /rooms listing banner */
  tone?: 'dark' | 'light'
  submitLabel?: string
  /** Seeds the console from a previously submitted search (e.g. handed off
   *  from the hero into the /rooms page) instead of today/tomorrow defaults */
  initialQuery?: BookingSearchQuery
  /** Which way the popover panels open: `up` (default — the hero bar sits
   *  near the viewport bottom) or `down` (the /rooms banner bar sits near
   *  the page top, so an upward panel would extend off the viewport) */
  popoverDirection?: 'up' | 'down'
  /** Hides the Special Rates promo-code field (and its divider) — used on
   *  the long-stays banner, where rate offers are handled differently */
  showSpecialRates?: boolean
  /** Placeholder text in the check-in field until a date is picked (only
   *  visible with `emptyState` and no handed-off search) */
  checkInPlaceholder?: string
  /** Same for the check-out field */
  checkOutPlaceholder?: string
  /** Extra classes for the date placeholder text; when set, they replace the
   *  default typography (size/weight/color) so custom styling wins cleanly */
  placeholderClass?: string
  /** Starts the console empty: check-in, check-out and guests fields show
   *  "Select date" / "Select guests & rooms" placeholders until the guest
   *  picks something. Used on the /rooms banner, where a plain nav link must
   *  never display a stale or assumed selection. */
  emptyState?: boolean
}>(), {
  tone: 'dark',
  submitLabel: 'Search',
  emptyState: false,
  popoverDirection: 'up',
  showSpecialRates: true,
  checkInPlaceholder: 'Select date',
  checkOutPlaceholder: 'Select date',
  placeholderClass: '',
})

const emit = defineEmits<{
  search: [query: BookingSearchQuery]
}>()

const MAX_ROOMS = 3
const MAX_GUESTS_PER_ROOM = 8
const MAX_CHILDREN = 6

const rootRef = ref<HTMLElement | null>(null)
const openPanel = ref<'dates' | 'guests' | null>(null)

// Default stay: tonight, one night — the console is always submittable.
// A handed-off `initialQuery` (e.g. from the hero into the /rooms page)
// seeds these instead; with `emptyState` and no handed-off search the
// fields start blank and only show a real value once something is chosen.
const startEmpty = props.emptyState && !props.initialQuery
const checkIn = ref(props.initialQuery?.checkIn ?? (startEmpty ? '' : todayIsoDate()))
const checkOut = ref(props.initialQuery?.checkOut ?? (startEmpty ? '' : addDaysIso(todayIsoDate(), 1)))
const rooms = ref(props.initialQuery?.rooms ?? 1)
const adults = ref(props.initialQuery?.adults ?? 2)
const children = ref(props.initialQuery?.children ?? 0)
const promoCode = ref(props.initialQuery?.promoCode ?? '')

/** The guests field shows placeholders until the guest makes a selection */
const placeholders = ref(startEmpty)

// Tone-driven class lookups (mirrors BaseArrowCta's variant maps): the dark
// glass hero bar vs. the white, champagne-bordered bar on the /rooms banner
const barClass = computed(() => props.tone === 'light'
  ? 'border-champagne bg-white shadow-ink/15'
  : 'border-champagne/45 bg-ink/60 shadow-ink/90')
const labelClass = computed(() => props.tone === 'light' ? 'text-ink/60' : 'text-paper/70')
const iconClass = computed(() => props.tone === 'light' ? 'text-ink/70' : 'text-paper')
const valueClass = computed(() => props.tone === 'light' ? 'text-ink' : 'text-paper')
const mutedValueClass = computed(() => props.tone === 'light' ? 'text-ink/40' : 'text-paper/50')
const chevronClass = computed(() => props.tone === 'light' ? 'text-ink/50' : 'text-paper/70')
const dividerBorderClass = computed(() => props.tone === 'light' ? 'border-ink/10' : 'border-paper/10')
const rateFieldClass = computed(() => props.tone === 'light'
  ? 'bg-white'
  : 'bg-ink/50')

// A custom `placeholderClass` fully replaces the default typography (it
// carries its own size/weight/color), avoiding utility-cascade conflicts
const checkInValueClass = computed(() => checkIn.value
  ? ['text-sm font-medium', valueClass.value]
  : [props.placeholderClass || ['text-sm font-medium', mutedValueClass.value]])

const checkOutValueClass = computed(() => checkOut.value
  ? ['text-base', valueClass.value]
  : [props.placeholderClass || ['text-base', mutedValueClass.value]])

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
    change: delta => {
      rooms.value += delta
      placeholders.value = false
    },
  },
  {
    key: 'adults',
    title: 'Adults',
    hint: `Max: ${MAX_GUESTS_PER_ROOM} total guests/room`,
    value: adults.value,
    canDecrease: adults.value > 1,
    canIncrease: totalGuests.value < guestCapacity.value,
    change: delta => {
      adults.value += delta
      placeholders.value = false
    },
  },
  {
    key: 'children',
    title: 'Children',
    hint: `Max: ${MAX_CHILDREN} children`,
    value: children.value,
    canDecrease: children.value > 0,
    canIncrease: children.value < MAX_CHILDREN && totalGuests.value < guestCapacity.value,
    change: delta => {
      children.value += delta
      placeholders.value = false
    },
  },
])

function togglePanel(panel: 'dates' | 'guests') {
  openPanel.value = openPanel.value === panel ? null : panel
}

function applyDates(range: { checkIn: string, checkOut: string }) {
  checkIn.value = range.checkIn
  checkOut.value = range.checkOut
  placeholders.value = false
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
/* Glass blur on a dedicated ::before instead of backdrop-filter on the bar
   itself: backdrop-filter would make the bar a stacking context and cap the
   calendar/guests popovers below the fixed header's z-index, hiding the
   calendar behind it. The ::before blurs the same backdrop while leaving
   the bar's stacking order untouched. */
.hero-bar-glass {
  position: relative;
}

.hero-bar-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

/* Bar field: no box of its own — the bar is one surface, fields separated by
   hairline dividers, warming softly under the pointer */
.hero-bar-field {
  display: block;
  /* 20px top/bottom exactly fills the bar's fixed 94px height (20 + label 18
     + gap + value/rate-box + 20 = 94 for both field shapes), matching the
     Figma spec's symmetric vertical centering instead of block flow's
     top-aligned default */
  padding: 1.25rem 1rem;
  transition: background-color var(--duration-fast) var(--ease-premium);
}

.tone-dark .hero-bar-field:hover {
  background-color: rgb(var(--color-paper) / 0.04);
}

.tone-light .hero-bar-field:hover {
  background-color: rgb(var(--color-ink) / 0.04);
}

/* Color comes from the tone-driven `labelClass`/`valueClass` etc. utility
   classes in the template — this rule only owns the shared typography */
.hero-bar-label {
  display: block;
  font-family: Satoshi, ui-sans-serif, system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-transform: uppercase;
  white-space: nowrap;
  color:#8A8A8A;
}

/* Vertical hairline between fields — hidden on stacked mobile/tablet rows,
   shown once the bar becomes one flex row at xl */
.hero-bar-divider {
  display: none;
}

@media (min-width: 1280px) {
  .hero-bar-divider {
    display: flex;
    flex: none;
    width: 1px;
    align-self: center;
    height: 3.5rem;
    background-color: rgb(var(--color-paper) / 0.15);
  }

  .tone-light .hero-bar-divider {
    background-color: rgb(var(--color-ink) / 0.12);
  }
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
