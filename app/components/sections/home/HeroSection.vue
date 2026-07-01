<template>
  <BaseSection id="hero" labelled-by="home-title" spacing="md" container-size="xl">
    <div class="grid min-h-[calc(100svh-var(--header-height)-2rem)] items-center gap-10 py-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="max-w-3xl">
        <p class="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-copper">Boutique hospitality</p>
        <h1 id="home-title" class="font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
          A calmer stay, shaped with precision.
        </h1>
        <p class="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          Q Hotel pairs measured luxury with thoughtful digital craft: fast, accessible, search-ready, and prepared for elevated motion.
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <BaseButton href="#experience">Explore foundation</BaseButton>
          <BaseButton href="#stay" variant="secondary">Plan a stay</BaseButton>
        </div>
      </div>

      <ClientOnly>
        <LazyHeroScene />
        <template #fallback>
          <div class="aspect-[4/5] w-full rounded-md bg-moss" aria-hidden="true" />
        </template>
      </ClientOnly>
    </div>
  </BaseSection>
</template>
