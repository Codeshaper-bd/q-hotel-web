<template>
  <!--
    Brand statement: a single centered editorial paragraph introducing the
    hotel — the calm beat between the cinematic hero and the rooms.
    Composes <section> directly instead of BaseSection because the brand
    watermark must hang off the viewport's left edge, outside the container.
  -->
  <section
    id="about"
    ref="sectionRef"
    aria-labelledby="about-title"
    class="relative overflow-hidden bg-[#F8F6F2] py-20 pb-0 text-ink sm:py-24"
  >

    <BaseContainer size="lg">
      <FadeReveal>
        <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 id="about-title" class="sr-only">Who we are</h2>
          <BaseKicker>Who We Are</BaseKicker>
          <p class="mt-8 font-display text-2xl font-semibold leading-9 text-ink sm:text-4xl sm:leading-[2.75rem]">
            Q Hotel Dhaka is a premier hospitality destination in Dhaka, offering refined comfort, exceptional service, and effortless access to the city's key business, shopping, and cultural attractions, crafted for discerning travelers and memorable stays.
          </p>
          <div class="mt-10">
            <BaseArrowCta to="/about" label-class="!text-sm !font-medium !text-[#0F0F10]">
              Learn More
            </BaseArrowCta>
          </div>
        </div>
      </FadeReveal>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const brandMarkRef = ref<SVGSVGElement | null>(null)
const strokeGroupRef = ref<SVGGElement | null>(null)
const fillGroupRef = ref<SVGGElement | null>(null)
const { gsap, createContext, prefersReducedMotion } = useGsap()

onMounted(() => {
  if (
    !sectionRef.value || !brandMarkRef.value
    || !strokeGroupRef.value || !fillGroupRef.value
    || !gsap || prefersReducedMotion.value
  ) {
    return
  }

  const strokePaths = strokeGroupRef.value.querySelectorAll('path')
  if (!strokePaths.length) {
    return
  }

  createContext(() => {
    // Start hidden: outline undrawn and fill faded out. Done in JS so a
    // no-JS / reduced-motion render still shows the solid watermark.
    gsap.set(strokePaths, { attr: { 'stroke-dashoffset': 1 } })
    gsap.set(fillGroupRef.value, { opacity: 0 })

    // Self-drawing entrance — the same stroke-then-fill motion the preloader
    // uses for the Q. It redraws every time the section enters the viewport
    // from either direction, and resets to undrawn once fully out of view.
    const reveal = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        end: 'bottom 20%',
        // onEnter, onLeave, onEnterBack, onLeaveBack
        toggleActions: 'restart reset restart reset',
      },
    })

    reveal
      .to(strokePaths, {
        attr: { 'stroke-dashoffset': 0 },
        duration: 1.1,
        stagger: 0.15,
        ease: 'power2.inOut',
      }, 0)
      // Watermark fill takes over from the drawn outline
      .to(fillGroupRef.value, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.9)
      .to(strokeGroupRef.value, { opacity: 0.3, duration: 0.5 }, 0.9)
  }, sectionRef.value)
})
</script>
