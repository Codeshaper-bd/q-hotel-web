<script setup lang="ts">
const email = ref("");

const copyrightYear = new Date().getFullYear();

// Continuous self-drawing divider mark
const dividerStrokeRef = ref<SVGGElement | null>(null);
const dividerFillRef = ref<SVGGElement | null>(null);

const { gsap, createContext, prefersReducedMotion } = useGsap();

onMounted(() => {
  if (
    !dividerStrokeRef.value ||
    !dividerFillRef.value ||
    !gsap ||
    prefersReducedMotion.value
  ) {
    return;
  }

  const strokePaths = dividerStrokeRef.value.querySelectorAll("path");
  if (!strokePaths.length) {
    return;
  }

  createContext(() => {
    // Hidden start state set in JS so no-JS / reduced-motion shows a solid Q.
    // GSAP pauses the ticker when the tab is hidden, so an always-on loop here
    // costs nothing while the page is backgrounded.
    gsap.set(strokePaths, { attr: { "stroke-dashoffset": 1 } });
    gsap.set(dividerFillRef.value, { opacity: 0 });

    // Draw the outline, bloom the fill, hold, then un-draw and repeat forever
    gsap
      .timeline({ repeat: -1, repeatDelay: 1.4 })
      .to(strokePaths, {
        attr: { "stroke-dashoffset": 0 },
        duration: 1.1,
        stagger: 0.12,
        ease: "power2.inOut",
      })
      .to(
        dividerFillRef.value,
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.15",
      )
      .to(dividerStrokeRef.value, { opacity: 0.35, duration: 0.4 }, "<")
      .to(
        dividerFillRef.value,
        { opacity: 0, duration: 0.4, ease: "power1.in" },
        "+=1.2",
      )
      .set(dividerStrokeRef.value, { opacity: 1 }, "<")
      .to(strokePaths, {
        attr: { "stroke-dashoffset": 1 },
        duration: 1,
        stagger: { each: 0.12, from: "end" },
        ease: "power2.inOut",
      });
  }, dividerStrokeRef.value);
});

// Opens Google Maps directions to the hotel address
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Plot+C-11,+Block+A,+Sector+1,+Purbachal+Road,+Dhaka+1229";

