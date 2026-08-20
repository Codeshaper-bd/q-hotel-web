<template>
  <div class="bg-white p-7 sm:p-10">
    <h2 class="font-display text-2xl text-ink sm:text-[1.75rem]">
      Booking Details
    </h2>
    <div class="mt-6">
      <BookingStayDetailsGrid
        :check-in="checkIn"
        :check-out="checkOut"
        :nights="nights"
        :guests-count="guestsCount"
        :room-name="room.name"
      />
    </div>

    <h2 class="mt-10 font-display text-2xl text-ink sm:text-[1.75rem]">
      Guest Information
    </h2>
    <div class="mt-6 border-t border-line pt-6">
      <BookingGuestInfoRecap :guest="guest" />
    </div>

    <h2 class="mt-10 font-display text-2xl text-ink sm:text-[1.75rem]">
      Flight Details
    </h2>
    <div class="mt-6 border-t border-line pt-6">
      <BookingFlightInformation />
    </div>

    <h2 class="mt-10 font-display text-2xl text-ink sm:text-[1.75rem]">
      Room Requests and Accessibility
    </h2>
    <div class="mt-6 border-t border-line pt-6">
      <BookingRoomRequestsRecap />
    </div>

    <h2 class="mt-10 font-display text-2xl text-ink sm:text-[1.75rem]">
      Payment Status
    </h2>
    <div class="mt-4 space-y-3 border-t border-line pt-6 text-sm">
      <div class="flex items-center justify-between text-ink/70">
        <span>Total Amount</span>
        <span class="text-ink">{{ totalPrice.toLocaleString("en-US") }} BDT</span>
      </div>
      <div class="flex items-center justify-between text-ink/70">
        <span>Payment Method</span>
        <span class="flex items-center gap-2 text-ink">
          <span
            class="border border-line px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink/60"
            >Visa</span
          >
          Card ending in 4242
        </span>
      </div>
      <div class="flex items-center justify-between text-ink/70">
        <span>Status</span>
        <span
          class="flex items-center gap-1.5 text-sm font-medium text-[rgb(190,50,45)]"
        >
          <svg
            class="h-4 w-4 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M8 1.333A6.667 6.667 0 1014.667 8 6.674 6.674 0 008 1.333zm2.14 8.14a.667.667 0 01-.943.943L8 9.14l-1.197 1.276a.667.667 0 01-.943-.943L7.06 8 5.86 6.803a.667.667 0 11.943-.943L8 6.86l1.197-1.196a.667.667 0 11.943.943L8.94 8z"
            />
          </svg>
          Payment Failed
        </span>
      </div>
      <div class="flex items-center justify-between text-ink/70">
        <span>Failure Reason</span>
        <span class="text-ink">{{ failureReason }}</span>
      </div>
      <div class="flex items-center justify-between text-ink/70">
        <span>Attempted At</span>
        <span class="text-ink">{{ attemptedAtLabel }}</span>
      </div>
    </div>

    <div class="mt-8 flex items-start gap-3 border border-line bg-paper/60 p-5">
      <svg
        class="h-5 w-5 shrink-0 text-copper"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <p class="text-sm font-medium text-ink">What Happens Now?</p>
        <p class="mt-1 text-sm text-ink/70">
          Your reservation is not confirmed, and no payment has been charged.
          You can try again with the same or a different payment method, or
          contact our team if you need assistance.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GuestDetails } from "~/types/booking";
import type { Room } from "~/types/room";

defineProps<{
  room: Room;
  guest: GuestDetails;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsCount: number;
  totalPrice: number;
  failureReason: string;
  attemptedAtLabel: string;
}>();
</script>
