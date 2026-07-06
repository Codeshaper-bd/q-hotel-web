<template>
  <!--
    Rooms and Suites showcase: room-type tabs filter one featured panel —
    photography left, dark details card right (rate, description, key specs,
    More Details). Content is a typed static Room[] (CMS-ready); switching
    tabs crossfades the panel on transform/opacity only.
  -->
  <BaseSection id="rooms" labelled-by="rooms-title" tone="paper" spacing="lg" container-size="xl">
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Select Your Room</BaseKicker>
        <h2 id="rooms-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Rooms and Suites
        </h2>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div
        role="tablist"
        aria-label="Room types"
        class="mt-9 flex flex-wrap justify-center gap-2.5"
        @keydown="handleTablistKeydown"
      >
        <button
          v-for="room in rooms"
          :id="`room-tab-${room.id}`"
          :key="room.id"
          type="button"
          role="tab"
          :aria-selected="activeRoomId === room.id"
          :aria-controls="`room-panel-${room.id}`"
          :tabindex="activeRoomId === room.id ? 0 : -1"
          :class="[
            'border px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-fast',
            activeRoomId === room.id
              ? 'border-copper bg-copper/10 text-copper'
              : 'border-line text-ink/60 hover:border-ink/40 hover:text-ink',
          ]"
          @click="handleTabClick(room.id)"
        >
          {{ room.tabLabel }}
        </button>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div
        :id="`room-panel-${activeRoom.id}`"
        ref="panelRef"
        role="tabpanel"
        :aria-labelledby="`room-tab-${activeRoom.id}`"
        tabindex="0"
        class="mt-10"
        @mouseenter="pauseAutoAdvance"
        @mouseleave="resumeAutoAdvance"
      >
      <Transition name="room-panel" mode="out-in">
        <div :key="activeRoom.id" class="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
          <!-- Photography with quiet dot navigation -->
          <div class="room-panel-media relative">
            <div class="relative aspect-[4/3] overflow-hidden bg-line/40">
              <Transition name="room-image">
                <BaseImage
                  :key="activeImage.src"
                  :src="activeImage.src"
                  :alt="activeImage.alt"
                  :width="1600"
                  :height="1200"
                  sizes="xs:100vw sm:100vw md:100vw lg:60vw xl:50vw"
                  class="absolute inset-0 h-full w-full object-cover"
                />
              </Transition>
            </div>
            <div
              v-if="activeRoom.images.length > 1"
              class="absolute inset-x-0 bottom-4 flex justify-center gap-2"
            >
              <button
                v-for="(image, imageIndex) in activeRoom.images"
                :key="image.src"
                type="button"
                :class="[
                  'h-2.5 w-2.5 rounded-full border border-night/30 transition-colors duration-fast',
                  imageIndex === activeImageIndex ? 'bg-champagne' : 'bg-paper/70 hover:bg-paper',
                ]"
                :aria-label="`Show photo ${imageIndex + 1} of ${activeRoom.name}`"
                :aria-pressed="imageIndex === activeImageIndex"
                @click="handleImageSelect(imageIndex)"
              />
            </div>
          </div>

          <!-- Details card -->
          <article class="room-panel-card flex flex-col bg-ink p-7 text-paper sm:p-9">
            <span class="self-start border border-champagne/50 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-champagne">
              ${{ activeRoom.nightlyRateUsd }} / Night
            </span>

            <h3 class="mt-5 font-display text-3xl leading-tight sm:text-4xl">
              {{ activeRoom.name }}
            </h3>

            <p class="mt-4 text-sm leading-7 text-paper/70">
              {{ activeRoom.description }}
            </p>

            <ul class="mt-7 space-y-3.5 border-t border-paper/15 pt-7 text-sm text-paper/80">
              <li class="flex items-center gap-3">
                <svg class="h-4 w-4 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                {{ activeRoom.areaSqFt }} Sq Ft Room
              </li>
              <li class="flex items-center gap-3">
                <svg class="h-4 w-4 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                {{ activeRoom.maxOccupancy }} {{ activeRoom.maxOccupancy === 1 ? 'Person' : 'Persons' }}
              </li>
              <li class="flex items-center gap-3">
                <svg class="h-4 w-4 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 18h20" />
                </svg>
                {{ activeRoom.bedType }}
              </li>
            </ul>

            <!-- Rooms detail routes arrive with the reservations flow; the
                 CTA hands off to the reserve entry point until then -->
            <div class="mt-8 lg:mt-auto lg:pt-8">
              <NuxtLink
                to="#reserve"
                class="group inline-flex items-stretch border border-champagne/60 text-paper transition-colors duration-fast hover:border-champagne hover:bg-champagne/10"
              >
                <span class="flex items-center px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
                  More Details
                </span>
                <span
                  class="flex items-center bg-champagne px-3.5 text-night transition-colors duration-fast group-hover:bg-gold"
                  aria-hidden="true"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </Transition>
      </div>
    </FadeReveal>
  </BaseSection>
