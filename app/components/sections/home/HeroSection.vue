<template>
  <section id="hero" ref="sectionRef" aria-labelledby="home-title"
    class="relative flex min-h-svh flex-col justify-end overflow-hidden bg-night text-paper">
    <div ref="bgRef" aria-hidden="true" class="absolute inset-0">
      <BaseImage src="/images/hero/bg-hero-1.png" alt="" :width="1920" :height="980" priority class="h-full w-full" />

      <div aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.70)_0%,rgba(0,0,0,0.00)_48.9%,#000_100%)]" />
    </div>

    <BaseContainer size="xl" class="w-full pb-12 pt-32 sm:pb-12">
      <div class="relative grid grid-cols-12 gap-3">
        <div ref="textRef" class="col-span-12  xl:col-span-5 2xl:col-span-6">
          <div class="overflow-hidden pb-2">
            <h1 id="home-title" ref="headlineRef"
              class="font-display text-4xl font-bold sm:text-[40px] sm:leading-[48px] max-w-[600px] capitalize mt-10">
              A new hospitality destination where glamour meets tranquility
            </h1>
          </div>
          <p ref="leadRef" class="max-w-xl text-lg xl:max-w-[700px] xl:text-xl xl:leading-[30px] font-normal">
            A refined stay for today’s business traveler, combining effortless convenience, exceptional comfort, and
            thoughtful services for work and relaxation
          </p>
        </div>

        <div ref="consoleRef" class="mt-10 w-full col-span-12 xl:col-span-7 2xl:col-span-6 self-end">
          <HeroBookingSearch @search="handleSearch" />
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
const cueRef = ref<HTMLElement | null>(null);

const { gsap, createContext, prefersReducedMotion } = useGsap();

/**
 * Splits an element's plain text into word spans so each word can rise on
 * its own. Headline words get an overflow-hidden mask (the word slides up
 * through its own window); lead words are plain spans that just drift up.
 * Text content is preserved, so nothing changes for SEO or screen readers.
 */
function splitIntoWords(element: HTMLElement, masked: boolean): HTMLElement[] {
  const words = element.textContent?.trim().split(/\s+/) ?? [];
  element.textContent = "";

  return words.map((word, index) => {
    // Always `inline-block` — transforms (and therefore GSAP's y-drift) are
    // ignored on plain inline elements, so every animated word must be
    // transformable.
    const inner = document.createElement("span");
    inner.className = "inline-block";
    inner.textContent = word;

    if (masked) {
      // Headline words rise through their own clipped window
      const mask = document.createElement("span");
      mask.className = "inline-block overflow-hidden";
      mask.appendChild(inner);
      element.appendChild(mask);
    } else {
      // Lead words are plain spans that just drift up
      element.appendChild(inner);
    }

    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }

    return inner;
  });
}

onMounted(() => {
  if (
    !sectionRef.value ||
    !bgRef.value ||
    !headlineRef.value ||
    !leadRef.value ||
    !consoleRef.value ||
    !cueRef.value ||
    !gsap ||
    prefersReducedMotion.value
  ) {
    return;
  }

  // Turn the plain text into word spans — visually identical at rest, but it
  // lets each word rise through its own mask. Skipped under reduced motion.
  const headlineWords = splitIntoWords(headlineRef.value, true);
  const leadWords = splitIntoWords(leadRef.value, false);

  // A quiet, cinematic arrival — not a scroll journey: the hero is fully
  // usable the instant it paints, and this just softens the first frames.
  createContext(() => {
    // Park every layer in its starting pose up front so nothing flashes
    // before the timeline plays.
    gsap.set(bgRef.value, { scale: 1.12 });
    gsap.set(consoleRef.value, { autoAlpha: 0, y: 32 });
    gsap.set(cueRef.value, { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // The photograph arrives slightly oversized and breathes into rest — a
    // subtle Ken Burns settle that keeps the first frame cinematic.
    tl.to(bgRef.value, { scale: 1, duration: 2.4, ease: "power2.out" }, 0);
    tl.to(consoleRef.value, { autoAlpha: 1, y: 0, duration: 1 }, 1);
    tl.to(cueRef.value, { autoAlpha: 1, duration: 0.8 }, 1.2);

    // The words replay every time the hero returns to the viewport (the
    // same restart/reset pattern as the About brand mark), so the entrance
    // is easy to catch — reload the page, or scroll down and back up.
    const wordsTimeline = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: sectionRef.value,
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
  }, sectionRef.value);
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
