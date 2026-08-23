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

    <h2
      class="-mx-7 mt-10 border-t border-[#505155]/15 px-7 pt-8 font-display text-2xl text-ink sm:-mx-10 sm:px-10 sm:pt-10 sm:text-[1.75rem]"
    >
      Guest Information
    </h2>
    <div class="mt-6">
      <BookingGuestInfoRecap :guest="guest" />
    </div>

    <h2
      class="-mx-7 mt-10 border-t border-[#505155]/15 px-7 pt-8 font-display text-2xl text-ink sm:-mx-10 sm:px-10 sm:pt-10 sm:text-[1.75rem]"
    >
      Flight Details
    </h2>

    <div
      role="status"
      class="mt-6 flex items-center justify-between gap-4 border border-[#ADD6B7] bg-[#F4FAF5] px-4 py-3"
    >
      <div class="flex items-center gap-4">
        <span
          class="flex size-10 shrink-0 items-center justify-center border border-[#008000]/50 text-[#008000]"
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2H14"
              stroke="#008000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 8.00053L19 10.0005L17.5 6.30053C17.3585 5.92186 17.1057 5.59495 16.7747 5.36288C16.4437 5.13081 16.0502 5.00448 15.646 5.00053H8.4C7.9925 4.99117 7.59188 5.10654 7.25177 5.33119C6.91166 5.55585 6.64832 5.87905 6.497 6.25753L5 10.0005L3 8.00053"
              stroke="#008000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 14H7.01"
              stroke="#008000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17 14H17.01"
              stroke="#008000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19 10H5C3.89543 10 3 10.8954 3 12V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V12C21 10.8954 20.1046 10 19 10Z"
              stroke="#008000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 18V20"
              stroke="#008000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19 18V20"
              stroke="#008000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <div>
          <p class="font-display text-xl font-semibold text-[#0F0F10]">
            Airport Pickup Requested
          </p>
          <p class="mt-1 text-sm text-[#505155]">
            We will be waiting for you at the airport.
          </p>
        </div>
      </div>

      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM14 21.59L9.00001 16.59L10.59 15L14 18.41L21.41 11L23.006 12.586L14 21.59Z"
          fill="#008000"
        />
      </svg>
    </div>
    <div class="mt-6">
      <BookingFlightInformation />
    </div>

    <h2
      class="-mx-7 mt-10 border-t border-[#505155]/15 px-7 pt-8 font-display text-2xl text-ink sm:-mx-10 sm:px-10 sm:pt-10 sm:text-[1.75rem]"
    >
      Room Requests and Accessibility
    </h2>
    <div class="mt-6">
      <BookingRoomRequestsRecap />
    </div>

    <h2
      class="-mx-7 mt-10 border-t border-[#505155]/15 px-7 pt-8 font-display text-2xl text-ink sm:-mx-10 sm:px-10 sm:pt-10 sm:text-[1.75rem]"
    >
      Payment Status
    </h2>
    <dl class="mt-6 space-y-4 text-sm">
      <div class="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
        <dt class="text-xs uppercase text-[#505155]">Total Amount</dt>
        <dd class="text-[#0F0F10] sm:text-right">
          {{ totalPrice.toLocaleString("en-US") }} BDT
        </dd>
      </div>
      <div class="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
        <dt class="text-xs uppercase text-[#505155]">Payment Method</dt>
        <dd class="flex items-center gap-2 text-[#0F0F10] sm:justify-self-end">
          <span
            class="border border-[#505155]/15 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[#505155]"
          >
            Visa
          </span>
          Visa *******245
        </dd>
      </div>
      <div class="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
        <dt class="text-xs uppercase text-[#505155]">Status</dt>
        <dd
          class="flex items-center gap-1.5 text-sm font-medium text-[#E11919] sm:justify-self-end"
        >
          <svg
            class="size-4 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M8 1.333A6.667 6.667 0 1014.667 8 6.674 6.674 0 008 1.333zm2.14 8.14a.667.667 0 01-.943.943L8 9.14l-1.197 1.276a.667.667 0 01-.943-.943L7.06 8 5.86 6.803a.667.667 0 11.943-.943L8 6.86l1.197-1.196a.667.667 0 11.943.943L8.94 8z"
            />
          </svg>
          Payment Failed
        </dd>
      </div>
      <div class="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
        <dt class="text-xs uppercase text-[#505155]">Failure Reason</dt>
        <dd class="text-[#0F0F10] sm:text-right">{{ failureReason }}</dd>
      </div>
      <div class="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
        <dt class="text-xs uppercase text-[#505155]">Attempted At</dt>
        <dd class="text-[#0F0F10] sm:text-right">{{ attemptedAtLabel }}</dd>
      </div>
    </dl>

    <aside
      class="mt-8 flex items-start gap-3 border border-[#E9B05A]/30 bg-[#FCF8F0] px-4 py-4"
      aria-labelledby="payment-failure-next-steps"
    >
      <span
        class="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FCE8C6] text-[#E8921E]"
        aria-hidden="true"
      >
        <svg
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <circle cx="12" cy="12" r="8" />
          <path stroke-linecap="round" d="M12 8.5v5" />
          <path stroke-linecap="round" d="M12 16.5h.01" />
        </svg>
      </span>
      <div>
        <p id="payment-failure-next-steps" class="text-sm font-medium text-[#0F0F10]">
          What Happens Now?
        </p>
        <p class="mt-1 text-xs leading-relaxed text-[#505155]">
          Your reservation is not confirmed, and no payment has been charged.
          You can try again with the same or a different payment method, or
          contact our team if you need assistance.
        </p>
      </div>
    </aside>
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
