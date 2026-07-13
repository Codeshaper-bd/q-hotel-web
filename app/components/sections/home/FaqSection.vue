<template>
  <!--
    Frequently Asked Questions as an architectural construction experience: on
    large screens the section pins for ~220vh while the Q Hotel building is
    assembled on the left — grid, foundation, structural drawing, materials,
    window lights, landscaping — and the FAQ content stages in on the right,
    readable and interactive throughout (the accordion is ordinary DOM inside
    the pinned layout; nothing overlays it).

    Mobile, short viewports, reduced motion, and no-JS all skip the pin and
    show the completed building with the plain accordion — the animation is an
    enhancement, never a requirement. Composes <section> directly (not
    BaseSection) because the pinned stage owns its own height and gutters.
  -->
  <section
    id="faq"
    ref="sectionRef"
    aria-labelledby="faq-title"
    class="overflow-hidden bg-paper text-ink"
  >
    <div class="faq-stage grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-2 lg:gap-10 lg:py-0">
      <!-- Construction visual, grounded to the stage floor on lg -->
      <div class="flex items-end justify-center px-5 sm:px-6 lg:h-full lg:px-8 lg:pb-6 lg:pt-24">
        <FaqBuildingVisual :progress="visualProgress" class="max-w-md lg:max-h-full lg:max-w-none" />
      </div>

      <!-- Heading + accordion, aligned to the xl container's right edge -->
      <div class="px-5 sm:px-6 lg:max-h-full lg:self-center lg:pl-0 lg:pr-[max(2rem,calc((100vw_-_90rem)/2_+_2rem))]">
        <div data-faq-reveal class="flex flex-col items-center text-center">
          <BaseKicker>Related Question</BaseKicker>
          <h2 id="faq-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>

        <FaqAccordion :items="faqs" class="mt-10" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type { FaqItem } from '~/types/faq'

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

const sectionRef = ref<HTMLElement | null>(null)
/** 1 (completed) is the resting truth: SSR, mobile, and reduced motion never move it */
const visualProgress = ref(1)

const { gsap, prefersReducedMotion } = useGsap()
const { addCleanup } = useAnimationCleanup()
const nuxtApp = useNuxtApp()
const ScrollTrigger = nuxtApp.$ScrollTrigger as typeof ScrollTriggerType | undefined

/** Piecewise-linear ramp: 0 before `from`, 1 after `to` */
function ramp(progress: number, from: number, to: number): number {
  return Math.min(1, Math.max(0, (progress - from) / (to - from)))
}

/** FAQ content stages in early: the heading arrives with the foundation, the
 *  questions with the structure — readable long before the building finishes */
function applyContentProgress(progress: number, elements: HTMLElement[]) {
  if (!gsap) {
    return
  }

  elements.forEach((element, index) => {
    const start = index === 0 ? 0.02 : 0.08 + (index - 1) * 0.035
    const reveal = ramp(progress, start, start + 0.08)

    gsap.set(element, {
      autoAlpha: reveal,
      y: 20 * (1 - reveal),
    })

    // Restrained blur on the heading block only, cleared once it has landed
    if (index === 0) {
      element.style.filter = reveal < 1 ? `blur(${(4 * (1 - reveal)).toFixed(2)}px)` : 'none'
    }
  })
}

onMounted(async () => {
  await nextTick()

  const sectionElement = sectionRef.value

  if (!sectionElement || !gsap || !ScrollTrigger || prefersReducedMotion.value) {
    return
  }

  const mediaMatcher = gsap.matchMedia()

  // The pinned experience needs width for two columns and height for the
  // stage; anything smaller keeps the static completed layout.
  mediaMatcher.add('(min-width: 1024px) and (min-height: 560px)', () => {
    const contentElements = gsap.utils.toArray<HTMLElement>('[data-faq-reveal]', sectionElement)

    const trigger = ScrollTrigger.create({
      trigger: sectionElement,
      start: () => `top top+=${readHeaderHeight()}`,
      end: '+=220%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        visualProgress.value = self.progress
        applyContentProgress(self.progress, contentElements)
      },
      onRefresh: (self) => {
        visualProgress.value = self.progress
        applyContentProgress(self.progress, contentElements)
      },
    })

    return () => {
      trigger.kill()
      // Back to the resting truth: completed building, content untouched
      visualProgress.value = 1
      gsap.set(contentElements, { clearProps: 'all' })
      contentElements.forEach((element) => {
        element.style.filter = ''
      })
    }
  })

  addCleanup(() => mediaMatcher.revert())
})

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

<style scoped>
/* Pinned stage: exactly the viewport below the fixed header while the
   construction sequence scrubs; natural flow everywhere else */
@media (min-width: 1024px) and (min-height: 560px) {
  .faq-stage {
    height: calc(100svh - var(--header-height));
  }
}
</style>
