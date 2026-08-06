<template>
  <!--
    Q Hotel construction experience: the building is assembled from layered
    passes over two artworks that share one bottom-anchored frame — the
    architectural line sketch (blueprint) and the final night render.

      1. measurement grid + ground line          (arrival)
      2. vertical-stripe blueprint pass          (structural columns rise)
      3. floor-quantized full blueprint          (slabs, core, façade drawing)
      4. dimmed final render, floor-quantized    (materials arrive)
      5. full-colour final render, lagging       (window lights come on)
      6. landscape flanks                        (trees + entrance greenery)
      7. contact shadow + ambient glow settle    (final hold)

    Everything is driven by one `progress` prop (0-1) in the house
    HeroArrivalVisual style: piecewise ramps applied per frame, transform /
    opacity / CSS-variable masks only. The DOM's default (no-JS, mobile,
    reduced-motion, SSR) state is the COMPLETED building, so the animation is
    purely an enhancement — nothing is reachable only through it.

    The final render is expected at /images/faq/q-hotel-building-final.png
    (transparent background). Until that file exists, @error flips the
    component into fallback mode: the finished line sketch stands in, exactly
    as the section looked before this experience.
  -->
  <div
    ref="rootRef"
    class="faq-building pointer-events-none relative w-full"
    :class="missingFinal ? 'faq-building-fallback' : ''"
    :style="{ aspectRatio }"
  >
    <!-- Architectural measurement grid: only alive during early construction -->
    <div data-b-grid class="faq-grid absolute -inset-x-8 -top-8 bottom-0 opacity-0" aria-hidden="true" />

    <!-- Ground line the foundation rises from -->
    <div data-b-ground class="absolute inset-x-[2%] bottom-0 h-px origin-center bg-ink/35 opacity-0" aria-hidden="true" />

    <!-- Contact shadow: grows with the building's mass -->
    <div data-b-shadow class="faq-shadow absolute inset-x-[14%] bottom-[-1.5%] h-[4%]" aria-hidden="true" />

    <!-- Warm ambient halo behind the finished building -->
    <div data-b-glow class="faq-glow absolute inset-0" aria-hidden="true" />

    <!-- Blueprint pass 1: vertical structural columns rise first -->
    <div data-b-columns class="faq-columns absolute inset-0 opacity-0" aria-hidden="true">
      <img
        src="/images/faq-sketch.svg"
        alt=""
        width="808"
        height="747"
        loading="lazy"
        class="faq-columns-img h-full w-full object-contain object-bottom"
      >
    </div>

    <!-- Blueprint pass 2: the full drawing, revealed floor band by floor band -->
    <img
      data-b-blueprint
      src="/images/faq-sketch.svg"
      alt=""
      width="808"
      height="747"
      loading="lazy"
      class="faq-blueprint absolute inset-0 h-full w-full object-contain object-bottom opacity-0"
      aria-hidden="true"
    >

    <!-- Final render, dimmed: raw materials before the lights come on -->
    <img
      v-if="!missingFinal"
      data-b-material
      :src="FINAL_RENDER_SRC"
      alt=""
      width="1390"
      height="1132"
      loading="lazy"
      class="faq-material faq-final-clip absolute inset-0 h-full w-full object-contain object-bottom"
      aria-hidden="true"
      @error="onFinalError"
    >

    <!-- Final render, full colour: warm window lights switching on -->
    <img
      v-if="!missingFinal"
      data-b-lights
      :src="FINAL_RENDER_SRC"
      alt="Exterior view of Q Hotel Dhaka illuminated at night."
      width="1390"
      height="1132"
      loading="lazy"
      class="faq-lights faq-final-clip absolute inset-0 h-full w-full object-contain object-bottom"
      @load="onFinalLoad"
      @error="onFinalError"
    >

    <!-- Landscape flanks: the trees arrive last, from the same render -->
    <img
      v-if="!missingFinal"
      data-b-flank
      :src="FINAL_RENDER_SRC"
      alt=""
      width="1390"
      height="1132"
      loading="lazy"
      class="faq-flank faq-flank-left absolute inset-0 h-full w-full object-contain object-bottom"
      aria-hidden="true"
    >
    <img
      v-if="!missingFinal"
      data-b-flank
      :src="FINAL_RENDER_SRC"
      alt=""
      width="1390"
      height="1132"
      loading="lazy"
      class="faq-flank faq-flank-right absolute inset-0 h-full w-full object-contain object-bottom"
      aria-hidden="true"
    >

    <!-- Construction scan line marking the active build height -->
    <div data-b-scan class="faq-scan absolute inset-x-[6%] h-px opacity-0" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
