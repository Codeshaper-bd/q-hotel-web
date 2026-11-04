/**
 * Splits an element's text into word spans so each word can be animated on
 * its own. Words get an overflow-hidden mask (the word slides up through its
 * own window) when `masked` is true; otherwise they are plain spans.
 *
 * Works node by node, so `<br>` line breaks survive and no words are glued
 * together. Text content is preserved for SEO and screen readers.
 */
export function splitIntoWords(element: HTMLElement, masked: boolean): HTMLElement[] {
  const sourceNodes = Array.from(element.childNodes)
  const wordElements: HTMLElement[] = []
  element.textContent = ''

  sourceNodes.forEach((node) => {
    if (node.nodeType !== Node.TEXT_NODE) {
      element.appendChild(node)
      return
    }

    const parts = (node.textContent ?? '').split(/(\s+)/)
    parts.forEach((part) => {
      if (part === '') {
        return
      }
      if (/^\s+$/.test(part)) {
        element.appendChild(document.createTextNode(' '))
        return
      }

      // Always `inline-block` — transforms are ignored on plain inline
      // elements, so every animated word must be transformable.
      const inner = document.createElement('span')
      inner.className = 'inline-block'
      inner.textContent = part

      if (masked) {
        const mask = document.createElement('span')
        // Bottom padding (cancelled by the negative margin) keeps descenders
        // from being clipped by the mask
        mask.className = 'inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]'
        mask.appendChild(inner)
        element.appendChild(mask)
      }
      else {
        element.appendChild(inner)
      }

      wordElements.push(inner)
    })
  })

  return wordElements
}
