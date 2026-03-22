# Track: ANZ Brand Transition

## Context

- [Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Phase 1 Decision Record](./decision.md)
- [Phase 2 Surface Inventory](./inventory.md)
- [Phase 2 Implementation Rules](./rules.md)
- [Phase 3 Package and CLI Strategy](./package-cli-strategy.md)
- [Phase 4 Repo and Docs Migration Checklist](./repo-docs-migration.md)
- [Phase 5 Deprecation Plan](./deprecation-plan.md)
- [Metadata](./metadata.json)

## Status

🟡 IN PROGRESS - Repository migration, dual-package publishing, GitHub release
setup, and trusted publishing are now live; the compatibility window is active

## Summary

Australian support means the product now has a mismatch between what it does
and what it is called. The rename should be staged rather than immediate,
because the repository name, npm package, CLI binary, GitHub Pages path,
documentation URLs, configuration directories, and MCP identity are all tied to
the existing `nz-legislation` / `nz-legislation-tool` naming.

This track treats `anz-legislation` as the target repository name and `ANZ
Legislation` as the target product identity. It deliberately separates the
decision, compatibility policy, public-surface migration, and eventual cleanup
so the transition can happen without breaking current users.

All planning phases are complete. The naming policy is recorded in
`decision.md`, the rename-sensitive inventory is in `inventory.md`, the
dual-branding rules are in `rules.md`, and the package/CLI migration strategy
is in `package-cli-strategy.md`. The repository, documentation, site, MCP, and
support-link migration checklist is in `repo-docs-migration.md`, and the
deprecation completion criteria are in `deprecation-plan.md`.

Implementation is now well underway. Safe public-copy surfaces have been moved
to `ANZ Legislation`, current-guidance repository links have been migrated to
`edithatogo/anz-legislation`, CLI and MCP presentation reflect the invoked
alias when users run the ANZ binaries, and smoke coverage exists for both
alias-aware presentation and the generated sibling-package artifact.

The repository rename is no longer prospective. The new GitHub repository
exists, both npm package names are published, the `v1.2.1` GitHub release is
live, and trusted publishing is configured for future releases. The track is
still in progress because the compatibility window remains active and legacy
name retirement has not yet been executed.

## Implementation Progress

- public-facing docs and guidance now present the product as `ANZ Legislation`
  where safe
- current-guidance repository links now point to `edithatogo/anz-legislation`
- package documentation now accurately states that `nz-legislation-tool`
  remains the published package while both legacy and ANZ binaries are exposed
- CLI help, warning text, and examples now adapt to the invoked binary name
- MCP startup output now shows both the invoked binary and the alternate binary
  while preserving the server identifier `nz-legislation`
- alias-aware presentation logic now has focused helper coverage plus a plain
  Node smoke test in `scripts/smoke-alias-presentation.mjs`
- release-facing docs now describe the ANZ product identity, the continued
  `nz-legislation-tool` package path, and the current dual-binary state without
  prematurely starting the compatibility window
- release automation now includes a generated sibling-package path for
  `anz-legislation`, with local smoke coverage for the publish artifact before
  the compatibility window starts
- the repository now lives at `edithatogo/anz-legislation`
- both npm package names are now published at `1.2.1`:
  `nz-legislation-tool` and `anz-legislation`
- the GitHub release trail is now live with `v1.2.1`
- npm trusted publishing is configured for both package names so future
  releases can return to automated GitHub-based publishing

## Intended Outcome

- the repository can be renamed to `anz-legislation`
- the product can be presented publicly as `ANZ Legislation`
- package and CLI migration can happen with an explicit compatibility window
- documentation, MCP, and website surfaces can be updated without orphaning the
  current install base
- every phase ends with a scripted Conductor review gate before work advances

## Review Automation

Use the phase-end review command at the end of each plan phase:

`node scripts/conductor-phase-review.mjs --track anz-brand-transition --phase <n>`

The command validates that the active track artifacts exist, that the named
phase exists in the plan, and that the phase contains its own review gate.

---

**Track ID:** `anz-brand-transition`
**Last Updated:** 2026-03-22
