<template>
  <!--
    Our Story: story cards with a photograph beside narrative text, framed by
    a champagne border. On large screens the heading holds while the cards
    stack beneath it as a deck (position: sticky, each card resting a little
    lower than the one before) — the same pattern as MeetingsEventsSection;
    small screens and reduced-motion keep a plain readable flow.
  -->
  <BaseSection
    id="our-story"
    labelled-by="our-story-title"
    tone="paper"
    spacing="lg"
    container-size="xl"
    class="lg:pt-[100px]"
  >
    <div ref="blockRef" class="story-block">
      <div ref="headingRef" class="story-heading">
        <FadeReveal>
          <div class="flex flex-col items-center text-center">
            <BaseKicker>Our Story</BaseKicker>
            <h2
              id="our-story-title"
              class="mt-6 font-display text-4xl text-ink sm:text-5xl lg:text-[56px] font-semibold"
            >
              Our Journey &amp; Philosophy
            </h2>
          </div>
        </FadeReveal>
      </div>

      <div ref="stackRef" class="story-stack">
        <article
          v-for="(story, storyIndex) in stories"
          :key="story.title"
          :data-story-card="storyIndex"
          class="story-card relative flex flex-col overflow-hidden border border-champagne bg-paper sm:flex-row"
        >
          <!-- Dims a card as the next one covers it. A scrim rather than card
               opacity, so the covered card stays opaque and never shows the
               cards resting beneath it through its own background. -->
          <div
            data-story-scrim
            class="pointer-events-none absolute inset-0 z-10 bg-paper opacity-0"
            aria-hidden="true"
          />

          <div class="relative h-[586px] w-full shrink-0 sm:w-[46%]">
            <BaseImage
              :src="story.image.src"
              :alt="story.image.alt"
              :width="798"
              :height="506"
              sizes="xs:100vw sm:46vw"
              class="absolute inset-0 p-2.5"
            />
          </div>

          <div class="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p
              class="font-display text-xl lg:text-2xl font-semibold text-[#C9752D]"
            >
              {{ story.kicker }}
            </p>
            <h3
              class="mt-3 font-display font-semibold text-3xl text-ink sm:text-4xl lg:text-[44px]"
            >
              {{ story.title }}
            </h3>
            <div
              class="mt-4 space-y-4 text-sm leading-7 text-[#505155] sm:text-base"
            >
              <p v-for="paragraph in story.paragraphs" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </article>

        <!-- Trailing block that gives the last card room to stick, so the
             finished deck rests on screen for a beat. It must be a sibling: a
             margin on the card itself shrinks its own sticky rect by the same
             amount, and container padding sits outside the sticky rect. -->
        <div class="story-stack-spacer" aria-hidden="true" />
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

interface StoryImage {
  src: string;
  alt: string;
}

interface Story {
  kicker: string;
  title: string;
  paragraphs: string[];
  image: StoryImage;
}

const stories: Story[] = [
  {
    kicker: "Our Story",
    title: "Core Values & Heritage",
    paragraphs: [
      "Our story began with a simple vision, to create a place where every guest feels welcomed, valued, and at home. Built on the principles of quality, comfort, and genuine hospitality, we strive to deliver memorable experiences with every stay.",
      "Inspired by the vibrant energy of Dhaka, we combine modern amenities with personalized service to ensure every visit is comfortable, relaxing, and truly unforgettable.",
    ],
    image: {
      src: "/images/about/story-1.png",
      alt: "Q Hotel Dhaka story photograph — heritage and core values",
    },
  },
  {
    kicker: "Our Strategy",
    title: "Company Strategy",
    paragraphs: [
      "Our strategy is centered on delivering exceptional guest experiences through outstanding service, modern comforts, and continuous innovation. By maintaining high standards and focusing on every detail, we ensure every stay exceeds expectations.",
      "We are committed to sustainable growth, operational excellence, and building lasting relationships with our guests through trust, quality, and personalized hospitality.",
    ],
    image: {
      src: "/images/about/story-2.png",
      alt: "Q Hotel Dhaka story photograph — company strategy",
    },
  },
  {
    kicker: "Wake Refreshed",
    title: "Peaceful & Comfortable Stays",
    paragraphs: [
      "Experience the perfect balance of comfort and relaxation in thoughtfully designed rooms and suites. With modern amenities, elegant interiors, and a peaceful atmosphere, every stay is designed to help you unwind and wake up refreshed. Whether you're traveling for business or leisure, our welcoming spaces provide the ideal retreat after a busy day. Enjoy attentive service and a restful experience that makes every visit truly memorable.",
    ],
    image: {
      src: "/images/about/story-3.png",
      alt: "Q Hotel Dhaka story photograph — peaceful and comfortable stays",
    },
  },
  {
    kicker: "Host With Us",
    title: "Celebrate Every Special Moment",
    paragraphs: [
      "From intimate gatherings to grand occasions, our elegant event spaces and dedicated team provide the perfect setting for unforgettable celebrations. Every detail is carefully managed to create memorable experiences for you and your guests. With flexible venues and personalized event planning, we bring your vision to life with care and precision. Let every milestone become a cherished memory in a setting designed for exceptional moments.",
    ],
    image: {
      src: "/images/about/story-4.png",
      alt: "Q Hotel Dhaka story photograph — celebrations and special moments",
    },
  },
];

