<template>
  <div
    :id="id"
    role="region"
    :aria-label="`${label} menu`"
    class="absolute left-0 right-0 top-full z-50 border-t border-paper/10 bg-ink shadow-2xl"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <BaseContainer size="xl">
      <div class="grid gap-0 lg:grid-cols-[1fr_auto]">
        <!-- Left: columns + contact -->
        <div class="py-8 pr-0 lg:pr-10">
          <!-- Nav columns -->
          <div class="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <div
              v-for="column in data.columns"
              :key="column.title"
              class="flex flex-col gap-4"
            >
              <h3 class="font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper">
                {{ column.title }}
              </h3>
              <ul class="flex flex-col gap-2.5" role="list">
                <li v-for="item in column.items" :key="item.href">
                  <NuxtLink
                    :to="item.href"
                    class="group/link flex items-center gap-1.5 text-sm text-paper/55 transition-colors duration-fast hover:text-copper focus-visible:text-copper"
                    @click="$emit('navigate')"
                  >
                    <span
                      class="inline-block h-px w-2 shrink-0 bg-paper/30 transition-all duration-fast group-hover/link:w-3 group-hover/link:bg-copper"
                      aria-hidden="true"
                    />
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Contact row -->
          <div
            v-if="data.contact"
            class="mt-8 border-t border-paper/10 pt-6"
          >
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <!-- Address -->
              <div>
                <p class="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-paper/35">
                  Address
                </p>
                <address class="not-italic">
                  <p
                    v-for="(line, i) in data.contact.address"
                    :key="i"
                    class="text-xs text-paper/55 leading-relaxed"
                  >
                    {{ line }}
                  </p>
                </address>
              </div>

              <!-- Phone -->
              <div>
                <p class="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-paper/35">
                  Call Us
                </p>
                <div class="flex flex-col gap-1">
                  <p
                    v-for="phone in data.contact.phones"
                    :key="phone.label"
                    class="text-xs text-paper/55 leading-relaxed"
                  >
                    {{ phone.label }}: <a :href="`tel:${phone.value.replace(/\s/g, '')}`" class="hover:text-copper transition-colors duration-fast">{{ phone.value }}</a>
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div>
                <p class="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-paper/35">
                  Email Us
                </p>
                <div class="flex flex-col gap-1">
                  <a
                    v-for="email in data.contact.emails"
                    :key="email"
                    :href="`mailto:${email}`"
                    class="text-xs text-paper/55 transition-colors duration-fast hover:text-copper"
                  >
                    {{ email }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Social icons -->
            <div v-if="data.contact.social.length" class="mt-5 flex items-center gap-1">
              <p class="mr-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-paper/35">
                Follow Us
              </p>
              <a
                v-for="s in data.contact.social"
                :key="s.platform"
                :href="s.href"
                :aria-label="s.ariaLabel"
                class="flex h-7 w-7 items-center justify-center rounded-sm border border-paper/15 text-paper/50 transition-colors duration-fast hover:border-copper/50 hover:text-copper"
                target="_blank"
                rel="noopener noreferrer"
              >
                <!-- Social icons via inline SVG paths -->
                <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="socialIconPath(s.platform)" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Right: feature image -->
        <div
          v-if="data.imageSrc"
          class="hidden lg:block w-[260px] xl:w-[300px] shrink-0 overflow-hidden"
        >
          <BaseImage
            :src="data.imageSrc"
            :alt="data.imageAlt ?? 'Q Hotel'"
            :width="300"
            :height="420"
            sizes="300px"
            class="h-full w-full"
          />
        </div>

        <!-- Placeholder if no image configured -->
        <div
          v-else
          class="hidden lg:block w-[260px] xl:w-[300px] shrink-0 bg-paper/5"
          aria-hidden="true"
        />
      </div>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import type { NavMegaMenuData, NavSocialPlatform } from '~/types/navigation'

defineProps<{
  id: string
  label: string
  data: NavMegaMenuData
}>()

defineEmits<{
  mouseenter: []
  mouseleave: []
  navigate: []
}>()

const socialPaths: Record<NavSocialPlatform, string> = {
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  youtube: 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z',
}

function socialIconPath(platform: NavSocialPlatform): string {
  return socialPaths[platform]
}
</script>

