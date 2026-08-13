<template>
  <section aria-label="Facilities highlights">
    <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      <li v-for="highlight in highlights" :key="highlight.title" class="flex min-h-48 flex-col items-center justify-center bg-paper px-6 py-8 text-center text-ink shadow-sm">
        <span class="flex size-12 items-center justify-center rounded-full bg-copper/10 text-copper" aria-hidden="true">
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">
            <path v-for="iconPath in highlight.iconPaths" :key="iconPath" :d="iconPath" />
          </svg>
        </span>
        <h2 class="mt-5 font-display text-xl font-semibold">{{ highlight.title }}</h2>
        <p class="mt-3 max-w-64 text-sm leading-6 text-muted">{{ highlight.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
interface FacilityHighlight {
  title: string
  description: string
  iconPaths: string[]
}

const highlights: FacilityHighlight[] = [
  {
    title: '12+ Facilities',
    description: 'Thoughtfully curated amenities for a comfortable and effortless stay.',
    iconPaths: ['M5 10.5h14v7H5z', 'M7.5 10.5V8.25a4.5 4.5 0 0 1 9 0v2.25', 'M8 14h8', 'M8 17.5V20M16 17.5V20'],
  },
  {
    title: 'Premium Experience',
    description: 'Exceptional comfort and quality designed for every guest.',
    iconPaths: ['M12 3.5 14 6l3-.25.5 3 2 2-2 2 .25 3-3-.5-2.25 2-2.25-2-3 .5.25-3-2-2 2-2 .5-3 3 .25z', 'M9.5 10.5 11 12l3.5-3.5'],
  },
  {
    title: 'Designed For You',
    description: 'Thoughtful spaces, modern comforts, and personalized care.',
    iconPaths: ['M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M16.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h1a4.5 4.5 0 0 1 4.5 4.5V19', 'M14 13h2.5a4 4 0 0 1 4 4v2'],
  },
  {
    title: 'Always At Your Service',
    description: 'Dedicated support available 24/7 whenever you need us.',
    iconPaths: ['M5 17h14', 'M7 17a5 5 0 0 1 10 0', 'M12 8v2', 'M10 6h4', 'M4 20h16'],
  },
]
</script>
