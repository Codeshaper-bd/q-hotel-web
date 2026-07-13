<template>
  <!--
    Image lightbox built on the native <dialog>: `showModal()` gives a real
    focus trap, an inert background, and Esc-to-close for free, so none of that
    has to be hand-rolled. Lenis is stopped while it is open, otherwise the page
    behind the overlay keeps smooth-scrolling under the wheel.
  -->
  <dialog
    ref="dialogRef"
    class="base-lightbox"
    :aria-label="label"
    @close="emit('update:index', null)"
    @click="handleBackdropClick"
    @keydown="handleKeydown"
  >
    <div v-if="activeImage" class="base-lightbox-panel">
      <div class="flex items-center justify-between gap-6 text-paper">
        <p class="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-paper/70">
          {{ counterLabel }}
        </p>

        <button
          ref="closeButtonRef"
          type="button"
          class="flex h-11 w-11 items-center justify-center border border-paper/30 text-paper transition-colors duration-fast hover:border-champagne hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          aria-label="Close image viewer"
          @click="close"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <figure class="mt-4 flex min-h-0 flex-1 flex-col">
        <!--
          The viewer shows the original asset, not a responsive variant. The
          photographs differ in both size and aspect ratio, so one declared
          width/height would force them all through a single invented ratio and
          ask the image pipeline to upscale the smaller ones. A plain <img>
          keeps each photograph's own proportions at its true resolution — and a
          zoom view is user-triggered, so it costs nothing on first paint.
        -->
        <img
          :key="activeImage.src"
          :src="activeImage.src"
          :alt="activeImage.alt"
          class="base-lightbox-image"
          decoding="async"
        >
        <figcaption class="mt-4 text-center text-sm leading-6 text-paper/75">
          {{ activeImage.alt }}
        </figcaption>
      </figure>

      <div v-if="images.length > 1" class="mt-5 flex items-center justify-center gap-6">
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center border border-paper/30 text-paper transition-colors duration-fast hover:border-champagne hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          aria-label="Previous image"
          @click="step(-1)"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4m0 0l6-6m-6 6l6 6" />
          </svg>
        </button>

        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center border border-paper/30 text-paper transition-colors duration-fast hover:border-champagne hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          aria-label="Next image"
          @click="step(1)"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
          </svg>
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type Lenis from 'lenis'
import type { ImageAsset } from '~/types/media'

const props = withDefaults(defineProps<{
  images: ImageAsset[]
  /** Index of the open image; `null` closes the viewer */
  index: number | null
  label?: string
}>(), {
  label: 'Image viewer',
})

const emit = defineEmits<{
  'update:index': [value: number | null]
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)

const nuxtApp = useNuxtApp()
const lenis = nuxtApp.$lenis as Lenis | undefined

const activeImage = computed(() => (
  props.index === null ? undefined : props.images[props.index]
))

const counterLabel = computed(() => {
  if (props.index === null) {
    return ''
  }

  const current = String(props.index + 1).padStart(2, '0')
  const total = String(props.images.length).padStart(2, '0')
  return `${current} — ${total}`
})

function close() {
  emit('update:index', null)
}

/** Wraps around, so the arrows never dead-end */
function step(direction: number) {
  if (props.index === null || props.images.length === 0) {
    return
  }

  const next = (props.index + direction + props.images.length) % props.images.length
  emit('update:index', next)
}

/** A click that lands on the dialog itself is a click on the backdrop */
function handleBackdropClick(event: MouseEvent) {
  if (event.target === dialogRef.value) {
    close()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    step(-1)
  }
  else if (event.key === 'ArrowRight') {
    event.preventDefault()
    step(1)
  }
}

/** Freeze the page behind the overlay: Lenis keeps smoothing wheel input
 *  otherwise, and native scroll still runs for reduced-motion visitors */
function setPageFrozen(frozen: boolean) {
  if (frozen) {
    lenis?.stop()
    document.documentElement.classList.add('overflow-hidden')
    return
  }

  lenis?.start()
  document.documentElement.classList.remove('overflow-hidden')
}

watch(() => props.index, async (index) => {
  const dialog = dialogRef.value
  if (!dialog) {
    return
  }

  if (index === null) {
    if (dialog.open) {
      dialog.close()
    }
    setPageFrozen(false)
    return
  }

  if (!dialog.open) {
    dialog.showModal()
    setPageFrozen(true)
  }

  await nextTick()
  closeButtonRef.value?.focus()
})

onBeforeUnmount(() => {
  setPageFrozen(false)
})
</script>

<style scoped>
.base-lightbox {
  background: transparent;
  border: 0;
  height: 100dvh;
  max-height: 100dvh;
  max-width: 100vw;
  padding: 0;
  width: 100vw;
}

.base-lightbox[open] {
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-lightbox::backdrop {
  backdrop-filter: blur(6px);
  background: rgb(var(--color-night) / 0.92);
}

.base-lightbox-panel {
  display: flex;
  flex-direction: column;
  max-height: 92dvh;
  padding: 1.5rem;
  width: min(56rem, 92vw);
}

/* Fit the whole frame rather than cropping it: a lightbox exists to show the
   photograph in full, whatever shape it happens to be */
.base-lightbox-image {
  margin-inline: auto;
  max-height: 62dvh;
  max-width: 100%;
  object-fit: contain;
}
</style>
