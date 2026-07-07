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
                class="absolute inset-x-0 bottom-4 flex justify-center gap-2 lg:inset-x-auto lg:bottom-8 lg:left-10 lg:justify-start"
              >
                <button
                  v-for="(image, imageIndex) in room.images"
                  :key="image.src"
                  type="button"
                  :class="[
                    'h-2.5 w-2.5 rounded-full border border-night/30 transition-colors duration-fast',
                    imageIndex === selectedImageIndex(room.id) ? 'bg-champagne' : 'bg-paper/70 hover:bg-paper',
                  ]"
                  :aria-label="`Show photo ${imageIndex + 1} of ${room.name}`"
                  :aria-pressed="imageIndex === selectedImageIndex(room.id)"
                  :tabindex="activeRoomId === room.id ? 0 : -1"
                  @click="handleImageSelect(room.id, imageIndex)"
                />
              </div>
            </div>

            <!-- Details panel: solid below the photo on mobile, frosted glass overlay on desktop -->
            <div class="relative flex flex-col bg-ink p-7 text-paper sm:p-9 motion-safe:lg:absolute motion-safe:lg:inset-y-6 motion-safe:lg:right-6 motion-safe:lg:w-96 motion-safe:lg:overflow-y-auto motion-safe:lg:border motion-safe:lg:border-champagne/25 motion-safe:lg:bg-night/55 motion-safe:lg:p-8 motion-safe:lg:backdrop-blur-xl motion-safe:xl:inset-y-10 motion-safe:xl:right-10 motion-safe:xl:w-[26rem] motion-safe:xl:p-10">
              <span class="self-start border border-champagne/50 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-champagne">
                ${{ room.nightlyRateUsd }} / Night
              </span>

              <h3 class="mt-5 font-display text-3xl leading-tight sm:text-4xl">
                {{ room.name }}
              </h3>

              <p class="mt-4 text-sm leading-7 text-paper/70">
                {{ room.description }}
              </p>

              <ul class="mt-7 space-y-3.5 text-sm text-paper/80 motion-safe:lg:mt-auto motion-safe:lg:pt-8">
                <li class="flex items-center gap-3">
                  <svg class="h-4 w-4 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                  {{ room.areaSqFt }} Sq Ft Room
                </li>
                <li class="flex items-center gap-3">
                  <svg class="h-4 w-4 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  {{ room.maxOccupancy }} {{ room.maxOccupancy === 1 ? 'Person' : 'Persons' }}
                </li>
                <li class="flex items-center gap-3">
                  <svg class="h-4 w-4 shrink-0 text-champagne/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2 18h20" />
                  </svg>
                  {{ room.bedType }}
                </li>
              </ul>

              <!-- Rooms detail routes arrive with the reservations flow; the
                   CTA hands off to the reserve entry point until then -->
              <div class="mt-8">
                <NuxtLink
                  to="#reserve"
                  :tabindex="activeRoomId === room.id ? 0 : -1"
                  class="room-cta group inline-flex items-stretch text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
                >
                  <span class="flex min-h-11 items-center border border-r-0 border-paper/40 px-6 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-fast group-hover:border-champagne group-hover:bg-champagne/10 group-focus-visible:border-champagne group-focus-visible:bg-champagne/10">
                    More Details
                  </span>
                  <span
                    class="room-cta-icon relative flex min-h-11 w-12 items-center justify-center overflow-hidden border border-champagne/60 text-champagne transition-colors duration-fast group-hover:border-champagne group-hover:bg-champagne group-hover:text-night group-focus-visible:border-champagne group-focus-visible:bg-champagne group-focus-visible:text-night"
                    aria-hidden="true"
                  >
                    <svg class="room-cta-arrow room-cta-arrow-primary h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
                    </svg>
                    <svg class="room-cta-arrow room-cta-arrow-secondary h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </NuxtLink>
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

.room-cta-arrow {
  inset: auto;
  position: absolute;
  transition:
    opacity var(--duration-normal) var(--ease-premium),
    transform var(--duration-normal) var(--ease-premium);
}

.room-cta-arrow-secondary {
  opacity: 0;
  transform: translate(-0.85rem, 0.85rem);
}

@media (prefers-reduced-motion: no-preference) {
  .room-cta:hover .room-cta-arrow-primary,
  .room-cta:focus-visible .room-cta-arrow-primary {
    opacity: 0;
    transform: translate(0.85rem, -0.85rem);
  }

  .room-cta:hover .room-cta-arrow-secondary,
  .room-cta:focus-visible .room-cta-arrow-secondary {
    opacity: 1;
    transform: translate(0, 0);
  }
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
       pinned stack so the whole block fits inside the viewport while pinned */
    height: clamp(26rem, calc(100vh - 19rem), 44rem);
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
