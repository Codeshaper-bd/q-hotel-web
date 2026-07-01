# Agent Instructions

This project is a premium Nuxt creative frontend foundation for Q Hotel. Treat every change as production work for a fast, accessible, SEO-ready, highly maintainable public website.

## Role

Work as a senior frontend architect and creative developer. Prefer clean architecture, strong TypeScript, restrained motion, and measurable performance over visual noise or demo effects.

## Specialized Agent Files

Use these focused instruction files when a task matches their area:

- `.agents/core/user-approval-gate.md`: mandatory approval workflow before implementation.
- `.agents/core/agent-routing-index.md`: choose the right instruction files for each task type.
- `.agents/core/premium-frontend-architect.md`: overall architecture and implementation direction.
- `.agents/core/project-conventions-guardian.md`: naming, file placement, imports, variables, props, emits.
- `.agents/core/skill-authoring-governor.md`: standards for creating/updating future agent and skill files.
- `.agents/core/project-memory-guide.md`: handoff format, decision recording, and session continuity guidance.
- `.agents/frontend/component-api-designer.md`: component boundaries, typed APIs, slots, variants, local state.
- `.agents/frontend/css-implementation-guardian.md`: Tailwind-first CSS, no inline styles, token usage, scoped/global CSS rules.
- `.agents/frontend/design-system-guardian.md`: tokens, visual system, base components, responsive UI.
- `.agents/frontend/section-composition-architect.md`: hero, feature, gallery, CTA, room, offer, contact sections.
- `.agents/frontend/motion-webgl-engineer.md`: GSAP, ScrollTrigger, animation cleanup, Three.js/WebGL.
- `.agents/quality/typescript-code-quality.md`: type safety, composables, utilities, async states, error handling.
- `.agents/quality/performance-budget-auditor.md`: Core Web Vitals risk, bundles, media, dependencies.
- `.agents/quality/testing-qa-strategist.md`: test strategy, manual QA, responsive/browser verification.
- `.agents/quality/release-quality-gate.md`: final verification, risk review, handoff summaries.
- `.agents/quality/multi-agent-review-orchestrator.md`: coordinate architecture, code, SEO, accessibility, performance, and security review.
- `.agents/content-seo/site-information-architecture.md`: routes, navigation, page hierarchy, user journeys.
- `.agents/content-seo/content-modeler.md`: replaceable content structures, CMS readiness, alt text, SEO copy.
- `.agents/content-seo/media-asset-optimizer.md`: images, video, fonts, SVG, WebGL assets, loading strategy.
- `.agents/content-seo/seo-accessibility-auditor.md`: metadata, semantic HTML, keyboard access, screen-reader behavior.
- `.agents/content-seo/technical-seo-structured-data.md`: sitemap, robots, structured data, canonical routes.
- `.agents/backend/api-integration-architect.md`: API routes, CMS/data fetching, runtime config, secrets, validation.
- `.agents/backend/business-logic-domain-modeler.md`: rooms, offers, reservation rules, domain types, business logic.
- `.agents/backend/forms-contact-flow.md`: contact/inquiry/reservation forms, validation, spam protection, privacy.
- `.agents/backend/environment-config-governor.md`: runtime config, env variables, deployment-specific values.
- `.agents/backend/security-privacy-guardian.md`: secrets, user data, forms, storage, third-party scripts.
- `.agents/backend/analytics-consent-governor.md`: analytics, tracking, cookie consent, third-party scripts.
- `.agents/workflow/dependency-governor.md`: package decisions, upgrades, bundle and compatibility risk.
- `.agents/workflow/git-workflow-keeper.md`: safe git hygiene, commits, PR handoff, avoiding accidental reverts.
- `.agents/workflow/command-workflow-designer.md`: repeatable workflows for features, pages, sections, APIs, and releases.
- `.agents/workflow/deployment-guide.md`: pre-deploy checklist, hosting targets, output modes, environment variable rules.

## Project Standard Lock

- Always follow `.agents/core/user-approval-gate.md` before implementation work.
- Always use `.agents/core/agent-routing-index.md` to select relevant focused instructions before meaningful work.
- Do not code outside this project's established architecture, naming conventions, component patterns, and verification rules.
- Do not write inline CSS or ad hoc styling outside the Tailwind/token system unless there is a documented technical reason.
- If a request conflicts with these standards, explain the conflict and choose the closest standards-compliant implementation.
- If a shortcut would reduce accessibility, SEO, performance, security, or maintainability, do not take it silently.
- New folders, packages, global styles, plugins, stores, or architectural patterns require a clear reason.
- Prefer world-class boring foundations over clever code: typed APIs, explicit data flow, semantic markup, measured animation, and predictable cleanup.

## Core Standards

- Use Nuxt 4, Vue 3 Composition API, TypeScript, Tailwind CSS, GSAP, ScrollTrigger, Three.js, and Nuxt Image according to the existing project patterns.
- Keep page files composition-only. Put reusable UI in `app/components/base`, layout in `app/components/layout`, sections in `app/components/sections`, animation primitives in `app/components/animation`, WebGL in `app/components/webgl`, and shared logic in `app/composables`.
- Do not duplicate components, utilities, composables, styles, layouts, or tokens.
- Follow `PascalCase.vue` for components, `useThing.ts` for composables, typed props/emits, descriptive variables, and explicit domain names.
- Use Tailwind utilities and project CSS variables for styling. Avoid inline styles, repeated hardcoded values, and page-specific global CSS.
- Add dependencies only when they provide clear value and do not harm Core Web Vitals.
- Keep important SEO content in real server-rendered HTML, never canvas-only or image-only.
- Respect reduced motion, keyboard navigation, semantic HTML, visible focus states, and proper color contrast.
- Use transform and opacity for animation. Avoid layout-shifting animation properties.
- Clean up every GSAP context, ScrollTrigger, event listener, observer, animation frame, and WebGL resource.
- Do not add Lenis or smooth scroll unless the use case clearly benefits and accessibility remains intact.

## Performance Rules

- Use `NuxtImg` through `BaseImage` for important media when possible.
- Reserve stable dimensions for images, video, WebGL, fixed UI, and interactive controls.
- Lazy-load below-the-fold heavy modules and client-only effects.
- Keep WebGL isolated, client-only, low-power by default, paused offscreen, and disposable on unmount.
- Avoid unnecessary global plugins and broad imports.
- Do not assume Lighthouse scores. Build in a way that can be audited honestly.

## SEO Rules

- Every page needs unique title, description, canonical URL, and useful social metadata.
- Use `useSeoMetaData` for page metadata.
- Maintain one clear H1 per page and correct heading hierarchy.
- Use descriptive links and meaningful alt text.
- Add schema only when the content warrants it.
- For sitemap, robots, canonical route, and schema work, follow `.agents/content-seo/technical-seo-structured-data.md`.

## Accessibility Rules

- Buttons are buttons; links are links.
- Every interactive element must be keyboard accessible.
- Mobile navigation must work with keyboard and screen readers.
- Reduced-motion users should get static or minimal alternatives.
- Avoid hover-only interactions on touch devices.

## Verification

Before finalizing substantial changes, run:

```bash
pnpm.cmd typecheck
pnpm.cmd build
```

If a command cannot be run, state why. Do not claim performance, SEO, accessibility, or Lighthouse results without running the relevant audit.

Before final handoff for meaningful changes, review `.agents/quality/release-quality-gate.md`.
