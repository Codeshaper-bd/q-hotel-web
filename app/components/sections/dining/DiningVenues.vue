<template>
  <!--
    Dining page showcase: a bento photo collage — one large main photograph in
    the left column, two photographs stacked in the right column. On desktop
    the main image is fixed at 740px tall and the top/bottom pair splits the
    right column so their combined height matches it exactly. Grid gap 16px.
  -->
  <BaseSection tone="paper" spacing="sm" container-size="xl" aria-labelledby="dining-section-title">
    <div class="flex flex-col items-center text-center mb-14">
      <BaseKicker>Dine With Us</BaseKicker>
      <h2 id="dining-section-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
        Exceptional Dining, Every Time
      </h2>
    </div>

    <div class=" bg-[#FDFBF7]  p-12">
      <h2 class="text-[44px] font-semibold text-[#000000]">Restaurant 01</h2>
      <p class="text-sm text-[#A75B27] uppercase">all-day dining</p>
      <div class="grid gap-4 md:grid-cols-2 mt-6">
        <!-- Left column: main image, fixed 740px on desktop -->
        <div class="col-span-2 md:col-span-1">
          <div class="aspect-[4/3] md:aspect-auto md:h-[560px] lg:h-[740px]">
            <BaseImage src="/images/dining/dining-01-main.png"
              alt="Q Hotel dining room with elegant tables and warm lighting" :width="1200" :height="900"
              sizes="xs:100vw sm:100vw lg:50vw" />
          </div>
        </div>

        <!-- Right column: top + bottom, combined height equals the main image -->
        <div class="col-span-2 flex flex-col gap-4 md:col-span-1">
          <div class="h-64 sm:h-80 md:h-[272px] lg:h-[362px]">
            <BaseImage src="/images/dining/dining-02-top.png" alt="Q Hotel rooftop lounge and bar at dusk" :width="800"
              :height="600" sizes="xs:100vw sm:100vw lg:50vw" />
          </div>

          <div class="h-64 sm:h-80 md:h-[272px] lg:h-[362px]">
            <BaseImage src="/images/dining/dining-03-bottom.png"
              alt="Q Hotel café with marble tables and patisserie counter" :width="800" :height="600"
              sizes="xs:100vw sm:100vw lg:50vw" />
          </div>
        </div>
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="col-span-2 md:col-span-1">
          <div class="bg-[#FCF8F0] p-5">
            <h3 class="text-2xl font-semibold text-[#0F0F10] mb-2 font-display">
              A vibrant all-day dining restaurant featuring an extensive menu of
              international and local favorites.
            </h3>
            <p class="text-sm text-[#505155]">
              Enjoy a diverse culinary experience inspired by international
              favorites and authentic local flavors. From fresh breakfasts and
              leisurely brunches to flavorful lunches, elegant dinners, high
              tea, and refreshing cocktails, every meal is thoughtfully prepared
              for every taste and occasion.
            </p>
          </div>
        </div>

        <div class="col-span-2 md:col-span-1">
          <BaseInfoCard :items="[
            {
              label: 'Contact',
              lines: ['Phone: +88-01713377700', 'Email: info@qhl.com.bd'],
              icon: IconContact,
            },
            {
              label: 'Opening Hours',
              value: '6:00 AM to 11:00 PM',
              icon: IconClock,
            },
            {
              label: 'Dress Code',
              value: 'Smart casual',
              icon: IconDressCode,
            },
          ]" />
        </div>
      </div>

      <div class="h-11"></div>
      <BaseDetailsGrid :items="[
        {
          label: 'Cuisine',
          values: [
            'Indian',
            'Indonesian',
            'Irish',
            'Italian',
            'Japanese',
            'Mediterranean',
            'Mexican',
            'Middle Eastern',
            'Pizza',
            'Seafood',
            'Steakhouse',
            'Sushi',
            'Tex-Mex',
            'Thai',
            'Local',
            'Asian',
            'International',
            'European',
          ],
          icon: IconCuisine,
        },
        {
          label: 'Open For (Everyday)',
          values: [
            'Breakfast',
            'Brunch',
            'Lunch',
            'Dinner',
            'High Tea',
            'Cocktail Hour',
          ],
          icon: IconClock,
          iconProps: { color: '#A75B27' },
        },
        {
          label: 'Ambience',
          values: ['Family-friendly', 'Traditional', 'Modern', 'Romantic'],
          icon: IconAmbience,
        },
        {
          label: 'Dietary Options',
          values: [
            'Halal',
            'Kosher',
            'Vegetarian',
            'Vegan',
            'Gluten-free',
            'Dairy-free',
          ],
          icon: IconClock,
          iconProps: { color: '#A75B27' },
        },
      ]" />

    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import IconContact from "~/components/base/IconContact.vue";
import IconClock from "~/components/base/IconClock.vue";
import IconDressCode from "~/components/base/IconDressCode.vue";
import IconCuisine from "~/components/base/IconCuisine.vue";
import IconAmbience from "~/components/base/IconAmbience.vue";
</script>
