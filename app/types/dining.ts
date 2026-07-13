import type { ImageAsset } from './media'

/** A dining outlet shown in the pinned, scroll-driven dining showcase */
export interface DiningVenue {
  id: string
  name: string
  description: string
  /** First paint and the mobile / reduced-motion / no-JS fallback */
  poster: ImageAsset
  /** Ambient background footage; desktop + full-motion users only */
  videoSrc: string
}
