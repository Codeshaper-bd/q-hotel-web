/**
 * The hero's headline entrance for any section title: words rise one by one
 * through their own masks. The words wait hidden until BOTH the preloader has
 * opened and the title is genuinely on screen (IntersectionObserver, so
 * pinned sections and layout shifts can't make it fire early). Plays once.
 * Skipped entirely under reduced motion (the title just renders).
 */
export const useWordReveal = (target: Ref<HTMLElement | null>) => {
  const { gsap, prefersReducedMotion } = useGsap()
  const isPreloaderComplete = useState('preloader-complete', () => false)

  let observer: IntersectionObserver | undefined
  let tween: gsap.core.Tween | undefined

  onMounted(() => {
    const element = target.value
    if (!element || !gsap || prefersReducedMotion.value) {
      return
    }

    const words = splitIntoWords(element, true)
    gsap.set(words, { yPercent: 110, autoAlpha: 0 })

    const play = () => {
      tween = gsap.to(words, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.3,
        stagger: 0.14,
        ease: 'power3.out',
      })
    }

    // Fires once the title is well inside the viewport, not merely touching it
    const arm = () => {
      observer = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer?.disconnect()
          observer = undefined
          play()
        }
      }, { rootMargin: '0px 0px -15% 0px', threshold: 0.6 })
      observer.observe(element)
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
    observer?.disconnect()
    tween?.kill()
  })
}
