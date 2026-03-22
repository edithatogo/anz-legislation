# Conductor Status

Last reviewed: 2026-03-22

## Summary

This file is the authoritative Conductor workspace overview for this repository.
The workspace currently contains a mix of complete records, pending work, and
backlog/template material that has now been separated from active tracks.

See also:

- `README.md` for workspace operating rules
- `archive/README.md` for archived track inventory
- `backlog/README.md` for backlog promotion rules

## Active Track Inventory

| Track                                | Status   | Notes                                                           |
| ------------------------------------ | -------- | --------------------------------------------------------------- |
| `release-governance-modernization`   | COMPLETE | Fully documented and marked complete                            |
| `documentation-site-enhancements`    | PENDING  | Optional post-launch work not yet started                       |
| `documentation-site-completion`      | COMPLETE | Parent completion record restored                               |
| `anz-brand-transition`               | ACTIVE   | Compatibility window active; repo/package migration is live     |
| `legal-metadata-standards-alignment` | COMPLETE | Canonical standards layer documented and implemented additively |

## Archived Tracks

Archived track count: `11`

The archive contains prior completed or retired efforts and should be treated as
historical context rather than active delivery scope.

## Backlog Entries

Backlog entry count: `4`

The backlog contains reserved track names that are not part of current active
delivery. One of them, `p1-legislative-volatility`, is intentionally tracked in
detail under `research-conductor` instead of this product-side Conductor tree.

## Current Read on Project State

- Conductor now has a clean active-track inventory.
- Three active tracks are explicitly complete.
- One active track is explicitly pending.
- One active track is explicitly in progress.
- The documentation enhancement track no longer contradicts itself about launch
  status.
- The missing parent record for documentation site completion has been
  restored.
- The ANZ brand transition is now tracked as a separate staged migration rather
  than an implicit future rename.
- ANZ transition planning is complete across naming policy, inventory, package
  strategy, repo/docs migration, and deprecation criteria.
- The repository now lives at `edithatogo/anz-legislation`.
- Both npm package names are now published at `1.2.1`:
  `nz-legislation-tool` and `anz-legislation`.
- GitHub release `v1.2.1` now exists for the new repository.
- Trusted publishing is configured for future automated releases.
- Legal metadata standards alignment is now tracked as an explicit architecture
  effort rather than an implicit future refactor.
- Legal metadata standards alignment now has an accepted ADR, canonical
  schemas, provider mapping, canonical-backed legacy adapters, additive export
  metadata, and a schema.org publication helper.
- The product still ships on the legacy-compatible `nz-legislation-tool` path,
  but `anz-legislation` is now also published and supported.
- The provider model is coherent internally, and a standards-aligned canonical
  legal metadata layer now exists additively without breaking the CLI surface.
- The former template track has been moved out of active inventory to
  `conductor/templates`.
- Former stub tracks have been moved out of active inventory to
  `conductor/backlog`.

## Recommended Next Cleanup

1. Track the ANZ compatibility window explicitly, including when legacy package
   and binary names can be retired.
2. Keep `metadata.json`, `index.md`, and `plan.md` aligned as the transition
   moves from migration to deprecation.
3. Promote backlog entries back into `conductor/tracks` only when they gain a
   real owner, scope, and plan.
4. Open a follow-on track only when source-derived legal relationship extraction
   or dataset-level publication metadata becomes a concrete delivery need.
