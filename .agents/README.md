# Agent Folder Map

This folder contains project-specific instruction files for AI-assisted work.

## Required Entry Points

- `core/user-approval-gate.md`
- `core/agent-routing-index.md`
- `core/project-conventions-guardian.md`

Every meaningful task should start from these files before selecting focused instructions.

## Categories

- `core/`: approval workflow, routing, architecture, project conventions, skill authoring, session memory and decisions.
- `frontend/`: components, CSS, design system, page sections, motion/WebGL.
- `quality/`: TypeScript quality, performance, testing, release gate, multi-agent review.
- `content-seo/`: content modeling, media, accessibility, SEO, site architecture.
- `backend/`: API, business logic, forms, runtime config, security, analytics/consent.
- `workflow/`: dependency governance, git workflow, repeatable playbooks, deployment.

## Skill Files

Claude Code skill: `.claude/skills/premium-nuxt-frontend/SKILL.md` — invoke with `/premium-nuxt-frontend`
Codex skill: `.codex/skills/premium-nuxt-frontend/SKILL.md`

Keep both in sync when updating the skill.

## Rule

When in doubt, read `core/agent-routing-index.md` first.
