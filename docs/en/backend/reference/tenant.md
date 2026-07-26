---
title: Multi-Tenancy
---

::: caution
This capability is still experimental. Related adaptations come from [PR #1101](https://github.com/fastapi-practices/fastapi-best-architecture/pull/1101).
:::

For full tenant capabilities, see the [tenant plugin](../../marketplace.md). Plugin features and integration steps follow the plugin README. Typical tenant plugins usually provide:

- Tenant management
- Package/plan management
- Row-level data isolation

## Common Isolation Models

Referring to [django-tenants](https://github.com/django-tenants/django-tenants?tab=readme-ov-file#why-schemas) and its summary of multi-tenancy, common approaches usually fall into three categories:

### Isolated Approach

Each tenant uses a separate database. Isolation is strongest, but operations, migrations, resource management, and cost control become more complex.

### Semi-Isolated Approach

All tenants share one database instance, but each tenant has its own schema. This is often treated as a compromise:

- Easier unified operations than fully separate databases
- Clearer isolation boundaries than a shared schema
- Can reuse the same database connections, cache, and memory resources

### Shared Approach

All tenants share the same table structure. A field such as `tenant_id` is usually added to business tables, and isolation is enforced through query conditions, constraints, context, and middleware.

## Schema Approach

`django-tenants` chose the semi-isolated approach, considering it a good balance between simplicity and performance:

- Only one database instance needs to be maintained
- Usually less invasive to existing business code
- Physical boundaries between tenants are clearer than `tenant_id` filtering
- In PostgreSQL, `search_path` can switch to the target schema per request

That does not mean this approach is always better. It has prerequisites and boundaries: stronger dependence on database capabilities, better fit for PostgreSQL, and more limited cross-database compatibility.

## Recommendation

When extending multi-tenancy in fba, we recommend starting with the **shared approach**, mainly because:

- Easier compatibility with both PostgreSQL and MySQL
- Easier reuse of existing models, plugins, and initialization SQL systems
- Smoother migration path from existing single-tenant code

Correspondingly, this approach requires developers to handle `tenant_id` injection, query filtering, unique constraints, and plugin compatibility themselves — otherwise cross-tenant access risks are more likely.

## Integration Steps

:::: steps

1. Install or develop a tenant plugin

2. Add environment variables, base `plugin.toml` configuration, and type declarations in `backend/core/conf.py` according to the plugin README

3. Adjust models, unique constraints, initialization SQL, and data permission rules according to the isolation approach

4. Re-initialize the database, or generate and apply Alembic migrations

   If an existing project needs a `tenant_id` field added, historical data and default tenant ownership must be handled via migration scripts.

   ::: warning
   Multi-tenant changes affect database structure and permission boundaries. Do not go live after only changing configuration.
   :::

::::

## Default Tenant Design

If you use the shared approach, you usually need a default tenant ID for:

- Default tenant fallback
- Initializing context for unauthenticated endpoints
- Default tenant ID in log records
- Default value when the login API does not explicitly pass a tenant ID

## Notes

- The main repository currently does not provide tenant admin UI, package management, tenant status checks, or similar business capabilities
- Tenant isolation should primarily live in query filtering, unique constraints, initialization SQL, and admin permissions
- If you also use plugins such as OAuth2 or notices, confirm that the corresponding plugin versions are multi-tenant compatible
