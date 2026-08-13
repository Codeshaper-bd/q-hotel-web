<!--
  Explore Dining Nearby section.
  Search bar with filter button, heading, and 3-column grid of dining cards.
  Each card shows category tag, name (link), and distance.
-->
<template>
  <BaseSection tone="paper" spacing="lg" container-size="xl" class="!pt-20 !pb-[140px]" aria-labelledby="explore-dining-title">

    <FadeReveal>
      <div class="mb-14 flex flex-col items-center text-center">
        <BaseKicker> More Option</BaseKicker>
        <h2 id="dining-section-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Explore Dining Nearby
        </h2>
      </div>
    </FadeReveal>

    <!-- Cards grid -->
    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="venue in venues" :key="venue.name"
        class="bg-white p-6 transition-colors duration-fast hover:border-ink/30">
        <span class="mb-4 block text-sm text-[#373737] uppercase">
          {{ venue.category }}
        </span>
        <a :href="venue.url" class="inline-flex items-center gap-1.5 text-xl text-[#0F0F10] underline font-medium hover:text-ocean">
          {{ venue.name }}
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
        <p class="mt-5 text-sm text-[#373737]">
          {{ venue.distance }}
        </p>
      </article>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
type NearbyVenue = {
  name: string
  category: string
  distance: string
  url: string
}

const venues: NearbyVenue[] = [
  {
    name: 'Saleha Tea Stall',
    category: 'Cafe/Bar',
    distance: '6 KM',
    url: '#'
  },
  {
    name: 'Awlad Tea Stall',
    category: 'Cafe/Bar',
    distance: '6 KM',
    url: '#'
  },
  {
    name: 'Laboni Restaurant',
    category: 'Restaurant',
    distance: '5 KM',
    url: '#'
  }
]
</script>
