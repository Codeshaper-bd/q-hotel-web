<template>
  <!--
    Room details popup: a native <dialog> (same technique as BaseLightbox) so
    showModal() gives a real focus trap, an inert background, and Esc-to-close
    for free. A photo gallery leads a grid of amenity categories grouped the
    way the Figma "Room Details Pop-up" groups them — most categories are
    standard across every room type; only Room Overview, Room Features, and
    Beds and Bedding are derived from this specific room's own data.
  -->
  <dialog
    ref="dialogRef"
    class="room-details-dialog"
    :aria-labelledby="titleId"
    @close="emit('update:open', false)"
    @click="handleBackdropClick"
  >
    <div class="room-details-panel bg-paper">
      <div class="flex items-center justify-between gap-6 px-6 pt-6 sm:px-8 sm:pt-8">
        <p :id="titleId" class="text-xl text-ink">
          {{ room.bedType }}, Guest Room
        </p>
        <button
          ref="closeButtonRef"
          type="button"
          class="flex h-8 w-8 shrink-0 items-center justify-center bg-champagne/25 text-ink transition-colors duration-fast hover:bg-champagne/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
          aria-label="Close room details"
          @click="close"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div class="relative mt-6 aspect-[12/5] w-full overflow-hidden bg-line/40 sm:mx-8 sm:w-[calc(100%-4rem)]">
        <Transition name="room-details-image">
          <img
            :key="selectedImage.src"
            :src="selectedImage.src"
            :alt="selectedImage.alt"
            class="absolute inset-0 h-full w-full object-cover"
            decoding="async"
          >
        </Transition>

        <template v-if="room.images.length > 1">
          <button
            type="button"
            class="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-paper/90 text-ink transition-colors duration-fast hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            aria-label="Previous photo"
            @click="step(-1)"
          >
            <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 3L5 8l5 5" />
            </svg>
          </button>
          <button
            type="button"
            class="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-paper/90 text-ink transition-colors duration-fast hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            aria-label="Next photo"
            @click="step(1)"
          >
            <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5" />
            </svg>
          </button>

          <div class="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            <button
              v-for="(image, imageIndex) in room.images"
              :key="image.src"
              type="button"
              :class="[
                'h-1.5 transition-[width,background-color] duration-fast',
                imageIndex === selectedImageIndex ? 'w-7 bg-champagne' : 'w-1.5 bg-paper/70 hover:bg-paper',
              ]"
              :aria-label="`Show photo ${imageIndex + 1} of ${room.name}`"
              :aria-pressed="imageIndex === selectedImageIndex"
              @click="selectedImageIndex = imageIndex"
            />
          </div>
        </template>
      </div>

      <div class="px-6 py-8 sm:px-8">
        <div v-for="(row, rowIndex) in amenityRows" :key="rowIndex" :class="rowIndex > 0 ? 'mt-8 border-t border-line pt-8' : ''">
          <div :class="row.length === 1 ? 'grid grid-cols-1' : 'grid grid-cols-1 gap-8 sm:grid-cols-3'">
            <div v-for="category in row" :key="category.title">
              <p class="flex items-center gap-2 text-base text-ink">
                <svg class="h-4 w-4 shrink-0 text-ink/60" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path v-for="(iconPath, pathIndex) in category.iconPaths" :key="pathIndex" :d="iconPath" />
                </svg>
                {{ category.title }}
              </p>
              <ul class="mt-3 space-y-3 text-sm leading-5 text-ink/65">
                <li v-for="line in category.lines" :key="line">{{ line }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type Lenis from 'lenis'
import type { Room } from '~/types/room'

const props = defineProps<{
  room: Room
  /** Controls the popup (v-model:open) */
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const selectedImageIndex = ref(0)
const titleId = useId()

const selectedImage = computed(() =>
  props.room.images[selectedImageIndex.value] ?? (props.room.images[0] as Room['images'][number]))

function step(direction: number) {
  const total = props.room.images.length
  if (total === 0) {
    return
  }
  selectedImageIndex.value = (selectedImageIndex.value + direction + total) % total
}

function close() {
  emit('update:open', false)
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === dialogRef.value) {
    close()
  }
}

const nuxtApp = useNuxtApp()
const lenis = nuxtApp.$lenis as Lenis | undefined

/** Freeze the page behind the overlay, same as BaseLightbox */
function setPageFrozen(frozen: boolean) {
  if (frozen) {
    lenis?.stop()
    document.documentElement.classList.add('overflow-hidden')
    return
  }

  lenis?.start()
  document.documentElement.classList.remove('overflow-hidden')
}

watch(() => props.open, async (isOpen) => {
  const dialog = dialogRef.value
  if (!dialog) {
    return
  }

  if (!isOpen) {
    if (dialog.open) {
      dialog.close()
    }
    setPageFrozen(false)
    return
  }

  selectedImageIndex.value = 0
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

/** Icon line-paths, shared across every room's popup */
const ICONS = {
  overview: ['M2 7.5L8 2l6 5.5M3.5 6.5V13a.5.5 0 00.5.5h3v-4h2v4h3a.5.5 0 00.5-.5V6.5'],
  bell: ['M8 2a3 3 0 00-3 3v1.9c0 .6-.22 1.16-.62 1.6L3 10.5h10L11.62 8.5A2.4 2.4 0 0111 6.9V5a3 3 0 00-3-3z', 'M6.5 12.5a1.5 1.5 0 003 0'],
  bed: ['M1.667 13.332V7.999c0-.353.14-.692.39-.942.25-.25.59-.39.943-.39h10.666c.354 0 .693.14.943.39.25.25.39.589.39.942v5.333', 'M2.667 6.666V4.332c0-.353.14-.693.39-.943.25-.25.59-.39.943-.39h8c.354 0 .693.14.943.39.25.25.39.59.39.943v2.334', 'M8 2.666v4', 'M1.334 12h13.333'],
  bath: ['M2 9.5h12v1.5a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 012 11V9.5z', 'M3 9.5V4.7c0-.9.6-1.7 1.5-1.7.5 0 1 .3 1.2.8', 'M4.5 5.5h.01'],
  sofa: ['M3 8.5V6a1.5 1.5 0 013 0v2M10 8.5V6a1.5 1.5 0 013 0v2', 'M2.5 8.5h11v3.5a1 1 0 01-1 1H3.5a1 1 0 01-1-1V8.5z', 'M3.5 13v1M12.5 13v1'],
  dinner: ['M6 3v4.5M8.5 3v4.5M6 7.5a1.2 1.2 0 002.5 0M7.25 8.7V14', 'M12.5 3c-1.4 1.9-1.4 4.6 0 6.5V14'],
  wifi: ['M3.2 7a8 8 0 019.6 0', 'M5.4 9.4a5 5 0 015.2 0', 'M7.6 11.7a2 2 0 012.8 0', 'M8 13.6h.01'],
  multimedia: ['M2 3.5h12v7.5H2z', 'M5.5 13.5h5M8 11v2.5', 'M2 5.5h12'],
  wheelchair: ['M8 3a1.3 1.3 0 100-2.6A1.3 1.3 0 008 3z', 'M8 5v3.5l3 3', 'M8 8.5H5', 'M5.5 8.5A2.5 2.5 0 108 11'],
  hotel: ['M3 14V5l5-2.5L13 5v9', 'M6 14V9h4v5', 'M6 6h.01M10 6h.01M6 8h.01M10 8h.01'],
  car: ['M4.5 4.5h15v15h-15z', 'M10 16.5V8h2.75a2.25 2.25 0 010 4.5H10'],
  service: ['M2 10.5h12', 'M4 10.5V7a1 1 0 011-1h6a1 1 0 011 1v3.5', 'M7 6V4.5a1 1 0 012 0V6'],
} as const

interface AmenityCategory {
  title: string
  iconPaths: readonly string[]
  lines: string[]
}

/** Mostly hotel-wide standard amenities; only the three room-specific
 *  categories below draw from this room's own fields */
const amenityRows = computed<AmenityCategory[][]>(() => [
  [
    { title: 'Room Overview', iconPaths: ICONS.overview, lines: [props.room.name] },
    { title: 'Special Benefits', iconPaths: ICONS.bell, lines: ['High-speed Wi-Fi'] },
    {
      title: 'Beds and Bedding',
      iconPaths: ICONS.bed,
      lines: [`Maximum occupancy: ${props.room.maxOccupancy}`, props.room.bedType, 'Cribs available on request', 'Duvet'],
    },
  ],
  [
    {
      title: 'Room Features',
      iconPaths: ICONS.overview,
      lines: [`${props.room.areaSqFt} Sq Ft Room`, 'Air-conditioned', 'Individual climate control', 'This room is non-smoking', 'Windows, floor-to-ceiling'],
    },
    {
      title: 'Bath and Bathroom Features',
      iconPaths: ICONS.bath,
      lines: ['Separate bathtub and shower', 'Lighted makeup mirror', 'Hair dryer', 'Robe', 'Slippers'],
    },
    {
      title: 'Furniture and Furnishings',
      iconPaths: ICONS.sofa,
      lines: ['Alarm clock', 'Safe, in room, for a fee', 'Desk, writing/work, electrical outlet', 'Iron and ironing board'],
    },
  ],
  [
    {
      title: 'Food & Beverages',
      iconPaths: ICONS.dinner,
      lines: ['Room Service, 24-hour', 'Bottled water, complimentary', 'Coffee/tea maker', 'Instant hot water'],
    },
    {
      title: 'Internet and Phones',
      iconPaths: ICONS.wifi,
      lines: ['Phones: 2', 'Cordless phone, and speaker phone', 'Wireless internet, complimentary', 'Wi-Fi is always free for Q Hotel members'],
    },
    {
      title: 'Entertainment',
      iconPaths: ICONS.multimedia,
      lines: ['Plug-in, high-tech room', 'Cable/satellite', 'International cable/satellite', 'CNN, ESPN, and HBO'],
    },
  ],
  [
    {
      title: 'Accessible Room Features',
      iconPaths: ICONS.wheelchair,
      lines: ['This room type does not offer mobility accessible rooms with tubs', 'This room type does not offer accessible rooms with roll-in showers', 'This room type does not offer hearing accessible rooms'],
    },
  ],
  [
    { title: 'Hotel Highlights', iconPaths: ICONS.hotel, lines: ['This hotel has a smoke-free policy', 'Hotel was built in 2014'] },
    {
      title: 'Parking & Transportation',
      iconPaths: ICONS.car,
      lines: ['Registered hotel guests can park their cars during their stay at the designated parking areas through registration.', 'Complimentary on-site parking'],
    },
    { title: 'Hotel Services & Amenities', iconPaths: ICONS.service, lines: ['Fitness center on-site', 'Housekeeping service daily', 'Full business center, onsite'] },
  ],
])
</script>

<style scoped>
.room-details-dialog {
  background: transparent;
  border: 0;
  max-height: 100dvh;
  max-width: 100vw;
  padding: 0;
}

.room-details-dialog[open] {
  display: flex;
}

.room-details-dialog::backdrop {
  backdrop-filter: blur(6px);
  background: rgb(var(--color-night) / 0.75);
}

.room-details-panel {
  max-height: 92dvh;
  overflow-y: auto;
  width: min(75rem, 94vw);
}

.room-details-image-enter-active,
.room-details-image-leave-active {
  transition: opacity var(--duration-normal) var(--ease-premium);
}

.room-details-image-enter-from,
.room-details-image-leave-to {
  opacity: 0;
}
</style>
