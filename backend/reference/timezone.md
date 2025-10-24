---
url: /fastapi_best_architecture_docs/backend/reference/timezone.md
---
我们为全局精心设计了统一时区，现在，这是一件非常轻松的工作，只需修改 `backend/core/conf.py` 中的时区配置即可改变全局时区

::: caution
时区一旦确定，强烈建议不要后期修改，否则可能造成持久化数据时间信息紊乱！
:::

## 架构应用

无论在架构何处调用时间模块，我们都应使用 `backend/utils/timezone.py` 中提供的现有方法，而不是直接调用 datetime 相关模块

## 数据库

在数据库中处理时区是一件令人头疼的事，常见的方式有以下 3 种：

* 全部存读为 UTC，前端转化（利于国际化管理）
* 全部存读当前时区时间，根据前端传入的时区进行转换（利于本地化管理）
* 全部存储为数值时间戳，前端转化（极其不易管理，但易操作）

让我们来看一个经典案例：

::: chat title="群聊"
{:2025-08-26 12:44:00}

{王}
请教大佬，为啥我查询的时间用的不同的时区和时间戳，返回的数据却是一样的？

![question\_db\_timezone](/images/question_db_timezone.png)

数据库用的是 mysql，原则上这两个 datetime 的时间戳是不一样的，但是查出来的数据是一样的结果；

{王}
我直接写 sql 查询，这个两个是符合预期结果的，第一个有数据，第二个查不到；

![question\_sql\_timezone](/images/question_sql_timezone.png)

这个切换到pg数据库后查询符合预期结果的；

{.}
**timezone**: not used by the MySQL dialect.

sqlalchemy 和所有 python mysql 驱动默认都不处理 mysql 时区信息，通常是直接丢弃，即便使用 TIMESTAMP 类型

{.}
更具体的：[sqlalchemy/1985](https://github.com/sqlalchemy/sqlalchemy/issues/1985)
:::

为此，我们使用了第 2 种解决方案，并创建了自定义 TimeZone 类型，位于 `backend/common/model.py` 文件中，我们可以通过 IDE
点击类名快捷查看使用方式
