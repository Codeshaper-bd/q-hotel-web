<template>
  <!--
    Full FAQ library for the dedicated /faqs page: one accordion per category,
    each with its own heading. Reuses the same FaqAccordion the home page
    teaser uses, so behaviour and visual language stay identical — only the
    scope is larger here. idPrefix keeps each category's element ids unique.
  -->
  <BaseSection tone="paper" spacing="lg" container-size="lg" aria-labelledby="faqs-list-title">
    <div class="flex flex-col items-center text-center">
      <BaseKicker>Have A Question</BaseKicker>
      <h2 id="faqs-list-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
        Everything You Need To Know
      </h2>
      <p class="mt-4 max-w-xl text-ink/60">
        Browse answers by topic, or reach out to our concierge team if you can't find what you're looking for.
      </p>
    </div>

    <div class="mx-auto mt-16 max-w-3xl space-y-14">
      <div v-for="(category, categoryIndex) in categories" :key="category.title">
        <h3 class="font-display text-2xl text-ink">
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
    items: [
      {
        question: 'How can I book a room at Q Hotel Dhaka?',
        answer: 'You can reserve directly through the "Reserve Now" button or the search console on our website, by calling our reservations desk, or by emailing info@qfl.com.bd. Booking direct guarantees our best available rate.',
      },
      {
        question: 'Can I modify or cancel my reservation?',
        answer: 'Yes. Most rates allow free changes or cancellation up to 48 hours before arrival. Non-refundable promotional rates may carry different terms, which are always shown before you confirm your booking.',
      },
      {
        question: 'Do you require a deposit at the time of booking?',
        answer: 'A valid credit card is required to guarantee your reservation. Depending on the rate and length of stay, a partial or full prepayment may be requested at booking.',
      },
      {
        question: 'Is it cheaper to book directly with the hotel?',
        answer: 'Yes. Booking through our official website or reservations desk guarantees the lowest available rate, along with member perks not offered through third-party channels.',
      },
    ],
  },
  {
    title: 'Rooms & Amenities',
    items: [
      {
        question: 'What are the check-in and check-out times?',
        answer: 'Check-in begins at 2:00 PM and check-out is until 12:00 noon. Early check-in and late check-out can be arranged on request, subject to availability.',
      },
      {
        question: 'Does Q Hotel Dhaka have in-room Wi-Fi?',
        answer: 'Yes. Complimentary high-speed Wi-Fi is available throughout the hotel — in every guest room and across all public areas — for all guests at no additional charge.',
      },
      {
        question: 'What property amenities are available?',
        answer: 'Guests enjoy an outdoor swimming pool, a fitness centre and spa, multiple dining venues, 24-hour room service, and dedicated meeting and event spaces.',
      },
      {
        question: 'Are extra beds or cribs available for children?',
        answer: 'Yes, extra beds and cribs can be arranged for an additional charge, subject to room capacity. Please let us know your requirements when booking.',
      },
    ],
  },
  {
    title: 'Dining',
    items: [
      {
        question: 'What dining options are available on-site?',
        answer: 'Q Hotel Dhaka features multiple restaurants and lounges serving local and international cuisine, alongside 24-hour in-room dining for guests.',
      },
      {
        question: 'Do you cater to dietary restrictions?',
        answer: 'Yes. Our culinary team can accommodate vegetarian, vegan, halal, and most common allergies with advance notice — just let our restaurant staff or concierge know.',
      },
      {
        question: 'Is breakfast included in the room rate?',
        answer: 'Many of our rates include complimentary breakfast; this is always shown clearly during booking. Breakfast can also be added to a room-only rate on request.',
      },
    ],
  },
  {
    title: 'Policies',
    items: [
      {
        question: 'What is your pet policy?',
        answer: 'Q Hotel Dhaka does not currently accommodate pets, with the exception of registered service animals. Please contact us in advance if you have specific accessibility needs.',
      },
      {
        question: 'Is smoking permitted on the property?',
        answer: 'Q Hotel Dhaka is a smoke-free property. Designated outdoor smoking areas are available; a cleaning fee applies for smoking inside guest rooms.',
      },
      {
        question: 'What identification do I need to check in?',
        answer: 'A valid government-issued photo ID (passport or national ID) is required at check-in for every registered guest, in line with local hospitality regulations.',
      },
    ],
  },
  {
    title: 'Location & Transport',
    items: [
      {
        question: 'What is the closest airport near Q Hotel Dhaka?',
        answer: 'Hazrat Shahjalal International Airport (DAC) is the nearest airport, roughly 30 to 45 minutes away by car depending on traffic conditions.',
      },
      {
        question: 'Does Q Hotel Dhaka have an airport shuttle?',
        answer: 'Yes. A private airport shuttle to and from Hazrat Shahjalal International Airport can be arranged. Please contact our concierge in advance to schedule your transfer.',
      },
      {
        question: 'What are the parking options at the hotel?',
        answer: 'Complimentary on-site parking is available for all guests, with 24-hour security and valet service offered on request.',
      },
    ],
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
