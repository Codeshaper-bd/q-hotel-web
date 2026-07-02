<template>
  <NuxtLink
    to="/"
    class="group flex shrink-0 items-center gap-3"
    aria-label="Q Hotel Dhaka — home"
  >
    <!-- Brand mark: same Q as the preloader, subtle champagne gradient -->
    <svg class="h-11 w-11 shrink-0" viewBox="0 0 51 50" fill="none" aria-hidden="true">
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop class="logo-gradient-start" offset="0" />
          <stop class="logo-gradient-mid" offset="0.55" />
          <stop class="logo-gradient-end" offset="1" />
        </linearGradient>
      </defs>

      <!-- Entrance outline: drawn once when the preloader reveals the page,
           echoing the preloader's stroke-draw signature -->
      <g ref="strokeGroupRef">
        <path
          v-for="(d, index) in qHotelLogoPaths"
          :key="`stroke-${index}`"
          :d="d"
          class="fill-none stroke-champagne"
          stroke-width="0.6"
          pathLength="1"
          stroke-dasharray="1"
          stroke-dashoffset="1"
        />
      </g>

      <!-- Gradient fill: visible by default so no-JS and reduced-motion users
           always see the mark; the entrance timeline hides it first -->
      <g ref="fillGroupRef">
        <path
          v-for="(d, index) in qHotelLogoPaths"
          :key="`fill-${index}`"
          :d="d"
          :fill="`url(#${gradientId})`"
        />
      </g>
    </svg>

    <!-- Wordmark: serif caps with the same champagne gradient -->
    <span ref="wordmarkRef" class="flex flex-col leading-none">
      <span class="bg-gradient-to-b from-paper via-champagne to-gold bg-clip-text font-display text-[1.45rem] font-semibold uppercase tracking-[0.06em] text-transparent">
        Hotel
      </span>
      <span class="mt-1 bg-gradient-to-b from-champagne to-gold bg-clip-text font-display text-[0.7rem] uppercase tracking-[0.42em] text-transparent">
        Dhaka
      </span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
// Unique per instance so multiple renders never collide on the SVG defs id
const gradientId = `q-logo-gradient-${useId()}`
const { gsap, createContext } = useGsap()

const strokeGroupRef = ref<SVGGElement | null>(null)
const fillGroupRef = ref<SVGGElement | null>(null)
const wordmarkRef = ref<HTMLElement | null>(null)

// Set by AppPreloader the moment its curtains begin to open
const isPreloaderComplete = useState('preloader-complete', () => false)
let hasPlayedEntrance = false

function playEntrance() {
  if (hasPlayedEntrance) {
    return
  }
  hasPlayedEntrance = true

  // No-op under reduced motion: the fill and wordmark stay visible as-is
  createContext(() => {
    if (!gsap) {
      return
    }

    const strokePaths = strokeGroupRef.value?.querySelectorAll('path')

    if (!strokePaths?.length) {
      return
    }

    const entrance = gsap.timeline()
      .set(fillGroupRef.value, { opacity: 0 })
      .set(wordmarkRef.value, { opacity: 0, y: 6 })
      .to(strokePaths, {
        attr: { 'stroke-dashoffset': 0 },
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.inOut',
      })
      .to(fillGroupRef.value, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .to(strokeGroupRef.value, { opacity: 0, duration: 0.35 }, '<')
      .to(wordmarkRef.value, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '<+0.1')

    // Looping signature, fully symmetric: fill hands off to the drawn
    // outline, the line un-draws in reverse, a beat of emptiness, then it
    // draws back in and the gradient fill blooms — hold, and repeat
    const redrawLoop = gsap.timeline({ repeat: -1, repeatDelay: 4 })
      // Crossfade the fill out over the fully-drawn outline
      .set(strokePaths, { attr: { 'stroke-dashoffset': 0 } })
      .set(strokeGroupRef.value, { opacity: 1 })
      .to(fillGroupRef.value, { opacity: 0, duration: 0.35, ease: 'power1.in' })
      // Un-draw: the line retreats the way it arrived
      .to(strokePaths, {
        attr: { 'stroke-dashoffset': 1 },
        duration: 0.9,
        stagger: { each: 0.12, from: 'end' },
        ease: 'power2.inOut',
      })
      // Empty beat, then draw back in
      .to(strokePaths, {
        attr: { 'stroke-dashoffset': 0 },
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.inOut',
      }, '+=0.4')
      .to(fillGroupRef.value, { opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.1')
      .to(strokeGroupRef.value, { opacity: 0, duration: 0.35 }, '<')

    entrance.add(redrawLoop, '+=4')
  })
}

onMounted(() => {
  if (isPreloaderComplete.value) {
    playEntrance()
    return
  }

  const stopWatching = watch(isPreloaderComplete, (isComplete) => {
    if (isComplete) {
      stopWatching()
      playEntrance()
    }
  })
})
</script>

<style scoped>
/* Gradient stops need tokens; SVG stop-color can't use Tailwind utilities */
.logo-gradient-start {
  stop-color: rgb(var(--color-paper));
}

.logo-gradient-mid {
  stop-color: rgb(var(--color-champagne));
}

.logo-gradient-end {
  stop-color: rgb(var(--color-gold));
}
</style>
