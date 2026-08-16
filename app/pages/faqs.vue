<template>
  <div>
    <PageBanner
      title="Frequently Asked Questions"
      :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'FAQs' }]"
      image="/images/faq/hero-terrace.jpg"
      title-class="max-w-[480px] font-display text-3xl lg:text-[72px] lg:leading-[80px] font-bold text-white"
    />
    <FaqsCategoryList />
    <FaqsContactCta />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: "FAQs",
  description:
    "Find answers to frequently asked questions about booking, rooms, dining, policies, and getting to Q Hotel Dhaka.",
  path: "/faqs",
});
</script>
