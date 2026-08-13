<template>
  <!--
    Rooms and Suites showcase: scroll-pinned stacked room panels on desktop,
    with a readable vertical flow fallback for mobile and reduced motion.
  -->
  <BaseSection
    id="rooms"
    labelled-by="rooms-title"
    tone="paper"
    :spacing="spacing"
    container-size="xl"
  >
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Select Your Room</BaseKicker>
        <h2
          id="rooms-title"
          class="mt-6 font-display text-4xl text-ink sm:text-5xl lg:text-[56px]"
        >
          Rooms and Suites
        </h2>
      </div>
    </FadeReveal>
    <div ref="sectionRef" class="rooms-pin-wrap">
      <FadeReveal v-if="showTabs" class="shrink-0">
        <div
          role="tablist"
          aria-label="Room types"
          class=" flex flex-wrap justify-center gap-2.5 mt-10 mb-4"
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
              'border border-[#DFA558] px-6 py-2.5 text-sm font-medium uppercase transition-colors duration-fast',
              activeRoomId === room.id
                ? 'border-[#DFA558] bg-[#F9F0DB] text-[#DFA558]'
                : 'border-[#DFA558] text-[#0F0F10] hover:border-[#DFA558] hover:text-[#DFA558]',
            ]"
            @click="handleTabClick(room.id)"
          >
            {{ room.tabLabel }}
          </button>
        </div>
      </FadeReveal>

      <div ref="stackRef" class="rooms-stack mt-10">
        <div ref="trackRef" class="rooms-track">
          <article
            v-for="(room, roomIndex) in rooms"
            :id="`room-panel-${room.id}`"
            :key="room.id"
            :data-room-card="roomIndex"
            :role="showTabs ? 'tabpanel' : undefined"
            :aria-labelledby="showTabs ? `room-tab-${room.id}` : undefined"
            :aria-label="showTabs ? undefined : room.name"
            :aria-hidden="activeRoomId === room.id ? undefined : 'true'"
            :tabindex="activeRoomId === room.id ? 0 : -1"
            class="room-showcase-card relative overflow-hidden bg-ink"
          >
            <!-- Full-bleed photography with quiet dot navigation -->
            <div
              data-room-media
              class="relative aspect-[16/10] overflow-hidden bg-line/40 motion-safe:lg:absolute motion-safe:lg:inset-0 motion-safe:lg:aspect-auto"
            >
              <Transition name="room-image">
                <BaseImage
                  :key="selectedImage(room).src"
                  :src="selectedImage(room).src"
                  :alt="selectedImage(room).alt"
                  :width="1600"
                  :height="1000"
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
                    imageIndex === selectedImageIndex(room.id)
                      ? 'w-9 bg-copper'
                      : 'w-2 bg-paper/80 hover:bg-paper',
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
            <div
              class="relative flex flex-col p-7 text-paper sm:p-9 motion-safe:lg:absolute motion-safe:lg:inset-y-4 motion-safe:lg:right-4 motion-safe:lg:w-[27rem] room-card motion-safe:lg:p-0 motion-safe:xl:inset-y-6 motion-safe:xl:right-6 motion-safe:xl:w-[30rem]"
            >
              <div
                class="motion-safe:lg:absolute motion-safe:lg:inset-4 motion-safe:lg:flex motion-safe:lg:flex-col motion-safe:lg:border motion-safe:lg:border-copper motion-safe:lg:p-7 motion-safe:xl:inset-5 motion-safe:xl:p-8"
              >
                <span
                  class="self-start border border-paper/70 px-3 py-1.5 text-sm font-semibold uppercase text-paper"
                >
                  ${{ room.nightlyRateUsd }} ++ / Night
                </span>

                <h3
                  class="mt-4 font-display font-semibold text-3xl sm:text-4xl"
                >
                  {{ room.name }}
                </h3>

                <p class="mt-3 text-base  text-paper">
                  {{ room.description }}
                </p>

                <ul
                  class="mt-6 space-y-3 text-sm text-paper/80 motion-safe:lg:mt-auto motion-safe:lg:pt-6"
                >
                  <li class="flex items-center gap-3">
                    <svg
                      class="h-5 w-5 shrink-0 text-paper"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.333 10.001v1.667a1.667 1.667 0 01-1.666 1.666H7.5a.833.833 0 00-.833.834v2.5a1.667 1.667 0 001.666 1.666h8.334a1.667 1.667 0 001.666-1.666V8.335a1.667 1.667 0 00-1.666-1.667"
                      />
                      <path
                        d="M3.334 13.335a1.667 1.667 0 01-1.667-1.667V3.335a1.667 1.667 0 011.667-1.667h8.333a1.667 1.667 0 011.666 1.667v2.5a.833.833 0 01-.833.833H8.334a1.667 1.667 0 00-1.667 1.667v1.666"
                      />
                    </svg>
                    {{ room.areaSqFt }} Sq Ft Room
                  </li>
                  <li class="flex items-center gap-3">
                    <svg
                      class="h-5 w-5 shrink-0 text-paper"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path
                        d="M15.834 17.5v-1.667a3.333 3.333 0 00-3.334-3.333H7.5a3.333 3.333 0 00-3.334 3.333V17.5"
                      />
                      <path
                        d="M10 9.167a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667z"
                      />
                    </svg>
                    {{ room.maxOccupancy }}
                    {{ room.maxOccupancy === 1 ? "Person" : "Persons" }}
                  </li>
                  <li class="flex items-center gap-3">
                    <svg
                      class="h-5 w-5 shrink-0 text-paper"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.667 16.665V9.999c0-.442.176-.866.488-1.179.313-.312.737-.488 1.179-.488h13.333c.442 0 .866.176 1.179.488.312.313.488.737.488 1.179v6.666"
                      />
                      <path
                        d="M3.333 8.332v-3.333c0-.442.176-.867.488-1.179.313-.313.737-.488 1.179-.488h10c.442 0 .866.175 1.179.488.312.312.488.737.488 1.179v3.333"
                      />
                      <path d="M10 3.332v5" />
                      <path d="M1.667 15h16.667" />
                    </svg>
                    {{ room.bedType }}
                  </li>
                </ul>

                <!-- "More Details" opens the full room-details popup -->
                <div class="mt-6">
                  <BaseArrowCta
                    variant="gold"
                    :tabindex="activeRoomId === room.id ? 0 : -1"
                    @click="isDetailsOpen = true"
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

  <!-- Dialog lives outside the pinned stack: a transformed ancestor would
       otherwise become the containing block for the fixed overlay -->
  <RoomDetailsDialog v-model:open="isDetailsOpen" />
