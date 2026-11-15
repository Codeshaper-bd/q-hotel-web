/**
 * Diagonal "wave" entrance for a grid of cards: each group of cards rises in
 * from the top-left, only once it is genuinely on screen, and (inside a
 * section with a word-reveal title) only once that title is under way.
 *
 * IntersectionObserver rather than ScrollTrigger on purpose: ScrollTrigger
 * measures positions at creation, and a pinned section above (Rooms) adds its
 * spacer afterwards, which made the cards fire far too early and finish off
 * screen. Skipped under reduced motion (the cards just render).
 */
export const useWaveReveal = (
  grid: Ref<HTMLElement | null>,
  selector: string,
  options: {
    /** IntersectionObserver margin: the default waits until a card is clearly
     *  inside the viewport; pass '0px' for content that sits at the very
     *  bottom edge of a full-viewport stage */
    rootMargin?: string
    /** Evaluated once on mount; return false to leave the cards alone (e.g.
     *  when another animation owns them at this viewport size) */
    shouldRun?: () => boolean
  } = {},
) => {
  const { gsap, prefersReducedMotion } = useGsap()

  /** Seconds between neighbouring cards along the wave */
  const WAVE_STEP_SECONDS = 0.1

  let observer: IntersectionObserver | undefined
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

    observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => entry.target as HTMLElement)
        if (entering.length === 0) {
          return
        }

        entering.forEach(card => observer?.unobserve(card))
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
      },
      // A card counts once its top is clearly inside the viewport
      { rootMargin: options.rootMargin ?? '0px 0px -12% 0px', threshold: 0.2 },
    )

    cards.forEach(card => observer?.observe(card))
  })

  onBeforeUnmount(() => {
    isDisposed = true
    observer?.disconnect()
    tweens.forEach(tween => tween.kill())
  })
}
