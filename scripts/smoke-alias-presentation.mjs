import assert from 'node:assert/strict';

import {
  detectCliBinaryName,
  detectMcpBinaryName,
  getAlternateCliBinaryName,
  getAlternateMcpBinaryName,
} from '../src/utils/invocation.ts';
import { buildCliHelpFooter, buildMcpStartupMessages } from '../src/utils/presentation.ts';

function main() {
  assert.equal(detectCliBinaryName('/usr/local/bin/nzlegislation'), 'nzlegislation');
  assert.equal(detectCliBinaryName('/usr/local/bin/anzlegislation'), 'anzlegislation');
  assert.equal(detectCliBinaryName('/repo/src/cli.ts'), 'nzlegislation');

  assert.equal(detectMcpBinaryName('/usr/local/bin/nzlegislation-mcp'), 'nzlegislation-mcp');
  assert.equal(detectMcpBinaryName('/usr/local/bin/anzlegislation-mcp'), 'anzlegislation-mcp');
  assert.equal(detectMcpBinaryName('/repo/src/mcp-cli.ts'), 'nzlegislation-mcp');

  assert.equal(getAlternateCliBinaryName('nzlegislation'), 'anzlegislation');
  assert.equal(getAlternateCliBinaryName('anzlegislation'), 'nzlegislation');
  assert.equal(getAlternateMcpBinaryName('nzlegislation-mcp'), 'anzlegislation-mcp');
  assert.equal(getAlternateMcpBinaryName('anzlegislation-mcp'), 'nzlegislation-mcp');

  const cliFooter = buildCliHelpFooter('anzlegislation', 'nzlegislation');
  assert.match(cliFooter, /\$ anzlegislation search --query "health" --type act/);
  assert.match(cliFooter, /Also available as: nzlegislation/);
  assert.match(cliFooter, /Documentation: https:\/\/github\.com\/edithatogo\/nz-legislation/);

  const mcpMessages = buildMcpStartupMessages('anzlegislation-mcp', 'nzlegislation-mcp');
  assert.deepEqual(mcpMessages, [
    'ANZ Legislation MCP Server running on stdio via anzlegislation-mcp (server id: nz-legislation)',
    'Also available as: nzlegislation-mcp',
    'Tools available: search_legislation, get_legislation, get_legislation_versions, generate_citation, export_legislation, get_config',
    'Resources available: legislation://{workId}',
  ]);

  console.log('Alias presentation smoke test passed.');
}

main();
