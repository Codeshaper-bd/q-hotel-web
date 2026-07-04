<template>
  <!--
    "Through the Q" — a cinematic 3D camera dolly. A full-bleed looping video
    sits behind a deep-night golden stage punched through by a "Q" letterform
    (SVG <mask>). Driven by the parent's scroll progress (0-1):

    - Dolly (p 0.04→0.55): the stage is a plane in real CSS 3D space; the
      camera flies THROUGH the letter (translateZ against a perspective, so
      growth accelerates hyperbolically), with a gentle rotateX arc as it
      passes. The video plane behind settles from oversized to rest at a
      different rate — depth parallax.
    - Dissolve (p 0.42→0.56): the stage (and the Q's counter island) melts
      away as its ring sweeps past the viewport — a clean pass-through.
    - Hold (p 0.6→1): nothing but full-bleed video, so the arrival breathes
      before the next section scrolls in. The parent reveals the UI + menu here.

    At rest, the plane tilts subtly toward a fine pointer (desktop, motion
    allowed) — the tilt drains away as the dolly begins.

    Reduced-motion / no-JS: the stage stays hidden (CSS default) and the
    static poster fills the frame with the hero UI fully usable over it.

    ASSET: looping hero footage via `videoSrc`; `poster` doubles as the video
    poster and the reduced-motion still.
  -->
  <div ref="rootRef" class="absolute inset-0 overflow-hidden bg-night" aria-hidden="true">
    <!-- Video plane: full-bleed footage for motion users, parallax-scaled -->
    <div ref="videoPlaneRef" class="absolute inset-0 origin-center will-change-transform">
      <video
        v-if="shouldPlayVideo"
        ref="videoRef"
        class="absolute inset-0 h-full w-full object-cover"
        :src="videoSrc"
        :poster="poster"
        :muted="true"
        autoplay
        loop
        playsinline
        preload="metadata"
      />

      <!-- Static poster: reduced-motion, no-JS, and SSR/first paint fallback -->
      <BaseImage
        v-else
        :src="poster"
        alt=""
        :width="2400"
        :height="1350"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
        priority
        class="absolute inset-0"
      />
    </div>

    <!-- Depth scrim: a whisper during the dive, fully cleared once the footage
         owns the frame — the arrival is uncovered video. (Stays visible for
         reduced-motion/no-JS as the static poster's legibility layer.) -->
    <div
      ref="scrimRef"
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-night/55"
    />

    <!-- Cinema polish for the stage phase only: fine static grain (kills
         gradient banding) + vignette — both clear with the arrival -->
    <div ref="grainRef" class="hero-grain pointer-events-none absolute inset-0" />
    <div ref="vignetteRef" class="hero-vignette pointer-events-none absolute inset-0" />

    <!-- 3D rig: tilt wrapper (pointer) → dolly plane (scroll) → masked stage.
         The plane is oversized so tilt/rotation never exposes its edges. -->
    <div ref="tiltRef" class="absolute inset-0">
      <div ref="plateRef" class="absolute -inset-[12%] will-change-transform">
        <!-- Night-gold stage with the "Q" window punched out of it, plus the
             shining gold rim. Hidden by default so reduced-motion / no-JS see
             the full-bleed footage; the scroll dissolve removes it entirely. -->
        <svg
          ref="overlayRef"
          class="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <mask :id="maskId" maskUnits="userSpaceOnUse" x="-100" y="-100" width="300" height="300">
              <!-- White = stage visible; black glyph = the see-through window -->
              <rect x="-100" y="-100" width="300" height="300" fill="white" />
              <text
                x="50"
                y="50"
                text-anchor="middle"
                dominant-baseline="central"
                class="hero-mask-glyph"
                fill="black"
              >Q</text>
              <!-- Counter punch-out: fading this black ellipse in dissolves the
                   golden island inside the Q's ring once the ring has swept
                   past the viewport, so no odd object floats over the footage.
                   Geometry is hand-tuned to the glyph's counter (adjust
                   cx/cy/rx/ry if the display font changes). -->
              <ellipse
                ref="counterFadeRef"
                cx="50"
                cy="50.3"
                rx="4.9"
                ry="5.1"
                fill="black"
                opacity="0"
              />
            </mask>

            <!-- Brand shine: top-lit paper→champagne→gold metallic gradient -->
            <linearGradient :id="shineId" x1="0" y1="0" x2="0" y2="1">
              <stop class="q-shine-start" offset="0" />
              <stop class="q-shine-mid" offset="0.55" />
              <stop class="q-shine-end" offset="1" />
            </linearGradient>

            <!-- Ambient stage light: gold radiating from behind the Q -->
            <radialGradient :id="glowId" gradientUnits="userSpaceOnUse" cx="50" cy="50" r="65">
              <stop class="q-glow-core" offset="0" />
              <stop class="q-glow-fade" offset="1" />
            </radialGradient>

            <!-- Stage: deep night warmed toward gold, then copper — dark
                 luxury with gold as light, not as paint -->
            <linearGradient :id="stageId" x1="0" y1="0" x2="0" y2="1">
              <stop class="q-stage-start" offset="0" />
              <stop class="q-stage-mid" offset="0.55" />
              <stop class="q-stage-end" offset="1" />
            </linearGradient>
          </defs>

          <!-- The stage plate, cut by the Q window; footage ghosts ~10% through -->
          <rect
            x="-100"
            y="-100"
            width="300"
            height="300"
            :fill="`url(#${stageId})`"
            class="hero-mask-plate"
            :mask="`url(#${maskId})`"
          />

          <!-- Gold light behind the Q, same mask so the window stays clean;
               breathes with the rim so the Q reads as the light source -->
          <rect
            ref="glowRef"
            x="-100"
            y="-100"
            width="300"
            height="300"
            :fill="`url(#${glowId})`"
            :mask="`url(#${maskId})`"
          />

          <!-- Gold rim lining the window: soft halo under a crisp shine edge,
               constant screen weight (non-scaling stroke) through the dolly.
               Outer group fades with the pass-through (the counter outline
               would otherwise float mid-screen); inner group keeps breathing. -->
          <g ref="rimFadeRef">
            <g ref="rimRef">
            <text
              x="50"
              y="50"
              text-anchor="middle"
              dominant-baseline="central"
              fill="none"
              class="hero-mask-glyph q-rim-halo"
            >Q</text>
            <text
              x="50"
              y="50"
              text-anchor="middle"
              dominant-baseline="central"
              fill="none"
              :stroke="`url(#${shineId})`"
              class="hero-mask-glyph q-rim-line"
            >Q</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** Reveal progress: 0 = closed Q window, 1 = footage fills the viewport */
  progress?: number
  /** Looping hero footage; supply at this path (build does not require it yet) */
  videoSrc?: string
  /** Video poster + reduced-motion/no-JS still */
  poster?: string
}>(), {
  progress: 0,
  videoSrc: '/videos/hero/hero-loop.mp4',
  poster: '/images/hero/lobby-interior.jpg',
})

