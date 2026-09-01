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
      :aria-label="'Select currency, current: ' + selected.label + ' (' + selected.code + ')'"
      :class="[
        'inline-flex items-center gap-1.5 border bg-[#E9C588] px-3.5 py-1.5 text-sm font-medium uppercase leading-6 transition-colors duration-fast xl:px-4',
      ]"
      @click="toggle"
      @keydown.escape="close"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="h-3.5 w-5 shrink-0 overflow-hidden" aria-hidden="true">
        <BaseImage
          :src="selected.flagSrc"
          alt=""
          :width="20"
          :height="14"
          sizes="20px"
        />
      </span>
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
        class="absolute right-0 top-full z-50 mt-2 w-32 outline-none"
      >
        <span
          class="absolute -top-1 right-4 h-2.5 w-2.5 rotate-45 border-l border-t border-line bg-paper"
          aria-hidden="true"
        />
        <ul
          class="relative overflow-hidden rounded-sm border border-line bg-paper p-1.5 shadow-2xl space-y-0.5"
        >
          <li
            v-for="(currency, index) in currencies"
            :id="`${listId}-opt-${currency.code}`"
            :key="currency.code"
            role="option"
            :aria-selected="currency.code === selected.code"
            :aria-label="currency.label + ' (' + currency.code + ')'"
            :class="[
              'flex min-h-10 cursor-pointer items-center gap-3 rounded-[2px] px-3 text-sm font-semibold uppercase leading-5 tracking-wide outline-none transition-colors duration-fast',
              currency.code === selected.code
                ? 'bg-copper/15 text-copper'
                : index === activeIndex
                  ? 'bg-ink/10 text-ink'
                  : 'text-ink/80 hover:bg-ink/5 hover:text-ink',
            ]"
            @click="select(currency)"
            @mousemove="activeIndex = index"
          >
            <span
              class="h-3.5 w-5 shrink-0 overflow-hidden rounded-[1px] ring-1 ring-ink/15"
              aria-hidden="true"
            >
              <BaseImage
                :src="currency.flagSrc"
                alt=""
                :width="20"
                :height="14"
                sizes="20px"
              />
            </span>
            <span class="font-semibold tracking-wide">{{ currency.code }}</span>
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
  flagSrc: string
}

const props = defineProps<{
  hasSolidBackground: boolean
}>()

const CURRENCIES: Currency[] = [
  { code: "USD", label: "US Dollar", flagSrc: "/images/all/american-flag.png" },
  { code: "BDT", label: "Bangladeshi Taka", flagSrc: "/images/all/bangladeshi-flag.png" },
  { code: "EUR", label: "Euro", flagSrc: "/images/all/euro-flag.png" },
  { code: "GBP", label: "British Pound", flagSrc: "/images/all/british-flag.png" },
  { code: "AED", label: "UAE Dirham", flagSrc: "/images/all/aed-flag.jpeg" },
  { code: "SGD", label: "Singapore Dollar", flagSrc: "/images/all/sgd-flag.png" },
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
