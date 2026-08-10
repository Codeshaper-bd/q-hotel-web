<template>
  <!--
    Stay More, Save More: a dark length-of-stay discount table beside the
    same skyline line-art used on the home page's Facilities section (the
    Figma file reuses that exact illustration here too, just cropped to a
    709x508 window and anchored bottom-left, mostly clipped by the section).
  -->
  <section aria-labelledby="long-stay-savings-title" class="relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32">
    <div class="pointer-events-none absolute -bottom-[252px] -left-[73px] -z-10 hidden h-[508px] w-[709px] overflow-hidden lg:block" aria-hidden="true">
      <img
        src="/images/facilities-skyline.svg"
        alt=""
        width="916"
        height="508"
        loading="lazy"
        class="absolute left-[-207px] top-0 h-[508px] w-[916px] max-w-none"
      >
    </div>

    <BaseContainer size="xl">
      <FadeReveal>
        <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-4">
            <p class="text-sm font-medium uppercase tracking-[0.06em] text-flame">Longer Stay, Greater Savings</p>
            <h2 id="long-stay-savings-title" class="mt-3 font-display text-4xl font-semibold text-paper sm:text-5xl lg:text-[56px] lg:leading-[66px]">
              Stay More, Save More
            </h2>
            <p class="mt-4 text-base leading-6 text-paper/80">
              Enjoy exclusive discounts designed for extended stays
            </p>
            <p class="mt-6 flex items-center gap-1.5 text-sm text-paper/70">
              <svg class="h-[18px] w-[18px] shrink-0" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="8.5" stroke="#C9752D" />
                <path d="M7.5 10L10.5 7M7.75 7.25H7.755M10.25 9.75H10.255M12.5 13.5V5.5C12.5 5.23478 12.3946 4.98043 12.2071 4.79289C12.0196 4.60536 11.7652 4.5 11.5 4.5H6.5C6.23478 4.5 5.98043 4.60536 5.79289 4.79289C5.60536 4.98043 5.5 5.23478 5.5 5.5V13.5L7.25 12.5L9 13.5L10.75 12.5L12.5 13.5ZM8 7.25C8 7.3163 7.97366 7.37989 7.92678 7.42678C7.87989 7.47366 7.8163 7.5 7.75 7.5C7.6837 7.5 7.62011 7.47366 7.57322 7.42678C7.52634 7.37989 7.5 7.3163 7.5 7.25C7.5 7.1837 7.52634 7.12011 7.57322 7.07322C7.62011 7.02634 7.6837 7 7.75 7C7.8163 7 7.87989 7.02634 7.92678 7.07322C7.97366 7.12011 8 7.1837 8 7.25ZM10.5 9.75C10.5 9.8163 10.4737 9.87989 10.4268 9.92678C10.3799 9.97366 10.3163 10 10.25 10C10.1837 10 10.1201 9.97366 10.0732 9.92678C10.0263 9.87989 10 9.8163 10 9.75C10 9.6837 10.0263 9.62011 10.0732 9.57322C10.1201 9.52634 10.1837 9.5 10.25 9.5C10.3163 9.5 10.3799 9.52634 10.4268 9.57322C10.4737 9.62011 10.5 9.6837 10.5 9.75Z" stroke="#FF9405" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              All rates are inclusive of taxes
            </p>
          </div>

          <div class="lg:col-span-8">
            <div class="border border-[#505155]">
              <table class="w-full border-collapse text-left">
                <caption class="sr-only">Discount by length of stay</caption>
                <thead>
                  <tr class="bg-[#E9C588] text-ink">
                    <th scope="col" class="px-6 py-5 text-center text-sm font-medium uppercase">Length of Stay</th>
                    <th scope="col" class="px-6 py-5 text-center text-sm font-medium uppercase">Discount on Best Available Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tier in discountTiers" :key="tier.nights" class="border-t border-paper/10">
                    <td class="border-r border-paper/10 px-6 py-[30px] text-center text-sm text-paper">{{ tier.nights }}</td>
                    <td class="px-6 py-[30px] text-sm text-flame">{{ tier.discount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="mt-4 flex items-center gap-1.5 bg-[#373737] px-5 py-5 text-sm text-paper">
              <svg class="h-4 w-4 shrink-0" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="6" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.5 9.166h.007v.007H6.5v-.007Z" stroke="white" stroke-width="2.25" stroke-linejoin="round" />
                <path d="M6.5 6.5V3.834" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
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
