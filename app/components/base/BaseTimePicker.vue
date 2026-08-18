<template>
  <!--
    Reusable time picker: a trigger styled like the project's form inputs
    opens a popover list of 30-minute slots. Selection closes the popover and
    emits 24-hour "HH:MM". Escape and outside clicks close it; focus returns
    to the trigger.
  -->
  <div ref="rootRef" class="relative">
    <button
      ref="triggerRef"
      type="button"
      :id="id"
      class="picker-trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
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
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    </button>

    <div
      v-if="open"
      class="absolute left-0 top-[calc(100%+0.5rem)] z-30 max-h-[280px] w-full min-w-[180px] overflow-y-auto border border-[#E5DBC4] bg-white py-1 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
      role="listbox"
      aria-label="Choose a time"
    >
      <button
        v-for="slot in slots"
        :key="slot"
        type="button"
        role="option"
        :aria-selected="slot === modelValue"
        :class="[
          'flex w-full items-center justify-between px-4 py-2.5 text-base transition-colors duration-fast',
          slot === modelValue
            ? 'bg-[#C87532]/10 font-semibold text-[#A75B27]'
            : 'text-[#272727] hover:bg-[#F5EDDF]',
        ]"
        @click="select(slot)"
      >
        {{ formatDisplay(slot) }}
        <svg
          v-if="slot === modelValue"
          viewBox="0 0 20 20"
          fill="none"
          class="size-4 text-[#A75B27]"
          stroke="currentColor"
          stroke-width="1.6"
          aria-hidden="true"
        >
          <path d="m4 10.5 4 4L16 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** 24-hour "HH:MM" or empty */
    modelValue: string
    /** id for the trigger button (label association) */
    id?: string
    /** Shown when no time is selected */
    placeholder?: string
    /** First slot as "HH:MM" (24-hour) */
    start?: string
    /** Last slot as "HH:MM" (24-hour) */
    end?: string
    /** Minutes between slots */
    stepMinutes?: number
  }>(),
  {
    placeholder: "Select time",
    start: "10:00",
    end: "23:30",
    stepMinutes: 30,
  },
)

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()

const open = ref(false)

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)

/** Parse "HH:MM" into minutes since midnight */
function toMinutes(hhmm: string): number {
  const [hour, minute] = hhmm.split(":")
  return Number(hour) * 60 + Number(minute)
}

/** 30-minute slots between start and end (both inclusive) */
const slots = computed(() => {
  const startMinutes = toMinutes(props.start)
  const endMinutes = toMinutes(props.end)
  const total = Math.floor((endMinutes - startMinutes) / props.stepMinutes)

  return Array.from({ length: total + 1 }, (_, index) => {
    const minutes = startMinutes + index * props.stepMinutes
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`
  })
})

function toggle() {
  if (open.value) {
    close()
  }
  else {
    open.value = true
  }
}

function select(slot: string) {
  emit("update:modelValue", slot)
  close()
}

function close() {
  open.value = false
  triggerRef.value?.focus()
}

function formatDisplay(hhmm: string): string {
  const [hour, minute] = hhmm.split(":")
  const hourNumber = Number(hour)
  const period = hourNumber >= 12 ? "PM" : "AM"
  const hour12 = hourNumber % 12 || 12
  return `${hour12}:${minute} ${period}`
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
</style>