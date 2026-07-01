<template>
  <BaseSection id="experience" labelled-by="experience-title" tone="ink">
    <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <FadeReveal>
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-paper/55">Foundation</p>
          <h2 id="experience-title" class="mt-4 font-display text-4xl leading-tight sm:text-6xl">
            Built for calm browsing and ambitious storytelling.
          </h2>
        </div>
      </FadeReveal>

      <div class="grid gap-4 sm:grid-cols-3">
        <FadeReveal v-for="item in pillars" :key="item.title">
          <article class="h-full border border-paper/15 p-6">
            <h3 class="text-lg font-semibold">{{ item.title }}</h3>
            <p class="mt-4 text-sm leading-7 text-paper/68">{{ item.copy }}</p>
          </article>
        </FadeReveal>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
const pillars = [
  {
    title: 'Fast by default',
    copy: 'Static-ready pages, reserved media dimensions, scoped effects, and careful dependency boundaries.'
  },
  {
    title: 'Motion with restraint',
    copy: 'Reusable GSAP patterns, reduced-motion support, and cleanup hooks to avoid route-change leaks.'
  },
  {
    title: 'Readable to everyone',
    copy: 'Semantic sections, keyboard-friendly navigation, visible focus states, and real HTML content.'
  }
]
</script>
