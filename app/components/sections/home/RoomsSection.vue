<template>
  <!--
    Rooms and Suites showcase: scroll-pinned stacked room panels on desktop,
    with a readable vertical flow fallback for mobile and reduced motion.
  -->
  <BaseSection id="rooms" labelled-by="rooms-title" tone="paper" spacing="lg" container-size="xl">
    <div ref="sectionRef">
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
              'border px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-fast',
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

      <div
        ref="stackRef"
        class="rooms-stack mt-10 lg:mt-8"
      >
        <div ref="trackRef" class="rooms-track">
          <article
            v-for="(room, roomIndex) in rooms"
            :id="`room-panel-${room.id}`"
            :key="room.id"
            :data-room-card="roomIndex"
            role="tabpanel"
            :aria-labelledby="`room-tab-${room.id}`"
            :aria-hidden="activeRoomId === room.id ? undefined : 'true'"
            :tabindex="activeRoomId === room.id ? 0 : -1"
            class="room-showcase-card relative overflow-hidden bg-ink"
          >
            <!-- Full-bleed photography with quiet dot navigation -->
            <div data-room-media class="relative aspect-[4/3] overflow-hidden bg-line/40 motion-safe:lg:absolute motion-safe:lg:inset-0 motion-safe:lg:aspect-auto">
              <Transition name="room-image">
                <BaseImage
                  :key="selectedImage(room).src"
                  :src="selectedImage(room).src"
                  :alt="selectedImage(room).alt"
                  :width="1600"
                  :height="1200"
                  sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1280px"
                  class="absolute inset-0 h-full w-full object-cover"
                />
              </Transition>
              <div
                v-if="room.images.length > 1"
                class="absolute inset-x-0 bottom-4 flex justify-center gap-1 lg:inset-x-auto lg:bottom-8 lg:left-10 lg:justify-start"
              >
                <button
                  v-for="(image, imageIndex) in room.images"
                  :key="image.src"
                  type="button"
                  :class="[
                    'h-2 transition-[width,background-color] duration-fast',
                    imageIndex === selectedImageIndex(room.id) ? 'w-9 bg-copper' : 'w-2 bg-paper/80 hover:bg-paper',
                  ]"
                  :aria-label="`Show photo ${imageIndex + 1} of ${room.name}`"
                  :aria-pressed="imageIndex === selectedImageIndex(room.id)"
                  :tabindex="activeRoomId === room.id ? 0 : -1"
                  @click="handleImageSelect(room.id, imageIndex)"
                />
              </div>
            </div>

            <!-- Details panel: solid below the photo on mobile, a copper-framed
                 scrim overlay on desktop (frame inset from the tinted edge,
                 matching the Figma room card). No inner scroll: the stack
                 height below is sized to fit every room's content. -->
            <div class="relative flex flex-col bg-ink p-7 text-paper sm:p-9 motion-safe:lg:absolute motion-safe:lg:inset-y-4 motion-safe:lg:right-4 motion-safe:lg:w-[27rem] motion-safe:lg:bg-night/70 motion-safe:lg:p-0 motion-safe:xl:inset-y-6 motion-safe:xl:right-6 motion-safe:xl:w-[30rem]">
              <div class="motion-safe:lg:absolute motion-safe:lg:inset-4 motion-safe:lg:flex motion-safe:lg:flex-col motion-safe:lg:border motion-safe:lg:border-copper motion-safe:lg:p-7 motion-safe:xl:inset-5 motion-safe:xl:p-8">
                <span class="self-start border border-paper/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-paper">
                  ${{ room.nightlyRateUsd }} / Night
                </span>

                <h3 class="mt-4 font-display text-3xl leading-tight sm:text-4xl">
                  {{ room.name }}
                </h3>

                <p class="mt-3 text-sm leading-7 text-paper/80">
                  {{ room.description }}
                </p>

                <ul class="mt-6 space-y-3 text-sm text-paper/80 motion-safe:lg:mt-auto motion-safe:lg:pt-6">
                  <li class="flex items-center gap-3">
                    <svg class="h-5 w-5 shrink-0 text-paper" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M13.333 10.001v1.667a1.667 1.667 0 01-1.666 1.666H7.5a.833.833 0 00-.833.834v2.5a1.667 1.667 0 001.666 1.666h8.334a1.667 1.667 0 001.666-1.666V8.335a1.667 1.667 0 00-1.666-1.667" />
                      <path d="M3.334 13.335a1.667 1.667 0 01-1.667-1.667V3.335a1.667 1.667 0 011.667-1.667h8.333a1.667 1.667 0 011.666 1.667v2.5a.833.833 0 01-.833.833H8.334a1.667 1.667 0 00-1.667 1.667v1.666" />
                    </svg>
                    {{ room.areaSqFt }} Sq Ft Room
                  </li>
                  <li class="flex items-center gap-3">
                    <svg class="h-5 w-5 shrink-0 text-paper" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M15.834 17.5v-1.667a3.333 3.333 0 00-3.334-3.333H7.5a3.333 3.333 0 00-3.334 3.333V17.5" />
                      <path d="M10 9.167a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667z" />
                    </svg>
                    {{ room.maxOccupancy }} {{ room.maxOccupancy === 1 ? 'Person' : 'Persons' }}
                  </li>
                  <li class="flex items-center gap-3">
                    <svg class="h-5 w-5 shrink-0 text-paper" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M1.667 16.665V9.999c0-.442.176-.866.488-1.179.313-.312.737-.488 1.179-.488h13.333c.442 0 .866.176 1.179.488.312.313.488.737.488 1.179v6.666" />
                      <path d="M3.333 8.332v-3.333c0-.442.176-.867.488-1.179.313-.313.737-.488 1.179-.488h10c.442 0 .866.175 1.179.488.312.312.488.737.488 1.179v3.333" />
                      <path d="M10 3.332v5" />
                      <path d="M1.667 15h16.667" />
                    </svg>
                    {{ room.bedType }}
                  </li>
                </ul>

                <!-- Rooms detail routes arrive with the reservations flow; the
                     CTA hands off to the reserve entry point until then -->
                <div class="mt-6">
                  <BaseArrowCta
                    to="#reserve"
                    variant="gold"
                    :tabindex="activeRoomId === room.id ? 0 : -1"
                  >
                    More Details
                  </BaseArrowCta>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type { Room } from '~/types/room'

