<template>
  <div>
    <PageBanner
      title="Hotel Policy"
      :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Hotel Policy' }]"
      image="/images/terms/priveccy-hero-bannar.png"
      overlay-class="bg-ink/40"
    />
    <section
      aria-labelledby="terms-title"
      class="px-5 sm:px-8"
    >
      <FadeReveal
        :stagger="0.12"
        :blur="6"
        class="mx-auto flex max-w-[880px] flex-col items-center pt-20 text-center sm:pt-28 lg:pt-36"
      >
        <div data-reveal-item>
          <BaseKicker transparent>hotel policy</BaseKicker>
        </div>

        <h2
          data-reveal-item
          id="terms-title"
          class="mt-10 font-display text-4xl font-medium leading-tight text-ink sm:mt-12 sm:text-5xl lg:text-6xl"
        >
          Everything You Need to Know
        </h2>
      </FadeReveal>

    </section>
    <HotelPolicyContent />
    <div class="h-10"></div>
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: "Hotel Policy",
  description:
    "Read the guest policies of Q Hotel Dhaka — check-in and check-out times, reservation, cancellation, payment, smoking, pet, and house rules.",
  path: "/hotel-policy",
});
</script>
