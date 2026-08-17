<template>
  <div class="bg-white p-7 sm:p-10">
    <h2 class="font-display text-2xl text-ink sm:text-3xl">Reservation Timeline</h2>

    <ol class="mt-8 space-y-4">
      <li v-for="(step, index) in steps" :key="step.title" class="relative flex gap-4 pb-8 last:pb-0">
        <span v-if="index < steps.length - 1" class="absolute left-[0.6875rem] top-7 h-full w-px bg-line" aria-hidden="true" />
        <span
          :class="[
            'z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
            step.done ? 'bg-moss text-paper' : 'border border-line bg-white text-ink/40',
          ]"
          aria-hidden="true"
        >
          <svg v-if="step.done" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1.333A6.667 6.667 0 1014.667 8 6.674 6.674 0 008 1.333zm3.53 5.137l-4 4a.667.667 0 01-.943 0l-2-2a.667.667 0 11.943-.943L7 9.057l3.53-3.53a.667.667 0 01.943.943z" />
          </svg>
          <span v-else class="h-2 w-2 rounded-full bg-current" />
        </span>

        <div class="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div>
            <p :class="['font-medium', step.done ? 'text-copper' : 'text-ink']">{{ step.title }}</p>
            <p class="mt-0.5 text-sm text-ink/55">{{ step.description }}</p>
          </div>
          <p class="text-sm text-ink/50">{{ step.date }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  confirmedAtLabel: string
  checkIn: string
  checkOut: string
  checkInTime: string
  checkOutTime: string
}>()

const steps = computed(() => [
  {
    title: 'Reservation Confirmed',
    description: 'Your booking has been confirmed.',
    date: props.confirmedAtLabel,
    done: true,
  },
  {
    title: 'Confirmation Email Sent',
    description: "We've emailed your confirmation.",
    date: props.confirmedAtLabel,
    done: true,
  },
  {
    title: 'Check-in',
    description: 'We look forward to welcoming you.',
    date: `${formatBookingDay(props.checkIn)} • From ${props.checkInTime}`,
    done: false,
  },
  {
    title: 'Enjoy Your Stay',
    description: 'Relax and enjoy our facilities.',
    date: `${formatBookingDay(props.checkIn)} – ${formatBookingDay(props.checkOut)}`,
    done: false,
  },
  {
    title: 'Check-out',
    description: 'Thank you for staying with us.',
    date: `${formatBookingDay(props.checkOut)} • Until ${props.checkOutTime}`,
    done: false,
  },
])
</script>
