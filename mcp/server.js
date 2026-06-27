#!/usr/bin/env node
// Alchemy MCP server. Exposes the human-writing ruleset over the Model Context
// Protocol so any MCP client (Claude Desktop, Cursor, etc.) can pull it on demand:
//   - tool     get_writing_rules  -> the full ruleset, for an agent to read before writing
//   - resource alchemy://rules     -> the same text as an attachable resource
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const RULES = readFileSync(join(here, 'ALCHEMY.md'), 'utf8');
const RESOURCE_URI = 'alchemy://rules';

const server = new Server(
  { name: 'alchemy', version: '0.1.0' },
  { capabilities: { tools: {}, resources: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_writing_rules',
      description:
        'Return the Alchemy ruleset: how to write human-quality prose and avoid the tell-tale ' +
        'patterns of LLM text. Call this before writing any natural-language content (docs, ' +
        'READMEs, commit messages, replies) and follow the rules it returns.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === 'get_writing_rules') {
    return { content: [{ type: 'text', text: RULES }] };
  }
  return {
    content: [{ type: 'text', text: `Unknown tool: ${req.params.name}` }],
    isError: true,
  };
});

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: RESOURCE_URI,
      name: 'Alchemy writing ruleset',
      description: 'Rules for writing human-quality prose instead of tell-tale LLM text.',
      mimeType: 'text/markdown',
    },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
  if (req.params.uri !== RESOURCE_URI) {
    throw new Error(`Unknown resource: ${req.params.uri}`);
  }
  return { contents: [{ uri: RESOURCE_URI, mimeType: 'text/markdown', text: RULES }] };
});

await server.connect(new StdioServerTransport());
console.error('alchemy-mcp running on stdio');
