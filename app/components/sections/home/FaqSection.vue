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
    <div :class="['faq-stage flex flex-col', isHomeFaq ? 'py-24 sm:py-32 lg:py-0' : 'py-24 sm:py-32 lg:py-24']">
      <!-- Section heading spans both columns, matching the approved composition. -->
      <div data-faq-reveal :class="['flex shrink-0 flex-col items-center px-5 text-center sm:px-6', isHomeFaq ? 'lg:pt-[140px]' : 'lg:pt-0']">
        <BaseKicker>Good To Know</BaseKicker>
        <h2 id="faq-title" class="mt-6 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-[44px]">
          Frequently<br>Asked Questions
        </h2>
      </div>

      <div :class="isHomeFaq ? 'mt-20' : 'mt-14'">
        <div
          ref="animationStageRef"
          :class="['grid gap-12 lg:grid-cols-2 lg:gap-10', isHomeFaq ? 'items-end' : 'items-start']"
        >
          <!-- Construction visual: sticky on home so building stays visible as FAQ scrolls -->
          <div
            :class="[
              'flex items-end justify-center overflow-hidden px-5 sm:px-6 lg:sticky lg:top-[var(--header-height)] lg:self-start lg:px-8 lg:pb-6',
              isHomeFaq ? 'lg:h-[calc(100svh-var(--header-height))]' : '',
            ]"
          >
            <FaqBuildingVisual
              :progress="visualProgress"
              :class="['max-w-md lg:max-w-none', isHomeFaq ? 'lg:max-h-full' : 'lg:max-h-[70vh]']"
            />
          </div>

          <!-- Accordion aligned to the xl container's right edge. -->
          <div class="relative z-10 px-5 sm:px-6 lg:self-start lg:pl-0 lg:pr-[max(2rem,calc((100vw_-_90rem)/2_+_2rem))]">
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
    // Building is CSS-sticky on all pages — no GSAP pin needed.
    // ScrollTrigger only drives visualProgress and content reveal.
    const contentElements = gsap.utils.toArray<HTMLElement>('[data-faq-reveal]', sectionElement)

    const trigger = ScrollTrigger.create({
      trigger: sectionElement,
      start: 'top bottom',
      end: 'center top+=20%',
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        visualProgress.value = self.progress
        applyContentProgress(self.progress, contentElements, 0)
      },
      onRefresh: (self) => {
        visualProgress.value = self.progress
        applyContentProgress(self.progress, contentElements, 0)
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
/* Building column is CSS-sticky on lg+; max-height keeps the image
   from overflowing a short viewport while preserving aspect ratio. */
</style>
