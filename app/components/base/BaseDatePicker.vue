<template>
  <!--
    Reusable single-date picker: a trigger styled like the project's form
    inputs opens a light popover calendar (past days disabled, opens on the
    selected month). Selection closes the popover and emits an ISO date.
    Escape and outside clicks close it; focus returns to the trigger.
  -->
  <div ref="rootRef" class="relative">
    <button
      ref="triggerRef"
      type="button"
      :id="id"
      class="picker-trigger"
      :aria-expanded="open"
      aria-haspopup="dialog"
      @click="toggle"
    >
      <span :class="modelValue ? 'text-[#272727]' : 'text-[#373737]'">
        {{ modelValue ? formatDisplay(modelValue) : placeholder }}
      </span>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        class="pointer-events-none size-4 text-[#777]"
        stroke="currentColor"
        stroke-width="1.4"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </svg>
    </button>

    <div
      v-if="open"
      class="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-[290px] max-w-[calc(100vw-2.5rem)] border border-[#E5DBC4] bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
      role="dialog"
      aria-label="Choose a date"
    >
      <div class="flex items-center justify-between gap-2">
        <button
          type="button"
          class="date-picker-nav"
          :disabled="monthOffset <= 0"
          aria-label="Previous month"
          @click="monthOffset -= 1"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M7.5 3L4.5 6l3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <p class="flex-1 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink">
          {{ currentMonth.label }}
        </p>

        <button
          type="button"
          class="date-picker-nav"
          :disabled="monthOffset >= MAX_MONTHS_AHEAD"
          aria-label="Next month"
          @click="monthOffset += 1"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M4.5 3l3 3-3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <div class="mt-3 grid grid-cols-7 gap-y-1 text-center">
        <span
          v-for="weekday in WEEKDAYS"
          :key="weekday"
          class="py-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#505155]"
        >
          {{ weekday }}
        </span>
        <template v-for="(cell, cellIndex) in currentMonth.cells" :key="cellIndex">
          <span v-if="!cell" />
          <button
            v-else
            type="button"
            :disabled="cell.disabled"
            :class="dayClass(cell)"
            :aria-label="formatDisplay(cell.iso)"
            :aria-pressed="cell.iso === modelValue"
            @click="select(cell.iso)"
          >
            {{ cell.day }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CalendarCell {
  iso: string
  day: number
  disabled: boolean
}

const props = withDefaults(
  defineProps<{
    /** ISO date (YYYY-MM-DD) or empty */
    modelValue: string
    /** id for the trigger button (label association) */
    id?: string
    /** Shown when no date is selected */
    placeholder?: string
    /** Minimum selectable date (ISO); defaults to today */
    min?: string
  }>(),
  {
    placeholder: "Select date",
    min: "",
  },
)

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MAX_MONTHS_AHEAD = 12

const open = ref(false)
const monthOffset = ref(0)

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)

const minIso = computed(() => props.min || todayIsoDate())

const months = computed(() => {
  const now = new Date()
  const first = new Date(now.getFullYear(), now.getMonth() + monthOffset.value, 1)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()

  const cells: Array<CalendarCell | null> = Array.from({ length: first.getDay() }, () => null)
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = toIsoDate(new Date(first.getFullYear(), first.getMonth(), day))
    cells.push({ iso, day, disabled: iso < minIso.value })
  }

  return {
    key: `${first.getFullYear()}-${first.getMonth()}`,
    label: first.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    cells,
  }
})

const currentMonth = computed(() => months.value)

function toggle() {
  if (open.value) {
    close()
  }
  else {
    // Reopen on the selected month so the current choice is always in view
    monthOffset.value = initialOffset()
    open.value = true
  }
}

function initialOffset(): number {
  if (!props.modelValue) {
    return 0
  }
  const now = new Date()
  const start = isoToDate(props.modelValue)
  return Math.max(0, (start.getFullYear() - now.getFullYear()) * 12 + start.getMonth() - now.getMonth())
}

function select(iso: string) {
  emit("update:modelValue", iso)
  close()
}

function close() {
  open.value = false
  triggerRef.value?.focus()
}

function formatDisplay(iso: string): string {
  return isoToDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function dayClass(cell: CalendarCell): string[] {
  const classes = [
    "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors duration-fast",
  ]
  if (cell.disabled) {
    classes.push("cursor-not-allowed text-[#B9B9B9]")
  }
  else if (cell.iso === props.modelValue) {
    classes.push("bg-[#C87532] font-semibold text-white")
  }
  else {
    classes.push("text-ink hover:bg-[#F5EDDF]")
  }
  return classes
}

function onPointerDownOutside(event: PointerEvent) {
  if (open.value && rootRef.value && !rootRef.value.contains(event.target as Node)) {
    open.value = false
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && open.value) {
    event.preventDefault()
    close()
  }
}

onMounted(() => {
  document.addEventListener("pointerdown", onPointerDownOutside)
  document.addEventListener("keydown", onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDownOutside)
  document.removeEventListener("keydown", onKeydown)
})
</script>

<style scoped>
.picker-trigger {
  display: flex;
  height: 52px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border: 1px solid #c9c9c9;
  background: #fff;
  padding: 0 0.875rem;
  text-align: left;
  font-size: 1rem;
  transition: border-color 200ms var(--ease-premium);
}

.picker-trigger:hover {
  border-color: #a9a9a9;
}

.picker-trigger:focus-visible {
  border-color: #c87532;
  outline: 2px solid #c87532;
  outline-offset: -2px;
}

.date-picker-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
  border: 1px solid rgb(var(--color-line));
  color: rgb(var(--color-ink) / 0.8);
  transition: border-color var(--duration-fast) var(--ease-premium), opacity var(--duration-fast) var(--ease-premium);
}

.date-picker-nav:hover:not(:disabled) {
  border-color: rgb(200 117 50 / 0.6);
}

.date-picker-nav:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>