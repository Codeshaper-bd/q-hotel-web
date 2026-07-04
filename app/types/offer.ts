import type { ImageAsset } from './media'

/** Promotional offer/package teaser shown on the home page carousel */
export interface OfferPackage {
  id: string
  title: string
  description: string
  image: ImageAsset
}
