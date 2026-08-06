<template>
  <section :aria-labelledby="headingId">
    <div class="flex items-center gap-4">
      <span class="h-9 w-1 shrink-0 bg-champagne" aria-hidden="true" />
      <h2 :id="headingId" class="font-display text-3xl text-ink sm:text-[2.75rem]">
        {{ title }}
      </h2>
    </div>

    <ul class="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="link in links" :key="link.to">
        <NuxtLink :to="link.to" class="group flex items-center gap-2.5 text-ink/70 transition-colors duration-fast hover:text-copper">
          <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40 transition-colors duration-fast group-hover:bg-copper" aria-hidden="true" />
          <span class="text-[1.0625rem]">{{ link.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  links: { label: string, to: string }[]
}>()

const headingId = `sitemap-group-${useId()}`
</script>
