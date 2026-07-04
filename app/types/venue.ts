import type { ImageAsset } from './media'

/** Seating layout capacity for an event venue, e.g. "Theater: 400 Guests" */
export interface VenueCapacity {
  layout: string
  guests: number
}

/**
 * Meetings & events venue domain model. Static marketing content today;
 * field names map 1:1 onto a future CMS/API.
 */
export interface MeetingVenue {
  id: string
  name: string
  description: string
  image: ImageAsset
  capacities: VenueCapacity[]
  /** Display label, e.g. "5,721 sq. ft." */
  areaLabel: string
  /** Display label, e.g. "99.6 ft × 57.6 ft × 22 ft" */
  dimensionsLabel: string
}
