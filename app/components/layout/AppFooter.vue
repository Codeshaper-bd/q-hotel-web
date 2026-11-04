<script setup lang="ts">
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

interface SocialLink {
  label: string;
  href: string;
  /** SVG path; omitted for Instagram, which is drawn from shapes in the template */
  path?: string;
  isFilled: boolean;
}

const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590699274978",
    isFilled: true,
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.13-2.41-.13-2.39 0-4.03 1.46-4.03 4.14v2.31H7.5V13h2.76v8h3.24z",
  },
  { label: "Instagram", href: "https://www.instagram.com/qhoteldhaka/", isFilled: false },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/qhoteldhaka/",
    isFilled: true,
    path: "M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.3h3.1V19H3.4V8.3zm5.3 0h2.97v1.47h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V19h-3.1v-4.76c0-1.14-.02-2.6-1.58-2.6-1.58 0-1.83 1.24-1.83 2.52V19H8.7V8.3z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    isFilled: true,
    path: "M21.6 7.9s-.19-1.36-.78-1.96c-.75-.79-1.58-.79-1.96-.83C16.14 4.9 12 4.9 12 4.9h-.01s-4.13 0-6.85.21c-.38.04-1.21.04-1.96.83-.59.6-.78 1.96-.78 1.96s-.2 1.6-.2 3.2v1.5c0 1.6.2 3.2.2 3.2s.19 1.36.78 1.96c.75.79 1.74.76 2.18.85 1.58.15 6.64.2 6.64.2s4.14-.01 6.86-.21c.38-.05 1.21-.05 1.96-.84.59-.6.78-1.96.78-1.96s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2zM9.9 14.6V9.3l5.3 2.66-5.3 2.64z",
  },
];

// Opens Google Maps directions to the hotel address
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Plot+C-11,+Block+A,+Sector+1,+Purbachal+Road,+Dhaka+1229";

const linkColumns = [
  {
    title: "Overview",
    links: [
      { label: "Q Hotel Dhaka", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Rooms & Suites", to: "/rooms" },
      { label: "Dining", to: "/dining" },
      { label: "Facilities & Amenities", to: "/facilities-amenities" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Long Stays", to: "/long-stays" },
      { label: "Meetings & Events", to: "/meetings-events" },
      { label: "Gallery", to: "/gallery" },
      { label: "Site Map", to: "/sitemap" },
      { label: "Nearby Locations", to: "/nearby-locations" },
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
</script>

<template>
  <footer class="bg-paper p-2 sm:p-3 lg:p-4">
    <!-- Newsletter sits on the paper page, directly above the dark panel -->
    <NewsletterSubscribeSection />

    <div class="overflow-hidden rounded-sm bg-[#060C14] text-paper">
      <BaseContainer size="xl">
        <!-- Brand mark between two hairlines. The Q draws itself in a
             continuous loop; it renders solid without JS / under reduced
             motion. -->
        <div class="flex items-center gap-6 pt-16" aria-hidden="true">
          <span class="h-px flex-1 bg-[#373737]" />
          <svg class="h-[34px] w-[34px] text-[#DFA558]" viewBox="0 0 51 50" fill="none">
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
          <span class="h-px flex-1 bg-[#373737]" />
        </div>

        <!-- Follow us, sitemap columns, address -->
        <FadeReveal
          class="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:grid-cols-3 lg:grid-cols-[auto_auto_auto_auto_auto] lg:justify-between lg:gap-x-10"
          :distance="20"
          start="top 95%"
        >
          <div>
            <h2 class="text-base font-medium uppercase text-white">Follow us</h2>
            <ul
              class="mt-[28px] flex items-center gap-4"
              aria-label="Q Hotel on social media"
            >
              <li v-for="social in socialLinks" :key="social.label">
                <a
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex size-10 items-center justify-center border border-[#373737] text-[#ACACAC] transition-colors duration-fast hover:border-champagne hover:text-champagne focus-visible:border-champagne focus-visible:text-champagne"
                  :aria-label="`Q Hotel on ${social.label}`"
                >
                  <svg
                    class="size-[18px]"
                    viewBox="0 0 24 24"
                    :fill="social.isFilled ? 'currentColor' : 'none'"
                    :stroke="social.isFilled ? 'none' : 'currentColor'"
                    stroke-width="1.6"
                    aria-hidden="true"
                  >
                    <path v-if="social.path" :d="social.path" />
                    <template v-else>
                      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                      <circle cx="12" cy="12" r="3.8" />
                      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
                    </template>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <nav
            v-for="column in linkColumns"
            :key="column.title"
            :aria-label="column.title"
          >
            <h2 class="text-base font-medium uppercase text-white">
              {{ column.title }}
            </h2>
            <ul class="mt-6 space-y-3 text-sm text-[#ACACAC]">
              <li v-for="link in column.links" :key="link.label">
                <NuxtLink
                  :to="link.to"
                  :class="[
                    'transition-colors duration-fast hover:text-champagne',
                    link.to === '/' ? 'text-white' : '',
                  ]"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div>
            <h2 class="text-base font-medium uppercase text-white">Address</h2>
            <ul class="mt-6 space-y-4 text-sm leading-5 text-[#ACACAC]">
              <li class="flex items-start gap-1.5">
                <svg class="mt-[3px] size-[14px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.14-7.5 11.25-7.5 11.25S4.5 17.64 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <a
                  :href="directionsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="max-w-[244px] transition-colors duration-fast hover:text-champagne"
                >
                  Plot C-11, Block A, Sector 1, Purbachal Road, Dhaka 1229
                </a>
              </li>
              <li class="flex items-start gap-1.5">
                <svg class="mt-[3px] size-[14px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.37a1.5 1.5 0 00-1.14-1.46l-4.06-1.01a1.5 1.5 0 00-1.58.62l-.83 1.24a11.3 11.3 0 01-5-5l1.24-.83a1.5 1.5 0 00.62-1.58l-1.01-4.06A1.5 1.5 0 007.12 2.25H5.75A2.25 2.25 0 003.5 4.5" />
                </svg>
                <a class="transition-colors duration-fast hover:text-champagne" href="tel:+8801713377700">+88-01713377700</a>
              </li>
              <li class="flex items-start gap-1.5">
                <svg class="mt-[3px] size-[14px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25m-19.5 0v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75m-19.5 0l9.75 6.75 9.75-6.75" />
                </svg>
                <a class="transition-colors duration-fast hover:text-champagne" href="mailto:info@qhl.com.bd">info@qhl.com.bd</a>
              </li>
            </ul>
          </div>
        </FadeReveal>

        <!-- Legal bar -->
        <div
          class="flex flex-col gap-3 border-t border-[#373737] py-6 text-base text-white/70 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {{ copyrightYear }}
            <span class="text-white">Q Hotel Dhaka.</span> All Rights Reserved
          </p>
          <p>
            Designed &amp; Developed by
            <a
              href="https://codeshaper.net"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white transition-colors duration-fast hover:text-champagne"
              >Codeshaper</a
            >
          </p>
        </div>
      </BaseContainer>
    </div>
  </footer>
</template>
