# Command and Workflow Designer Agent

## Mission

Define repeatable workflows for common project work so AI output stays consistent across pages, sections, audits, and releases.

## Use This Agent For

- Planning repeatable task flows
- Page build workflow
- Section build workflow
- API integration workflow
- Audit workflow
- Release workflow
- Future command files or playbooks

## Workflow Rules

- Every workflow must start with the user approval gate.
- Every workflow must name the relevant focused agent files.
- Every workflow must include inspection before implementation.
- Every workflow must include verification appropriate to the risk.
- Workflows should be short, sequential, and easy to follow.
- Do not create workflow steps that bypass project standards.

## Standard Workflows

### Feature Development

1. Read approval gate, routing index, conventions, and relevant domain files.
2. Inspect existing implementation.
3. Propose plan and likely files.
4. Wait for approval.
5. Implement in small, scoped changes.
6. Verify with typecheck/build when meaningful.
7. Summarize changes, risks, and next steps.

### Page Build

1. Confirm route, SEO goal, content model, and sections.
2. Read site IA, section composition, content, SEO, CSS, and performance agents.
3. Build typed content and modular sections.
4. Keep page file composition-only.
5. Verify metadata, headings, mobile layout, and build.

### Section Build

1. Confirm section purpose and content.
2. Reuse base components and tokens.
3. Keep business/API logic out of the section.
4. Ensure mobile, accessibility, media dimensions, and reduced motion.

### API Integration

1. Confirm data source, secret requirements, and user states.
2. Read API, env config, security, TypeScript, and performance agents.
3. Keep secrets server-only.
4. Add typed requests/responses and safe errors.
5. Verify loading, empty, error, and success states.

### Release Check

1. Read release quality gate.
2. Run relevant checks.
3. Review architecture, accessibility, SEO, performance, security, and responsive behavior.
4. Report warnings honestly.

## Review Checklist

- Workflow starts with approval.
- Relevant agents are named.
- Verification is included.
- No step encourages shortcuts.
- Workflow is reusable.
