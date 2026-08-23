<template>
  <!--
    Full FAQ library for the dedicated /faqs page: one accordion per category,
    each with its own heading. Reuses the same FaqAccordion the home page
    teaser uses, so behaviour and visual language stay identical — only the
    scope is larger here. idPrefix keeps each category's element ids unique.
  -->
  <BaseSection tone="paper" spacing="lg" container-size="lg" aria-labelledby="faqs-list-title" class="!pb-4 sm:!pb-8">
    <div class="flex flex-col items-center text-center">
      <BaseKicker>Good to Know</BaseKicker>
      <h2 id="faqs-list-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
        Everything You Need To Know
      </h2>
      <p class="mt-4 max-w-xl text-ink/60">
        Browse answers by topic, or reach out to our concierge team if you can't find what you're looking for.
      </p>
    </div>

    <div class="mx-auto mt-16 max-w-3xl space-y-14">
      <div v-for="(category, categoryIndex) in categories" :key="category.title">
        <h3 class="font-display text-2xl font-semibold text-[#373737]">
          {{ category.title }}
        </h3>
        <FaqAccordion :items="category.items" :id-prefix="`faq-${categoryIndex}`" class="mt-4" />
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { FaqCategory } from '~/types/faq'

const categories: FaqCategory[] = [
  {
    title: 'Booking & Reservations',
    items: useFaqs('booking').slice(0, 4),
  },
  {
    title: 'Rooms & Suites',
    items: [
      ...useFaqs('rooms').slice(0, 3),
      ...useFaqs('rooms').slice(5, 6),
    ],
  },
  {
    title: 'Dining',
    items: useFaqs('dining').slice(0, 3),
  },
  {
    title: 'Policies',
    items: useFaqs('policies').slice(0, 3),
  },
  {
    title: 'Location & Transport',
    items: useFaqs('location').slice(0, 3),
  },
]

// FAQ structured data for rich results, covering every category on this page
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: categories.flatMap(category => category.items).map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }),
    },
  ],
})
</script>
