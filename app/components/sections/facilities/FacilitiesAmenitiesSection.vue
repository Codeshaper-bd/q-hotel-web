<!--
  Facilities & Amenities page section: quiet editorial grid of facility
  cards — warm surface, image, title, short description. No cards or
  shadows; thin spacing and restrained motion via FadeReveal.
-->
<template>
  <section aria-labelledby="facilities-amenities-title" class="bg-[#F5F1E9] text-[#171717]">
    <div class="mx-auto w-full max-w-[1316px] px-5 py-16 sm:px-6 lg:py-24">
      <FadeReveal>
        <div class="mx-auto max-w-[720px] text-center">
          <BaseKicker>What We Offer</BaseKicker>
          <h2 id="facilities-amenities-title" class="mt-6 font-display text-4xl font-semibold text-[#171717] sm:text-5xl lg:text-[56px]">
            Facilities &amp; Amenities
          </h2>
          <p class="mx-auto mt-5 max-w-[560px] text-sm leading-[1.8] text-[#505155]">
            Thoughtfully planned comforts and services — so every part of your stay is easy, relaxing, and memorable.
          </p>
        </div>
      </FadeReveal>

      <FadeReveal :stagger="0.07" :distance="32">
        <ul class="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          <li v-for="facility in facilities" :key="facility.title" data-reveal-item>
            <div class="aspect-[4/3] overflow-hidden bg-paper">
              <BaseImage
                :src="facility.image"
                :alt="facility.title"
                :width="720"
                :height="540"
                sizes="xs:100vw sm:50vw lg:33vw"
                class="h-full w-full object-cover transition-transform duration-[1100ms] ease-[var(--ease-premium)] hover:scale-[1.02]"
              />
            </div>
            <h3 class="mt-6 font-display text-xl font-semibold text-[#171717]">
              {{ facility.title }}
            </h3>
            <p class="mt-2 text-xs leading-[1.7] text-[#6b645c]">
              {{ facility.description }}
            </p>
          </li>
        </ul>
      </FadeReveal>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Facility {
  title: string
  description: string
  image: string
}

const facilities: Facility[] = [
  {
    title: 'Swimming Pool',
    description: 'Unwind with a refreshing dip in our outdoor swimming pool, open daily with poolside towels and attentive service.',
    image: '/images/offers/swimming.jpg',
  },
  {
    title: 'Fitness & Spa',
    description: 'Stay active in our well-equipped fitness centre and recharge with therapeutic spa treatments and massage services.',
    image: '/images/offers/stressless-spa.jpg',
  },
  {
    title: 'Breakfast',
    description: 'Start your day with a generous breakfast spread — continental and local favourites served fresh every morning.',
    image: '/images/offers/readymade-meal.jpg',
  },
  {
    title: 'BBQ & Bar',
    description: 'Evenings come alive with live-grill BBQ and handcrafted drinks at our signature restaurant and bar.',
    image: '/images/dining/bbq-restaurant.jpg',
  },
  {
    title: 'Free Wi-Fi',
    description: 'Complimentary high-speed internet throughout the hotel — in every room and across all public areas.',
    image: '/images/meetings/business-class-lounge.jpg',
  },
  {
    title: 'Airport Shuttle',
    description: 'Arrive and depart with ease. Private airport transfers to and from Hazrat Shahjalal International Airport.',
    image: '/images/hero/aerial-terrain.jpg',
  },
  {
    title: 'Vehicle Parking',
    description: 'Complimentary on-site parking with 24-hour security and valet service available on request.',
    image: '/images/hero/lobby-interior.jpg',
  },
  {
    title: 'Laundry Service',
    description: 'Same-day laundry, dry-cleaning, and pressing services to keep you polished for every occasion.',
    image: '/images/rooms/deluxe-double.jpg',
  },
  {
    title: 'CCTV Security',
    description: 'Around-the-clock CCTV coverage and trained security staff keep every corner of the hotel safe.',
    image: '/images/instagram/moment-5.jpg',
  },
]
</script>
