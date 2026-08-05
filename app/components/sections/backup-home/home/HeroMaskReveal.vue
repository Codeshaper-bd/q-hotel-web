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
        :class="[
          'absolute inset-0 h-full w-full object-cover',
          isArrived ? 'hero-video-idle-zoom' : '',
        ]"
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

    <!-- Cinematic warmth: a soft-light gold→olive cast so the footage grades
         toward 5-star warmth without re-touching the asset -->
    <div class="hero-warmth pointer-events-none absolute inset-0" />

    <!-- Depth scrim: a whisper during the dive; once the footage owns the
         frame it settles into a deep olive-brown → transparent grade tuned
         for the headline's bottom-left readability. (Stays visible for
         reduced-motion/no-JS as the static poster's legibility layer.) -->
    <div
      ref="scrimRef"
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/90 via-olive/25 to-night/45"
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
              <!-- White = stage visible; the black circle is the see-through
                   portal. Its radius is exactly the gold band's inner edge
                   (PORTAL_RADIUS) so window and ring read as one perfect Q. -->
              <rect x="-100" y="-100" width="300" height="300" fill="white" />
              <circle cx="50" cy="50" :r="PORTAL_RADIUS" fill="black" />
            </mask>

            <!-- Brand shine: top-lit paper→champagne→gold metallic gradient.
                 A slow sway of its angle (GSAP) reads as light moving across
                 polished metal. -->
            <linearGradient :id="shineId" ref="shineRef" x1="0" y1="0" x2="0" y2="1">
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

            <!-- Softly blurred, warm-graded lobby for outside the Q: the
                 guest glimpses the room they are about to enter -->
            <filter :id="lobbyBlurId" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
              <feGaussianBlur stdDeviation="2.4" />
              <!-- Warm champagne grade: lift red toward gold, ease blue out —
                   the surround must never drift green or muddy -->
              <feColorMatrix
                type="matrix"
                values="1.06 0 0 0 0.06  0 0.94 0 0 0.035  0 0 0.76 0 0  0 0 0 1 0"
              />
            </filter>
          </defs>

          <!-- Outside the Q: the same lobby, softly blurred and warmed — the
               letter is a clear portal into the sharp footage beneath.
               Oversized ~15% so tilt/rotation never exposes an edge. -->
          <image
            :href="poster"
            x="-15"
            y="-15"
            width="130"
            height="130"
            preserveAspectRatio="xMidYMid slice"
            :filter="`url(#${lobbyBlurId})`"
            :mask="`url(#${maskId})`"
          />

          <!-- Dark champagne wash over the blurred lobby, cut by the Q window;
               keeps the cinematic mood and the monogram's contrast -->
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

          <!-- The brand monogram itself, metallic champagne, riding the rim of
               the portal. Outer group fades with the pass-through; inner group
               keeps the luminous breathing. -->
          <g ref="rimFadeRef">
            <g ref="rimRef" :transform="MARK_TRANSFORM">
              <path
                v-for="(markPath, index) in qHotelLogoPaths"
                :key="index"
                :d="markPath"
                :fill="`url(#${shineId})`"
                class="q-mark-path"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>

    <!-- Cursor fluid reveal: desktop-only WebGL layer where the pointer melts
         liquid windows through the stage, echoing the Q's own reveal. Mounts
         only for fine pointers with motion allowed; silently absent otherwise. -->
    <LazyHeroFluidReveal v-if="canUseFluid" :video-el="videoRef" :progress="progress" />
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
const lobbyBlurId = `hero-reveal-lobby-blur-${uid}`

/**
 * Brand mark placement, derived from a least-squares circle fit of the ring
 * paths (center 25.104/23.933, inner edge r 20.247 in the logo's 0 0 51 50
 * viewBox) so the portal window sits EXACTLY concentric with the drawn ring:
 *   scale     = targetOuterDiameter / (2 × 25.463)
 *   translate = 50 − scale × ringCenter
 *   portal r  = scale × 20.247 − 0.12   (tucked just under the gold band)
 * Current target: 27 viewBox units outer diameter. Recompute all three
 * together if the mark is ever resized.
 */
const MARK_TRANSFORM = 'translate(36.69 37.31) scale(0.5302)'
const PORTAL_RADIUS = 10.6

const rootRef = ref<HTMLElement | null>(null)
const videoPlaneRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const scrimRef = ref<HTMLElement | null>(null)
const tiltRef = ref<HTMLElement | null>(null)
const plateRef = ref<HTMLElement | null>(null)
const overlayRef = ref<SVGSVGElement | null>(null)
const glowRef = ref<SVGRectElement | null>(null)
const rimFadeRef = ref<SVGGElement | null>(null)
const rimRef = ref<SVGGElement | null>(null)
const shineRef = ref<SVGLinearGradientElement | null>(null)
const shouldPlayVideo = ref(false)
const canUseFluid = ref(false)

