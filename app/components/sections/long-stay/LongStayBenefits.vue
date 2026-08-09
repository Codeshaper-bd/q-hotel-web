<template>
  <!--
    Everything You Need For A Longer, Better Stay: a 4-column asymmetric
    bento grid (two wide photos, one tall two-card column, and four benefit
    cards) that collapses to a single stacked column below lg. Every span is
    explicit so CSS Grid's row-major auto-flow lands each tile in the same
    cell the Figma layout uses — see the comment above each item for its
    intended (col, row).
  -->
  <BaseSection id="long-stay-benefits" labelled-by="long-stay-benefits-title" tone="paper" spacing="lg" container-size="xl" class="!pt-[76px] sm:!pt-[60px]">
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Why Choose Long Stay</BaseKicker>
        <h2 id="long-stay-benefits-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Everything You Need For A Longer, Better Stay
        </h2>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        <!-- col 1-2, row 1: lounge/bar photo -->
        <BentoPhoto
          src="/images/hero/lobby-interior.jpg"
          alt="Lounge and bar at Q Hotel Dhaka"
          :width="1136"
          :height="380"
          sizes="xs:100vw sm:100vw lg:64vw"
          aspect-class="aspect-[16/10] sm:aspect-[21/9]"
          class="sm:col-span-2 lg:col-span-2"
        />

        <!-- col 3, row 1-2: intro card + checklist card, stacked -->
        <div class="flex flex-col justify-center gap-8 bg-sand p-8 sm:col-span-2 lg:col-span-1 lg:row-span-2">
          <div class="flex flex-col items-center gap-3 text-center">
            <span class="flex h-[3.75rem] w-[3.75rem] items-center justify-center text-copper" aria-hidden="true">
              <svg class="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 21V5a2 2 0 012-2h8a2 2 0 012 2v16" />
                <path d="M9 21V3M15 12h.01" />
              </svg>
            </span>
            <h3 class="font-display text-2xl font-semibold text-ink">A Place To Call Home</h3>
            <hr class="w-20 border-t-2 border-copper">
            <p class="text-sm leading-5 text-ink/80">
              Perfect for business travelers, relocations, and extended stays of 10 nights or more.
            </p>
          </div>

          <ul class="flex flex-col gap-4 border-t border-copper pt-8 text-base text-ink">
            <li v-for="item in checklistItems" :key="item" class="flex items-center gap-1.5">
              <svg class="h-5 w-5 shrink-0 text-copper" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                <circle cx="10" cy="10" r="8.25" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 10.2l2 2 4-4.4" />
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- col 4, row 1: Better Rates -->
        <BenefitCard v-bind="betterRates" class="lg:col-span-1" />

        <!-- col 1, row 2: Housekeeping -->
        <BenefitCard v-bind="housekeeping" shade="sand" class="lg:col-span-1" />

        <!-- col 2, row 2-3: café/lounge photo -->
        <BentoPhoto
          src="/images/dining/bbq-restaurant.jpg"
          alt="Café and restaurant seating at Q Hotel Dhaka"
          :width="568"
          :height="560"
          sizes="xs:100vw sm:50vw lg:28vw"
          aspect-class="aspect-square"
          class="lg:col-span-1 lg:row-span-2"
        />

        <!-- col 4, row 2: Home Like Comfort -->
        <BenefitCard v-bind="homeLikeComfort" class="lg:col-span-1" />

        <!-- col 1, row 3: 24/7 Assistance -->
        <BenefitCard v-bind="assistance" shade="sand" class="lg:col-span-1" />

        <!-- col 3-4, row 3: reception/lobby photo -->
        <BentoPhoto
          src="/images/hero/lounge-suite.jpg"
          alt="Reception and lobby at Q Hotel Dhaka"
          :width="852"
          :height="380"
          sizes="xs:100vw sm:100vw lg:42vw"
          aspect-class="aspect-[16/10] sm:aspect-[21/9]"
          class="sm:col-span-2 lg:col-span-2"
        />
      </div>
    </FadeReveal>
  </BaseSection>
</template>

<script setup lang="ts">
const checklistItems = [
  'Better rates for longer stays',
  'Flexible stay options',
  'Personalized guest support',
]

interface BenefitCardData {
  title: string
  description: string
  iconPaths: string[]
}

const betterRates: BenefitCardData = {
  title: 'Better Rates',
  description: 'The longer you stay, the more rewarding your experience becomes. Enjoy exclusive long-stay rates, personalized offers, and added value designed to make extended visits more comfortable and affordable.',
  iconPaths: [
    'M12 2v20M17 5.5H9.5a3 3 0 000 6h5a3 3 0 010 6H7',
  ],
}

const housekeeping: BenefitCardData = {
  title: 'Housekeeping',
  description: 'Enjoy the comfort of regular housekeeping, fresh linens, and towel replacements throughout your stay. Our dedicated housekeeping team ensures your room remains clean, refreshed, and welcoming every day.',
  iconPaths: [
    'M5 21l6-14 2 4.5M11 21l6-14',
    'M9 3.5a2 2 0 114 0c0 1.1-2 2.5-2 2.5s-2-1.4-2-2.5z',
  ],
}

const assistance: BenefitCardData = {
  title: '24/7 Assistance',
  description: 'Our dedicated team is available around the clock to assist with every aspect of your stay, from special requests and local recommendations to housekeeping, transportation, and personalized services.',
  iconPaths: [
    'M12 21a9 9 0 100-18 9 9 0 000 18z',
    'M12 7.5V12l3 2',
  ],
}

const homeLikeComfort: BenefitCardData = {
  title: 'Home Like Comfort',
  description: 'Enjoy spacious rooms thoughtfully designed for extended stays, featuring premium amenities, dedicated workspaces, and modern comforts that create the perfect balance of productivity, relaxation, and everyday convenience.',
  iconPaths: [
    'M3 11l9-7 9 7M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5',
  ],
}
</script>
