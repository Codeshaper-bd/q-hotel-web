<template>
  <div ref="root">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface FadeRevealProps {
  /** Direction the content travels from as it settles into view */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Travel distance in px; ignored when direction is 'none' */
  distance?: number
  /** Seconds to wait before the reveal begins */
  delay?: number
  /** Reveal duration in seconds */
  duration?: number
  /** Entrance blur in px — clears as the content lands; 0 disables */
  blur?: number
  /** Extra seconds between children carrying `data-reveal-item`. When > 0 the
   *  children reveal one after another instead of the whole block at once */
  stagger?: number
  /** ScrollTrigger start position (see GSAP docs) */
  start?: string
}

const props = withDefaults(defineProps<FadeRevealProps>(), {
  direction: 'up',
  distance: 28,
  delay: 0,
  duration: 0.9,
  blur: 0,
  stagger: 0,
  start: 'top 85%',
})

const root = ref<HTMLElement | null>(null)
const { gsap, createContext, prefersReducedMotion } = useGsap()

/** Hidden starting offset for a direction, expressed in px */
function offsetFor(direction: FadeRevealProps['direction']): { x: number; y: number } {
  if (direction === 'up') return { x: 0, y: props.distance }
  if (direction === 'down') return { x: 0, y: -props.distance }
  if (direction === 'left') return { x: props.distance, y: 0 }
  if (direction === 'right') return { x: -props.distance, y: 0 }
  return { x: 0, y: 0 }
}

onMounted(() => {
  if (!root.value || !gsap || prefersReducedMotion.value) {
    return
  }

  // Staggered grids opt in by marking their children; otherwise the wrapper
  // itself is revealed as one block.
  const items = props.stagger > 0
    ? Array.from(root.value.querySelectorAll<HTMLElement>('[data-reveal-item]'))
    : []

  // When a stagger is requested but nothing carries the marker, fall back to
  // revealing the wrapper so the intent never silently does nothing.
  const targets = items.length > 0 ? items : [root.value]

  createContext(() => {
    targets.forEach((target, index) => {
      const offset = offsetFor(props.direction)

      // Only include filter when a blur is actually requested, so revealed
      // targets never keep a permanent inline filter (which would force a
      // compositing layer even after the animation has finished).
      const fromVars = {
        autoAlpha: 0,
        x: offset.x,
        y: offset.y,
        ...(props.blur > 0 ? { filter: `blur(${props.blur}px)` } : {}),
      }
      const toVars = {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: props.duration,
        delay: props.delay + index * props.stagger,
        ease: 'power3.out' as const,
        scrollTrigger: {
          trigger: target,
          start: props.start,
          once: true,
        },
        ...(props.blur > 0 ? { filter: 'blur(0px)' } : {}),
      }

      gsap.fromTo(target, fromVars, toVars)
    })
  }, root.value)
})
</script>
