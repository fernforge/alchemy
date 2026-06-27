#!/usr/bin/env node
'use strict';

// Alchemy — install the human-writing ruleset into the current project.
// Zero dependencies. Reads ALCHEMY.md shipped beside the package and drops it
// into the target project, then wires a pointer into any agent config it finds.

const fs = require('fs');
const path = require('path');

const RULES_SRC = path.join(__dirname, '..', 'ALCHEMY.md');
const POINTER =
  '\n## Writing style\n\n' +
  'When writing prose (docs, READMEs, comments, commits, replies), follow the rules in ' +
  '`ALCHEMY.md` in this repo: write human-quality text, avoid the tell-tale LLM patterns.\n';

// Agent config files that take a natural-language pointer. First existing one wins.
const AGENT_FILES = ['CLAUDE.md', 'AGENTS.md', '.cursorrules', '.github/copilot-instructions.md'];

function arg(name) {
  return process.argv.slice(2).includes(name);
}

function help() {
  console.log(`alchemy — human-quality writing rules for AI agents

Usage:
  npx @fernforge/alchemy init     Write ALCHEMY.md into this project and link it
                                  from your agent config (CLAUDE.md / AGENTS.md / etc).
  npx @fernforge/alchemy print    Print the ruleset to stdout.
  npx @fernforge/alchemy --help   Show this.

Flags:
  --force   Overwrite an existing ALCHEMY.md.
  --no-link Don't touch agent config files; just write ALCHEMY.md.`);
}

function readRules() {
  try {
    return fs.readFileSync(RULES_SRC, 'utf8');
  } catch (e) {
    console.error('alchemy: could not read bundled ALCHEMY.md (' + e.message + ')');
    process.exit(1);
  }
}

function init() {
  const rules = readRules();
  const dest = path.join(process.cwd(), 'ALCHEMY.md');

  if (fs.existsSync(dest) && !arg('--force')) {
    console.log('• ALCHEMY.md already exists — left it alone (use --force to overwrite).');
  } else {
    fs.writeFileSync(dest, rules);
    console.log('✓ wrote ALCHEMY.md');
  }

  if (arg('--no-link')) {
    done();
    return;
  }

  // Link from the first agent config that exists; if none, point at CLAUDE.md as the
  // conventional default but don't create it (leave that choice to the user).
  let linked = false;
  for (const rel of AGENT_FILES) {
    const p = path.join(process.cwd(), rel);
    if (!fs.existsSync(p)) continue;
    const cur = fs.readFileSync(p, 'utf8');
    if (cur.includes('ALCHEMY.md')) {
      console.log('• ' + rel + ' already references ALCHEMY.md');
    } else {
      fs.writeFileSync(p, cur.replace(/\s*$/, '\n') + POINTER);
      console.log('✓ linked ALCHEMY.md from ' + rel);
    }
    linked = true;
    break;
  }
  if (!linked) {
    console.log(
      '• no agent config found. Add this line to your CLAUDE.md / AGENTS.md / .cursorrules:\n' +
        '    See ALCHEMY.md for writing style.'
    );
  }
  done();
}

function done() {
  console.log('\nDone. Your agent now has the rules. Review ALCHEMY.md and tune to taste.');
}

const cmd = process.argv[2];
if (!cmd || cmd === '--help' || cmd === '-h' || cmd === 'help') help();
else if (cmd === 'init') init();
else if (cmd === 'print') process.stdout.write(readRules());
else {
  console.error('alchemy: unknown command "' + cmd + '"\n');
  help();
  process.exit(1);
}
