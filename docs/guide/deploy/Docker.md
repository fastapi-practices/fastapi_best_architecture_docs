---
title: Docker 部署
---

::: warning
默认端口冲突：8000、3306、6379、5672、5432

如果 docker 容器启动时端口被占用，会导致启动失败，建议在启动前检查本地端口占用情况
:::

## 本机部署

本机部署是为了能够快捷的提供本地 API 服务

### 后端

:::: steps

1. env

   进入 `deploy/backend/docker-compose` 目录，创建环境变量文件 `.env`

    ```shell
    touch .env.server ../../../backend/.env
    ```

   将初始化环境变量配置拷贝到环境变量文件中

    ```shell
    cp .env.server ../../../backend/.env
    ```

2. 按需修改配置文件 `backend/core/conf.py` 和 `.env`
3. 执行一键启动命令

   ::: info
   命令执行期间遇到镜像拉取问题请自行 Google
   :::

    ```shell
    docker-compose up -d --build
    ```

4. 等待命令执行完成
5. 打开浏览器访问：[http://127.0.0.1:8000/api/v1/docs](http://127.0.0.1:8000/api/v1/docs)
   ::::

### 前端

此教程不提供前端本机部署方案，对于前后端本地开发或联调，请转至文档：[本地开发](../summary/quick-start.md#本地开发)

## 服务器部署

> [!TIP]
> 此教程以 ==https== 为例，如果你没有相关经验，请自行 Google 进行了解

### 后端

:::: steps

1. 拉取代码到服务器

   将代码拉取到服务器通常采用 ssh 方式（更安全），但是你也可以选择使用 https 方式，具体方式请根据个人自行决定，如果使用 ssh
   方式拉取代码，
   请自行 Google 拉取教程，如果使用 https 方式，你可以查看 [后端步骤 2](../summary/quick-start.md#后端)

2. env

   进入 `deploy/backend/docker-compose` 目录，创建环境变量文件 `.env`

   ```shell
   touch .env.server ../../../backend/.env
   ```

   将初始化环境变量配置拷贝到环境变量文件中

   ::: warning
   环境变量默认使用 MySQL 数据库，如果你需要使用 PostgreSQL，需修改 `.env.server` 部分配置如下：
   ```env
   DATABASE_TYPE='postgresql'
   DATABASE_HOST='fba_postgres'
   DATABASE_PORT=3306
   DATABASE_USER='root'
   DATABASE_PASSWORD='123456'
   ```
   :::

   ```shell
   cp .env.server ../../../backend/.env
   ```

3. 按需修改配置文件 `backend/core/conf.py` 和 `.env`

   建议修改 `.env` 中的 `ENVIRONMENT` 为 `pro`

4. 更新脚本文件

   如果你没有前端需求，请查看 [本机部署](#本机部署)，否则，请查看下方脚本并修改 `docker-compose.yml` 文件

   ```yaml :collapsed-lines=2
   version: "3.10"
   
   networks:
   fba_network:
     name: fba_network
     driver: bridge
     ipam:
       driver: default
       config:
         - subnet: 172.10.10.0/24
   
   volumes:
   fba_mysql:
     name: fba_mysql
   fba_redis:
     name: fba_redis
   fba_static:
     name: fba_static
   fba_rabbitmq:
     name: fba_rabbitmq
   
   services:
     fba_server:
       build:
         context: ../../../
         dockerfile: backend/backend.dockerfile
       image: fba_server:latest
       container_name: fba_server
       restart: always
       depends_on:
         - fba_mysql
         - fba_redis
         - fba_celery
       volumes:
         - fba_static:/fba/backend/app/static
       networks:
         - fba_network
       command:
         - bash
         - -c
         - |
           wait-for-it -s fba_mysql:3306 -s fba_redis:6379 -t 300
           mkdir -p /var/log/supervisor/
           supervisord -c /fba/deploy/backend/supervisor.conf
           supervisorctl restart fastapi_server
   
     fba_mysql:
       image: mysql:8.0.29
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
     
     # 如果你是 postgres 用户，应保留 fba_postgres 容器脚本并删除 fba_mysql 容器脚本 // [!code focus:16] // [!code ++:16]
     # 否则，删除 fba_postgres 容器脚本
     fba_postgres:
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
       image: redis:6.2.7
       ports:
         - "${DOCKER_REDIS_MAP_PORT:-6379}:6379"
       container_name: fba_redis
       restart: always
       environment:
         - TZ=Asia/Shanghai
       volumes:
         - fba_redis:/var/lib/redis
       networks:
         - fba_network
   
     # 后端专用，这与 fba_ui 容器冲突，如果你选择使用 fba_ui 容器，// [!code focus:51] // [!code --:15]
     # 你应该注释或删除 fba_nginx 容器脚本，并使用 fba_ui 容器
     fba_nginx:
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
     
     # 如果服务器内存小于 4GB，CPU 小于四个内核 // [!code ++:34]
     # 建议进入 fba_ui 项目单独构建这个容器（参考下方前端部署教程）
     # 如果你不选择单独构建，务必在执行下面步骤前根据前端部署教程更新前端配置文件
     # 如果你选择单独构建，务必注释或删除此容器脚本
     fba_ui:
       build:
         context: /root/fastapi_best_architecture_ui  # 根据 fba_ui 项目存放目录修改此路径
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
       image: rabbitmq:3.12.7
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
         dockerfile: backend/celery.dockerfile
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
   ```

5. 执行一键启动命令

   命令执行期间遇到镜像拉取问题请自行 Google

   ```shell
   docker-compose up -d --build
   ```

6. 等待命令执行完成
   ::::

### 前端

::: caution
我们提供此前端部署教程的目的是为你提供前端 Docker 部署解决方案，请记住我们的声明，此前端项目仅作为效果演示，而不是用于生产！
:::

:::: steps

1. 拉取代码到服务器
2. env

   修改 `.env.production` 中的 `VITE_API_BASE_URL` 为域名地址

3. 更新 nginx 配置

   进入 deploy 目录，修改 `nginx.conf` 文件

   ``` :collapsed-lines=2
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
   
       server {
           listen       80 default_server;
           listen       [::]:80 default_server;
           server_name  127.0.0.1;
   
           listen 443 ssl; // [!code focus:10] // [!code ++:9]
           # docker ssl 证书文件路径配置应该与 docker-compose 中的保持一致
           # /etc/ssl/xxx.pem：挂载到容器内 ssl pem 证书文件的路径，自行修改
           # /etc/ssl/xxx.key：挂载到容器内 ssl key 证书文件的路径，自行修改
           ssl_certificate /etc/ssl/xxx.pem;
           ssl_certificate_key /etc/ssl/xxx.key;
           ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
           ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
           ssl_prefer_server_ciphers on;
           
           # xxx.com 应该与 .env.production 中的配置保持一致
           server_name xxx.com;
   
           client_max_body_size   10m;
   
           root /www/fba_ui;
   
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
                   alias /www/fba_server/backend/static;
           }
       }
   
       server { // [!code focus:6] // [!code ++:6]
           listen 80;
           # xxx.com 应该与 .env.production 中的配置保持一致
           server_name xxx.com;
           rewrite ^(.*)$ https://$host$1 permanent;
       }
   }
   ```

4. 更新脚本文件

   ::: warning
   如果你已通过后端 docker-compose 构建前端项目，此步骤和后面的剩余步骤直接跳过即可
   :::

   ```yaml :collapsed-lines=2
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
         - local_ssl_pem_path:/etc/ssl/xxx.pem
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

::::

## 注意事项

::: warning
不建议频繁使用 `docker-compose up -d --build` 命令，此命令每次执行都会重新构建容器，并将原容器自动本地备份保留，这会导致硬盘空间迅速锐减
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
