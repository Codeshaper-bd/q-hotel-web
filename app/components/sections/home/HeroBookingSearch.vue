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
    :class="['w-full lg:flex lg:items-center', compact ? 'relative' : '', tone === 'light' ? 'tone-light' : 'tone-dark']"
    aria-label="Check room availability"
    @submit.prevent="handleSubmit"
    @keydown.escape="openPanel = null"
  >
    <div :class="['hero-bar-glass border shadow-[0_28px_80px_-28px] lg:flex lg:h-[94px] lg:flex-1', barLayoutClass, barClass]">
      <!-- Check-In -->
      <div :class="['relative lg:flex-1', fieldWrapperClass]">
        <button
          type="button"
          :class="['hero-bar-field w-full text-left', fieldCompactClass]"
          aria-haspopup="dialog"
          :aria-expanded="openPanel === 'dates'"
          @click="togglePanel('dates')"
        >
          <span :class="['hero-bar-label', labelClass]">Check-In</span>
          <span :class="valueRowClass">
            <svg :class="['h-4 w-4 shrink-0 -translate-y-[3px]', iconClass]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5.33 1.336v2.667M10.667 1.336v2.667M12.667 2.664H3.333c-.736 0-1.333.597-1.333 1.333v9.334c0 .736.597 1.333 1.333 1.333h9.334c.736 0 1.333-.597 1.333-1.333V3.997c0-.736-.597-1.333-1.333-1.333z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 6.664h12M5.334 9.336h.007M8 9.336h.007M10.667 9.336h.006M5.334 12h.007M8 12h.007M10.667 12h.006" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span :class="['whitespace-nowrap leading-6', checkInValueClass]">{{ checkIn ? formatBookingDateShort(checkIn) : checkInPlaceholder }}</span>
          </span>
        </button>

        <div
          v-if="openPanel === 'dates'"
          :class="['absolute left-0 z-50 w-[19.5rem] max-w-[calc(100vw-2rem)] md:w-[34rem]', panelDirection === 'down' ? 'top-full mt-3' : 'bottom-full mb-3']"
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

      <div :class="dividerClass" aria-hidden="true" />

      <!-- Check-Out -->
      <div :class="['relative lg:flex-1', checkOutBorderClass, fieldWrapperClass]">
        <button
          type="button"
          :class="['hero-bar-field w-full text-left', fieldCompactClass]"
          aria-haspopup="dialog"
          :aria-expanded="openPanel === 'dates'"
          @click="togglePanel('dates')"
        >
          <span :class="['hero-bar-label', labelClass]">Check-Out</span>
          <span :class="valueRowClass">
            <svg :class="['h-4 w-4 shrink-0 -translate-y-[3px]', iconClass]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5.33 1.336v2.667M10.667 1.336v2.667M12.667 2.664H3.333c-.736 0-1.333.597-1.333 1.333v9.334c0 .736.597 1.333 1.333 1.333h9.334c.736 0 1.333-.597 1.333-1.333V3.997c0-.736-.597-1.333-1.333-1.333z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 6.664h12M5.334 9.336h.007M8 9.336h.007M10.667 9.336h.006M5.334 12h.007M8 12h.007M10.667 12h.006" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="whitespace-nowrap leading-6" :class="checkOutValueClass">
              {{ checkOut ? formatBookingDateShort(checkOut) : checkOutPlaceholder }}
            </span>
          </span>
        </button>
      </div>

      <div :class="dividerClass" aria-hidden="true" />

      <!-- Guests & Rooms -->
      <div :class="['relative lg:flex-1', guestsBorderClass, fieldWrapperClass]">
        <button
          type="button"
          :class="['hero-bar-field w-full text-left', fieldCompactClass]"
          aria-haspopup="dialog"
          :aria-expanded="openPanel === 'guests'"
          @click="togglePanel('guests')"
        >
          <!-- Phone: icon + count pairs only (rooms/guests wording returns at md) -->
          <span v-if="compact" :class="['flex items-center gap-2.5 text-xs uppercase leading-[18px] md:hidden', valueClass]">
            <span class="sr-only">{{ guestsSummary }}</span>
            <span class="flex items-center gap-1" aria-hidden="true">
              <svg :class="['h-4 w-4 shrink-0', iconClass]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M12.667 14v-1.333A2.667 2.667 0 0010 10H6a2.667 2.667 0 00-2.667 2.667V14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 7.333A2.667 2.667 0 108 2a2.667 2.667 0 000 5.333z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ totalGuests }}
            </span>
            <span class="flex items-center gap-1" aria-hidden="true">
              <svg :class="['h-4 w-4 shrink-0', iconClass]" viewBox="0 0 13 11" fill="none" aria-hidden="true">
                <path d="M3.166 3.166v4.667M.5.5v9.333M.5 3.167h9.333a2.667 2.667 0 012.667 2.666v2M.5 7.833h12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ rooms }}
            </span>
          </span>

          <span :class="['block', compact ? 'max-md:hidden' : '']">
            <span :class="['hero-bar-label', labelClass]">Guests &amp; Rooms</span>
            <span class="mt-3 flex items-center gap-2">
              <svg :class="['h-4 w-4 shrink-0 -translate-y-[3px]', iconClass]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M12.667 14v-1.333A2.667 2.667 0 0010 10H6a2.667 2.667 0 00-2.667 2.667V14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 7.333A2.667 2.667 0 108 2a2.667 2.667 0 000 5.333z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span :class="['truncate text-base leading-6', guestsValueWidthClass, placeholders ? mutedValueClass : valueClass]">{{ placeholders ? 'Select guests & rooms' : guestsSummary }}</span>
              <svg :class="['h-4 w-4 shrink-0 -translate-y-[3px]', chevronClass]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </span>
        </button>

        <div
          v-if="openPanel === 'guests'"
          :class="['absolute left-0 z-50 w-[19.5rem] max-w-[calc(100vw-2rem)]', panelDirection === 'down' ? 'top-full mt-3' : 'bottom-full mb-3']"
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

      <div v-if="showSpecialRates" :class="dividerClass" aria-hidden="true" />

      <!-- Special Rates, phone: the coupon icon, centred in its slot, opens the
           same kind of popover as Guests & Rooms. Unlike the other panels, this
           one anchors to its own slot so it sits right over the icon. -->
      <div v-if="showSpecialRates && compact" class="relative flex min-w-0 flex-1 items-center justify-center md:hidden">
        <button
          type="button"
          class="flex h-full w-full items-center justify-center"
          aria-haspopup="dialog"
          aria-label="Special rates"
          :aria-expanded="openPanel === 'rates'"
          @click="togglePanel('rates')"
        >
          <img src="/images/icons/hero-coupon.svg" alt="" width="12" height="14" class="h-3.5 w-3">
        </button>

        <div
          v-if="openPanel === 'rates'"
          :class="['absolute right-0 z-50 w-[19.5rem] max-w-[calc(100vw-2rem)] min-[560px]:left-1/2 min-[560px]:right-auto min-[560px]:-translate-x-1/2', popoverPositionClass]"
          role="dialog"
          aria-label="Enter a special rate code"
        >
          <div class="border border-champagne/25 bg-ink/95 p-5 shadow-[0_28px_80px_-28px] shadow-ink backdrop-blur-xl">
            <label for="hero-special-rates-compact" :class="['hero-bar-label', labelClass]">Special Rates</label>
            <input
              id="hero-special-rates-compact"
              ref="ratesInputRef"
              v-model.trim="promoCode"
              type="text"
              autocomplete="off"
              :class="['mt-2 h-10 w-full border border-paper/20 bg-ink/50 px-3 text-sm outline-none transition-colors duration-fast focus-visible:border-champagne/60 focus-visible:outline-none', valueClass]"
              @keydown.enter.prevent="openPanel = null"
            >
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

      <!-- Special Rates -->
      <div
        v-if="showSpecialRates"
        :class="['lg:flex-1', ratesBorderClass, compact ? 'max-md:hidden md:flex-1' : '']"
      >
        <div :class="['hero-bar-field', fieldCompactClass]">
          <label for="hero-special-rates" :class="['hero-bar-label', labelClass]">Special Rates</label>
          <div :class="['mt-1.5 flex h-[30px] items-center', rateFieldMarginClass, rateFieldClass]">
            <input
              id="hero-special-rates"
              v-model.trim="promoCode"
              type="text"
              autocomplete="off"
              :class="['h-full w-full min-w-0 border-b border-transparent bg-transparent px-2.5 text-sm leading-6 outline-none transition-colors duration-fast focus-visible:outline-none', valueClass, tone === 'light' ? 'focus-visible:border-[#A75B27]/60' : 'focus-visible:border-champagne/60']"
            >
          </div>
        </div>
      </div>
    </div>

    <BaseButton type="submit" variant="gold" :class="submitClass">
      <span :class="compact ? 'max-lg:sr-only' : ''">{{ submitLabel }}</span>
      <img
        v-if="compact"
        src="/images/icons/hero-search.svg"
        alt=""
        width="18"
        height="18"
        class="h-[18px] w-[18px] md:h-6 md:w-6 lg:hidden"
      >
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
  /** Forces the direction popover panels open. By default (omitted) it is
   *  measured against the viewport each time a panel opens: down when there
   *  is room below the bar, otherwise up */
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
  /** Hero layout below `lg`: one slim row instead of the stacked 2-column
   *  grid. Tablet keeps the four labelled fields with an inset icon Search
   *  button; phones collapse to labels + icon summaries (guests/rooms counts,
   *  coupon icon) per the Figma mobile frames. */
  compact?: boolean
}>(), {
  compact: false,
  tone: 'dark',
  submitLabel: 'Search',
  emptyState: false,
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
const openPanel = ref<'dates' | 'guests' | 'rates' | null>(null)
const ratesInputRef = ref<HTMLInputElement | null>(null)

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

// Layout lookups. Non-compact (default) keeps the stacked 2-column grid below
// `lg`; compact turns the bar into one flex row from phone width up.
//  - phone: 56px bar, auto-width fields, labels only
//  - tablet: 92px bar with room reserved on the right for the inset Search
const barLayoutClass = computed(() => props.compact
  ? 'flex h-14 max-lg:pr-[3.25rem] min-[400px]:max-lg:pr-14 md:max-lg:h-[92px] md:max-lg:pr-[5.625rem]'
  : 'grid grid-cols-2')
const fieldWrapperClass = computed(() => props.compact
  ? 'max-md:static max-md:flex-none md:flex-1'
  : '')
// Compact fields carry no stacked-grid borders — dividers separate them
const checkOutBorderClass = computed(() => props.compact
  ? ''
  : `border-l lg:border-l-0 ${dividerBorderClass.value}`)
const guestsBorderClass = computed(() => props.compact
  ? ''
  : `border-t lg:border-t-0 ${dividerBorderClass.value}`)
const ratesBorderClass = computed(() => props.compact
  ? ''
  : `border-t border-l lg:border-t-0 lg:border-l-0 ${dividerBorderClass.value}`)
const fieldCompactClass = computed(() => props.compact ? 'hero-bar-field-compact' : '')
const dividerClass = computed(() => ['hero-bar-divider', props.compact ? 'hero-bar-divider-compact' : ''])
/** Date rows disappear on phones — only the Check-In / Check-Out labels remain */
const valueRowClass = computed(() => ['mt-3 flex items-center gap-2', props.compact ? 'max-md:hidden' : ''])
/** The 140px floor keeps the empty-state placeholder readable on the stacked
 *  layouts; compact tablet fields are tight, so there the text just truncates */
const guestsValueWidthClass = computed(() => props.compact ? 'lg:min-w-[140px]' : 'min-w-[140px]')
const rateFieldMarginClass = computed(() => props.compact ? 'lg:mr-10' : 'mr-10')

// Compact: Search sits inside the bar as an icon square (phone 42px, tablet
// 58px) and returns to the overlapping text button from `lg`. `!min-h-0` and
// `!p-0` beat BaseButton's own min-height and padding.
const popoverPositionClass = computed(() => panelDirection.value === 'down' ? 'top-full mt-3' : 'bottom-full mb-3')

const submitClass = computed(() => props.compact
  ? 'whitespace-nowrap !rounded-none !tracking-normal max-lg:absolute max-lg:right-2.5 max-lg:top-1/2 max-lg:size-10 min-[400px]:max-lg:right-3.5 min-[400px]:max-lg:size-[42px] max-lg:-translate-y-1/2 max-lg:!min-h-0 max-lg:!p-0 md:max-lg:right-6 md:max-lg:size-[58px] lg:relative lg:z-10 lg:-ml-8 lg:h-[60px] lg:w-fit lg:px-8'
  : 'mt-2 w-full whitespace-nowrap !rounded-none !tracking-normal lg:relative lg:z-10 lg:-ml-8 lg:mt-0 lg:h-[60px] lg:w-fit lg:px-8')

// A custom `placeholderClass` fully replaces the default typography (it
// carries its own size/weight/color), avoiding utility-cascade conflicts
const checkInValueClass = computed(() => checkIn.value
  ? ['text-base', valueClass.value]
  : [props.placeholderClass || ['text-base', mutedValueClass.value]])

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

// Room a panel needs (the two-month calendar is the tallest)
const PANEL_CLEARANCE = 460
const panelDirection = ref<'up' | 'down'>(props.popoverDirection ?? 'up')

/** Opens toward whichever side of the bar has room in the current viewport */
function resolvePanelDirection() {
  if (props.popoverDirection) {
    panelDirection.value = props.popoverDirection
    return
  }
  if (!rootRef.value) {
    return
  }
  const bar = rootRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - bar.bottom
  const spaceAbove = bar.top
  if (spaceBelow >= PANEL_CLEARANCE) {
    panelDirection.value = 'down'
  } else if (spaceAbove >= PANEL_CLEARANCE) {
    panelDirection.value = 'up'
  } else {
    panelDirection.value = spaceBelow >= spaceAbove ? 'down' : 'up'
  }
}

function togglePanel(panel: 'dates' | 'guests' | 'rates') {
  if (openPanel.value !== panel) {
    resolvePanelDirection()
  }
  openPanel.value = openPanel.value === panel ? null : panel
  // Ready to type the moment the rates panel opens
  if (openPanel.value === 'rates') {
    void nextTick(() => ratesInputRef.value?.focus())
  }
}

function applyDates(range: { checkIn: string, checkOut: string }) {
  checkIn.value = range.checkIn
  checkOut.value = range.checkOut
  placeholders.value = false
}

function handleSubmit() {
  // An incomplete range sends the guest back to the calendar, not to an error
  if (!checkOut.value) {
    resolvePanelDirection()
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

/* Compact (hero) fields below lg: fill the slim bar's height and centre their
   content instead of relying on fixed top/bottom padding. Declared after the
   base rule at equal specificity so these win. */
@media (max-width: 1023px) {
  .hero-bar-field-compact {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 0 0.75rem;
  }
}

/* Small phones: tighter padding and 11px labels so the three fields, the
   inline promo input and the Search square all fit on one row */
@media (max-width: 399px) {
  .hero-bar-field-compact {
    padding: 0 0.5rem;
  }

  .hero-bar-field-compact .hero-bar-label {
    font-size: 11px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .hero-bar-field-compact {
    padding: 0 0.5rem 0 1rem;
  }
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
  font-family: Avenir, ui-sans-serif, system-ui, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Vertical hairline between fields — hidden on stacked mobile/tablet rows,
   shown once the bar becomes one flex row at xl */
.hero-bar-divider {
  display: none;
}

@media (min-width: 1024px) {
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

/* Compact bar: the hairlines stay visible below lg (42px on phones, 56px from
   tablet up, matching the Figma frames). Declared after the lg rule's base so
   it only has to override `display: none`. */
.hero-bar-divider-compact {
  display: flex;
  flex: none;
  width: 1px;
  align-self: center;
  height: 2.625rem;
  background-color: rgb(var(--color-paper) / 0.15);
}

@media (min-width: 768px) {
  .hero-bar-divider-compact {
    height: 3.5rem;
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
