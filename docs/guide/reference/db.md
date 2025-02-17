---
title: 切换数据库
---

::: tip
此教程仅适用于 pg 用户
:::

fba 支持 MySQL、PostgreSQL 两种数据库，默认配置使用 MySQL

如果本地未安装 pg，你可以使用以下命令创建 Docker 镜像

```shell
docker run -d --name fba_postgres --restart always -e POSTGRES_DB='fba' -e POSTGRES_PASSWORD='123456' -e TZ='Asia/Shanghai' -v fba_postgres:/var/lib/postgresql/data -p 5432:5432 postgres:16
```

## 默认配置

pg 与 MySQL 在用户名、端口号等方面有所不同，如果你使用上面的命令创建了 Docker 镜像，需修改 `.env` 部分配置如下，否则，请根据
pg 配置进行修改

```env
# Database
DATABASE_TYPE='postgresql'
DATABASE_HOST='127.0.0.1'
DATABASE_PORT=5432
DATABASE_USER='postgres'
DATABASE_PASSWORD='123456'
```

## 解耦

在实际项目开发中，几乎不会存在同时兼容多种数据库的情况，我们在模型中使用 `with_variant` 尽可能的兼容 MySQL 和
PostgreSQL，例如：

```python:no-line-numbers
# [!code word:with_variant]
remark: Mapped[str | None] = mapped_column(LONGTEXT().with_variant(TEXT, 'postgresql'))
```

- 删除 `with_variant` 相关代码并且仅保留数据库对应的类型
- 删除 `backend/core/conf.py` 文件中的 `DATABASE_TYPE` 及其相关的调用代码
- 删除 `.env_example` 和 `.env` 文件中的 `DATABASE_TYPE`
- 更新 `backend/templates/py/model.jinja` 文件中的 `database_type` 相关代码
- 删除 `backend/sql` 目录中的 `mysql` 或 `postgresql` 文件夹
- 删除 `docker-compose.yml` 文件中的 `fba_mysql` 或 `fba_postgres` 容器脚本
