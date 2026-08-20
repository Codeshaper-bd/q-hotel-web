<!--
  Dining venue card: photo collage (main image + top/bottom pair),
  intro copy, info card, and details grid — one venue per card, driven
  by `name` and `image` so callers can loop their venue data.
-->
<template>
  <div :id="id" class="scroll-mt-24 bg-[#FDFBF7] py-10 px-10">
    <FadeReveal>
      <div class="flex flex-wrap items-center gap-4 sm:gap-6">
        <h2 class="text-[44px] font-semibold text-[#000000]">{{ name }}</h2>
        <span
          v-if="reservationRecommended"
          class="inline-flex items-center gap-2 border border-copper px-4 py-2 text-sm font-medium uppercase text-copper"
        >
          <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
            <path d="m10 1.5 2.55 5.17 5.7.83-4.13 4.02.98 5.68L10 14.52 4.9 17.2l.98-5.68L1.75 7.5l5.7-.83L10 1.5Z" />
          </svg>
          Reservation Recommended
        </      span>
      </div>
      <p class="text-sm text-[#A75B27] uppercase">all-day dining</p>
    </FadeReveal>

    <FadeReveal direction="up" :distance="32" start="top 92%">
      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <!-- Left column: main image, fixed 740px on desktop -->
        <div class="col-span-2 md:col-span-1">
          <div class="aspect-[4/3] md:aspect-auto md:h-[560px] lg:h-[740px]">
            <BaseImage
              :src="mainImage"
              :alt="`${name} at Q Hotel Dhaka`"
              :width="1200"
              :height="900"
              sizes="xs:100vw sm:100vw lg:50vw"
            />
          </div>
        </div>

        <!-- Right column: top + bottom, combined height equals the main image -->
        <div class="col-span-2 flex flex-col gap-4 md:col-span-1">
          <FadeReveal direction="up" :distance="24" start="top 92%">
            <div class="h-64 sm:h-80 md:h-[272px] lg:h-[362px]">
              <BaseImage
                :src="topImage"
                alt="Q Hotel rooftop lounge and bar at dusk"
                :width="800"
                :height="600"
                sizes="xs:100vw sm:100vw lg:50vw"
              />
            </div>
          </FadeReveal>

          <FadeReveal direction="up" :distance="24" start="top 92%">
            <div class="h-64 sm:h-80 md:h-[272px] lg:h-[362px]">
              <BaseImage
                :src="bottomImage"
                alt="Q Hotel café with marble tables and patisserie counter"
                :width="800"
                :height="600"
                sizes="xs:100vw sm:100vw lg:50vw"
              />
            </div>
          </FadeReveal>
        </div>
      </div>
    </FadeReveal>

    <FadeReveal direction="up" :distance="28" start="top 92%">
      <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div class="col-span-2 md:col-span-1">
        <div class="bg-[#FCF8F0] p-5">
          <h3 class="mb-2 font-display text-2xl font-semibold text-[#0F0F10]">
            A vibrant all-day dining restaurant featuring an extensive menu of
            international and local favorites.
          </h3>
          <p class="text-sm text-[#505155]">
            Enjoy a diverse culinary experience inspired by international
            favorites and authentic local flavors. From fresh breakfasts and
            leisurely brunches to flavorful lunches, elegant dinners, high
            tea, and refreshing cocktails, every meal is thoughtfully prepared
            for every taste and occasion.
          </p>
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <BaseInfoCard
          :items="[
            {
              label: 'Contact',
              lines: ['Phone: +88-01713377700', 'Email: info@qhl.com.bd'],
              icon: IconContact,
            },
            {
              label: 'Opening Hours',
              value: '6:00 AM to 11:00 PM',
              icon: IconClock,
            },
            {
              label: 'Dress Code',
              value: 'Smart casual',
              icon: IconDressCode,
            },
          ]"
        />
      </div>
    </div>
    </FadeReveal>

    <FadeReveal direction="up" :distance="28" start="top 92%">
      <div class="h-11"></div>
      <BaseDetailsGrid
      :items="[
        {
          label: 'Cuisine',
          values: [
            'Indian',
            'Indonesian',
            'Irish',
            'Italian',
            'Japanese',
            'Mediterranean',
            'Mexican',
            'Middle Eastern',
            'Pizza',
            'Seafood',
            'Steakhouse',
            'Sushi',
            'Tex-Mex',
            'Thai',
            'Local',
            'Asian',
            'International',
            'European',
          ],
          icon: IconCuisine,
        },
        {
          label: 'Open For (Everyday)',
          values: [
            'Breakfast',
            'Brunch',
            'Lunch',
            'Dinner',
            'High Tea',
            'Cocktail Hour',
          ],
          icon: IconClock,
          iconProps: { color: '#A75B27' },
        },
        {
          label: 'Ambience',
          values: ['Family-friendly', 'Traditional', 'Modern', 'Romantic'],
          icon: IconAmbience,
        },
        {
          label: 'Dietary Options',
          values: [
            'Halal',
            'Kosher',
            'Vegetarian',
            'Vegan',
            'Gluten-free',
            'Dairy-free',
          ],
          icon: IconClock,
          iconProps: { color: '#A75B27' },
        },
      ]"
    />
      <div class="mt-8 md:ml-[calc(50%+1.25rem)]">
        <BaseArrowCta variant="gold" @click="isReservationOpen = true">
          Book a Table
        </BaseArrowCta>
      </div>
    </FadeReveal>

    <RestaurantReservationModal
      v-model="isReservationOpen"
      :restaurant-name="name"
      :restaurant-image="mainImage"
      phone-number="+88-01713377700"
      @submit="handleReservationSubmit"
    />

    <ReservationSubmittedModal
      v-model="isSubmittedOpen"
      :details="submittedDetails"
    />
  </div>
</template>

<script setup lang="ts">
import type { RestaurantReservationData, ReservationDetails } from "~/types/dining";
import IconContact from "~/components/base/IconContact.vue";
import IconClock from "~/components/base/IconClock.vue";
import IconDressCode from "~/components/base/IconDressCode.vue";
import IconCuisine from "~/components/base/IconCuisine.vue";
import IconAmbience from "~/components/base/IconAmbience.vue";

const props = defineProps<{
  id: string
  name: string
  mainImage: string
  topImage: string
  bottomImage: string
  reservationRecommended?: boolean
}>()

const isReservationOpen = ref(false)
const isSubmittedOpen = ref(false)
const submittedDetails = ref<ReservationDetails | undefined>(undefined)

function handleReservationSubmit(data: RestaurantReservationData) {
  submittedDetails.value = {
    date: formatDate(data.date),
    time: formatTime(data.time),
    guests: `${data.guests} ${data.guests === '1' ? 'Guest' : 'Guests'}`,
    restaurant: props.name,
    referenceId: `QHD-${data.date.replaceAll('-', '').slice(2)}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
  }
  isReservationOpen.value = false
  isSubmittedOpen.value = true
}

/** "2025-05-24" -> "May 24, 2025" */
function formatDate(value: string) {
  if (!value) {
    return ''
  }
  const [year, month, day] = value.split('-')
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .format(new Date(Number(year), Number(month) - 1, Number(day)))
}

/** "19:00" -> "7:00 PM" */
function formatTime(value: string) {
  if (!value) {
    return ''
  }
  const [hours, minutes] = value.split(':')
  const period = Number(hours) >= 12 ? 'PM' : 'AM'
  const hour = Number(hours) % 12 || 12
  return `${hour}:${String(minutes).padStart(2, '0')} ${period}`
}
</script>
