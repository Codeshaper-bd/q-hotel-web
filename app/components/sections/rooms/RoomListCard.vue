<template>
  <!-- Full-bleed room photography with the existing details panel inset
       over the right side, matching the gallery-led room card design. -->
  <article
    class="relative flex h-[820px] flex-col justify-end overflow-hidden bg-ink sm:items-end sm:justify-center lg:h-[620px]"
    @mouseenter="pauseSlider"
    @mouseleave="startSlider"
    @focusin="pauseSlider"
    @focusout="handleFocusOut"
  >
    <div class="absolute inset-0 overflow-hidden bg-line/40">
      <Transition name="room-image">
        <BaseImage
          :key="selectedImage.src"
          :src="selectedImage.src"
          :alt="selectedImage.alt"
          :width="900"
          :height="675"
          sizes="xs:100vw sm:58vw lg:46vw"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </Transition>

      <div
        v-if="slideImages.length > 1"
        class="absolute top-4 right-4 z-20 flex gap-1 lg:inset-x-0 lg:bottom-4 lg:top-auto lg:right-[42%] lg:justify-center"
      >
        <div
          class="rounded-full bg-black/50 py-1.5 px-2.5 flex items-center gap-1.5"
        >
          <button
            v-for="(image, imageIndex) in slideImages"
            :key="image.src"
            type="button"
            :class="[
              'size-2.5 transition-[width,background-color] duration-fast rounded-full',
              imageIndex === selectedImageIndex
                ? 'bg-copper'
                : 'bg-paper/80 hover:bg-paper',
            ]"
            :aria-label="`Show photo ${imageIndex + 1} of ${room.name}`"
            :aria-pressed="imageIndex === selectedImageIndex"
            @click="selectedImageIndex = imageIndex"
          />
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 z-10 flex flex-col p-7 text-paper sm:p-9 motion-safe:lg:inset-y-4 motion-safe:lg:left-auto motion-safe:lg:right-4 motion-safe:lg:w-[27rem] room-card motion-safe:lg:p-0 motion-safe:xl:inset-y-6 motion-safe:xl:right-6 motion-safe:xl:w-[30rem]"
    >
      <div
        class="motion-safe:lg:absolute motion-safe:lg:inset-4 motion-safe:lg:flex motion-safe:lg:flex-col motion-safe:lg:border motion-safe:lg:border-copper motion-safe:lg:p-7 motion-safe:xl:inset-5 motion-safe:xl:p-8"
      >
        <span
          class="self-start border border-[#F9F0DB] px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-paper"
        >
          ${{ room.nightlyRateUsd }}++ / Night
        </span>

        <h3 class="mt-5 font-display text-[28px] font-semibold">
          {{ room.name }}
        </h3>

        <p class="mt-2.5 text-base text-paper">
          {{ room.description }}
        </p>

        <div
          class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-6 lg:block"
        >
          <ul
            class="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-base text-paper lg:block lg:space-y-2.5"
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
      </div>

      <!-- Below lg the actions follow the features; from lg, mt-auto
           pins the actions to the panel's lower edge -->
      <div
        class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-auto lg:pt-6"
      >
        <BaseArrowCta
          :to="`/booking?room=${room.id}`"
          variant="gold"
          label-class="text-[13px] leading-[20px] font-medium"
        >
          Book Now
        </BaseArrowCta>
        <button
          type="button"
          class="flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.08em] text-paper transition-colors duration-fast hover:text-champagne"
          @click="isDetailsOpen = true"
        >
          Room Details
          <svg
            class="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 3l5 5-5 5"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <RoomDetailsDialog v-model:open="isDetailsOpen" />
</article>
</template>

<script setup lang="ts">
import type { Room } from "~/types/room";

const props = defineProps<{
  room: Room;
}>();

const selectedImageIndex = ref(0);
const isDetailsOpen = ref(false);
const { prefersReducedMotion } = useReducedMotion();

const slideImages = computed(() => props.room.images);

const selectedImage = computed(
  () =>
    slideImages.value[selectedImageIndex.value] ??
    (slideImages.value[0] as Room["images"][number]),
);

let sliderInterval: ReturnType<typeof setInterval> | undefined;

function pauseSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = undefined;
  }
}

function startSlider() {
  pauseSlider();
  if (prefersReducedMotion.value || slideImages.value.length < 2) return;
  sliderInterval = setInterval(() => {
    selectedImageIndex.value =
      (selectedImageIndex.value + 1) % slideImages.value.length;
  }, 5000);
}

function handleFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget;
  const sliderElement = event.currentTarget;
  if (
    !(sliderElement instanceof HTMLElement) ||
    !(nextTarget instanceof Node) ||
    !sliderElement.contains(nextTarget)
  ) {
    startSlider();
  }
}

watch(() => props.room.id, () => {
  selectedImageIndex.value = 0;
  startSlider();
});

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
