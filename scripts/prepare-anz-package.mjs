import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const outputDirArg = process.argv[2];
const outputDir = outputDirArg
  ? path.resolve(projectRoot, outputDirArg)
  : path.resolve(projectRoot, '.release', 'anz-legislation');

const sourceManifest = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'),
);

const generatedManifest = {
  name: 'anz-legislation',
  version: sourceManifest.version,
  description: 'CLI and MCP tool for searching and retrieving ANZ legislation data',
  type: sourceManifest.type,
  main: sourceManifest.main,
  bin: sourceManifest.bin,
  keywords: Array.from(
    new Set([...(sourceManifest.keywords ?? []), 'anz', 'australia']),
  ),
  author: sourceManifest.author,
  license: sourceManifest.license,
  repository: sourceManifest.repository,
  bugs: sourceManifest.bugs,
  homepage: sourceManifest.homepage,
  engines: sourceManifest.engines,
  dependencies: sourceManifest.dependencies,
  files: ['dist', 'README.md', 'LICENSE'],
};

const packageReadme = `# ANZ Legislation

This package publishes the ANZ-first install path for the **ANZ Legislation**
product while preserving the same runtime payload as \`nz-legislation-tool\`.

## Install

\`\`\`bash
npm install -g anz-legislation
\`\`\`

## Binaries

- \`anzlegislation\`
- \`anzlegislation-mcp\`
- \`nzlegislation\`
- \`nzlegislation-mcp\`

The legacy binary names remain available during the compatibility window.

## Repository

Current repository: ${sourceManifest.repository?.url ?? 'https://github.com/edithatogo/anz-legislation.git'}
`;

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
fs.cpSync(path.join(projectRoot, 'dist'), path.join(outputDir, 'dist'), {
  recursive: true,
});
fs.copyFileSync(path.join(projectRoot, 'LICENSE'), path.join(outputDir, 'LICENSE'));
fs.writeFileSync(
  path.join(outputDir, 'package.json'),
  `${JSON.stringify(generatedManifest, null, 2)}\n`,
);
fs.writeFileSync(path.join(outputDir, 'README.md'), packageReadme);

console.log(
  JSON.stringify(
    {
      outputDir,
      packageName: generatedManifest.name,
      version: generatedManifest.version,
    },
    null,
    2,
  ),
);
