---
title: Switch Database
---

::: warning
Starting from fba v1.10.0, the default database has been changed from MySQL to PostgreSQL.
:::

fba supports PostgreSQL and MySQL. The default configuration uses PostgreSQL.

## Docker Images

If you do not have a database installed locally, or prefer Docker, you can start database containers with the commands below.

### PostgreSQL

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

### MySQL

```shell:no-line-numbers
docker run -d \
  --name fba_mysql \
  --restart always \
  -e MYSQL_DATABASE=fba \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -e TZ=Asia/Shanghai \
  -v fba_mysql:/var/lib/mysql \
  -p 3306:3306 \
  mysql:8.0.41 \
  --default-authentication-plugin=mysql_native_password \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_general_ci \
  --lower_case_table_names=1
```

## Environment Configuration

PostgreSQL and MySQL differ in username, port, and other settings. If you created Docker images with the commands above, update part of `.env` as shown below. Otherwise, adjust according to your actual configuration.

### PostgreSQL

```dotenv:no-line-numbers
# Database
DATABASE_TYPE='postgresql'
DATABASE_HOST='127.0.0.1'
DATABASE_PORT=5432
DATABASE_USER='postgres'
DATABASE_PASSWORD='123456'
```

### MySQL

```dotenv:no-line-numbers
# Database
DATABASE_TYPE='mysql'
DATABASE_HOST='127.0.0.1'
DATABASE_PORT=3306
DATABASE_USER='root'
DATABASE_PASSWORD='123456'
```

## Decoupling

If you want to keep only one database, follow these steps:

- Remove `with_variant` related code (if any) and keep only the types for your chosen database
- Remove `DATABASE_TYPE` and related call sites from `backend/core/conf.py`
- Remove `DATABASE_TYPE` from `.env.example` and `.env`
- Update `database_type` related code in the code-generator plugin templates
- Delete unused folders under `backend/sql`
- Delete unused container scripts from `docker-compose.yml`
