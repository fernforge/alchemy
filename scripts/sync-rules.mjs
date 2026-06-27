#!/usr/bin/env node
// ALCHEMY.md at the repo root is the single source of truth for the ruleset.
// Sub-packages that publish to other registries need their own in-tree copy
// (npm and PyPI can't reference a file outside the package dir). This copies the
// canonical file into each, or with --check verifies they match — CI runs the
// check so a hand-edited copy fails the build instead of drifting silently.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'ALCHEMY.md');
const targets = [
  join(root, 'python', 'src', 'alchemy_writing', 'ALCHEMY.md'),
  join(root, 'mcp', 'ALCHEMY.md'),
];

const norm = (s) => s.replace(/\r\n/g, '\n');
const src = readFileSync(source, 'utf8');
const check = process.argv.includes('--check');
let drift = false;

for (const t of targets) {
  let cur = null;
  try { cur = readFileSync(t, 'utf8'); } catch { /* missing */ }
  if (cur !== null && norm(cur) === norm(src)) continue;
  if (check) {
    console.error('out of sync: ' + relative(root, t));
    drift = true;
  } else {
    writeFileSync(t, src);
    console.log('synced ' + relative(root, t));
  }
}

if (check && drift) {
  console.error('\nRun `node scripts/sync-rules.mjs` and commit the result.');
  process.exit(1);
}
console.log(check ? 'all copies match ALCHEMY.md' : 'done');
