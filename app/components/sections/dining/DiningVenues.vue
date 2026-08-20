<template>
  <!--
    Dining page showcase: section heading above the loopable DiningCard —
    one card per venue, driven by `name` and its three images.
  -->
  <BaseSection
    tone="paper"
    spacing="sm"
    container-size="xl"
    aria-labelledby="dining-section-title"
    class="!py-[140px]"
  >
    <FadeReveal>
      <div class="mb-14 flex flex-col items-center text-center">
        <BaseKicker>Dine With Us</BaseKicker>
        <h2
          id="dining-section-title"
          class="mt-6 font-display font-semibold text-4xl sm:text-5xl text-[#0F0F10] lg:text-[56px]"
        >
          Exceptional Dining, Every Time
        </h2>
      </div>
    </FadeReveal>

    <div class="space-y-10">
      <FadeReveal
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        direction="up"
        :distance="32"
        start="top 92%"
      >
        <DiningCard
          :id="restaurant.id"
          :name="restaurant.name"
          :main-image="restaurant.mainImage"
          :top-image="restaurant.topImage"
          :bottom-image="restaurant.bottomImage"
          :reservation-recommended="restaurant.reservationRecommended"
        />
      </FadeReveal>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">

interface Restaurant {
  /** Anchor target on the page, matching the home showcase venue ids */
  id: string;
  name: string;
  mainImage: string;
  topImage: string;
  bottomImage: string;
  reservationRecommended?: boolean;
}

const restaurants: Restaurant[] = [
  {
    id: "restaurant-01",
    name: "Restaurant 01",
    mainImage: "/images/dining/dining-01-main.png",
    topImage: "/images/dining/dining-01-top.png",
    bottomImage: "/images/dining/dining-01-bottom.png",
  },
  {
    id: "restaurant-02",
    name: "Restaurant 02",
    mainImage: "/images/dining/dining-02-main.png",
    topImage: "/images/dining/dining-02-top.png",
    bottomImage: "/images/dining/dining-02-bottom.png",
    reservationRecommended: true,
  },
];
</script>
