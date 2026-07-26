---
title: Traditional Deployment
---

::: steps

## Server

1. Prepare Nginx

   Using Ubuntu as an example:

   ```shell
   sudo apt update
   sudo apt install nginx -y
   ```

2. Update configuration

   Replace `/etc/nginx/nginx.conf` with [nginx.conf](https://github.com/fastapi-practices/fastapi-best-architecture-ui/blob/master/scripts/deploy/nginx.conf).

## Local

1. env

   Update the `.env.production` configuration file.

2. Build

   ```shell
   pnpm build
   ```

3. Upload

   Upload all files under `/apps/web-antd/dist` to `/var/www/fba_ui/` on the server.

:::
