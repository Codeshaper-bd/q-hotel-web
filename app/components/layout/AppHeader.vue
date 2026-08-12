<template>
  <header
    ref="headerRef"
    :class="[
      'fixed inset-x-0 top-0 z-40 transition-[opacity,transform] duration-normal ease-premium',
      isMenuRevealed ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
    ]"
    :inert="!isMenuRevealed"
  >
    <!-- Glass background: same treatment as the booking bar, crossfaded as a
         layer so the backdrop blur eases in rather than snapping on -->
    <div
      :class="[
        'absolute inset-0 border-b bg-paper/90 backdrop-blur-md transition-[opacity,border-color] duration-normal ease-premium',
        hasSolidBackground ? 'opacity-100' : 'opacity-0',
        hasScrolledPastCover ? 'border-line/70' : 'border-transparent',
      ]"
      aria-hidden="true"
    />
    <!-- Skip to content -->
    <a
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
      href="#main-content"
    >
      Skip to content
    </a>

    <BaseContainer size="xl" class="relative">
      <!-- Desktop: logo left, navigation right -->
      <div
        class="flex min-h-[var(--header-height)] items-center justify-between gap-6"
      >
        <!-- Left: logo -->
        <NavLogo :tone="hasSolidBackground ? 'on-light' : 'on-dark'" />

        <!-- Right: primary navigation (hidden on mobile) -->
        <nav
          class="hidden items-center gap-0 lg:flex"
          aria-label="Primary navigation"
        >
          <template v-for="item in navigationItems" :key="item.id">
            <!-- Plain nav link -->
            <NuxtLink
              v-if="!item.dropdown && !item.megaMenu"
              :to="item.href"
              :aria-current="isActive(item.href) ? 'page' : undefined"
              :class="[
                'lg:mr-12 xl:mr-20 last:mr-0 py-2 font-display text-base font-semibold uppercase leading-6 transition-colors duration-fast  last:pr-0',
                isActive(item.href)
                  ? activeLinkColor
                  : hasSolidBackground
                    ? 'text-ink/70 hover:text-ink'
                    : 'text-white hover:text-white/80',
              ]"
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
                  'flex items-center gap-1 px-3.5 py-2 font-display text-base font-semibold uppercase leading-6 transition-colors duration-fast xl:px-4',
                  activeMenuId === item.id || isActive(item.href)
                    ? activeLinkColor
                    : hasSolidBackground
                      ? 'text-ink/70 hover:text-ink'
                      : 'text-white hover:text-white/80',
                ]"
                @mouseenter="handleTriggerEnter(item.id)"
                @mouseleave="schedulMenuClose"
                @click="handleTriggerClick(item.id)"
                @keydown.escape="closeMenu"
                @keydown.enter.prevent="toggleMenu(item.id)"
                @keydown.space.prevent="toggleMenu(item.id)"
              >
                {{ item.label }}
                <span
                  v-if="item.badge"
                  class="ml-0.5 text-copper"
                  aria-hidden="true"
                  >{{ item.badge }}</span
                >
                <!-- Chevron indicator -->
                <svg
                  :class="[
                    'h-3 w-3 shrink-0 transition-transform duration-fast',
                    activeMenuId === item.id || isActive(item.href)
                      ? `rotate-180 ${activeLinkColor}`
                      : hasSolidBackground
                        ? 'text-ink/30'
                        : 'text-white/40',
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

        <!-- Mobile hamburger -->
        <button
          type="button"
          :class="[
            'flex h-10 w-10 items-center justify-center rounded-sm border transition-colors duration-fast lg:hidden',
            hasSolidBackground
              ? 'border-ink/20 text-ink/60 hover:border-ink/40 hover:text-ink'
              : 'border-paper/20 text-paper/60 hover:border-paper/40 hover:text-paper',
          ]"
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
import type { NavItemData } from "~/types/navigation";

// ─── Navigation data ──────────────────────────────────────────────
const navigationItems: NavItemData[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/",
  },
  {
    id: "rooms",
    label: "Rooms & Suites",
    href: "/rooms",
  },
  {
    id: "dining",
    label: "Dining",
    href: "/dining",
  },
  {
    id: "meetings",
    label: "Meetings & Events",
    href: "/meetings-events",
  },
  {
    id: "longstay",
    label: "Long Stays",
    href: "/long-stays",
  },
];

