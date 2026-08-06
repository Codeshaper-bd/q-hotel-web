<template>
  <!-- Shared by the confirmation and payment-failed pages: check-in/out,
       duration, guests, and room, at a glance -->
  <div class="grid grid-cols-2 gap-x-6 gap-y-6 border border-line p-6 sm:grid-cols-5">
    <div>
      <p class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-ink/50">
        <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2 6.5h12M4 2.5v2.5M12 2.5v2.5M3.5 4h9a1 1 0 011 1v7a1 1 0 01-1 1h-9a1 1 0 01-1-1V5a1 1 0 011-1z" />
        </svg>
        Check In
      </p>
      <p class="mt-2 text-sm text-ink">{{ formatBookingDay(checkIn) }}, {{ isoToDate(checkIn).getFullYear() }}</p>
      <p class="text-sm text-ink/55">{{ checkInTime }}</p>
    </div>
    <div>
      <p class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-ink/50">
        <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2 6.5h12M4 2.5v2.5M12 2.5v2.5M3.5 4h9a1 1 0 011 1v7a1 1 0 01-1 1h-9a1 1 0 01-1-1V5a1 1 0 011-1z" />
        </svg>
        Check Out
      </p>
      <p class="mt-2 text-sm text-ink">{{ formatBookingDay(checkOut) }}, {{ isoToDate(checkOut).getFullYear() }}</p>
      <p class="text-sm text-ink/55">{{ checkOutTime }}</p>
    </div>
    <div>
      <p class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-ink/50">
        <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
          <circle cx="8" cy="8" r="6" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 4.5V8l2.5 1.5" />
        </svg>
        Duration
      </p>
      <p class="mt-2 text-sm text-ink">{{ nights }} {{ nights === 1 ? 'Night' : 'Nights' }}</p>
    </div>
    <div>
      <p class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-ink/50">
        <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12.667 14v-1.333A2.667 2.667 0 0010 10H6a2.667 2.667 0 00-2.667 2.667V14M8 7.333A2.667 2.667 0 108 2a2.667 2.667 0 000 5.333z" />
        </svg>
        Guests
      </p>
      <p class="mt-2 text-sm text-ink">{{ guestsCount }} {{ guestsCount === 1 ? 'Adult' : 'Adults' }}</p>
    </div>
    <div>
      <p class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-ink/50">
        <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M1.667 13.332V7.999c0-.442.176-.866.488-1.179.313-.312.737-.488 1.179-.488h9.333c.442 0 .866.176 1.179.488.312.313.488.737.488 1.179v5.333" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.667 6.666V4.332c0-.353.14-.693.39-.943.25-.25.59-.39.943-.39h8c.354 0 .693.14.943.39.25.25.39.59.39.943v2.334M1.334 12h13.333" />
        </svg>
        Room
      </p>
      <p class="mt-2 text-sm text-ink">{{ roomName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  checkIn: string
  checkOut: string
  nights: number
  guestsCount: number
  roomName: string
  checkInTime?: string
  checkOutTime?: string
}>(), {
  checkInTime: '2:00 PM',
  checkOutTime: '12:00 PM',
})
</script>
