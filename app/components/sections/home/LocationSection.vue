<script setup lang="ts">
const { hotel, attractions } = useNearbyAttractions();
</script>

<template>
  <!--
    Explore / Location: the hotel's interactive night map as a full-bleed
    backdrop. Landmarks are pins; hovering or clicking one opens its card on
    the map. The map's fallback card keeps the address readable as real HTML
    when the map is still loading or fails.
  -->
  <section
    id="location"
    aria-labelledby="location-title"
    class="relative isolate overflow-hidden bg-night text-paper"
  >
    <!-- Heading sits above the map on the section's own night colour; the
         map's top edge feathers into that same colour, so the two read as one
         surface rather than a title stacked on a panel -->
    <BaseContainer size="xl" class="relative z-10 pt-20 sm:pt-24">
      <FadeReveal>
        <h2
          id="location-title"
          class="text-center font-display text-4xl font-normal text-paper sm:text-5xl lg:text-[56px]"
        >
          Explore Q Hotel Dhaka
        </h2>
      </FadeReveal>
    </BaseContainer>

    <!-- The map eases in as a whole (fade only — no travel, so its pins and
         card positions never visibly drift) -->
    <FadeReveal direction="none" :duration="1.2" start="top 90%" class="relative -mt-4 h-[36rem] sm:h-[42rem] lg:h-[48rem]">
      <LocationMap
        class="absolute inset-0"
        :hotel="hotel"
        :attractions="attractions"
      />
    </FadeReveal>
  </section>
</template>
