/**
 * Diagonal "wave" entrance for a grid of cards: each group of cards rises in
 * from the top-left, only once it is genuinely on screen, and (inside a
 * section with a word-reveal title) only once that title is under way.
 *
 * Scroll-position based (whenReached) rather than ScrollTrigger or an
 * IntersectionObserver on purpose: ScrollTrigger measures positions at
 * creation (a pinned section above adds its spacer afterwards, so cards fired
 * far too early), and observers miss cards scrolled past between frames, which
 * left them blank. Skipped under reduced motion (the cards just render).
 */
export const useWaveReveal = (
  grid: Ref<HTMLElement | null>,
  selector: string,
  options: {
    /** How far up from the viewport's bottom edge a card's top must be before
     *  it animates (fraction of the viewport height). Default 0.12; pass 0 for
     *  content that sits at the very bottom edge of a full-viewport stage */
    offset?: number
    /** Evaluated once on mount; return false to leave the cards alone (e.g.
     *  when another animation owns them at this viewport size) */
    shouldRun?: () => boolean
  } = {},
) => {
  const { gsap, prefersReducedMotion } = useGsap()

  /** Seconds between neighbouring cards along the wave */
  const WAVE_STEP_SECONDS = 0.1

  const cancels: Array<() => void> = []
  let isDisposed = false
  const tweens: gsap.core.Tween[] = []

  /** Wave delay per card: grows with (row + column), sweeping diagonally from
   *  the top-left of whatever group entered together */
  function waveDelays(group: HTMLElement[]): number[] {
    const tops = [...new Set(group.map(card => card.offsetTop))].sort((a, b) => a - b)

    return group.map((card) => {
      const row = tops.indexOf(card.offsetTop)
      const column = group
        .filter(other => other.offsetTop === card.offsetTop)
        .sort((a, b) => a.offsetLeft - b.offsetLeft)
        .indexOf(card)
      return (row + column) * WAVE_STEP_SECONDS
    })
  }

  onMounted(() => {
    const container = grid.value
    if (!container || !gsap || prefersReducedMotion.value || options.shouldRun?.() === false) {
      return
    }

    const cards = Array.from(container.querySelectorAll<HTMLElement>(selector))
    if (cards.length === 0) {
      return
    }

    gsap.set(cards, { autoAlpha: 0, y: 48, scale: 0.94 })

    // Cards that cross the line in the same frame wave in together; a card the
    // visitor already scrolled past is shown at once instead of being left blank
    const queue: HTMLElement[] = []
    let flushFrame = 0

    const flush = () => {
      flushFrame = 0
      const entering = queue.splice(0)
      if (entering.length === 0) {
        return
      }

      const delays = waveDelays(entering)

      void whenSectionTitleRevealed(container).then(() => {
        if (isDisposed) {
          return
        }

        entering.forEach((card, index) => {
          tweens.push(
            gsap.to(card, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              delay: delays[index],
              ease: 'power3.out',
              // Leave no inline transform on a card once it has landed
              onComplete: () => {
                gsap.set(card, { clearProps: 'transform,opacity,visibility' })
              },
            }),
          )
        })
      })
    }

    // A card counts once its top is clearly inside the viewport
    const offset = options.offset ?? 0.12

    cards.forEach((card) => {
      cancels.push(whenReached(card, (isPastViewport) => {
        if (isPastViewport) {
          gsap.set(card, { clearProps: 'transform,opacity,visibility' })
          return
        }

        queue.push(card)
        if (!flushFrame) {
          flushFrame = requestAnimationFrame(flush)
        }
      }, offset))
    })
  })

  onBeforeUnmount(() => {
    isDisposed = true
    cancels.forEach(cancel => cancel())
    tweens.forEach(tween => tween.kill())
  })
}
