export const useReducedMotion = () => {
  const prefersReducedMotion = useState('prefers-reduced-motion', () => false)
  let mediaQuery: MediaQueryList | undefined

  const updatePreference = () => {
    prefersReducedMotion.value = Boolean(mediaQuery?.matches)
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
  })

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', updatePreference)
  })

  return {
    prefersReducedMotion: readonly(prefersReducedMotion)
  }
}
