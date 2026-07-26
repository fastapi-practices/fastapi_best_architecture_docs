---
title: LLMs.txt
---

This guide explains how to help AI tools such as Cursor, Windsurf, and Claude better understand fba.

## What Is llms.txt?

We support providing fba documentation to large language models (LLMs) via llms.txt files. This helps AI tools better understand fba's backend architecture, APIs, and usage patterns.

## Available Resources

We provide several llms.txt routes to help AI tools access documentation:

- [llms.txt](https://docs.fba.wu-clan.cc/llms.txt) — a structured overview with main documentation entries and links
- [llms-full.txt](https://docs.fba.wu-clan.cc/llms-full.txt) — full documentation including implementation details and examples

## Usage in AI Tools

### Cursor

In Cursor, use the @Docs feature to add llms.txt files to project context. This helps Cursor provide more accurate code suggestions and explanations based on fba documentation.

[Learn more about @Docs in Cursor](https://cursor.com/docs/context/mentions#docs)

### Claude Code

In Claude Code, add llms.txt to the workspace knowledge base (Docs / Context Files) so completions and explanations can reference it, improving understanding of fba architecture and development conventions.

[Learn more about Claude Code documentation context](https://code.claude.com/docs)

### Gemini CLI

In Gemini CLI, specify the llms.txt path via the --context parameter or in .gemini/config.json so Gemini can consult the docs when answering and generating code.

[Learn more about Gemini CLI context configuration](https://ai.google.dev/gemini-api/docs)

## Other AI Tools

Any AI tool that supports llms.txt can use the paths above to better understand fba.
