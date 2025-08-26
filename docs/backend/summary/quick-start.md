---
title: 快速开始
---

::: caution
fba 仅适用于资深 Python 后端开发人员，如果您是非资深用户，我们建议您从 [精简版](../summary/fsm.md) 开始学习
:::

## 本地开发

:::: steps

1. 准备本地环境

    - Python 3.10+
    - MySQL 8.0+ 或 PostgreSQL 16.0 +
      [雪花主键 ID 用户，请先移步到 **切换主键**](../reference/pk.md){.read-more}
      [PostgreSQL 用户，请先移步到 **切换数据库**](../reference/db.md){.read-more}
      ::: warning 特此通知
      PostgreSQL 严格遵循 SQL 标准，很多类型实现和设计上比 MySQL 更加健壮，随着 pg 的高速发展和社区壮大，其流行度已遥遥领先！我们即将应用
      pg 为架构默认配置 🚀

      MySQL 用户无需担心，我们仍将全面适配与兼容 👏
      :::
    - <p>Redis 推荐最新稳定版</p>

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

3. 安装依赖

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

4. 创建数据库：`fba`，选择 utf8mb4 编码（PostgreSQL 用户可忽略编码）
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
8. 创建数据库表 <Badge type="warning" text="二选一" />

   ::: tabs
   @tab 自动创建
   跳过此步骤，启动 fba 后将自动创建

   @tab Alembic 迁移
   在 `backend` 目录 打开终端

   生成迁移文件

   ```shell:no-line-numbers
   alembic revision --autogenerate
   ```

   执行迁移

   ```shell:no-line-numbers
   alembic upgrade head
   ```
   :::

9. 启动 celery worker, beat 和 flower <Badge type="warning" text="此步骤为可选，可直接跳过" />

   在 `根目录` 或 `backend 目录` 打开终端，执行以下命令启动 celery 相关服务

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

10. 启动

    在 `根目录` 或 `backend 目录` 打开终端，执行以下命令启动 FastAPI 服务

    ```shell:no-line-numbers
    fba run
    ```

11. 初始化测试数据

    架构：执行 `backend/sql/` 目录下对应主键模式的脚本

    插件：执行 `插件/sql/` 目录下对应主键模式的脚本

    ::: info
    你可以选择通过 [CLI](../reference/cli.md) 快速执行这些脚本
    :::

12. 打开浏览器访问：[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

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

1. 创建测试数据库 `fba_test`，选择 utf8mb4 编码，postgresql 用户可忽略编码
2. 创建数据库表，利用工具创建 `fba` 库所有表的 DDL 脚本，再通过 `fba_test` 库执行
3. 初始化测试数据，通过 `backend/sql/` 目录下对应主键模式的脚本初始化测试数据
4. 在项目根目录打开终端，执行以下单元测试命令

   ```shell:no-line-numbers
   pytest -vs --disable-warnings
   ```

:::