const blockRef = ref<HTMLElement | null>(null);
const headingRef = ref<HTMLElement | null>(null);
const stackRef = ref<HTMLElement | null>(null);

const { gsap, createContext, prefersReducedMotion } = useGsap();
const { addCleanup } = useAnimationCleanup();
const nuxtApp = useNuxtApp();
const ScrollTrigger = nuxtApp.$ScrollTrigger as
  | typeof ScrollTriggerType
  | undefined;

/**
 * Distance the heading must stop sticking early so it leaves with the deck.
 *
 * A sticky element releases when its own bottom edge meets the bottom of its
 * sticky rect, and that rect is the containing block shrunk by the element's
 * margins. The heading and the deck share a containing block, but the heading
 * rests far higher up the viewport than a full-height card, so on its own it
 * would keep sticking long after the last card has gone — leaving the title
 * stranded over empty paper. Giving it exactly that difference as a bottom
 * margin shrinks its rect by the same amount, and the two release together.
 */
function measureHeadingHold() {
  const blockElement = blockRef.value;
  const headingElement = headingRef.value;
  const stackElement = stackRef.value;
  const cards =
    stackElement?.querySelectorAll<HTMLElement>("[data-story-card]");
  const lastCard = cards?.[cards.length - 1];

  if (!blockElement || !headingElement || !stackElement || !lastCard) {
    return;
  }

  const headingTop =
    Number.parseFloat(window.getComputedStyle(headingElement).top) || 0;
  const cardTop = Number.parseFloat(window.getComputedStyle(lastCard).top) || 0;
  const headingBottom = headingTop + headingElement.offsetHeight;
  const cardBottom = cardTop + lastCard.offsetHeight;

  blockElement.style.setProperty(
    "--story-heading-hold",
    `${Math.max(0, cardBottom - headingBottom)}px`,
  );

  // The first card must never rest beneath the heading band, or its top
  // border hides behind the paper band while the deck holds on scroll-up.
  // The band's height is content-driven (title wrapping varies by width), so
  // the deck's resting offset is measured: the band's pinned bottom edge plus
  // a beat of breathing room, never less than the designed 10rem runway.
  // Anchored to the heading's own top (= header height), never to a card's
  // current top — that value already includes the deck offset itself.
  const designedRunway = headingTop + 10 * 16;
  const deckTop = Math.max(designedRunway, headingBottom + 8);
  stackElement.style.setProperty("--story-deck-top", `${deckTop}px`);
}

