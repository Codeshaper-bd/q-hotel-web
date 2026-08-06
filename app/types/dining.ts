import type { ImageAsset } from './media'

/** A dining outlet shown in the pinned, scroll-driven dining showcase */
export interface DiningVenue {
  id: string
  name: string
  description: string
  /** Full-bleed, static background photograph for the outlet's slide */
  poster: ImageAsset
}
