<template>
  <!--
    Date-range calendar for the reservation console: dark glass on the home
    hero, white on secondary pages. Two months side by side from md up, one
    on small screens. First tap sets check-in, a later date completes the
    range, an earlier date restarts it.
  -->
  <div
    :class="[
      'p-5 backdrop-blur-xl',
      isLight
        ? 'bg-white text-ink shadow-[0_20px_60px_-20px_rgba(255,255,255,0.9),0_10px_30px_-10px_rgba(15,15,16,0.12)]'
        : 'bg-night/95 text-paper shadow-[0_20px_60px_-20px_rgba(255,255,255,0.28)]',
    ]"
  >
    <div class="flex items-center justify-between gap-2">
      <button
        type="button"
        :class="['hero-cal-nav', isLight ? 'hero-cal-nav-light' : '']"
        :disabled="monthOffset <= 0"
        aria-label="Previous month"
        @click="monthOffset -= 1"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M7.5 3L4.5 6l3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="flex flex-1">
        <p
          v-for="(month, index) in months"
          :key="month.key"
          :class="[
            'flex-1 text-center text-[0.75rem] font-bold uppercase tracking-[0.28em]',
            isLight ? 'text-ink/70' : 'text-champagne/75',
            index === 1 ? 'hidden md:block' : '',
          ]"
        >
          {{ month.label }}
        </p>
      </div>
      <button
        type="button"
        :class="['hero-cal-nav', isLight ? 'hero-cal-nav-light' : '']"
        :disabled="monthOffset >= MAX_MONTHS_AHEAD"
        aria-label="Next month"
        @click="monthOffset += 1"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4.5 3l3 3-3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div
        v-for="(month, index) in months"
        :key="month.key"
        :class="index === 1 ? 'hidden md:block' : ''"
      >
        <div class="grid grid-cols-7 gap-y-1 text-center">
          <span
            v-for="weekday in WEEKDAYS"
            :key="`${month.key}-${weekday}`"
            :class="[
              'py-1 text-[0.7rem] font-bold uppercase tracking-[0.08em]',
              isLight ? 'text-ink/50' : 'text-paper/40',
            ]"
          >
            {{ weekday }}
          </span>
          <template v-for="(cell, cellIndex) in month.cells" :key="`${month.key}-${cellIndex}`">
            <span v-if="!cell" />
            <button
              v-else
              type="button"
              :disabled="cell.disabled"
              :class="dayClass(cell)"
              :aria-label="formatBookingDay(cell.iso)"
              :aria-pressed="cell.iso === checkIn || cell.iso === checkOut"
              @click="handleDaySelect(cell.iso)"
            >
              {{ cell.day }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <div class="mt-5 flex justify-center">
      <button
        type="button"
        :class="[
          'border px-10 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-fast',
          isLight
            ? 'border-[#E5DBC4] text-ink hover:border-copper hover:bg-copper/10'
            : 'border-champagne/50 text-paper hover:border-champagne hover:bg-champagne/10',
        ]"
        @click="emit('close')"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CalendarCell {
  iso: string
  day: number
  disabled: boolean
}

interface CalendarMonth {
  key: string
  label: string
  cells: Array<CalendarCell | null>
}

const props = withDefaults(defineProps<{
  /** ISO date or empty */
  checkIn: string
  /** ISO date or empty */
  checkOut: string
  /** Dark on the home hero, light on the secondary-page consoles */
  tone?: 'dark' | 'light'
}>(), {
  tone: 'dark',
})

const isLight = computed(() => props.tone === 'light')

const emit = defineEmits<{
  change: [range: { checkIn: string, checkOut: string }]
  close: []
}>()

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MAX_MONTHS_AHEAD = 17

const todayIso = todayIsoDate()

// Open on the check-in month so the current selection is always in view
const monthOffset = ref(initialOffset())

function initialOffset(): number {
  if (!props.checkIn) {
    return 0
  }
  const now = new Date()
  const start = isoToDate(props.checkIn)
  return Math.max(0, (start.getFullYear() - now.getFullYear()) * 12 + start.getMonth() - now.getMonth())
}

const months = computed<CalendarMonth[]>(() => [0, 1].map((index) => {
  const now = new Date()
  const first = new Date(now.getFullYear(), now.getMonth() + monthOffset.value + index, 1)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()

  const cells: Array<CalendarCell | null> = Array.from({ length: first.getDay() }, () => null)
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = toIsoDate(new Date(first.getFullYear(), first.getMonth(), day))
    cells.push({ iso, day, disabled: iso < todayIso })
  }

  return {
    key: `${first.getFullYear()}-${first.getMonth()}`,
    label: first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    cells,
  }
}))

function isBetween(iso: string): boolean {
  return Boolean(props.checkIn && props.checkOut && iso > props.checkIn && iso < props.checkOut)
}

function dayClass(cell: CalendarCell): string[] {
  const classes = ['mx-auto flex h-9 w-9 items-center justify-center rounded-full text-base font-semibold transition-colors duration-fast']
  if (cell.disabled) {
    classes.push(isLight ? 'cursor-not-allowed text-ink/25' : 'cursor-not-allowed text-paper/20')
  }
  else if (cell.iso === props.checkIn || cell.iso === props.checkOut) {
    classes.push('bg-champagne font-semibold text-night')
  }
  else if (isBetween(cell.iso)) {
    classes.push(isLight ? 'bg-champagne/20 text-ink' : 'bg-champagne/15 text-paper')
  }
  else {
    classes.push(isLight ? 'text-ink/80 hover:bg-ink/5' : 'text-paper/80 hover:bg-paper/10')
  }
  return classes
}

function handleDaySelect(iso: string) {
  // A completed range (or a tap on/before the current start) begins a new
  // stay; otherwise the tap completes the range
  if (!props.checkIn || props.checkOut || iso <= props.checkIn) {
    emit('change', { checkIn: iso, checkOut: '' })
  }
  else {
    emit('change', { checkIn: props.checkIn, checkOut: iso })
  }
}
</script>

<style scoped>
.hero-cal-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
  border: 1px solid rgb(var(--color-paper) / 0.2);
  color: rgb(var(--color-paper) / 0.8);
  transition: border-color var(--duration-fast) var(--ease-premium), opacity var(--duration-fast) var(--ease-premium);
}

.hero-cal-nav-light {
  border-color: rgb(var(--color-ink) / 0.2);
  color: rgb(var(--color-ink) / 0.8);
}

.hero-cal-nav.hero-cal-nav-light:hover:not(:disabled) {
  border-color: rgb(var(--color-copper) / 0.6);
}

.hero-cal-nav:hover:not(:disabled) {
  border-color: rgb(var(--color-champagne) / 0.6);
}

.hero-cal-nav:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
