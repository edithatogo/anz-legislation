import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const args = process.argv.slice(2);

let tag;
let dryRun = false;

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === '--tag') {
    tag = args[index + 1];
    index += 1;
    continue;
  }

  if (arg === '--dry-run') {
    dryRun = true;
    continue;
  }

  throw new Error(`Unsupported argument: ${arg}`);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'anz-legislation-'));
const npmEnv = { ...process.env };

if (!npmEnv.NODE_AUTH_TOKEN && npmEnv.NPM_TOKEN) {
  npmEnv.NODE_AUTH_TOKEN = npmEnv.NPM_TOKEN;
}

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

const generatedManifest = JSON.parse(
  fs.readFileSync(path.join(tempRoot, 'package.json'), 'utf8'),
);

const versionLookup = spawnSync(
  'npm',
  ['view', `${generatedManifest.name}@${generatedManifest.version}`, 'version'],
  {
    cwd: projectRoot,
    encoding: 'utf8',
    env: npmEnv,
    shell: process.platform === 'win32',
  },
);

if ((versionLookup.stdout ?? '').trim() === generatedManifest.version) {
  console.log(
    `${generatedManifest.name}@${generatedManifest.version} is already published; skipping.`,
  );
  process.exit(0);
}

const publishArgs = ['publish', '--provenance', '--access', 'public'];
if (tag) {
  publishArgs.push('--tag', tag);
}
if (dryRun) {
  publishArgs.push('--dry-run');
}

const publishResult = spawnSync('npm', publishArgs, {
  cwd: tempRoot,
  env: npmEnv,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (publishResult.status !== 0) {
  process.exit(publishResult.status ?? 1);
}

console.log(
  `${generatedManifest.name}@${generatedManifest.version} published${tag ? ` with dist-tag ${tag}` : ''}.`,
);