</template>

<script setup lang="ts">
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type { Room } from "~/types/room";
import { useRoomsCatalog } from "#imports";

const { showTabs = true, spacing = 'lg' } = defineProps<{
  /**
   * Show the room-type tab switcher above the stack. Defaults to true
   * (the home page's behavior). Set false to present just the
   * scroll-pinned showcase without direct-jump tabs, e.g. on the Long
   * Stays page — the pinned scroll still advances through every room.
   */
  showTabs?: boolean;
  /**
   * BaseSection vertical spacing. Pass a smaller step when the showcase
   * is the page's last section so it sits closer to the footer.
   */
  spacing?: 'sm' | 'md' | 'lg';
}>();

const rooms = useRoomsCatalog();

const activeRoomId = ref(rooms[0]?.id ?? "");
const activeImageIndexes = reactive<Record<string, number>>({});
const isDetailsOpen = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const stackRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);

const { gsap, createContext, prefersReducedMotion } = useGsap();
const { addCleanup } = useAnimationCleanup();
const nuxtApp = useNuxtApp();
const ScrollTrigger = nuxtApp.$ScrollTrigger as
  | typeof ScrollTriggerType
  | undefined;

let roomStackTrigger: ScrollTriggerType | undefined;

function selectedImageIndex(roomId: string) {
  return activeImageIndexes[roomId] ?? 0;
}

function selectedImage(room: Room) {
  return (
    room.images[selectedImageIndex(room.id)] ??
    (room.images[0] as Room["images"][number])
  );
}

function selectRoom(roomId: string) {
  activeRoomId.value = roomId;
  activeImageIndexes[roomId] = selectedImageIndex(roomId);
}

function handleImageSelect(roomId: string, imageIndex: number) {
  activeRoomId.value = roomId;
  activeImageIndexes[roomId] = imageIndex;
}

function scrollToRoom(roomId: string) {
  if (!roomStackTrigger || prefersReducedMotion.value) {
    return;
  }

  const roomIndex = rooms.findIndex((room) => room.id === roomId);
  if (roomIndex < 0) {
    return;
  }

  const progress = rooms.length > 1 ? roomIndex / (rooms.length - 1) : 0;
  const targetY =
    roomStackTrigger.start +
    (roomStackTrigger.end - roomStackTrigger.start) * progress;
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}

function handleTabClick(roomId: string) {
  selectRoom(roomId);
  scrollToRoom(roomId);
}