// Unique per instance so repeated renders never collide on SVG ids
const uid = useId()
const maskId = `hero-reveal-mask-${uid}`
const shineId = `hero-reveal-shine-${uid}`
const glowId = `hero-reveal-glow-${uid}`
const stageId = `hero-reveal-stage-${uid}`

const rootRef = ref<HTMLElement | null>(null)
const videoPlaneRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const scrimRef = ref<HTMLElement | null>(null)
const tiltRef = ref<HTMLElement | null>(null)
const plateRef = ref<HTMLElement | null>(null)
const overlayRef = ref<SVGSVGElement | null>(null)
const glowRef = ref<SVGRectElement | null>(null)
const counterFadeRef = ref<SVGEllipseElement | null>(null)
const rimFadeRef = ref<SVGGElement | null>(null)
const rimRef = ref<SVGGElement | null>(null)
const shouldPlayVideo = ref(false)

const { gsap, createContext, prefersReducedMotion } = useGsap()
const { addCleanup } = useAnimationCleanup()

/** Camera focal length for the dolly and the pointer tilt */
const PERSPECTIVE = 1200
/** Apparent scale of the plane by the end of the dolly */
const MAX_DOLLY_SCALE = 9
/** Pointer-tilt amplitude in degrees at rest */
const TILT_MAX = 2.4

/** Piecewise-linear ramp: 0 before `from`, 1 after `to` */
function ramp(progress: number, from: number, to: number): number {
  return Math.min(1, Math.max(0, (progress - from) / (to - from)))
}

function applyProgress(progress: number) {
  if (!gsap || prefersReducedMotion.value) {
    return
  }

  // Camera dolly: pick the apparent scale curve, then derive translateZ so
  // rotation and depth stay in true perspective (z = P(1 - 1/s))
  const dolly = ramp(progress, 0.04, 0.55)
  const apparentScale = 1 + Math.pow(dolly, 1.35) * (MAX_DOLLY_SCALE - 1)
  gsap.set(plateRef.value, {
    z: PERSPECTIVE * (1 - 1 / apparentScale),
    // Gentle arc as the letter passes overhead — zero at both ends
    rotationX: -4 * Math.sin(dolly * Math.PI),
    yPercent: -5 * dolly,
    transformPerspective: PERSPECTIVE,
  })

  // Pass-through: once the ring dominates the viewport, the counter island
  // inside it (and its floating gold outline) melts away first...
  const passThrough = ramp(progress, 0.28, 0.4)
  gsap.set(counterFadeRef.value, { opacity: passThrough })
  gsap.set(rimFadeRef.value, { autoAlpha: 1 - passThrough })

  // ...then the whole stage dissolves as the ring sweeps past, so nothing
  // odd is left over the arrival
  gsap.set(overlayRef.value, { autoAlpha: 1 - ramp(progress, 0.4, 0.54) })

  // Depth parallax: the footage settles from oversized to rest slower than
  // the plane flies — then keeps a whisper of settle through the hold
  const videoScale = 1.18 - 0.16 * ramp(progress, 0, 0.55) - 0.02 * ramp(progress, 0.55, 1)
  gsap.set(videoPlaneRef.value, { scale: videoScale })

  // Scrim: barely-there during the dive, full once the footage is exposed
  gsap.set(scrimRef.value, { autoAlpha: 0.12 + ramp(progress, 0.45, 0.72) * 0.88 })
}

