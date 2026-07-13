<template>
  <div
    v-if="isVisible"
    class="app-preloader fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    role="status"
    aria-label="Preparing your stay at Q Hotel"
  >
    <!-- Curtain doors: split apart on exit, gold seam on their meeting edges -->
    <div ref="curtainTopRef" class="absolute inset-x-0 top-0 h-1/2 bg-night">
      <span ref="hairlineTopRef" class="absolute inset-x-0 bottom-0 h-px bg-gold/50 opacity-0" aria-hidden="true" />
    </div>
    <div ref="curtainBottomRef" class="absolute inset-x-0 bottom-0 h-1/2 bg-night">
      <span ref="hairlineBottomRef" class="absolute inset-x-0 top-0 h-px bg-gold/50 opacity-0" aria-hidden="true" />
    </div>

    <div ref="contentRef" class="relative flex flex-col items-center">
      <!-- Ambient radial light behind the mark -->
      <div
        ref="ambientRef"
        class="preloader-ambient absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform-gpu opacity-0"
        aria-hidden="true"
      />

      <!-- Brand mark: stroke-drawn, champagne-filled, with a subtle 2D entrance -->
      <div ref="logoWrapRef" class="relative h-24 w-24 opacity-0 sm:h-28 sm:w-28">
        <svg class="h-full w-full" viewBox="0 0 51 50" fill="none" aria-hidden="true">
          <!-- Filter-free highlight layer avoids rectangular SVG compositing artifacts -->
          <g ref="glowGroupRef" class="opacity-0">
            <path v-for="(d, index) in logoPaths" :key="`glow-${index}`" :d="d" class="fill-champagne" />
          </g>

          <!-- Outline layer: drawn first via pathLength-normalised dashoffset -->
          <g ref="strokeGroupRef">
            <path
              v-for="(d, index) in logoPaths"
              :key="`stroke-${index}`"
              :d="d"
              class="fill-none stroke-champagne"
              stroke-width="0.6"
              pathLength="1"
              stroke-dasharray="1"
              stroke-dashoffset="1"
            />
          </g>

          <!-- Fill layer: fades in after the outline draw -->
          <g ref="fillGroupRef" class="opacity-0">
            <path v-for="(d, index) in logoPaths" :key="`fill-${index}`" :d="d" class="fill-champagne" />
          </g>
        </svg>

        <!-- Light sweep across the mark -->
        <div class="absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
          <div ref="sheenRef" class="preloader-sheen absolute inset-y-0 -left-full w-full opacity-0" />
        </div>
      </div>

      <!-- Mirrored floor reflection, masked to fade out -->
      <div ref="reflectionRef" class="preloader-reflection h-10 w-24 opacity-0 sm:w-28" aria-hidden="true">
        <svg class="h-24 w-full -scale-y-100 sm:h-28" viewBox="0 0 51 50" fill="none">
          <path v-for="(d, index) in logoPaths" :key="`mirror-${index}`" :d="d" class="fill-champagne" />
        </svg>
      </div>

      <!-- Microcopy: staggered letter reveal (label read as one phrase) -->
      <p
        ref="copyRef"
        class="mt-7 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-paper/60"
        aria-label="Preparing your stay"
      >
        <span
          v-for="(letter, index) in copyLetters"
          :key="index"
          class="inline-block translate-y-2 opacity-0"
          aria-hidden="true"
        >{{ letter }}</span>
      </p>

      <!-- Progress hairline synced to the intro timeline -->
      <div class="mt-6 h-px w-40 overflow-hidden bg-gold/15" aria-hidden="true">
        <div ref="progressFillRef" class="h-full w-full origin-left scale-x-0 bg-gold/70" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type gsapType from 'gsap'

type GsapTimeline = ReturnType<typeof gsapType.timeline>

const FAILSAFE_MS = 4000

// Q Hotel brand mark paths — shared single source in app/utils/brand.ts
const logoPaths = qHotelLogoPaths

// Non-breaking spaces keep word gaps intact as individual spans
const copyLetters = 'Preparing your stay'.split('').map(letter => letter === ' ' ? ' ' : letter)

// Rendered visible on the server so the overlay is present in the initial
// HTML before hydration — no first-frame flash of page content.
const isVisible = ref(true)

const curtainTopRef = ref<HTMLElement | null>(null)
const curtainBottomRef = ref<HTMLElement | null>(null)
const hairlineTopRef = ref<HTMLElement | null>(null)
const hairlineBottomRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const ambientRef = ref<HTMLElement | null>(null)
const logoWrapRef = ref<HTMLElement | null>(null)
const glowGroupRef = ref<SVGGElement | null>(null)
const strokeGroupRef = ref<SVGGElement | null>(null)
const fillGroupRef = ref<SVGGElement | null>(null)
const sheenRef = ref<HTMLElement | null>(null)
const reflectionRef = ref<HTMLElement | null>(null)
const copyRef = ref<HTMLElement | null>(null)
const progressFillRef = ref<HTMLElement | null>(null)

