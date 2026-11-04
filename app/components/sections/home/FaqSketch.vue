<template>
  <!--
    The hotel's architectural line sketch, drawn by a small pencil the moment
    it comes into view — a real drawing, not a scroll effect. The artwork is
    traced into centre-line strokes (public/images/faq/faq-sketch-strokes.svg),
    stored in drawing order: the long structural lines first (ground line, then
    the tower's frame), the fine detail and foliage after. The pencil follows
    each line exactly as it appears, gliding from one stroke to the next. When
    the last line lands, the pencil lifts away and the full artwork, with its
    fine shading, settles in under the lines — the finished sketch is the
    original at the same soft weight, never darker.

    The resting DOM state is the COMPLETED sketch with no pencil: SSR, no-JS
    and reduced motion all show it at once; the drawing is only an enhancement.
  -->
  <div
    ref="rootRef"
    class="faq-sketch pointer-events-none relative aspect-[1200/1030] w-full"
  >
    <img
      ref="artworkRef"
      src="/images/faq/faq-sketch.webp"
      alt=""
      width="1200"
      height="1030"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-contain opacity-60"
      aria-hidden="true"
    >

    <svg
      class="absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 1200 1030"
      fill="none"
      aria-hidden="true"
    >
      <g
        ref="strokesRef"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-[#555]"
      />

      <!-- The pencil: tip at the group's origin, leaning right like a hand
           writing. Drawn in sketch units, so it scales with the drawing. -->
      <g ref="pencilRef" opacity="0">
        <g transform="rotate(32)">
          <polygon points="0,0 -5,-17 5,-17" fill="#e8d3a8" />
          <polygon points="0,0 -1.6,-5.2 1.6,-5.2" fill="#3d3d3d" />
          <rect x="-5" y="-62" width="10" height="45" fill="#d4a94f" />
          <rect x="-1.2" y="-62" width="2.4" height="45" fill="#b88c32" />
          <rect x="-5" y="-68" width="10" height="6" fill="#a8a8a8" />
          <rect x="-5" y="-76" width="10" height="8" rx="2" fill="#d98b8b" />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
const STROKES_URL = '/images/faq/faq-sketch-strokes.svg'
/** Resting opacity of the artwork (Figma: 60%) — the sketch never exceeds it */
const SKETCH_OPACITY = 0.6

/** Pencil speed along long structural lines, in sketch units per second */
const STRUCTURE_SPEED = 8000
/** Strokes shorter than this are fine detail and are drawn much faster */
const DETAIL_LENGTH = 70
const DETAIL_SPEED = 32000
/** Pencil speed while gliding between strokes (not drawing) */
const GLIDE_SPEED = 26000
const MIN_STROKE_SECONDS = 0.003
const MIN_GLIDE_SECONDS = 0.004
/** Fine-detail strokes overlap: each starts this share of the way through the last */
const DETAIL_OVERLAP = 0.6
const SETTLE_SECONDS = 1.1

const rootRef = ref<HTMLElement | null>(null)
const artworkRef = ref<HTMLImageElement | null>(null)
const strokesRef = ref<SVGGElement | null>(null)
const pencilRef = ref<SVGGElement | null>(null)

const { gsap, prefersReducedMotion } = useGsap()

let observer: IntersectionObserver | undefined
let timeline: gsap.core.Timeline | undefined
let isDisposed = false

async function loadStrokes() {
  const response = await fetch(STROKES_URL)
  const group = strokesRef.value
  if (!response.ok || !group || isDisposed) {
    return []
  }

  const parsed = new DOMParser().parseFromString(await response.text(), 'image/svg+xml')
  if (isDisposed) {
    return []
  }

  const fragment = document.createDocumentFragment()
  for (const source of Array.from(parsed.querySelectorAll('path'))) {
    const path = document.importNode(source, true) as SVGPathElement
    // Normalised length: every stroke animates 0-1 whatever its real length
    path.setAttribute('pathLength', '1')
    path.style.strokeDasharray = '1'
    path.style.strokeDashoffset = '1'
    path.style.opacity = '0'
    fragment.append(path)
  }
  group.append(fragment)

  return Array.from(group.querySelectorAll('path'))
}

/** One timeline for the whole drawing, in the order the strokes are stored */
function buildTimeline(strokes: SVGPathElement[]) {
  const pencil = pencilRef.value
  const artwork = artworkRef.value
  const group = strokesRef.value
  if (!gsap || !pencil || !artwork || !group) {
    return undefined
  }

  const position = { x: 0, y: 0 }
  const place = () => pencil.setAttribute('transform', `translate(${position.x.toFixed(1)} ${position.y.toFixed(1)})`)

  const drawing = gsap.timeline({
    paused: true,
    onComplete: () => {
      // Lift the pencil, let the full artwork settle in under the lines
      gsap.to(pencil, { opacity: 0, duration: 0.5, ease: 'power1.out' })
      gsap.to(artwork, { opacity: SKETCH_OPACITY, duration: SETTLE_SECONDS, ease: 'power1.inOut' })
      gsap.to(group, { opacity: 0, duration: SETTLE_SECONDS, ease: 'power1.inOut' })
    },
  })

  let cursor = 0
  let hasPosition = false

  for (const stroke of strokes) {
    const length = stroke.getTotalLength()
    if (length <= 0) {
      continue
    }

    const first = stroke.getPointAtLength(0)

    const isDetail = length < DETAIL_LENGTH

    // Glide to where the next line begins (the pencil lifts between strokes).
    // Foliage-scale detail is too quick to follow, so the pencil just hops.
    if (!hasPosition) {
      position.x = first.x
      position.y = first.y
      drawing.set(pencil, { opacity: 1 }, 0)
      drawing.call(place, undefined, 0)
      hasPosition = true
    }
    else {
      const distance = Math.hypot(first.x - position.x, first.y - position.y)
      if (distance > 1 && !isDetail) {
        const glide = Math.max(MIN_GLIDE_SECONDS, distance / GLIDE_SPEED)
        drawing.to(position, { x: first.x, y: first.y, duration: glide, ease: 'power1.inOut', onUpdate: place }, cursor)
        cursor += glide
      }
    }

    const speed = isDetail ? DETAIL_SPEED : STRUCTURE_SPEED
    const seconds = Math.max(MIN_STROKE_SECONDS, length / speed)

    drawing.set(stroke, { opacity: 1 }, cursor)
    drawing.to(stroke, {
      strokeDashoffset: 0,
      duration: seconds,
      ease: 'none',
      onUpdate() {
        // The tip rides exactly the head of the line being drawn
        const tip = stroke.getPointAtLength(length * this.progress())
        position.x = tip.x
        position.y = tip.y
        place()
      },
    }, cursor)
    cursor += isDetail ? seconds * DETAIL_OVERLAP : seconds
    // Keep the glide's start in sync with where this stroke ended
    const end = stroke.getPointAtLength(length)
    drawing.set(position, { x: end.x, y: end.y }, cursor)
  }

  return drawing
}

onMounted(() => {
  const root = rootRef.value
  if (!root || !gsap || prefersReducedMotion.value) {
    return
  }

  observer = new IntersectionObserver(async (entries) => {
    if (!entries.some(entry => entry.isIntersecting)) {
      return
    }

    observer?.disconnect()
    observer = undefined

    try {
      const strokes = await loadStrokes()
      if (isDisposed || strokes.length === 0) {
        return
      }

      // Blank page first: only now hide the finished artwork
      if (artworkRef.value) {
        artworkRef.value.style.opacity = '0'
      }

      timeline = buildTimeline(strokes)
      timeline?.play()
    }
    catch {
      // Keep the finished artwork if anything goes wrong
      if (artworkRef.value) {
        artworkRef.value.style.opacity = ''
      }
    }
  }, { threshold: 0.3 })

  observer.observe(root)
})

onBeforeUnmount(() => {
  isDisposed = true
  observer?.disconnect()
  observer = undefined
  timeline?.kill()
  timeline = undefined
})
</script>
