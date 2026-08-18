<template>
  <BaseSection tone="paper" spacing="md" container-size="lg">
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <h2
          id="error-content-title"
          class="font-display text-4xl font-semibold text-[#0F0F10] sm:text-5xl lg:text-[56px]"
        >
          {{ title }}
        </h2>
        <p
          class="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base lg:text-lg lg:font-medium"
        >
          {{ description }}
        </p>
        <div class="mt-8 flex flex-col items-center justify-center sm:flex-row">
          <div>
            <BaseArrowCta
              :to="homeLink"
              variant="gold"
              label-class="flex-1 justify-center whitespace-nowrap"
              class="w-full min-w-[185px] sm:w-auto sm:flex-1"
            >
              Back To Homepage
            </BaseArrowCta>
          </div>

          <div>
            <BaseArrowCta
              :to="reservationLink"
              variant="ghost"
              label-class="flex-1 justify-center whitespace-nowrap"
              class="mt-5 w-full min-w-[185px] sm:mt-0 sm:w-auto sm:flex-1 sm:ml-5"
            >
              Reserve Now
            </BaseArrowCta>
          </div>
        </div>
      </div>
    </FadeReveal>
  </BaseSection>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    homeLink?: string;
    reservationLink?: string;
  }>(),
  {
    title: "Page Not Found",
    description:
      "We looked everywhere, but couldn't find the page you requested. Shall we start a new exploration?",
    homeLink: "/",
    reservationLink: "/rooms",
  },
);
</script>

<style scoped>
.arrow-cta :deep(.arrow-cta-icon) {
  width: 44px;
  flex-shrink: 0;
}
</style>
