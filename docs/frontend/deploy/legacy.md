---
title: 传统部署
---

::: steps

1. 准备 Nginx

   以 Ubuntu 为例：

   ```shell
   sudo apt update
   sudo apt install nginx -y
   ```

   将 [nginx.conf](https://github.com/fastapi-practices/fastapi_best_architecture_ui/blob/master/scripts/deploy/nginx.conf)
   替换到 `/etc/nginx/nginx.conf`

2. env

   更新 `.env.production` 配置文件

3. 打包

   ```shell
   pnpm build
   ```

4. 上传

   将 `/apps/web-antd/dist` 目录下的所有文件上传到服务器的 `/var/www/fba_ui/` 目录下