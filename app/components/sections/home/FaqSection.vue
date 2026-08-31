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
    class="overflow-hidden bg-paper text-ink"
  >
    <div
      :class="[
        'faq-stage flex flex-col py-24 sm:py-32 lg:py-0',
        isHomeFaq ? '' : 'faq-stage--pinned',
      ]"
    >
      <!-- Section heading spans both columns, matching the approved composition. -->
      <div data-faq-reveal class="flex shrink-0 flex-col items-center px-5 text-center sm:px-6 lg:pt-[140px]">
        <BaseKicker>Good To Know</BaseKicker>
        <h2 id="faq-title" class="mt-6 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-[44px]">
          Frequently<br>Asked Questions
        </h2>
      </div>

      <div :class="isHomeFaq ? 'mt-20' : 'mt-12 lg:mt-6 lg:min-h-0 lg:flex-1'">
        <div
          ref="animationStageRef"
          :class="[
            'grid items-end gap-12 lg:grid-cols-2 lg:gap-10',
            isHomeFaq ? 'faq-animation-stage--home' : 'lg:h-full',
          ]"
        >
          <!-- Construction visual, grounded to the stage floor on lg -->
          <div class="flex items-end justify-center px-5 sm:px-6 lg:h-full lg:min-h-0 lg:px-8 lg:pb-6">
            <FaqBuildingVisual :progress="visualProgress" class="max-w-md lg:max-h-full lg:max-w-none" />
          </div>

          <!-- Accordion aligned to the xl container's right edge. -->
          <div class="px-5 sm:px-6 lg:min-h-0 lg:self-start lg:pl-0 lg:pr-[max(2rem,calc((100vw_-_90rem)/2_+_2rem))]">
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
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type { FaqPage } from '~/composables/useFaqs'

const sectionRef = ref<HTMLElement | null>(null)
const animationStageRef = ref<HTMLElement | null>(null)
/** 1 (completed) is the resting truth: SSR, mobile, and reduced motion never move it */
const visualProgress = ref(1)

const props = withDefaults(defineProps<{
  page?: FaqPage
  initialOpenIndex?: number | null
  /** Set false to keep the static completed layout (no pin/scrub) — used on pages
   *  where a fixed overlay would clash with controls below the fold */
  pinned?: boolean
}>(), {
  page: 'home',
  initialOpenIndex: 0,
  pinned: true,
})

const faqs = useFaqs(props.page)
const isHomeFaq = computed(() => props.page === 'home')

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
function applyContentProgress(progress: number, elements: HTMLElement[], indexOffset = 0) {
  if (!gsap) {
    return
  }

  elements.forEach((element, index) => {
    const sequenceIndex = index + indexOffset
    const start = sequenceIndex === 0 ? 0.02 : 0.08 + (sequenceIndex - 1) * 0.035
    const reveal = ramp(progress, start, start + 0.08)

    gsap.set(element, {
      autoAlpha: reveal,
      y: 20 * (1 - reveal),
    })

    // Restrained blur on the heading block only, cleared once it has landed
    if (sequenceIndex === 0) {
      element.style.filter = reveal < 1 ? `blur(${(4 * (1 - reveal)).toFixed(2)}px)` : 'none'
    }
  })
}

onMounted(async () => {
  await nextTick()

  const sectionElement = sectionRef.value
  const animationStageElement = animationStageRef.value

  if (!sectionElement || !animationStageElement || !gsap || !ScrollTrigger || prefersReducedMotion.value || !props.pinned) {
    return
  }

  const mediaMatcher = gsap.matchMedia()

  // The pinned experience needs width for two columns and height for the
  // stage; anything smaller keeps the static completed layout.
  mediaMatcher.add('(min-width: 1024px) and (min-height: 560px)', () => {
    const pinsContentOnly = isHomeFaq.value
    const triggerElement = pinsContentOnly ? animationStageElement : sectionElement
    const contentElements = gsap.utils.toArray<HTMLElement>('[data-faq-reveal]', triggerElement)
    const contentIndexOffset = pinsContentOnly ? 1 : 0

    const trigger = ScrollTrigger.create({
      trigger: triggerElement,
      start: () => `top top+=${readHeaderHeight()}`,
      end: '+=220%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        visualProgress.value = self.progress
        applyContentProgress(self.progress, contentElements, contentIndexOffset)
      },
      onRefresh: (self) => {
        visualProgress.value = self.progress
        applyContentProgress(self.progress, contentElements, contentIndexOffset)
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
/* The pinned frame is exactly the viewport below the fixed header. On home it
   begins after the heading and its 80px gap; shorter page collections pin the
   complete section as before. */
@media (min-width: 1024px) and (min-height: 560px) {
  .faq-stage--pinned,
  .faq-animation-stage--home {
    height: calc(100svh - var(--header-height));
  }
}
</style>
