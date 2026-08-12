<!--
  Capacity Overview + Equipment & Services: a quiet, editorial reference
  block — centered narrow column, small typography, thin dividers, no
  cards or shadows. Capacity types, room specs, and a two-column
  equipment / set-up list with an understated "See Less" control.
-->
<template>
  <section
    aria-labelledby="capacity-overview-title"
    class="bg-[#f6f2e9] text-[#282522]"
  >
    <div class="mx-auto w-full max-w-[760px] px-5 py-16 sm:px-6 lg:py-[70px]">
      <!-- ── CAPACITY OVERVIEW ── -->
      <div class="flex items-center gap-5">
        <span class="h-px flex-1 bg-[#282522]/12" aria-hidden="true" />
        <h2
          id="capacity-overview-title"
          class="text-[11px] font-medium uppercase tracking-[0.28em] text-[#282522]"
        >
          Capacity Overview
        </h2>
        <span class="h-px flex-1 bg-[#282522]/12" aria-hidden="true" />
      </div>

      <!-- Capacity types -->
      <div class="mt-12 grid grid-cols-2 gap-x-12 gap-y-10 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12 lg:gap-x-14">
        <div
          v-for="(item, index) in capacities"
          :key="item.label"
          class="flex flex-col items-center gap-3 text-center"
          :class="index === 4 ? 'col-span-2 sm:col-span-1' : ''"
        >
          <svg
            class="h-6 w-6 text-[#282522]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path v-for="path in item.icon" :key="path" :d="path" />
          </svg>
          <div>
            <p class="text-[10px] font-medium uppercase tracking-[0.24em] text-[#282522]">
              {{ item.label }}
            </p>
            <p class="mt-1.5 text-[11px] font-normal text-[#6b645c]">
              {{ item.guests }}
            </p>
          </div>
        </div>
      </div>

      <!-- Room specifications -->
      <div class="mt-10 flex flex-col items-center">
        <span class="h-px w-16 bg-[#282522]/12" aria-hidden="true" />

        <p class="mt-8 flex items-center gap-2.5 text-[12px] font-normal text-[#282522]">
          <svg class="h-4 w-4 text-[#6b645c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" />
            <path d="M4 12h16M12 4v16" />
          </svg>
          Dimensions: 99.6 ft &times; 57.6 ft &times; 22 ft
        </p>
        <p class="mt-3 flex items-center gap-2.5 text-[12px] font-normal text-[#282522]">
          <svg class="h-4 w-4 text-[#6b645c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 4h14l-2 16H4z" />
          </svg>
          Area: 5,721 sq. ft.
        </p>

        <span class="mt-10 h-px w-full max-w-[420px] bg-[#282522]/12" aria-hidden="true" />
      </div>

      <!-- Equipment & services / room set-up -->
      <div class="mx-auto mt-10 grid w-full max-w-[650px] gap-x-14 gap-y-12 md:grid-cols-2">
        <div>
          <h3 class="text-[11px] font-medium uppercase tracking-[0.24em] text-[#c6a15b]">
            Equipment &amp; Services
          </h3>
          <span class="mt-3 block h-px w-full bg-[#282522]/12" aria-hidden="true" />
          <ul class="mt-6 space-y-3.5">
            <li
              v-for="item in equipmentItems"
              :key="item"
              class="text-[12px] font-normal text-[#282522]/85"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-[11px] font-medium uppercase tracking-[0.24em] text-[#282522]">
            Room Set-Up Examples
          </h3>
          <span class="mt-3 block h-px w-full bg-[#282522]/12" aria-hidden="true" />
          <ul class="mt-6 space-y-3.5">
            <li
              v-for="item in setupItems"
              :key="item"
              class="text-[12px] font-normal text-[#282522]/85"
            >
              {{ item }}
            </li>
          </ul>

          <span class="my-6 block h-px w-full bg-[#282522]/12" aria-hidden="true" />

          <p class="text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a8177]">
            Business Services
          </p>
          <ul class="mt-5 space-y-3.5">
            <li
              v-for="item in businessItems"
              :key="item"
              class="text-[12px] font-normal text-[#282522]/85"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- See Less -->
      <div class="mt-12 flex justify-center">
        <button
          type="button"
          class="text-[10px] font-medium uppercase tracking-[0.24em] text-[#282522] underline underline-offset-4 transition-colors duration-fast hover:text-[#c6a15b]"
        >
          See Less
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CapacityItem {
  label: string
  guests: string
  icon: string[]
}

const capacities: CapacityItem[] = [
  {
    label: 'Theater',
    guests: '400 Guests',
    icon: ['M4 20h16', 'M7 16h10', 'M9 12h6', 'M3 8v3', 'M21 8v3'],
  },
  {
    label: 'Classroom',
    guests: '170 Guests',
    icon: ['M4 10h11', 'M4 10v5', 'M15 10v5', 'M18 11h3', 'M19.5 8v6'],
  },
  {
    label: 'U-Shape',
    guests: '120 Guests',
    icon: ['M5 17V6h14v11', 'M9 17v2', 'M15 17v2'],
  },
  {
    label: 'Reception',
    guests: '500 Guests',
    icon: ['M4 20h16', 'M8 20v-5h8v5', 'M12 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', 'M12 8v7'],
  },
  {
    label: 'Banquet',
    guests: '500 Guests',
    icon: ['M12 14a4.5 4.5 0 100-9 4.5 4.5 0 000 9z', 'M12 14v6', 'M4.5 9.5H2', 'M19.5 9.5H22', 'M7.8 5.3L6 3.5', 'M16.2 5.3L18 3.5'],
  },
]

const equipmentItems = [
  'Audio-Visual Equipment',
  'AV Technician',
  'LCD Projector',
  'Microphone',
  'PA System',
  'Walkie Talkies',
  'Wired Internet',
  'Wireless Internet',
]

const setupItems = [
  'Event Equipment & Supplies',
  'Direction Signs',
  'Flip Chart & Markers',
  'Name Cards',
  'Pens / Pencils / Notepad',
  'Podium Lectern',
  'Portable Stage',
  'Stack Chairs',
  'Tables',
]

const businessItems = [
  'Computers',
  'Copy Service',
  'Fax Service',
  'On-Site Business Center is Staffed',
  'Post/Parcel',
  'Printers',
]
</script>