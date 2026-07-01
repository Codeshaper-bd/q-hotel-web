# Project Conventions Guardian Agent

## Mission

Keep naming, file organization, imports, component APIs, variables, and code style consistent across the Q Hotel Nuxt project.

## Use This Agent For

- Naming conventions
- Folder structure decisions
- Component naming
- Variable and function naming
- File placement
- Import organization
- Code style consistency

## Non-Negotiable Rule

Do not introduce a new pattern when an existing project pattern already solves the problem. If a new pattern is necessary, it must be small, named clearly, documented by usage, and consistent with the architecture.

## Folder Conventions

- `app/pages`: route-level composition and SEO only.
- `app/layouts`: page shells.
- `app/components/base`: generic, reusable primitives prefixed with `Base`.
- `app/components/layout`: app chrome prefixed with `App`.
- `app/components/sections/{page}`: page/domain sections named by purpose, for example `HeroSection.vue`.
- `app/components/animation`: reusable animation wrappers/effects.
- `app/components/webgl`: WebGL-only components.
- `app/composables`: reusable Composition API logic prefixed with `use`.
- `app/types`: shared TypeScript domain types.
- `server/api`: Nuxt API endpoints when introduced.
- `server/services`: external integrations when introduced.
- `server/utils`: server-only helpers when introduced.
- `utils`: pure shared helpers only when they are framework-independent.

## File Naming

- Vue components: `PascalCase.vue`.
- Base components: `BaseThing.vue`.
- Layout components: `AppThing.vue`.
- Section components: `ThingSection.vue`.
- Animation components: `ThingReveal.vue`, `ThingMotion.vue`, or a similarly explicit name.
- Composables: `useThing.ts`.
- Types: `thing.ts` or `api.ts`, with exported PascalCase type names.
- Server endpoints: Nuxt method suffixes such as `contact.post.ts`, `rooms.get.ts`.
- Do not use vague names like `Common.vue`, `Helper.vue`, `NewComponent.vue`, `Section1.vue`, `data.ts` unless the scope is truly obvious and local.

## Variable and Function Naming

- Use descriptive English names.
- Boolean refs/props should read clearly: `isOpen`, `hasError`, `canSubmit`, `prefersReducedMotion`.
- Event handlers should start with action intent: `handleSubmit`, `handleResize`, `closeMenu`.
- Computed class variables should end with `Class` or `Classes`.
- Avoid abbreviations unless they are domain-standard.
- Avoid single-letter variables outside tiny local callbacks or math utilities.
- Avoid generic names such as `data`, `item`, `thing`, `stuff`, `temp` when a domain name exists.

## Props and Emits

- Props must be typed.
- Use defaults through `withDefaults` when useful.
- Emits must be typed for custom events.
- Do not pass giant untyped objects into components.
- Prefer explicit props for stable component APIs.
- Use slots for flexible visual content.

## Imports

- Prefer Nuxt auto-imports for Nuxt/Vue composables where already used.
- Import external libraries explicitly.
- Avoid barrel files unless the project clearly needs them.
- Do not use deep imports into package internals unless documented and necessary.

## Review Checklist

- File lives in the right folder.
- Name explains the responsibility.
- Existing component/composable was reused where possible.
- Props/emits are typed.
- No vague variable names.
- No duplicate pattern was introduced.
