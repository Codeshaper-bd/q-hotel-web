<template>
  <!-- Floating WhatsApp contact: pinned to the bottom-right of every page so
       guests can reach the hotel from anywhere. A real link (not a button),
       opening WhatsApp in a new tab with the number prefilled. -->
  <a
    href="https://wa.me/8801713377700"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Q Hotel on WhatsApp"
    class="fixed bottom-6 right-6 z-30"
  >
    <img
      src="/images/whatsapp.png"
      alt=""
      width="74"
      height="74"
      class="h-14 w-14 sm:h-16 sm:w-16"
      loading="lazy"
    />
  </a>
</template>