<template>
  <!-- Inset frame: paper page shows on all four sides of the dark panel -->
  <footer class="bg-paper p-4 sm:p-6 lg:p-8">
    <div class="overflow-hidden rounded-sm bg-night text-paper">
      <BaseContainer size="xl">
      <!-- Upper band: brand, contact + actions, newsletter + rating -->
      <div class="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-3">
        <!-- Brand -->
        <div class="flex flex-col">
          <p class="flex items-baseline gap-2 font-display">
            <span class="text-2xl uppercase tracking-[0.04em] text-paper">
              <span class="text-champagne">Q</span> Hotel
            </span>
            <span class="text-xs uppercase tracking-[0.42em] text-paper/70">Dhaka</span>
          </p>

          <p class="mt-5 max-w-sm text-sm leading-7 text-paper/60">
            Q Hotel Dhaka offers a refined 5-star hospitality experience with
            elegant accommodations, premium wellness facilities, exceptional
            dining, and personalized service in the heart of the city.
          </p>

          <ul class="mt-auto flex items-center gap-3 pt-10" aria-label="Q Hotel on social media">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-fast hover:border-champagne hover:text-champagne"
                aria-label="Q Hotel on Facebook"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.13-2.41-.13-2.39 0-4.03 1.46-4.03 4.14v2.31H7.5V13h2.76v8h3.24z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-fast hover:border-champagne hover:text-champagne"
                aria-label="Q Hotel on Instagram"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="3.8" />
                  <circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-fast hover:border-champagne hover:text-champagne"
                aria-label="Q Hotel on LinkedIn"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.3h3.1V19H3.4V8.3zm5.3 0h2.97v1.47h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V19h-3.1v-4.76c0-1.14-.02-2.6-1.58-2.6-1.58 0-1.83 1.24-1.83 2.52V19H8.7V8.3z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-fast hover:border-champagne hover:text-champagne"
                aria-label="Q Hotel on YouTube"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.6 7.9s-.19-1.36-.78-1.96c-.75-.79-1.58-.79-1.96-.83C16.14 4.9 12 4.9 12 4.9h-.01s-4.13 0-6.85.21c-.38.04-1.21.04-1.96.83-.59.6-.78 1.96-.78 1.96s-.2 1.6-.2 3.2v1.5c0 1.6.2 3.2.2 3.2s.19 1.36.78 1.96c.75.79 1.74.76 2.18.85 1.58.15 6.64.2 6.64.2s4.14-.01 6.86-.21c.38-.05 1.21-.05 1.96-.84.59-.6.78-1.96.78-1.96s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2zM9.9 14.6V9.3l5.3 2.66-5.3 2.64z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact + actions -->
        <div class="flex flex-col">
          <ul class="space-y-5 text-sm text-paper/70">
            <li class="flex items-center gap-3">
              <svg class="h-4 w-4 shrink-0 text-paper/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.37a1.5 1.5 0 00-1.14-1.46l-4.06-1.01a1.5 1.5 0 00-1.58.62l-.83 1.24a11.3 11.3 0 01-5-5l1.24-.83a1.5 1.5 0 00.62-1.58l-1.01-4.06A1.5 1.5 0 007.12 2.25H5.75A2.25 2.25 0 003.5 4.5" />
              </svg>
              <a class="transition-colors duration-fast hover:text-champagne" href="tel:+8801713377700">+88-01713377700</a>
            </li>
            <li class="flex items-center gap-3">
              <svg class="h-4 w-4 shrink-0 text-paper/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25m-19.5 0v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75m-19.5 0l9.75 6.75 9.75-6.75" />
              </svg>
              <a class="transition-colors duration-fast hover:text-champagne" href="mailto:info@qfl.com.bd">info@qfl.com.bd</a>
            </li>
            <li class="flex items-start gap-3">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-paper/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.14-7.5 11.25-7.5 11.25S4.5 17.64 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span class="leading-6">Plot C-11, Block A, Sector 1,<br>Purbachal Road, Dhaka 1229</span>
            </li>
          </ul>

          <div class="mt-auto flex flex-wrap items-stretch gap-3 pt-10">
            <!-- Reserve: gold split control with bed icon -->
            <NuxtLink
              to="#reserve"
              class="group inline-flex min-h-11 items-stretch bg-champagne text-night transition-colors duration-fast hover:bg-gold"
            >
              <span class="flex items-center px-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
                Reserve Now
              </span>
              <span class="flex items-center border-l border-night/20 px-3.5" aria-hidden="true">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 18h20" />
                </svg>
              </span>
            </NuxtLink>

            <!-- Directions: outline split control with arrow -->
            <a
              :href="directionsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex min-h-11 items-stretch border border-paper/25 text-paper transition-colors duration-fast hover:border-champagne hover:text-champagne"
            >
              <span class="flex items-center px-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
                Get Direction
              </span>
              <span class="flex items-center border-l border-paper/25 px-3.5 transition-colors duration-fast group-hover:border-champagne" aria-hidden="true">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Newsletter + rating -->
        <div class="flex flex-col">
          <!-- Guest rating -->
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-2" aria-hidden="true">
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#34e0a1]">
                <svg class="h-5 w-5 text-night" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <circle cx="8" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.4" />
                  <circle cx="16" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.4" />
                  <circle cx="8" cy="12" r="1.1" />
                  <circle cx="16" cy="12" r="1.1" />
                </svg>
              </span>
              <span class="font-display text-lg text-paper">Tripadvisor</span>
            </span>

            <span class="h-8 w-px bg-paper/15" aria-hidden="true" />

            <div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold text-paper">5.0</span>
                <span class="flex gap-0.5" aria-hidden="true">
                  <svg v-for="star in 5" :key="star" class="h-3.5 w-3.5 text-champagne" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 20.5l1.2-6.5-4.8-4.6 6.6-.9L12 2.5z" />
                  </svg>
                </span>
              </div>
              <p class="mt-1 text-xs text-paper/50">Based on 165 reviews</p>
            </div>
          </div>

          <!-- Newsletter -->
          <p class="mt-10 max-w-xs text-sm leading-7 text-paper/60">
            Subscribe to receive exclusive offers, special promotions, and the
            latest updates from Q Hotel Dhaka.
          </p>

          <form class="mt-auto flex max-w-sm items-end gap-4 pt-6" @submit.prevent="handleSubscribe">
            <div class="flex-1">
              <label for="footer-newsletter-email" class="sr-only">Your email address</label>
              <input
                id="footer-newsletter-email"
                v-model="email"
                type="email"
                required
                autocomplete="email"
                placeholder="Your email here"
                class="w-full border-b border-paper/25 bg-transparent pb-2 text-sm text-paper placeholder:text-paper/40 focus:border-champagne focus:outline-none"
              >
            </div>
            <button
              type="submit"
              class="shrink-0 pb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-champagne transition-colors duration-fast hover:text-gold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Divider with the brand mark centred. The white Q draws itself in a
           continuous loop; renders solid without JS / under reduced motion. -->
      <div class="flex items-center gap-6" aria-hidden="true">
        <span class="h-px flex-1 bg-paper/25" />
        <svg class="h-12 w-12 text-paper" viewBox="0 0 51 50" fill="none">
          <!-- Outline layer: drawn via pathLength-normalised dashoffset -->
          <g ref="dividerStrokeRef">
            <path
              v-for="(markPath, index) in qHotelLogoPaths"
              :key="`divider-stroke-${index}`"
              :d="markPath"
              fill="none"
              stroke="currentColor"
              stroke-width="0.6"
              pathLength="1"
              stroke-dasharray="1"
              stroke-dashoffset="0"
            />
          </g>
          <!-- Fill layer: blooms after the outline draw (hidden by JS first) -->
          <g ref="dividerFillRef">
            <path
              v-for="(markPath, index) in qHotelLogoPaths"
              :key="`divider-fill-${index}`"
              :d="markPath"
              fill="currentColor"
            />
          </g>
        </svg>
        <span class="h-px flex-1 bg-paper/25" />
      </div>

      <!-- Sitemap columns -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:grid-cols-3 lg:grid-cols-5">
        <nav
          v-for="column in linkColumns"
          :key="column.title"
          :aria-label="column.title"
        >
          <h2 class="font-display text-lg text-paper">{{ column.title }}</h2>
          <ul class="mt-6 space-y-3.5 text-sm">
            <li v-for="link in column.links" :key="link.label">
              <NuxtLink
                :to="link.to"
                class="text-paper/60 transition-colors duration-fast hover:text-champagne"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Nearby attractions: informational, not navigation -->
        <div>
          <h2 class="font-display text-lg text-paper">Nearby Attractions</h2>
          <ul class="mt-6 space-y-3.5 text-sm text-paper/60">
            <li v-for="attraction in nearbyAttractions" :key="attraction">{{ attraction }}</li>
          </ul>
        </div>

        <!-- Hotel information: factual list with markers -->
        <div>
          <h2 class="font-display text-lg text-paper">Hotel Information</h2>
          <ul class="mt-6 space-y-3.5 text-sm text-paper/60">
            <li v-for="info in hotelInformation" :key="info" class="flex items-start gap-2.5">
              <svg class="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 4.5-5" />
              </svg>
              {{ info }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Legal bar -->
      <div class="flex flex-col gap-3 border-t border-paper/10 py-7 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ copyrightYear }} <span class="text-paper/70">Q Hotel Dhaka</span>. All Rights Reserved</p>
        <p>
          Designed &amp; Developed by
          <a
            href="https://codeshaper.net"
            target="_blank"
            rel="noopener noreferrer"
            class="text-paper/70 transition-colors duration-fast hover:text-champagne"
          >Codeshaper</a>
        </p>
      </div>
      </BaseContainer>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref('')

const copyrightYear = new Date().getFullYear()

// Continuous self-drawing divider mark
const dividerStrokeRef = ref<SVGGElement | null>(null)
const dividerFillRef = ref<SVGGElement | null>(null)

const { gsap, createContext, prefersReducedMotion } = useGsap()

onMounted(() => {
  if (!dividerStrokeRef.value || !dividerFillRef.value || !gsap || prefersReducedMotion.value) {
    return
  }

  const strokePaths = dividerStrokeRef.value.querySelectorAll('path')
  if (!strokePaths.length) {
    return
  }

  createContext(() => {
    // Hidden start state set in JS so no-JS / reduced-motion shows a solid Q.
    // GSAP pauses the ticker when the tab is hidden, so an always-on loop here
    // costs nothing while the page is backgrounded.
    gsap.set(strokePaths, { attr: { 'stroke-dashoffset': 1 } })
    gsap.set(dividerFillRef.value, { opacity: 0 })

    // Draw the outline, bloom the fill, hold, then un-draw and repeat forever
    gsap.timeline({ repeat: -1, repeatDelay: 1.4 })
      .to(strokePaths, {
        attr: { 'stroke-dashoffset': 0 },
        duration: 1.1,
        stagger: 0.12,
        ease: 'power2.inOut',
      })
      .to(dividerFillRef.value, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.15')
      .to(dividerStrokeRef.value, { opacity: 0.35, duration: 0.4 }, '<')
      .to(dividerFillRef.value, { opacity: 0, duration: 0.4, ease: 'power1.in' }, '+=1.2')
      .set(dividerStrokeRef.value, { opacity: 1 }, '<')
      .to(strokePaths, {
        attr: { 'stroke-dashoffset': 1 },
        duration: 1,
        stagger: { each: 0.12, from: 'end' },
        ease: 'power2.inOut',
      })
  }, dividerStrokeRef.value)
})

// Opens Google Maps directions to the hotel address
const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Plot+C-11,+Block+A,+Sector+1,+Purbachal+Road,+Dhaka+1229'

const linkColumns = [
  {
    title: 'Overview',
    links: [
      { label: 'Q Hotel Home', to: '/' },
      { label: 'About Us', to: '/#about' },
      { label: 'Rooms & Suites', to: '/#rooms' },
      { label: 'Dining / Restaurant', to: '/dining' },
      { label: 'Services & Facilities', to: '/services' },
      { label: 'Blogs & Articles', to: '/blog' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Long Stay', to: '/long-stay' },
      { label: 'Meetings & Events', to: '/meetings-events' },
      { label: 'Offer & Packages', to: '/offers' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Careers', to: '/careers' },
      { label: 'Site Map', to: '/sitemap' },
    ],
  },
  {
    title: 'Help & Support',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Hotel Policy', to: '/hotel-policy' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms' },
    ],
  },
]

const nearbyAttractions = [
  'Ahsan Manzil Museum',
  'The Lalbagh Fort',
  'National Martyrs',
  'Dhakeshwari Temple',
  'Bangladesh National Museum',
]

const hotelInformation = [
  'Check-In: 3:00 PM',
  'Check-Out: 12:00 PM',
  'Minimum age to Check In 18',
  'Pets are not allowed.',
  'Complimentary On-Site Parking',
]

// Newsletter submission is not yet wired to a backend; prevent the default
// navigation so the UI stays intact until the subscribe API is connected.
function handleSubscribe() {
  // TODO: POST `email.value` to the newsletter endpoint once available.
}
</script>
