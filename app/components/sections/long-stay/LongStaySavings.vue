<template>
  <!--
    Stay More, Save More: a dark length-of-stay discount table beside the
    skyline line-art already used on the home page's Facilities section —
    reused here rather than redrawing Figma's bespoke illustration.
  -->
  <section aria-labelledby="long-stay-savings-title" class="relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32">
    <img
      src="/images/facilities-skyline.svg"
      alt=""
      width="916"
      height="508"
      loading="lazy"
      class="pointer-events-none absolute bottom-0 -left-[10%] -z-10 hidden w-[60rem] opacity-40 lg:block"
      aria-hidden="true"
    >

    <BaseContainer size="xl">
      <FadeReveal>
        <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-4">
            <p class="text-sm font-medium uppercase tracking-[0.06em] text-flame">Longer Stay, Greater Savings</p>
            <h2 id="long-stay-savings-title" class="mt-3 font-display text-4xl text-paper sm:text-5xl">
              Stay More, Save More
            </h2>
            <p class="mt-4 text-base leading-7 text-paper/75">
              Enjoy exclusive discounts designed for extended stays.
            </p>
            <p class="mt-6 flex items-center gap-2.5 text-sm text-paper/70">
              <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-champagne/50 text-champagne" aria-hidden="true">
                <svg class="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 5.5v3M8 11h.01" />
                </svg>
              </span>
              All rates are inclusive of taxes
            </p>
          </div>

          <div class="lg:col-span-8">
            <table class="w-full border-collapse text-left">
              <caption class="sr-only">Discount by length of stay</caption>
              <thead>
                <tr class="bg-champagne text-night">
                  <th scope="col" class="px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em]">Length of Stay</th>
                  <th scope="col" class="px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em]">Discount on Best Available Rate</th>
                </tr>
              </thead>
              <tbody class="bg-night/40">
                <tr v-for="tier in discountTiers" :key="tier.nights" class="border-b border-paper/10 last:border-b-0">
                  <td class="px-6 py-5 text-sm text-paper">{{ tier.nights }}</td>
                  <td class="px-6 py-5 text-sm font-semibold text-flame">{{ tier.discount }}</td>
                </tr>
              </tbody>
            </table>

            <p class="mt-4 flex items-start gap-2.5 border border-paper/10 bg-paper/5 px-5 py-4 text-sm text-paper/70">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-champagne" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" />
                <path stroke-linecap="round" d="M8 7v4M8 5.2h.01" />
              </svg>
              Rates vary by room type, season, and availability. Contact us for a personalized offer.
            </p>
          </div>
        </div>
      </FadeReveal>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
interface DiscountTier {
  nights: string
  discount: string
}

const discountTiers: DiscountTier[] = [
  { nights: '10-14 Nights', discount: '10% Off' },
  { nights: '15-20 Nights', discount: '15% Off' },
  { nights: '21-29 Nights', discount: '20% Off' },
  { nights: '30+ Nights', discount: '25% Off' },
]
</script>
