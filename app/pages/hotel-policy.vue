<template>
  <div>
    <PageBanner
      title="Hotel Policy"
      :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Hotel Policy' }]"
      image="/images/terms/priveccy-hero-bannar.png"
    />

    <HotelPolicyContent />
    <div class="h-10"></div>
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: "Hotel Policy",
  description:
    "Read the guest policies of Q Hotel Dhaka — check-in and check-out times, reservation, cancellation, payment, smoking, pet, and house rules.",
  path: "/hotel-policy",
});
</script>
