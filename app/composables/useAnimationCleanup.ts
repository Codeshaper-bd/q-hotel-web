type CleanupCallback = () => void

export const useAnimationCleanup = () => {
  const callbacks: CleanupCallback[] = []

  const addCleanup = (callback: CleanupCallback) => {
    callbacks.push(callback)
  }

  const cleanup = () => {
    callbacks.splice(0).forEach((callback) => callback())
  }

  onBeforeUnmount(cleanup)

  return {
    addCleanup,
    cleanup
  }
}
