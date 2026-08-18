<template>
  <!--
    Reusable modal shell built on the native <dialog>: showModal() gives a real
    focus trap, an inert background, Esc-to-close and focus restore for free.
    Lenis is stopped while it is open and the page behind is frozen. A close
    button is pinned to the shell's top-right corner — it sits on the wrapper,
    which never scrolls, so it stays put while the panel scrolls internally.
    Content goes in the default slot.
  -->
  <dialog
    ref="dialogRef"
    class="base-modal"
    :aria-labelledby="labelledBy"
    @click="handleBackdropClick"
    @close="handleClose"
  >
    <div :class="['relative w-full', maxWidthClass]">
      <slot />

      <button
        ref="closeButtonRef"
        type="button"
        :aria-label="closeLabel"
        :class="closeButtonClass"
        @click="close"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          :class="closeIconClass"
          stroke="currentColor"
          stroke-width="1.6"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type Lenis from "lenis";

const props = withDefaults(
  defineProps<{
    /** v-model: `true` opens the modal */
    modelValue: boolean;
    /** id of the element that names this dialog (for aria-labelledby) */
    labelledBy?: string;
    /** aria-label for the built-in close button */
    closeLabel?: string;
    /** Tailwind classes sizing the panel wrapper */
    maxWidthClass?: string;
    /** Tailwind classes for the built-in close button (position + look) */
    closeButtonClass?: string;
    /** Tailwind classes for the close button's X icon */
    closeIconClass?: string;
  }>(),
  {
    labelledBy: undefined,
    closeLabel: "Close dialog",
    maxWidthClass: "max-w-[1260px]",
    closeButtonClass:
      "absolute right-4 top-4 z-20 flex size-8 items-center justify-center border border-[#E5DBC4] bg-[#FAF5E8] text-[#29241F] transition-colors duration-200 hover:bg-[#F1E6CC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C87532]",
    closeIconClass: "size-4",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);

const lenis = useNuxtApp().$lenis as Lenis | undefined;

/** Closing the native dialog is the single exit path (button, backdrop and
 *  Esc all funnel through here), so every close emits once */
function close() {
  dialogRef.value?.close();
}

function handleClose() {
  emit("close");
  emit("update:modelValue", false);
}

/** A click that lands on the dialog itself is a click on the backdrop */
function handleBackdropClick(event: MouseEvent) {
  if (event.target === dialogRef.value) {
    close();
  }
}

/** Freeze the page behind the modal: Lenis keeps smoothing wheel input
 *  otherwise, and native scroll still runs for reduced-motion visitors */
function setPageFrozen(frozen: boolean) {
  if (frozen) {
    lenis?.stop();
    document.documentElement.classList.add("overflow-hidden");
    return;
  }

  lenis?.start();
  document.documentElement.classList.remove("overflow-hidden");
}

watch(
  () => props.modelValue,
  async (open) => {
    const dialog = dialogRef.value;
    if (!dialog) {
      return;
    }

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
        setPageFrozen(true);
      }

      await nextTick();
      closeButtonRef.value?.focus();
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
    setPageFrozen(false);
  },
);

onBeforeUnmount(() => {
  setPageFrozen(false);
});
</script>

<style scoped>
/* Full-viewport, centered shell; the panel inside caps its own size */
.base-modal {
  background: transparent;
  border: 0;
  height: 100dvh;
  max-height: 100dvh;
  max-width: 100vw;
  padding: 0.75rem;
  width: 100vw;
}

@media (min-width: 640px) {
  .base-modal {
    padding: 1rem;
  }
}

.base-modal[open] {
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-modal::backdrop {
  backdrop-filter: blur(2px);
  background: rgb(0 0 0 / 0.62);
}

@media (prefers-reduced-motion: no-preference) {
  .base-modal[open] {
    animation: base-modal-in 300ms var(--ease-premium);
  }

  .base-modal[open]::backdrop {
    animation: base-backdrop-in 300ms ease-out;
  }
}

@keyframes base-modal-in {
  from {
    opacity: 0;
    transform: translateY(0.75rem) scale(0.99);
  }
}

@keyframes base-backdrop-in {
  from {
    opacity: 0;
  }
}
</style>