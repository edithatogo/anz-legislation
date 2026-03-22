import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'anz-legislation-smoke-'));

const prepareResult = spawnSync(
  process.execPath,
  [path.join(projectRoot, 'scripts', 'prepare-anz-package.mjs'), tempRoot],
  {
    cwd: projectRoot,
    stdio: 'inherit',
  },
);

if (prepareResult.status !== 0) {
  process.exit(prepareResult.status ?? 1);
}

const manifest = JSON.parse(fs.readFileSync(path.join(tempRoot, 'package.json'), 'utf8'));

const expectedBins = [
  'anzlegislation',
  'anzlegislation-mcp',
  'nzlegislation',
  'nzlegislation-mcp',
];

if (manifest.name !== 'anz-legislation') {
  throw new Error(`Expected generated package name anz-legislation, got ${manifest.name}`);
}

for (const binName of expectedBins) {
  if (!(binName in (manifest.bin ?? {}))) {
    throw new Error(`Expected generated package to expose ${binName}`);
  }
}

if (!fs.existsSync(path.join(tempRoot, 'dist', 'cli.js'))) {
  throw new Error('Expected generated package dist/cli.js to exist');
}

if (!fs.existsSync(path.join(tempRoot, 'dist', 'mcp-cli.js'))) {
  throw new Error('Expected generated package dist/mcp-cli.js to exist');
}

console.log('ANZ sibling package smoke test passed.');