onMounted(async () => {
  await nextTick();

  const stackElement = stackRef.value;

  if (!stackElement || !gsap || !ScrollTrigger || prefersReducedMotion.value) {
    return;
  }

  const mediaMatcher = gsap.matchMedia();

  // The deck only exists where the cards are sticky (lg and up); everywhere
  // else the plain vertical flow stays untouched.
  mediaMatcher.add("(min-width: 1024px)", () => {
    // Remeasure before ScrollTrigger takes its own measurements, so a resize
    // or a font swap cannot leave the heading holding the wrong distance
    measureHeadingHold();
    ScrollTrigger.addEventListener("refreshInit", measureHeadingHold);

    const context = createContext(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-story-card]",
        stackElement,
      );

      if (cards.length < 2) {
        return;
      }

      // Each card recedes and dims while the next one travels up and covers
      // it, so the resting deck reads as depth rather than a flat pile.
      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        if (!nextCard) {
          return;
        }

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            // The next card stops at its own sticky offset, so the cover is
            // complete there — reading it back keeps CSS the single source.
            end: () =>
              `top ${Number.parseFloat(window.getComputedStyle(nextCard).top) || 0}px`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Shrink from the top edge so the strip left peeking above the
        // covering card stays put while the card settles back into the deck
        timeline
          .to(card, { scale: 0.94, transformOrigin: "center top" }, 0)
          .to(card.querySelector("[data-story-scrim]"), { opacity: 0.55 }, 0);
      });
    }, stackElement);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", measureHeadingHold);
      blockRef.value?.style.removeProperty("--story-heading-hold");
      stackRef.value?.style.removeProperty("--story-deck-top");
      context?.revert();
    };
  });

  addCleanup(() => mediaMatcher.revert());
});
</script>

<style scoped>
/* Flex column, so the heading's hold margin and the stack's cancelling margin
   cannot collapse into each other the way sibling margins do in block flow */
.story-block {
  display: flex;
  flex-direction: column;
}

/* Plain block flow, not a grid: a grid item's sticky rect is its own grid area
   (one row), which leaves the cards nothing to travel in */
.story-stack {
  margin-top: 3rem;
}

.story-card + .story-card {
  margin-top: 2rem;
}

/* The spacer only earns its keep where the deck exists */
.story-stack-spacer {
  display: none;
}

/* Sticky deck on large screens: the heading holds under the fixed header while
   each card rests a little lower than the one before it, so the covered cards
   keep a visible top edge and the next card slides over them. Position-driven,
   so it still reads correctly without JS and for reduced motion (the GSAP
   depth pass is the only enhancement). */
@media (min-width: 1024px) {
  /* Holds flush against the fixed header, with the breathing room carried as
     padding rather than a top offset: the background has to be one unbroken
     band, or cards passing behind the heading show through the gap. Paints
     above the deck so they pass behind it cleanly. */
  .story-heading {
    position: sticky;
    top: var(--header-height);
    z-index: 20;
    background: rgb(var(--color-paper));

    /* The band's breathing room is padding, not a top offset, so the paper
       stays unbroken; the negative margin takes that padding back out of the
       layout, keeping this section's spacing rhythm identical to the others */
    margin-top: -2rem;
    padding-top: 2rem;
    padding-bottom: 1.5rem;

    /* Measured at runtime; the fallback keeps no-JS close enough that the
       heading never strands itself above an empty deck */
    margin-bottom: var(--story-heading-hold, 30rem);
  }

  .story-stack {
    /* Deck rests below the held heading, not under the header. Measured at
       runtime (like the heading hold) so the first card clears the heading
       band; this 10rem value is the no-JS fallback */
    --story-deck-top: calc(var(--header-height) + 10rem);

    /* Cancels the heading's hold margin, leaving the shared title-to-content
       gap (4rem, of which the heading's padding-bottom already spends 1.5rem) */
    margin-top: calc(2.5rem - var(--story-heading-hold, 30rem));
  }

  .story-card {
    position: sticky;
    top: var(--story-deck-top);
  }

  .story-card + .story-card {
    margin-top: 4rem;
  }

  .story-stack-spacer {
    display: block;
    height: 8rem;
  }

  /* Each card rests a little lower than the one before, so a covered card
     keeps a visible top edge and the deck reads as depth */
  .story-card:nth-child(2) {
    top: calc(var(--story-deck-top) + 1rem);
  }

  .story-card:nth-child(3) {
    top: calc(var(--story-deck-top) + 2rem);
  }

  .story-card:nth-child(4) {
    top: calc(var(--story-deck-top) + 3rem);
  }

  .story-card:nth-child(5) {
    top: calc(var(--story-deck-top) + 4rem);
  }
}
</style>