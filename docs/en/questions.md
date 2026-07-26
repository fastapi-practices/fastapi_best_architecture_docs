---
title: FAQ
---

## Why Did Project Stars Surge in Dec 2025

Star farming? Absolutely not. No matter the project, we firmly reject such dishonest behavior.

The reason? A blogger on X shared this project. Original post: [@tom_doerr](https://x.com/tom_doerr/status/1995998190768648296?s=20)

::: details
![x_visitors.png](/images/x_visitors.png)
:::

## Response Data Does Not Match the Database

### Not a First Deployment, or Repeated Deployments

If you have previously called fba APIs, related data may have been written to Redis quietly. After redeploying fba, the deployment process does not automatically clear Redis cache data.

Therefore, if API responses look wrong after redeployment while the database looks fine, stale cache is a likely cause. Manually clear the fba cache in Redis and the system should recover automatically.

### Manually Modified Database Data

Suppose you change data directly in the database, but API responses do not change. The response may come from Redis cache, and direct database edits do not trigger automatic cache updates.

As a result, responses appear unchanged. The fix is to manually clear the related Redis cache; then data will correctly reflect your changes.

## Can't call await_only() here

```json
{
  "code": 500,
  "msg": "(sqlalchemy.exc.MissingGreenlet) greenlet_spawn has not been called; can't call await_only() here. Was IO attempted in an unexpected place?\n[SQL: SELECT sys_dict_data.id AS sys_dict_data_id, sys_dict_data.label AS sys_dict_data_label, sys_dict_data.value AS sys_dict_data_value, sys_dict_data.sort AS sys_dict_data_sort, sys_dict_data.status AS sys_dict_data_status, sys_dict_data.remark AS sys_dict_data_remark, sys_dict_data.type_id AS sys_dict_data_type_id, sys_dict_data.created_time AS sys_dict_data_created_time, sys_dict_data.updated_time AS sys_dict_data_updated_time \nFROM sys_dict_data \nWHERE %s = sys_dict_data.type_id]\n[parameters: [{'%(2071788311008 param)s': 1}]]\n(Background on this error at: https://sqlalche.me/e/20/xd2s)",
  "data": null,
  "trace_id": "89afd9b0f2b8442590661701e2b6b495"
}
```

![await_only](/images/sqlalchemy_await_only.png)

In SQLAlchemy 2.0 async mode, relationship tables use [lazy loading](https://docs.sqlalchemy.org/en/20/glossary.html#term-lazy-loading) by default. If you do not add a loading strategy for related fields in the ORM statement, those fields may resolve to an error (as shown above). When pydantic / fastapi then serializes the object, field errors are raised because the fields themselves are errors.

There are several solutions — see the official SQLAlchemy docs. fba defaults to `noload()` for this, for example:

```python
return await self.select_order(  # [!code word:noload]
   'id',
   'desc',
   load_options=[
       selectinload(self.model.dept).options(noload(Dept.parent), noload(Dept.children), noload(Dept.users)),
       selectinload(self.model.roles).options(noload(Role.users), noload(Role.menus), noload(Role.scopes)),
   ],
   **filters,
)
```

## PostgreSQL Auto-Increment Primary Key Failure

After inserting data via SQL scripts, PostgreSQL sequences may not sync to the table's max value. Subsequent writes from code may then hit `DETAIL: Key (id)=(x) already exists`.

Search for how to reset a PostgreSQL primary key sequence for the solution.

## Database Timezone Pitfalls

MySQL does not support a timezone-aware storage type, while PostgreSQL has excellent timezone types. Storing time columns is therefore tricky. We have implemented a solid solution that works with both MySQL and PostgreSQL — [see details](./backend/reference/timezone.md#database).
