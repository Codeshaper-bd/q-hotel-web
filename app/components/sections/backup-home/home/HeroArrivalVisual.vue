<template>
  <!--
    Primland-style 2.5D cinematic arrival: aerial imagery with a slow
    drone zoom toward the hotel marker, a descent through cloud, and a
    settle into the lobby. Driven by the parent's scroll progress (0-1).

    ASSET SOURCES (Pexels license — free for commercial use, no attribution
    required; replace with real Q Hotel photography/footage when available):
    - /images/hero/aerial-terrain.jpg     → pexels.com/photo/green-forest-2739664
    - /images/hero/lobby-interior.jpg     → pexels.com/photo/14036253
    - /videos/hero/aerial-arrival.mp4     → pexels.com/video/28701877 (1280x720, 3.5MB)
      Desktop-only ambient drone footage; the aerial image doubles as its
      poster and remains the mobile / reduced-motion / no-JS fallback.
  -->
  <div class="absolute inset-0 overflow-hidden bg-night" aria-hidden="true">
    <!-- Aerial terrain: zooms toward the marker point as the "drone" descends -->
    <div ref="terrainRef" class="absolute inset-0 origin-[62%_38%]">
      <BaseImage
        src="/images/hero/aerial-terrain.jpg"
        alt=""
        :width="2400"
        :height="1612"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        priority
        class="h-full w-full"
      />

      <!-- Ambient drone footage: desktop + full-motion users only -->
      <video
        v-if="shouldPlayVideo"
        ref="videoRef"
        class="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero/aerial-arrival.mp4"
        :muted="true"
        autoplay
        loop
        playsinline
        preload="metadata"
      />

      <!-- Night grade over the daylight photo -->
      <div class="absolute inset-0 bg-night/45 mix-blend-multiply" />
      <div class="absolute inset-0 bg-gradient-to-b from-night/60 via-transparent to-night/70" />

      <!-- Hotel location marker: anchored to the terrain so it zooms with it -->
      <div ref="markerRef" class="absolute left-[62%] top-[38%] -translate-x-1/2 -translate-y-1/2">
        <span ref="markerRingRef" class="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/70" />
        <span class="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne shadow-[0_0_18px_4px_rgb(var(--color-champagne)/0.55)]" />
        <span class="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-paper/90">
          Q Hotel Dhaka
        </span>
      </div>
    </div>

    <!-- Drifting mist layers between the drone and the terrain -->
    <div ref="mistNearRef" class="hero-mist hero-mist-near absolute -inset-[10%]" />
    <div ref="mistFarRef" class="hero-mist hero-mist-far absolute -inset-[10%]" />

    <!-- Cloud pass-through: whites out briefly while worlds swap beneath it -->
    <div ref="cloudCoverRef" class="hero-cloud-cover absolute inset-0 opacity-0" />

    <!-- Lobby interior: the destination and final hero backdrop -->
    <div ref="lobbyRef" class="absolute inset-0 origin-center opacity-0">
      <BaseImage
        src="/images/hero/lobby-interior.jpg"
        alt=""
        :width="2400"
        :height="1601"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        class="h-full w-full"
      />

      <!-- Warm grade + vignette for text readability -->
      <div class="absolute inset-0 bg-night/35" />
      <div class="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-night/55" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** Scroll journey progress: 0 = aerial discovery, 1 = settled in the lobby */
  progress?: number
}>(), {
  progress: 0,
})

const terrainRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const shouldPlayVideo = ref(false)
const markerRef = ref<HTMLElement | null>(null)
const markerRingRef = ref<HTMLElement | null>(null)
const mistNearRef = ref<HTMLElement | null>(null)
const mistFarRef = ref<HTMLElement | null>(null)
const cloudCoverRef = ref<HTMLElement | null>(null)
const lobbyRef = ref<HTMLElement | null>(null)

const { gsap, createContext, prefersReducedMotion } = useGsap()

/** Piecewise-linear ramp: 0 before `from`, 1 after `to` */
function ramp(progress: number, from: number, to: number): number {
  return Math.min(1, Math.max(0, (progress - from) / (to - from)))
}

