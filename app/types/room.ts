/** A single photograph of a room, CMS-ready (src + meaningful alt) */
export interface RoomImage {
  src: string
  alt: string
}

/**
 * Room/suite domain model for showcase and (later) reservation flows.
 * Static marketing content today; field names map 1:1 onto a future CMS/API.
 */
export interface Room {
  id: string
  /** Short label for filters/tabs, e.g. "Deluxe Twin" */
  tabLabel: string
  /** Full display name, e.g. "Deluxe Twin Room" */
  name: string
  description: string
  /** Display-only nightly rate; live pricing arrives with the PMS integration */
  nightlyRateUsd: number
  areaSqFt: number
  maxOccupancy: number
  bedType: string
  images: RoomImage[]
}
