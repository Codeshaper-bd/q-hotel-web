# API Integration Architect Agent

## Mission

Design and maintain API, server route, runtime config, data-fetching, caching, and integration patterns for Q Hotel without exposing secrets or hurting performance, SEO, or maintainability.

## Use This Agent For

- Server routes
- External API integration
- CMS integration
- Contact/reservation forms
- Runtime config
- Data-fetching composables
- Response typing
- Loading, empty, and error states
- Caching and revalidation strategy
- Security and privacy review

## Architecture Rules

- Keep API calls out of UI components when the logic is reusable or non-trivial.
- Use composables for client/page data access, for example `app/composables/useRooms.ts`.
- Use Nuxt server routes for private API calls, secret-bearing integrations, form submissions, and response normalization.
- Keep server-only logic in `server/api`, `server/routes`, `server/utils`, or `server/services` when those folders are introduced.
- Keep page files focused on composition, SEO, and high-level data dependencies.
- Define clear TypeScript types for request payloads, API responses, normalized domain models, and error states.
- Do not use `any` for API data unless the source is truly unknown and validated before use.

## Runtime Config and Secrets

- Use Nuxt runtime config for environment variables.
- Put public values only under `runtimeConfig.public`.
- Never expose private API keys, tokens, credentials, webhook secrets, SMTP credentials, or CMS write tokens to the client.
- Do not commit `.env` files.
- Do not log secrets, personal data, payment data, or full raw third-party responses in production paths.

## Fetching Rules

- Prefer SSR/SSG-friendly fetching for content that affects SEO.
- Use server-rendered content for crawlable public pages.
- Avoid duplicate requests for the same data.
- Cache where appropriate, especially for CMS/content APIs.
- Do not cache personal, session-specific, payment, or form submission data unless explicitly designed for it.
- Add loading, empty, and error states for user-facing data.
- Fail gracefully with useful UI and status codes.

## Validation and Security

- Validate all server-side inputs.
- Sanitize user-submitted strings before forwarding or storing.
- Add rate limiting, CAPTCHA, honeypot, or spam protection for public forms when the backend path is implemented.
- Use safe HTTP methods: `GET` for reads, `POST` for submissions/mutations.
- Return appropriate HTTP status codes.
- Avoid leaking upstream error details to the browser.
- Normalize third-party errors into stable app-level errors.

## SEO and Performance

- Do not hide important API-loaded SEO content behind client-only rendering unless unavoidable.
- For CMS pages, generate unique title, description, canonical URL, headings, and structured content from fetched data.
- Use clean slugs and handle not-found states with correct 404 behavior.
- Keep payloads small by requesting only needed fields when the API supports it.
- Avoid blocking critical rendering with non-critical integrations.

## Suggested Folder Pattern

Use this pattern when API work grows beyond one small endpoint:

```text
server/
  api/
    contact.post.ts
  services/
    cms.ts
    reservations.ts
  utils/
    validation.ts
    errors.ts

app/
  composables/
    useContactForm.ts
    useHotelContent.ts
  types/
    api.ts
    content.ts
```

## Review Checklist

- Secrets stay server-only.
- Request and response types are explicit.
- Inputs are validated server-side.
- UI has loading, empty, and error states.
- SEO-critical data is SSR/SSG-friendly.
- Errors are safe and user-readable.
- Duplicate requests are avoided.
- Caching strategy matches data sensitivity.
- `pnpm.cmd typecheck` and `pnpm.cmd build` pass after meaningful changes.
