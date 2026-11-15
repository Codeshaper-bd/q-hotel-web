<template>
  <!--
    Frequently Asked Questions as an architectural construction experience: on
    the home page the heading scrolls away before the building + accordion
    stage pins for ~220vh. Page-specific FAQ collections keep the original
    full-section pin. The building is assembled on the left — grid, foundation,
    structural drawing, materials, window lights, landscaping — while the FAQ
    content stages in on the right.

    Mobile, short viewports, reduced motion, and no-JS all skip the pin and
    show the completed building with the plain accordion — the animation is an
    enhancement, never a requirement. Composes <section> directly (not
    BaseSection) because the pinned stage owns its own height and gutters.
  -->
  <section
    id="faq"
    ref="sectionRef"
    aria-labelledby="faq-title"
    class="overflow-clip bg-paper text-ink"
  >
    <div :class="['faq-stage flex flex-col', isHomeFaq ? 'pb-12 pt-24 sm:py-32 lg:py-0' : 'py-24 sm:py-32 lg:py-24']">
      <!-- Section heading spans both columns, matching the approved composition. -->
      <div data-faq-reveal :class="['flex shrink-0 flex-col items-center px-5 text-center sm:px-6', isHomeFaq ? 'lg:pt-[140px]' : 'lg:pt-0']">
        <h2 id="faq-title" ref="titleRef" class="font-display text-[32px] font-semibold leading-[1.05] text-[#0F0F10] sm:text-5xl lg:text-[44px]">
          Frequently<br>Asked Questions
        </h2>
      </div>

      <div :class="isHomeFaq ? 'mt-20' : 'mt-14'">
        <div
          ref="animationStageRef"
          :class="['grid gap-12 lg:grid-cols-2 lg:gap-10', isHomeFaq ? 'items-end' : 'items-start']"
        >
          <!-- Construction visual: sticky on home so building stays visible as FAQ scrolls -->
          <!-- Sized from --header-nav-height, never --header-height: that token
               flips with the promo bar as the page scrolls, which used to make
               the sketch grow and shrink while scrolling. -->
          <div
            data-faq-visual
            :class="[
              'flex items-end justify-center overflow-hidden px-5 sm:px-6 lg:sticky lg:top-[var(--header-nav-height)] lg:self-start lg:px-8 lg:pb-6',
              isHomeFaq ? 'lg:h-[calc(100svh-var(--header-nav-height)-6rem)]' : '',
            ]"
          >
            <FaqSketch
              :class="['max-w-md lg:max-w-none', isHomeFaq ? 'lg:max-h-full' : 'lg:max-h-[70vh]']"
            />
          </div>

          <!-- Accordion aligned to the xl container's right edge. -->
          <!-- Home: bottom-anchored with the same 24px inset as the sketch
               column, so the last question sits on the sketch's bottom line
               and the list grows upward from there. -->
          <div
            :class="[
              'relative z-10 px-5 sm:px-6 lg:pl-0 lg:pr-[max(2rem,calc((100vw_-_90rem)/2_+_2rem))]',
              isHomeFaq ? 'lg:self-end lg:pb-6' : 'lg:self-start',
            ]"
          >
            <FaqAccordion
              :items="faqs"
              :initial-open-index="initialOpenIndex"
              :compact="isHomeFaq"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FaqPage } from '~/composables/useFaqs'

const sectionRef = ref<HTMLElement | null>(null)
const animationStageRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
useWordReveal(titleRef)

const props = withDefaults(defineProps<{
  page?: FaqPage
  initialOpenIndex?: number | null
  /** Retained for existing callers: the scroll-driven pin/scrub reveal is gone,
   *  so this no longer changes behaviour */
  pinned?: boolean
}>(), {
  page: 'home',
  initialOpenIndex: 0,
  pinned: true,
})

const faqs = useFaqs(props.page)

// The sketch column and the questions arrive on their own timing (title
// first, then a soft wave), never tied to scroll position, so nothing resizes
// or flickers as the visitor scrolls. See useWaveReveal.
useWaveReveal(sectionRef, '[data-faq-visual], dl [data-faq-reveal]')
const isHomeFaq = computed(() => props.page === 'home')

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
