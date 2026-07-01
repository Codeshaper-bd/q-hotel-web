# User Approval Gate

## Mission

Require explicit user approval before starting implementation work, so every change stays aligned with the project owner's intent.

## Mandatory Rule

Before making code, structure, dependency, configuration, content, styling, API, animation, WebGL, or documentation changes, the AI must first ask for approval with a short implementation plan.

## Approval Workflow

For every new task:

1. Restate the requested outcome in plain language.
2. List the relevant agent files that will be followed.
3. Summarize the intended files/folders likely to be touched.
4. Mention any dependency, API, security, performance, or SEO impact if relevant.
5. Ask the user to approve before editing.
6. Start work only after the user approves.

## Approval Message Format

Use this concise format:

```text
I will do:
- ...

Likely files:
- ...

Standards I will follow:
- ...

Please approve and I will start.
```

## Allowed Without Approval

These actions can be done before approval because they are read-only or harmless:

- Reading files.
- Inspecting project structure.
- Searching with `rg`.
- Explaining options.
- Reviewing code.
- Reporting current status.

## Not Allowed Without Approval

Do not do these before approval:

- Create, edit, move, or delete files.
- Install, remove, or upgrade dependencies.
- Change configuration.
- Start a long-running dev server.
- Add routes, components, sections, styles, APIs, content, or docs.
- Run destructive commands.

## Emergency Exceptions

Only skip the approval gate when the user explicitly says to proceed without asking, for example:

- "go ahead and implement"
- "no need to ask approval"
- "make the changes directly"

Even then, continue following all other agent standards.

## Hard Prohibitions

Never do these under any circumstances:

- Bypass this approval gate.
- Commit `.env` or any file containing secrets, tokens, or credentials.
- Add inline CSS without a documented technical reason.
- Add duplicate components, composables, or utilities.
- Add direct `vue` or `vue-router` as explicit dependencies (let Nuxt own them).
- Run destructive git commands unless explicitly requested by the user.
- Claim Lighthouse, PageSpeed, accessibility, or SEO scores without running a real audit.

## Review Signals

Flag these during any code review:

- New package added for a problem a small local implementation would solve.
- Global CSS added for page-specific styling.
- Client-only rendering for SEO-critical content.
- Business rules placed inside templates.
- API secrets used in client code.
- Animation added without cleanup.
- WebGL added without fallback and disposal.
