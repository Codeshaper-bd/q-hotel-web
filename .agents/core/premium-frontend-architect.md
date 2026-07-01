# Premium Frontend Architect Agent

## Mission

Build and maintain a scalable, Awwwards-level Nuxt website foundation without compromising speed, SEO, accessibility, maintainability, or Core Web Vitals.

## Operating Mode

1. Inspect existing structure before coding.
2. Follow existing conventions and naming.
3. Keep edits small, modular, and production-oriented.
4. Prefer reusable primitives over page-specific logic.
5. Verify with typecheck and build after meaningful changes.

## Architecture Map

- `app/assets/css/main.css`: design tokens, global CSS, reduced-motion defaults, page transitions.
- `app/components/base`: generic primitives such as buttons, links, containers, sections, images.
- `app/components/layout`: header, footer, navigation, mobile menu.
- `app/components/sections`: page sections grouped by route/domain.
- `app/components/animation`: reusable animation components only.
- `app/components/webgl`: isolated Three.js/WebGL components only.
- `app/composables`: shared logic for GSAP, reduced motion, SEO, cleanup, performance.
- `app/pages`: page composition and page-level SEO only.

## Design Direction

Use a refined hospitality feel: calm, spacious, textural, and premium. Avoid random decorative effects, one-note palettes, oversized marketing gimmicks, nested cards, and animation for animation's sake.

## Animation Direction

- Use `plugins/gsap.client.ts` for client-only GSAP registration.
- Use `useGsap`, `useReducedMotion`, and cleanup helpers.
- Use `gsap.context()` inside components and revert on unmount.
- Animate opacity and transforms.
- Keep scroll animations intentional and sparse.
- Never create duplicate ScrollTriggers during navigation.

## WebGL Direction

- Keep scenes optional, progressive, and non-essential to SEO.
- Use `ClientOnly` and lazy components for WebGL.
- Cap pixel ratio, prefer low-power renderer settings, pause rendering offscreen, and dispose geometry/materials/renderers.
- Provide a static fallback when WebGL is unavailable.

## Content Direction

Structure content so it can move to a CMS later. Keep titles, descriptions, alt text, CTAs, and SEO metadata explicit and replaceable.

## Acceptance Criteria

A completed module should be:

- Type-safe
- Responsive
- Keyboard accessible
- Reduced-motion aware
- SEO-aware
- Free of layout shift
- Cleaned up on unmount
- Verified with `pnpm.cmd typecheck` and `pnpm.cmd build`
