<!--
  Meeting setup list: five static editorial rows — thin divider, thin-line
  icon, title + description. Warm cream backdrop, ~800px centered column,
  no cards or shadows. Plain static markup by design.
-->
<template>
  <div :class="embedded ? '' : 'bg-[#F5F1E9]'">
    <div :class="embedded ? '' : 'mx-auto w-full max-w-[800px] px-5 py-16 sm:px-6 lg:py-24'">
      <h2 v-if="!embedded" id="meeting-setup-title" class="sr-only">Meeting Set-Up Examples</h2>

      <!-- Theater -->
      <div class="border-t border-[#d8d3cb] py-7">
        <div class="flex items-center gap-5 sm:gap-8">
          <div class="flex w-[44px] shrink-0 justify-center sm:w-[70px]">
            <IconTheater color="#282522" class="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div class="min-w-0">
            <h3 class="text-sm font-medium text-[#282522] sm:text-base">
              Theater 
            </h3>
            <p class="mt-1.5 text-xs leading-[1.6] text-[#6b645c] sm:text-[13px]">
              Ideal for presentations, seminars, product launches, and large meetings where guests face a central stage or speaker. This setup maximizes seating capacity while keeping the focus on the presentation.
            </p>
          </div>
        </div>
      </div>

      <!-- Classroom -->
      <div class="border-t border-[#d8d3cb] py-7">
        <div class="flex items-center gap-5 sm:gap-8">
          <div class="flex w-[44px] shrink-0 justify-center sm:w-[70px]">
            <IconClassroom color="#282522" class="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div class="min-w-0">
            <h3 class="text-sm font-medium text-[#282522] sm:text-base">
              Classroom
            </h3>
            <p class="mt-1.5 text-xs leading-[1.6] text-[#6b645c] sm:text-[13px]">
              Best suited for training sessions, workshops, lectures, and conferences that require note-taking or laptop use. Tables and chairs are arranged in rows facing the presenter.
            </p>
          </div>
        </div>
      </div>

      <!-- U-Shape -->
      <div class="border-t border-[#d8d3cb] py-7">
        <div class="flex items-center gap-5 sm:gap-8">
          <div class="flex w-[44px] shrink-0 justify-center sm:w-[70px]">
            <IconUShape color="#282522" class="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div class="min-w-0">
            <h3 class="text-sm font-medium text-[#282522] sm:text-base">
              U-Shape
            </h3>
            <p class="mt-1.5 text-xs leading-[1.6] text-[#6b645c] sm:text-[13px]">
              Perfect for interactive meetings, discussions, training sessions, and executive gatherings. The open-center layout encourages conversation while maintaining clear visibility of the presenter.
            </p>
          </div>
        </div>
      </div>

      <!-- Reception -->
      <div class="border-t border-[#d8d3cb] py-7">
        <div class="flex items-center gap-5 sm:gap-8">
          <div class="flex w-[44px] shrink-0 justify-center sm:w-[70px]">
            <IconReception color="#282522" class="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div class="min-w-0">
            <h3 class="text-sm font-medium text-[#282522] sm:text-base">
              Reception
            </h3>
            <p class="mt-1.5 text-xs leading-[1.6] text-[#6b645c] sm:text-[13px]">
              Designed for networking events, cocktail gatherings, and social occasions where guests can move freely throughout the venue. Light refreshments and beverages can be served comfortably.
            </p>
          </div>
        </div>
      </div>

      <!-- Banquet -->
      <div class="border-t border-[#d8d3cb] py-7">
        <div class="flex items-center gap-5 sm:gap-8">
          <div class="flex w-[44px] shrink-0 justify-center sm:w-[70px]">
            <IconBanquet color="#282522" class="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div class="min-w-0">
            <h3 class="text-sm font-medium text-[#282522] sm:text-base">
              Banquet
            </h3>
            <p class="mt-1.5 text-xs leading-[1.6] text-[#6b645c] sm:text-[13px]">
              Ideal for formal dinners, weddings, celebrations, and group dining. Round tables create a comfortable social setting while allowing efficient service and easy conversation.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  embedded?: boolean
}>()
</script>
