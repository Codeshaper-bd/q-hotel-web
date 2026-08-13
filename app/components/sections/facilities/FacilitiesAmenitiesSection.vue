<template>
  <section aria-labelledby="facilities-amenities-title" class="pt-20 text-ink sm:pt-24">
    <BaseContainer size="xl">
      <FadeReveal>
        <div class="text-center">
          <BaseKicker>Facilities</BaseKicker>
          <h2 id="facilities-amenities-title" class="mt-5 font-display text-4xl font-semibold sm:text-5xl">
            Our Hotel Facilities
          </h2>
        </div>
      </FadeReveal>

      <FadeReveal :stagger="0.045" :distance="24">
        <div class="mt-12 grid gap-1.5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          <div data-reveal-item
            class="flex min-h-72 flex-col justify-center px-5 py-10 sm:px-8 lg:aspect-[4/5] lg:px-5 xl:px-8">
            <h3 class="font-display text-xl lg:text-[28px] text-[#A75B27] font-semibold">
              Everything You Need,<br />All in One Place
            </h3>
            <div class="mt-4 h-1 w-20 bg-[#C9752D]"></div>
            <p class="mt-6 text-sm leading-6 text-[#373737]">
              Thoughtfully designed facilities make your stay more comfortable,
              convenient, and memorable.
            </p>
          </div>

          <div v-for="(facility, index) in facilities" :key="facility.title" data-reveal-item>
            <article class="group relative isolate aspect-[4/5] overflow-hidden text-paper">
              <BaseImage :src="facility.image" :alt="facility.title" :width="640" :height="800"
                sizes="xs:100vw sm:50vw lg:25vw"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.035]" />

              <div class="absolute inset-x-0 bottom-0 z-10 px-6 pb-12">
                <div class="py-1.5 px-2.5 bg-[#23272E] inline-block">
                  <component v-if="facility.icon" :is="facility.icon" class="size-8" aria-hidden="true" />
                  <p v-if="facility.icon" class="mt-3 text-center text-sm  text-white" aria-hidden="true">
                    {{ String(index + 1).padStart(2, "0") }}
                  </p>
                </div>

                <h3 class="mt-4 font-display text-xl lg:text-[28px] text-[#EED4A3] font-semibold">
                  {{ facility.title }}
                </h3>
                <p class="mt-4 text-sm text-white/80">
                  {{ facility.description }}
                </p>
              </div>
            </article>
          </div>

        </div>
      </FadeReveal>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import Car from "~/components/icons/Car.vue";
import Parking from "~/components/icons/Parking.vue";
import Dining from "~/components/icons/Dining.vue";
import SwimmingPool from "~/components/icons/SwimmingPool.vue";
import Wellness from "~/components/icons/Wellness.vue";
import Breakfast from "~/components/icons/Breakfast.vue";
import Wifi from "~/components/icons/Wifi.vue";
import Iptv from "~/components/icons/Iptv.vue";
import Security from "~/components/icons/Security.vue";
import BarCup from "~/components/icons/BarCup.vue";
import Laundry from "~/components/icons/Laundry.vue";
import Building from "~/components/icons/Building.vue";
import Housekeeping from "~/components/icons/Housekeeping.vue";
import ButlerService from "~/components/icons/ButlerService.vue";

interface Facility {
  title: string;
  description: string;
  image: string;
  icon?: Component;
}

const facilities: Facility[] = [
  {
    title: "Airport Shuttle",
    description:
      "Private airport transfers make every arrival and departure seamless.",
    image: "/images/facilities/airport-shuttle.png",
    icon: Car,
  },
  {
    title: "Parking",
    description:
      "Secure on-site parking with attentive assistance throughout your stay.",
    image: "/images/facilities/parking.png",
    icon: Parking,
  },
  {
    title: "Dining",
    description:
      "Enjoy memorable dining experiences, from local favourites to international cuisine.",
    image: "/images/facilities/dining.png",
    icon: Dining,
  },
  {
    title: "Swimming Pool",
    description:
      "Take a refreshing swim and relax beside the pool in a calm setting.",
    image: "/images/facilities/swimming-pool.png",
    icon: SwimmingPool,
  },
  {
    title: "Wellness",
    description:
      "Restore your energy with relaxing treatments in our dedicated wellness spaces.",
    image: "/images/facilities/wellness.png",
    icon: Wellness,
  },
  {
    title: "Breakfast",
    description:
      "Begin each morning with a generous selection of fresh local and continental dishes.",
    image: "/images/facilities/breakfast.png",
    icon: Breakfast,
  },
  {
    title: "Wi-Fi",
    description:
      "Stay connected with complimentary high-speed internet across the hotel.",
    image: "/images/facilities/wifi.png",
    icon: Wifi,
  },
  {
    title: "IP TV & Personal Assistance",
    description:
      "In-room entertainment and personal assistance keep every stay effortless.",
    image: "/images/facilities/iptv.png",
    icon: Iptv,
  },
  {
    title: "24-Hour Security",
    description:
      "Trained personnel and CCTV monitoring provide reassurance around the clock.",
    image: "/images/facilities/security.png",
    icon: Security,
  },
  {
    title: "Mini Bar",
    description:
      "Enjoy a carefully selected range of refreshments in the comfort of your room.",
    image: "/images/facilities/minibar.png",
    icon: BarCup,
  },
  {
    title: "Valet Laundry",
    description:
      "Professional laundry, dry-cleaning, and pressing services keep you looking your best.",
    image: "/images/facilities/valet-laundry.png",
    icon: Laundry,
  },
  {
    title: "Business Center",
    description:
      "Enjoy a fresh, clean, and comfortable room throughout your stay with our attentive and reliable daily housekeeping service.",
    image: "/images/facilities/house-keeping.png",
    icon: Building,
  },
  {
    title: "Housekeeping",
    description:
      "Stay productive while traveling with convenient business facilities designed for work and professional needs.",
    image: "/images/facilities/house-keeping.png",
    icon: Housekeeping,
  },
  {
    title: "Butler Service",
    description:
      "Warm, professional service anticipates your needs throughout every stay.",
    image: "/images/facilities/butler-service.png",
    icon: ButlerService,
  },
  {
    title: "",
    description: "",
    image: "/images/facilities/building.png",
  },
];
</script>
