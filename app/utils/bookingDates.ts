/**
 * Local-date helpers for the booking flow. Everything works on ISO date
 * strings (YYYY-MM-DD) in the visitor's local time zone — never UTC — so a
 * guest browsing at 11 pm is offered today, not yesterday.
 */

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/** Local calendar date of a Date object as YYYY-MM-DD */
export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** YYYY-MM-DD → local Date (midnight) */
export function isoToDate(iso: string): Date {
  const [year = 0, month = 1, day = 1] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** Today's local calendar date as YYYY-MM-DD */
export function todayIsoDate(): string {
  return toIsoDate(new Date())
}

/** ISO date shifted by whole days */
export function addDaysIso(iso: string, days: number): string {
  const date = isoToDate(iso)
  date.setDate(date.getDate() + days)
  return toIsoDate(date)
}

/** "Mon, Jul 06" — compact day format (calendar day labels) */
export function formatBookingDay(iso: string): string {
  return isoToDate(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
  })
}

/** "26 June, 2026" — the reservation bar's field format */
export function formatBookingDateLong(iso: string): string {
  const date = isoToDate(iso)
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  return `${date.getDate()} ${month}, ${date.getFullYear()}`
}

/** Whole nights between two ISO dates (0 when the range is incomplete) */
export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) {
    return 0
  }
  const ms = isoToDate(checkOut).getTime() - isoToDate(checkIn).getTime()
  return Math.max(0, Math.round(ms / 86_400_000))
}
