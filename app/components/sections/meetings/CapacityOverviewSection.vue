<!--
  Capacity Overview + Equipment & Services: a quiet, editorial reference
  block — centered narrow column, small typography, thin dividers, no
  cards or shadows. Capacity types, room specs, and a two-column
  equipment / set-up list with an understated "See Less" control.
-->
<template>
  <section aria-labelledby="capacity-overview-title" class="bg-[#f6f2e9] text-[#282522]">
    <div class="mx-auto w-full max-w-[760px] px-5 pt-[60px] pb-16 sm:px-6 lg:pt-[60px] lg:pb-[70px]">
      <!-- ── CAPACITY OVERVIEW ── -->
      <div class="flex items-center gap-5">
        <span class="h-px flex-1 bg-[#282522]/25" aria-hidden="true" />
        <h2 id="capacity-overview-title" class="text-[11px] font-medium uppercase tracking-[0.28em] text-[#282522]">
          Capacity Overview
        </h2>
        <span class="h-px flex-1 bg-[#282522]/25" aria-hidden="true" />
      </div>

      <!-- Capacity types -->
      <div
        class="mt-12 grid grid-cols-2 gap-x-12 gap-y-10 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12 lg:gap-x-14">
        <div v-for="(item, index) in capacities" :key="item.label" class="flex flex-col items-center gap-3 text-center"
          :class="index === 4 ? 'col-span-2 sm:col-span-1' : ''">
          <component :is="item.icon" color="#282522" class="h-6 w-6" aria-hidden="true" />
          <div>
            <p class="text-sm font-medium uppercase text-[#505155]">
              {{ item.label }}
            </p>
            <p class="mt-3 text-sm font-medium text-[#0F0F10]">
              {{ item.guests }}
            </p>
          </div>
        </div>
      </div>
      <div class="h-px max-w-[400px] mt-10 mb-6 w-full mx-auto bg-[#5051553D]/25" aria-hidden="true" />

      <!-- Room specifications -->
      <div class="mt-10 flex flex-col items-center">

        <p class="mt-8 flex items-center gap-2.5 text-[12px] font-normal text-[#282522]">
          <IconCheckbox class="h-4 w-4 shrink-0" aria-hidden="true" />
          Dimensions: 99.6 ft &times; 57.6 ft &times; 22 ft
        </p>
        <p class="mt-3 flex items-center gap-2.5 text-[12px] font-normal text-[#282522]">
          <IconCheckbox class="h-4 w-4 shrink-0" aria-hidden="true" />
          Area: 5,721 sq. ft.
        </p>

        <span class="mt-10 h-px w-full max-w-[420px] bg-[#282522]/25" aria-hidden="true" />
      </div>

      <!-- Equipment & services / room set-up -->
      <div class="mx-auto mt-10 grid w-full max-w-[650px] gap-x-14 gap-y-12 md:grid-cols-2">
        <div>
          <h3 class="text-[11px] font-medium uppercase tracking-[0.24em] text-[#c6a15b]">
            Equipment &amp; Services
          </h3>
          <span class="mt-3 block h-px w-full bg-[#282522]/25" aria-hidden="true" />
          <ul class="mt-6 space-y-3.5">
            <li v-for="item in equipmentItems" :key="item" class="text-[12px] font-normal text-[#282522]/85">
              {{ item }}
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-[11px] font-medium uppercase tracking-[0.24em] text-[#282522]">
            Room Set-Up Examples
          </h3>
          <span class="mt-3 block h-px w-full bg-[#282522]/25" aria-hidden="true" />
          <ul class="mt-6 space-y-3.5">
            <li v-for="item in setupItems" :key="item" class="text-[12px] font-normal text-[#282522]/85">
              {{ item }}
            </li>
          </ul>

          <span class="my-6 block h-px w-full bg-[#282522]/25" aria-hidden="true" />

          <p class="text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a8177]">
            Business Services
          </p>
          <ul class="mt-5 space-y-3.5">
            <li v-for="item in businessItems" :key="item" class="text-[12px] font-normal text-[#282522]/85">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- See Less -->
      <div class="mt-12 flex justify-center">
        <button type="button"
          class="text-[10px] font-medium uppercase tracking-[0.24em] text-[#282522] underline underline-offset-4 transition-colors duration-fast hover:text-[#c6a15b]">
          See Less
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import IconTheater from '~/components/base/IconTheater.vue'
import IconClassroom from '~/components/base/IconClassroom.vue'
import IconUShape from '~/components/base/IconUShape.vue'
import IconReception from '~/components/base/IconReception.vue'
import IconBanquet from '~/components/base/IconBanquet.vue'

interface CapacityItem {
  label: string
  guests: string
  icon: Component
}

const capacities: CapacityItem[] = [
  {
    label: 'Theater',
    guests: '400 Guests',
    icon: IconTheater,
  },
  {
    label: 'Classroom',
    guests: '170 Guests',
    icon: IconClassroom,
  },
  {
    label: 'U-Shape',
    guests: '120 Guests',
    icon: IconUShape,
  },
  {
    label: 'Reception',
    guests: '500 Guests',
    icon: IconReception,
  },
  {
    label: 'Banquet',
    guests: '500 Guests',
    icon: IconBanquet,
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