const nuxtApp = useNuxtApp()
// Lets other components (e.g. the nav logo) sequence their entrance
// animations to start exactly when the preloader reveals the page
const isPreloaderComplete = useState('preloader-complete', () => false)
let timeline: GsapTimeline | undefined
let failsafeTimer: ReturnType<typeof setTimeout> | undefined

function finish() {
  isVisible.value = false
  isPreloaderComplete.value = true
}

onMounted(() => {
  const gsap = nuxtApp.$gsap as typeof gsapType | undefined
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Reduced-motion users and a missing GSAP instance get the page immediately
  if (prefersReducedMotion || !gsap) {
    finish()
    return
  }

  // Guarantee the loader can never trap the page, whatever happens to the timeline
  failsafeTimer = setTimeout(finish, FAILSAFE_MS)

  const strokePaths = strokeGroupRef.value?.querySelectorAll('path')
  const letterSpans = copyRef.value?.querySelectorAll('span')

  if (!strokePaths?.length || !letterSpans?.length) {
    finish()
    return
  }

  timeline = gsap.timeline({ onComplete: finish })

  timeline
    // Progress hairline runs the full intro
    .to(progressFillRef.value, { scaleX: 1, duration: 1.9, ease: 'none' }, 0)
    // Ambient light breathes in
    .to(ambientRef.value, { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0)
    // A 2D entrance avoids browser-specific square compositing artifacts
    .to(logoWrapRef.value, { opacity: 1, duration: 0.45, ease: 'power1.out' }, 0.05)
    .fromTo(logoWrapRef.value,
      { scale: 0.92, y: 6 },
      { scale: 1, y: 0, duration: 1.4, ease: 'power3.out' },
      0,
    )
    // Drop the temporary transform layer once the mark settles
    .set(logoWrapRef.value, { clearProps: 'transform' }, 1.42)
    .to(strokePaths, {
      attr: { 'stroke-dashoffset': 0 },
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.inOut',
    }, 0.1)
    // Champagne fill takes over from the outline
    .to(fillGroupRef.value, { opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.95)
    .to(strokeGroupRef.value, { opacity: 0.3, duration: 0.45 }, 0.95)
    .to(glowGroupRef.value, { opacity: 0.45, duration: 0.4, ease: 'power1.out' }, 1.05)
    .to(reflectionRef.value, { opacity: 0.3, duration: 0.45 }, 1.05)
    // Microcopy letters rise in
    .to(letterSpans, { opacity: 1, y: 0, duration: 0.4, stagger: 0.018, ease: 'power2.out' }, 1.15)
    // Light sweep across the mark
    .to(sheenRef.value, { opacity: 1, duration: 0.1 }, 1.25)
    .to(sheenRef.value, { xPercent: 260, duration: 0.65, ease: 'power2.inOut' }, 1.25)
    // Content lifts away, gold seam appears, doors open
    .to(contentRef.value, { y: -28, opacity: 0, duration: 0.4, ease: 'power2.in' }, 1.95)
    .to([hairlineTopRef.value, hairlineBottomRef.value], { opacity: 1, duration: 0.2 }, 2.15)
    // Signal as the curtains begin so entrance animations play during the reveal
    .call(() => {
      isPreloaderComplete.value = true
    }, [], 2.25)
    .to(curtainTopRef.value, { yPercent: -100, duration: 0.55, ease: 'power4.inOut' }, 2.25)
    .to(curtainBottomRef.value, { yPercent: 100, duration: 0.55, ease: 'power4.inOut' }, 2.25)
})

onBeforeUnmount(() => {
  timeline?.kill()
  if (failsafeTimer) clearTimeout(failsafeTimer)
})
</script>

<style scoped>
/*
 * No-JS / broken-hydration fallback: the overlay is server-rendered visible,
 * so pure CSS must be able to clear it. The GSAP timeline normally removes
 * the element (~2.8s) before this delayed animation ever fires.
 */
.app-preloader {
  animation: preloader-fallback-hide 300ms var(--ease-premium) 5s forwards;
}

@keyframes preloader-fallback-hide {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

/* Soft radial light behind the brand mark */
.preloader-ambient {
  background: radial-gradient(circle, rgb(var(--color-gold) / 0.16) 0%, transparent 60%);
}

/* Diagonal light band swept across the mark by the timeline */
.preloader-sheen {
  background: linear-gradient(100deg, transparent 20%, rgb(var(--color-paper) / 0.14) 50%, transparent 80%);
}

/* Mirrored logo fades downward like a polished-floor reflection */
.preloader-reflection {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, rgb(0 0 0 / 0.45), transparent 70%);
  mask-image: linear-gradient(to bottom, rgb(0 0 0 / 0.45), transparent 70%);
}
</style>
