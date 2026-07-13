<template>
  <!--
    Single-open FAQ accordion. Semantic dl with real buttons, aria-expanded /
    aria-controls, and a grid-rows height animation so no answer height is ever
    hardcoded. Each row carries data-faq-reveal so the section's scroll timeline
    can stage the rows in; the accordion itself never depends on that animation.
  -->
  <dl class="border-t border-line/70">
    <div
      v-for="(item, index) in items"
      :key="item.question"
      data-faq-reveal
      class="border-b border-line/70"
    >
      <dt>
        <button
          :id="`faq-question-${index}`"
          type="button"
          :aria-expanded="openIndex === index"
          :aria-controls="`faq-answer-${index}`"
          class="flex w-full items-center gap-4 py-5 text-left"
          @click="toggle(index)"
        >
          <span
            :class="[
              'shrink-0 transition-colors duration-fast',
              openIndex === index ? 'text-copper' : 'text-ink/40',
            ]"
            aria-hidden="true"
          >
            <svg
              class="h-4 w-4 transition-transform duration-normal ease-premium motion-reduce:transition-none"
              :class="openIndex === index ? 'rotate-45' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path stroke-linecap="round" d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span class="font-display text-lg text-ink sm:text-xl">
            {{ item.question }}
          </span>
        </button>
      </dt>
      <dd
        :id="`faq-answer-${index}`"
        role="region"
        :aria-labelledby="`faq-question-${index}`"
        :class="[
          'grid transition-[grid-template-rows] duration-normal ease-premium motion-reduce:transition-none',
          openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ]"
      >
        <div class="overflow-hidden">
          <p class="max-w-xl pb-6 pl-8 text-sm leading-7 text-ink/60">
            {{ item.answer }}
          </p>
        </div>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import type { FaqItem } from '~/types/faq'

defineProps<{
  items: FaqItem[]
}>()

// Single-open accordion; first item open by default
const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
