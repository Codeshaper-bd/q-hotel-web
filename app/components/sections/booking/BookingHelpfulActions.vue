<template>
  <div class="bg-white p-7 sm:p-10">
    <h2 class="font-display text-2xl text-ink sm:text-3xl">Helpful Actions</h2>

    <div class="mt-8 grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        class="flex items-center justify-between border border-line px-6 py-3.5 text-sm font-medium uppercase tracking-[0.04em] text-ink transition-colors duration-fast hover:border-ink/40"
        @click="print"
      >
        Download Invoice
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"
          />
        </svg>
      </button>
      <button
        type="button"
        class="flex items-center justify-between border border-line px-6 py-3.5 text-sm font-medium uppercase tracking-[0.04em] text-ink transition-colors duration-fast hover:border-ink/40"
        @click="print"
      >
        Print Reservation
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.72 9.75V4.5a.75.75 0 01.75-.75h9.06a.75.75 0 01.75.75v5.25M6.72 18.75h-2.4a.75.75 0 01-.75-.75v-5.25a.75.75 0 01.75-.75h16.36a.75.75 0 01.75.75V18a.75.75 0 01-.75.75h-2.4M6.72 14.25h10.56v6a.75.75 0 01-.75.75H7.47a.75.75 0 01-.75-.75v-6z"
          />
        </svg>
      </button>
      <!-- Resend requires an email service; lands with the PMS/notifications
           integration, not something the browser can do on its own -->
      <button
        type="button"
        class="flex items-center justify-between border border-line px-6 py-3.5 text-sm font-medium uppercase tracking-[0.04em] text-ink transition-colors duration-fast hover:border-ink/40"
      >
        Email Confirmation Again
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25m-19.5 0v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75m-19.5 0l9.75 6.75 9.75-6.75"
          />
        </svg>
      </button>
      <button
        type="button"
        class="flex items-center justify-between border border-line px-6 py-3.5 text-sm font-medium uppercase tracking-[0.04em] text-ink transition-colors duration-fast hover:border-ink/40"
        @click="downloadCalendarInvite"
      >
        Add to Calendar
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0V11.25A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      </button>
    </div>

    <h3 class="mt-10 font-display text-2xl text-ink sm:text-3xl">
      Explore More
    </h3>
    <div class="mt-6 grid grid-cols-3 gap-3">
      <NuxtLink
        v-for="item in exploreLinks"
        :key="item.label"
        :to="item.to"
        class="group"
      >
        <div class="relative aspect-[4/3] overflow-hidden bg-line/40">
          <BaseImage
            :src="item.image"
            alt=""
            :width="240"
            :height="180"
            sizes="33vw"
            class="absolute inset-0 transition-transform duration-normal ease-premium group-hover:scale-105"
          />
        </div>
        <p class="mt-2 flex items-center gap-1 text-sm font-medium text-ink">
          {{ item.label }}
          <svg
            class="h-3.5 w-3.5 text-copper"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 3l5 5-5 5"
            />
          </svg>
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  reservationNumber: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
}>();

const exploreLinks = [
  {
    label: "Dining",
    to: "/#dining",
    image: "/images/booking/dining.png",
  },
  {
    label: "Spa & Wellness",
    to: "/#facilities",
    image: "/images/booking/wellness.png",
  },
  {
    label: "Swimming Pool",
    to: "/#facilities",
    image: "/images/booking/swimming.png",
  },
];

// No PDF invoice service exists yet; the browser's print-to-PDF stands in
// until real invoice generation lands with the PMS work
function print() {
  window.print();
}

/** A real .ics download — no calendar/PMS backend needed for this one */
function downloadCalendarInvite() {
  const toIcsDate = (iso: string) => iso.replace(/-/g, "");
  const stamp = `${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Q Hotel Dhaka//Booking Confirmation//EN",
    "BEGIN:VEVENT",
    `UID:${props.reservationNumber}@qhoteldhaka.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${toIcsDate(props.checkIn)}`,
    `DTEND;VALUE=DATE:${toIcsDate(props.checkOut)}`,
    `SUMMARY:Q Hotel Dhaka — ${props.roomName}`,
    "LOCATION:Plot C-11\\, Block A\\, Sector 1\\, Purbachal Road\\, Dhaka 1229",
    `DESCRIPTION:Reservation ${props.reservationNumber}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `q-hotel-dhaka-${props.reservationNumber}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
</script>
