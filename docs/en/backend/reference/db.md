---
title: Database Configuration
---

::: warning
Starting from fba 2.0.0, MySQL support has been removed and fba supports PostgreSQL only
:::

Before v2.0.0, fba supported both PostgreSQL and MySQL and switched between them through `DATABASE_TYPE`. That setting and the `sql/mysql` script directories have been removed along with the MySQL support

## Docker Images

If you do not have a database installed locally, or prefer Docker, you can start a database container with the command below.

```shell:no-line-numbers
docker run -d \
  --name fba_postgres \
  --restart always \
  -e POSTGRES_DB='fba' \
  -e POSTGRES_PASSWORD='123456' \
  -e TZ='Asia/Shanghai' \
  -v fba_postgres:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16
```

## Environment Configuration

If you created the Docker image with the command above, update part of `.env` as shown below. Otherwise, adjust according to your actual configuration.

```dotenv:no-line-numbers
# Database
DATABASE_HOST='127.0.0.1'
DATABASE_PORT=5432
DATABASE_USER='postgres'
DATABASE_PASSWORD='123456'
```
