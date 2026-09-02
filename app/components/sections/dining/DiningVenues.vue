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
    class=""
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
          :tagline="restaurant.tagline"
          :main-image="restaurant.mainImage"
          :top-image="restaurant.topImage"
          :bottom-image="restaurant.bottomImage"
          :intro-title="restaurant.introTitle"
          :description="restaurant.description"
          :contact-lines="restaurant.contactLines"
          :opening-hours="restaurant.openingHours"
          :dress-code="restaurant.dressCode"
          :cuisine="restaurant.cuisine"
          :open-for="restaurant.openFor"
          :ambience="restaurant.ambience"
          :dietary-options="restaurant.dietaryOptions"
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
  tagline: string;
  mainImage: string;
  topImage: string;
  bottomImage: string;
  introTitle: string;
  description: string;
  contactLines: string[];
  openingHours: string;
  dressCode: string;
  cuisine: string[];
  openFor: string[];
  ambience: string[];
  dietaryOptions: string[];
  reservationRecommended?: boolean;
}

const restaurants: Restaurant[] = [
  {
    id: "AllDayDining",
    name: "All-Day Dining",
    tagline: "All-Day Dining",
    mainImage: "/images/dining/dining-01-main.png",
    topImage: "/images/dining/dining-01-top.png",
    bottomImage: "/images/dining/dining-01-bottom.png",
    introTitle:
      "A Vibrant All-Day Dining Restaurant Featuring an Extensive Menu of International and Local Favorites.",
    description:
      "Q Hotel Dhaka's all-day dining restaurant offers a vibrant and inviting culinary experience, serving an extensive selection of international and local delicacies throughout the day. Start your morning with a vast and lavish breakfast buffet featuring an impressive spread of continental, Asian, and local favorites, followed by satisfying lunch and dinner options complete with live cooking stations, curated buffet selections, and à la carte choices. Designed with a warm and contemporary ambiance, it provides the perfect setting for leisurely family meals, business lunches, or casual dining with friends.",
    contactLines: ["Phone: +88-01713377700", "Email: info@qhl.com.bd"],
    openingHours: "6:00 AM to 11:00 PM",
    dressCode: "Smart casual",
    cuisine: [
      "Indian",
      "Indonesian",
      "Irish",
      "Italian",
      "Japanese",
      "Mediterranean",
      "Mexican",
      "Middle Eastern",
      "Pizza",
      "Seafood",
      "Steakhouse",
      "Sushi",
      "Tex-Mex",
      "Thai",
      "Local",
      "Asian",
      "International",
      "European",
    ],
    openFor: [
      "Breakfast",
      "Brunch",
      "Lunch",
      "Dinner",
      "High Tea",
      "Cocktail Hour",
    ],
    ambience: ["Family-friendly", "Traditional", "Modern", "Romantic"],
    dietaryOptions: [
      "Halal",
      "Kosher",
      "Vegetarian",
      "Vegan",
      "Gluten-free",
      "Dairy-free",
    ],
  },
  {
    id: "cafeDeli",
    name: "Cafe Deli",
    tagline: "Cafe & Deli",
    mainImage: "/images/dining/cafe-deli-main.png",
    topImage: "/images/dining/cafe-deli-top.png",
    bottomImage: "/images/dining/cafe-deli-bottom.png",
    introTitle:
      "A Cozy Café Experience Featuring Premium Coffees, Fine Teas, Freshly Baked Pastries, and Gourmet Delights.",
    description:
      "Nestled within Q Hotel Dhaka, this charming café deli invites guests to savor expertly crafted coffees, fine teas, and freshly baked delicacies in a relaxed and inviting setting. From artisanal pastries and gourmet sandwiches to indulgent desserts, the menu is thoughtfully curated to satisfy every craving. With its stylish yet comfortable atmosphere, the café is perfect for casual catch-ups, light business discussions, or a leisurely break throughout the day.",
    contactLines: ["Phone: +88-01713377700", "Email: info@qhl.com.bd"],
    openingHours: "08:00 AM to 10:00 PM",
    dressCode: "Smart casual",
    cuisine: [
      "Coffee & Beverages",
      "Bakery & Pastries",
      "Sandwiches",
      "Desserts",
      "Light Snacks",
      "International Favorites",
    ],
    openFor: [
      "Breakfast",
      "Brunch",
      "Lunch",
      "Afternoon Tea",
      "Evening Refreshments",
    ],
    ambience: ["Casual", "Modern", "Cozy", "Relaxed"],
    dietaryOptions: [
      "Halal",
      "Vegetarian",
      "Gluten-Free Options",
      "Dairy-Free Options",
    ],
  },
  {
    id: "panAsian",
    name: "BBQ / Pan Asian",
    tagline: "BBQ / Pan Asian",
    mainImage: "/images/dining/pan-asian-main.png",
    topImage: "/images/dining/pan-asian-top.png",
    bottomImage: "/images/dining/pan-asian-bottom.png",
    introTitle:
      "Unwind in Our Stylish Lounge With Handcrafted Drinks, Light Bites, and Panoramic City Views.",
    description:
      "Perched on the 19th floor of Q Hotel Dhaka, this exquisite Pan Asian and BBQ fine dining restaurant offers a culinary journey through bold, authentic flavors paired with breathtaking panoramic views of the city. Guests seeking a more intimate experience can dine on the striking sky bridge, an idyllic setting for candlelight dinners and special celebrations beneath the open sky. The restaurant's seamless access to the 20th floor further elevates the experience, unveiling a mesmerizing vista of the city lights, making it an unforgettable destination for both refined dining and memorable moments.",
    contactLines: ["Phone: +88-01713377700", "Email: info@qhl.com.bd"],
    openingHours: "12:00 PM – 11:00 PM",
    dressCode: "Smart casual",
    cuisine: ["Grill/BBQ"],
    openFor: ["Lunch", "Dinner", "Cocktail Hour"],
    ambience: ["Family-friendly", "Traditional", "Modern", "Romantic"],
    dietaryOptions: ["Halal", "Kosher", "Gluten-free", "Dairy-free"],
    reservationRecommended: true,
  },
];
</script>
