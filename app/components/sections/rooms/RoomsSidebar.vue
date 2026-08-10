<template>
  <!--
    Two stacked info cards beside the room list: a hotel summary (photo,
    description, contact, TripAdvisor rating) and a static policy list.
    Plain white cards on the page's paper background — no photography-driven
    layout here, just reference information a guest checks while browsing.
  -->
  <aside class="flex flex-col gap-6" aria-label="Hotel information">
    <div class="bg-white">
      <div class="relative aspect-[16/10]">
        <BaseImage
          src="/images/hero/lobby-interior.jpg"
          alt="Q Hotel Dhaka lobby interior"
          :width="480"
          :height="300"
          sizes="xs:100vw sm:442px"
          class="absolute inset-0"
        />
        <span class="absolute left-3 top-3 flex h-8 w-8 items-center justify-center bg-ink/50 backdrop-blur-sm" aria-hidden="true">
          <svg class="h-4 w-4 text-champagne" viewBox="0 0 51 50" fill="currentColor">
            <path v-for="(markPath, index) in qHotelLogoPaths" :key="index" :d="markPath" />
          </svg>
        </span>
      </div>

      <div class="p-5">
        <h3 class="font-display text-2xl lg:text-[28px] font-semibold text-ink">Q Hotel Dhaka, Bangladesh</h3>
        <p class="mt-3 text-base leading-6 text-[#505155]">
          Q Hotel Dhaka offers a refined 5-star hospitality experience with elegant accommodations, premium wellness facilities, exceptional dining, and personalized service in the heart of the city.
        </p>

        <ul class="mt-5 space-y-3 text-base text-[#373737]">
          <li class="flex items-center gap-2.5">
            <svg class="h-4 w-4 shrink-0 text-[#D78C38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.37a1.5 1.5 0 00-1.14-1.46l-4.06-1.01a1.5 1.5 0 00-1.58.62l-.83 1.24a11.3 11.3 0 01-5-5l1.24-.83a1.5 1.5 0 00.62-1.58l-1.01-4.06A1.5 1.5 0 007.12 2.25H5.75A2.25 2.25 0 003.5 4.5" />
            </svg>
            <a class="transition-colors duration-fast hover:text-copper" href="tel:+8801866227696">01866-227696</a>
          </li>
          <li class="flex items-center gap-2.5">
            <svg class="h-4 w-4 shrink-0 text-[#D78C38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25m-19.5 0v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75m-19.5 0l9.75 6.75 9.75-6.75" />
            </svg>
            <a class="transition-colors duration-fast hover:text-copper" href="mailto:info@qfl.com.bd">info@qfl.com.bd</a>
          </li>
          <li class="flex items-center gap-2.5">
            <svg class="h-4 w-4 shrink-0 text-[#D78C38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.14-7.5 11.25-7.5 11.25S4.5 17.64 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <a class="transition-colors duration-fast hover:text-copper" :href="directionsUrl" target="_blank" rel="noopener noreferrer">Visit Map</a>
          </li>
        </ul>

        <div class="mt-5 flex items-center gap-6 border-t border-line pt-5">
          <img
            src="/images/brand/tripadvisor-logo.svg"
            alt="TripAdvisor"
            width="152"
            height="34"
            loading="lazy"
            class="h-[34px] w-auto shrink-0"
          >
          <span class="h-14 w-px shrink-0 bg-line" aria-hidden="true" />
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2.5">
              <span class="text-lg font-semibold text-ink">5.0</span>
              <span class="h-5 w-px shrink-0 bg-line" aria-hidden="true" />
              <span class="flex items-center gap-1" aria-hidden="true">
                <svg v-for="starIndex in 5" :key="starIndex" class="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
                </svg>
              </span>
            </div>
            <span class="text-sm text-ink/60">Based on 165 reviews</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-5">
      <h3 class="font-display font-semibold text-2xl lg:text-[28px] text-[#0F0F10]">Hotel Information</h3>
      <hr class="mt-4 border-line">

      <ul class="mt-4 space-y-3 text-base text-ink/75">
        <li v-for="item in policyItems" :key="item.label" class="flex items-center gap-2.5">
          <svg class="h-4 w-4 shrink-0 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path v-for="(iconPath, pathIndex) in item.iconPaths" :key="pathIndex" :d="iconPath" />
          </svg>
          <a v-if="item.href" :href="item.href" class="underline decoration-ink/30 underline-offset-2 transition-colors duration-fast hover:text-copper hover:decoration-copper">
            {{ item.label }}
          </a>
          <span v-else>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Plot+C-11,+Block+A,+Sector+1,+Purbachal+Road,+Dhaka+1229'

interface PolicyItem {
  label: string
  href?: string
  iconPaths: string[]
}

const policyItems: PolicyItem[] = [
  {
    label: 'Check-in: 3:00 pm',
    iconPaths: ['M12 7v5l3 2', 'M12 21a9 9 0 100-18 9 9 0 000 18z'],
  },
  {
    label: 'Check-out: 12:00 pm',
    iconPaths: ['M12 7v5l3 2', 'M12 21a9 9 0 100-18 9 9 0 000 18z'],
  },
  {
    label: 'Minimum age to Check In 18',
    iconPaths: ['M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7z', 'M5 20c0-3.5 3-6 7-6s7 2.5 7 6'],
  },
  {
    label: 'Pets are not allowed.',
    iconPaths: ['M12 21a9 9 0 100-18 9 9 0 000 18z', 'M8 8l8 8'],
  },
  {
    label: 'Smoke free property',
    iconPaths: ['M3 16.5h11v3H3z', 'M17 16.5v3M19.5 16.5v3', 'M15.5 13c0-1.4-1.1-1.9-2.3-1.9M16.5 9.7c1.9.3 2.8 1.5 2.8 3.3', 'M2.5 2.5l17 17'],
  },
  {
    label: 'Complimentary On-Site Parking',
    iconPaths: ['M4.5 4.5h15v15h-15z', 'M10 16.5V8h2.75a2.25 2.25 0 010 4.5H10'],
  },
  {
    label: 'See Accessibility Features',
    href: '/#facilities',
    iconPaths: ['M12 5.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z', 'M12 9v6l4.5 4M12 9l-4 1.5M12 12l-3.5 2.5M12 12l4 1'],
  },
  {
    label: 'Facilities / Amenities Preview',
    href: '/#facilities',
    iconPaths: ['M4 5.5h6v6H4zM14 5.5h6v6h-6zM4 15.5h6v6H4zM14 15.5h6v6h-6z'],
  },
]
</script>
