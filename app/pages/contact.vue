<template>
  <div>
    <PageBanner
      title="Contact Us"
      image="/images/contact/hero-lounge.jpg"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Contact' },
      ]"
    />
    <ContactSection />
    <ContactMapSection />
    <div class="h-10"></div>
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'Contact Us',
  description: 'Get in touch with Q Hotel Dhaka — request information, find our address and contact details, or get directions to the hotel.',
  path: '/contact'
})
</script>
