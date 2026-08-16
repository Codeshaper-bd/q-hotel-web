<script setup lang="ts">
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Plot+C-11,+Block+A,+Sector+1,+Purbachal+Road,+Dhaka+1229";
</script>

<template>
  <!--
    Two stacked info cards beside the room list: a hotel summary (photo,
    description, contact, TripAdvisor rating) and a static policy list.
    Plain white cards on the page's paper background — no photography-driven
    layout here, just reference information a guest checks while browsing.
  -->
  <aside class="flex flex-col gap-6" aria-label="Hotel information">
    <div class="bg-white p-5">

      <h3 class="font-display text-xl lg:text-[28px] font-semibold text-[#0F0F10]">
        Hotel Information
      </h3>
      <div class="h-px bg-[#0F0F10] mt-0.5 w-[110px] mb-7"></div>
      <ul class="mt-4 space-y-3 text-base text-ink/75">
        <li class="flex items-center gap-2.5">
          <CheckInClock />

          <span>Check-in: 2:00 pm</span>
        </li>
        <li class="flex items-center gap-2.5">
          <CheckOutClock />

          <span>Check-out: 12:00 pm</span>
        </li>
        <li class="flex items-center gap-2.5">
          <EighteenPlus />

          <span>Minimum age to Check In 18</span>
        </li>
        <li class="flex items-center gap-2.5">
          <NoPets />

          <span>Pets are not allowed.</span>
        </li>
        <li class="flex items-center gap-2.5">
          <ParkingSign />

          <span>Complimentary On-Site Parking</span>
        </li>
        <li class="flex items-center gap-2.5">
          <IdCard />

          <span>Valid identification required at check-in</span>
        </li>
      </ul>
      <div class="h-px bg-[#50515526] my-6"></div>

      <h3 class="font-display text-xl lg:text-[28px] font-semibold text-[#0F0F10]">
        Contact Information
      </h3>
      <div class="h-px bg-[#0F0F10] mt-0.5 w-[110px] mb-8"></div>
      <ul class="mt-5 space-y-3 text-base text-[#373737]">
        <li class="flex items-center gap-2.5">
          <Phone />

          <a class="transition-colors duration-fast hover:text-copper" href="tel:+8801866227696">01866-227696</a>
        </li>
        <li class="flex items-center gap-2.5">
          <Mail />

          <a class="transition-colors duration-fast hover:text-copper" href="mailto:info@qhl.com.bd">info@qhl.com.bd</a>
        </li>
        <li class="flex items-center gap-2.5">
          <MapPin />

          <a class="transition-colors duration-fast hover:text-copper" :href="directionsUrl" target="_blank"
            rel="noopener noreferrer">Visit Map</a>
        </li>
      </ul>
    </div>

  </aside>
</template>
