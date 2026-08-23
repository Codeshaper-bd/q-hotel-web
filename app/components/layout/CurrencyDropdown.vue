<template>
  <div
    ref="root"
    class="relative flex items-stretch"
  >
    <button
      :id="triggerId"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-controls="listId"
      :class="[
        'inline-flex items-center gap-1.5  border px-3.5 py-1.5 text-sm font-medium uppercase leading-6 transition-colors duration-fast xl:px-4',
        hasSolidBackground
          ? (isOpen
              ? 'border-[#0F0F10] text-[#0F0F10]'
              : 'border-[#0F0F10] text-[#0F0F10] hover:border-[#0F0F10]/60 hover:text-[#0F0F10]/70')
          : (isOpen
              ? 'border-[#A75B27] text-[#A75B27]'
              : 'border-[#DFA558] text-white')
      ]"
      @click="toggle"
      @keydown.escape="close"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="tracking-wide">{{ selected.code }}</span>
      <svg
        :class="[
          'h-4 w-4 shrink-0 transition-transform duration-fast',
          isOpen
            ? 'rotate-180 text-[#A75B27]'
            : hasSolidBackground ? 'text-[#0F0F10]' : 'text-white',
        ]"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 4.5l3 3 3-3"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <Transition name="nav-panel">
      <div
        v-if="isOpen"
        :id="listId"
        ref="list"
        role="listbox"
        :aria-label="`Currency selection, current: ${selected.label}`"
        :aria-activedescendant="activeId"
        tabindex="-1"
        class="absolute right-0 top-full z-50 mt-2 w-[200px]"
      >
        <span
          class="absolute -top-1 right-[18px] h-2.5 w-2.5 rotate-45 border-l border-t border-paper/10 bg-ink"
          aria-hidden="true"
        />
        <ul
          class="relative overflow-hidden border border-paper/10 bg-ink p-1.5 shadow-2xl"
        >
          <li
            v-for="(currency, index) in currencies"
            :id="`${listId}-opt-${currency.code}`"
            :key="currency.code"
            role="option"
            :aria-selected="currency.code === selected.code"
            :class="[
              'flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition-colors duration-fast focus-visible:bg-paper/5 focus-visible:text-paper',
              currency.code === selected.code ? 'text-copper' : 'text-paper/60 hover:bg-paper/5 hover:text-paper',
            ]"
            @click="select(currency)"
            @mousemove="activeIndex = index"
          >
            <span class="w-9 shrink-0 font-semibold">{{ currency.code }}</span>
            <span class="truncate">{{ currency.label }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Currency {
  code: string
  label: string
}

const props = defineProps<{
  hasSolidBackground: boolean
}>()

const CURRENCIES: Currency[] = [
  { code: "USD", label: "US Dollar" },
  { code: "BDT", label: "Bangladeshi Taka" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "British Pound" },
  { code: "AED", label: "UAE Dirham" },
  { code: "SGD", label: "Singapore Dollar" },
]

const currencies = CURRENCIES
const triggerId = "currency-trigger"
const listId = "currency-list"

const root = ref<HTMLElement | null>(null)
const list = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const activeIndex = ref(0)

const selected = ref<Currency>(currencies[0]!)

const activeId = computed(() =>
  isOpen.value ? `${listId}-opt-${currencies[activeIndex.value]!.code}` : undefined,
)

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle() {
  isOpen.value ? close() : open()
}

function select(currency: Currency) {
  selected.value = currency
  close()
}

function handleDocumentClick(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) {
    close()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return
  if (event.key === "ArrowDown") {
    event.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % currencies.length
  } else if (event.key === "ArrowUp") {
    event.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + currencies.length) % currencies.length
  } else if (event.key === "Home") {
    event.preventDefault()
    activeIndex.value = 0
  } else if (event.key === "End") {
    event.preventDefault()
    activeIndex.value = currencies.length - 1
  } else if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    select(currencies[activeIndex.value]!)
  }
}

watch(isOpen, (opened) => {
  if (opened) {
  activeIndex.value = currencies.findIndex(
    (c) => c.code === selected.value.code,
  )
  activeIndex.value = activeIndex.value < 0 ? 0 : activeIndex.value!
    nextTick(() => list.value?.focus())
  }
})

onMounted(() => {
  document.addEventListener("click", handleDocumentClick)
  window.addEventListener("keydown", handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick)
  window.removeEventListener("keydown", handleKeydown)
})
</script>
