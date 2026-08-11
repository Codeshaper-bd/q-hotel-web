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
        <span class="text-base text-[#373737]"
          >${{ totalPrice.toLocaleString("en-US") }}</span
        >
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
            >{{ dateRangeLabel }} ({{ nights }}
            {{ nights === 1 ? "Night" : "Nights" }})</span
          >
          <span class="mt-1 block text-sm text-[#505155]"
            >Check In 2:00 pm</span
          >
        </span>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase text-[#0F0F10]">Reservation</span>
        <span class="text-base text-[#373737]"
          >{{ roomsCount }} {{ roomsCount === 1 ? "Room" : "Rooms" }},
          {{ guestsCount }} {{ guestsCount === 1 ? "Guest" : "Guests" }}</span
        >
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium uppercase text-[#0F0F10]">Room Type</span>
        <span class="text-base text-[#373737]">{{ room.name }}</span>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex items-start justify-between gap-4 text-sm">
        <span>
          <span class="font-medium uppercase text-[#0F0F10]"
            >{{ nights }} {{ nights === 1 ? "Night" : "Nights" }} Stay</span
          >
          <span class="mt-1.5 block text-sm text-ink/55">{{
            dateRangeLabel
          }}</span>
        </span>
        <span class="text-base text-[#0F0F10] block mt-auto">93,500 BDT</span>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex items-start justify-between gap-4 text-sm">
        <span>
          <span class="font-medium uppercase text-[#0F0F10]">Taxes</span>
          <span class="mt-1.5 block text-sm text-ink/55"
            >Tax ({{ taxRatePercent }}%)</span
          >
        </span>
        <span class="text-base text-ink">1500 BDT</span>
      </div>
    </div>

    <div class="border-b border-line py-[18px]">
      <div class="flex items-center justify-between">
        <span class="font-medium uppercase text-[#0F0F10] text-sm">Total Price</span>
        <span class="text-base text-[#373737]">95,000 BDT</span>
      </div>
    </div>

    <div class="flex items-center gap-2 py-[18px] text-base text-[#0F0F10]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_4383_7151)">
          <path
            d="M7.9987 14.6654C8.87434 14.6664 9.74156 14.4945 10.5505 14.1594C11.3595 13.8243 12.0943 13.3326 12.7127 12.7127C13.3326 12.0943 13.8243 11.3595 14.1594 10.5505C14.4945 9.74156 14.6664 8.87434 14.6654 7.9987C14.6664 7.12307 14.4945 6.25585 14.1594 5.44687C13.8243 4.63789 13.3326 3.90309 12.7127 3.2847C12.0943 2.66476 11.3595 2.17311 10.5505 1.83801C9.74156 1.50291 8.87434 1.33096 7.9987 1.33204C7.12307 1.33096 6.25585 1.50291 5.44687 1.83801C4.63789 2.17311 3.90309 2.66476 3.2847 3.2847C2.66476 3.90309 2.17311 4.63789 1.83801 5.44687C1.50291 6.25585 1.33096 7.12307 1.33204 7.9987C1.33096 8.87434 1.50291 9.74156 1.83801 10.5505C2.17311 11.3595 2.66476 12.0943 3.2847 12.7127C3.90309 13.3326 4.63789 13.8243 5.44687 14.1594C6.25585 14.4945 7.12307 14.6664 7.9987 14.6654Z"
            stroke="#0F0F10"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.9974 12.3307C8.21841 12.3307 8.43037 12.2429 8.58665 12.0867C8.74293 11.9304 8.83073 11.7184 8.83073 11.4974C8.83073 11.2764 8.74293 11.0644 8.58665 10.9081C8.43037 10.7519 8.21841 10.6641 7.9974 10.6641C7.77638 10.6641 7.56442 10.7519 7.40814 10.9081C7.25186 11.0644 7.16406 11.2764 7.16406 11.4974C7.16406 11.7184 7.25186 11.9304 7.40814 12.0867C7.56442 12.2429 7.77638 12.3307 7.9974 12.3307Z"
            fill="#0F0F10"
          />
          <path
            d="M8 4V9.33333"
            stroke="#0F0F10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_4383_7151">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>

      Earn an estimated 1,558 points for this stay.
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

const dateRangeLabel = computed(
  () =>
    `${formatBookingDay(props.checkIn)} – ${formatBookingDay(props.checkOut)}`,
);
const points = computed(() => Math.round(props.totalPrice * 4));
</script>
