<template>
  <NuxtLink
    to="/"
    class="group flex shrink-0 items-center"
    aria-label="Q Hotel Dhaka — home"
  >
    <!-- Full lockup (mark + HOTEL + DHAKA) as outlines, so the whole logo can
         self-draw with the same stroke-then-fill signature as the preloader -->
    <svg
      :class="['h-9 w-auto shrink-0 sm:h-10', tone === 'on-light' ? 'logo-on-light' : '']"
      viewBox="0 0 240 43"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop class="logo-gradient-start" offset="0" />
          <stop class="logo-gradient-mid" offset="0.55" />
          <stop class="logo-gradient-end" offset="1" />
        </linearGradient>
      </defs>

      <!-- Entrance outline: drawn once when the preloader reveals the page -->
      <g ref="strokeGroupRef">
        <path
          v-for="(d, index) in qHotelLockupPaths"
          :key="`stroke-${index}`"
          :d="d"
          class="fill-none stroke-champagne"
          stroke-width="0.5"
          pathLength="1"
          stroke-dasharray="1"
          stroke-dashoffset="1"
        />
      </g>

      <!-- Gradient fill: visible by default so no-JS and reduced-motion users
           always see the lockup; the entrance timeline hides it first -->
      <g ref="fillGroupRef">
        <path
          v-for="(d, index) in qHotelLockupPaths"
          :key="`fill-${index}`"
          :d="d"
          :fill="`url(#${gradientId})`"
        />
      </g>
    </svg>
  </NuxtLink>
</template>

<script setup lang="ts">
// Surface behind the logo: gradients shift from champagne-on-dark to
// gold/copper-on-light so the mark stays legible over the paper header
withDefaults(defineProps<{
  tone?: 'on-dark' | 'on-light'
}>(), {
  tone: 'on-dark',
})

// Unique per instance so multiple renders never collide on the SVG defs id
const gradientId = `q-logo-gradient-${useId()}`
const { gsap, createContext } = useGsap()

const strokeGroupRef = ref<SVGGElement | null>(null)
const fillGroupRef = ref<SVGGElement | null>(null)

// Set by AppPreloader the moment its curtains begin to open
const isPreloaderComplete = useState('preloader-complete', () => false)
let hasPlayedEntrance = false

function playEntrance() {
  if (hasPlayedEntrance) {
    return
  }
  hasPlayedEntrance = true

  // No-op under reduced motion: the filled lockup stays visible as-is
  createContext(() => {
    if (!gsap) {
      return
    }

    const strokePaths = strokeGroupRef.value?.querySelectorAll('path')

    if (!strokePaths?.length) {
      return
    }

    // Stagger is tighter than the 3-path mark's: 13 paths at the old spacing
    // would drag the signature out well past its welcome
    const entrance = gsap.timeline()
      .set(fillGroupRef.value, { opacity: 0 })
      .to(strokePaths, {
        attr: { 'stroke-dashoffset': 0 },
        duration: 0.7,
        stagger: 0.04,
        ease: 'power2.inOut',
      })
      .to(fillGroupRef.value, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .to(strokeGroupRef.value, { opacity: 0, duration: 0.35 }, '<')

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
        stagger: { each: 0.05, from: 'end' },
        ease: 'power2.inOut',
      })
      // Empty beat, then draw back in
      .to(strokePaths, {
        attr: { 'stroke-dashoffset': 0 },
        duration: 0.9,
        stagger: 0.05,
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

/* On the light scrolled header the paper-toned stop would vanish */
.logo-on-light .logo-gradient-start {
  stop-color: rgb(var(--color-gold));
}

.logo-on-light .logo-gradient-mid {
  stop-color: rgb(var(--color-gold));
}

.logo-on-light .logo-gradient-end {
  stop-color: rgb(var(--color-copper));
}
</style>
