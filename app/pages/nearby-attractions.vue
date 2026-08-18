<template>
  <div>
    <PageBanner
      title="Stay Close to Where Business Happens"
      description="Discover key business districts, convention centers, corporate destinations, and essential locations conveniently accessible from Q Hotel Dhaka."
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Nearby Attractions' },
      ]"
      image="/images/nearby/nearby-hero.png"
      title-class="lg:text-[72px] font-bold"
      description-class="max-w-[905px]"
    />
    <section aria-labelledby="terms-title" class="px-5 sm:px-8">
      <FadeReveal
        :stagger="0.12"
        :blur="6"
        class="mx-auto flex max-w-[880px] flex-col items-center pt-20 text-center sm:pt-28 lg:pt-36"
      >
        <div data-reveal-item>
          <BaseKicker transparent>location</BaseKicker>
        </div>

        <h2
          data-reveal-item
          id="terms-title"
          class="mt-10 font-display text-4xl font-semibold leading-tight text-ink sm:mt-12 sm:text-5xl lg:text-[56px]"
        >
          Find the Places That Matter Most
        </h2>
      </FadeReveal>
    </section>
    <NearbyAttractionsContent />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: "Nearby Attractions",
  description:
    "Key business districts, convention centers, and corporate destinations conveniently accessible from Q Hotel Dhaka — Hazrat Shahjalal Airport, ICCB, BCFCC, and Adamjee EPZ.",
  path: "/nearby-attractions",
});
</script>
