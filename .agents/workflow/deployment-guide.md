# Deployment Guide Agent

## Mission

Define safe, repeatable deployment steps for the Q Hotel Nuxt website so every release reaches production correctly without data loss, downtime, or broken environments.

## Use This Agent For

- Pre-deploy verification
- Choosing a hosting target
- Setting up environment variables in production
- Configuring build output mode
- Planning staging vs production workflow
- Troubleshooting build or runtime issues after deploy

## Pre-Deploy Checklist

Before any deployment:

1. `pnpm.cmd typecheck` passes with no errors.
2. `pnpm.cmd build` completes with no errors.
3. All required environment variables are set in the target environment (not just locally).
4. No `.env` or secret files are committed.
5. `AGENTS.md` approval gate was followed for all changes in this release.
6. Release quality gate `.agents/quality/release-quality-gate.md` was reviewed.

## Nuxt Output Modes

Choose the output mode that matches the hosting target:

| Mode | Config | Use case |
|---|---|---|
| SSR (Node.js server) | `ssr: true` (default) | Vercel, Railway, VPS — dynamic routes, form endpoints |
| Static (pre-rendered) | `nitro: { preset: 'static' }` | Netlify, GitHub Pages — no server routes needed |
| Edge (Cloudflare/Vercel Edge) | `nitro: { preset: 'cloudflare-pages' }` | Global low-latency, limited Node APIs |

Do not change `ssr` or `nitro.preset` without reading the impact on server API routes, runtime config, and image optimization.

## Environment Variable Rules

- Set all `NUXT_` prefixed variables in the hosting platform's environment settings.
- Never commit `.env` to version control.
- Confirm `runtimeConfig.public.*` values are intentionally public before production deploy.
- Test that private `runtimeConfig.*` values (SMTP, CMS tokens, API keys) are accessible server-side in the target environment before go-live.
- Rotate any secret that was ever accidentally committed or logged.

## Suggested Hosting Targets

| Platform | Notes |
|---|---|
| **Vercel** | Best zero-config Nuxt 4 support. SSR, edge functions, image optimization built in. |
| **Netlify** | Good static/SSR support. Use `@nuxtjs/netlify` preset if needed. |
| **Railway / Render** | Node.js server. Simple for custom server routes and full SSR. |
| **Cloudflare Pages** | Edge rendering. Check Nitro edge compatibility before adopting. |

Decision not yet made — record the chosen platform in `docs/decisions/` when selected.

## Build Commands

```bash
# Local production build test
pnpm.cmd build

# Preview production output locally
pnpm.cmd preview
```

Use `pnpm.cmd preview` to test the production build locally before deploying.

## Staging Workflow (When Established)

1. Deploy every feature branch to a preview/staging URL.
2. Run manual QA against staging: `.agents/quality/testing-qa-strategist.md`.
3. Only merge to main after staging passes.
4. Deploy main to production after merge.

## Post-Deploy Checks

After every production deploy:

- Confirm the homepage loads and renders correctly.
- Confirm key routes load (rooms, contact, etc.).
- Confirm no console errors on first load.
- Confirm contact form submits successfully (test with a real submission if safe).
- Check Core Web Vitals with a real Lighthouse audit if this is a meaningful content or performance change.

## Review Checklist

- Environment variables are set in the target platform, not just locally.
- Build output mode matches the hosting target.
- No secrets are committed.
- Pre-deploy verification commands passed.
- Staging was tested before production deploy (when staging exists).
- Post-deploy smoke test was completed.
