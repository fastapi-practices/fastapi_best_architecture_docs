---
title: 快速开始
---

::: caution
==FBA 仅适用于资深 Python 后端开发人员==，如果您是非资深用户，请使用 [精简版](../summary/fsm.md)
:::

> [!IMPORTANT]
> 我们建议新手用户从一些基础和简单的内容入手，这不仅是对自身学习的一种负责态度，也是为将来能够顺利掌握这一架构所奠定的坚实基础，欢迎加入我们的
> Discord 社区进行讨论
>
> 最后，请认真对待此文档，并严格按照本文档的顺序启动项目，否则你有很大几率在启动过程中遇到各种问题

## 本地开发

### 后端

::: tip
如果你是 PostgreSQL 用户，请先移步到 [切换数据库](../reference/db.md)
:::

:::: steps

1. 准备本地环境

    * Python 3.10+
    * MySQL 8.0+ 或 PostgreSQL 16.0 +
    * Redis 推荐最新稳定版

2. 准备 Git 仓库

   ::: info
   两种方案，选择其中一种即可
   :::

    1. 拉取源代码仓库

       此方式需要你删除拉取项目后根目录下的 `.git` 文件夹，之后上传到你指定的仓库即可，具体请自行查阅你要上传平台的行为准则

       ```shell
       git clone https://github.com/fastapi-practices/fastapi_best_architecture.git
       ```

    2. 创建模板仓库

       此项目支持创建模板仓库，意味着，你可以直接创建一个非 fork（独立无绑定的关系）的个人仓库，如果所示，进入此项目
       GitHub 首页，
       使用 `use this template` 按钮创建即可，创建完成之后，使用 `git clone` 命令拉取你自己的仓库即可

       ![use_this_template](/images/use_this_template.png)

3. 安装依赖包

   拉取项目到本地后，进入项目 `backend` 目录，执行以下命令

   ```shell
   pip install -r requirements.txt
   ```

4. 创建数据库：`fba`，选择 utf8mb4 编码，postgres 用户可忽略编码
5. 启动 Redis
6. env

   在 `backend` 目录中，创建环境变量文件

   ```shell
   touch .env
   ```

   将初始化环境变量配置拷贝到环境变量文件中

   ```shell
   cp .env.example .env
   ```

7. 按需修改配置文件 `core/conf.py` 和 `.env`
8. 创建数据库表（三选一）

    - 直接启动后端项目（自动创建）
    - 数据库迁移 [alembic](https://alembic.sqlalchemy.org/en/latest/tutorial.html)

      :::: details
      ::: warning
      此方法暂不适用于 PostgreSQL 用户，详情请查看：[#1584](https://github.com/sqlalchemy/alembic/discussions/1584)
      :::

      生成迁移文件

      ```shell
      alembic revision --autogenerate
      ```

      执行迁移

      ```shell
      alembic upgrade head
      ```
      ::::
    - 执行 `backend/sql/` 目录下对应数据库的 `create_tables.sql` 脚本

9. 启动 celery worker, beat 和 flower ==（可选）==

   Celery 应用程序

   ```shell
   celery -A app.task.celery worker -l info
   ```

   定时任务

   ```shell
   celery -A app.task.celery beat -l info
   ```

   web 监控

   ```shell
   celery -A app.task.celery flower --port=8555 --basic-auth=admin:123456
   ```

10. 初始化测试数据

    执行 `backend/sql/init_test_data.sql` 脚本初始化测试数据

11. 启动 fastapi 服务

    ::: warning
    此项目默认使用 CLI 启动服务，为了方便本地调试，你仍然可以选择在 IDE 中右键运行 main.py 文件
    :::

    帮助

    ```shell
    fastapi --help
    ```

    开发模式

    ```shell
    fastapi dev main.py
    ```

12. 打开浏览器访问：[http://127.0.0.1:8000/api/v1/docs](http://127.0.0.1:8000/api/v1/docs)

::::

### 前端

::: caution
目前它仅作为效果演示，而不是用于生产！

如果你不想因前端依赖安装问题带来困扰，请务必使用 yarn v1.x 版本
:::

:::: steps

1. 准备本地环境

    * Nodejs 18.0+
    * yarn 1.x

2. 安装和启动

   安装依赖

   ```shell
   yarn install
   ```

   启动

   ```shell
   yarn dev
   ```

   ::: tip
   第一次启动可能会很慢，你可以查看此 [Issue](https://github.com/fastapi-practices/fastapi_best_architecture_ui/issues/72)
   查看详情
   :::

::::

## 开发流程

::: info
仅供参考，实际以个人为准
:::

::: steps

1. 定义数据库模型（model）

2. 定义数据验证模型（schema）

3. 定义视图（api）和路由（router）

4. 编写业务（service）

5. 编写数据库操作（crud）
   :::

## 单元测试

::: info
通过 `pytest` 运行单元测试，项目内仅提供了非常简易的 demo，并不是完整单元测试，如需要，请自行编写
:::

:::: steps

1. 创建测试数据库 `fba_test`，选择 utf8mb4 编码，postgres 用户可忽略编码
2. 创建数据库表，执行 `backend/sql/` 目录下对应数据库的 `create_tables.sql` 脚本
3. 初始化测试数据，执行 `backend/sql/` 目录下对应数据库的 `init_test_data.sql` 脚本
4. 进入 `backend` 目录，执行单元测试命令

   ```shell
   pytest -vs --disable-warnings
   ```

::::
