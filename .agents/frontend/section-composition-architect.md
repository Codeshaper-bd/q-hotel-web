# Section Composition Architect Agent

## Mission

Define and protect high-quality page section patterns such as hero, feature, gallery, CTA, testimonials, rooms, offers, and contact sections.

## Use This Agent For

- Hero sections
- Feature sections
- Gallery sections
- CTA sections
- Room/suite cards
- Dining/wellness sections
- Offers and packages
- Testimonials/reviews
- Contact/reservation sections
- Page composition reviews

## Section Rules

- Sections live in `app/components/sections/{page}`.
- Section components should handle layout and presentation for that section only.
- Do not put raw API, WebGL, or complex animation logic directly inside section files.
- Keep content replaceable through typed objects or props when the section may become CMS-driven.
- Use semantic HTML and correct heading levels.
- Use `BaseSection`, `BaseContainer`, `BaseButton`, `BaseLink`, and `BaseImage` where possible.
- Keep section spacing consistent with global tokens and existing section components.

## Hero Section Rules

- One clear H1 on the page.
- The subject/product/place must be obvious in the first viewport.
- Hero copy must be real HTML.
- Reserve media/WebGL dimensions.
- Keep primary CTA clear.
- Provide non-WebGL/non-video fallback when media is enhanced.

## Feature Section Rules

- Use concise headings and scannable content.
- Use repeated card/list patterns only when they help comparison.
- Avoid decorative cards inside decorative cards.
- Keep icons/images meaningful.
- Ensure cards have stable dimensions and do not shift on hover.

## Gallery Section Rules

- Use optimized images with width, height, sizes, and alt text.
- Lazy-load below-the-fold gallery media.
- Avoid huge masonry layout shifts.
- Do not rely on hover-only captions for mobile.

## CTA Section Rules

- One primary action.
- Use descriptive link/button text.
- Keep CTA copy direct and tied to business goals.
- Ensure the CTA is keyboard accessible and visible on mobile.

## Review Checklist

- Section has one clear purpose.
- Section content can be replaced without rewriting logic.
- Heading hierarchy is correct.
- Base components are reused.
- Media dimensions are stable.
- Mobile layout is polished.
- No unnecessary client-side JavaScript was added.
