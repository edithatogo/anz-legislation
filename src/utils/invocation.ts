const CLI_BINARIES = new Set(['nzlegislation', 'anzlegislation']);
const MCP_BINARIES = new Set(['nzlegislation-mcp', 'anzlegislation-mcp']);

function normalizeInvocation(argv1?: string): string | null {
  if (!argv1) {
    return null;
  }

  const pathSegments = argv1.split(/[\\/]/).filter(Boolean);
  const basename = pathSegments.at(-1) ?? argv1;
  const extensionlessBasename = basename.replace(/\.(cmd|exe|bat|ps1)$/i, '');
  const candidates = [basename, extensionlessBasename]
    .map(value => value.toLowerCase())
    .filter(Boolean);

  for (const candidate of candidates) {
    if (CLI_BINARIES.has(candidate) || MCP_BINARIES.has(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function detectCliBinaryName(argv1: string | undefined = process.argv[1]): string {
  const invocation = normalizeInvocation(argv1);
  return invocation && CLI_BINARIES.has(invocation) ? invocation : 'nzlegislation';
}

export function detectMcpBinaryName(argv1: string | undefined = process.argv[1]): string {
  const invocation = normalizeInvocation(argv1);
  return invocation && MCP_BINARIES.has(invocation) ? invocation : 'nzlegislation-mcp';
}

export function getAlternateCliBinaryName(binaryName: string): string {
  return binaryName === 'anzlegislation' ? 'nzlegislation' : 'anzlegislation';
}

export function getAlternateMcpBinaryName(binaryName: string): string {
  return binaryName === 'anzlegislation-mcp' ? 'nzlegislation-mcp' : 'anzlegislation-mcp';
}
