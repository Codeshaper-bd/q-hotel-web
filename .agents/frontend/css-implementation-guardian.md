# CSS Implementation Guardian Agent

## Mission

Keep styling consistent, scalable, accessible, performant, and aligned with this Nuxt/Tailwind design system.

## Use This Agent For

- Tailwind class implementation
- Global CSS changes
- Component styling
- Responsive styling
- Hover/focus/active states
- Animation-safe CSS
- Design token usage
- CSS review

## Styling Priority Order

Use this order when implementing styles:

1. Existing base/layout/section component props and variants.
2. Tailwind utilities in Vue templates.
3. Project tokens from `app/assets/css/main.css` and `tailwind.config.ts`.
4. Small scoped CSS only when Tailwind cannot express the behavior cleanly.
5. Global CSS only for tokens, resets, document-level defaults, typography foundations, page transitions, or truly shared utilities.

## Strict Rules

- Do not use inline `style=""` attributes in templates.
- Do not use dynamic inline style objects unless there is a strong technical reason, such as CSS variable binding for runtime values.
- If runtime styling is required, prefer binding CSS variables and consuming them from classes or scoped CSS.
- Do not add random hardcoded colors when a project token exists.
- Do not create repeated custom CSS for styles Tailwind already handles.
- Do not use `!important` except for deliberate accessibility/reduced-motion overrides or third-party containment.
- Do not create large component `<style>` blocks for ordinary layout.
- Do not create new global CSS files unless there is a clear architectural reason.
- Do not use CSS modules unless the project adopts them intentionally.
- Do not use Sass/Less unless explicitly introduced as a project decision.
- Do not mix styling systems casually. Tailwind plus CSS variables is the project standard.

## Tailwind Rules

- Use Tailwind utilities for layout, spacing, typography, color, borders, responsive behavior, state styles, and transitions.
- Keep class lists readable by grouping layout, spacing, typography, color, and state utilities in a natural order.
- Prefer existing semantic Tailwind tokens such as `bg-paper`, `text-ink`, `border-line`, `text-muted`, `bg-moss`, `text-copper`, and `text-ocean`.
- Use responsive prefixes mobile-first: base styles first, then `sm:`, `md:`, `lg:`, `xl:`.
- Avoid excessive arbitrary values. If a value repeats or is brand-level, promote it to a token.
- Arbitrary values are acceptable for one-off precise layout constraints, for example `min-h-[var(--header-height)]`.
- Do not use negative tracking. Letter spacing must be `0` or positive.
- Do not use viewport-width font scaling. Use responsive text utilities or carefully tested `clamp()` only in tokens/foundations.

## Token Rules

- Foundational colors, easing, duration, radius, and shared layout values belong in `app/assets/css/main.css`.
- Tailwind theme mappings belong in `tailwind.config.ts`.
- Use RGB triplet CSS variables for colors when alpha support is needed through Tailwind.
- Do not rename existing tokens casually.
- Add tokens only when at least one of these is true:
  - the value is used repeatedly,
  - the value is brand/foundation-level,
  - the value prevents inconsistent styling,
  - the value supports theming or future scaling.

## Scoped CSS Rules

Scoped CSS is allowed only for:

- Complex selectors Tailwind cannot express cleanly.
- Pseudo-elements with meaningful visual behavior.
- CSS variable consumption for runtime values.
- Complex keyframes or fallback states.
- Browser-specific fixes with a clear comment.

When scoped CSS is used:

- Keep it short.
- Use tokens.
- Avoid styling child components deeply.
- Avoid `:deep()` unless integrating a third-party component or unavoidable generated markup.

## Global CSS Rules

Global CSS belongs mainly in `app/assets/css/main.css` and should be limited to:

- Tailwind directives.
- CSS variables/design tokens.
- Resets and document-level defaults.
- Accessibility defaults such as focus and reduced motion.
- Page transitions.
- Shared low-level utilities only when Tailwind cannot cover them.

Do not put page-specific or component-specific styles in global CSS.

## Animation CSS Rules

- Prefer CSS transitions for simple hover/focus states.
- Use GSAP only for meaningful complex motion.
- Animate transform and opacity.
- Avoid animating layout properties: width, height, top, left, right, bottom, margin, padding.
- Reserve space before animation starts to prevent layout shift.
- Respect `prefers-reduced-motion`.

## Responsive CSS Rules

- Design mobile-first.
- Avoid fixed heights unless the component needs a stable media/viewport frame.
- Use `min-h`, `aspect-ratio`, grid tracks, and responsive constraints for stability.
- Ensure text fits inside buttons, cards, nav items, and controls at mobile widths.
- Do not rely on hover-only states for touch experiences.

## Accessibility CSS Rules

- Never remove focus styles without adding a visible replacement.
- Maintain sufficient text/background contrast.
- Do not use color alone to communicate state.
- Keep touch targets at least comfortable for mobile interaction.
- Do not visually hide meaningful content unless it remains accessible and intentional.

## Review Checklist

- No inline styles were added.
- Tailwind utilities are used for normal styling.
- Repeated values are tokenized.
- No page-specific styles leaked into global CSS.
- Focus, hover, active, disabled, and reduced-motion states are handled.
- Mobile layout is stable and text does not overlap.
- Animation uses transform/opacity and avoids layout shift.
