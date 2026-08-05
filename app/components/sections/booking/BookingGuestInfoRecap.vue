<template>
  <!-- Read-only recap of the guest form, shared by the confirmation and
       payment-failed pages -->
  <div class="grid gap-x-8 gap-y-5 sm:grid-cols-2">
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
</template>

<script setup lang="ts">
import type { GuestDetails } from '~/types/booking'

defineProps<{
  guest: GuestDetails
}>()
</script>
