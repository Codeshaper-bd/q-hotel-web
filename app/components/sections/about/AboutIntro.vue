<template>
  <BaseSection
    tone="paper"
    spacing="lg"
    container-size="xl"
    class="!pb-4 sm:!pb-8"
  >
    <div class="mx-auto flex flex-col items-center text-center">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.8131 48.0909C21.8131 48.0909 29.6973 46.5484 40.5783 54.0909C40.5783 54.0909 47.7037 59.5876 56.7391 57.6791C56.7391 57.6791 45.4915 64.0452 35.7359 55.6857C29.6459 50.4635 24.0574 48.4046 21.8066 48.0909H21.8131Z"
          fill="#D78C38"
        />
        <path
          d="M15.5948 3.72266L17.4469 4.96449C17.4469 4.96449 3.18322 13.1017 6.08354 32.6769C8.18 46.8272 18.6816 57.4808 32.8938 55.8991L34.3922 57.2913C32.135 57.5789 7.46617 59.1213 0.713762 34.788C-0.205852 31.4743 -3.04186 14.3305 15.5948 3.72266Z"
          fill="#D78C38"
        />
        <path
          d="M27.0367 1.45846L25.7891 0.314673C25.7891 0.314673 38.1942 -2.33892 50.265 7.76565C50.265 7.76565 65.2553 19.7853 58.0334 38.7853C54.9531 46.8964 46.7666 52.8506 44.2457 53.5042L42.1042 52.0402C42.1042 52.0402 54.1942 45.3866 54.0785 29.0271C54.0785 29.0271 54.8373 15.6349 45.6026 7.58918C45.6026 7.58918 38.9595 0.39964 27.0431 1.44539L27.0367 1.45846Z"
          fill="#D78C38"
        />
        <path
          d="M21.8131 48.0909C21.8131 48.0909 29.6973 46.5484 40.5783 54.0909C40.5783 54.0909 47.7037 59.5876 56.7391 57.6791C56.7391 57.6791 45.4915 64.0452 35.7359 55.6857C29.6459 50.4635 24.0574 48.4046 21.8066 48.0909H21.8131Z"
          fill="#D78C38"
        />
        <path
          d="M15.5948 3.72266L17.4469 4.96449C17.4469 4.96449 3.18322 13.1017 6.08354 32.6769C8.18 46.8272 18.6816 57.4808 32.8938 55.8991L34.3922 57.2913C32.135 57.5789 7.46617 59.1213 0.713762 34.788C-0.205852 31.4743 -3.04186 14.3305 15.5948 3.72266Z"
          fill="#D78C38"
        />
        <path
          d="M27.0367 1.45846L25.7891 0.314673C25.7891 0.314673 38.1942 -2.33892 50.265 7.76565C50.265 7.76565 65.2553 19.7853 58.0334 38.7853C54.9531 46.8964 46.7666 52.8506 44.2457 53.5042L42.1042 52.0402C42.1042 52.0402 54.1942 45.3866 54.0785 29.0271C54.0785 29.0271 54.8373 15.6349 45.6026 7.58918C45.6026 7.58918 38.9595 0.39964 27.0431 1.44539L27.0367 1.45846Z"
          fill="#D78C38"
        />
      </svg>

      <h2
        class="mt-6 font-display text-4xl text-ink sm:text-5xl lg:text-[56px] font-semibold max-w-[480px]"
      >
        Your Perfect Stay Begins Here in Dhaka
      </h2>
      <p
        class="mt-6 text-base leading-7 sm:text-lg font-medium text-[#505155] max-w-[961px]"
      >
        Welcome to Q Hotel Dhaka, where modern comfort meets warm hospitality in
        the new heart of the city. Designed for both business and leisure
        travelers, Q Hotel offers a seamless blend of contemporary style,
        personalized service, and exceptional convenience to ensure every guest
        enjoys a memorable stay.
      </p>
      <p
        class="mt-5 text-base leading-7 text-[#505155] sm:text-lg font-medium max-w-[961px]"
      >
        At Q Hotel Dhaka, we are committed to creating a relaxing and welcoming
        experience from the moment you arrive. Our thoughtfully designed rooms
        and suites feature elegant interiors, modern amenities, and everything
        you need for a comfortable stay. Whether you're visiting for a business
        trip, a family vacation, or a weekend getaway, our dedicated team is
        here to provide attentive service and make every moment of your stay
        truly exceptional.
      </p>
    </div>

    <div class="mt-14 grid gap-4 sm:grid-cols-[2fr_1fr]">
      <div class="relative h-[700px] overflow-hidden">
        <BaseImage
          src="/images/about/about-us-main.png"
          alt="Q Hotel Dhaka lounge and dining area with warm ambient lighting"
          :width="1138"
          :height="700"
          sizes="xs:100vw sm:65vw"
          class="absolute inset-0"
        />
      </div>
      <div class="relative h-[700px] overflow-hidden">
        <BaseImage
          src="/images/about/about-us-sidebar.png"
          alt="Q Hotel Dhaka dining room with stone feature wall and warm lighting"
          :width="558"
          :height="700"
          sizes="xs:100vw sm:32vw"
          class="absolute inset-0"
        />
      </div>
    </div>
  </BaseSection>
</template>
