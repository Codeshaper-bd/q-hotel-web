import type { Ref } from 'vue'

/**
 * Shared logic for scroll-snap carousels (offers, reviews): tracks scroll
 * progress for a progress bar, exposes prev/next paging by card width, and
 * cleans up its listeners. The viewport element is a horizontal
 * `overflow-x-auto` container whose cards carry `data-carousel-card`.
 */
export const useScrollCarousel = (viewportRef: Ref<HTMLElement | null>) => {
  const { prefersReducedMotion } = useReducedMotion()

  /** 0..1 scroll progress across the whole track */
  const scrollProgress = ref(0)
  const canScrollBack = ref(false)
  const canScrollForward = ref(false)

  const updateScrollState = () => {
    const viewport = viewportRef.value
    if (!viewport) {
      return
    }

    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth
    scrollProgress.value = maxScrollLeft > 0 ? viewport.scrollLeft / maxScrollLeft : 1
    canScrollBack.value = viewport.scrollLeft > 4
    canScrollForward.value = viewport.scrollLeft < maxScrollLeft - 4
  }

  const scrollByCard = (direction: 1 | -1) => {
    const viewport = viewportRef.value
    if (!viewport) {
      return
    }

    const card = viewport.querySelector<HTMLElement>('[data-carousel-card]')
    const trackGap = Number.parseFloat(getComputedStyle(viewport).columnGap) || 0
    const step = card ? card.offsetWidth + trackGap : viewport.clientWidth

    viewport.scrollBy({
      left: step * direction,
      behavior: prefersReducedMotion.value ? 'auto' : 'smooth'
    })
  }

  onMounted(() => {
    const viewport = viewportRef.value
    if (!viewport) {
      return
    }

    updateScrollState()
    viewport.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState, { passive: true })

    onBeforeUnmount(() => {
      viewport.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    })
  })

  return {
    scrollProgress,
    canScrollBack,
    canScrollForward,
    scrollByCard
  }
}
