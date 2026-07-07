<template>
  <!--
    Frequently Asked Questions: an accessible single-open accordion beside a
    hand-drawn architectural line sketch. Composes <section> directly (not
    BaseSection) so the sketch can bleed off the container to the left
    viewport edge on large screens. Paper tone (not pure white).
  -->
  <section
    id="faq"
    aria-labelledby="faq-title"
    class="overflow-hidden bg-paper py-24 text-ink sm:py-32"
  >
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <!-- Architectural line sketch — bleeds to the left viewport edge on lg -->
      <FadeReveal>
        <div class="px-5 sm:px-6 lg:px-0">
          <img
            src="/images/faq-sketch.svg"
            alt=""
            width="808"
            height="747"
            class="mx-auto h-auto w-full max-w-md opacity-60 lg:max-w-none"
            aria-hidden="true"
          >
        </div>
      </FadeReveal>

      <!-- Heading + accordion, aligned to the xl container's right edge -->
      <div class="px-5 sm:px-6 lg:pl-0 lg:pr-[max(2rem,calc((100vw_-_90rem)/2_+_2rem))]">
        <FadeReveal>
          <div class="flex flex-col items-center text-center">
            <BaseKicker>Related Question</BaseKicker>
            <h2 id="faq-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
        </FadeReveal>

        <FadeReveal>
          <dl class="mt-10 border-t border-line/70">
            <div
              v-for="(item, index) in faqs"
              :key="item.question"
              class="border-b border-line/70"
            >
              <dt>
                <button
                  :id="`faq-question-${index}`"
                  type="button"
                  :aria-expanded="openIndex === index"
                  :aria-controls="`faq-answer-${index}`"
                  class="flex w-full items-center gap-4 py-5 text-left"
                  @click="toggle(index)"
                >
                  <span
                    :class="[
                      'shrink-0 transition-colors duration-fast',
                      openIndex === index ? 'text-copper' : 'text-ink/40',
                    ]"
                    aria-hidden="true"
                  >
                    <svg
                      class="h-4 w-4 transition-transform duration-normal ease-premium motion-reduce:transition-none"
                      :class="openIndex === index ? 'rotate-45' : ''"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <path stroke-linecap="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                  <span class="font-display text-lg text-ink sm:text-xl">
                    {{ item.question }}
                  </span>
                </button>
              </dt>
              <dd
                :id="`faq-answer-${index}`"
                role="region"
                :aria-labelledby="`faq-question-${index}`"
                :class="[
                  'grid transition-[grid-template-rows] duration-normal ease-premium motion-reduce:transition-none',
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                ]"
              >
                <div class="overflow-hidden">
                  <p class="max-w-xl pb-6 pl-8 text-sm leading-7 text-ink/60">
                    {{ item.answer }}
                  </p>
                </div>
              </dd>
            </div>
          </dl>
        </FadeReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'What are the check-in and check-out times at Q Hotel Dhaka?',
    answer: 'Check-in begins at 3:00 PM and check-out is until 12:00 noon. Early check-in and late check-out can be arranged on request, subject to availability.',
  },
  {
    question: 'Does Q Hotel Dhaka have in-room Wi-Fi?',
    answer: 'Yes. Complimentary high-speed Wi-Fi is available throughout the hotel — in every guest room and across all public areas — for all guests at no additional charge.',
  },
  {
    question: 'What is the closest airport near Q Hotel Dhaka?',
    answer: 'Hazrat Shahjalal International Airport (DAC) is the nearest airport, roughly 30 to 45 minutes away by car depending on traffic conditions.',
  },
  {
    question: 'What property amenities are available at Q Hotel Dhaka?',
    answer: 'Guests enjoy an outdoor swimming pool, a fitness centre and spa, multiple dining venues, 24-hour room service, and dedicated meeting and event spaces.',
  },
  {
    question: 'Does Q Hotel Dhaka have an airport shuttle to Hazrat Shahjalal International Airport (DAC)?',
    answer: 'Yes. A private airport shuttle to and from Hazrat Shahjalal International Airport can be arranged. Please contact our concierge in advance to schedule your transfer.',
  },
  {
    question: 'What are the parking options at Q Hotel Dhaka?',
    answer: 'Complimentary on-site parking is available for all guests, with 24-hour security and valet service offered on request.',
  },
]

// Single-open accordion; first item open by default
const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

// FAQ structured data for rich results
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(item => ({
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
