<template>
  <!--
    One policy row: a chevron-toggle heading over a height-animated body
    (same grid-template-rows technique as FaqAccordion, so no answer height
    is ever hardcoded). Unlike the FAQ accordion, sections here open
    independently rather than one-at-a-time — a guest may want several
    policies visible while reading through the booking terms.
  -->
  <div class="border-b border-line py-8 first:pt-0 last:border-b-0">
    <button
      type="button"
      :aria-expanded="modelValue"
      :aria-controls="bodyId"
      class="flex w-full items-center justify-between gap-4 text-left"
      @click="emit('update:modelValue', !modelValue)"
    >
      <span class="font-display text-2xl sm:text-3xl md:text-[32px] font-semibold text-[#0F0F10]">{{ title }}</span>
      <svg
        class="h-6 w-6 shrink-0 text-ink/50 transition-transform duration-normal ease-premium motion-reduce:transition-none"
        :class="modelValue ? 'rotate-180' : ''"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.4"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <div
      :id="bodyId"
      role="region"
      :class="[
        'grid transition-[grid-template-rows] duration-normal ease-premium motion-reduce:transition-none',
        modelValue ? 'mt-6 grid-rows-[1fr]' : 'grid-rows-[0fr]',
      ]"
    >
      <div class="overflow-hidden">
        <div class="space-y-4 text-sm leading-7 text-ink/65">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const bodyId = `booking-policy-${useId()}`
</script>
