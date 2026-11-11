---
title: Quick Start
---

::: caution
The frontend integrates dictionary features by default, so fba must install the dictionary plugin (built-in) and run the SQL scripts included in the plugin.
:::

::: steps

1. Prepare the local environment

    - Node.js (the repository pins 24.16.0 in `.node-version`; `engines` requires `^22.18.0 || ^24.0.0`)
    - <p>pnpm (`engines` requires `>=11.0.0`; the repository pins 11.7.0 through packageManager)</p>

2. Clone the Git repository

   ```shell
   git clone https://github.com/fastapi-practices/fastapi-best-architecture-ui.git
   ```

3. Install dependencies

   The frontend is a monorepo, so dependencies are installed once at the repository root

   ```shell
   pnpm install
   ```

4. Configure the API address

   Set `VITE_GLOB_API_URL` in `apps/web-antdv-next/.env.development` to your backend address (no trailing slash). The same address is used for the WebSocket connection

   ```dotenv:no-line-numbers
   # 接口地址
   VITE_GLOB_API_URL=http://localhost:8000
   ```

5. Start

   ```shell
   pnpm dev:antdv-next
   ```

   ::: tip
   The frontend is based on the Vben Admin monorepo; `pnpm dev` uses turbo-run to let you pick the app to start in the terminal
   :::

6. Open the browser: [http://localhost:5173](http://localhost:5173)

:::
