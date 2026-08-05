<template>
  <div class="bg-white p-7 sm:p-10">
    <h2 class="font-display text-2xl text-ink sm:text-[1.75rem]">Stay Details</h2>
    <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 border border-line p-6 sm:grid-cols-5">
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
        <p class="mt-2 text-sm text-ink">{{ room.name }}</p>
      </div>
    </div>

    <h2 class="mt-10 font-display text-2xl text-ink sm:text-[1.75rem]">Guest Information</h2>
    <div class="mt-6 grid gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-2">
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">First Name</p>
        <p class="mt-1 text-sm text-ink">{{ guest.firstName || '—' }}</p>
      </div>
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Last Name</p>
        <p class="mt-1 text-sm text-ink">{{ guest.lastName || '—' }}</p>
      </div>
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Email Address</p>
        <p class="mt-1 text-sm text-ink">{{ guest.email || '—' }}</p>
      </div>
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Phone Number</p>
        <p class="mt-1 text-sm text-ink">{{ guest.phoneCountryCode }} {{ guest.phone || '—' }}</p>
      </div>
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Country / Region</p>
        <p class="mt-1 text-sm text-ink">{{ guest.country || '—' }}</p>
      </div>
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Special Request</p>
        <p class="mt-1 text-sm text-ink">{{ guest.note || 'None' }}</p>
      </div>
    </div>

    <div class="mt-10 flex items-center justify-between border-t border-line pt-6">
      <h2 class="font-display text-2xl text-ink sm:text-[1.75rem]">Payment Summary</h2>
      <span class="border border-moss/40 bg-moss/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-moss">Paid</span>
    </div>
    <div class="mt-4 space-y-3 text-sm">
      <div class="flex items-center justify-between text-ink/70">
        <span>Room Total</span>
        <span>${{ roomSubtotal.toLocaleString('en-US') }}</span>
      </div>
      <div class="flex items-center justify-between text-ink/70">
        <span>Taxes ({{ taxRatePercent }}%)</span>
        <span>${{ taxes.toLocaleString('en-US') }}</span>
      </div>
      <div class="flex items-center justify-between text-ink/70">
        <span>Service Charges</span>
        <span>Included</span>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-between border-t border-line pt-4">
      <span class="font-display text-xl text-ink">Total Paid</span>
      <span class="font-display text-xl text-ink">${{ totalPrice.toLocaleString('en-US') }}</span>
    </div>

    <div class="mt-6 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-6">
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Payment Method</p>
        <p class="mt-1.5 flex items-center gap-2 text-sm text-ink">
          <span class="border border-line px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink/60">Visa</span>
          Card ending in 4242
        </p>
      </div>
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Payment Status</p>
        <p class="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-moss">
          <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1.333A6.667 6.667 0 1014.667 8 6.674 6.674 0 008 1.333zm3.53 5.137l-4 4a.667.667 0 01-.943 0l-2-2a.667.667 0 11.943-.943L7 9.057l3.53-3.53a.667.667 0 01.943.943z" />
          </svg>
          Paid
        </p>
      </div>
    </div>

    <h2 class="mt-10 font-display text-2xl text-ink sm:text-[1.75rem]">Important Information</h2>
    <div class="mt-6 grid gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
      <div class="flex items-start gap-3">
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-champagne/25 text-ink" aria-hidden="true">
          <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 4.5V8l2.5 1.5M14 8A6 6 0 112 8a6 6 0 0112 0z" />
          </svg>
        </span>
        <div>
          <p class="text-sm font-medium text-ink">Check-in Time</p>
          <p class="mt-1 text-sm text-ink/60">{{ checkInTime }}</p>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-champagne/25 text-ink" aria-hidden="true">
          <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 4.5V8l2.5 1.5M14 8A6 6 0 112 8a6 6 0 0112 0z" />
          </svg>
        </span>
        <div>
          <p class="text-sm font-medium text-ink">Check-out Time</p>
          <p class="mt-1 text-sm text-ink/60">{{ checkOutTime }}</p>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-champagne/25 text-ink" aria-hidden="true">
          <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 14.5s5-3.5 5-8a5 5 0 10-10 0c0 4.5 5 8 5 8z" />
            <circle cx="8" cy="6.5" r="1.5" />
          </svg>
        </span>
        <div>
          <p class="text-sm font-medium text-ink">Cancellation Policy</p>
          <p class="mt-1 text-sm text-ink/60">Free cancellation before</p>
          <p class="text-sm text-ink/60">{{ cancelByLabel }}, 6:00 PM</p>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-champagne/25 text-ink" aria-hidden="true">
          <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 5.5h8v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM4 5.5V4a1 1 0 011-1h6a1 1 0 011 1v1.5M8 8v2" />
          </svg>
        </span>
        <div>
          <p class="text-sm font-medium text-ink">Need Help</p>
          <p class="mt-1 text-sm text-ink/60">
            Call <a href="tel:+8801713377700" class="text-copper">+88-01713377700</a>
          </p>
          <p class="text-sm text-ink/60">
            Or, email <a href="mailto:info@qfl.com.bd" class="text-copper">info@qfl.com.bd</a>
          </p>
        </div>
      </div>
    </div>

    <div class="mt-8 flex items-start gap-3 border border-line bg-paper/60 p-5">
      <svg class="h-5 w-5 shrink-0 text-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
      <p class="text-sm text-ink/70">
        A confirmation email has been sent to <span class="text-ink">{{ guest.email }}</span>.
        Please check your inbox and spam folder.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GuestDetails } from '~/types/booking'
import type { Room } from '~/types/room'

const props = defineProps<{
  room: Room
  guest: GuestDetails
  checkIn: string
  checkOut: string
  nights: number
  guestsCount: number
  roomSubtotal: number
  taxes: number
  totalPrice: number
  taxRatePercent: number
}>()

const checkInTime = '2:00 PM'
const checkOutTime = '12:00 PM'

const cancelByLabel = computed(() => `${formatBookingDay(addDaysIso(props.checkIn, -1))}, ${isoToDate(props.checkIn).getFullYear()}`)
</script>