const FINAL_RENDER_SRC = '/images/faq/q-hotel-building-final-with-lgith.png'

const props = withDefaults(defineProps<{
  /** Construction progress: 0 = empty site, 1 = completed building.
   *  Defaults to 1 so SSR / mobile / reduced motion render the finished hotel. */
  progress?: number
}>(), {
  progress: 1,
})

const rootRef = ref<HTMLElement | null>(null)
const missingFinal = ref(false)
/** Frame ratio; corrected from the render's own pixels once it loads */
const aspectRatio = ref('1390 / 1132')

const { gsap, createContext, prefersReducedMotion } = useGsap()

let idleGlowTween: gsap.core.Tween | undefined

function onFinalLoad(event: Event) {
  const image = event.target as HTMLImageElement
  if (image.naturalWidth && image.naturalHeight) {
    aspectRatio.value = `${image.naturalWidth} / ${image.naturalHeight}`
  }
}

function onFinalError() {
  missingFinal.value = true
}

/** Piecewise-linear ramp: 0 before `from`, 1 after `to` */
function ramp(progress: number, from: number, to: number): number {
  return Math.min(1, Math.max(0, (progress - from) / (to - from)))
}

/** Floor quantization: rises in `bands` steps, eased inside each band so the
 *  reveal reads floor-by-floor without harsh hard edges (the mask's soft
 *  gradient smooths each boundary further). */
function banded(value: number, bands: number): number {
  if (value <= 0) {
    return 0
  }
  if (value >= 1) {
    return 1
  }
  const step = Math.floor(value * bands)
  const remainder = value * bands - step
  return Math.min(1, (step + remainder * remainder * (3 - 2 * remainder)) / bands)
}

