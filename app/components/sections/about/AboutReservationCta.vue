<template>
  <BaseSection tone="paper" spacing="lg" container-size="xl">
    <div class="flex flex-col items-center text-center">
      <BaseKicker>Room Booking</BaseKicker>
      <h2 class="mt-6 font-display text-4xl text-ink sm:text-5xl">
        Make a Reservation Today
      </h2>

      <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
        <BaseArrowCta to="#reserve" variant="gold">
          Reserve Now
        </BaseArrowCta>
        <BaseArrowCta to="/long-stay" variant="ghost">
          Long Stays
        </BaseArrowCta>
      </div>
    </div>
  </BaseSection>
</template>
