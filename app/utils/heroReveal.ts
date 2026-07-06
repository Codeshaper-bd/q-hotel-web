/**
 * Shared math for the home hero "through the Q" scroll journey. The DOM
 * reveal (HeroMaskReveal) and the WebGL fluid layer (HeroFluidReveal) both
 * derive visuals from the same 0-1 progress, so the curves live here to
 * guarantee they can never drift apart.
 */

/** Piecewise-linear ramp: 0 before `from`, 1 after `to` */
export function ramp(progress: number, from: number, to: number): number {
  return Math.min(1, Math.max(0, (progress - from) / (to - from)))
}

/**
 * Depth-parallax scale of the hero footage: settles from oversized to rest
 * during the dolly, then keeps a whisper of settle through the hold. The
 * fluid layer samples the same footage as a texture and must match this
 * exactly so revealed patches align with the video seen through the Q.
 */
export function heroVideoScale(progress: number): number {
  return 1.18 - 0.16 * ramp(progress, 0, 0.55) - 0.02 * ramp(progress, 0.55, 1)
}
