---
title: Plugin Installation
---

## Backend

::: warning
Backend plugin install and uninstall are available only in development. In production, built-in and verify plugins through the deployment process in advance.
:::

:::: tabs
@tab CLI

1. Open a terminal in the backend project root (ensure the virtual environment is activated)
2. Run `fba add -h` for help
3. Install from a ZIP package: `fba add --path /path/to/plugin.zip`
4. Install from a Git repository: `fba add --repo-url https://github.com/username/plugin.git`
5. To skip automatic plugin SQL execution, add `--no-sql`
6. Check and fix auto-appended environment variables and related config per the plugin README.md
7. Restart the service

CLI installation automatically installs plugin dependencies, syncs plugin model tables, runs initialization SQL matching the current database and primary-key mode, and appends the plugin `.env.example` to `backend/.env`.

@tab ZIP

1. Obtain a packaged plugin zip <Badge type="warning" text="choose one" />
   - Download the plugin repository as a zip

     ::: details GitHub example
     ![zip](/images/plugin_zip.png)
     :::

   - Or a zip downloaded via the fba plugin download API

2. Confirm the zip root contains `plugin.toml` and `README.md`
3. Install the zip via the fba zip plugin install API
4. Check and fix auto-appended environment variables and related config per the plugin README.md
5. Complete database initialization per the plugin SQL instructions
6. Restart the service

The ZIP filename becomes the plugin directory name. Prefer matching the plugin or repository name, and avoid hyphens and other characters that cannot be used as Python package names.

@tab Git

1. Obtain the plugin Git repository URL
2. Install via the fba Git plugin install API or `fba add --repo-url <repo-url>`
3. Check and fix auto-appended environment variables and related config per the plugin README.md
4. If installing via API, complete database initialization per the plugin SQL instructions
5. Restart the service

@tab Manual

1. Obtain and download the plugin repository source
2. Copy the source folder into `backend/plugin` (the plugin folder name must match the repository name)
3. Run `fba deps --plugin <plugin>` to install plugin dependencies
4. Add environment variables and related config per the plugin README.md
5. Run the matching initialization scripts under the plugin `sql` directory for the current database type and primary-key mode
6. Sync plugin model tables or generate migration files
7. Restart the service

::::

::: warning
For private repositories, embed a token in the URL for authentication: `https://<TOKEN>@github.com/username/private-repo.git`
:::

## Frontend

:::: tabs
@tab CLI

1. Open a terminal in the backend project root (ensure the virtual environment is activated)
2. Run `fba add -h` for help
3. Install from a Git repository: `fba add --frontend --repo-url https://github.com/username/plugin-ui.git`
4. Enter the frontend project root path when prompted
5. Configure per the plugin README.md
6. Restart the frontend service

Frontend plugin CLI currently supports Git repository installation only. The `_ui` or `-ui` suffix in the repository name is automatically removed when installing into the local plugin directory.

@tab Manual

1. Obtain and download the plugin repository source
2. Copy the source folder into `apps/web-antdv-next/src/plugins` (remove the `_ui` or `-ui` suffix from the plugin folder name)
3. Configure per the plugin README.md
4. Restart the frontend service

::::
