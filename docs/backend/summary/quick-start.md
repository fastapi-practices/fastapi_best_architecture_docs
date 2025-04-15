---
title: 快速开始
---

::: caution
fba 仅适用于资深 Python 后端开发人员，如果您是非资深用户，我们建议您从 [精简版](../summary/fsm.md) 开始学习
:::

## 本地开发

::: tip
如果您是 PostgreSQL 用户，请先移步到 [切换数据库](../reference/db.md)
:::

:::: steps

1. 准备本地环境

   - Python 3.10+
   - MySQL 8.0+ 或 PostgreSQL 16.0 +
   - Redis 推荐最新稳定版

2. 准备 Git 仓库 <Badge type="warning" text="二选一" />

   ::: tabs
   @tab 拉取源代码

   ```shell:no-line-numbers
   git clone https://github.com/fastapi-practices/fastapi_best_architecture.git
   ```

   @tab 创建模板仓库

   此项目支持创建模板仓库，意味着，你可以直接创建一个非 fork 的个人仓库，如图所示，进入此项目
   GitHub 首页，
   使用 `use this template` 按钮创建即可，创建完成之后，使用 `git clone` 命令拉取你自己的仓库即可

   ![use_this_template](/images/use_this_template.png)
   :::

3. 安装依赖包

   1. 架构依赖

      ::: warning
      此项目使用 uv 作为项目管理器，您需要先 [安装 uv](https://docs.astral.sh/uv/getting-started/installation/)，
      如果您本地已经存在 uv, 建议将其升级至最新版本
      :::

      拉取项目到本地后，在项目根目录打开终端，执行以下命令安装架构依赖

      ::: code-tabs
      @tab <Icon name="material-icon-theme:uv" />uv - sync

      ```shell:no-line-numbers
      uv sync --frozen
      ```

      @tab <Icon name="material-icon-theme:uv" />uv - pip

      ```shell:no-line-numbers
      uv pip install -r requirements.txt
      ```

      :::

   2. 插件依赖

      执行 `backend/scripts/init_plugin.py` 文件安装插件依赖

      ::: details 报错：ModuleNotFoundError: No module named 'backend'

      1. 自行搜索：将源根到添加到 PYTHONPATH
      2. 执行以下命令：

         Linux/Mac:

         ```sh
         # 修改 /path/to/fba 为您本地 fba 项目路径
         export PYTHONPATH=$PYTHONPATH:/path/to/fba
         ```

         Windows:

         ```sh
         # 修改 D:\path\to\fba 为您本地 fba 项目路径
         set PYTHONPATH=%PYTHONPATH%;D:\path\to\fba
         ```

      :::

      ::: caution
      为了实现插件 0 耦合，插件依赖并未使用 uv 进行管理。执行上面脚本文件后，如果后期您仍需同步环境依赖，请务必使用命令：
      `uv sync --frozen --inexact`，否则插件依赖将被 uv 自动清理！
      :::

4. 创建数据库：`fba`，选择 utf8mb4 编码；PostgreSQL 用户可忽略编码
5. 启动 Redis
6. env

   在 `backend` 目录打开终端，执行以下命令创建环境变量文件

   ```shell:no-line-numbers
   touch .env
   ```

   将初始化环境变量配置拷贝到环境变量文件中

   ```shell:no-line-numbers
   cp .env.example .env
   ```

7. 按需修改配置文件 `backend/core/conf.py` 和 `.env`
8. 创建数据库表 <Badge type="warning" text="三选一" />

   ::: tabs
   @tab 自动创建
   直接启动后端项目

   @tab Alembic 迁移
   生成迁移文件

   ```shell:no-line-numbers
   alembic revision --autogenerate
   ```

   执行迁移

   ```shell:no-line-numbers
   alembic upgrade head
   ```

   @tab SQL 脚本
   执行 `backend/sql/` 目录下对应数据库的 `create_tables.sql` 脚本
   :::

9. 启动 celery worker, beat 和 flower <Badge type="warning" text="此步骤为可选，三个都可以不执行" />

   在 `backend` 目录打开终端，执行以下命令启动 celery 相关服务

   ::: code-tabs
   @tab Worker

   ```shell:no-line-numbers
   celery -A app.task.celery worker -l info
   ```

   @tab Beat

   ```shell:no-line-numbers
   celery -A app.task.celery beat -l info
   ```

   @tab Flower

   ```shell:no-line-numbers
   celery -A app.task.celery flower --port=8555 --basic-auth=admin:123456
   ```

   :::

10. 初始化测试数据

    执行 `backend/sql/init_test_data.sql` 脚本初始化测试数据

11. 启动 fastapi 服务

    ::: warning
    如果你在项目中安装了 [应用级插件](../../plugin/market.md)，请务必使用 `run.py`
    文件启动项目，否则，您将收到启动错误

    详情：[fastapi/fastapi#13372 (comment)](https://github.com/fastapi/fastapi/discussions/13372#discussioncomment-12211232)
    :::

    帮助

    ```shell:no-line-numbers
    fastapi --help
    ```

    开发模式

    ```shell:no-line-numbers
    fastapi dev main.py
    ```

12. 打开浏览器访问：[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

::::

## 开发流程

::: tip
仅供参考，实际以个人习惯为准
:::

::: steps

1. 定义数据库模型（model）

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

1. 创建测试数据库 `fba_test`，选择 utf8mb4 编码，postgres 用户可忽略编码
2. 创建数据库表，执行 `backend/sql/` 目录下对应数据库的 `create_tables.sql` 脚本
3. 初始化测试数据，执行 `backend/sql/` 目录下对应数据库的 `init_test_data.sql` 脚本
4. 在项目根目录打开终端，执行以下单元测试命令

   ```shell:no-line-numbers
   pytest -vs --disable-warnings
   ```

:::

## 常见问题

请点击跳转查看：[常见问题](../../questions.md)
