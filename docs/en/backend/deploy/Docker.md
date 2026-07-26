---
title: Docker Deployment
---

::: info
A solid tutorial site: [Docker — From Getting Started to Practice](https://yeasy.gitbook.io/docker_practice)
:::

## Local Deployment

Local deployment is meant to quickly provide a local API service.

### Backend

:::: steps

1. env

   Open a terminal in the `backend` directory and create the environment file:

   ```shell:no-line-numbers
   touch .env
   ```

   Copy the initial environment configuration into the environment file:

   ```shell:no-line-numbers
   cp .env.example .env
   ```

2. Update configuration as needed in `backend/core/conf.py` and `.env`
3. Build the container

   Open a terminal in the project root and run:

   ::: warning
   If the container will run locally, change `127.0.0.1` in `.env` to `host.docker.internal`
   :::

   ::: tabs#dockerfile
   @tab fba

   ```shell:no-line-numbers
   docker build -f Dockerfile -t fba_server_independent .
   ```

   @tab celery

   ```shell:no-line-numbers
   docker build --build-arg SERVER_TYPE=fba_celery_worker -t fba_celery_worker_independent .
   ```

   :::

4. Start the container

   Because the build does not include a database, make sure the required databases (PostgreSQL / MySQL, Redis) are installed and running locally.

   ::: tabs#dockerfile
   @tab fba

   ```shell:no-line-numbers
   docker run -d -p 8001:8001 --name fba_server fba_server_independent
   ```

   @tab celery

   ```shell:no-line-numbers
   docker run -d --name fba_celery_worker fba_celery_worker_independent
   ```

   :::

::::

### Frontend

[**Quick Start**](../../frontend/summary/quick-start.md){.read-more}

## Server Deployment

::: warning
==This guide uses HTTPS as an example=={.warning}

fba uses a free SSL certificate: [httpsok-SSL](https://httpsok.com/p/4Qjd). Certificates renew automatically — one command handles SSL auto-renewal, with support for nginx, wildcard certificates, Qiniu Cloud, Tencent Cloud, Alibaba Cloud, CDN, OSS, and LB (load balancing).
:::

### Backend

:::: steps

1. Pull the code onto the server

   Pulling code onto a server is usually done via SSH (more secure). You can also use HTTPS — choose whichever approach you prefer.

2. env

   Open a terminal in the `backend` directory and create the environment file:

   ```shell:no-line-numbers
   touch .env
   ```

   Go to the `deploy/backend/docker-compose` directory and update the `.env.server` file as needed.

   ::: info
   In the docker-compose scripts, the `.env.server` file is mounted as the fba environment file. Changes you make locally are synced into the Docker container, so updating environment variables does not require a rebuild.
   :::

   ::: warning
   If you are using a MySQL database, update part of `.env.server` as follows:

   ```dotenv:no-line-numbers
   # Database
   DATABASE_TYPE='mysql'
   DATABASE_HOST='fba_mysql'
   DATABASE_PORT=3306
   DATABASE_USER='root'
   DATABASE_PASSWORD='123456'
   ```

   :::

3. Update configuration as needed in `backend/core/conf.py`

4. Update the docker-compose scripts

   The `docker-compose.yml` script includes comments — modify it as needed.

5. Run the one-click start command

   Open a terminal in the project root and run:

   ::: warning
   If you run into image pull issues while the command is running, please search for a solution yourself.
   :::

   ::: tabs
   @tab Default port mapping

   ```shell:no-line-numbers
   docker compose up -d --build
   ```

   @tab Custom port mapping

   ```shell:no-line-numbers
   docker compose --env-file deploy/backend/docker-compose/.env.docker up -d --build
   ```
   :::

6. Wait for the command to finish
   ::::

### Frontend

[**Quick Start**](../../frontend/deploy/docker.md){.read-more}

## Notes

::: warning
Avoid frequently running `docker compose up -d --build`. Every run rebuilds containers and keeps local backups of the previous ones, which can quickly consume disk space.
:::

[15 scripts for automated Docker container management](https://www.yuque.com/fcant/devops/itkfyytisf9z84y6){.read-more}

Clean unused images:

```shell:no-line-numbers
docker image prune
```

Clean unused containers:

```shell:no-line-numbers
docker container prune
```

Clean all unused images, containers, networks, and build cache:

```shell:no-line-numbers
docker system prune
```