// ─── Menu state ───────────────────────────────────────────────────
const route = useRoute();
const headerRef = ref<HTMLElement | null>(null);

// Hidden while the home hero's Q reveal plays; HeroSection owns this state
// (defaults to visible for SSR, no-JS, reduced motion, and non-home pages).
// `inert` keeps the hidden nav out of tab order — pointer-events-none wouldn't.
const isMenuRevealed = useState("hero-menu-revealed", () => true);

// Glass backdrop is held off while the home hero plays its full-bleed footage;
// HeroSection allows it again near the journey's end (default: allowed)
const isNavGlassAllowed = useState("hero-nav-glass", () => true);
const activeMenuId = ref<string | null>(null);
const isMobileOpen = ref(false);
const isScrolledPastHero = ref(false);
let closeTimer: ReturnType<typeof setTimeout> | undefined;

// The hairline under the header only draws once the user has actually
// scrolled, even on pages whose nav starts solid (e.g. /booking)
const hasScrolledPastCover = computed(() => isScrolledPastHero.value);

// Most pages open with the transparent nav over a dark cover photo; the
// paper glass arrives on scroll. The home hero owns a longer runway (its
// pinned journey plus the glass hold-off), while inner pages — whose dark
// banner is only a few hundred pixels tall — go solid almost immediately.
const isHome = computed(() => route.path === "/");

// Active nav item accent: champagne on the home page's dark hero, copper
// elsewhere once the paper glass is in play
const activeLinkColor = computed(() => (isHome.value ? "text-[#A75B27]" : "text-[#A75B27]"));

// Pages with no dark cover media at the top (a plain paper background
// instead of a hero photo) would render white-on-white nav text under this
// scroll-threshold scheme, so they skip it and start solid immediately.
const NO_DARK_HERO_ROUTES = new Set(["/booking"]);
const hasDarkHero = computed(() => !NO_DARK_HERO_ROUTES.has(route.path));

// Only the home page runs the transparent header that gains a paper-glass
// background on scroll. Every other page starts solid so the nav is always
// readable over its non-hero, light-on-light content.
const hasSolidBackground = computed(
  () =>
    !isHome.value ||
    !hasDarkHero.value ||
    (isScrolledPastHero.value && isNavGlassAllowed.value) ||
    isMobileOpen.value,
);

function handleScroll() {
  const threshold = isHome.value ? window.innerHeight * 0.5 : 80;
  isScrolledPastHero.value = window.scrollY > threshold;
}

const activeMegaMenuItem = computed(
  () =>
    navigationItems.find((i) => i.id === activeMenuId.value && i.megaMenu) ??
    null,
);

/** Active page detection: `/` matches the home root exactly, other paths
 *  match their page and any nested route beneath it. In-page hash links
 *  (`#dining`, `#meetings`, …) never count as a page, they stay on the
 *  section of the current page. */
function isActive(href: string) {
  if (href.startsWith("#")) return false;
  if (href === "/") return route.path === "/";
  return route.path === href || route.path.startsWith(`${href}/`);
}

function openMenu(id: string) {
  if (closeTimer) clearTimeout(closeTimer);
  activeMenuId.value = id;
}

function closeMenu() {
  if (closeTimer) clearTimeout(closeTimer);
  activeMenuId.value = null;
}

function toggleMenu(id: string) {
  activeMenuId.value === id ? closeMenu() : openMenu(id);
}

function handleTriggerEnter(id: string) {
  openMenu(id);
}

function schedulMenuClose() {
  closeTimer = setTimeout(closeMenu, 140);
}

function cancelMenuClose() {
  if (closeTimer) clearTimeout(closeTimer);
}

function handleTriggerClick(id: string) {
  // On touch/keyboard: toggle the menu
  toggleMenu(id);
}

// Close menus on outside click
function handleDocumentClick(event: MouseEvent) {
  if (headerRef.value && !headerRef.value.contains(event.target as Node)) {
    closeMenu();
  }
}

// Close mobile drawer on route change; re-read the scroll state once the new
// page has settled, since the solid-background threshold differs per route
watch(
  () => route.fullPath,
  () => {
    isMobileOpen.value = false;
    closeMenu();
    nextTick(() => handleScroll());
  },
);

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
  window.removeEventListener("scroll", handleScroll);
  if (closeTimer) clearTimeout(closeTimer);
});
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
