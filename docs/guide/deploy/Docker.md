---
title: Docker 部署
---

::: info
一个还不错的教程网站：[Docker - 从入门到实践](https://yeasy.gitbook.io/docker_practice)
:::

## 本地部署

本地部署是为了能够快捷的提供本地 API 服务

### 后端

:::: steps

1. env

   在 `backend` 目录打开终端，创建环境变量文件

   ```shell:no-line-numbers
   touch .env
   ```

   将初始化环境变量配置拷贝到环境变量文件中

   ```shell:no-line-numbers
   cp .env.example .env
   ```

2. 按需修改配置文件 `backend/core/conf.py` 和 `.env`
3. 构建容器

   在项目根目录中打开终端，执行以下命令

   ::: note
   如果容器要在本地启动，需要将 `.env` 中的 `127.0.0.1` 更改为 `host.docker.internal`
   :::

   ```shell:no-line-numbers
   docker build -f Dockerfile -t fba_backend_independent .
   ```

4. 启动容器

   由于构建不包含数据库，请确保本地已安装并启动相关数据库（mysql / postgresql、redis）

   ```shell:no-line-numbers
   docker run -d -p 8000:8000 --name fba_server fba_backend_independent
   ```

::::

## 服务器部署

> [!TIP]
> 此教程以 https 为例，如果你没有相关经验，请自行 Google 进行了解

> [!NOTE]
> 免费 SSL 证书推荐使用 [httpsok-SSL 证书自动续期](https://httpsok.com/p/4Qjd)，一行命令，轻松搞定 SSL
> 证书自动续签，支持：nginx、通配符证书、七牛云、腾讯云、阿里云、CDN、OSS、LB（负载均衡）

### 后端

:::: steps

1. 拉取代码到服务器

   将代码拉取到服务器通常采用 ssh 方式（更安全），但是你也可以选择使用 https 方式，具体方式请根据个人自行决定，如果使用 ssh
   方式拉取代码，请自行 Google 拉取教程

   如果使用 https 方式，你可以查看 [后端步骤 2](../summary/quick-start.md#后端)

2. env

   在 `backend` 目录打开终端，创建环境变量文件

   ```shell:no-line-numbers
   touch .env
   ```

   进入 `deploy/backend/docker-compose` 目录，按需修改 `.env.server` 文件

   ::: tip
   我们在 docker-compose 脚本内通过挂载的方式使用 `.env.server` 文件作为 fba 环境变量文件，因此，本地修改此文件，将同步更新至 docker
   容器，这意味着，修改环境变量将无需重新 build
   :::

   ::: warning
   如果您正在使用 PostgreSQL 数据库，需修改 `.env.server` 部分配置如下：

   ```dotenv:no-line-numbers
   # Database
   DATABASE_TYPE='postgresql'
   DATABASE_HOST='fba_postgres'
   DATABASE_PORT=5432
   DATABASE_USER='postgres'
   DATABASE_PASSWORD='123456'
   ```

   :::

3. 按需修改配置文件 `backend/core/conf.py`

4. 更新脚本文件

   @[code yml :collapsed-lines=6](../../code/docker-compose.yml)

5. 执行一键启动命令

   在项目根目录中打开终端，执行以下命令

   ::: warning
   命令执行期间遇到镜像拉取问题请自行 Google
   :::

   ```shell:no-line-numbers
   docker-compose up -d --build
   ```

6. 等待命令执行完成
   ::::

### 前端

::::: steps

1. 拉取代码到服务器
2. env
   ::: tabs
   @tab <Icon name="icon-park-outline:new-lark" />Arco Desgin Vue
   修改 `.env.production` 中的 `VITE_API_BASE_URL` 为域名地址

   @tab <Icon name="devicon:antdesign" />Vben Admin Antd
   生产中...
   :::

3. 更新 nginx 配置

   进入 deploy 目录，修改 `nginx.conf` 文件

   @[code nginx :collapsed-lines=6](../../code/nginx.conf)

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

:::::

## 注意事项

::: warning
不建议频繁使用 `docker-compose up -d --build` 命令，此命令每次执行都会重新构建容器，并将原容器自动本地备份保留，这会导致硬盘空间迅速锐减
:::

::: info
[15 个 Docker 容器自动化管理的脚本](https://www.yuque.com/fcant/devops/itkfyytisf9z84y6)
:::

清理未使用的镜像

```shell:no-line-numbers
docker image prune
```

清理未使用的容器

```shell:no-line-numbers
docker container prune
```

清理所有未使用的镜像、容器、网络和构建缓存

```shell:no-line-numbers
docker system prune
```
