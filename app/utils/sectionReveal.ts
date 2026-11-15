/**
 * Shared "the title has landed" signal between a section's word-reveal title
 * (useWordReveal) and the content that should follow it (FadeReveal), so a
 * section reads as one sequence — title first, content right behind it —
 * instead of a title animating over content that is already just sitting there.
 *
 * Keyed by the title's enclosing <section>. Content that sits in a section
 * with no registered title (or under reduced motion, where titles never
 * register) is not held back at all.
 */

interface TitleSignal {
  isRevealed: boolean
  resolve: () => void
  promise: Promise<void>
}

const signals = new WeakMap<Element, TitleSignal>()

/** Longest content will ever wait for a title, e.g. when the title was scrolled past */
const MAX_WAIT_MS = 1000

/** Called by a title when it is armed; returns the callback to fire as it lands */
export function registerSectionTitle(title: HTMLElement): (() => void) | undefined {
  const section = title.closest('section')
  if (!section) {
    return undefined
  }

  let resolve: () => void = () => {}
  const promise = new Promise<void>((done) => {
    resolve = done
  })
  const signal: TitleSignal = { isRevealed: false, resolve, promise }
  signals.set(section, signal)

  return () => {
    signal.isRevealed = true
    signal.resolve()
  }
}

/** Resolves once the section's title has (mostly) landed, or after MAX_WAIT_MS */
export function whenSectionTitleRevealed(content: Element): Promise<void> {
  const section = content.closest('section')
  const signal = section ? signals.get(section) : undefined

  if (!signal || signal.isRevealed) {
    return Promise.resolve()
  }

  return new Promise<void>((done) => {
    const timer = setTimeout(done, MAX_WAIT_MS)
    void signal.promise.then(() => {
      clearTimeout(timer)
      done()
    })
  })
}
