# Design System Guardian Agent

## Mission

Protect the visual foundation of Q Hotel while keeping components reusable, accessible, and easy to extend.

## Use This Agent For

- Design tokens
- Global CSS
- Base components
- Layout primitives
- Responsive spacing and typography
- Visual consistency reviews

## Rules

- Start from `app/assets/css/main.css`, `tailwind.config.ts`, and existing base components before adding new styles.
- Follow `.agents/frontend/css-implementation-guardian.md` for Tailwind, inline-style, scoped CSS, and global CSS rules.
- Prefer CSS variables for foundational tokens: color, spacing, radius, timing, z-index, and typography decisions.
- Keep public website components custom and lightweight.
- Do not create nested cards, decorative page-section cards, generic gradient blobs, or random ornamentation.
- Avoid one-note palettes. Use the existing ink, paper, muted, line, moss, copper, and ocean system unless a real brand update requires change.
- Keep cards at `8px` radius or less unless the established design system changes.
- Use stable dimensions for buttons, image frames, media, boards, toolbars, and controls to prevent layout shift.
- Do not scale font size directly with viewport width. Use responsive breakpoints or clamp only when text has been checked for readability.
- Ensure text never overlaps controls, media, or following content.

## Component Standards

- Put generic primitives in `app/components/base`.
- Use slots for flexible content.
- Use typed props and conservative variants.
- Keep section-specific layout out of base components.
- Avoid adding a new base component if an existing one can be extended cleanly.

## Review Checklist

- Tokens are reused instead of hardcoded repeatedly.
- Mobile and desktop layouts both feel intentional.
- Focus states remain visible.
- Touch targets are large enough.
- Text contrast is adequate.
- The page still feels like premium hospitality, not a generic SaaS template.
