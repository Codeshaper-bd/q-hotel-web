<template>
  <BaseSection tone="paper" spacing="lg" container-size="xl">
    <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
      <svg class="h-8 w-8 text-champagne" viewBox="0 0 51 50" fill="currentColor" aria-hidden="true">
        <path v-for="(markPath, index) in qHotelLogoPaths" :key="index" :d="markPath" />
      </svg>
      <h2 class="mt-6 font-display text-4xl text-ink sm:text-5xl">
        Your Perfect Stay Begins Here in Dhaka
      </h2>
      <p class="mt-6 text-base leading-7 text-ink/65 sm:text-lg">
        Welcome to Q Hotel Dhaka, where modern comfort meets warm hospitality in the heart of the city. Designed for both business and leisure travelers, Q Hotel offers a seamless blend of contemporary style, personalized service, and exceptional convenience to ensure every guest enjoys a memorable stay.
      </p>
      <p class="mt-5 text-base leading-7 text-ink/65 sm:text-lg">
        At Q Hotel Dhaka, we are committed to creating a relaxing and welcoming experience from the moment you arrive. Our thoughtfully designed rooms and suites feature elegant interiors, modern amenities, and everything you need for a comfortable stay. Whether you're visiting for a business trip, a family vacation, or a weekend getaway, our dedicated team is here to provide attentive service and make every moment of your stay truly exceptional.
      </p>
    </div>

    <div class="mt-14 grid gap-4 sm:grid-cols-[2fr_1fr]">
      <div class="relative h-72 overflow-hidden sm:h-[26rem]">
        <BaseImage
          src="/images/hero/lounge-suite.jpg"
          alt="Q Hotel Dhaka lounge and dining area with warm ambient lighting"
          :width="1138"
          :height="700"
          sizes="xs:100vw sm:65vw"
          class="absolute inset-0"
        />
      </div>
      <div class="relative h-72 overflow-hidden sm:h-[26rem]">
        <BaseImage
          src="/images/dining/bbq-restaurant.jpg"
          alt="Q Hotel Dhaka dining room with stone feature wall and warm lighting"
          :width="558"
          :height="700"
          sizes="xs:100vw sm:32vw"
          class="absolute inset-0"
        />
      </div>
    </div>
  </BaseSection>
</template>
