<template>
  <NuxtLink
    to="/"
    class="flex shrink-0 items-center"
    aria-label="Q Hotel Dhaka — home"
  >
    <!-- Static lockup per Figma: white on the transparent/dark header,
         inverted to ink so it stays legible once the header goes solid. -->
    <div :class="['aspect-[214/38] h-7 w-auto sm:h-8', tone === 'on-light' ? 'logo-on-light' : '']">
      <BaseImage
        src="/images/brand/q-hotel-logo_transparent.png"
        alt="Q Hotel Dhaka"
        :width="214"
        :height="38"
        fit="contain"
        priority
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
// Surface behind the logo: the lockup is a single white asset, inverted to
// ink via CSS filter once the header goes solid over the paper background
withDefaults(defineProps<{
  tone?: 'on-dark' | 'on-light'
}>(), {
  tone: 'on-dark',
})
</script>

<style scoped>
.logo-on-light {
  filter: brightness(0) saturate(100%);
}
</style>
