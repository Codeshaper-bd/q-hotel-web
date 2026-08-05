<template>
  <!--
    Thin status strip directly under the fixed header: the dates/price this
    checkout is for, plus a real countdown so "held" reads as literally true
    rather than decorative copy.
  -->
  <div class="border-b border-line bg-paper pb-5 pt-[calc(var(--header-height)+1.5rem)]">
    <BaseContainer size="xl">
      <div class="flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
        <div class="flex flex-wrap items-center gap-x-10 gap-y-3">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.08em] text-ink/50">Stay Dates</p>
            <p class="mt-1 text-base text-ink">{{ dateRangeLabel }}</p>
          </div>
          <div class="hidden h-9 w-px bg-line sm:block" aria-hidden="true" />
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.08em] text-ink/50">Total Stay</p>
            <p class="mt-1 text-base text-ink">${{ totalPrice.toLocaleString('en-US') }}</p>
          </div>
        </div>

        <p class="flex items-center gap-2 text-sm font-medium text-copper">
          <svg class="h-[18px] w-[18px] shrink-0" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
            <circle cx="9" cy="9" r="7" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5.5V9l2.5 1.5" />
          </svg>
          Room(s) held for {{ countdownLabel }}
        </p>
      </div>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  checkIn: string
  checkOut: string
  totalPrice: number
}>()

const dateRangeLabel = computed(() => {
  const year = isoToDate(props.checkOut).getFullYear()
  return `${formatBookingDay(props.checkIn)} – ${formatBookingDay(props.checkOut)}, ${year}`
})

// A real countdown, not just copy: 15 minutes, same hold window most PMS
// integrations use, ticking down for as long as this checkout stays open.
const HOLD_SECONDS = 15 * 60
const secondsLeft = ref(HOLD_SECONDS)
let intervalId: ReturnType<typeof setInterval> | undefined

const countdownLabel = computed(() => {
  const minutes = Math.floor(secondsLeft.value / 60)
  const seconds = secondsLeft.value % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
})

onMounted(() => {
  intervalId = setInterval(() => {
    secondsLeft.value = Math.max(0, secondsLeft.value - 1)
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>