</template>

<script setup lang="ts">
import type { Room } from '~/types/room'

/** Static showcase content (CMS-ready shape); live rates come with the PMS */
const rooms: Room[] = [
  {
    id: 'standard-double',
    tabLabel: 'Standard Double',
    name: 'Standard Double Room',
    description: 'A calm, thoughtfully appointed double room with warm wood tones and everything a short city stay needs — rest, work, and an unhurried morning.',
    nightlyRateUsd: 140,
    areaSqFt: 220,
    maxOccupancy: 2,
    bedType: '1 Double Bed',
    images: [
      { src: '/images/rooms/standard-double.jpg', alt: 'Standard Double Room with a plush double bed, walnut headboard, and warm brass lamps' },
    ],
  },
  {
    id: 'deluxe-twin',
    tabLabel: 'Deluxe Twin',
    name: 'Deluxe Twin Room',
    description: 'Our Deluxe Twin Room offers spacious comfort with two premium beds, contemporary furnishings, and thoughtfully designed corners for work and rest.',
    nightlyRateUsd: 180,
    areaSqFt: 260,
    maxOccupancy: 2,
    bedType: '2 Single Beds',
    images: [
      { src: '/images/rooms/deluxe-twin-1.jpg', alt: 'Deluxe Twin Room with two premium single beds against a walnut headboard wall' },
      { src: '/images/rooms/deluxe-twin-2.jpg', alt: 'Deluxe Twin Room seen from the window, with writing desk and leather armchair' },
    ],
  },
  {
    id: 'deluxe-double',
    tabLabel: 'Deluxe Double',
    name: 'Deluxe Double Room',
    description: 'A generous king-bedded room layered in ivory and soft beige, with a reading corner and dusk-lit windows made for slow evenings.',
    nightlyRateUsd: 210,
    areaSqFt: 320,
    maxOccupancy: 3,
    bedType: '1 King Bed',
    images: [
      { src: '/images/rooms/deluxe-double.jpg', alt: 'Deluxe Double Room with a king bed, cove-lit walnut headboard, and lounge chair' },
    ],
  },
  {
    id: 'presidential-suite',
    tabLabel: 'Presidential Suite',
    name: 'Presidential Suite',
    description: 'The house signature: a palatial living room under a crystal chandelier, silk-draped windows, and a private bedroom wing for stays that should feel like occasions.',
    nightlyRateUsd: 520,
    areaSqFt: 1200,
    maxOccupancy: 6,
    bedType: '2 King Beds',
    images: [
      { src: '/images/rooms/presidential-suite.jpg', alt: 'Presidential Suite living room with chandelier, ivory sofas, and marble floor' },
    ],
  },
  {
    id: 'executive-suite',
    tabLabel: 'Executive Suite',
    name: 'Executive Suite',
    description: 'Business-first luxury: a king bedroom beside a proper workspace with a city-view desk, tuned for long stays and productive evenings.',
    nightlyRateUsd: 380,
    areaSqFt: 650,
    maxOccupancy: 4,
    bedType: '1 King Bed',
    images: [
      { src: '/images/rooms/executive-suite.jpg', alt: 'Executive Suite with king bed and a city-view workspace behind a walnut partition' },
    ],
  },
]

const activeRoomId = ref(rooms[0]?.id ?? '')
const activeImageIndex = ref(0)
const panelRef = ref<HTMLElement | null>(null)

const { prefersReducedMotion } = useReducedMotion()
const { addCleanup } = useAnimationCleanup()

/**
 * Auto-showcase: rooms rotate on their own until the guest interacts —
 * then the guest owns the tabs. Pauses on hover and while offscreen;
 * never runs under reduced motion.
 */