/** Roving-focus keyboard support for the tablist (Left/Right/Home/End) */
function handleTablistKeydown(event: KeyboardEvent) {
  const handledKeys = ["ArrowLeft", "ArrowRight", "Home", "End"];
  if (!handledKeys.includes(event.key)) {
    return;
  }
  event.preventDefault();

  const currentIndex = rooms.findIndex(
    (room) => room.id === activeRoomId.value,
  );
  let nextIndex = currentIndex;
  if (event.key === "ArrowLeft") {
    nextIndex = (currentIndex - 1 + rooms.length) % rooms.length;
  } else if (event.key === "ArrowRight") {
    nextIndex = (currentIndex + 1) % rooms.length;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else {
    nextIndex = rooms.length - 1;
  }

  const nextRoom = rooms[nextIndex];
  if (nextRoom) {
    selectRoom(nextRoom.id);
    scrollToRoom(nextRoom.id);
    nextTick(() => {
      document.getElementById(`room-tab-${nextRoom.id}`)?.focus();
    });
  }
}

onMounted(async () => {
  await nextTick();

  const sectionElement = sectionRef.value;
  const stackElement = stackRef.value;

  if (
    !sectionElement ||
    !stackElement ||
    !gsap ||
    !ScrollTrigger ||
    prefersReducedMotion.value
  ) {
    return;
  }

  const mediaMatcher = gsap.matchMedia();

  mediaMatcher.add("(min-width: 1024px)", () => {
    const context = createContext(() => {
      const trackElement = trackRef.value;
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-room-card]",
        stackElement,
      );

      if (!trackElement || cards.length < 2) {
        return;
      }

      const slideCount = cards.length - 1;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          // Pin the tabs and card stack together: the heading scrolls away,
          // then the tab switcher holds under the fixed header while the
          // cards slide through the rest of the viewport.
          trigger: sectionElement,
          start: () => `top top+=${readHeaderHeight()}`,
          end: () => `+=${cards.length * window.innerHeight * 0.72}`,
          pin: true,
          scrub: 0.85,
          // Always settle on a full card so a slide never rests half-cut
          snap: {
            snapTo: 1 / slideCount,
            duration: { min: 0.25, max: 0.6 },
            ease: "power2.out",
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const activeIndex = Math.min(
              rooms.length - 1,
              Math.max(0, Math.round(self.progress * (rooms.length - 1))),
            );
            const activeRoom = rooms[activeIndex];
            if (activeRoom && activeRoomId.value !== activeRoom.id) {
              activeRoomId.value = activeRoom.id;
            }
          },
        },
      });

      roomStackTrigger = timeline.scrollTrigger;

      // Cinematic horizontal slide: one card width per snap step
      timeline.to(
        trackElement,
        {
          xPercent: -100 * slideCount,
          duration: slideCount,
        },
        0,
      );

      // Subtle counter-drift on each photo while its card crosses the frame,
      // plus a gentle scale settle: the photo starts a touch oversized and
      // breathes into rest as the card centers. The overscale both hides the
      // edges the drift would expose and lends a push-in depth.
      cards.forEach((card, index) => {
        const mediaElement =
          card.querySelector<HTMLElement>("[data-room-media]");
        if (!mediaElement) {
          return;
        }

        gsap.set(mediaElement, { scale: 1.16 });

        const isFirst = index === 0;
        const isLast = index === cards.length - 1;
        timeline.fromTo(
          mediaElement,
          {
            xPercent: isFirst ? 0 : 4,
            scale: 1.16,
          },
          {
            xPercent: isLast ? 0 : -4,
            scale: 1.1,
            duration: isFirst || isLast ? 1 : 2,
            ease: "power1.inOut",
          },
          isFirst ? 0 : index - 1,
        );
      });
    }, sectionElement);

    return () => {
      roomStackTrigger = undefined;
      context?.revert();
    };
  });

  addCleanup(() => {
    roomStackTrigger = undefined;
    mediaMatcher.revert();
  });
});
</script>

<style scoped>
.room-card {
  background: rgba(15, 15, 15, 0.82);

  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 20px 50px rgba(0, 0, 0, 0.2);
}
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
  /* Pin group: tabs and card stack together fill the viewport below the
     fixed header. Flex column keeps the tab row a fixed height and lets the
     stack claim everything that remains, so the photograph is as tall as the
     room allows on every screen. */
  .rooms-pin-wrap {
    display: flex;
    flex-direction: column;
    height: calc(100svh - var(--header-height));
  }

  .rooms-stack {
    /* The photograph rests centered in the space the tabs leave, with equal
       breathing room above and below instead of touching the viewport edges.
       The floor keeps the card tall enough that the details panel never needs
       to scroll internally on short viewports. */
    flex: 0 1 auto;
    height: clamp(32rem, calc(100svh - var(--header-height) - 9rem - 10px), 48rem);
    min-height: 32rem;
    margin-block: auto;
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
