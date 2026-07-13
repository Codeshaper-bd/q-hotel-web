<template>
  <!--
    Split call-to-action: a label segment beside a square arrow segment whose
    arrow swaps diagonally on hover — the signature CTA from the design
    (rooms "More Details", facilities "View All Facilities", venue "Book
    Space"). `outline` keeps the flush bordered look for dark sections,
    `gold` is the filled variant, `ghost` the light-section outline.
  -->
  <NuxtLink
    :to="to"
    :class="['arrow-cta group inline-flex items-stretch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4', rootClasses[variant]]"
  >
    <span :class="['flex min-h-11 items-center px-6 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-fast', labelClasses[variant]]">
      <slot />
    </span>
    <span
      :class="['arrow-cta-icon relative flex min-h-11 w-12 items-center justify-center overflow-hidden transition-colors duration-fast', iconClasses[variant]]"
      aria-hidden="true"
    >
      <!-- Defaults to the signature diagonal arrow; `icon` swaps in a different
           glyph (e.g. a social mark) without duplicating the whole CTA -->
      <slot name="icon">
        <svg class="arrow-cta-arrow arrow-cta-arrow-primary h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
        </svg>
        <svg class="arrow-cta-arrow arrow-cta-arrow-secondary h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
        </svg>
      </slot>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  to: string
  variant?: 'outline' | 'gold' | 'ghost'
}>(), {
  variant: 'gold'
})

type ArrowCtaVariant = NonNullable<typeof props.variant>

const rootClasses: Record<ArrowCtaVariant, string> = {
  outline: 'text-paper focus-visible:outline-champagne',
  gold: 'gap-1.5 text-night focus-visible:outline-champagne',
  ghost: 'gap-1.5 text-ink focus-visible:outline-ocean'
}

const labelClasses: Record<ArrowCtaVariant, string> = {
  outline: 'border border-r-0 border-paper/40 group-hover:border-champagne group-hover:bg-champagne/10 group-focus-visible:border-champagne group-focus-visible:bg-champagne/10',
  gold: 'bg-champagne group-hover:bg-gold group-focus-visible:bg-gold',
  ghost: 'border border-ink/25 group-hover:border-ink group-focus-visible:border-ink'
}

const iconClasses: Record<ArrowCtaVariant, string> = {
  outline: 'border border-champagne/60 text-champagne group-hover:border-champagne group-hover:bg-champagne group-hover:text-night group-focus-visible:border-champagne group-focus-visible:bg-champagne group-focus-visible:text-night',
  gold: 'bg-champagne text-night group-hover:bg-gold group-focus-visible:bg-gold',
  ghost: 'border border-ink/25 text-ink group-hover:border-ink group-focus-visible:border-ink'
}
</script>

<style scoped>
/* Diagonal arrow swap on hover/focus: the resting arrow exits top-right while
   its twin enters from bottom-left; static under reduced motion */
.arrow-cta-arrow {
  inset: auto;
  position: absolute;
  transition:
    opacity var(--duration-normal) var(--ease-premium),
    transform var(--duration-normal) var(--ease-premium);
}

.arrow-cta-arrow-secondary {
  opacity: 0;
  transform: translate(-0.85rem, 0.85rem);
}

@media (prefers-reduced-motion: no-preference) {
  .arrow-cta:hover .arrow-cta-arrow-primary,
  .arrow-cta:focus-visible .arrow-cta-arrow-primary {
    opacity: 0;
    transform: translate(0.85rem, -0.85rem);
  }

  .arrow-cta:hover .arrow-cta-arrow-secondary,
  .arrow-cta:focus-visible .arrow-cta-arrow-secondary {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
