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
        <h2 id="faq-title" class="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-[44px]">
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
            <FaqSketch
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

/** The questions start fully hidden and appear one by one as the visitor scrolls. The heading stays put: it is the section's anchor. */
function applyContentProgress(progress: number, rows: HTMLElement[]) {
  if (!gsap) {
    return
  }

  const rowSpacing = 0.78 / Math.max(1, rows.length - 1)

  rows.forEach((row, index) => {
    const start = 0.03 + index * rowSpacing
    const reveal = ramp(progress, start, start + 0.1)

    gsap.set(row, {
      autoAlpha: reveal,
      y: 24 * (1 - reveal),
    })
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
    // ScrollTrigger drives the question reveal only; the sketch draws itself on entry.
    const rows = gsap.utils.toArray<HTMLElement>('dl [data-faq-reveal]', sectionElement)
    const smoothed = { value: 0 }
    let smoothing: gsap.core.Tween | undefined

    /** Eases the scroll position into the shown progress, so wheel steps and
     *  trackpad jitter never make the drawing or the reveal stutter */
    const follow = (target: number, immediate = false) => {
      smoothing?.kill()

      const apply = () => {
        applyContentProgress(smoothed.value, rows)
      }

      if (immediate) {
        smoothed.value = target
        apply()
        return
      }

      smoothing = gsap.to(smoothed, {
        value: target,
        duration: 0.9,
        ease: 'power2.out',
        onUpdate: apply,
      })
    }

    // Armed BEFORE the first frame of scrolling: every question is hidden
    sectionElement.classList.add('faq-armed')
    follow(0, true)

    const trigger = ScrollTrigger.create({
      trigger: sectionElement,
      start: 'top 45%',
      end: 'bottom 85%',
      invalidateOnRefresh: true,
      onUpdate: self => follow(self.progress),
      onRefresh: self => follow(self.progress, true),
    })

    return () => {
      trigger.kill()
      smoothing?.kill()
      // Back to the resting truth: everything shown
      sectionElement.classList.remove('faq-armed')
      gsap.set(rows, { clearProps: 'all' })
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
/* Once the scroll-driven reveal takes over (desktop, motion allowed), the
   questions are hidden until it brings each one in. Without this class — SSR,
   mobile, reduced motion — every question is simply visible. */
.faq-armed :deep(dl [data-faq-reveal]) {
  opacity: 0;
  visibility: hidden;
}
</style>
