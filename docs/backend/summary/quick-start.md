---
title: 快速开始
---

::: caution
fba 仅适用于资深 Python 后端开发人员，如果您是小白用户，我们建议您打好基础再来学习
:::

## 本地开发

:::: steps

1. 准备本地环境

    - Python 3.10+
    - [安装 uv](https://docs.astral.sh/uv/getting-started/installation/)（推荐最新稳定版）
    - PostgreSQL 16.0 + 或 MySQL 8.0+
      [使用**雪花主键 ID**](../reference/pk.md){.read-more}
      [使用 **MySQL**](../reference/db.md){.read-more}
    - <p>Redis（推荐最新稳定版）</p>

2. 准备源码 <Badge type="warning" text="二选一" />

   ::: tabs
   @tab 拉取源代码

   ```shell:no-line-numbers
   git clone https://github.com/fastapi-practices/fastapi_best_architecture.git
   ```

   @tab 创建模板仓库

   此项目支持创建模板仓库，意味着，你可以直接创建一个非 fork 的个人仓库，如图所示，进入此项目
   GitHub 首页，使用 `use this template` 按钮创建

   创建完成之后，使用 `git clone` 命令拉取你自己的仓库即可

   ![use_this_template](/images/use_this_template.png)
   :::
3. 启动 PostgreSQL/MySQL、Redis
4. 初始化

   ::: tabs
   @tab 自动

   在 `根目录` 打开终端，执行以下命令

   ```shell:no-line-numbers
   uv run fba init --auto
   ```

   @tab 手动

    1. 创建数据库：`fba`

        - PostgreSQL 用户直接创建
        - MySQL 用户创建时需选择 utf8mb4 编码

    2. env

       在 `backend` 目录打开终端，执行以下命令创建环境变量文件

       ```shell:no-line-numbers
       cp .env.example .env
       ```

    3. 按需修改配置文件：`backend/core/conf.py` 和 `.env`
    4. 安装依赖

       ::: code-tabs
       @tab <Icon name="material-icon-theme:uv" />uv - sync

       ```shell:no-line-numbers
       uv sync
       ```

       @tab <Icon name="material-icon-theme:uv" />uv - pip

       ```shell:no-line-numbers
       uv pip install -r requirements.txt
       ```
       :::

    5. 创建数据库表和测试数据 <Badge type="warning" text="二选一" />

       ::: tabs
       @tab CLI
       在 `根目录` 打开终端（确保已激活虚拟环境），执行以下命令

       ```shell:no-line-numbers
       fba init
       ```

       @tab Alembic + 手动
        1. 在 `根目录` 打开终端（确保已激活虚拟环境），执行以下命令

           生成迁移文件

           ```shell:no-line-numbers
           alembic revision --autogenerate
           ```

           执行迁移

           ```shell:no-line-numbers
           alembic upgrade head
           ```

        2. 初始化测试数据

           架构：执行 `backend/sql/` 目录下对应主键模式的脚本

           插件：执行 `backend/plugin/sql/` 目录下对应主键模式的脚本

           ```shell:no-line-numbers
           fba --sql xxx.sql
           ```
       :::

5. 启动

   在 `根目录` 打开终端（确保已激活虚拟环境），执行以下命令

   ```shell:no-line-numbers
   fba run
   ```

6. 启动 celery worker, beat 和 flower <Badge type="warning" text="此步骤为可选，可直接跳过" />

   在 `根目录` 打开终端（确保已激活虚拟环境），执行以下命令启动 celery 相关服务

   ::: code-tabs
   @tab Worker

   ```shell:no-line-numbers
   fba celery worker
   ```

   @tab Beat

   ```shell:no-line-numbers
   fba celery beat
   ```

   @tab Flower

   ```shell:no-line-numbers
   fba celery flower
   ```
   :::

   ::: warning
   如果从未执行过以上命令，任务结果表将缺失，此时，无论从何处调用任务结果相关接口都会直接报错，直到至少启动一次 worker 和
   beat 服务，相关接口将自动恢复正常
   :::

7. 打开浏览器访问：[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

::::

## 开发流程

::: note
仅供参考，实际以个人开发习惯为准
:::

::: steps

1. 定义数据库模型（[model](../reference/model.md)）

2. 定义数据验证模型（[schema](../reference/schema.md)）

3. 定义路由（[router](../reference/router.md)）

4. 编写业务（service）

5. 编写数据库操作（[crud](../reference/CRUD.md)）

:::

## 单元测试

::: info
通过 `pytest` 运行单元测试，项目内仅提供了非常简易的 demo，并不是完整单元测试，如需要，请自行编写
:::

::: steps

1. 创建测试数据库 `fba_test`，选择 utf8mb4 编码，PostgreSQL 用户可忽略编码
2. 创建数据库表，利用工具创建 `fba` 库所有表的 DDL 脚本，再通过 `fba_test` 库执行
3. 初始化测试数据，通过 `backend/sql/` 目录下对应主键模式的脚本初始化测试数据
4. 在项目根目录打开终端，执行以下单元测试命令

   ```shell:no-line-numbers
   pytest -vs --disable-warnings
   ```

:::