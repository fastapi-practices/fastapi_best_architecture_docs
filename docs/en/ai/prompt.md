---
title: Prompt
---

Prompts are not about quantity — they are about usefulness. Ineffective prompts only add burden to the LLM.

[Introduction to Prompt](../blog/claude-ai-ecosystem.md){.read-more}

## Git Operations

```markdown
## Git

Disable any automatic git save related actions (add, commit...).
```

## File Writes

```markdown
## File write

When writing too much file content at one time, always write in batches.
```

## Plugin Task

::: tip
Install fba skills before use:

```bash
npx skills add fastapi-practices/skills
```
:::

```markdown
Use the fba skill for this plugin task: <for example: convert an existing feature / develop a new plugin / check and prepare for release>

- Project or plugin directory: <directory>
- Plugin name: <plugin_name>
- Plugin type: <backend / frontend>

Read the relevant conventions and give a short plan first. Wait for my confirmation before changing files
Run the necessary checks after implementation and explain how to publish or submit the plugin
If the fba skill or another required tool is unavailable, tell me first. Do not install it or assume it is available
Do not run git add, commit, push, fork, or PR actions without my explicit approval
```
