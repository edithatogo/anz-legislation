#!/usr/bin/env node
/**
 * MCP Server entry point for ANZ Legislation
 * Run with: nzlegislation-mcp or anzlegislation-mcp
 */

import { detectMcpBinaryName, getAlternateMcpBinaryName } from '@utils/invocation';
import { logger } from '@utils/logger';

import { startServer } from './mcp/server.js';

let serverInstance: unknown = null;
const invokedMcpBinaryName = detectMcpBinaryName();
const alternateMcpBinaryName = getAlternateMcpBinaryName(invokedMcpBinaryName);

async function shutdown(signal: 'SIGTERM' | 'SIGINT'): Promise<void> {
  logger.info(`MCP server received ${signal}, shutting down gracefully...`);
  if (
    serverInstance &&
    typeof (serverInstance as { close?: () => Promise<void> }).close === 'function'
  ) {
    await (serverInstance as { close: () => Promise<void> }).close();
  }
  logger.info('MCP server shutdown complete');
  process.exit(0);
}

// Start the MCP server
startServer(invokedMcpBinaryName, alternateMcpBinaryName)
  .then(server => {
    serverInstance = server;
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  });

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});
