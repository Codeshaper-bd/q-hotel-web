/**
 * Runs `callback` once an element's top has reached into the viewport — and,
 * crucially, ALSO when the visitor scrolled straight past it between frames.
 *
 * IntersectionObserver and ScrollTrigger-with-`once` both miss elements that
 * jump from below the viewport to above it in a single scroll step (a fast
 * wheel flick, a scrollbar drag, an anchor jump): the element never reports as
 * intersecting, so its reveal never runs and the page shows blank content.
 * This watches the scroll position itself, so a skipped element is caught on
 * the next frame and told `isPastViewport = true`, which callers use to show
 * it instantly instead of animating something nobody can see any more.
 *
 * One shared passive scroll/resize listener serves every watched element and
 * removes itself once nothing is left to watch.
 */

interface Watched {
  element: Element
  /** Fraction of the viewport height the element's top must clear from the bottom edge */
  offset: number
  callback: (isPastViewport: boolean) => void
}

const watched = new Set<Watched>()
let isListening = false
let frame = 0

function check() {
  frame = 0
  const viewportHeight = window.innerHeight

  for (const item of [...watched]) {
    const { top, bottom } = item.element.getBoundingClientRect()
    if (top < viewportHeight * (1 - item.offset)) {
      watched.delete(item)
      item.callback(bottom < 0)
    }
  }

  if (watched.size === 0) {
    stopListening()
  }
}

function schedule() {
  if (!frame) {
    frame = requestAnimationFrame(check)
  }
}

function stopListening() {
  if (!isListening) {
    return
  }
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  isListening = false
}

/** Returns a cancel function. Client-only: call it from onMounted or later. */
export function whenReached(
  element: Element,
  callback: (isPastViewport: boolean) => void,
  offset = 0.12,
): () => void {
  const item: Watched = { element, offset, callback }
  watched.add(item)

  if (!isListening) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    isListening = true
  }

  // Cover elements already in view (or already passed) at mount time
  schedule()

  return () => {
    watched.delete(item)
    if (watched.size === 0) {
      stopListening()
    }
  }
}

/** 'top 88%' → 0.12 (the element's top must be 12% up from the bottom edge) */
export function offsetFromStart(start: string, fallback = 0.12): number {
  const match = /top\s+(\d+(?:\.\d+)?)%/.exec(start)
  return match ? 1 - Number(match[1]) / 100 : fallback
}
