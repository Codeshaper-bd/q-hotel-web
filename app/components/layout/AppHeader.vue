<template>
  <header
    ref="headerRef"
    class="relative sticky top-0 z-40 bg-ink"
  >
    <!-- Skip to content -->
    <a
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
      href="#main-content"
    >
      Skip to content
    </a>

    <BaseContainer size="xl">
      <!-- Desktop: three-column bar -->
      <div class="flex min-h-[var(--header-height)] items-center justify-between gap-6">
        <!-- Left: logo -->
        <NavLogo />

        <!-- Centre: primary navigation (hidden on mobile) -->
        <nav
          class="hidden items-center gap-0 lg:flex"
          aria-label="Primary navigation"
        >
          <template v-for="item in navigationItems" :key="item.id">
            <!-- Plain nav link -->
            <NuxtLink
              v-if="!item.dropdown && !item.megaMenu"
              :to="item.href"
              class="px-3.5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-paper/60 transition-colors duration-fast hover:text-paper xl:px-4"
            >
              {{ item.label }}
            </NuxtLink>

            <!-- Trigger for dropdown or mega menu -->
            <div v-else class="relative flex items-stretch">
              <button
                :id="`nav-trigger-${item.id}`"
                type="button"
                :aria-expanded="activeMenuId === item.id"
                aria-haspopup="true"
                :aria-controls="`nav-menu-${item.id}`"
                :class="[
                  'flex items-center gap-1 px-3.5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-fast xl:px-4',
                  activeMenuId === item.id ? 'text-copper' : 'text-paper/60 hover:text-paper',
                ]"
                @mouseenter="handleTriggerEnter(item.id)"
                @mouseleave="schedulMenuClose"
                @click="handleTriggerClick(item.id)"
                @keydown.escape="closeMenu"
                @keydown.enter.prevent="toggleMenu(item.id)"
                @keydown.space.prevent="toggleMenu(item.id)"
              >
                {{ item.label }}
                <span v-if="item.badge" class="ml-0.5 text-copper" aria-hidden="true">{{ item.badge }}</span>
                <!-- Chevron indicator -->
                <svg
                  :class="['h-3 w-3 shrink-0 transition-transform duration-fast', activeMenuId === item.id ? 'rotate-180 text-copper' : 'text-paper/30']"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>

              <!-- Simple dropdown panel (positioned relative to this item) -->
              <Transition name="nav-panel">
                <NavDropdown
                  v-if="item.dropdown && activeMenuId === item.id"
                  :id="`nav-menu-${item.id}`"
                  :label="item.label"
                  :items="item.dropdown"
                  @mouseenter="cancelMenuClose"
                  @mouseleave="schedulMenuClose"
                  @navigate="closeMenu"
                />
              </Transition>
            </div>
          </template>
        </nav>

        <!-- Right: reserve button + mobile hamburger -->
        <div class="flex items-center gap-3">
          <!-- Reserve button (desktop) -->
          <NuxtLink
            to="#reserve"
            class="hidden items-center gap-2 rounded-sm border border-paper/30 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-paper transition-colors duration-fast hover:border-paper/60 hover:bg-paper/5 lg:flex"
          >
            Reserve Now
          </NuxtLink>

          <!-- Account / search icon placeholder -->
          <button
            type="button"
            class="hidden h-9 w-9 items-center justify-center rounded-sm border border-paper/20 text-paper/50 transition-colors duration-fast hover:border-paper/40 hover:text-paper lg:flex"
            aria-label="Account"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>

          <!-- Mobile hamburger -->
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-sm border border-paper/20 text-paper/60 transition-colors duration-fast hover:border-paper/40 hover:text-paper lg:hidden"
            :aria-expanded="isMobileOpen"
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation"
            @click="isMobileOpen = !isMobileOpen"
          >
            <span aria-hidden="true" class="relative h-3.5 w-5">
              <span
                :class="[
                  'absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-fast',
                  isMobileOpen ? 'translate-y-[6px] rotate-45' : '',
                ]"
              />
              <span
                :class="[
                  'absolute left-0 top-1/2 h-px w-5 bg-current -translate-y-px transition-opacity duration-fast',
                  isMobileOpen ? 'opacity-0' : '',
                ]"
              />
              <span
                :class="[
                  'absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-fast',
                  isMobileOpen ? '-translate-y-[7px] -rotate-45' : '',
                ]"
              />
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile drawer -->
      <NavMobileDrawer
        :items="navigationItems"
        :is-open="isMobileOpen"
        @close="isMobileOpen = false"
      />
    </BaseContainer>

    <!-- Mega menu: full-width, outside BaseContainer, relative to header -->
    <Transition name="nav-panel">
      <NavMegaMenu
        v-if="activeMegaMenuItem"
        :id="`nav-menu-${activeMegaMenuItem.id}`"
        :label="activeMegaMenuItem.label"
        :data="activeMegaMenuItem.megaMenu!"
        @mouseenter="cancelMenuClose"
        @mouseleave="schedulMenuClose"
        @navigate="closeMenu"
      />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import type { NavItemData } from '~/types/navigation'

