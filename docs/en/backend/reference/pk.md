---
title: Primary Key
---

fba provides two options for database primary keys: traditional mode (auto-increment ID) and the Snowflake algorithm (Snowflake ID). ==We use auto-increment ID as the default primary-key declaration globally=={.note}

Before switching the primary-key declaration mode, briefly understand their characteristics and decide whether a switch is needed.

## Auto-increment ID

### Pros

- Simple and easy to use
- Native database support
- Sequentially increasing generation
- High query efficiency
- Small storage footprint

### Cons

- ID conflicts may occur in distributed systems; poor scalability
- ID generation depends on the database, with higher risk of performance bottlenecks
- IDs are predictable, which may expose business volume or create security risks

## Snowflake ID

### Pros

- Friendly to distributed environments
- Globally unique IDs without depending on a central database
- Includes a timestamp, so generated IDs are naturally ordered and easy to sort and query

### Cons

- More complex to implement; requires maintaining a generator
- Clock skew (e.g. server clock sync issues) may prevent new data from being created
- Longer IDs mean slightly higher storage and transmission cost

## Suitable Scenarios

### Auto-increment ID

Single-machine or small-to-medium applications with simple business logic and no sensitivity to ID predictability

### Snowflake ID

Distributed systems, microservice architectures, or cases that need high concurrency and cross-region unique ID generation

## Switching Options

::: warning
Before switching, confirm the following:

- The project has never been started
- Alembic migrations have never been run
- The `DATABASE_SCHEMA` setting in `backend/core/conf.py` matches expectations

If any of the above have already been done, you must drop all database tables before switching.
:::

::: caution
Do not switch casually! Auto-increment IDs create a physical binding to the database. Switching arbitrarily will cause fatal issues!!!
:::

### Auto-increment ID

No switch needed — this is the global default declaration mode in fba.

### Snowflake ID

1. Carefully review the warnings in this section and ensure a clean database environment
2. Update `DATABASE_PK_MODE` in `backend/core/conf.py` to `snowflake`
3. Configure Snowflake node IDs as needed
4. Read [Notes](#notes)

The Snowflake algorithm supports two node allocation modes:

- Fixed allocation: configure both `SNOWFLAKE_DATACENTER_ID` and `SNOWFLAKE_WORKER_ID`
- Automatic allocation: leave both as `None`; on startup the service claims available nodes via Redis and renews them with heartbeats

`SNOWFLAKE_DATACENTER_ID` and `SNOWFLAKE_WORKER_ID` must both be set or both be empty, and each must be in the range `0` to `31`.

::: caution Windows Platform Warning
If you use MySQL 8.0+ on Windows and encounter `asyncmy` write errors, try changing `mysql+asyncmy` to `mysql+aiomysql` in `backend/database/db.py`. Related issue: [asyncmy/issues/35](https://github.com/long2ice/asyncmy/issues/35)
:::

## Notes

- When using Snowflake IDs, ensure clock synchronization (e.g. via NTP) and unique node ID allocation
- Traditional auto-increment IDs need special care for conflicts during data migration or merging
- ==Frontend long-integer rendering offset=={.danger}

  When the backend API returns long integers, the response itself is correct, but frontend rendering may produce incorrect values.

  In the browser console you may find that the rendered id differs from the returned data. The best fix is for the backend to serialize long integers as strings before returning them. Two approaches for reference:

  ::: tabs
  @tab schemaBase

  ```python
  @field_serializer('id', check_fields=False)
  def serialize_id(self, value: int) -> str | int:
      if self.model_config.get('from_attributes'):
          return str(value)
      return value
  ```

  @tab GetXxxDetail / GetXxxTree

  ```python
  @field_serializer('id')
  def serialize_id(self, value) -> str:
      return str(value)
  ```
