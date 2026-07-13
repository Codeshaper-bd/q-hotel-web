/**
 * Resolve the fixed header's height in pixels from the `--header-height`
 * design token (authored in rem), for ScrollTrigger offsets that need a
 * number. Falls back to 72px if the token is unreadable.
 */
export function readHeaderHeight(): number {
  const rootStyle = window.getComputedStyle(document.documentElement)
  const declared = rootStyle.getPropertyValue('--header-height').trim()
  const value = Number.parseFloat(declared)

  if (!Number.isFinite(value)) {
    return 72
  }

  return declared.endsWith('rem')
    ? value * (Number.parseFloat(rootStyle.fontSize) || 16)
    : value
}
