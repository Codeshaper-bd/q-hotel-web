<template>
  <!--
    Newsletter sign-up closing every page just above the footer: one serif line
    of invitation, then a single email field joined to a gold "Subscribe"
    control — the same split-with-arrow CTA shape used across the site.
  -->
  <section
    aria-labelledby="newsletter-title"
    class="bg-paper px-5 pb-20  text-center text-ink sm:px-6"
  >
    <!-- The title animates itself (words rise, like the hero); only the form
         fades in through FadeReveal -->
    <FadeReveal :stagger="0.1">
      <h2
        id="newsletter-title"
        ref="titleRef"
        class="mx-auto max-w-[34rem] font-display text-xl font-normal leading-8 text-ink sm:text-2xl sm:leading-[34px]"
      >
        Be the first to receive exclusive offers, the latest updates, and
        unforgettable experiences at Q Hotel Dhaka.
      </h2>

      <form
        data-reveal-item
        class="mx-auto mt-6 flex w-full max-w-[34rem] items-stretch border border-champagne/60 bg-cream p-0.5"
        novalidate
        @submit.prevent="handleSubscribe"
      >
        <label for="newsletter-email" class="sr-only">Your email address</label>
        <input
          id="newsletter-email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          placeholder="Your email here"
          class="min-h-11 min-w-0 flex-1 bg-transparent px-4 text-sm text-ink placeholder:text-ink/60 focus:outline-none"
        >

        <!-- Gold two-part control: label + arrow, like BaseArrowCta, but a real
             submit button so Enter in the field also subscribes -->
        <button
          type="submit"
          class="group flex shrink-0 items-stretch gap-1 text-night focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <span
            class="flex min-h-11 items-center bg-champagne px-4 text-[0.7rem] font-semibold uppercase transition-colors duration-fast group-hover:bg-gold group-focus-visible:bg-gold"
          >
            Subscribe
          </span>
          <span
            class="flex min-h-11 w-11 items-center justify-center bg-champagne transition-colors duration-fast group-hover:bg-gold group-focus-visible:bg-gold"
            aria-hidden="true"
          >
            <svg
              class="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        </button>
      </form>
    </FadeReveal>
  </section>
</template>

<script setup lang="ts">
const email = ref('')

const titleRef = ref<HTMLElement | null>(null)
useWordReveal(titleRef)

// Newsletter submission is not yet wired to a backend; prevent the default
// navigation so the UI stays intact until the subscribe API is connected.
function handleSubscribe() {
  // TODO: POST `email.value` to the newsletter endpoint once available.
}
</script>
