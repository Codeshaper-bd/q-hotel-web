<template>
  <div class="promo-bar">
    <p class="promo-copy">
      Bookings over 10 nights and more will be applicable for …% discount
    </p>
    <button
      type="button"
      class="promo-close"
      aria-label="Dismiss announcement"
      @click="$emit('dismiss')"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g clip-path="url(#promo-close-clip)">
          <path
            d="M15.8045 0.195191C15.6795 0.0702103 15.51 0 15.3332 0C15.1564 0 14.9869 0.0702103 14.8619 0.195191L7.99986 7.05719L1.13786 0.195191C1.01284 0.0702103 0.8433 0 0.666524 0C0.489748 0 0.320209 0.0702103 0.195191 0.195191C0.0702103 0.320209 0 0.489748 0 0.666524C0 0.8433 0.0702103 1.01284 0.195191 1.13786L7.05719 7.99986L0.195191 14.8619C0.0702103 14.9869 0 15.1564 0 15.3332C0 15.51 0.0702103 15.6795 0.195191 15.8045C0.320209 15.9295 0.489748 15.9997 0.666524 15.9997C0.8433 15.9997 1.01284 15.9295 1.13786 15.8045L7.99986 8.94252L14.8619 15.8045C14.9869 15.9295 15.1564 15.9997 15.3332 15.9997C15.51 15.9997 15.6795 15.9295 15.8045 15.8045C15.9295 15.6795 15.9997 15.51 15.9997 15.3332C15.9997 15.1564 15.9295 14.9869 15.8045 14.8619L8.94252 7.99986L15.8045 1.13786C15.9295 1.01284 15.9997 0.8433 15.9997 0.666524C15.9997 0.489748 15.9295 0.320209 15.8045 0.195191Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="promo-close-clip">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ dismiss: [] }>();
</script>

<style scoped>
/* A grid with balanced side columns keeps the copy optically centered while
   the close button sits on the right edge. Height is owned by the header's
   promo-bar-wrap so the dismiss collapse can animate it. */
.promo-bar {
  display: grid;
  grid-template-columns: 2.5rem 1fr 2.5rem;
  align-items: center;
  height: 100%;
  overflow: hidden;
  background: #0f0f10;
}

.promo-copy {
  grid-column: 2;
  font-size: 16px;
  line-height: 1.4;
  color: #ffffff;
  text-align: center;
}

.promo-close {
  grid-column: 3;
  display: flex;
  height: 100%;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  justify-self: end;
  color: #ffffff;
  transition: opacity var(--duration-fast) var(--ease-premium);
}

.promo-close:hover {
  opacity: 0.75;
}

.promo-close:active {
  opacity: 0.9;
}
</style>
