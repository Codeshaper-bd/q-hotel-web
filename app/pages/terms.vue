<template>
  <div>
    <PageBanner
      title="Terms & Conditions"
      :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]"
      image="/images/terms/priveccy-hero-bannar.png"
    />
    <TermsConditionsHero />
    <TermsConditionsContent />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions of Q Hotel Dhaka — reservations, room rates, taxes, payment, cancellation, check-in and check-out, policies, and guest conduct.",
  path: "/terms",
});
</script>