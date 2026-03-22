import { describe, expect, it } from 'vitest';

import { buildCliHelpFooter, buildMcpStartupMessages } from '../src/utils/presentation.js';

describe('presentation helpers', () => {
  it('builds CLI help footer with invoked and alternate aliases', () => {
    const footer = buildCliHelpFooter('anzlegislation', 'nzlegislation');

    expect(footer).toContain('$ anzlegislation search --query "health" --type act');
    expect(footer).toContain('$ anzlegislation config --show');
    expect(footer).toContain('Also available as: nzlegislation');
    expect(footer).toContain('Documentation: https://github.com/edithatogo/anz-legislation');
  });

  it('builds MCP startup messages with invoked and alternate aliases', () => {
    const messages = buildMcpStartupMessages('anzlegislation-mcp', 'nzlegislation-mcp');

    expect(messages).toEqual([
      'ANZ Legislation MCP Server running on stdio via anzlegislation-mcp (server id: nz-legislation)',
      'Also available as: nzlegislation-mcp',
      'Tools available: search_legislation, get_legislation, get_legislation_versions, generate_citation, export_legislation, get_config',
      'Resources available: legislation://{workId}',
    ]);
  });
});