const linkColumns = [
  {
    title: "Overview",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Rooms & Suites", to: "/rooms" },
      { label: "Dining / Restaurant", to: "/dining" },
      { label: "Services & Facilities", to: "/services" },
      { label: "Blogs & Articles", to: "/blog" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Long Stays", to: "/long-stays" },
      { label: "Meetings & Events", to: "/meetings-events" },
      { label: "Gallery", to: "/gallery" },
      { label: "Site Map", to: "/sitemap" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "FAQs", to: "/faqs" },
      { label: "Hotel Policy", to: "/hotel-policy" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];

const nearbyAttractions = [
  "Outdoor Swimming Pool",
  "Free Wifi",
  "Airport Shuttle",
  "Free Parking",
  "Fitness Center & Spa",
  "Restaurants & Bar",
  "24-Hours Security & More...",
];

const hotelInformation = [
  {
    label: 'Check-In: 2:00 PM',
    viewBox: '0 0 16 16',
    paths: [
      'M8 4V8H11M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961 13.2417 11.0241 12.2426 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8Z',
    ],
  },
  {
    label: 'Check-Out: 12:00 PM',
    viewBox: '0 0 16 16',
    paths: [
      'M8 4V8H11M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961 13.2417 11.0241 12.2426 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8Z',
    ],
  },
  {
    label: 'Minimum age to Check In: 18',
    viewBox: '0 0 16 16',
    paths: [
      'M10.667 7.33333L12.0003 8.66667L14.667 6',
      'M10.6663 14V12.6667C10.6663 11.9594 10.3854 11.2811 9.88529 10.781C9.3852 10.281 8.70692 10 7.99967 10H3.99967C3.29243 10 2.61415 10.281 2.11406 10.781C1.61396 11.2811 1.33301 11.9594 1.33301 12.6667V14',
      'M5.99967 7.33333C7.47243 7.33333 8.66634 6.13943 8.66634 4.66667C8.66634 3.19391 7.47243 2 5.99967 2C4.52692 2 3.33301 3.19391 3.33301 4.66667C3.33301 6.13943 4.52692 7.33333 5.99967 7.33333Z',
    ],
  },
  {
    label: 'Pets are not allowed',
    viewBox: '0 0 16 16',
    paths: [
      'M7.33333 3.9987C8.06971 3.9987 8.66667 3.40174 8.66667 2.66536C8.66667 1.92898 8.06971 1.33203 7.33333 1.33203C6.59695 1.33203 6 1.92898 6 2.66536C6 3.40174 6.59695 3.9987 7.33333 3.9987Z',
      'M12.0003 6.66667C12.7367 6.66667 13.3337 6.06971 13.3337 5.33333C13.3337 4.59695 12.7367 4 12.0003 4C11.2639 4 10.667 4.59695 10.667 5.33333C10.667 6.06971 11.2639 6.66667 12.0003 6.66667Z',
      'M13.3333 11.9987C14.0697 11.9987 14.6667 11.4017 14.6667 10.6654C14.6667 9.92898 14.0697 9.33203 13.3333 9.33203C12.597 9.33203 12 9.92898 12 10.6654C12 11.4017 12.597 11.9987 13.3333 11.9987Z',
      'M6.00048 6.66797C6.43822 6.66797 6.87168 6.75419 7.27609 6.9217C7.68051 7.08922 8.04798 7.33475 8.35751 7.64428C8.66703 7.95381 8.91257 8.32127 9.08008 8.72569C9.2476 9.13011 9.33382 9.56356 9.33382 10.0013V12.3346C9.33364 12.8923 9.13375 13.4314 8.77036 13.8544C8.40698 14.2774 7.90412 14.5562 7.35288 14.6404C6.80163 14.7247 6.23845 14.6087 5.76535 14.3135C5.29224 14.0183 4.94049 13.5635 4.77382 13.0313C4.48937 12.1135 3.88937 11.5124 2.97382 11.228C2.44194 11.0614 1.98726 10.7099 1.69206 10.2371C1.39685 9.76439 1.28063 9.20158 1.36441 8.65055C1.44819 8.09953 1.72644 7.5967 2.14882 7.23305C2.5712 6.86939 3.1098 6.66894 3.66715 6.66797H6.00048Z',
    ],
  },
  {
    label: 'Complimentary On-Site Parking',
    viewBox: '0 0 16 16',
    paths: [
      'M12.6663 11.3346H13.9997C14.3997 11.3346 14.6663 11.068 14.6663 10.668V8.66797C14.6663 8.06797 14.1997 7.53464 13.6663 7.4013C12.4663 7.06797 10.6663 6.66797 10.6663 6.66797C10.6663 6.66797 9.79967 5.73464 9.19967 5.13464C8.86634 4.86797 8.46634 4.66797 7.99967 4.66797H3.33301C2.93301 4.66797 2.59967 4.93464 2.39967 5.26797L1.46634 7.2013C1.37806 7.45879 1.33301 7.72911 1.33301 8.0013V10.668C1.33301 11.068 1.59967 11.3346 1.99967 11.3346H3.33301',
      'M4.66634 12.6667C5.40272 12.6667 5.99967 12.0697 5.99967 11.3333C5.99967 10.597 5.40272 10 4.66634 10C3.92996 10 3.33301 10.597 3.33301 11.3333C3.33301 12.0697 3.92996 12.6667 4.66634 12.6667Z',
      'M6 11.332H10',
      'M11.3333 12.6667C12.0697 12.6667 12.6667 12.0697 12.6667 11.3333C12.6667 10.597 12.0697 10 11.3333 10C10.597 10 10 10.597 10 11.3333C10 12.0697 10.597 12.6667 11.3333 12.6667Z',
    ],
  },
];

// Newsletter submission is not yet wired to a backend; prevent the default
// navigation so the UI stays intact until the subscribe API is connected.
function handleSubscribe() {
  // TODO: POST `email.value` to the newsletter endpoint once available.
}
</script>


<template>
  <!-- Inset frame: paper page shows on all four sides of the dark panel -->
  <footer class="bg-paper p-2 sm:p-3 lg:p-4">
    <div class="overflow-hidden rounded-sm bg-night text-paper">
      <BaseContainer size="xl">
        <!-- Upper band: brand, contact + actions, newsletter + rating -->
        <div class="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.15fr_0.9fr_1.05fr] lg:gap-x-20 xl:grid-cols-[1.2fr_0.85fr_1.05fr] xl:gap-x-28">
          <!-- Brand -->
          <div class="flex flex-col">
            <div class="aspect-[270/48] h-9 w-auto self-start sm:h-10">
              <BaseImage src="/images/footer/q-hotle-logo.png" alt="Q Hotel Dhaka" :width="270" :height="48"
                fit="contain" priority />
            </div>

            <p class="mt-6 max-w-md text-base leading-7 text-[#ACACAC]">
              Q Hotel Dhaka offers a refined 5-star hospitality experience with
              elegant accommodations, premium wellness facilities, exceptional
              dining, and personalized service in the heart of the city.
            </p>

            <ul class="mt-10 flex items-center gap-3" aria-label="Q Hotel on social media">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  class="flex h-9 w-9 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-fast hover:border-champagne hover:text-champagne"
                  aria-label="Q Hotel on Facebook">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path
                      d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.13-2.41-.13-2.39 0-4.03 1.46-4.03 4.14v2.31H7.5V13h2.76v8h3.24z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  class="flex h-9 w-9 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-fast hover:border-champagne hover:text-champagne"
                  aria-label="Q Hotel on Instagram">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                    aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                    <circle cx="12" cy="12" r="3.8" />
                    <circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  class="flex h-9 w-9 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-fast hover:border-champagne hover:text-champagne"
                  aria-label="Q Hotel on LinkedIn">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path
                      d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.3h3.1V19H3.4V8.3zm5.3 0h2.97v1.47h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V19h-3.1v-4.76c0-1.14-.02-2.6-1.58-2.6-1.58 0-1.83 1.24-1.83 2.52V19H8.7V8.3z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                  class="flex h-9 w-9 items-center justify-center border border-paper/20 text-paper/70 transition-colors duration-fast hover:border-champagne hover:text-champagne"
                  aria-label="Q Hotel on YouTube">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path
                      d="M21.6 7.9s-.19-1.36-.78-1.96c-.75-.79-1.58-.79-1.96-.83C16.14 4.9 12 4.9 12 4.9h-.01s-4.13 0-6.85.21c-.38.04-1.21.04-1.96.83-.59.6-.78 1.96-.78 1.96s-.2 1.6-.2 3.2v1.5c0 1.6.2 3.2.2 3.2s.19 1.36.78 1.96c.75.79 1.74.76 2.18.85 1.58.15 6.64.2 6.64.2s4.14-.01 6.86-.21c.38-.05 1.21-.05 1.96-.84.59-.6.78-1.96.78-1.96s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2zM9.9 14.6V9.3l5.3 2.66-5.3 2.64z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact + actions -->
          <div class="flex flex-col lg:pt-1">
            <ul class="space-y-5 text-sm text-paper/70">
              <li class="flex items-center gap-3">
                <svg class="h-4 w-4 shrink-0 text-paper/40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.37a1.5 1.5 0 00-1.14-1.46l-4.06-1.01a1.5 1.5 0 00-1.58.62l-.83 1.24a11.3 11.3 0 01-5-5l1.24-.83a1.5 1.5 0 00.62-1.58l-1.01-4.06A1.5 1.5 0 007.12 2.25H5.75A2.25 2.25 0 003.5 4.5" />
                </svg>
                <a class="transition-colors duration-fast hover:text-champagne"
                  href="tel:+8801713377700">+88-01713377700</a>
              </li>
              <li class="flex items-center gap-3">
                <svg class="h-4 w-4 shrink-0 text-paper/40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25m-19.5 0v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75m-19.5 0l9.75 6.75 9.75-6.75" />
                </svg>
                <a class="transition-colors duration-fast hover:text-champagne"
                  href="mailto:info@qhl.com.bd">info@qhl.com.bd</a>
              </li>
              <li class="flex items-start gap-3">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-paper/40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 10.5c0 7.14-7.5 11.25-7.5 11.25S4.5 17.64 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span class="leading-6">Plot C-11, Block A, Sector 1,<br />Purbachal Road, Dhaka
                  1229</span>
              </li>
            </ul>

            <div class="mt-10 flex flex-wrap items-stretch gap-3">
              <!-- Directions: outline split control with arrow -->
              <a :href="directionsUrl" target="_blank" rel="noopener noreferrer"
                class="group inline-flex min-h-11 items-stretch border border-[#EED4A3] text-paper transition-colors duration-fast hover:border-champagne hover:text-champagne">
                <span class="flex items-center px-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
                  Get Directions
                </span>
                <span
                  class="flex items-center border-l border-[#EED4A3] px-3.5 transition-colors duration-fast group-hover:border-champagne"
                  aria-hidden="true">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <!-- Newsletter + rating -->
          <div class="flex flex-col lg:pt-1">
            <!-- Newsletter -->
            <p class=" text-base text-paper">
              Subscribe to receive exclusive offers, special promotions, and the
              latest updates from Q Hotel Dhaka.
            </p>

            <form class="mt-10 flex w-full items-end gap-4" @submit.prevent="handleSubscribe">
              <div class="flex-1">
                <label for="footer-newsletter-email" class="sr-only">Your email address</label>
                <input id="footer-newsletter-email" v-model="email" type="email" required autocomplete="email"
                  placeholder="Your email here"
                  class="w-full border-b border-paper/25 bg-transparent pb-2 text-sm text-paper placeholder:text-paper/40 focus:border-champagne focus:outline-none" />
              </div>
              <button type="submit"
                class="shrink-0 pb-2 text-base font-bold uppercase text-paper transition-colors duration-fast hover:text-gold">
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
              <path v-for="(markPath, index) in qHotelLogoPaths" :key="`divider-stroke-${index}`" :d="markPath"
                fill="none" stroke="currentColor" stroke-width="0.6" pathLength="1" stroke-dasharray="1"
                stroke-dashoffset="0" />
            </g>
            <!-- Fill layer: blooms after the outline draw (hidden by JS first) -->
            <g ref="dividerFillRef">
              <path v-for="(markPath, index) in qHotelLogoPaths" :key="`divider-fill-${index}`" :d="markPath"
                fill="currentColor" />
            </g>
          </svg>
          <span class="h-px flex-1 bg-paper/25" />
        </div>

        <!-- Sitemap columns -->
        <div class="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:grid-cols-3 lg:grid-cols-5">
          <nav v-for="column in linkColumns" :key="column.title" :aria-label="column.title">
            <h2 class="font-display font-semibold text-lg lg:text-[28px] text-[#FFFFFF]">
              {{ column.title }}
            </h2>
            <div class="h-px w-[70px] bg-[#373737] mt-2.5"></div>
            <ul class="mt-6 space-y-3.5 text-base text-[#ACACAC]">
              <li v-for="link in column.links" :key="link.label">
                <NuxtLink :to="link.to" class="transition-colors duration-fast hover:text-champagne">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Nearby attractions: informational, not navigation -->
          <div>
            <h2 class="font-display font-semibold text-lg lg:text-[28px] text-[#FFFFFF]">
              Facilities & Amenities
            </h2>
            <div class="h-px w-[70px] bg-[#373737] mt-2.5"></div>
            <ul class="mt-6 space-y-3.5 text-base text-[#ACACAC]">
              <li v-for="attraction in nearbyAttractions" :key="attraction">
                {{ attraction }}
              </li>
            </ul>
          </div>

          <!-- Hotel information: factual list with markers -->
          <div>
            <h2 class="font-display font-semibold text-lg lg:text-[28px] text-[#FFFFFF]">
              Hotel Information
            </h2>
            <div class="h-px w-[70px] bg-[#373737] mt-2.5"></div>
            <ul class="mt-6 space-y-3.5 text-base text-[#ACACAC]">
              <li v-for="info in hotelInformation" :key="info.label" class="flex items-start gap-2.5">
                <svg class="mt-[3px] size-4 shrink-0 text-[#ACACAC]" :viewBox="info.viewBox" fill="none"
                  stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                  aria-hidden="true">
                  <path v-for="path in info.paths" :key="path" :d="path" />
                </svg>
                {{ info.label }}
              </li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col gap-4 border-t border-paper/10 py-7 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-1 lg:flex-row lg:items-center lg:gap-4">
            <span class="shrink-0 text-sm font-display font-semibold text-paper sm:text-lg lg:text-2xl">We
              Accept:</span>
            <div class="sm:flex-1 flex items-center gap-3">
              <img src="/images/footer/visa_cards.png"
                alt="Accepted payment methods: Visa, Nagad, bKash, American Express, Mastercard, DBBL, Upay, Apple Pay, NexusPay, iPay, cityBank, Brac Bank, Bank Asia, Islami Bank, Q-Cash, fastcash, Upay, and City Bank Direct"
                width="1244" height="48" loading="lazy" class="h-auto w-full max-w-full min-w-0 sm:w-auto " />
              <span class="shrink-0 text-sm text-paper sm:text-base">and more........</span>
            </div>
          </div>

          <div class="flex shrink-0 flex-col lg:items-center lg:justify-center gap-1.5">
            <span class="text-base text-paper">Verified By</span>
            <img src="/images/footer/verified_ssl_commerz.png" alt="SSLCommerz" width="145" height="31" loading="lazy"
              class="h-6 lg:w-auto sm:h-7" />
          </div>
        </div>

        <!-- Legal bar -->
        <div
          class="flex flex-col gap-3 border-t border-paper/10 py-7 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {{ copyrightYear }}
            <span class="text-paper/70">Q Hotel Dhaka</span>. All Rights
            Reserved
          </p>
          <p>
            Designed &amp; Developed by
            <a href="https://codeshaper.net" target="_blank" rel="noopener noreferrer"
              class="text-paper/70 transition-colors duration-fast hover:text-champagne">Codeshaper</a>
          </p>
        </div>
      </BaseContainer>
    </div>
  </footer>
</template>