function applyProgress(progress: number) {
  const root = rootRef.value
  if (!root || !gsap || prefersReducedMotion.value) {
    return
  }

  const select = (attribute: string) => root.querySelector<HTMLElement>(`[${attribute}]`)

  // Phase 1 — arrival: grid and ground appear, gone before materials finish
  const gridLife = ramp(progress, 0.0, 0.08) * (1 - ramp(progress, 0.5, 0.64))
  gsap.set(select('data-b-grid'), { autoAlpha: gridLife * 0.55 })

  const groundLife = ramp(progress, 0.05, 0.1) * (1 - ramp(progress, 0.88, 0.96))
  gsap.set(select('data-b-ground'), {
    autoAlpha: groundLife,
    scaleX: ramp(progress, 0.05, 0.14),
  })

  // Phase 2/3 — structure: columns rise, then the drawing fills floor by floor
  const columnsReveal = ramp(progress, 0.1, 0.32)
  const columnsElement = select('data-b-columns')
  columnsElement?.style.setProperty('--b-columns', String(columnsReveal))
  gsap.set(columnsElement, {
    autoAlpha: 0.4 * ramp(progress, 0.1, 0.15) * (1 - ramp(progress, 0.42, 0.52)),
  })

  const blueprintReveal = banded(ramp(progress, 0.15, 0.5), 16)
  const blueprintElement = select('data-b-blueprint')
  blueprintElement?.style.setProperty('--b-blueprint', String(blueprintReveal))
  // The drawing densifies through the façade phase, then cedes to materials.
  // In fallback mode (no final render) it stays as the finished artwork.
  const blueprintOpacity = missingFinal.value
    ? 0.6 * ramp(progress, 0.15, 0.2)
    : (0.5 + 0.35 * ramp(progress, 0.38, 0.55)) * (1 - ramp(progress, 0.58, 0.8))
  gsap.set(blueprintElement, { autoAlpha: blueprintOpacity })

  // Contact shadow grows with the building's mass
  gsap.set(select('data-b-shadow'), {
    autoAlpha: 0.85 * ramp(progress, 0.12, 0.72),
    scaleX: 0.35 + 0.65 * ramp(progress, 0.12, 0.72),
  })

  // Phase 5 — materials replace the drawing, bottom to top
  const materialReveal = banded(ramp(progress, 0.55, 0.78), 12)
  select('data-b-material')?.style.setProperty('--b-material', String(materialReveal))

  // Phase 6 — window lights: the full-colour pass lags the raw materials
  const lightsReveal = banded(ramp(progress, 0.68, 0.88), 10)
  select('data-b-lights')?.style.setProperty('--b-lights', String(lightsReveal))
  gsap.set(select('data-b-glow'), { autoAlpha: 0.4 * ramp(progress, 0.72, 0.92) })

  // Phase 7 — landscaping: trees rise softly out of the ground
  const flankElements = root.querySelectorAll<HTMLElement>('[data-b-flank]')
  flankElements.forEach((flank) => {
    flank.style.setProperty('--b-land', String(ramp(progress, 0.82, 0.94)))
  })
  gsap.set(flankElements, {
    autoAlpha: ramp(progress, 0.82, 0.9),
    y: 10 * (1 - ramp(progress, 0.82, 0.94)),
  })

  // The scan line tracks whichever front is actively building
  const structureWindow = ramp(progress, 0.08, 0.12) * (1 - ramp(progress, 0.46, 0.52))
  const materialWindow = ramp(progress, 0.56, 0.6) * (1 - ramp(progress, 0.84, 0.9))
  const scanFront = materialWindow > structureWindow
    ? Math.max(materialReveal, lightsReveal)
    : Math.max(columnsReveal, blueprintReveal)
  const scanElement = select('data-b-scan')
  gsap.set(scanElement, { autoAlpha: 0.55 * Math.max(structureWindow, materialWindow) })
  scanElement?.style.setProperty('bottom', `${(scanFront * 94).toFixed(2)}%`)

  syncIdleGlow(progress)
}

/** Completed-state idle: the ambient glow breathes very slightly — the only
 *  motion allowed after the final hold, and never under reduced motion. */
