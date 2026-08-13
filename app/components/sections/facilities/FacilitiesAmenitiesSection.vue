<template>
  <section aria-labelledby="facilities-amenities-title" class="bg-paper py-20 text-ink sm:py-24 lg:py-32">
    <BaseContainer size="xl">
      <FadeReveal>
        <div class="text-center">
          <BaseKicker>Facilities</BaseKicker>
          <h2 id="facilities-amenities-title" class="mt-5 font-display text-4xl font-semibold sm:text-5xl">
            Our Hotel Facilities
          </h2>
        </div>
      </FadeReveal>

      <FadeReveal :stagger="0.045" :distance="24">
        <div class="mt-12 grid gap-1.5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          <div data-reveal-item class="flex min-h-72 flex-col justify-center px-5 py-10 sm:px-8 lg:aspect-[4/5] lg:px-5 xl:px-8">
            <p class="font-display text-xl leading-snug text-copper sm:text-2xl">
              Everything You Need,<br>All in One Place
            </p>
            <p class="mt-6 max-w-64 text-sm leading-6 text-muted">
              Thoughtfully designed facilities make your stay more comfortable, convenient, and memorable.
            </p>
          </div>

          <div v-for="facility in facilities" :key="facility.title" data-reveal-item>
            <article class="group relative isolate aspect-[4/5] overflow-hidden bg-ink text-paper">
              <BaseImage
                :src="facility.image"
                :alt="facility.title"
                :width="640"
                :height="800"
                sizes="xs:100vw sm:50vw lg:25vw"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.035]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden="true" />

              <div class="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                <span class="flex size-9 items-center justify-center border border-paper/25 bg-ink/35 text-paper" aria-hidden="true">
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">
                    <path v-for="iconPath in facility.iconPaths" :key="iconPath" :d="iconPath" />
                  </svg>
                </span>
                <h3 class="mt-4 font-display text-xl font-semibold text-paper">
                  {{ facility.title }}
                </h3>
                <p class="mt-2 text-xs leading-5 text-paper/80">
                  {{ facility.description }}
                </p>
              </div>
            </article>
          </div>

          <div data-reveal-item class="hidden aspect-[4/5] items-end justify-center overflow-hidden lg:flex" aria-hidden="true">
            <img src="/images/facilities-skyline.svg" alt="" width="916" height="508" loading="lazy" class="w-[145%] max-w-none translate-y-3 opacity-30">
          </div>
        </div>
      </FadeReveal>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
interface Facility {
  title: string
  description: string
  image: string
  iconPaths: string[]
}

const facilities: Facility[] = [
  {
    title: 'Airport Shuttle',
    description: 'Private airport transfers make every arrival and departure seamless.',
    image: '/images/hero/aerial-terrain.jpg',
    iconPaths: ['M3 16h18', 'M7 16l2-5h6l2 5', 'M9 11l1-4h4l1 4'],
  },
  {
    title: 'Parking',
    description: 'Secure on-site parking with attentive assistance throughout your stay.',
    image: '/images/gallery/grid-01.jpg',
    iconPaths: ['M7 20V4h6a4 4 0 0 1 0 8H7', 'M7 12h6'],
  },
  {
    title: 'Dining',
    description: 'Enjoy memorable dining experiences, from local favourites to international cuisine.',
    image: '/images/dining/dining-01-main.png',
    iconPaths: ['M7 3v8', 'M4 3v5a3 3 0 0 0 6 0V3', 'M7 11v10', 'M16 3v18', 'M16 3c3 2 4 5 4 8h-4'],
  },
  {
    title: 'Swimming Pool',
    description: 'Take a refreshing swim and relax beside the pool in a calm setting.',
    image: '/images/offers/swimming.jpg',
    iconPaths: ['M3 16c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1', 'M3 20c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1', 'M8 13V6a2 2 0 0 1 4 0'],
  },
  {
    title: 'Wellness',
    description: 'Restore your energy with relaxing treatments in our dedicated wellness spaces.',
    image: '/images/offers/stressless-spa.jpg',
    iconPaths: ['M12 21c4-3 7-6 7-11-4 0-7 2-7 6', 'M12 21C8 18 5 15 5 10c4 0 7 2 7 6', 'M12 16V4'],
  },
  {
    title: 'Breakfast',
    description: 'Begin each morning with a generous selection of fresh local and continental dishes.',
    image: '/images/offers/readymade-meal.jpg',
    iconPaths: ['M4 11h16', 'M6 11a6 6 0 0 1 12 0', 'M3 15h18', 'M12 5V3'],
  },
  {
    title: 'Wi-Fi',
    description: 'Stay connected with complimentary high-speed internet across the hotel.',
    image: '/images/meetings/business-class-lounge.jpg',
    iconPaths: ['M4 9a12 12 0 0 1 16 0', 'M7 13a8 8 0 0 1 10 0', 'M10 17a3 3 0 0 1 4 0', 'M12 20h.01'],
  },
  {
    title: 'IP TV & Personal Assistance',
    description: 'In-room entertainment and personal assistance keep every stay effortless.',
    image: '/images/rooms/executive-suite.jpg',
    iconPaths: ['M3 6h18v12H3z', 'M8 21h8', 'M9 3l3 3 3-3'],
  },
  {
    title: '24-Hour Security',
    description: 'Trained personnel and CCTV monitoring provide reassurance around the clock.',
    image: '/images/instagram/moment-5.jpg',
    iconPaths: ['M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z', 'M9 12l2 2 4-4'],
  },
  {
    title: 'Mini Bar',
    description: 'Enjoy a carefully selected range of refreshments in the comfort of your room.',
    image: '/images/dining/bbq-restaurant.jpg',
    iconPaths: ['M6 3h12l-2 7a4 4 0 0 1-8 0z', 'M12 14v7', 'M8 21h8'],
  },
  {
    title: 'Valet Laundry',
    description: 'Professional laundry, dry-cleaning, and pressing services keep you looking your best.',
    image: '/images/instagram/moment-4.jpg',
    iconPaths: ['M4 5h16v16H4z', 'M7 8h.01', 'M10 8h.01', 'M8 15a4 4 0 0 0 8 0 4 4 0 0 0-8 0'],
  },
  {
    title: 'Business Center',
    description: 'Stay productive with practical workspaces and dependable business support.',
    image: '/images/contact/hero-lounge.jpg',
    iconPaths: ['M4 7h16v13H4z', 'M9 7V4h6v3', 'M4 12h16', 'M10 12v2h4v-2'],
  },
  {
    title: 'Pickup & Drop-off',
    description: 'Reliable local transport helps you move around Dhaka with ease and confidence.',
    image: '/images/gallery/feature-09.jpg',
    iconPaths: ['M5 17h14l-1-6H6z', 'M7 11l2-4h6l2 4', 'M7 20h.01', 'M17 20h.01'],
  },
  {
    title: 'Butler Service',
    description: 'Warm, professional service anticipates your needs throughout every stay.',
    image: '/images/instagram/moment-2.jpg',
    iconPaths: ['M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M5 21a7 7 0 0 1 14 0', 'M9 14l3 3 3-3'],
  },
]
</script>
