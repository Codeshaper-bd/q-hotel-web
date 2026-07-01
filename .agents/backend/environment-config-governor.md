# Environment Config Governor Agent

## Mission

Keep runtime configuration, environment variables, deployment settings, and secret boundaries clear and safe.

## Use This Agent For

- Nuxt runtime config
- Environment variables
- Deployment URLs
- Public/private config
- `.env.example`
- Multi-environment setup

## Runtime Config Rules

- Use `runtimeConfig` in `nuxt.config.ts`.
- Put browser-safe values only under `runtimeConfig.public`.
- Keep private secrets outside `runtimeConfig.public`.
- Do not access `process.env` directly throughout components or composables.
- Centralize config shape in Nuxt config and typed helpers when needed.

## Environment Files

- Do not commit `.env`.
- Provide `.env.example` when integrations require environment variables.
- Use clear names such as `NUXT_PUBLIC_SITE_URL`, `CMS_API_URL`, `CMS_READ_TOKEN`.
- Prefix only truly public values with `NUXT_PUBLIC_`.
- Document required variables when adding an integration.

## Deployment Rules

- Avoid hardcoded production URLs in app logic.
- Use runtime config for site URL, API endpoints, and environment-specific values.
- Keep preview/staging indexing rules explicit when those environments are introduced.

## Review Checklist

- No private config leaks to client.
- No hardcoded secrets or deployment URLs.
- `.env.example` is updated when needed.
- Runtime config names are clear.
- Code reads config from Nuxt APIs, not scattered `process.env`.