function applyProgress(progress: number) {
  if (!gsap || prefersReducedMotion.value) {
    return
  }

  // Stage 1→4: drone dive — zoom into the marker point
  const terrainScale = 1.05 + progress * 1.25
  const terrainFade = 1 - ramp(progress, 0.6, 0.74)
  gsap.set(terrainRef.value, { scale: terrainScale, autoAlpha: terrainFade })

  // Marker holds during discovery, dissolves into the descent
  gsap.set(markerRef.value, { autoAlpha: 1 - ramp(progress, 0.3, 0.5) })

  // Mist thickens and slides upward as altitude drops
  gsap.set(mistNearRef.value, {
    yPercent: -progress * 24,
    autoAlpha: 0.45 + ramp(progress, 0.25, 0.6) * 0.55,
  })
  gsap.set(mistFarRef.value, {
    yPercent: -progress * 12,
    autoAlpha: 0.3 + ramp(progress, 0.3, 0.6) * 0.5,
  })

  // Stage 5: brief cloud white-out covers the terrain→lobby swap
  const cloudCover = ramp(progress, 0.52, 0.66) * (1 - ramp(progress, 0.7, 0.84))
  gsap.set(cloudCoverRef.value, { autoAlpha: cloudCover })

  // Stage 5→6: lobby settles in — scale eases from arrival to rest
  const lobbyReveal = ramp(progress, 0.64, 0.8)
  const lobbySettle = ramp(progress, 0.64, 1)
  gsap.set(lobbyRef.value, {
    autoAlpha: lobbyReveal,
    scale: 1.35 - lobbySettle * 0.27,
  })

  // Mist clears once inside
  if (progress > 0.8) {
    const clear = 1 - ramp(progress, 0.8, 0.95)
    gsap.set([mistNearRef.value, mistFarRef.value], { autoAlpha: clear * 0.4 })
  }

  // Save cycles once the terrain is fully hidden behind the lobby
  const video = videoRef.value
  if (video) {
    if (progress > 0.78 && !video.paused) {
      video.pause()
    }
    else if (progress <= 0.78 && video.paused) {
      video.play().catch(() => {
        // Autoplay rejection: the poster image simply remains
      })
    }
  }
}

watch(() => props.progress, applyProgress)

onMounted(() => {
  // Video is a desktop enhancement only: mobile and reduced-motion users
  // keep the lighter static aerial image
  shouldPlayVideo.value = !prefersReducedMotion.value
    && window.matchMedia('(min-width: 1024px)').matches

  applyProgress(props.progress)

  // Ambient motion — skipped entirely under reduced motion (createContext no-ops)
  createContext(() => {
    if (!gsap) {
      return
    }

    gsap.to(markerRingRef.value, {
      scale: 1.9,
      opacity: 0,
      duration: 2.2,
      ease: 'power1.out',
      repeat: -1,
    })

    gsap.to(mistNearRef.value, {
      xPercent: 4,
      duration: 26,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    gsap.to(mistFarRef.value, {
      xPercent: -3,
      duration: 34,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  })
})
</script>

<style scoped>
/* Soft volumetric mist bands — procedural, no image assets needed */
.hero-mist {
  pointer-events: none;
  filter: blur(28px);
}

.hero-mist-near {
  background:
    radial-gradient(ellipse 55% 30% at 22% 68%, rgb(var(--color-paper) / 0.32), transparent 70%),
    radial-gradient(ellipse 45% 24% at 74% 34%, rgb(var(--color-paper) / 0.26), transparent 70%);
}

.hero-mist-far {
  background:
    radial-gradient(ellipse 65% 32% at 60% 78%, rgb(var(--color-paper) / 0.22), transparent 72%),
    radial-gradient(ellipse 50% 26% at 30% 22%, rgb(var(--color-paper) / 0.18), transparent 72%);
}

/* Dense cloud used for the terrain→lobby pass-through */
.hero-cloud-cover {
  pointer-events: none;
  background:
    radial-gradient(ellipse 90% 70% at 50% 50%, rgb(var(--color-paper) / 0.85), rgb(var(--color-paper) / 0.55) 60%, rgb(var(--color-night) / 0.9)),
    linear-gradient(rgb(var(--color-night) / 0.4), rgb(var(--color-night) / 0.4));
  filter: blur(6px);
}
</style>