/** The footage owns the frame: fluid layer retired, idle Ken Burns may run */
const isArrived = computed(() => props.progress > 0.6)

const { gsap, createContext, prefersReducedMotion } = useGsap()
const { addCleanup } = useAnimationCleanup()

/** Camera focal length for the dolly and the pointer tilt */
const PERSPECTIVE = 1200
/** Apparent scale of the plane by the end of the dolly */
const MAX_DOLLY_SCALE = 9
/** Pointer-tilt amplitude in degrees at rest */
const TILT_MAX = 2.4

// Progress curves (`ramp`, `heroVideoScale`) are shared with the WebGL fluid
// layer via app/utils/heroReveal.ts so the two can never drift apart

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

  // Pass-through: once the ring dominates the viewport the gold mark melts
  // away first, so nothing floats over the arrival...
  const passThrough = ramp(progress, 0.28, 0.4)
  gsap.set(rimFadeRef.value, { autoAlpha: 1 - passThrough })

  // ...then the whole stage dissolves as the ring sweeps past, so nothing
  // odd is left over the arrival
  gsap.set(overlayRef.value, { autoAlpha: 1 - ramp(progress, 0.4, 0.54) })

  // Depth parallax: the footage settles from oversized to rest slower than
  // the plane flies — then keeps a whisper of settle through the hold
  gsap.set(videoPlaneRef.value, { scale: heroVideoScale(progress) })

  // Scrim: barely-there during the dive, settling in step with the earlier
  // content arrival so the headline lands on a readable frame
  gsap.set(scrimRef.value, { autoAlpha: 0.12 + ramp(progress, 0.42, 0.6) * 0.88 })
}

watch(() => props.progress, applyProgress)

onMounted(() => {
  // The reveal IS the hero, so footage plays across breakpoints when motion is
  // allowed; reduced-motion keeps the lighter static poster
  shouldPlayVideo.value = !prefersReducedMotion.value

  // Cursor fluid layer: fine pointers with motion allowed only — it samples
  // the footage element, so it rides on shouldPlayVideo. WebGL availability
  // is verified inside the component (silent no-op when unsupported).
  canUseFluid.value = shouldPlayVideo.value && window.matchMedia('(pointer: fine)').matches

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

    // Specular sheen: the shine gradient's angle sways slowly, so light
    // appears to travel across the polished monogram
    const sheen = { angle: -16 }
    gsap.to(sheen, {
      angle: 16,
      duration: 9,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        shineRef.value?.setAttribute('gradientTransform', `rotate(${sheen.angle.toFixed(2)} 0.5 0.5)`)
      },
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
/* The brand mark on the portal rim: metallic fill via the shine gradient,
   with a whisper of champagne edge for polish */
.q-mark-path {
  stroke: rgb(var(--color-champagne) / 0.35);
  stroke-width: 0.2;
}

/* Wash strength: the single knob for how much of the blurred lobby reads
   through the champagne-night wash outside the Q window */
.hero-mask-plate {
  fill-opacity: 0.62;
}

/* Stage gradient stops — deep night warmed toward the brand metals; plain
   night is the fallback for browsers without color-mix support
   (SVG stop-color can't use Tailwind utilities) */
.q-stage-start {
  stop-color: rgb(var(--color-night));
}

.q-stage-mid {
  stop-color: rgb(var(--color-night));
  stop-color: color-mix(in srgb, rgb(var(--color-night)) 62%, rgb(var(--color-gold)));
}

.q-stage-end {
  stop-color: rgb(var(--color-night));
  stop-color: color-mix(in srgb, rgb(var(--color-night)) 64%, rgb(var(--color-copper)));
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

/* Edge vignette: pulls the eye to the Q, hides plane edges during tilt,
   and doubles as a soft depth-of-field cue toward the frame's corners */
.hero-vignette {
  background: radial-gradient(ellipse 118% 88% at 50% 45%, transparent 50%, rgb(var(--color-night) / 0.62) 100%);
}

/* Warm cinematic cast: gold light from above settling into olive shadow —
   grades the footage toward 5-star warmth without touching the asset */
.hero-warmth {
  background: linear-gradient(180deg, rgb(var(--color-gold) / 0.12), rgb(var(--color-olive) / 0.18));
  mix-blend-mode: soft-light;
}

/* Idle Ken Burns once the arrival holds: a barely-perceptible push-in.
   The global reduced-motion rules collapse this to a static frame. */
@keyframes hero-idle-zoom {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.035);
  }
}

.hero-video-idle-zoom {
  animation: hero-idle-zoom 36s ease-in-out infinite alternate;
}
</style>
