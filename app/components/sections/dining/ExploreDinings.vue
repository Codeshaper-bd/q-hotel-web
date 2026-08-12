<!--
  Explore Dining Nearby section.
  Search bar with filter button, heading, and 3-column grid of dining cards.
  Each card shows category tag, name (link), and distance.
-->
<template>
  <BaseSection
    tone="paper"
    spacing="lg"
    container-size="xl"
    aria-labelledby="explore-dining-title"
  >
    <!-- Search / filter bar -->
    <div class="flex justify-center">
      <div class="inline-flex items-center gap-2 rounded-sm border border-line bg-paper px-4 py-2">
        <svg class="h-4 w-4 text-ink/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <button
          type="button"
          class="text-xs font-medium uppercase tracking-wider text-ink/70 hover:text-ink"
        >
          More Option
        </button>
      </div>
    </div>

    <!-- Heading -->
    <h2
      id="explore-dining-title"
      class="mt-8 text-center font-display text-3xl text-ink sm:text-4xl"
    >
      Explore Dining Nearby
    </h2>

    <!-- Cards grid -->
    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="venue in venues"
        :key="venue.name"
        class="rounded-sm border border-line bg-paper p-5 transition-colors duration-fast hover:border-ink/30"
      >
        <span class="mb-3 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink/50">
          {{ venue.category }}
        </span>
        <a
          :href="venue.url"
          class="inline-flex items-center gap-1.5 text-base font-medium text-ink hover:text-ocean"
        >
          {{ venue.name }}
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
        <p class="mt-2 text-xs text-ink/50">
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
