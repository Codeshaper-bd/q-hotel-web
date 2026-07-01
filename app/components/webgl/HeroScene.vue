<template>
  <div ref="host" class="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-ink" aria-hidden="true">
    <canvas ref="canvas" class="h-full w-full" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'

const host = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const { prefersReducedMotion } = useReducedMotion()

let renderer: THREE.WebGLRenderer | undefined
let scene: THREE.Scene | undefined
let camera: THREE.PerspectiveCamera | undefined
let frameId = 0
let observer: IntersectionObserver | undefined
let isVisible = true

const disposeMaterial = (material: THREE.Material | THREE.Material[]) => {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose())
    return
  }

  material.dispose()
}

const render = () => {
  if (!renderer || !scene || !camera || !isVisible) {
    return
  }

  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.rotation.y += prefersReducedMotion.value ? 0 : 0.0025
      object.rotation.x += prefersReducedMotion.value ? 0 : 0.001
    }
  })

  renderer.render(scene, camera)
  frameId = window.requestAnimationFrame(render)
}

const resize = () => {
  if (!host.value || !renderer || !camera) {
    return
  }

  const { width, height } = host.value.getBoundingClientRect()
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
}

onMounted(() => {
  if (!host.value || !canvas.value) {
    return
  }

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
  camera.position.set(0, 0, 7)

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true,
    powerPreference: 'low-power'
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  const geometry = new THREE.IcosahedronGeometry(1.9, 1)
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#a4663e'),
    roughness: 0.72,
    metalness: 0.18,
    flatShading: true
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const ambient = new THREE.AmbientLight('#f7f2ea', 1.9)
  const key = new THREE.DirectionalLight('#ffffff', 2.1)
  key.position.set(3, 4, 5)
  scene.add(ambient, key)

  resize()
  window.addEventListener('resize', resize, { passive: true })

  observer = new IntersectionObserver(([entry]) => {
    isVisible = Boolean(entry?.isIntersecting)

    if (isVisible && !frameId) {
      render()
    }

    if (!isVisible && frameId) {
      window.cancelAnimationFrame(frameId)
      frameId = 0
    }
  }, { threshold: 0.05 })
  observer.observe(host.value)

  render()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  observer?.disconnect()

  if (frameId) {
    window.cancelAnimationFrame(frameId)
  }

  scene?.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose()
      disposeMaterial(object.material)
    }
  })

  renderer?.dispose()
})
</script>