/** Static showcase content (CMS-ready shape); live rates come with the PMS */
const rooms: Room[] = [
  {
    id: 'standard-double',
    tabLabel: 'Standard Double',
    name: 'Standard Double Room',
    description: 'A calm, thoughtfully appointed double room with warm wood tones and everything a short city stay needs - rest, work, and an unhurried morning.',
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
const activeImageIndexes = reactive<Record<string, number>>({})
const sectionRef = ref<HTMLElement | null>(null)
const stackRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

const { gsap, createContext, prefersReducedMotion } = useGsap()
const { addCleanup } = useAnimationCleanup()
const nuxtApp = useNuxtApp()
const ScrollTrigger = nuxtApp.$ScrollTrigger as typeof ScrollTriggerType | undefined

let roomStackTrigger: ScrollTriggerType | undefined

function selectedImageIndex(roomId: string) {
  return activeImageIndexes[roomId] ?? 0
}

function selectedImage(room: Room) {
  return room.images[selectedImageIndex(room.id)] ?? (room.images[0] as Room['images'][number])
}

function selectRoom(roomId: string) {
  activeRoomId.value = roomId
  activeImageIndexes[roomId] = selectedImageIndex(roomId)
}

function handleImageSelect(roomId: string, imageIndex: number) {
  activeRoomId.value = roomId
  activeImageIndexes[roomId] = imageIndex
}

function scrollToRoom(roomId: string) {
  if (!roomStackTrigger || prefersReducedMotion.value) {
    return
  }

  const roomIndex = rooms.findIndex(room => room.id === roomId)
  if (roomIndex < 0) {
    return
  }

  const progress = rooms.length > 1 ? roomIndex / (rooms.length - 1) : 0
  const targetY = roomStackTrigger.start + (roomStackTrigger.end - roomStackTrigger.start) * progress
  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  })
}

