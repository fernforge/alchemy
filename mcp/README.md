# @fernforge/alchemy-mcp

An MCP server that hands the [Alchemy](https://github.com/fernforge/alchemy) ruleset to any
agent, so the prose it writes reads like a person wrote it instead of carrying the usual LLM
tells.

It exposes the rules two ways:

- **Tool `get_writing_rules`** — returns the full ruleset. An agent calls it before writing
  docs, a README, a commit message, or a reply, then follows what comes back.
- **Resource `alchemy://rules`** — the same text as an attachable resource, for clients that
  prefer to pin it into context.

## Use it

Add the server to your MCP client config. For Claude Desktop, in
`claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "alchemy": {
      "command": "npx",
      "args": ["-y", "@fernforge/alchemy-mcp"]
    }
  }
}
```

Cursor, Cline, and other MCP clients take the same `command` and `args` in their own config.
Restart the client and the `get_writing_rules` tool shows up.

## Why a server and not just a file

The [drop-in file](https://github.com/fernforge/alchemy) and the
[`npx @fernforge/alchemy init`](https://www.npmjs.com/package/@fernforge/alchemy) installer
both put the rules in one project. The server is for when you'd rather your agent pull the
rules on demand across every project, with no file to copy or keep current. Same rules, fetched
live.

## License

MIT
