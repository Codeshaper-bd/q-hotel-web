<template>
  <!-- Read-only recap of the guest's flight details, shared by the
       confirmation and payment-failed pages -->
  <div class="grid gap-x-8 gap-y-5 sm:grid-cols-2">
    <div>
      <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Airline</p>
      <p class="mt-1 text-sm text-ink">Emirates</p>
    </div>
    <div>
      <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Flight Number</p>
      <p class="mt-1 text-sm text-ink">EK 584</p>
    </div>
    <div>
      <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">arrival date</p>
      <p class="mt-1 text-sm text-ink">Jul 12, 2026</p>
    </div>
      <div>
      <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">arrival time</p>
      <p class="mt-1 text-sm text-ink">10:30 AM</p>
    </div>
    <div>
      <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Arrival Airport</p>
      <p class="mt-1 text-sm text-ink">Hazrat Shahjalal International Airport (HSIA)</p>
    </div>
    <div>
      <p class="text-xs font-medium uppercase tracking-[0.06em] text-ink/50">Flight Origin</p>
      <p class="mt-1 text-sm text-ink">Dubai International (DXB)</p>
    </div>
  </div>
</template>