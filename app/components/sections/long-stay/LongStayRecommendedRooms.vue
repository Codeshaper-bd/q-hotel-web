<template>
  <!-- Recommended Rooms & Suites: reuses the /rooms listing's RoomListCard
       and shared catalog, filtered to the rooms best suited for extended
       stays, instead of introducing a parallel card component. -->
  <BaseSection id="long-stay-rooms" labelled-by="long-stay-rooms-title" tone="paper" spacing="lg" container-size="xl">
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Perfect For Long Stays</BaseKicker>
        <h2 id="long-stay-rooms-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Recommended Rooms &amp; Suites
        </h2>
      </div>
    </FadeReveal>

    <div class="mt-12 flex flex-col gap-8 lg:mt-16">
      <FadeReveal v-for="room in recommendedRooms" :key="room.id">
        <RoomListCard :room="room" />
      </FadeReveal>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
const LONG_STAY_ROOM_IDS = ['deluxe-twin', 'executive-suite', 'presidential-suite']

const rooms = useRoomsCatalog()
const recommendedRooms = LONG_STAY_ROOM_IDS
  .map(id => rooms.find(room => room.id === id))
  .filter((room): room is NonNullable<typeof room> => room !== undefined)
</script>
