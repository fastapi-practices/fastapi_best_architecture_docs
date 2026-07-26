---
title: CLI
---

This CLI differs slightly from the [backend built-in CLI](./backend/reference/cli.md). It targets full-stack frontend and backend projects.

Features include:

- One-click create, configure, and manage fba projects (interactive guided flow)
- One-click run fba / fba_ui projects
- One-click frontend and backend plugin management
- ...

If you are building with fba frontend and backend, this tool greatly simplifies project initialization and day-to-day development.

## How to Use

1. Install fba-cli

   ```bash
   npm install -g @fba/cli
   ```

2. Run `fba-cli -h` in the terminal for help

::: warning
fba-cli is a strict project-level CLI tool. Before using it, you must define the frontend and backend as a [general-purpose or backend-first project structure](./architecture.md#project-structure).
:::
