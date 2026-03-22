import { describe, expect, it } from 'vitest';

import {
  detectCliBinaryName,
  detectMcpBinaryName,
  getAlternateCliBinaryName,
  getAlternateMcpBinaryName,
} from '../src/utils/invocation.js';

describe('invocation detection', () => {
  it('detects legacy CLI binary names', () => {
    expect(detectCliBinaryName('/usr/local/bin/nzlegislation')).toBe('nzlegislation');
    expect(detectCliBinaryName('C:\\Tools\\nzlegislation.cmd')).toBe('nzlegislation');
  });

  it('detects ANZ CLI binary names', () => {
    expect(detectCliBinaryName('/usr/local/bin/anzlegislation')).toBe('anzlegislation');
    expect(detectCliBinaryName('C:\\Tools\\anzlegislation.cmd')).toBe('anzlegislation');
  });

  it('falls back to legacy CLI name for non-binary entrypoints', () => {
    expect(detectCliBinaryName('/repo/src/cli.ts')).toBe('nzlegislation');
    expect(detectCliBinaryName(undefined)).toBe('nzlegislation');
  });

  it('detects legacy MCP binary names', () => {
    expect(detectMcpBinaryName('/usr/local/bin/nzlegislation-mcp')).toBe('nzlegislation-mcp');
    expect(detectMcpBinaryName('C:\\Tools\\nzlegislation-mcp.cmd')).toBe('nzlegislation-mcp');
  });

  it('detects ANZ MCP binary names', () => {
    expect(detectMcpBinaryName('/usr/local/bin/anzlegislation-mcp')).toBe('anzlegislation-mcp');
    expect(detectMcpBinaryName('C:\\Tools\\anzlegislation-mcp.cmd')).toBe('anzlegislation-mcp');
  });

  it('falls back to legacy MCP name for non-binary entrypoints', () => {
    expect(detectMcpBinaryName('/repo/src/mcp-cli.ts')).toBe('nzlegislation-mcp');
    expect(detectMcpBinaryName(undefined)).toBe('nzlegislation-mcp');
  });

  it('returns the alternate CLI binary name', () => {
    expect(getAlternateCliBinaryName('nzlegislation')).toBe('anzlegislation');
    expect(getAlternateCliBinaryName('anzlegislation')).toBe('nzlegislation');
  });

  it('returns the alternate MCP binary name', () => {
    expect(getAlternateMcpBinaryName('nzlegislation-mcp')).toBe('anzlegislation-mcp');
    expect(getAlternateMcpBinaryName('anzlegislation-mcp')).toBe('nzlegislation-mcp');
  });
});
