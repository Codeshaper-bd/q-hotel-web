# QWEN.md — Q Hotel Web

Premium hotel website for **Q Hotel Dhaka** — a boutique property in Uttara, Dhaka. Built as a fast, accessible, SEO-optimized public-facing site with refined motion and cinematic visual design.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 4 (Vue 3 Composition API) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 + CSS custom properties (design tokens) |
| Animation | GSAP 3 + ScrollTrigger |
| 3D / WebGL | Three.js |
| Smooth Scroll | Lenis |
| Images | @nuxt/image (AVIF/WebP, responsive sizes) |
| Fonts | @nuxt/fonts — Cormorant Garamond (display), Satoshi (body), Inter (UI labels) |
| Maps | Leaflet |
| Package Manager | pnpm 11.9 |

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm generate     # Static site generation
pnpm preview      # Preview production build
pnpm typecheck    # TypeScript type checking (nuxt typecheck)
pnpm postinstall  # nuxt prepare (generates .nuxt types)
```

## Project Structure

```
app/
├── app.vue                  # Root component (preloader → layout → page)
├── error.vue                # Global error page
├── assets/css/main.css      # Design tokens, base resets, page transitions, grain texture
├── components/
│   ├── base/                # Reusable UI primitives (BaseButton, BaseImage, BaseLink, etc.)
│   ├── layout/              # AppHeader, AppFooter, AppPreloader, nav components
│   ├── sections/            # Page-section components organized by page domain
│   │   ├── about/
│   │   ├── booking/
│   │   ├── contact/
│   │   ├── dining/
│   │   ├── error/
│   │   ├── faqs/
│   │   ├── gallery/
│   │   ├── home/
│   │   ├── long-stay/
│   │   ├── rooms/
│   │   └── sitemap/
│   ├── animation/           # GSAP/ScrollTrigger animation primitives
│   └── webgl/               # Three.js / WebGL components (client-only)
├── composables/             # Shared reactive logic (useGsap, useSeoMetaData, etc.)
├── layouts/default.vue      # Header + main + footer wrapper
├── pages/                   # File-based routing (composition-only, no business logic)
├── plugins/                 # Nuxt plugins
├── types/                   # Domain type definitions (room, booking, dining, etc.)
└── utils/                   # Pure utility functions
```

## Design Tokens

All colors, radii, durations, and easings are CSS custom properties in `main.css` and exposed as Tailwind utilities:

- **Colors:** `ink`, `paper`, `muted`, `line`, `moss`, `copper`, `ocean`, `night`, `gold`, `champagne`, `olive`, `cream`, `sand`, `flame`
- **Fonts:** `font-sans` (Satoshi), `font-display` (Cormorant Garamond)
- **Radii:** `rounded-xs`, `rounded-sm`, `rounded-md`
- **Timing:** `duration-fast` (220ms), `duration-normal` (640ms), `duration-slow` (1100ms), `ease-premium`
- **Header height:** `--header-height: 4.5rem`

## Conventions

### Components
- **PascalCase.vue** for all component files
- Pages are composition-only — they assemble section components and call SEO composables
- Reusable UI goes in `base/`, page sections in `sections/<domain>/`
- Typed props with `defineProps<{...}>()` and `withDefaults()`
- Use `BaseImage` (wraps `NuxtImg`) for all important media — never raw `<img>`

### Composables
- Named `useThing.ts` (e.g., `useGsap.ts`, `useSeoMetaData.ts`)
- Auto-imported by Nuxt — do not manually import composables

### Styling
- Tailwind utilities first; use project token classes (`bg-ink`, `text-paper`, etc.)
- No inline styles unless technically required
- No hardcoded color values — always use token names
- Global CSS only in `main.css`; component styles stay scoped or use Tailwind

### Animation
- Always use `useGsap()` composable — it handles context creation, cleanup, and reduced-motion
- Clean up all GSAP contexts, ScrollTrigger instances, event listeners, and rAF on unmount
- Use `transform` and `opacity` only — avoid layout-shifting properties
- Respect `prefers-reduced-motion` — the `useReducedMotion` composable is available

### SEO
- Every page calls `useSeoMetaData({ title, description, path })` in `<script setup>`
- One `<h1>` per page; maintain heading hierarchy
- Keep important content in server-rendered HTML, never canvas-only

### Accessibility
- Semantic HTML: `<button>` for actions, `<a>` for navigation
- All interactive elements must be keyboard-accessible
- Visible `:focus-visible` outlines (styled globally in `main.css`)
- Meaningful `alt` text on all images

## Pages / Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.vue` | Home — hero, about, rooms, facilities, dining, location, FAQ |
| `/about` | `about.vue` | About the hotel |
| `/rooms` | `rooms.vue` | Room listings |
| `/dining` | `dining.vue` | Restaurant and dining venues |
| `/gallery` | `gallery.vue` | Photo gallery |
| `/booking` | `booking.vue` | Reservation flow |
| `/booking-confirmed` | `booking-confirmed.vue` | Booking confirmation |
| `/contact` | `contact.vue` | Contact form |
| `/long-stays` | `long-stays.vue` | Extended stay offers |
| `/faqs` | `faqs.vue` | Frequently asked questions |
| `/sitemap` | `sitemap.vue` | HTML sitemap |
| `/payment-failed` | `payment-failed.vue` | Payment failure page |

## Environment Variables

Copy `.env.example` to `.env`. Key variables:

- `NUXT_PUBLIC_SITE_URL` — canonical URL (used for SEO metadata)
- `NUXT_PUBLIC_SITE_NAME` — site name (default: "Q Hotel")
- SMTP credentials for contact form delivery
- CMS config (Sanity / Contentful / Directus) — uncomment the active block
- Analytics IDs (GA4 / Plausible / GTM) — activate after consent implementation

## Agent Instructions

Detailed coding standards, review checklists, and workflow guides live in `.agents/`. Key files:

- `.agents/core/` — approval gates, routing index, conventions
- `.agents/frontend/` — component API, CSS, design system, motion/WebGL
- `.agents/quality/` — TypeScript, performance, testing, release gates
- `.agents/content-seo/` — SEO, accessibility, structured data, media
- `.agents/backend/` — API routes, forms, security, environment config
- `.agents/workflow/` — dependencies, git, deployment

## Verification Checklist

Before finalizing changes:

```bash
pnpm typecheck    # Must pass with zero errors
pnpm build        # Must complete successfully
```

Do not claim performance, SEO, or accessibility results without running the relevant audit.
