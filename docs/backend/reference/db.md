---
title: 数据库配置
---

::: warning
自 fba 2.0.0 开始，fba 已移除 MySQL 支持，仅支持 PostgreSQL 数据库
:::

在 v2.0.0 之前，fba 同时支持 PostgreSQL 和 MySQL，并通过 `DATABASE_TYPE` 切换数据库；该配置项与 `sql/mysql` 脚本目录已随 MySQL 支持一并移除

## Docker 镜像

如果你未在本地安装数据库，或更习惯使用 Docker，可以参考以下命令启动数据库容器

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

## 环境配置

如果你使用上面的命令创建了 Docker 镜像，需修改 `.env` 部分配置如下，否则，请根据实际配置进行修改

```dotenv:no-line-numbers
# Database
DATABASE_HOST='127.0.0.1'
DATABASE_PORT=5432
DATABASE_USER='postgres'
DATABASE_PASSWORD='123456'
```
