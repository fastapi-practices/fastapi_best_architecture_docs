---
title: 切换数据库
---

::: warning
fba 自 v1.10.0 开始，已将默认数据库由 MySQL 替换为 PostgreSQL
:::

fba 支持 PostgreSQL、MySQL 两种数据库，默认配置使用 PostgreSQL

## Docker 镜像

如果你未在本地安装或习惯使用 Docker 镜像，

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
  -p 3306 \
  mysql:8.0.41 \
  --default-authentication-plugin=mysql_native_password \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_general_ci \
  --lower_case_table_names=1
```

## 环境配置

PostgreSQL 与 MySQL 在用户名、端口号等方面有所不同，如果你使用上面的命令创建了 Docker 镜像，需修改 `.env`
部分配置如下，否则，请根据实际配置进行修改

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

## 解耦

如果你只想保留一种数据库，参考如下：

- 删除 `with_variant` 相关代码（如果存在），仅保留数据库对应的类型
- 删除 `backend/core/conf.py` 文件中的 `DATABASE_TYPE` 及其相关的调用代码
- 删除 `.env_example` 和 `.env` 文件中的 `DATABASE_TYPE`
- 更新 `backend/templates/py/model.jinja` 文件中的 `database_type` 相关代码
- 删除 `backend/sql` 目录中不需要的文件夹
- 删除 `docker-compose.yml` 文件中不需要的容器脚本
