/**
 * Converts a BookingSearchQuery to and from URL query params, so a search
 * submitted from the hero (or the /rooms console itself) round-trips through
 * navigation, refresh, and sharing — instead of living only in an in-memory
 * useState that a plain nav link would never populate.
 */
import type { LocationQuery } from 'vue-router'
import type { BookingSearchQuery } from '~/types/booking'

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function firstValue(value: LocationQuery[string] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value
  return raw ?? undefined
}

function parseInt(value: string | undefined, fallback: number, min: number): number {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed >= min ? parsed : fallback
}

/** Serializes a booking search for the URL */
export function toBookingRouteQuery(query: BookingSearchQuery): Record<string, string> {
  return {
    checkIn: query.checkIn,
    checkOut: query.checkOut,
    rooms: String(query.rooms),
    adults: String(query.adults),
    children: String(query.children),
    ...(query.promoCode ? { promoCode: query.promoCode } : {}),
  }
}

/** Reads a booking search back out of route query params. Returns null when
 *  the dates are missing or malformed, so callers fall back to their own
 *  defaults (today/tomorrow, 2 guests, 1 room) instead of a half-populated
 *  search — this is what makes a plain nav link to /rooms show no stale
 *  selection. */
export function parseBookingRouteQuery(routeQuery: LocationQuery): BookingSearchQuery | null {
  const checkIn = firstValue(routeQuery.checkIn)
  const checkOut = firstValue(routeQuery.checkOut)

  if (!checkIn || !checkOut || !ISO_DATE_PATTERN.test(checkIn) || !ISO_DATE_PATTERN.test(checkOut)) {
    return null
  }

  return {
    checkIn,
    checkOut,
    rooms: parseInt(firstValue(routeQuery.rooms), 1, 1),
    adults: parseInt(firstValue(routeQuery.adults), 2, 1),
    children: parseInt(firstValue(routeQuery.children), 0, 0),
    promoCode: firstValue(routeQuery.promoCode) ?? '',
  }
}
