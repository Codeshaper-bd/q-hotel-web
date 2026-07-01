# Forms and Contact Flow Agent

## Mission

Design and maintain hotel contact, inquiry, and reservation request forms with robust UX, server-side validation, spam protection, and privacy-compliant data handling.

## Use This Agent For

- Contact form implementation
- Room inquiry or reservation request flows
- Newsletter or subscription forms
- Form validation strategy
- Spam protection
- Form submission API routes
- Success, error, and loading states
- GDPR/privacy considerations for form data

## Form Architecture Rules

- Keep form state and submission logic in a dedicated composable, for example `app/composables/useContactForm.ts`.
- Use a Nuxt server route for every form submission. Never post directly to third-party APIs from the browser when the request requires private credentials.
- Keep secrets (SMTP credentials, webhook URLs, CRM API keys) server-only in Nuxt runtime config.
- Define typed request and response shapes for every form endpoint.
- Return stable, user-readable error messages from the server. Never expose raw upstream errors.

## Validation Rules

- Validate all inputs server-side regardless of client-side validation.
- Sanitize user strings before forwarding or storing them.
- Validate field formats: email format, phone length, string length limits.
- Return field-level errors where possible so the UI can highlight the failing field.
- Add at least one of: CAPTCHA, honeypot field, or rate limiting on public form endpoints when the backend path is wired up.

## UX Rules

- Show a visible loading state while the form is submitting.
- Show a clear success message on submission and reset the form or redirect.
- Show a clear error message when the server returns an error — never fail silently.
- Disable the submit button while submitting to prevent duplicate submissions.
- Keep required fields marked semantically (`required` attribute + visible label indicator).
- Ensure the form is fully keyboard accessible and each input has an associated `<label>`.
- Provide a visible focus state on every form control.

## Privacy Rules

- Show a brief privacy note near the submit button explaining how the submitted data is used.
- Do not store personal data in localStorage or sessionStorage.
- Do not log personal data (name, email, phone, message content) in production server logs.
- If a third-party CRM or email provider receives the data, disclose this to the user.
- Follow `.agents/backend/analytics-consent-governor.md` before adding any tracking to the form submission success event.

## Suggested Implementation Pattern

```text
app/
  components/
    sections/contact/
      ContactSection.vue       # section wrapper, layout only
      ContactForm.vue          # form UI and field rendering
  composables/
    useContactForm.ts          # form state, validation, submission
  types/
    contact.ts                 # ContactFormPayload, ContactFormResponse

server/
  api/
    contact.post.ts            # validates, sanitizes, sends, returns stable response
  utils/
    validation.ts              # shared validators
    mailer.ts                  # email sending abstraction (server-only)
```

## Suggested Form States

```typescript
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
```

Always render visually distinct UI for each state.

## Review Checklist

- Form composable owns all state and submission logic.
- Server route validates and sanitizes every field.
- Secrets remain server-only.
- Loading, success, and error states are implemented and visually distinct.
- Submit button is disabled during submission.
- Each input has an associated label.
- Keyboard navigation works through all fields.
- A privacy note is present near the submit action.
- No personal data is logged in production.
- `pnpm.cmd typecheck` and `pnpm.cmd build` pass after implementation.
