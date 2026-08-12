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
  >
    <div class="mb-14 flex flex-col items-center text-center">
      <BaseKicker>Dine With Us</BaseKicker>
      <h2
        id="dining-section-title"
        class="mt-6 font-display text-4xl text-ink sm:text-5xl"
      >
        Exceptional Dining, Every Time
      </h2>
    </div>

    <div class="space-y-10">
      <DiningCard
        v-for="restaurant in restaurants"
        :key="restaurant.name"
        :name="restaurant.name"
        :main-image="restaurant.mainImage"
        :top-image="restaurant.topImage"
        :bottom-image="restaurant.bottomImage"
      />
    </div>
  </BaseSection>
</template>

<script setup lang="ts">

interface Restaurant {
  name: string;
  mainImage: string;
  topImage: string;
  bottomImage: string;
}

const restaurants: Restaurant[] = [
  {
    name: "Restaurant 01",
    mainImage: "/images/dining/dining-01-main.png",
    topImage: "/images/dining/dining-01-top.png",
    bottomImage: "/images/dining/dining-01-bottom.png",
  },
  {
    name: "Restaurant 02",
    mainImage: "/images/dining/dining-02-main.png",
    topImage: "/images/dining/dining-02-top.png",
    bottomImage: "/images/dining/dining-02-bottom.png",
  },
];
</script>
