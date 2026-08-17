<template>
  <div class="bg-white p-7 sm:p-10">
    <div class="flex flex-wrap items-baseline gap-3">
      <h2 class="font-display font-semibold text-2xl text-ink sm:text-[1.75rem]">
        How Would You Like To Pay?
      </h2>
    </div>
    <p class="mt-3 text-base font-normal text-[#505155]">
      Choose your preferred payment option
      <span class="text-[#FF0000]">*</span>
    </p>

    <div class="mt-8 grid gap-5 md:grid-cols-2">
      <label
        class="flex min-h-[110px] cursor-pointer items-stretch border bg-white transition-colors duration-fast hover:bg-cream focus-within:border-flame"
        :class="paymentMethod === 'pay_now' ? 'border-flame' : 'border-line'"
      >
        <input
          class="sr-only"
          type="radio"
          name="paymentMethod"
          value="pay_now"
          :checked="paymentMethod === 'pay_now'"
          @change="selectPaymentMethod('pay_now')"
        />
        <span class="relative flex w-full items-center gap-4 p-5 pr-14 sm:p-6 sm:pr-16">
          <span class="flex size-12 shrink-0 items-center justify-center rounded-full bg-champagne/25">
            <svg
              class="size-5 text-flame"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </span>
          <span class="min-w-0 flex-1">
            <span class="block font-display text-xl font-semibold text-ink">Pay Now</span>
            <span class="mt-1 block text-sm leading-6 text-muted">
              Securely pay now and confirm your booking instantly.
            </span>
          </span>
          <span
            class="absolute right-5 top-5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-fast sm:right-6 sm:top-6"
            :class="paymentMethod === 'pay_now' ? 'border-flame' : 'border-ink/30'"
          >
            <span
              class="size-2.5 rounded-full transition-colors duration-fast"
              :class="paymentMethod === 'pay_now' ? 'bg-flame' : 'bg-transparent'"
            />
          </span>
        </span>
      </label>

      <label
        class="flex min-h-[110px] cursor-pointer items-stretch border bg-white transition-colors duration-fast hover:bg-cream focus-within:border-flame"
        :class="paymentMethod === 'pay_at_property' ? 'border-flame' : 'border-line'"
      >
        <input
          class="sr-only"
          type="radio"
          name="paymentMethod"
          value="pay_at_property"
          :checked="paymentMethod === 'pay_at_property'"
          @change="selectPaymentMethod('pay_at_property')"
        />
        <span class="relative flex w-full items-center gap-4 p-5 pr-14 sm:p-6 sm:pr-16">
          <span class="flex size-12 shrink-0 items-center justify-center rounded-full bg-champagne/25">
            <svg
              class="size-5 text-flame"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
              <path d="M10 6h4" />
              <path d="M10 10h4" />
              <path d="M10 14h4" />
              <path d="M10 18h4" />
            </svg>
          </span>
          <span class="min-w-0 flex-1">
            <span class="block font-display text-xl font-semibold text-ink">Pay At Property</span>
            <span class="mt-1 block text-sm leading-6 text-muted">
              Pay when you arrive at the hotel.
            </span>
            <span class="block text-sm leading-6 text-muted">
              Your card is only for guarantee.
            </span>
          </span>
          <span
            class="absolute right-5 top-5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-fast sm:right-6 sm:top-6"
            :class="paymentMethod === 'pay_at_property' ? 'border-flame' : 'border-ink/30'"
          >
            <span
              class="size-2.5 rounded-full transition-colors duration-fast"
              :class="paymentMethod === 'pay_at_property' ? 'bg-flame' : 'bg-transparent'"
            />
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: 'pay_now' | 'pay_at_property'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: 'pay_now' | 'pay_at_property']
}>()

const paymentMethod = computed(() => props.modelValue)

function selectPaymentMethod(value: 'pay_now' | 'pay_at_property') {
  emit('update:modelValue', value)
}
</script>