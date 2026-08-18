<template>
  <div>
    <PageBanner title="Privacy Policy" :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]"
      image="/images/terms/priveccy-hero-bannar.png" />
  
    <PrivacyPolicyContent />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: "Privacy Policy",
  description:
    "How Q Hotel Dhaka collects, uses, and protects your personal information, and the choices you have about your data.",
  path: "/privacy-policy",
});
</script>