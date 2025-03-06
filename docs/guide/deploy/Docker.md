---
title: Docker 部署
---

::: warning
默认端口冲突：8000、3306、6379、5672、5432

如果 docker 容器启动时端口被占用，会导致启动失败，建议在启动前检查本地端口占用情况
:::

::: info
一个还不错的教程网站：[Docker - 从入门到实践](https://yeasy.gitbook.io/docker_practice)
:::

## 本地部署

本地部署是为了能够快捷的提供本地 API 服务

### 后端

::: steps

1. env

   在 `backend` 目录中，创建环境变量文件

   ```shell
   touch .env
   ```

   将初始化环境变量配置拷贝到环境变量文件中

   ```shell
   cp .env.example .env
   ```

2. 按需修改配置文件 `backend/core/conf.py` 和 `.env`
3. 确保你位于项目根目录
4. 运行以下命令构建容器

   如果容器要在本地启动，需要将 `.env` 中的 `127.0.0.1` 更改为 `host.docker.internal`

   ```shell
   docker build -f backend/Dockerfile -t fba_backend_independent .
   ```

5. 启动容器

   由于构建不包含数据库，请确保本地已安装并启动相关数据库（mysql / postgresql、redis）

   ```shell
   docker run -d -p 8000:8000 --name fba_server fba_backend_independent
   ```

:::

## 服务器部署

> [!TIP]
> 此教程以 https 为例，如果你没有相关经验，请自行 Google 进行了解

> [!NOTE]
> 免费 SSL 证书推荐使用 [httpsok-SSL证书自动续期](https://httpsok.com/p/4Qjd)，一行命令，轻松搞定 SSL
> 证书自动续签，支持：nginx、通配符证书、七牛云、腾讯云、阿里云、CDN、OSS、LB（负载均衡）

### 后端

:::: steps

1. 拉取代码到服务器

   将代码拉取到服务器通常采用 ssh 方式（更安全），但是你也可以选择使用 https 方式，具体方式请根据个人自行决定，如果使用 ssh
   方式拉取代码，请自行 Google 拉取教程

   如果使用 https 方式，你可以查看 [后端步骤 2](../summary/quick-start.md#后端)

2. env

   进入 `deploy/backend/docker-compose` 目录，按需修改 `.env.server` 文件

   ::: note
   我们在 docker-compose 脚本内通过挂载的方式直接使用此文件作为 fba 环境变量文件，因此，本地修改此文件，将同步更新至 docker
   容器，这意味着，修改环境变量将无需重新 build
   :::

   ::: warning
   如果你需要使用 PostgreSQL 数据库，执行命令前，需修改 `.env.server` 部分配置如下：
   ```env
   DATABASE_TYPE='postgresql'
   DATABASE_HOST='fba_postgres'
   DATABASE_PORT=5432
   DATABASE_USER='postgres'
   DATABASE_PASSWORD='123456'
   ```
   :::

3. 按需修改配置文件 `backend/core/conf.py`

4. 更新脚本文件

   ```yaml :collapsed-lines=6
   services:
     fba_server:
       build:
         context: ../../../
         dockerfile: backend/Dockerfile
       image: fba_server:latest
       container_name: fba_server
       restart: always
       # 如果你是 postgres 用户，应将 fba_mysql 修改为 fba_postgres
       depends_on: # [!code warning:2]
         - fba_mysql
         - fba_redis
         - fba_celery
       volumes:
         - .env.server:/fba/backend/.env
         - fba_static:/fba/backend/app/static
       networks:
         - fba_network
       # 如果你是 postgres 用户，应将 fba_mysql:3306 修改为 fba_postgres:5432
       command: # [!code warning:5]
         - bash
         - -c
         - |
           wait-for-it -s fba_mysql:3306 -s fba_redis:6379 -t 300
           mkdir -p /var/log/supervisor/
           supervisord -c /fba/deploy/backend/supervisor.conf
           supervisorctl restart fastapi_server
   
     fba_mysql:
       image: mysql:8.0.41
       ports:
         - "${DOCKER_MYSQL_MAP_PORT:-3306}:3306"
       container_name: fba_mysql
       restart: always
       environment:
         MYSQL_DATABASE: fba
         MYSQL_ROOT_PASSWORD: 123456
         TZ: Asia/Shanghai
       volumes:
         - fba_mysql:/var/lib/mysql
       networks:
         - fba_network
       command: 
         --default-authentication-plugin=mysql_native_password
         --character-set-server=utf8mb4
         --collation-server=utf8mb4_general_ci
         --lower_case_table_names=1
     
     # 如果你是 postgres 用户，应保留 fba_postgres 容器脚本并删除 fba_mysql 容器脚本
     # 否则，删除 fba_postgres 容器脚本
     fba_postgres: # [!code warning:14]
       image: postgres:16
       ports:
         - "${DOCKER_MYSQL_MAP_PORT:-5432}:5432"
       container_name: fba_postgres
       restart: always
       environment:
         POSTGRES_DB: fba
         POSTGRES_PASSWORD: 123456
         TZ: Asia/Shanghai
       volumes:
         - fba_mysql:/var/lib/postgresql/data
       networks:
         - fba_network
   
     fba_redis:
       image: redis
       ports:
         - "${DOCKER_REDIS_MAP_PORT:-6379}:6379"
       container_name: fba_redis
       restart: always
       environment:
         - TZ=Asia/Shanghai
       volumes:
         - fba_redis:/usr/local/etc/redis
       networks:
         - fba_network
   
     # 后端专用，如果使用此容器，意味着你只需部署后端 API 服务，不需要前端；
     # 这与下面的 fba_ui 容器冲突，如果你选择使用 fba_ui 容器
     # 你应该注释或删除 fba_nginx 容器脚本，并使用 fba_ui 容器
     fba_nginx: # [!code warning:13]
       image: nginx
       ports:
         - "8000:80"
       container_name: fba_nginx
       restart: always
       depends_on:
         - fba_server
       volumes:
         - ../nginx.conf:/etc/nginx/nginx.conf:ro
         - fba_static:/www/fba_server/backend/static
       networks:
         - fba_network
     
     # 如果服务器内存小于 4GB，CPU 小于四个内核
     # 建议进入 fba_ui 项目单独构建这个容器（参考下方前端部署教程）
     # 如果你不选择单独构建，务必在执行下面步骤前根据前端部署教程更新前端配置文件
     # 如果你选择单独构建，务必注释或删除此容器脚本
     fba_ui: # [!code warning:30]
       build:
         context: /root/fastapi_best_architecture_ui  # 根据 Arco Desgin Vue 项目存放目录修改此路径
         dockerfile: Dockerfile
       image: fba_ui:latest
       ports:
         - "80:80"
         - "443:443"
       container_name: fba_ui
       restart: always
       depends_on:
         - fba_server
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
         - local_ssl_pem_path:/etc/ssl/xxx.pem
         - local_ssl_key_path:/etc/ssl/xxx.key
         - fba_static:/www/fba_server/backend/static
       networks:
         - fba_network
   
     fba_rabbitmq:
       hostname: fba_rabbitmq
       image: rabbitmq:3.13.7
       ports:
         - "15672:15672"
         - "5672:5672"
       container_name: fba_rabbitmq
       restart: always
       environment:
         - RABBITMQ_DEFAULT_USER=guest
         - RABBITMQ_DEFAULT_PASS=guest
       volumes:
         - fba_rabbitmq:/var/lib/rabbitmq
       networks:
         - fba_network
   
     fba_celery:
       build:
         context: ../../../
         dockerfile: backend/Dockerfile
         args:
           - SERVER_TYPE=celery
       image: fba_celery:latest
       ports:
         - "8555:8555"
       container_name: fba_celery
       restart: always
       depends_on:
         - fba_rabbitmq
       networks:
         - fba_network
       command:
         - bash
         - -c
         - |
           wait-for-it -s fba_rabbitmq:5672 -t 300
           mkdir -p /var/log/supervisor/
           supervisord -c /fba/deploy/backend/supervisor.conf
           supervisorctl restart celery_worker
           supervisorctl restart celery_beat
           supervisorctl restart celery_flower
   
   networks:
     fba_network:
       name: fba_network
       driver: bridge
       ipam:
         driver: default
         config:
           - subnet: 172.10.10.0/24
   
   volumes:
     # 如果你是 postgres 用户，应将 fba_mysql 修改为 fba_postgres
     fba_mysql: # [!code warning:2]
       name: fba_mysql
     fba_redis:
       name: fba_redis
     fba_static:
       name: fba_static
     fba_static_upload:
       name: fba_static_upload
     fba_rabbitmq:
       name: fba_rabbitmq
   ```

5. 执行一键启动命令

   命令执行期间遇到镜像拉取问题请自行 Google

   ```shell
   docker-compose up -d --build
   ```

6. 等待命令执行完成
   ::::

### 前端

::::: steps

1. 拉取代码到服务器
2. env

   :::: details Arco Desgin Vue
   修改 `.env.production` 中的 `VITE_API_BASE_URL` 为域名地址
   ::::

   :::: details Vben Admin Antd
   即将到来...
   ::::

3. 更新 nginx 配置

   进入 deploy 目录，修改 `nginx.conf` 文件

   ```nginx :collapsed-lines=6
   # For more information on configuration, see:
   #   * Official English Documentation: http://nginx.org/en/docs/
   #   * Official Russian Documentation: http://nginx.org/ru/docs/
   
   worker_processes auto;
   error_log /var/log/nginx/error.log;
   pid /run/nginx.pid;
   
   # Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
   include /usr/share/nginx/modules/*.conf;
   
   events {
   worker_connections 1024;
   }
   
   http {
   
       include /etc/nginx/mime.types;
       default_type application/octet-stream;
   
       sendfile on;
       client_max_body_size 5M;
       client_body_buffer_size 5M;
   
       gzip on;
       gzip_comp_level 2;
       gzip_types text/plain text/css text/javascript application/javascript application/x-javascript application/xml application/x-httpd-php image/jpeg image/gif image/png;
       gzip_vary on;
   
       keepalive_timeout 300;
   
       # 添加 https conf
       # [!code ++:7]
       # server {
       #     listen 80;
       #     listen [::]:80;
       #     # xxx.com 应该与 .env.production 中的配置保持一致
       #     server_name xxx.com;
       #     rewrite ^(.*)$ https://$host$1 permanent;
       #}
   
       server {
           # 删除下面两行
           # [!code --:2]
           listen       80 default_server;
           listen       [::]:80 default_server;
           
           # 更新为与上面 server_name 相同 [!code warning]
           server_name  127.0.0.1;
   
           # 添加 https conf
           # [!code ++:6]
           # listen 443 ssl;
           # ssl_certificate /etc/ssl/xxx.pem;  # 证书
           # ssl_certificate_key /etc/ssl/xxx.key;  # 密钥
           # ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
           # ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
           # ssl_prefer_server_ciphers on;
   
           client_max_body_size   5m;
   
           root /var/www/fba_ui;
   
           location / {
                   try_files $uri $uri/ /index.html;
           }
   
           location /api/v1/ {
                   proxy_pass http://fba_server:8001;
   
                   proxy_set_header Host $http_host;
                   proxy_set_header X-Real-IP $remote_addr;
                   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                   proxy_set_header X-Forwarded-Proto $scheme;
                   proxy_connect_timeout 300s;
                   proxy_send_timeout 300s;
                   proxy_read_timeout 300s;
           }
   
           location /static/ {
                   alias /var/www/fba_server/backend/static;
           }
       }
   }
   ```

4. 更新脚本文件

   ::: warning
   如果你已通过后端 docker-compose 构建前端项目，此步骤和后面的剩余步骤直接跳过即可
   :::

   ```yaml :collapsed-lines=6
   networks:
     fba_network:
       external: true
   
   volumes:
     fba_static:
       external: true
   
   services:
     fba_ui:
       build:
         context: ../
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

   ```shell
   docker network create fba_network
   ```

   构建

   ```shell
   docker-compose build fba_ui
   ```

   启动

   ```shell
   docker-compose run fba_ui
   ```

:::::

## 注意事项

::: warning
不建议频繁使用 `docker-compose up -d --build` 命令，此命令每次执行都会重新构建容器，并将原容器自动本地备份保留，这会导致硬盘空间迅速锐减
:::

::: info
[15 个 Docker 容器自动化管理的脚本](https://www.yuque.com/fcant/devops/itkfyytisf9z84y6)
:::

清理未使用的镜像

```shell
docker image prune
```

清理未使用的容器

```shell
docker container prune
```

清理所有未使用的镜像、容器、网络和构建缓存

```shell
docker system prune
```
