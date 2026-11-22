<template>
  <BaseSection
    labelled-by="faqs-contact-title"
    tone="paper"
    spacing="md"
    container-size="lg"
    class="!pt-4 sm:!pt-10"
  >
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <h2
          id="faqs-contact-title"
          class="font-display text-4xl font-semibold text-ink sm:text-5xl"
        >
          Still Have Questions?
        </h2>
        <BaseArrowCta to="/contact" variant="gold" class="mt-8">
          Contact Us Now
        </BaseArrowCta>
      </div>
    </FadeReveal>
  </BaseSection>
</template>
