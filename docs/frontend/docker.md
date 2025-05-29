---
title: Docker 部署
---

:::: steps

1. 拉取代码到服务器

   ```shell:no-line-numbers
   git clone https://github.com/fastapi-practices/fastapi_best_architecture_ui.git
   ```

2. env

   修改 `/apps/web-antd/.env.production` 中的 `VITE_GLOB_API_URL` 为域名地址（末尾不带斜杠）

3. 更新 nginx 配置

   进入 `/scripts/deploy/nginx.conf` 目录，修改 `nginx.conf` 文件

   @[code nginx :collapsed-lines=12](../code/nginx.conf)

4. 更新脚本文件

   ::: warning
   如果你已通过后端 docker-compose 构建前端项目，此步骤和后面的剩余步骤直接跳过即可
   :::

   ```yaml :collapsed-lines=12
   networks:
     fba_network:
       # name: fba_network
       # driver: bridge
       external: true

   volumes:
     fba_static:
       external: true
     fba_static_upload:
       external: true

   services:
     fba_ui:
       build:
         context: .
         dockerfile: Dockerfile
       image: fba_ui:latest
       ports:
         - "80:80"
         - "443:443"
       container_name: fba_ui
       restart: always
       command:
         - nginx
         - -g
         - daemon off;
       volumes:
          # nginx https conf
          # 通过 docker 进行部署时，需要打开此配置项并确保<挂载到容器内的证书文件路径>配置
          # 与 nginx conf 中的 ssl 证书文件路径配置一致，如果你直接将 ssl 证书文件 cp
          # 到了 docker 容器内，则无需挂载证书文件，直接将它们注释或删除即可
          # local_ssl_pem_path：你在服务器存放 ssl pem 证书文件的路径，自行修改
          # local_ssl_key_path: 你在服务器存放 ssl key 证书文件的路径，自行修改
          # /etc/ssl/xxx.pem：挂载到容器内 ssl pem 证书文件的路径，自行修改
          # /etc/ssl/xxx.key：挂载到容器内 ssl key 证书文件的路径，自行修改
         - local_ssl_pem_path:/etc/ssl/xxx.pem # [!code warning:2]
         - local_ssl_key_path:/etc/ssl/xxx.key
         - fba_static:/www/fba_server/backend/static
       networks:
         - fba_network
   ```

5. 构建并启动容器

   创建网络

   ```shell:no-line-numbers
   docker network create fba_network
   ```

   构建

   ```shell:no-line-numbers
   docker-compose build fba_ui
   ```

   启动

   ```shell:no-line-numbers
   docker-compose run fba_ui
   ```
::::