const AUTO_ADVANCE_MS = 5000
let autoAdvanceTimer = 0
let hasUserTakenOver = false
let isPanelInView = false

function advanceToNextRoom() {
  const currentIndex = rooms.findIndex(room => room.id === activeRoomId.value)
  const nextRoom = rooms[(currentIndex + 1) % rooms.length]
  if (nextRoom) {
    selectRoom(nextRoom.id)
  }
}

function pauseAutoAdvance() {
  window.clearInterval(autoAdvanceTimer)
  autoAdvanceTimer = 0
}

function resumeAutoAdvance() {
  if (hasUserTakenOver || prefersReducedMotion.value || !isPanelInView || autoAdvanceTimer !== 0) {
    return
  }
  autoAdvanceTimer = window.setInterval(advanceToNextRoom, AUTO_ADVANCE_MS)
}

function stopAutoAdvance() {
  hasUserTakenOver = true
  pauseAutoAdvance()
}

onMounted(() => {
  if (prefersReducedMotion.value) {
    return
  }
  const panel = panelRef.value
  if (panel && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      isPanelInView = Boolean(entry?.isIntersecting)
      if (isPanelInView) {
        resumeAutoAdvance()
      }
      else {
        pauseAutoAdvance()
      }
    }, { threshold: 0.25 })
    observer.observe(panel)
    addCleanup(() => observer.disconnect())
  }
  else {
    isPanelInView = true
    resumeAutoAdvance()
  }
  addCleanup(() => window.clearInterval(autoAdvanceTimer))
})

function handleTabClick(roomId: string) {
  stopAutoAdvance()
  selectRoom(roomId)
}

function handleImageSelect(imageIndex: number) {
  stopAutoAdvance()
  activeImageIndex.value = imageIndex
}

const activeRoom = computed<Room>(() =>
  rooms.find(room => room.id === activeRoomId.value) ?? (rooms[0] as Room),
)

const activeImage = computed(() =>
  activeRoom.value.images[activeImageIndex.value] ?? (activeRoom.value.images[0] as Room['images'][number]),
)

function selectRoom(roomId: string) {
  activeRoomId.value = roomId
  activeImageIndex.value = 0
}

/** Roving-focus keyboard support for the tablist (Left/Right/Home/End) */
function handleTablistKeydown(event: KeyboardEvent) {
  const handledKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
  if (!handledKeys.includes(event.key)) {
    return
  }
  event.preventDefault()
  stopAutoAdvance()

  const currentIndex = rooms.findIndex(room => room.id === activeRoomId.value)
  let nextIndex = currentIndex
  if (event.key === 'ArrowLeft') {
    nextIndex = (currentIndex - 1 + rooms.length) % rooms.length
  }
  else if (event.key === 'ArrowRight') {
    nextIndex = (currentIndex + 1) % rooms.length
  }
  else if (event.key === 'Home') {
    nextIndex = 0
  }
  else {
    nextIndex = rooms.length - 1
  }

  const nextRoom = rooms[nextIndex]
  if (nextRoom) {
    selectRoom(nextRoom.id)
    nextTick(() => {
      document.getElementById(`room-tab-${nextRoom.id}`)?.focus()
    })
  }
}
</script>

<style scoped>
/* Panel swap: photography drifts in from the left, the details card follows
   from the right a beat later — transform/opacity only, collapsed by the
   global reduced-motion rules */
.room-panel-enter-active,
.room-panel-leave-active {
  transition: opacity var(--duration-normal) var(--ease-premium);
}

.room-panel-enter-active .room-panel-media,
.room-panel-enter-active .room-panel-card {
  transition:
    opacity var(--duration-slow) var(--ease-premium),
    transform var(--duration-slow) var(--ease-premium);
}

.room-panel-enter-active .room-panel-card {
  transition-delay: 120ms;
}

.room-panel-enter-from .room-panel-media {
  opacity: 0;
  transform: translateX(-1.5rem);
}

.room-panel-enter-from .room-panel-card {
  opacity: 0;
  transform: translateX(1.5rem);
}

.room-panel-leave-to {
  opacity: 0;
}

/* Carousel image crossfade inside the fixed-aspect frame */
.room-image-enter-active,
.room-image-leave-active {
  transition: opacity var(--duration-normal) var(--ease-premium);
}

.room-image-enter-from,
.room-image-leave-to {
  opacity: 0;
}
</style>
