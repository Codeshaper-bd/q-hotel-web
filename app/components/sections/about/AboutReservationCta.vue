<template>
  <BaseSection tone="paper" spacing="lg" container-size="xl" class="!pt-4 sm:!pt-5">
    <div class="flex flex-col items-center text-center">
      <BaseKicker>Room Booking</BaseKicker>
      <h2 class="mt-6 font-display text-4xl  sm:text-5xl lg:text-[56px] text-[#0F0F10]">
        Make a Reservation Today
      </h2>

      <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
        <BaseArrowCta to="/rooms" variant="gold">
          Reserve Now
        </BaseArrowCta>
        <BaseArrowCta
          to="/long-stay"
          variant="ghost"
          border-class="!border-[#D78C38] group-hover:!border-[#D78C38] group-focus-visible:!border-[#D78C38]"
        >
          Long Stays
        </BaseArrowCta>
      </div>
    </div>
  </BaseSection>
</template>
