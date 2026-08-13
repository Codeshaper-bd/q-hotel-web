<!--
  Capacity Overview + Equipment & Services: a quiet, editorial reference
  block — centered narrow column, small typography, thin dividers, no
  cards or shadows. Capacity types, room specs, and a keyboard-accessible
  tab pair: Equipment & Services list vs. Room Set-Up Examples rows.
-->
<template>
  <section
    ref="sectionEl"
    aria-labelledby="capacity-overview-title"
    class="bg-[#f6f2e9] text-[#282522]"
  >
    <div
      class="mx-auto w-full max-w-[760px] px-5 pt-[60px] pb-16 sm:px-6 lg:pt-[60px] lg:pb-[70px]"
    >
      <!-- ── CAPACITY OVERVIEW ── -->
      <div class="flex items-center gap-5">
        <span class="h-px flex-1 bg-[#282522]/25" aria-hidden="true" />
        <h2
          id="capacity-overview-title"
          class="text-[11px] font-medium uppercase tracking-[0.28em] text-[#282522]"
        >
          Capacity Overview
        </h2>
        <span class="h-px flex-1 bg-[#282522]/25" aria-hidden="true" />
      </div>

      <!-- Capacity types -->
      <div
        class="mt-12 grid grid-cols-2 gap-x-12 gap-y-10 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12 lg:gap-x-14"
      >
        <div
          v-for="(item, index) in capacities"
          :key="item.label"
          class="flex flex-col items-center gap-3 text-center"
          :class="index === 4 ? 'col-span-2 sm:col-span-1' : ''"
        >
          <component
            :is="item.icon"
            color="#282522"
            class="h-6 w-6"
            aria-hidden="true"
          />
          <div>
            <p class="text-sm font-medium uppercase text-[#505155]">
              {{ item.label }}
            </p>
            <p class="mt-3 text-sm font-medium text-[#0F0F10]">
              {{ item.guests }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="h-px max-w-[400px] mt-10 mb-6 w-full mx-auto bg-[#5051553D]/25"
        aria-hidden="true"
      />

      <!-- Room specifications -->
      <div class="mt-10 flex flex-col items-center">
        <p
          class="mt-8 flex items-center gap-2.5 text-base font-normal text-[#373737]"
        >
          <IconCheckbox class="h-4 w-4 shrink-0" aria-hidden="true" />
          Dimensions: 99.6 ft &times; 57.6 ft &times; 22 ft
        </p>
        <p
          class="mt-3 flex items-center gap-2.5 text-base font-normal text-[#373737]"
        >
          <IconCheckbox class="h-4 w-4 shrink-0" aria-hidden="true" />
          Area: 5,721 sq. ft.
        </p>

        <span
          class="mt-10 h-px w-full max-w-[420px] bg-[#282522]/25"
          aria-hidden="true"
        />
      </div>

      <!-- Equipment & services / room set-up tabs (animated expand) -->
      <div
        class="cap-expand mx-auto grid w-full max-w-[650px]"
        :class="isExpanded ? 'grid-rows-[1fr_0fr]' : 'grid-rows-[0fr_1fr]'"
      >
        <div
          class="cap-fade min-h-0 overflow-hidden"
          :class="
            isExpanded
              ? 'translate-y-0 opacity-100'
              : '-translate-y-3 opacity-0'
          "
        >
          <div ref="tabsAnchor" class="mt-12">
            <div
              role="tablist"
              aria-label="Facility details"
              class="flex justify-center gap-10 sm:gap-14"
            >
              <button
                v-for="tab in tabs"
                :key="tab.value"
                :id="`${tabControlBaseId}-${tab.value}`"
                type="button"
                role="tab"
                :aria-selected="activeTab === tab.value"
                :aria-controls="`${tabPanelBaseId}-${tab.value}`"
                :tabindex="activeTab === tab.value ? 0 : -1"
                class="flex items-center gap-2 pb-3 text-sm underline underline-offset-2 font-medium uppercase transition-colors duration-fast"
                :class="
                  activeTab === tab.value
                    ? 'text-[#D78C38] '
                    : 'text-[#8a8177] hover:text-[#282522]'
                "
                @click="setTab(tab.value)"
                @keydown="onTabKeydown"
              >
                {{ tab.label }}
                <IconArrowDown
                  class="shrink-0"
                  :color="activeTab === tab.value ? '#D78C38' : '#8a8177'"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div
              :id="`${tabPanelBaseId}-equipment`"
              role="tabpanel"
              :aria-labelledby="`${tabControlBaseId}-equipment`"
              :hidden="activeTab !== 'equipment'"
              class="pt-8"
            >
              <div class="grid grid-cols-2 gap-[60px]">
                <div>
                  <div class="border-t border-[#5051553D]"></div>
                  <h3 class="text-sm text-[#505155] mt-6 mb-5">
                    Audio-Visual Equipment
                  </h3>
                  <ul class="space-y-3.5">
                    <li
                      v-for="item in equipmentItems"
                      :key="item"
                      class="text-sm font-normal text-[#0F0F10]"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <div>
                  <div class="border-t border-[#5051553D]"></div>
                  <h3 class="text-sm text-[#505155] mt-6 mb-5">
                    Event Equipment & Supplies
                  </h3>
                  <ul class="mt-5 space-y-3.5">
                    <li
                      v-for="item in eventEquipmentSupplies"
                      :key="item"
                      class="text-sm font-normal text-[#0F0F10]"
                    >
                      {{ item }}
                    </li>
                  </ul>
                  <div class="border-t border-[#5051553D] my-6"></div>
                  <h3 class="text-sm text-[#505155] mt-6 mb-5">
                    Business Services
                  </h3>
                  <ul class="mt-5 space-y-3.5">
                    <li
                      v-for="item in businessItems"
                      :key="item"
                      class="text-sm font-normal text-[#0F0F10]"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              :id="`${tabPanelBaseId}-setup`"
              role="tabpanel"
              :aria-labelledby="`${tabControlBaseId}-setup`"
              :hidden="activeTab !== 'setup'"
              class="pt-8"
            >
              <MeetingSetupSection embedded />
            </div>

            <!-- See Less -->
            <div class="mt-12 flex justify-center">
              <button
                type="button"
                class="text-sm font-medium uppercase text-[##0F0F10] underline underline-offset-4 transition-colors duration-fast hover:text-[#c6a15b]"
                @click="collapseTabs"
              >
                See Less
              </button>
            </div>
          </div>
        </div>

        <!-- See More -->
        <div class="min-h-0 overflow-hidden">
          <div class="mt-12 flex justify-center">
            <button
              type="button"
              class="text-sm font-medium uppercase text-[##0F0F10] underline underline-offset-4 transition-colors duration-fast hover:text-[#c6a15b]"
              @click="isExpanded = true"
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import IconTheater from "~/components/base/IconTheater.vue";
import IconClassroom from "~/components/base/IconClassroom.vue";
import IconUShape from "~/components/base/IconUShape.vue";
import IconReception from "~/components/base/IconReception.vue";
import IconBanquet from "~/components/base/IconBanquet.vue";

interface CapacityItem {
  label: string;
  guests: string;
  icon: Component;
}

const capacities: CapacityItem[] = [
  {
    label: "Theater",
    guests: "400 Guests",
    icon: IconTheater,
  },
  {
    label: "Classroom",
    guests: "170 Guests",
    icon: IconClassroom,
  },
  {
    label: "U-Shape",
    guests: "120 Guests",
    icon: IconUShape,
  },
  {
    label: "Reception",
    guests: "500 Guests",
    icon: IconReception,
  },
  {
    label: "Banquet",
    guests: "500 Guests",
    icon: IconBanquet,
  },
];

const equipmentItems = [
  "AV Technician",
  "LCD Projector",
  "Microphone",
  "PA System",
  "Walkie Talkies",
  "Wired Internet",
  "Wireless Internet",
];

const businessItems = [
  "Computers",
  "Copy Service",
  "Fax Service",
  "On-Site Business Center is Staffed",
  "Post/Parcel",
  "Printers",
];
const eventEquipmentSupplies = [
  "Direction Signs",
  "Flip Chart & Markers",
  "Name Cards",
  "Pens / Pencils / Notepad",
  "Podium Lectern",
  "Portable Stage",
  "Stack Chairs",
  "Tables",
];
const tabs = [
  { label: "Equipment & Services", value: "equipment" },
  { label: "Room Set-Up Examples", value: "setup" },
] as const;

type TabValue = (typeof tabs)[number]["value"];

const tabControlBaseId = useId();
const tabPanelBaseId = useId();
const activeTab = ref<TabValue>("equipment");
const isExpanded = ref(false);
const sectionEl = ref<HTMLElement | null>(null);
const tabsAnchor = ref<HTMLElement | null>(null);

function collapseTabs() {
  const anchorTop = tabsAnchor.value?.getBoundingClientRect().top ?? 0;
  isExpanded.value = false;

  if (anchorTop !== 0) {
    window.scrollTo({
      top: window.scrollY + anchorTop - 120,
      behavior: "smooth",
    });
  }
}

function setTab(value: TabValue) {
  activeTab.value = value;
}

function onTabKeydown(event: KeyboardEvent) {
  const currentIndex = tabs.findIndex((tab) => tab.value === activeTab.value);
  let nextIndex = -1;

  if (event.key === "ArrowRight") {
    nextIndex = (currentIndex + 1) % tabs.length;
  } else if (event.key === "ArrowLeft") {
    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = tabs.length - 1;
  }

  if (nextIndex === -1) return;

  const nextTab = tabs[nextIndex];
  if (!nextTab) return;

  event.preventDefault();
  activeTab.value = nextTab.value;
  document.getElementById(`${tabControlBaseId}-${nextTab.value}`)?.focus();
}
</script>

<style scoped>
.cap-expand {
  transition: grid-template-rows var(--duration-normal) var(--ease-premium);
}

.cap-fade {
  transition:
    opacity var(--duration-normal) var(--ease-premium),
    transform var(--duration-normal) var(--ease-premium);
}

@media (prefers-reduced-motion: reduce) {
  .cap-expand,
  .cap-fade {
    transition: none;
  }
}
</style>