watch(() => props.progress, applyProgress)

onMounted(() => {
  // The reveal IS the hero, so footage plays across breakpoints when motion is
  // allowed; reduced-motion keeps the lighter static poster
  shouldPlayVideo.value = !prefersReducedMotion.value

  // Snap to the closed-Q starting state before the timeline scrubs it open
  applyProgress(props.progress)

  // Ambient life — all no-ops under reduced motion (createContext)
  createContext(() => {
    if (!gsap) {
      return
    }

    // The gold rim and stage glow breathe together: the Q reads as luminous
    gsap.to([rimRef.value, glowRef.value], {
      opacity: 0.55,
      duration: 2.1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Pointer tilt: the plane leans toward the cursor at rest, draining to
    // flat as the dolly takes over. Desktop fine-pointer only.
    if (window.matchMedia('(pointer: fine)').matches) {
      gsap.set(tiltRef.value, { transformPerspective: PERSPECTIVE })
      const tiltToY = gsap.quickTo(tiltRef.value, 'rotationY', { duration: 0.9, ease: 'power2.out' })
      const tiltToX = gsap.quickTo(tiltRef.value, 'rotationX', { duration: 0.9, ease: 'power2.out' })

      const handlePointerMove = (event: PointerEvent) => {
        const influence = TILT_MAX * (1 - ramp(props.progress, 0, 0.18))
        const normalizedX = (event.clientX / window.innerWidth) * 2 - 1
        const normalizedY = (event.clientY / window.innerHeight) * 2 - 1
        tiltToY(normalizedX * influence)
        tiltToX(-normalizedY * influence)
      }

      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      addCleanup(() => window.removeEventListener('pointermove', handlePointerMove))
    }
  })

  // Pause the loop once the hero is fully scrolled past to save cycles
  const root = rootRef.value
  if (root && shouldPlayVideo.value && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      const video = videoRef.value
      if (!video) {
        return
      }
      if (entry?.isIntersecting) {
        video.play().catch(() => {
          // Autoplay rejection: the poster simply remains
        })
      }
      else {
        video.pause()
      }
    })
    observer.observe(root)
    addCleanup(() => observer.disconnect())
  }
})
</script>

<style scoped>
/* Solid letterform for the mask window + gold rim — the display serif, filled.
   Sized against the oversized plate so it reads ~26% of viewport height. */
.hero-mask-glyph {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 600;
  font-size: 21px;
}

/* Stage strength: the single knob for how much footage ghosts through
   outside the Q window (0.9 = ~10% of the video) */
.hero-mask-plate {
  fill-opacity: 0.9;
}

/* Stage gradient stops — deep night warmed toward the brand metals; plain
   night is the fallback for browsers without color-mix support
   (SVG stop-color can't use Tailwind utilities) */
.q-stage-start {
  stop-color: rgb(var(--color-night));
}

.q-stage-mid {
  stop-color: rgb(var(--color-night));
  stop-color: color-mix(in srgb, rgb(var(--color-night)) 74%, rgb(var(--color-gold)));
}

.q-stage-end {
  stop-color: rgb(var(--color-night));
  stop-color: color-mix(in srgb, rgb(var(--color-night)) 72%, rgb(var(--color-copper)));
}

/* Radial gold light behind the Q — the letter is the light source */
.q-glow-core {
  stop-color: rgb(var(--color-gold));
  stop-opacity: 0.3;
}

.q-glow-fade {
  stop-color: rgb(var(--color-gold));
  stop-opacity: 0;
}

/* Soft gold halo under the crisp shine edge — constant screen weight as it zooms */
.q-rim-halo {
  stroke: rgb(var(--color-gold) / 0.35);
  stroke-width: 5px;
  vector-effect: non-scaling-stroke;
}

.q-rim-line {
  stroke-width: 1.6px;
  vector-effect: non-scaling-stroke;
}

/* Metallic gradient stops (SVG stop-color can't use Tailwind utilities) */
.q-shine-start {
  stop-color: rgb(var(--color-paper));
}

.q-shine-mid {
  stop-color: rgb(var(--color-champagne));
}

.q-shine-end {
  stop-color: rgb(var(--color-gold));
}

/* Fine static film grain — procedural SVG noise, no asset, never animated */
.hero-grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: soft-light;
}

/* Edge vignette: pulls the eye to the Q, hides plane edges during tilt */
.hero-vignette {
  background: radial-gradient(ellipse 120% 90% at 50% 45%, transparent 55%, rgb(var(--color-night) / 0.55) 100%);
}
</style>
