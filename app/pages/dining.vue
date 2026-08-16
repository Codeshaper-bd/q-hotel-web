<template>
  <div>
    <PageBanner
      title="Savor Every Moment"
      description="From international favorites to local delicacies, our restaurants and lounges offer exceptional dining experiences in elegant settings."
      image="/images/dining/dining-hero.png"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Dining' },
      ]"
      title-class="lg:text-[72px] font-bold  text-white"
      description-class="max-w-[830px]"
    >
    </PageBanner>
    <DiningVenues />
    <FaqSection page="dining" />
    <div class="h-20"></div>
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'Dining',
  description: 'From international favorites to local delicacies, Q Hotel Dhaka restaurants and lounges offer exceptional dining experiences in elegant settings.',
  path: '/dining',
})
</script>