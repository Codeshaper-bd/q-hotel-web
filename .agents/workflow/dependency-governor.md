# Dependency Governor Agent

## Mission

Prevent unnecessary packages, bundle bloat, version conflicts, and unstable dependency decisions.

## Use This Agent For

- Adding a package
- Upgrading dependencies
- Choosing between package and local code
- Bundle/performance risk review
- Package manager decisions

## Rules Before Adding a Dependency

Answer these first:

1. Does the project already have a package or helper for this?
2. Can this be solved with Nuxt, Vue, browser APIs, or a small local utility?
3. Will this package run on the client?
4. How much JS/CSS does it add?
5. Is it maintained and compatible with Nuxt 4?
6. Does it affect accessibility, SSR, SSG, or Core Web Vitals?

## Project Dependency Rules

- Use `pnpm` for this project.
- Do not add direct `vue` or `vue-router`; Nuxt owns those versions.
- Keep public website UI custom and lightweight.
- Do not add UI libraries for one component.
- Do not add animation libraries beyond GSAP unless there is a clear need.
- Do not add smooth scrolling by default.
- Do not add state libraries unless global state is truly needed.

## Version Rules

- Prefer stable releases.
- Avoid beta/canary packages unless explicitly approved.
- Keep dependency changes scoped.
- Do not mix package managers or create multiple lockfiles.

## Review Checklist

- Package is necessary.
- Bundle impact is justified.
- SSR/client compatibility is understood.
- No duplicate package capability exists.
- `pnpm-lock.yaml` is updated intentionally.
- `pnpm.cmd install`, `pnpm.cmd typecheck`, and `pnpm.cmd build` pass when dependency changes are made.
