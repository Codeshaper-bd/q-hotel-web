import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/**
 * Site-wide smooth scroll (Lenis). Wheel/touch scrolling is eased so the
 * pinned hero journey and scroll reveals feel cinematic rather than stepped.
 *
 * - Reduced-motion users keep fully native scrolling (plugin bails).
 * - Keyboard scrolling and anchor jumps stay native — Lenis only smooths
 *   wheel/touch, so accessibility is unaffected.
 * - Driven from GSAP's ticker so the whole site shares one RAF, with
 *   ScrollTrigger kept in sync on every smoothed frame.
 */
export default defineNuxtPlugin(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
  })

  lenis.on('scroll', () => ScrollTrigger.update())
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return {
    provide: { lenis },
  }
})
