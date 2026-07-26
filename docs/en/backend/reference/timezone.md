---
title: Timezone
---

We carefully designed a unified global timezone. Changing the global timezone is now simple: just update the timezone setting in `backend/core/conf.py`.

::: caution
Once the timezone is set, strongly avoid changing it later — otherwise persisted datetime data may become inconsistent!
:::

## Architecture Usage

Wherever you need time in the architecture, use the methods provided in `backend/utils/timezone.py` instead of calling datetime modules directly.

## Database

Handling timezones in the database is painful. There are three common approaches:

- Store and read everything as UTC; convert on the frontend (good for internationalization)
- Store and read everything in the current timezone; convert based on the timezone sent by the frontend (good for localization)
- Store everything as numeric timestamps; convert on the frontend (hard to manage, but easy to operate)

Consider this classic case:

::: chat title="Group chat"
{:2025-08-26 12:44:00}

{Wang}
Quick question — why do I get the same data when querying with different timezones and timestamps?

![question_db_timezone](/images/question_db_timezone.png)

The database is MySQL. In principle these two datetime timestamps should differ, but the query results are the same.

{Wang}
When I write the SQL directly, the two queries behave as expected: the first returns data, the second returns nothing.

![question_sql_timezone](/images/question_sql_timezone.png)

After switching to PostgreSQL, the query results match expectations.

{.}
**timezone**: not used by the MySQL dialect.

SQLAlchemy and all Python MySQL drivers do not handle MySQL timezone information by default — they usually discard it, even with the TIMESTAMP type.

{.}
More details: [sqlalchemy/1985](https://github.com/sqlalchemy/sqlalchemy/issues/1985)
:::

For this reason we use the second solution and created a custom TimeZone type. See `backend/common/model.py` for more details.
