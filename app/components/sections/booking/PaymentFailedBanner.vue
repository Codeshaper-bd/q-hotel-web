<template>
  <section aria-labelledby="payment-failed-title" class="relative isolate bg-ink text-paper">
    <div class="relative flex min-h-[32rem] items-center justify-center overflow-hidden py-24">
      <BaseImage
        src="/images/rooms/executive-suite.jpg"
        alt=""
        :width="1920"
        :height="900"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="absolute inset-0"
      />
      <div class="absolute inset-0 bg-[rgb(120,20,20)]/70" aria-hidden="true" />

      <div class="relative z-10 flex flex-col items-center gap-5 px-5 text-center">
        <span class="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[rgb(190,50,45)] text-paper" aria-hidden="true">
          <svg class="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </span>

        <h1 id="payment-failed-title" class="font-display text-4xl text-paper sm:text-5xl">
          Payment Unsuccessful
        </h1>

        <p class="max-w-xl text-base leading-7 text-paper/80">
          We couldn't complete your payment at this time. No amount has been charged to your account.
        </p>
        <p class="max-w-xl text-base leading-7 text-paper/80">
          You can try again, use a different payment method, or contact our team for assistance.
        </p>

        <div class="mt-2">
          <BaseArrowCta :to="tryAgainHref" variant="gold">
            Try Again
          </BaseArrowCta>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  tryAgainHref: string
}>()
</script>
