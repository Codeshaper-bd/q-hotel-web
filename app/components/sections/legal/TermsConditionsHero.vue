<template>
  <section
    aria-labelledby="terms-title"
    class="mt-[var(--header-height)] px-5 sm:px-8"
  >
    <FadeReveal
      :stagger="0.12"
      :blur="6"
      class="mx-auto flex max-w-[880px] flex-col items-center pt-20 text-center sm:pt-28 lg:pt-36"
    >
      <div data-reveal-item>
        <BaseKicker transparent>Terms & Conditions</BaseKicker>
      </div>

      <h2
        data-reveal-item
        id="terms-title"
        class="mt-10 font-display text-4xl font-medium leading-tight text-ink sm:mt-12 sm:text-5xl lg:text-6xl"
      >
        Terms Designed for a Seamless Stay
      </h2>
    </FadeReveal>

    <div class="pb-16 sm:pb-24" aria-hidden="true" />
  </section>
</template>