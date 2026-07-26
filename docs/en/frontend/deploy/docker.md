---
title: Docker Deployment
---

::: warning
This tutorial uses HTTPS as an example.
:::

:::: steps

1. Pull the code onto the server

   Pulling code to the server is usually done over SSH (more secure). You may also use HTTP — choose what works for you.

2. env

   Set `VITE_GLOB_API_URL` in `/apps/web-antd/.env.production` to your domain address (no trailing slash).

3. Update nginx configuration

   The file `/scripts/deploy/nginx.conf` includes comments — modify as needed.

4. Update the `docker-compose` script

   The `docker-compose.yml` script includes comments — modify as needed.

5. Run the one-click start command

   ::: caution Prerequisites

    - Comment out the fba_ui container in the fba backend docker-compose script
    - Build the fba backend via docker-compose first

   :::

   Open a terminal in the project root and run:

   ```shell:no-line-numbers
   docker compose up -d --build
   ```

::::
