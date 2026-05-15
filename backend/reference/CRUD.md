---
url: /fastapi_best_architecture_docs/backend/reference/CRUD.md
---
我们在 fba 中使用 sqlalchemy-crud-plus 作为数据库操作基类，
它是一款由我们自主构建的基于 SQLAlchemy 2.0 的高级异步 CRUD SDK，它可适用于任何 FastAPI + SQLAlchemy 项目

## 函数命名

fba 遵循以下命名规范：

* 获取/查询详情： `get()`
* 通过 xxx 获取/查询详情：`get_by_xxx()`
* 获取/查询列表表达式：`get_select()`
* 获取/查询列表：`get_list()`
* 获取/查询所有：`get_all()`
* 连接查询（join）：`get_with_join()`
* 关系查询（relationship）：`get_with_relation()`
* 子查询：`get_children()`
* 创建：`create()`
* 更新：`update()`
* 删除：`delete()`
