<template>
  <!--
    Reusable page banner: a static full-bleed photo with breadcrumb, title,
    and an optional intro statement — the shared composition every secondary
    page opens with. An optional #console slot renders below the banner,
    pulled up over its bottom edge (e.g. the booking search bar), so pages
    that need a task console keep the same overlap without duplicating it.
    An optional #scroll-cue slot renders inside the banner, anchored over its
    lower edge (e.g. the about page's mouse-shaped scroll indicator).
  -->
  <section :aria-labelledby="bannerTitleId" class="relative text-paper">
    <div class="relative mt-[var(--header-height)] flex h-[480px] items-center justify-center overflow-hidden sm:h-[640px] lg:h-[800px]">
      <BaseImage
        :src="image"
        alt=""
        :width="2560"
        :height="1067"
        :quality="90"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:2560px"
        class="absolute inset-0"
      />
      <div class="absolute inset-0 bg-[#0F0F10]/40" aria-hidden="true" />

      <FadeReveal :stagger="0.12" :blur="6" class="relative z-10">
        <div class="flex flex-col items-center gap-4 text-center">
          <div data-reveal-item>
            <BaseBreadcrumb v-if="breadcrumb?.length" :items="breadcrumb" />
          </div>

          <h1
            data-reveal-item
            :id="bannerTitleId"
            :class="[
              'font-display text-paper',
              titleClass ??
                'text-4xl sm:text-5xl lg:text-[56px] lg:font-semibold',
            ]"
          >
            {{ title }}
          </h1>
          <p v-if="description" data-reveal-item :class="['text-lg font-medium text-paper', descriptionClass ?? 'max-w-xl']">
            {{ description }}
          </p>
        </div>
      </FadeReveal>

      <slot name="scroll-cue" />
    </div>

    <!-- Pulled up over the banner's bottom edge; normal flow resumes right
         after it, so nothing below needs absolute positioning to compensate.
         No z-index here (and no isolate on the section above): a stacking
         context would cap the console's popover panels below the fixed
         header's z-40, hiding the calendar behind them. -->
    <BaseContainer v-if="$slots.console" size="xl" class="relative -mt-14 pb-10 sm:-mt-12 sm:pb-12">
      <slot name="console" />
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
type PageBreadcrumbItem = {
  label: string
  to?: string
}

defineProps<{
  title: string
  description?: string
  breadcrumb?: PageBreadcrumbItem[]
  image: string
  /** Optional classes overriding the default title size/weight. */
  titleClass?: string
  /** Optional classes overriding the default description width. */
  descriptionClass?: string
}>()

const bannerTitleId = useId()
</script>