<template>
  <BaseSection tone="paper" spacing="lg" container-size="xl">
    <div class="flex flex-col items-center text-center">
      <BaseKicker>Jobs List</BaseKicker>
      <h2 class="mt-6 font-display text-4xl text-ink sm:text-5xl">
        Recent Job Postings
      </h2>
    </div>

    <ul class="mt-14 divide-y divide-line border-y border-line">
      <li
        v-for="(job, index) in jobs"
        :key="job.title + index"
        :class="['flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10', index % 2 === 1 ? 'bg-ink/[0.02]' : '']"
      >
        <div>
          <h3 class="font-display text-2xl text-ink sm:text-4xl">{{ job.title }}</h3>
          <dl class="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-ink/70 sm:text-base">
            <div class="flex items-center gap-1.5">
              <dt class="flex items-center gap-1.5">
                <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 6.5h12M4 2.5v2.5M12 2.5v2.5M3.5 4h9a1 1 0 011 1v7a1 1 0 01-1 1h-9a1 1 0 01-1-1V5a1 1 0 011-1z" />
                </svg>
                <span>Deadline:</span>
              </dt>
              <dd>{{ job.deadline }}</dd>
            </div>
            <div class="flex items-center gap-1.5">
              <dt class="flex items-center gap-1.5">
                <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5V3.5a1 1 0 011-1h5a1 1 0 011 1v10M9 13.5V6.5h3a1 1 0 011 1v6M2 13.5h12M5.5 5h1M5.5 7.5h1M5.5 10h1" />
                </svg>
                <span>Department:</span>
              </dt>
              <dd>{{ job.department }}</dd>
            </div>
            <div class="flex items-center gap-1.5">
              <dt class="flex items-center gap-1.5">
                <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 5.5a1 1 0 011-1h10a1 1 0 011 1v6.5a1 1 0 01-1 1H3a1 1 0 01-1-1V5.5zM6 4.5v-1a1 1 0 011-1h2a1 1 0 011 1v1M2 8.5h12" />
                </svg>
                <span>Job Type:</span>
              </dt>
              <dd>{{ job.jobType }}</dd>
            </div>
            <div class="flex items-center gap-1.5">
              <dt class="flex items-center gap-1.5">
                <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12.667 14v-1.333A2.667 2.667 0 0010 10H6a2.667 2.667 0 00-2.667 2.667V14M8 7.333A2.667 2.667 0 108 2a2.667 2.667 0 000 5.333z" />
                </svg>
                <span>Vacancy:</span>
              </dt>
              <dd>{{ String(job.vacancies).padStart(2, '0') }}</dd>
            </div>
          </dl>
        </div>

        <BaseArrowCta :to="applyLink(job)" variant="gold" class="self-start sm:self-center">
          Apply Now
        </BaseArrowCta>
      </li>
    </ul>
  </BaseSection>
</template>

<script setup lang="ts">
import type { JobPosting } from '~/types/career'

const jobs: JobPosting[] = [
  { title: 'Assistant Chief Steward', deadline: '10 Jul 2026', department: 'Housekeeping', jobType: 'Full Time', vacancies: 5 },
  { title: 'Front Desk Guest Relations Officer', deadline: '18 Jul 2026', department: 'Front Office', jobType: 'Full Time', vacancies: 3 },
  { title: 'Commis Chef', deadline: '25 Jul 2026', department: 'Culinary', jobType: 'Full Time', vacancies: 4 },
  { title: 'Spa & Wellness Therapist', deadline: '02 Aug 2026', department: 'Wellness', jobType: 'Part Time', vacancies: 2 },
]

function applyLink(job: JobPosting) {
  return `mailto:info@qfl.com.bd?subject=${encodeURIComponent(`Job Application: ${job.title}`)}`
}
</script>
