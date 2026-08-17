<template>
  <div>
    <div class="flex flex-col items-center text-center">
      <h2 class="font-display text-4xl text-ink sm:text-5xl">What's Next?</h2>
      <p class="mt-3 text-base text-ink/60">Everything you need for a seamless stay.</p>
    </div>

    <div class="mt-[60px] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="card in cards" :key="card.title" class="flex flex-col items-center bg-white px-6 py-10 text-center">
        <span class="flex h-16 w-16 items-center justify-center rounded-full bg-champagne/20 text-copper" aria-hidden="true">
          <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path v-for="(iconPath, pathIndex) in card.iconPaths" :key="pathIndex" :d="iconPath" />
          </svg>
        </span>
        <h3 class="mt-5 font-display text-xl lg:text-[28px] font-semibold text-[#0F0F10]">{{ card.title }}</h3>
        <p class="mt-2 text-sm leading-6 text-ink/60">{{ card.description }}</p>
        <NuxtLink v-if="card.link" :to="card.link.to" class="mt-3 flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.06em] text-copper">
          {{ card.link.label }}
          <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface WhatsNextCard {
  title: string
  description: string
  iconPaths: string[]
  link?: { label: string, to: string }
}

const cards: WhatsNextCard[] = [
  {
    title: 'Before Arrival',
    description: 'Check-in begins at 2:00 PM. Early check-in is subject to availability.',
    iconPaths: ['M4 8h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1V8z', 'M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2', 'M4 12h16'],
  },
  {
    title: 'Airport Pickup',
    description: 'Enjoy a hassle-free airport transfer.',
    iconPaths: ['M5 17h14M6 17l1.2-6.5A2 2 0 019.15 9h5.7a2 2 0 011.95 1.5L18 17', 'M8 17v2M16 17v2', 'M9 9V7a3 3 0 013-3v0a3 3 0 013 3v2'],
    link: { label: 'Arrange Pickup', to: '/#facilities' },
  },
  {
    title: 'Contact Hotel',
    description: 'Our team is here to assist you anytime.',
    iconPaths: ['M4.5 4.5a15 15 0 0015 15l2.5-3-4.5-3-2 1.5a10.5 10.5 0 01-4.5-4.5L9 8 6 3.5z'],
    link: { label: 'Contact Us', to: 'tel:+8801713377700' },
  },
  {
    title: 'Dining',
    description: 'Explore our restaurants and bars.',
    iconPaths: ['M8 3v6.5M11 3v6.5M8 9.5a1.5 1.5 0 003 0M9.5 10.7V21', 'M16.5 3c-1.8 2.6-1.8 6.4 0 9V21'],
    link: { label: 'View Restaurants', to: '/#dining' },
  },
]
</script>
