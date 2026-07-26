---
title: Quick Start
---

::: caution
fba is aimed at developers with some Python backend experience. If you are just starting with FastAPI, first get comfortable with Python async, FastAPI, SQLAlchemy, and Pydantic basics.
:::

## Local Development

:::: steps

1. Prepare the local environment

    - Python 3.10+
    - [Install uv](https://docs.astral.sh/uv/getting-started/installation/) (current stable version recommended)
    - PostgreSQL 16.0+ or MySQL 8.0+
      [Use **Snowflake primary keys**](../reference/pk.md){.read-more}
      [Use **MySQL**](../reference/db.md){.read-more}
    - <p>Redis (latest stable recommended)</p>

2. Prepare the source code <Badge type="warning" text="Choose one" />

   ::: tabs
   @tab Clone the repository

   ```shell:no-line-numbers
   git clone https://github.com/fastapi-practices/fastapi-best-architecture.git
   ```

   @tab Create from template

   This project supports GitHub template repositories. You can create a non-fork personal repository. On the project
   GitHub home page, use the `use this template` button as shown.

   After creation, `git clone` your own repository.

   ![use_this_template](/images/use_this_template.png)
   :::
3. Start PostgreSQL/MySQL and Redis
4. Initialize

   ::: tabs
   @tab Automatic

   Open a terminal in the `project root` and run:

   ```shell:no-line-numbers
   uv run fba init --auto
   ```

   @tab Manual

    1. Create the database: `fba`

        - PostgreSQL users can create it directly
        - MySQL users should choose utf8mb4 encoding

    2. env

       Open a terminal in the `backend` directory and create the env file:

       ```shell:no-line-numbers
       cp .env.example .env
       ```

    3. Adjust config as needed: `backend/core/conf.py` and `.env`
    4. Install dependencies

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

    5. Create tables and test data <Badge type="warning" text="Choose one" />

       ::: tabs
       @tab CLI
       Open a terminal in the `project root` (with the virtualenv activated) and run:

       ```shell:no-line-numbers
       fba init
       ```

       @tab Alembic + Manual
        1. Open a terminal in the `project root` (with the virtualenv activated) and run:

           Generate a migration file

           ```shell:no-line-numbers
           fba alembic revision
           ```

           Apply migrations

           ```shell:no-line-numbers
           fba alembic upgrade
           ```

        2. Initialize test data

           Architecture: run the primary-key mode scripts under `backend/sql/{mysql|postgresql}/`

           Plugins: run the primary-key mode scripts under `backend/plugin/{plugin}/sql/{mysql|postgresql}/`

           ```shell:no-line-numbers
           fba --sql path/to/script
           ```
       :::

5. Start

   Open a terminal in the `project root` (with the virtualenv activated) and run:

   ```shell:no-line-numbers
   fba run
   ```

6. Start Celery worker, beat, and flower <Badge type="warning" text="Optional — you can skip this" />

   Open a terminal in the `project root` (with the virtualenv activated) and start Celery services:

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
   If these commands have never been run, task-result tables will be missing. Any API that depends on task results will fail until worker and beat have been started at least once, after which those APIs recover automatically.
   :::

7. Open the browser: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

::::

## Development Workflow

::: tip
When using AI-assisted development, install [fba skills](https://skills.sh/fastapi-practices/skills/fba) first, then generate or review code in the order of model, schema, router, service, and crud.
:::

::: note
For reference only — follow your own development habits in practice.
:::

::: steps

1. Define database models ([model](../reference/model.md))

2. Define validation models ([schema](../reference/schema.md))

3. Define routes ([router](../reference/router.md))

4. Write business logic (service)

5. Write database operations ([crud](../reference/CRUD.md))

:::

## Unit Tests

::: info
Unit tests are run with `pytest`. The project only provides basic test examples, not a full business suite. Add cases as needed for your domain.
:::

::: steps

1. Create the test database `fba_test` with utf8mb4 encoding (PostgreSQL users can ignore encoding)
2. Create tables: export DDL for all tables from the `fba` database, then apply it to `fba_test`
3. Initialize test data using scripts under `backend/sql/{mysql|postgresql}/` for the matching primary-key mode
4. Open a terminal in the project root and run:

   ```shell:no-line-numbers
   pytest -vs --disable-warnings
   ```

:::
