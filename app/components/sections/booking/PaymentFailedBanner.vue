<template>
  <section
    aria-labelledby="payment-failed-title"
    class="relative isolate bg-ink text-paper"
  >
    <div
      class="relative flex h-[480px] items-center justify-center overflow-hidden mt-[--header-height] sm:h-[640px] lg:h-[800px]"
    >
      <BaseImage
        src="/images/hero/q-hotel-hero.jpg"
        alt=""
        :width="1920"
        :height="900"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="absolute inset-0"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90"
        aria-hidden="true"
      />

      <div
        class="relative z-10 flex flex-col items-center gap-3 px-5 text-center"
      >
        <span
          class="flex h-[4.5rem] w-[4.5rem] items-center justify-center"
          aria-hidden="true"
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 84C31.2 84 16 68.8 16 50C16 31.2 31.2 16 50 16C68.8 16 84 31.2 84 50C84 68.8 68.8 84 50 84ZM50 20C33.4 20 20 33.4 20 50C20 66.6 33.4 80 50 80C66.6 80 80 66.6 80 50C80 33.4 66.6 20 50 20Z"
              fill="#FD4C4C"
            />
            <path
              d="M64.5664 32.6055L67.3944 35.4355L35.4344 67.3955L32.6064 64.5675L64.5664 32.6055Z"
              fill="#FD4C4C"
            />
            <path
              d="M35.4344 32.6055L67.3944 64.5655L64.5664 67.3955L32.6064 35.4355L35.4344 32.6055Z"
              fill="#FD4C4C"
            />
          </svg>
        </span>

        <h1
          id="payment-failed-title"
          class="font-display text-4xl text-paper sm:text-5xl lg:text-[72px] font-bold"
        >
          Payment Unsuccessful
        </h1>

        <div class="max-w-xl">
          <p class="text-lg font-medium leading-7 text-paper">
            We couldn't complete your payment at this time.
          </p>
          <p class="text-lg font-medium leading-7 text-paper">
            No amount has been charged to your account.
          </p>
        </div>
        <p class="max-w-lg text-lg font-medium text-paper">
          You can try again, use a different payment method, or contact our team
          for assistance.
        </p>

        <div class="mt-10">
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
  tryAgainHref: string;
}>();
</script>
