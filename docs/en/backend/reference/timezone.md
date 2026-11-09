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

::: warning
Starting from fba 2.0.0, MySQL support has been removed and the custom `TimeZone` type is gone with it. Datetime columns now use PostgreSQL's native `TIMESTAMP WITH TIME ZONE` (that is, `sa.DateTime(timezone=True)`)
:::

fba uses the second solution: every datetime column uses PostgreSQL's native `TIMESTAMP WITH TIME ZONE` type (that is, SQLAlchemy's `sa.DateTime(timezone=True)`). Values are converted to the current timezone by `backend/utils/timezone.py` before being written, and the database returns timezone-aware timestamps on read.

::: tip
`TIMESTAMP WITH TIME ZONE` stores the instant itself and is not affected by the session timezone, so queries and displays stay consistent across timezones
:::
