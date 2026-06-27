# alchemy-writing

Turn AI prose into writing that reads like a person wrote it. This is the Python
distribution of [Alchemy](https://github.com/fernforge/alchemy) — a small ruleset you hand
your coding agent so the docs, READMEs, and replies it writes stop carrying the tell-tale
LLM patterns.

## Install

```bash
pip install alchemy-writing
alchemy init
```

`alchemy init` writes `ALCHEMY.md` into your project and links it from your `CLAUDE.md`,
`AGENTS.md`, or `.cursorrules` if one exists. Your agent reads the rules whenever it writes
after that.

Print the rules instead of writing them:

```bash
alchemy print
```

Or pull them into your own code:

```python
import alchemy_writing
print(alchemy_writing.rules())
```

## What's in it

The rules are grounded in documented AI-writing tells: Wikipedia's "Signs of AI writing,"
the Kobak et al. study on words that spiked in research papers after ChatGPT, and Pangram's
phrase-frequency data. They cover the banned constructions, the fingerprint vocabulary, the
punctuation tells led by em-dash overuse, and a self-check the agent runs over its own prose.

Full project, including the npm package and MCP server: https://github.com/fernforge/alchemy

## License

MIT
