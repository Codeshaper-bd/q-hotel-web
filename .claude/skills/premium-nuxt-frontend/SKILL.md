# Premium Nuxt Frontend Skill

Use this skill when working on this Nuxt creative website, especially for public-facing pages, layout, animation, WebGL, SEO, accessibility, performance, or design-system changes.

## Goal

Maintain a premium, scalable, highly animated Nuxt frontend that can achieve excellent real Lighthouse/PageSpeed results through disciplined architecture and performance-minded implementation.

## Required Workflow

1. Read `AGENTS.md`.
2. Read `.agents/core/user-approval-gate.md`.
3. Read `.agents/core/agent-routing-index.md`.
4. Always read `.agents/core/project-conventions-guardian.md`; for styling work, also read `.agents/frontend/css-implementation-guardian.md`; then read any other relevant focused agent file from `.agents`.
5. Inspect nearby files before editing.
6. Ask for user approval with a short plan before editing files or changing dependencies.
7. Reuse existing base components, layout components, composables, and tokens.
8. Keep page files clean: compose sections and set SEO only.
9. Put heavy or client-only behavior behind component boundaries.
10. Run verification after meaningful changes.
11. Before final handoff for meaningful changes, review `.agents/quality/release-quality-gate.md`.
12. For large or cross-domain changes, review `.agents/quality/multi-agent-review-orchestrator.md`.

## Implementation Rules

- Use Vue 3 Composition API with TypeScript.
- Avoid `any` unless unavoidable.
- Follow project naming conventions for files, components, composables, variables, props, and emits.
- Use Tailwind-first styling and do not add inline CSS unless a documented technical reason exists.
- Prefer semantic HTML before ARIA.
- Use CSS variables from `app/assets/css/main.css` for core tokens.
- Use Tailwind utilities consistently with existing components.
- Use Nuxt Image/BaseImage for important images.
- For images, video, fonts, SVG, and WebGL assets, follow `.agents/content-seo/media-asset-optimizer.md`.
- Use dynamic imports and `ClientOnly` only where useful.
- Never put raw WebGL logic inside pages.
- Never hide important text inside canvas, images, or video.
- For API/CMS/form integrations, read `.agents/backend/api-integration-architect.md` and keep secrets server-only.
- For navigation, page sections, or hotel business rules, read the related `.agents/content-seo/site-information-architecture.md`, `.agents/frontend/section-composition-architect.md`, or `.agents/backend/business-logic-domain-modeler.md`.
- For contact or reservation forms, read `.agents/backend/forms-contact-flow.md`.
- For new agent/skill files, read `.agents/core/skill-authoring-governor.md`.

## Animation Rules

- Register GSAP plugins only in `app/plugins/gsap.client.ts`.
- Use reusable animation components/composables.
- Respect `prefers-reduced-motion`.
- Clean up GSAP contexts, ScrollTriggers, listeners, observers, timers, and animation frames.
- Prefer transform and opacity animations.

## WebGL Rules

- Keep WebGL in `app/components/webgl`.
- Lazy-load WebGL scenes.
- Pause offscreen rendering.
- Cap pixel ratio for performance.
- Dispose Three.js resources on unmount.
- Treat WebGL as enhancement, not primary content.

## SEO and Accessibility Rules

- Use `useSeoMetaData` for page metadata.
- For sitemap, robots, structured data, and dynamic route SEO, follow `.agents/content-seo/technical-seo-structured-data.md`.
- Use one clear H1 per page.
- Preserve heading order.
- Add meaningful alt text.
- Ensure controls are keyboard accessible.
- Maintain visible focus states and sufficient contrast.

## Verification

Run:

```bash
pnpm.cmd typecheck
pnpm.cmd build
```

Report any warnings or skipped checks honestly. Do not invent audit scores.
