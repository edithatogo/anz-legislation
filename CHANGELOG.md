# ANZ Legislation

## 1.2.1

### Patch Changes

- f44e1fa: Update package metadata, runtime help text, and current support links to the
  renamed `edithatogo/anz-legislation` repository.

## 1.2.0

### Minor Changes

- e341fa9: Fix the multi-jurisdiction beta branch so provider-backed `search`, `get`, and `cite` commands remain compatible with the existing CLI output contract.

  Remove committed Docusaurus build artifacts from the repository and tighten the provider health, cache TTL, and rate-limiter behavior for Australian beta support.

- 04eb0a0: Prepare the ANZ sibling package publish path by generating an `anz-legislation`
  package artifact, wiring release workflows to publish it after
  `nz-legislation-tool`, and documenting the dual-publish release behavior.

### Patch Changes

- 858dd83: Add a standards-aligned canonical legal metadata layer with additive export metadata and schema.org publication helpers.
- 32fcb8a: Add `anzlegislation` and `anzlegislation-mcp` as supported CLI aliases while keeping the legacy binary names in place, and document the alias availability in the README.
- 96491ce: Qualify the initial ANZ branding copy so README and CLI help reflect the current prerelease scope of Australian support, and complete the implementation-ready planning artifacts for the ANZ transition track.

Published package: `nz-legislation-tool`

The product is now presented publicly as **ANZ Legislation**. During the
compatibility transition, the published package remains
`nz-legislation-tool`, and the package exposes both legacy and ANZ binaries:
`nzlegislation`, `anzlegislation`, `nzlegislation-mcp`, and
`anzlegislation-mcp`.

## 1.2.0-next.0

### Minor Changes

- # Australian Expansion (BETA)

  Initial support for Australian jurisdictions (Commonwealth and Queensland).
  - New providers in `src/providers/`
  - Routing flag `--jurisdiction`
  - Australian citation style
  - Hardened test suite
  - Dual binary exposure for both legacy and ANZ command names:
    `nzlegislation`, `anzlegislation`, `nzlegislation-mcp`, and
    `anzlegislation-mcp`

## 1.1.0

### Minor Changes

- 06ead46: # Performance & Scalability Release

  ## New Features
  - Added `nzlegislation batch` command for bulk operations
  - Added `nzlegislation stream` command for streaming large exports
  - Added performance audit script (`npm run bench:audit`)
  - Added bundle analysis script
  - Added load testing infrastructure with k6

  ## Improvements
  - API optimization with connection pooling, retry, and deduplication
  - Performance monitoring dashboard and scorecards
  - CI/CD integration for performance gates
  - Comprehensive documentation for performance metrics

  ## Performance Targets
  - Cache hit rate >80%
  - Bulk operations 10x faster
  - Streaming handles 1GB+ exports
  - API response <500ms p95
  - Memory usage <256MB
