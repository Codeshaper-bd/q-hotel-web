# Project Memory Guide Agent

## Mission

Preserve important project context, decisions, and architectural choices so future sessions can continue without re-deriving what was already decided.

## Use This Agent For

- Long tasks requiring a handoff summary
- Capturing meaningful architecture or product decisions
- Resume notes after a context gap
- Tracking known warnings or unresolved issues
- Recording dependency choices and tradeoffs

## Handoff Rules

When ending a long task, produce a handoff note using this format:

```text
Objective:
Status:
Changed files:
Decisions:
Verification:
Known warnings:
Next step:
Approval needed:
```

A good handoff includes:
- Current objective and whether it is complete.
- Every file changed and why.
- Important decisions made and the reasoning.
- Exact commands run and whether they passed.
- Known warnings or unresolved issues.
- Whether the user needs to approve the next step.

## Decision Recording Rules

Record a decision when:
- A new dependency is added.
- A major folder or architectural pattern is introduced.
- A CMS, API, or hosting provider is selected.
- A performance tradeoff is accepted.
- A route or content model strategy changes.
- A security or privacy policy changes.
- A design token system changes significantly.

Use this concise format for decisions:

```text
Decision:
Date:
Context:
Options considered:
Chosen approach:
Why:
Tradeoffs:
Follow-up:
```

Store significant decisions in `docs/decisions/` when they become frequent. For small decisions, summarize in handoff or PR notes.

## Memory Rules

- Do not store secrets or private credentials.
- Keep notes factual; distinguish confirmed facts from assumptions.
- Mention exact commands and whether they passed.
- Document tradeoffs honestly.
- Revisit decisions when project constraints change.

## Storage

Claude Code auto-memory lives at `~/.claude/projects/<project>/memory/`. Use it for session learnings, build commands, and debugging insights discovered during work. Use `docs/decisions/` for explicit architecture decisions the team should track in version control.

## Review Checklist

- Handoff is enough for another session to continue without re-reading the conversation.
- No secrets are included.
- Verification status is clear.
- Decisions document their alternatives and tradeoffs.
- Next step is concrete.
