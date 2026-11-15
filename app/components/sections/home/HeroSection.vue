<template>
  <section
    id="hero"
    ref="sectionRef"
    aria-labelledby="home-title"
    class="relative flex h-screen flex-col justify-end overflow-hidden bg-night text-paper"
  >
    <div ref="bgRef" aria-hidden="true" class="absolute inset-0">
            <!-- Served at native resolution and high quality: the entrance animation
           holds the image at up to 1.12x scale, so a smaller/softer source
           would visibly upscale and lose sharpness. -->
      <BaseImage
        src="/images/hero/q-hotel-hero-v2.png"
        alt=""
        :width="1673"
        :height="940"
        :quality="90"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:1920px"
        priority
        class="h-full w-full object-[center_100%] md:object-[center_68%] xl:object-[center_20%]"
      />

      <!-- Phone / tablet follow the Figma frames (clear sky, then a 0.7 black
           shelf behind the copy and booking bar); xl keeps the longer ramp -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_30%,rgba(0,0,0,0.45)_46%,rgba(0,0,0,0.75)_62%)] md:bg-[linear-gradient(180deg,rgba(0,0,0,0)_45.89%,rgba(0,0,0,0.7)_69.601%)] xl:bg-[linear-gradient(180deg,rgba(0,0,0,0)_35%,rgba(0,0,0,0.55)_65%,#000_94.559%)]"
      />
    </div>

    <BaseContainer size="xl" class="w-full !px-4 pb-4 pt-32 md:!px-8 md:pb-6 xl:pb-[52px]">
      <div class="relative grid grid-cols-12 gap-3">
        <div ref="textRef" class="col-span-12 xl:col-span-5 2xl:col-span-6 text-center xl:text-left xl:mb-[94px]">
          <div class="overflow-hidden pb-2">
            <h1
              id="home-title"
              ref="headlineRef"
              class="font-display text-[clamp(14px,4.75vw,21px)] font-normal uppercase leading-tight md:max-w-[560px] md:text-[28px] md:leading-7 xl:max-w-[620px] xl:text-[32px] xl:leading-8 mx-auto xl:mx-0"
            >
              A new hospitality destination where glamour meets tranquility
            </h1>
          </div>
          <p
            ref="leadRef"
            class="mt-2 mx-auto max-w-[398px] text-sm font-light leading-5 md:max-w-[643px] md:text-base md:font-normal md:leading-6 xl:mx-0 xl:max-w-[735px] xl:text-lg xl:leading-[26px]"
          >
            A refined stay for today’s business traveler, combining effortless
            convenience, exceptional comfort, and thoughtful services for work
            and relaxation
          </p>
        </div>

        <div
          ref="consoleRef"
          class="mt-6 w-full col-span-12 xl:col-span-7 2xl:col-span-6 self-end xl:mt-10 max-w-4xl mx-auto xl:max-w-none xl:mx-0"
        >
          <HeroBookingSearch compact @search="handleSearch" />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from "~/types/booking";
import { toBookingRouteQuery } from "#imports";

const sectionRef = ref<HTMLElement | null>(null);
const bgRef = ref<HTMLElement | null>(null);
const headlineRef = ref<HTMLElement | null>(null);
const leadRef = ref<HTMLElement | null>(null);
const consoleRef = ref<HTMLElement | null>(null);
const { gsap, createContext, prefersReducedMotion } = useGsap();
/** Flips true as the preloader's curtains open (see AppPreloader) */
const isPreloaderComplete = useState("preloader-complete", () => false);

onMounted(() => {
  if (
    !sectionRef.value ||
    !bgRef.value ||
    !headlineRef.value ||
    !leadRef.value ||
    !consoleRef.value ||
    !gsap ||
    prefersReducedMotion.value
  ) {
    return;
  }

  // Turn the plain text into word spans — visually identical at rest, but it
  // lets each word rise through its own mask. Skipped under reduced motion.
  const sectionElement = sectionRef.value;
  const headlineWords = splitIntoWords(headlineRef.value, true);
  const leadWords = splitIntoWords(leadRef.value, false);

  // Park every layer in its starting pose right away (the preloader still
  // covers the page), so nothing flashes before the entrance plays.
  gsap.set(bgRef.value, { scale: 1.12 });
  gsap.set(consoleRef.value, { autoAlpha: 0, y: 32 });
  gsap.set(headlineWords, { yPercent: 110, autoAlpha: 0 });
  gsap.set(leadWords, { autoAlpha: 0, y: 14 });

  // A quiet, cinematic arrival — not a scroll journey: the hero is fully
  // usable the instant it paints, and this just softens the first frames.
  // It starts only once the preloader's curtains open, so the visitor
  // actually sees it.
  const playEntrance = () => createContext(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // The photograph arrives slightly oversized and breathes into rest — a
    // subtle Ken Burns settle that keeps the first frame cinematic.
    tl.to(bgRef.value, { scale: 1, duration: 2.4, ease: "power2.out" }, 0);
    tl.to(consoleRef.value, { autoAlpha: 1, y: 0, duration: 1 }, 1);

    // The words replay every time the hero returns to the viewport (the
    // same restart/reset pattern as the About brand mark), so the entrance
    // is easy to catch — reload the page, or scroll down and back up.
    const wordsTimeline = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: sectionElement,
        start: "top 85%",
        toggleActions: "restart reset restart reset",
      },
    });

    // Headline words rise one by one through their masks
    wordsTimeline.fromTo(
      headlineWords,
      {
        yPercent: 110,
        autoAlpha: 0,
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.1,
        stagger: 0.09,
      },
      0,
    );
    // Lead words drift up in a quiet ripple
    wordsTimeline.fromTo(
      leadWords,
      {
        autoAlpha: 0,
        y: 14,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.028,
        ease: "power3.out",
      },
      0.65,
    );
  }, sectionElement);

  if (isPreloaderComplete.value) {
    playEntrance();
    return;
  }

  const stopWaiting = watch(isPreloaderComplete, (isComplete) => {
    if (isComplete) {
      stopWaiting();
      playEntrance();
    }
  });
});

function handleSearch(query: BookingSearchQuery) {
  // OPERA PMS availability/rate/reservation integration lands here.
  // Until then, the selection travels to /rooms as URL query params (so a
  // refresh or share reproduces it) and also into shared state, which the
  // later /booking step reads to carry the dates through checkout.
  useState<BookingSearchQuery | null>(
    "booking-search-draft",
    () => null,
  ).value = query;
  navigateTo({ path: "/rooms", query: toBookingRouteQuery(query) });
}
</script>

<style scoped>
/* Scroll cue: a champagne pulse travelling down a hairline track. The parent
   is hidden with motion-safe:lg:flex, so reduced-motion users never see it
   animate (and never see it at all). transform-only, no layout shift. */
@keyframes scroll-cue {
  0% {
    transform: translateY(-101%);
  }

  55%,
  100% {
    transform: translateY(101%);
  }
}

.scroll-cue {
  animation: scroll-cue 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
</style>
