<template>
  <nav
    id="mobile-navigation"
    :class="[
      'grid overflow-hidden border-t border-paper/10 transition-[grid-template-rows] duration-normal ease-premium lg:hidden',
      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
    ]"
    aria-label="Mobile navigation"
  >
    <div class="min-h-0 overflow-hidden">
      <div class="flex flex-col py-4">
        <!-- Items without submenus: direct links -->
        <template v-for="item in items" :key="item.id">
          <!-- Plain link -->
          <NuxtLink
            v-if="!item.dropdown && !item.megaMenu"
            :to="item.href"
            class="flex items-center justify-between px-5 py-3 text-sm font-medium uppercase tracking-[0.12em] text-paper/70 transition-colors duration-fast hover:text-paper"
            @click="$emit('close')"
          >
            {{ item.label }}
          </NuxtLink>

          <!-- Expandable item (dropdown or mega menu) -->
          <div v-else class="flex flex-col">
            <button
              type="button"
              :aria-expanded="expandedId === item.id"
              :aria-controls="`mobile-${item.id}`"
              class="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-medium uppercase tracking-[0.12em] text-paper/70 transition-colors duration-fast hover:text-paper"
              @click="toggleExpand(item.id)"
            >
              <span>{{ item.label }}<span v-if="item.badge" class="ml-1 text-copper" aria-hidden="true">{{ item.badge }}</span></span>
              <svg
                :class="['h-3.5 w-3.5 shrink-0 text-paper/40 transition-transform duration-fast', expandedId === item.id ? 'rotate-180' : '']"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <!-- Accordion panel: grid expand trick -->
            <div
              :id="`mobile-${item.id}`"
              :class="[
                'grid overflow-hidden transition-[grid-template-rows] duration-normal ease-premium',
                expandedId === item.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              ]"
            >
              <div class="min-h-0">
                <!-- Dropdown items -->
                <div v-if="item.dropdown" class="flex flex-col gap-0.5 bg-paper/5 py-2">
                  <NuxtLink
                    v-for="link in item.dropdown"
                    :key="link.href"
                    :to="link.href"
                    class="flex items-center gap-2.5 px-8 py-2.5 text-sm text-paper/55 transition-colors duration-fast hover:text-paper"
                    @click="$emit('close')"
                  >
                    <span class="h-px w-2 shrink-0 bg-copper/40" aria-hidden="true" />
                    {{ link.label }}
                  </NuxtLink>
                </div>

                <!-- Mega menu items flattened as columns -->
                <div v-else-if="item.megaMenu" class="bg-paper/5 py-4">
                  <div
                    v-for="column in item.megaMenu.columns"
                    :key="column.title"
                    class="mb-4 px-5"
                  >
                    <p class="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-paper/35">
                      {{ column.title }}
                    </p>
                    <div class="flex flex-col gap-0.5">
                      <NuxtLink
                        v-for="link in column.items"
                        :key="link.href"
                        :to="link.href"
                        class="flex items-center gap-2.5 py-2 text-sm text-paper/55 transition-colors duration-fast hover:text-paper"
                        @click="$emit('close')"
                      >
                        <span class="h-px w-2 shrink-0 bg-copper/40" aria-hidden="true" />
                        {{ link.label }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Reserve CTA -->
        <div class="mt-3 px-5">
          <NuxtLink
            to="#reserve"
            class="flex w-full items-center justify-center rounded-sm border border-paper/30 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-paper transition-colors duration-fast hover:border-paper/60 hover:bg-paper/5"
            @click="$emit('close')"
          >
            Reserve Now
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { NavItemData } from '~/types/navigation'

defineProps<{
  items: NavItemData[]
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

const expandedId = ref<string | null>(null)

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}
</script>
