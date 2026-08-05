<template>
  <div>
    <div class="flex flex-col items-center text-center">
      <h2 class="font-display text-4xl text-ink sm:text-5xl">What Would You Like To Do?</h2>
      <p class="mt-3 text-base text-ink/60">Choose an option below to continue your booking.</p>
    </div>

    <div class="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
      <div class="flex flex-col items-center bg-white px-6 py-10 text-center">
        <span class="flex h-16 w-16 items-center justify-center rounded-full bg-champagne/20 text-copper" aria-hidden="true">
          <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4.5 12a7.5 7.5 0 0113-5.1M19.5 12a7.5 7.5 0 01-13 5.1M4.5 4.5v4.5H9M19.5 19.5V15H15" />
          </svg>
        </span>
        <h3 class="mt-5 font-display text-xl text-ink">Try Again</h3>
        <p class="mt-2 text-sm leading-6 text-ink/60">Retry your payment with the same or a different card.</p>
        <NuxtLink :to="tryAgainHref" class="mt-3 flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.06em] text-copper">
          Try Again
          <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5" />
          </svg>
        </NuxtLink>
      </div>

      <div class="flex flex-col items-center bg-white px-6 py-10 text-center">
        <span class="flex h-16 w-16 items-center justify-center rounded-full bg-champagne/20 text-copper" aria-hidden="true">
          <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4.5 4.5a15 15 0 0015 15l2.5-3-4.5-3-2 1.5a10.5 10.5 0 01-4.5-4.5L9 8 6 3.5z" />
          </svg>
        </span>
        <h3 class="mt-5 font-display text-xl text-ink">Contact Support</h3>
        <p class="mt-2 text-sm leading-6 text-ink/60">Need help? Our team is here for you 24/7.</p>
        <a href="tel:+8801713377700" class="mt-3 flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.06em] text-copper">
          Contact Us
          <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tryAgainHref: string
}>()
</script>
