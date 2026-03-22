export function buildCliHelpFooter(invokedCliName: string, alternateCliName: string): string {
  return `
Jurisdictions:
  - nz (New Zealand, default)
  - au-comm (Australian Commonwealth)
  - au-qld (Queensland)

Examples:
  $ ${invokedCliName} search --query "health" --type act
  $ ${invokedCliName} get "act_public_1989_18"
  $ ${invokedCliName} get "act/1988/123" --jurisdiction au-comm
  $ ${invokedCliName} get "act_public_1989_18" --versions
  $ ${invokedCliName} export --query "health" --output health.csv
  $ ${invokedCliName} stream --query "health" --output health.csv  # Stream large exports
  $ ${invokedCliName} batch --ids "act_public_1989_18,act_public_1986_132" --type getWork --output results.json
  $ ${invokedCliName} batch --file works.csv --type getWork --output results.json
  $ ${invokedCliName} cite "act_public_1989_18" --style bibtex
  $ ${invokedCliName} config --show
  $ ${invokedCliName} cache --stats

Documentation: https://github.com/edithatogo/nz-legislation
Also available as: ${alternateCliName}
NZ API Documentation: https://api.legislation.govt.nz/docs/`;
}

export function buildMcpStartupMessages(
  invokedBinaryName: string,
  alternateBinaryName: string
): string[] {
  return [
    `ANZ Legislation MCP Server running on stdio via ${invokedBinaryName} (server id: nz-legislation)`,
    `Also available as: ${alternateBinaryName}`,
    'Tools available: search_legislation, get_legislation, get_legislation_versions, generate_citation, export_legislation, get_config',
    'Resources available: legislation://{workId}',
  ];
}