// ─── Navigation data ──────────────────────────────────────────────
const navigationItems: NavItemData[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: '#hero',
  },
  {
    id: 'rooms',
    label: 'Rooms & Suites',
    href: '#rooms',
  },
  {
    id: 'dining',
    label: 'Dining',
    href: '#dining',
    dropdown: [
      { label: 'Restaurants', href: '#restaurants' },
      { label: 'Bar & Lounge', href: '#bar' },
      { label: 'Room Service', href: '#room-service' },
      { label: 'Private Dining', href: '#private-dining' },
    ],
  },
  {
    id: 'experiences',
    label: 'Experiences',
    href: '#experiences',
    badge: '+',
    megaMenu: {
      columns: [
        {
          title: 'The Hotel',
          items: [
            { label: 'About Us', href: '#about' },
            { label: 'Hotel Policy', href: '#policy' },
            { label: 'Banquets', href: '#banquets' },
          ],
        },
        {
          title: 'Stay',
          items: [
            { label: 'Facilities', href: '#facilities' },
            { label: 'Amenities', href: '#amenities' },
          ],
        },
        {
          title: 'Offers',
          items: [
            { label: 'Packages', href: '#packages' },
            { label: 'Seasonal Deals', href: '#seasonal-deals' },
          ],
        },
        {
          title: 'Explore',
          items: [
            { label: 'Gallery', href: '#gallery' },
            { label: 'Nearby Attractions', href: '#attractions' },
          ],
        },
      ],
      contact: {
        address: ['House 14, Road 7', 'Sector 4, Uttara', 'Dhaka-1230, Bangladesh'],
        phones: [
          { label: 'Overseas', value: '+88-02-41090390' },
          { label: 'Local', value: '+88-09678111555' },
          { label: 'Mobile', value: '+880 1713-377700' },
        ],
        emails: ['info@qfl.com.bd', 'mkt.affairs@qfl.com.bd'],
        social: [
          { platform: 'facebook', href: '#', ariaLabel: 'Q Hotel on Facebook' },
          { platform: 'instagram', href: '#', ariaLabel: 'Q Hotel on Instagram' },
          { platform: 'linkedin', href: '#', ariaLabel: 'Q Hotel on LinkedIn' },
          { platform: 'youtube', href: '#', ariaLabel: 'Q Hotel on YouTube' },
        ],
      },
      imageSrc: '/images/hotel-interior.jpg',
      imageAlt: 'Q Hotel luxury interior lounge',
    },
  },
  {
    id: 'meetings',
    label: 'Meetings & Events',
    href: '#meetings',
  },
  {
    id: 'longstay',
    label: 'Long Stay',
    href: '#longstay',
  },
]

// ─── Menu state ───────────────────────────────────────────────────
const route = useRoute()
const headerRef = ref<HTMLElement | null>(null)
const activeMenuId = ref<string | null>(null)
const isMobileOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | undefined

const activeMegaMenuItem = computed(() =>
  navigationItems.find(i => i.id === activeMenuId.value && i.megaMenu) ?? null
)

function openMenu(id: string) {
  if (closeTimer) clearTimeout(closeTimer)
  activeMenuId.value = id
}

function closeMenu() {
  if (closeTimer) clearTimeout(closeTimer)
  activeMenuId.value = null
}

function toggleMenu(id: string) {
  activeMenuId.value === id ? closeMenu() : openMenu(id)
}

function handleTriggerEnter(id: string) {
  openMenu(id)
}

function schedulMenuClose() {
  closeTimer = setTimeout(closeMenu, 140)
}

function cancelMenuClose() {
  if (closeTimer) clearTimeout(closeTimer)
}

function handleTriggerClick(id: string) {
  // On touch/keyboard: toggle the menu
  toggleMenu(id)
}

// Close menus on outside click
function handleDocumentClick(event: MouseEvent) {
  if (headerRef.value && !headerRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

// Close mobile drawer on route change
watch(() => route.fullPath, () => {
  isMobileOpen.value = false
  closeMenu()
})

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
  if (closeTimer) clearTimeout(closeTimer)
})
</script>

<style scoped>
/* Mega menu and dropdown slide-in transition */
.nav-panel-enter-active {
  transition:
    opacity var(--duration-fast) var(--ease-premium),
    transform var(--duration-fast) var(--ease-premium);
}

.nav-panel-leave-active {
  transition:
    opacity var(--duration-fast) var(--ease-premium),
    transform var(--duration-fast) var(--ease-premium);
}

.nav-panel-enter-from,
.nav-panel-leave-to {
  opacity: 0;
  transform: translateY(-0.375rem);
}
</style>
