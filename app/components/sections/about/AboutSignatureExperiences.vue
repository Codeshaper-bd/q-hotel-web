<template>
  <BaseSection tone="paper" spacing="lg" container-size="xl">
    <div class="flex flex-col items-center text-center">
      <BaseKicker>Our Story</BaseKicker>
      <h2 class="mt-6 font-display text-4xl text-ink sm:text-5xl">
        Signature Experiences
      </h2>
    </div>

    <div class="mt-14 flex flex-col gap-6">
      <article
        v-for="story in stories"
        :key="story.title"
        class="flex flex-col overflow-hidden border border-champagne bg-paper sm:flex-row"
      >
        <div class="relative h-64 w-full shrink-0 sm:h-auto sm:w-[46%]">
          <BaseImage :src="story.image.src" :alt="story.image.alt" :width="798" :height="506" sizes="xs:100vw sm:46vw" class="absolute inset-0 p-2.5" />
        </div>

        <div class="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p class="font-display text-xl font-semibold text-copper">{{ story.kicker }}</p>
          <h3 class="mt-3 font-display text-3xl text-ink sm:text-4xl">{{ story.title }}</h3>
          <div class="mt-4 space-y-4 text-sm leading-7 text-ink/65 sm:text-base">
            <p v-for="paragraph in story.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </div>
        </div>
      </article>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
interface StoryImage {
  src: string
  alt: string
}

interface Story {
  kicker: string
  title: string
  paragraphs: string[]
  image: StoryImage
}

const stories: Story[] = [
  {
    kicker: 'Our Story',
    title: 'Core Values & Heritage',
    paragraphs: [
      'Our story began with a simple vision, to create a place where every guest feels welcomed, valued, and at home. Built on the principles of quality, comfort, and genuine hospitality, we strive to deliver memorable experiences with every stay.',
      'Inspired by the vibrant energy of Dhaka, we combine modern amenities with personalized service to ensure every visit is comfortable, relaxing, and truly unforgettable.',
    ],
    image: { src: '/images/rooms/presidential-suite.jpg', alt: 'Presidential Suite living room with chandelier and marble floor' },
  },
  {
    kicker: 'Our Strategy',
    title: 'Company Strategy',
    paragraphs: [
      'Our strategy is centered on delivering exceptional guest experiences through outstanding service, modern comforts, and continuous innovation. By maintaining high standards and focusing on every detail, we ensure every stay exceeds expectations.',
      'We are committed to sustainable growth, operational excellence, and building lasting relationships with our guests through trust, quality, and personalized hospitality.',
    ],
    image: { src: '/images/meetings/business-class-lounge.jpg', alt: 'Business lounge seating area at Q Hotel Dhaka' },
  },
  {
    kicker: 'Wake Refreshed',
    title: 'Peaceful & Comfortable Stays',
    paragraphs: [
      "Experience the perfect balance of comfort and relaxation in thoughtfully designed rooms and suites. With modern amenities, elegant interiors, and a peaceful atmosphere, every stay is designed to help you unwind and wake up refreshed. Whether you're traveling for business or leisure, our welcoming spaces provide the ideal retreat after a busy day. Enjoy attentive service and a restful experience that makes every visit truly memorable.",
    ],
    image: { src: '/images/rooms/deluxe-double.jpg', alt: 'Deluxe Double Room with a king bed and cove-lit walnut headboard' },
  },
  {
    kicker: 'Host With Us',
    title: 'Celebrate Every Special Moment',
    paragraphs: [
      'From intimate gatherings to grand occasions, our elegant event spaces and dedicated team provide the perfect setting for unforgettable celebrations. Every detail is carefully managed to create memorable experiences for you and your guests. With flexible venues and personalized event planning, we bring your vision to life with care and precision. Let every milestone become a cherished memory in a setting designed for exceptional moments.',
    ],
    image: { src: '/images/dining/bbq-restaurant.jpg', alt: 'Q Hotel BBQ Restaurant dining room set for an evening celebration' },
  },
]
</script>
