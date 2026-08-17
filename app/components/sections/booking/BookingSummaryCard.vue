<template>
  <div class="bg-white p-6">
    <div class="relative aspect-[5/3]">
      <BaseImage
        :src="room.images[0]?.src ?? ''"
        :alt="room.images[0]?.alt ?? room.name"
        :width="576"
        :height="345"
        sizes="xs:100vw lg:26rem"
        class="absolute inset-0"
      />
    </div>

    <div class="border-b border-line py-6 flex items-center gap-6">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.4524 38.4751C17.4524 38.4751 23.7596 37.2411 32.4642 43.275C32.4642 43.275 38.1643 47.6724 45.3924 46.1456C45.3924 46.1456 36.3946 51.2384 28.5903 44.5508C23.7185 40.3731 19.2479 38.7261 17.4473 38.4751H17.4524Z"
          fill="#0F0F10"
        />
        <path
          d="M12.4754 2.97656L13.9571 3.97002C13.9571 3.97002 2.54649 10.4798 4.86668 26.1398C6.5438 37.4599 14.9448 45.9827 26.3143 44.7174L27.5129 45.8311C25.7072 46.0612 5.97275 47.2952 0.570992 27.8286C-0.164676 25.1777 -2.43342 11.4628 12.4754 2.97656Z"
          fill="#0F0F10"
        />
        <path
          d="M21.6289 1.16676L20.6309 0.251736C20.6309 0.251736 30.5547 -1.87112 40.211 6.21247C40.211 6.21247 52.2029 15.8281 46.4256 31.028C43.9613 37.5168 37.4123 42.2802 35.3957 42.803L33.6825 41.6318C33.6825 41.6318 43.3543 36.309 43.2617 23.2215C43.2617 23.2215 43.8687 12.5078 36.4812 6.0713C36.4812 6.0713 31.1669 0.319709 21.634 1.1563L21.6289 1.16676Z"
          fill="#0F0F10"
        />
      </svg>

      <div>
        <h2
          class="font-display font-semibold text-2xl lg:text-[28px] text-[#0F0F10]"
        >
          Deluxe Double Room
        </h2>
        <p class="mt-1 text-base text-[#373737]">
          Plot C-11, Block A, Sector 1, Purbachal Road, Dhaka 1229
        </p>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase tracking-[0.06em] text-ink"
          >Total Price</span
        >
        <span class="text-base text-[#373737]">95,000 BDT</span>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <p class="flex items-center gap-2 text-base font-medium text-[#008000]">
        <svg
          class="h-4 w-4 shrink-0"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M8 1.333A6.667 6.667 0 1014.667 8 6.674 6.674 0 008 1.333zm3.53 5.137l-4 4a.667.667 0 01-.943 0l-2-2a.667.667 0 11.943-.943L7 9.057l3.53-3.53a.667.667 0 01.943.943z"
          />
        </svg>
        Well done! You're getting a great price.
      </p>
      <div class="flex items-center justify-between gap-4 text-sm mt-4">
        <span class="font-medium uppercase text-[#0F0F10]">Dates</span>
        <span class="text-right">
          <span class="block text-base text-[#373737]"
            >Jul 12-14, 2026 (2 Night)</span
          >
          <span class="mt-1 block text-sm text-[#505155]"
            >Check In 2:00 PM</span
          >
        </span>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase text-[#0F0F10]">Reservation</span>
        <span class="text-base text-[#373737]">1 Room, 1 Guest</span>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase text-[#0F0F10]">Room Type</span>
        <span class="text-base text-[#373737]">1 King Premium</span>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex items-start justify-between gap-4 text-sm">
        <span>
          <span class="font-medium uppercase text-[#0F0F10]">2 Night Stay</span>
          <span class="mt-1.5 block text-sm text-ink/55">Jul 12 - Jul 14</span>
        </span>
        <span class="text-base text-[#0F0F10] block mt-auto">93,500 BDT</span>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <p class="text-sm font-medium uppercase text-[#0F0F10]">
        Room Request &amp; Accessible
      </p>
      <div class="mt-3 flex flex-col gap-3">
        <div class="flex items-start justify-between gap-4 text-sm">
          <span class="text-base text-[#0F0F10]">Rollaway Beds</span>
          <span class="text-base text-[#373737]">2,000 BDT</span>
        </div>
        <div class="flex items-start justify-between gap-4 text-sm">
          <span class="text-base text-[#0F0F10]">Baby Cribs</span>
          <span class="text-base text-[#373737]">1,500 BDT</span>
        </div>
        <div class="flex items-start justify-between gap-4 text-sm">
          <span class="text-base text-[#0F0F10]">Accessible Room</span>
          <span class="text-base text-[#373737]">0 BDT</span>
        </div>
        <div class="flex items-start justify-between gap-4 text-sm">
          <span class="text-base text-[#0F0F10]">Early Check-In</span>
          <span class="text-base text-[#373737]">3,000 BDT</span>
        </div>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between gap-4 text-sm">
          <span class="font-medium uppercase text-[#0F0F10]"
            >City Taxes (1.5%)</span
          >
          <span class="text-base text-[#373737]">1,485 BDT</span>
        </div>
        <div class="flex items-center justify-between gap-4 text-sm">
          <span class="font-medium uppercase text-[#0F0F10]">VAT (15%)</span>
          <span class="text-base text-[#373737]">14,850 BDT</span>
        </div>
        <div class="flex items-center justify-between gap-4 text-sm">
          <span class="font-medium uppercase text-[#0F0F10]"
            >Service Charge (12.5%)</span
          >
          <span class="text-base text-[#373737]">12,375 BDT</span>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between py-[18px] pb-0">
      <span class="text-[28px] font-semibold text-[##000000]"
        >Total Amount</span
      >
      <span class="text-xl font-medium text-[##000000]">113,563 BDT</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from "~/types/room";

const props = defineProps<{
  room: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomsCount: number;
  guestsCount: number;
  roomSubtotal: number;
  taxes: number;
  totalPrice: number;
  taxRatePercent: number;
}>();
</script>