function handleTabClick(roomId: string) {
  selectRoom(roomId)
  scrollToRoom(roomId)
}

/** Roving-focus keyboard support for the tablist (Left/Right/Home/End) */
function handleTablistKeydown(event: KeyboardEvent) {
  const handledKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
  if (!handledKeys.includes(event.key)) {
    return
  }
  event.preventDefault()

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
    scrollToRoom(nextRoom.id)
    nextTick(() => {
      document.getElementById(`room-tab-${nextRoom.id}`)?.focus()
    })
  }
}

onMounted(async () => {
  await nextTick()

  const sectionElement = sectionRef.value
  const stackElement = stackRef.value

  if (!sectionElement || !stackElement || !gsap || !ScrollTrigger || prefersReducedMotion.value) {
    return
  }

  const mediaMatcher = gsap.matchMedia()

  mediaMatcher.add('(min-width: 1024px)', () => {
    const context = createContext(() => {
      const trackElement = trackRef.value
      const cards = gsap.utils.toArray<HTMLElement>('[data-room-card]', stackElement)

      if (!trackElement || cards.length < 2) {
        return
      }

      const slideCount = cards.length - 1

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          // Pin the whole section block (kicker, title, tabs, and card stack)
          // so the heading stays on screen while the cards slide through.
          trigger: sectionElement,
          start: 'top top+=30',
          end: () => `+=${cards.length * window.innerHeight * 0.72}`,
          pin: true,
          scrub: 0.85,
          // Always settle on a full card so a slide never rests half-cut
          snap: {
            snapTo: 1 / slideCount,
            duration: { min: 0.25, max: 0.6 },
            ease: 'power2.out',
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const activeIndex = Math.min(
              rooms.length - 1,
              Math.max(0, Math.round(self.progress * (rooms.length - 1))),
            )
            const activeRoom = rooms[activeIndex]
            if (activeRoom && activeRoomId.value !== activeRoom.id) {
              activeRoomId.value = activeRoom.id
            }
          },
        },
      })

      roomStackTrigger = timeline.scrollTrigger

      // Cinematic horizontal slide: one card width per snap step
      timeline.to(trackElement, {
        xPercent: -100 * slideCount,
        duration: slideCount,
      }, 0)

      // Subtle counter-drift on each photo while its card crosses the frame;
      // the slight overscale hides the edges the drift would expose
      cards.forEach((card, index) => {
        const mediaElement = card.querySelector<HTMLElement>('[data-room-media]')
        if (!mediaElement) {
          return
        }

        gsap.set(mediaElement, { scale: 1.1 })

        const isFirst = index === 0
        const isLast = index === cards.length - 1
        timeline.fromTo(mediaElement, {
          xPercent: isFirst ? 0 : 4,
        }, {
          xPercent: isLast ? 0 : -4,
          duration: isFirst || isLast ? 1 : 2,
        }, isFirst ? 0 : index - 1)
      })
    }, sectionElement)

    return () => {
      roomStackTrigger = undefined
      context?.revert()
    }
  })

  addCleanup(() => {
    roomStackTrigger = undefined
    mediaMatcher.revert()
  })
})
</script>

<style scoped>
.rooms-track {
  display: grid;
  gap: 1.5rem;
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

/* The pinned horizontal slider only exists when motion is allowed; reduced
   motion keeps the readable vertical flow at every width */
@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  .rooms-stack {
    /* Leave room for the fixed header, section heading, and tabs above the
       pinned stack, and a visible gap below it, so the whole block fits
       inside the viewport - with breathing room - while pinned. Tall enough
       that the details panel never needs to scroll internally. */
    height: clamp(34rem, calc(100vh - 19rem), 46rem);
    overflow: hidden;
    position: relative;
  }

  .rooms-track {
    display: flex;
    gap: 0;
    height: 100%;
    will-change: transform;
  }

  .room-showcase-card {
    flex: 0 0 100%;
    height: 100%;
    width: 100%;
  }
}
</style>
