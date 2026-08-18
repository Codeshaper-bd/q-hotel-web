<template>
  <!--
    Long-stay Rooms showcase: a single Presidential Suite card in the same
    visual language as the home RoomsSection — full-bleed photography with a
    copper-framed details panel overlaid on large screens and stacked below
    on small screens. The photography rotates independently behind the
    always-readable suite details, with accessible controls at the bottom.
  -->
  <BaseSection
    id="long-stay-rooms"
    labelled-by="long-stay-rooms-title"
    tone="paper"
    spacing="lg"
    container-size="xl"
    class="!pt-4 sm:!pt-8 !pb-14 sm:!pb-16"
  >
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Select Your Room</BaseKicker>
        <h2
          id="long-stay-rooms-title"
          class="mt-6 font-display text-4xl text-ink sm:text-5xl lg:text-[56px]"
        >
          Rooms and Suites
        </h2>
      </div>
    </FadeReveal>

    <FadeReveal v-if="room && roomImage">
      <article
        class="room-showcase-card relative mt-10 overflow-hidden bg-ink lg:h-[clamp(32rem,calc(100svh-var(--header-height)-9rem),48rem)]"
        @mouseenter="pauseSlider"
        @mouseleave="startSlider"
        @focusin="pauseSlider"
        @focusout="handleFocusOut"
      >
        <!-- Full-bleed photography -->
        <div
          class="relative aspect-[16/10] overflow-hidden bg-line/40 lg:absolute lg:inset-0 lg:aspect-auto"
        >
          <Transition name="room-image">
            <BaseImage
              :key="selectedImage.src"
              :src="selectedImage.src"
              :alt="selectedImage.alt"
              :width="1600"
              :height="1000"
              sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1280px"
              class="absolute inset-0 h-full w-full object-cover"
            />
          </Transition>

          <div
            v-if="slideImages.length > 1"
            class="absolute inset-x-0 bottom-4 z-20 flex justify-center sm:bottom-5"
            aria-label="Room photo navigation"
          >
            <div class="flex items-center gap-2 rounded-full bg-ink/75 px-2 py-1.5 shadow-lg backdrop-blur-sm">
              <!-- <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-paper/80 transition-colors duration-fast hover:bg-paper/10 hover:text-paper focus-visible:bg-paper/10"
                aria-label="Show previous room photo"
                @click="showPreviousSlide"
              >
                <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="m10 3-5 5 5 5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button> -->

              <div class="flex items-center gap-1.5 px-1">
                <button
                  v-for="(image, imageIndex) in slideImages"
                  :key="image.src"
                  type="button"
                  :class="[
                    'h-2 rounded-full transition-[width,background-color] duration-fast motion-reduce:transition-none',
                    imageIndex === selectedImageIndex
                      ? 'w-6 bg-copper'
                      : 'w-2 bg-paper/55 hover:bg-paper',
                  ]"
                  :aria-label="`Show room photo ${imageIndex + 1} of ${slideImages.length}`"
                  :aria-pressed="imageIndex === selectedImageIndex"
                  @click="selectedImageIndex = imageIndex"
                />
              </div>

              <!-- <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full text-paper/80 transition-colors duration-fast hover:bg-paper/10 hover:text-paper focus-visible:bg-paper/10"
                aria-label="Show next room photo"
                @click="showNextSlide"
              >
                <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="m6 3 5 5-5 5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button> -->
            </div>
          </div>
        </div>

        <!-- Details panel: solid below the photo on mobile, a copper-framed
             scrim overlay on desktop -->
        <div
          class="relative flex flex-col p-7 text-paper sm:p-9 lg:absolute lg:inset-y-4 lg:right-4 lg:w-[27rem] room-card lg:p-0 xl:inset-y-6 xl:right-6 xl:w-[30rem]"
        >
          <div
            class="lg:absolute lg:inset-4 lg:flex lg:flex-col lg:border lg:border-copper lg:p-7 xl:inset-5 xl:p-8"
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

            <p class="mt-3 text-base text-paper">
              {{ room.description }}
            </p>

            <ul
              class="mt-6 space-y-3 text-sm text-paper/80 lg:mt-auto lg:pt-6"
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
              <BaseArrowCta variant="gold" @click="isDetailsOpen = true">
                More Details
              </BaseArrowCta>
            </div>
          </div>
        </div>
      </article>
    </FadeReveal>
  </BaseSection>

  <!-- Dialog lives outside the card: a transformed ancestor would otherwise
       become the containing block for the fixed overlay -->
  <RoomDetailsDialog v-model:open="isDetailsOpen" />
</template>

<script setup lang="ts">
import { useRoomsCatalog } from "#imports";

const isDetailsOpen = ref(false);
const selectedImageIndex = ref(0);
const { prefersReducedMotion } = useReducedMotion();

const room = useRoomsCatalog().find((item) => item.id === "presidential-suite");
const roomImage = room?.images[0];

interface SlideImage {
  src: string;
  alt: string;
}

const slideImages: [SlideImage, ...SlideImage[]] = [
  {
    src: "/images/rooms/long-stays.png",
    alt: "Spacious bedroom prepared for a long stay at Q Hotel Dhaka",
  },
  {
    src: "/images/rooms/presidential-suite.jpg",
    alt: "Presidential Suite living area at Q Hotel Dhaka",
  },
  {
    src: "/images/rooms/executive-suite.jpg",
    alt: "Executive Suite bedroom at Q Hotel Dhaka",
  },
];

const selectedImage = computed(
  () => slideImages[selectedImageIndex.value] ?? slideImages[0],
);

let sliderInterval: ReturnType<typeof setInterval> | undefined;

function pauseSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = undefined;
  }
}

function showNextSlide() {
  selectedImageIndex.value = (selectedImageIndex.value + 1) % slideImages.length;
}

function showPreviousSlide() {
  selectedImageIndex.value =
    (selectedImageIndex.value - 1 + slideImages.length) % slideImages.length;
}

function startSlider() {
  pauseSlider();
  if (prefersReducedMotion.value || slideImages.length < 2) return;
  sliderInterval = setInterval(showNextSlide, 5500);
}

function handleFocusOut(event: FocusEvent) {
  const sliderElement = event.currentTarget;
  const nextTarget = event.relatedTarget;

  if (
    !(sliderElement instanceof HTMLElement) ||
    !(nextTarget instanceof Node) ||
    !sliderElement.contains(nextTarget)
  ) {
    startSlider();
  }
}

onMounted(startSlider);
onBeforeUnmount(pauseSlider);
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

.room-image-enter-active,
.room-image-leave-active {
  transition: opacity var(--duration-normal) var(--ease-premium);
}

.room-image-enter-from,
.room-image-leave-to {
  opacity: 0;
}
</style>
