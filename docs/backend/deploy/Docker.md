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

   ::: warning
   如果容器要在本地启动，需要将 `.env` 中的 `127.0.0.1` 更改为 `host.docker.internal`
   :::

   ::: tabs#dockerfile
   @tab fba

   ```shell:no-line-numbers
   docker build -f Dockerfile -t fba_backend_independent .
   ```

   @tab celery

   ```shell:no-line-numbers
   docker build --build-arg SERVER_TYPE=celery -t fba_celery_independent .
   ```

   :::

4. 启动容器

   由于构建不包含数据库，请确保本地已安装并启动相关数据库（postgresql / mysql、redis）

   ::: tabs#dockerfile
   @tab fba

   ```shell:no-line-numbers
   docker run -d -p 8000:8000 --name fba_server fba_backend_independent
   ```

   @tab celery

   ```shell:no-line-numbers
   docker run -d -p 8555:8555 --name fba_celery fba_celery_independent
   ```

   :::

::::

### 前端

[请移步至 **前端快速开始**](../../frontend/summary/quick-start.md){.read-more}

## 服务器部署

::: warning
此教程以 https 为例
:::

::: info
免费 SSL 证书推荐使用 [httpsok-SSL 证书自动续期](https://httpsok.com/p/4Qjd)，一行命令，轻松搞定 SSL
证书自动续签，支持：nginx、通配符证书、七牛云、腾讯云、阿里云、CDN、OSS、LB（负载均衡）
:::

### 后端

:::: steps

1. 拉取代码到服务器

   将代码拉取到服务器通常采用 ssh 方式（更安全），当然你也可以选择使用 https 方式，具体方式请根据个人自行决定

2. env

   在 `backend` 目录打开终端，创建环境变量文件

   ```shell:no-line-numbers
   touch .env
   ```

   进入 `deploy/backend/docker-compose` 目录，按需修改 `.env.server` 文件

   ::: info
   我们在 docker-compose 脚本内通过挂载的方式使用 `.env.server` 文件作为 fba 环境变量文件，因此，本地修改此文件，将同步更新至
   docker 容器，这意味着，修改环境变量将无需重新 build
   :::

   ::: warning
   如果您正在使用 MySQL 数据库，需修改 `.env.server` 部分配置如下：

   ```dotenv:no-line-numbers
   # Database
   DATABASE_TYPE='mysql'
   DATABASE_HOST='fba_mysql'
   DATABASE_PORT=3306
   DATABASE_USER='root'
   DATABASE_PASSWORD='123456'
   ```

   :::

3. 按需修改配置文件 `backend/core/conf.py`

4. 更新 docker-compose 脚本

   脚本 `docker-compose.yml` 中有相关注释说明，根据需要进行修改即可

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

[请移步至 **前端快速开始**](../../frontend/deploy/docker.md){.read-more}

## 注意事项

::: warning
不建议频繁使用 `docker-compose up -d --build` 命令，此命令每次执行都会重新构建容器，并将原容器自动本地备份保留，这会导致硬盘空间迅速锐减
:::

[15 个 Docker 容器自动化管理的脚本](https://www.yuque.com/fcant/devops/itkfyytisf9z84y6){.read-more}

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
