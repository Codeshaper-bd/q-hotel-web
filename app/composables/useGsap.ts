import type gsapType from 'gsap'

type GsapContext = ReturnType<typeof gsapType.context>

export const useGsap = () => {
  const nuxtApp = useNuxtApp()
  const { prefersReducedMotion } = useReducedMotion()
  const contexts: GsapContext[] = []

  const gsap = nuxtApp.$gsap as typeof gsapType | undefined

  const createContext = (
    setup: gsap.ContextFunc,
    scope?: string | object | Element
  ) => {
    if (!gsap || prefersReducedMotion.value) {
      return undefined
    }

    const context = gsap.context(setup, scope)
    contexts.push(context)
    return context
  }

  onBeforeUnmount(() => {
    contexts.splice(0).forEach((context) => context.revert())
  })

  return {
    gsap,
    createContext,
    prefersReducedMotion
  }
}
