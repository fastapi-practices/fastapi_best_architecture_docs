---
title: 切换数据库
---

FBA 支持 MySQL、PostgreSQL 两种数据库，默认配置使用 MySQL

::: tip
此教程仅适用于 pg 用户
:::

如果本地未安装 pg，你可以使用以下命令创建 Docker 镜像

```shell
docker run -d --name fba_postgres --restart always -e POSTGRES_DB='fba' -e POSTGRES_PASSWORD='123456' -e TZ='Asia/Shanghai' -v fba_postgrs:/var/lib/postgresql/data -p 5432:5432 postgres:16
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

## 注意事项

FBA 在模型中使用 `with_variant` 尽可能兼容 MySQL 和 PostgreSQL，例如：

```python
# [!code word:with_variant]
remark: Mapped[str | None] = mapped_column(LONGTEXT().with_variant(TEXT, 'postgresql'))
```

兼容性代码涉及的其他地方：

- 代码生成
- 创建数据库链接
- docker-compose.yml

如果你只使用其中一种数据库，可直接修改为数据库对应类型
