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
          :id="`${idPrefix}-question-${index}`"
          type="button"
          :aria-expanded="openIndex === index"
          :aria-controls="`${idPrefix}-answer-${index}`"
          :class="[
            'flex w-full items-start gap-4 text-left',
            compact ? 'py-5' : 'py-5',
          ]"
          @click="toggle(index)"
        >
          <span
            :class="[
              'shrink-0 transition-colors duration-fast',
              compact ? 'mt-2' : 'mt-1.5',
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
          <span
            :class="[
              'font-display font-semibold text-[#0F0F10]',
              compact ? 'text-[28px] leading-tight' : 'text-lg sm:text-xl lg:text-[28px]',
            ]"
          >
            {{ item.question }}
          </span>
        </button>
      </dt>
      <dd
        :id="`${idPrefix}-answer-${index}`"
        role="region"
        :aria-labelledby="`${idPrefix}-question-${index}`"
        :class="[
          'grid transition-[grid-template-rows] duration-normal ease-premium motion-reduce:transition-none',
          openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ]"
      >
        <div class="overflow-hidden">
          <p
            :class="[
              'max-w-xl pl-8 text-[#505155]',
              compact ? 'pb-3 text-base font-normal leading-7' : 'pb-4 text-base leading-7',
            ]"
          >
            {{ item.answer }}
          </p>
        </div>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import type { FaqItem } from '~/types/faq'

const props = withDefaults(defineProps<{
  items: FaqItem[]
  /** Disambiguates element ids when several accordions render on one page
   *  (e.g. one per category on /faqs) — defaults preserve prior ids exactly */
  idPrefix?: string
  initialOpenIndex?: number | null
  /** Denser home-page presentation for the complete FAQ collection. */
  compact?: boolean
}>(), {
  idPrefix: 'faq',
  initialOpenIndex: 0,
  compact: false,
})

const { compact } = toRefs(props)

// Single-open accordion; the section can choose which answer is initially visible
const openIndex = ref<number | null>(props.initialOpenIndex)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
