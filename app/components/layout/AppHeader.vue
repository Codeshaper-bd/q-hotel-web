<template>
  <header class="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur">
    <a class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-3 focus:text-paper" href="#main-content">
      Skip to content
    </a>

    <BaseContainer size="xl">
      <div class="flex min-h-[var(--header-height)] items-center justify-between gap-5">
        <NuxtLink to="/" class="font-display text-2xl font-semibold" aria-label="Q Hotel home">
          Q Hotel
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          <BaseLink v-for="item in navigationItems" :key="item.href" :to="item.href">
            {{ item.label }}
          </BaseLink>
        </nav>

          <BaseButton class="hidden md:inline-flex" href="#stay" variant="primary">
          Reserve
        </BaseButton>

        <button
          type="button"
          class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-line md:hidden"
          :aria-expanded="isOpen"
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true" class="relative h-3 w-5">
            <span :class="['absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-fast', isOpen ? 'translate-y-1.5 rotate-45' : '']" />
            <span :class="['absolute bottom-0 left-0 h-px w-5 bg-ink transition-transform duration-fast', isOpen ? '-translate-y-1.5 -rotate-45' : '']" />
          </span>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        :class="['grid overflow-hidden border-t border-line transition-[grid-template-rows] duration-normal ease-premium md:hidden', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]']"
        aria-label="Mobile navigation"
      >
        <div class="min-h-0">
          <div class="flex flex-col gap-4 py-5">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.href"
              :to="item.href"
              class="py-2 text-lg"
              @click="isOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
            <BaseButton href="#stay" variant="primary" @click="isOpen = false">
              Reserve
            </BaseButton>
          </div>
        </div>
      </nav>
    </BaseContainer>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)

const navigationItems = [
  { label: 'Overview', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Planning', href: '#stay' }
]

watch(() => route.fullPath, () => {
  isOpen.value = false
})
</script>
