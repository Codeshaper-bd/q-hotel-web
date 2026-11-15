/**
 * The hero's headline entrance for any section title: words rise one by one
 * through their own masks. The words wait hidden until BOTH the preloader has
 * opened and the title is genuinely on screen (scroll-position based, see
 * whenReached, so a fast scroll past it still reveals it). Plays once.
 * Skipped entirely under reduced motion (the title just renders).
 */
/** Seconds after the first word starts rising before the section's content is released */
const TITLE_LEAD_SECONDS = 0.85

export const useWordReveal = (target: Ref<HTMLElement | null>) => {
  const { gsap, prefersReducedMotion } = useGsap()
  const isPreloaderComplete = useState('preloader-complete', () => false)

  let cancelWatch: (() => void) | undefined
  let tween: gsap.core.Tween | undefined
  let signalTimer: gsap.core.Tween | undefined

  onMounted(() => {
    const element = target.value
    if (!element || !gsap || prefersReducedMotion.value) {
      return
    }

    const words = splitIntoWords(element, true)
    gsap.set(words, { yPercent: 110, autoAlpha: 0 })

    // Lets the section's content (FadeReveal) follow the title in sequence
    const markTitleLanded = registerSectionTitle(element)

    const play = () => {
      // Content starts while the last words are still settling, so the two
      // overlap into one continuous motion rather than a hard hand-off
      signalTimer = gsap.delayedCall(TITLE_LEAD_SECONDS, () => markTitleLanded?.())
      tween = gsap.to(words, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.3,
        stagger: 0.14,
        ease: 'power3.out',
      })
    }

    // Fires once the title's top is well inside the viewport. If the visitor
    // scrolled straight past it, the title is simply shown, never left hidden.
    const arm = () => {
      cancelWatch = whenReached(element, (isPastViewport) => {
        if (isPastViewport) {
          gsap.set(words, { yPercent: 0, autoAlpha: 1, clearProps: 'transform,opacity,visibility' })
          markTitleLanded?.()
          return
        }
        play()
      }, 0.15)
    }

    if (isPreloaderComplete.value) {
      arm()
      return
    }

    const stopWaiting = watch(isPreloaderComplete, (isComplete) => {
      if (isComplete) {
        stopWaiting()
        arm()
      }
    })
  })

  onBeforeUnmount(() => {
    cancelWatch?.()
    tween?.kill()
    signalTimer?.kill()
  })
}
