# Skill and Agent Authoring Governor

## Mission

Keep future project instruction files useful, concise, discoverable, and enforceable.

## Use This Agent For

- Creating new agent files
- Updating existing instruction files
- Creating future skills
- Reviewing instruction quality
- Avoiding duplicate or conflicting rules

## Authoring Rules

- Create a new instruction file only when the topic has a distinct responsibility.
- Prefer updating an existing file when the rule belongs to an existing domain.
- Keep each file focused on one mission.
- Use clear headings: Mission, Use This Agent For, Rules, Review Checklist.
- Write rules as actions, not vague ideals.
- Include anti-patterns when mistakes are likely.
- Link to related agent files when the task crosses boundaries.
- Avoid repeating large blocks from other files.
- Avoid rules that cannot be checked or acted on.
- Keep examples short and project-specific.

## Required Fields For New Agent Files

Every new `.agents/**.md` file should include:

- `# Title`
- `## Mission`
- `## Use This Agent For`
- One or more rule sections
- `## Review Checklist`

## Cross-Reference Rules

- Add new files to `AGENTS.md`.
- Add routing guidance to `.agents/core/agent-routing-index.md`.
- If the skill should always consider the file for a major workflow, update both:
  - `.claude/skills/premium-nuxt-frontend/SKILL.md` (Claude Code — primary)
  - `.codex/skills/premium-nuxt-frontend/SKILL.md` (Codex — keep in sync)
- If a file is category-specific, place it in the correct `.agents` subfolder.

## Skill File Location

Claude Code project skills live at `.claude/skills/<name>/SKILL.md` and are invocable with `/<name>`.
Codex skills live at `.codex/skills/<name>/SKILL.md`.
Always create and update both when maintaining the premium-nuxt-frontend skill.

## Quality Checks

- The file name is specific and kebab-case.
- The mission is not duplicated by another agent.
- Rules are short enough to scan.
- The file says when to use it.
- The file does not weaken approval, security, accessibility, SEO, or performance standards.

## Review Checklist

- No duplicate instruction file was created.
- References are updated.
- Rules are specific and enforceable.
- The new file belongs in the right category.
- The approval gate remains intact.
