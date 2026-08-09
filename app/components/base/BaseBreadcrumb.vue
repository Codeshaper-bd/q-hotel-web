<template>
  <!--
    Semantic breadcrumb trail used across secondary page hero banners: a home
    glyph before the first item, the signature arrow between items, and the
    last item rendered as a plain span marked aria-current="page". Items with
    a `to` render as NuxtLinks, so deeper trails (e.g. Rooms > Room Name) work
    without duplicating markup.
  -->
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center gap-2 text-lg font-medium text-paper/70">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-2"
        :class="isLast(item, index) ? 'text-paper' : undefined"
        :aria-current="isLast(item, index) ? 'page' : undefined"
      >
        <svg
          v-if="index === 0"
          class="h-3.5 w-3.5 text-paper/70"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2 7.5L8 2l6 5.5M3.5 6.5V13a.5.5 0 00.5.5h3v-4h2v4h3a.5.5 0 00.5-.5V6.5"
          />
        </svg>
        <svg
          v-else
          class="h-3 w-3 text-paper/50"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.66602 8H4.33268M9.33268 12L13.3327 8L9.33268 4M13.3327 8H6.33268"
          />
        </svg>
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="transition-colors duration-fast hover:text-champagne"
          >{{ item.label }}</NuxtLink
        >
        <span v-else>{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
type BreadcrumbItem = {
  label: string
  to?: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

function isLast(item: BreadcrumbItem, index: number): boolean {
  return index === props.items.length - 1
}
</script>
