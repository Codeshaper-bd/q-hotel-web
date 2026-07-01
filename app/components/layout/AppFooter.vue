<template>
  <footer class="border-t border-line bg-ink py-12 text-paper">
    <BaseContainer size="xl">
      <div class="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p class="font-display text-3xl">Q Hotel</p>
          <p class="mt-3 max-w-xl text-sm leading-6 text-paper/70">
            A quiet foundation for a high-performance hospitality experience, ready for richer content, motion, and media.
          </p>
        </div>
        <nav class="flex flex-wrap gap-x-6 gap-y-3 text-sm text-paper/75" aria-label="Footer navigation">
          <NuxtLink to="#hero">Overview</NuxtLink>
          <NuxtLink to="#experience">Experience</NuxtLink>
          <NuxtLink to="#stay">Planning</NuxtLink>
        </nav>
      </div>
    </BaseContainer>
  </footer>
</template>