function syncIdleGlow(progress: number) {
  const shouldIdle = progress >= 0.97

  if (shouldIdle && !idleGlowTween && gsap && rootRef.value) {
    const glow = rootRef.value.querySelector('[data-b-glow]')
    idleGlowTween = gsap.to(glow, {
      opacity: 0.5,
      duration: 3.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }
  else if (!shouldIdle && idleGlowTween) {
    idleGlowTween.kill()
    idleGlowTween = undefined
  }
}

watch(() => props.progress, applyProgress)
watch(missingFinal, () => applyProgress(props.progress))

onMounted(() => {
  // The render may have already failed BEFORE hydration attached @error (the
  // browser fetches it straight from the server HTML), so the event alone is
  // not enough — re-check the settled state of every final-render image.
  rootRef.value
    ?.querySelectorAll<HTMLImageElement>('[data-b-material], [data-b-lights], [data-b-flank]')
    .forEach((image) => {
      if (image.complete && image.naturalWidth === 0) {
        missingFinal.value = true
      }
    })

  // A context solely so useGsap reverts anything the idle tween created;
  // per-frame sets intentionally leave the completed state in place.
  createContext(() => {
    if (props.progress < 1) {
      applyProgress(props.progress)
    }
  }, rootRef.value ?? undefined)
})

onBeforeUnmount(() => {
  idleGlowTween?.kill()
  idleGlowTween = undefined
})
</script>

<style scoped>
/*
  Default (no inline overrides) = COMPLETED building. Every construction layer
  hides itself, every final layer shows itself, so no-JS, SSR, mobile, and
  reduced-motion all render the finished hotel with zero script.
*/

/* Fine architect's grid, only visible mid-construction */
.faq-grid {
  background-image:
    linear-gradient(to right, rgb(var(--color-ink) / 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-ink) / 0.06) 1px, transparent 1px);
  background-size: 3rem 3rem;
}

/* Soft contact shadow under the completed mass */
.faq-shadow {
  background: radial-gradient(ellipse 50% 50% at 50% 50%, rgb(var(--color-night) / 0.35), transparent 70%);
  filter: blur(6px);
}

/* Ambient warm halo; settles at a quiet glow in the final hold */
.faq-glow {
  background: radial-gradient(ellipse 55% 45% at 50% 72%, rgb(var(--color-champagne) / 0.18), transparent 68%);
  opacity: 0.4;
}

/* Structural-columns pass: vertical slices of the drawing, rising bottom-up.
   The wrapper owns the bottom-up mask; the image owns the column stripes, so
   the two masks compose without mask-composite support. */
.faq-columns {
  mask-image: linear-gradient(to top, #000 calc(var(--b-columns, 1) * 106% - 6%), transparent calc(var(--b-columns, 1) * 106%));
}

.faq-columns-img {
  mask-image: repeating-linear-gradient(to right, #000 0 4%, transparent 4% 11%);
}

/* Full blueprint drawing: floor-quantized bottom-up reveal */
.faq-blueprint {
  mask-image: linear-gradient(to top, #000 calc(var(--b-blueprint, 1) * 106% - 6%), transparent calc(var(--b-blueprint, 1) * 106%));
}

/* Fallback mode (final render unavailable): the finished sketch stands in,
   matching the section's original editorial look */
.faq-building-fallback .faq-blueprint {
  opacity: 0.6;
}

/* Final-render layers keep the landscape flanks clipped out, so the trees can
   arrive on their own beat. Asymmetric, measured against the actual render:
   the left tree cluster spans ~11-30% of the frame, the outer right tree
   ~81-96%, tree tops at ~67% height. (The inner right tree stands in front of
   the side volume and cannot be split from it without a hand mask — it rides
   with the façade.) */
.faq-building {
  --flank-left: 31%;
  --flank-right: 20%;
  --flank-top: 64%;
}

.faq-final-clip {
  clip-path: polygon(
    0 0,
    100% 0,
    100% var(--flank-top),
    calc(100% - var(--flank-right)) var(--flank-top),
    calc(100% - var(--flank-right)) 100%,
    var(--flank-left) 100%,
    var(--flank-left) var(--flank-top),
    0 var(--flank-top)
  );
}

/* Materials pass: the render before its lights come on — dimmed and cooled
   enough that the lights phase reads as the building switching on */
.faq-material {
  filter: saturate(0.6) brightness(0.78);
  mask-image: linear-gradient(to top, #000 calc(var(--b-material, 1) * 106% - 6%), transparent calc(var(--b-material, 1) * 106%));
}

/* Lights pass: the untouched render, lagging one beat behind the materials */
.faq-lights {
  mask-image: linear-gradient(to top, #000 calc(var(--b-lights, 1) * 108% - 8%), transparent calc(var(--b-lights, 1) * 108%));
}

/* Landscape flanks: just the tree zones of the render */
.faq-flank {
  mask-image: linear-gradient(to top, #000 calc(var(--b-land, 1) * 110% - 10%), transparent calc(var(--b-land, 1) * 110%));
}

.faq-flank-left {
  clip-path: inset(var(--flank-top) calc(100% - var(--flank-left)) 0 0);
}

.faq-flank-right {
  clip-path: inset(var(--flank-top) 0 0 calc(100% - var(--flank-right)));
}

/* Active-height scan line: hairline of warm light at the construction front */
.faq-scan {
  background: linear-gradient(to right, transparent, rgb(var(--color-champagne) / 0.9), transparent);
  box-shadow: 0 0 12px 1px rgb(var(--color-champagne) / 0.35);
  bottom: 94%;
}
</style>
