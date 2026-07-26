---
title: Claude Agentic Ecosystem Guide
createTime: 2026-1-14 13:30
sticky: true
tags:
  - AI
permalink: /blog/b7igpw0h/
---

Claude's agentic capabilities keep growing. With the launch of **Skills**, users are paying more attention to how each component in the ecosystem roles and collaborates.

## Projects

Self-contained workspaces exclusive to paid plans, with independent chat history, a 200K context window, and a knowledge base.

### How It Works

- Upload documents as a knowledge base; Claude can access them in all conversations within the project
- When nearing the limit, RAG (retrieval-augmented generation) is enabled automatically, effectively expanding context
- Supports custom project instructions that apply to all sub-conversations

### When to Use

- Projects that need persistent background knowledge (e.g. product launches, research topics)
- Team collaboration (shared knowledge bases)
- Unified tone, perspective, or method for a domain

**Example**: Create a “Q4 Product Launch” project, upload related documents, and set the instruction “Analyze competitors from a product strategy angle and propose differentiation.” All later conversations follow this automatically.

## Skills

A Skill is a “folder” of instructions, scripts, and resource files. Claude dynamically scans and loads relevant Skills while handling tasks.

### How It Works

- Progressive disclosure: first load metadata (~100 tokens) to judge relevance, then full instructions (usually < 5k tokens); scripts or files load only when needed.
- This prevents the context window from filling with irrelevant content

### When to Use

- When you need durable, consistent professional capability
- Company brand guidelines, compliance processes, domain expertise (e.g. advanced Excel, PDF processing)
- Personal preferences (e.g. coding style, note-taking systems)

**Advantages**: Reusable and portable — multiple conversations or subagents can share them

**Example**: Create a “Brand Guidelines” Skill with color, font, and layout rules. All later generated content follows the standard without repeating instructions.

## MCP (Model Context Protocol)

An open standard protocol for connecting Claude to external tools and data sources (Google Drive, GitHub, databases, CRM, etc.).

### Role

- Provides persistent external data access instead of manual uploads each time
- Analogous to HTTP/API in the internet era — a “connector” for the AI era

**Relationship with Skills**:

- MCP handles connection and data retrieval (atomic capability)
- Skills handle processing logic and workflows (SOP-style guidance)
  They complement each other: MCP provides tools; Skills guide how to use them

**When to use**: When you frequently access external systems or integrate enterprise tools

## Subagents

Dedicated assistants with independent context, system prompts, and tool permissions. Mainly used in Claude Code or the Agent SDK.

### When to Use

- Task specialization (e.g. code review, test generation)
- Isolating complex subtasks to keep the main conversation clean
- Parallel processing or limiting tool permissions (e.g. read-only, for better security)

**Difference from Skills**:

- Subagents are more like “dedicated staff” for specific workflows
- Skills are more like “shared textbooks” for cross-conversation expertise

## Prompts

Natural-language instructions typed directly in a conversation — short-lived and conversational.

### When to Use

- One-off tasks (e.g. summarize an article)
- Real-time adjustments (e.g. “more professional tone”)
- Temporary context or format requirements

**Characteristics**: Not persistent across sessions. If the same kind of instruction is repeated often, promote it to a Skill or Project instruction.

## How Components Work Together

- **Project** provides persistent context and knowledge
- **Skills** inject reusable expertise and processing rules
- **MCP** connects external real-time data sources
- **Subagents** take specialized subtasks
- **Prompts** fine-tune in real time

### Practical Example

*Building a Competitive Intelligence Agent*

- Create a **Project**, upload historical reports, set unified analysis instructions
- Create a “Competitive Analysis” **Skill** defining document retrieval strategy and output templates
- Connect Google Drive and web search via **MCP**
- Set two **Subagents**: market researcher (trend analysis) and tech analyst (product comparison)
- The user starts with one **Prompt**: “Analyze the top three competitors' AI features and find breakthrough opportunities”

**Result**: Claude automatically coordinates multi-source data, professional methods, and subtask division to produce a structured, high-quality report.

## Summary Recommendations

- Persistent project context → use **Projects**
- Repeated domain expertise → package as **Skills** (highest reuse)
- External tool integration → use **MCP**
- Task isolation and parallelism → use **Subagents**
- Temporary adjustments → use **Prompts**

Combining these modules well can greatly improve Claude's performance for personal productivity, enterprise processes, and complex agent workflows. As the ecosystem matures, more standardized tools and Skills will further simplify agent building.
