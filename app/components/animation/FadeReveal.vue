<template>
  <div ref="root">
    <slot />
  </div>
</template>

<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const { gsap, createContext, prefersReducedMotion } = useGsap()

onMounted(() => {
  if (!root.value || !gsap || prefersReducedMotion.value) {
    return
  }

  createContext(() => {
    gsap.from(root.value, {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 82%',
        once: true
      }
    })
  }, root.value)
})
</script>
