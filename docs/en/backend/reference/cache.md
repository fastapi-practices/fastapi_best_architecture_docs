---
title: Cache
---

## Programmatic Caching

- Fully manual control over cache reads/writes, invalidation, TTL, and more
- Suitable for complex logic, batch operations, custom serialization, transactions, and other advanced scenarios
- Code is more explicit and easier to debug, but involves more boilerplate and is easier to get wrong

### Dependencies

All operations go through the global Redis client in `backend/database/redis.py`:

```python
# Create redis client singleton
redis_client: RedisCli = RedisCli()
```

## Declarative Caching

- Automatically manage cache lifecycle via decorators
- Minimal code and clear separation of concerns; suitable for standard CRUD

### @cached

Automatically cache function results:

```python
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.admin.crud.crud_user import user_dao
from backend.common.cache.decorator import cached


@cached(name='user:detail', key='user_id')
async def get_user_detail(db: AsyncSession, user_id: int):
    return await user_dao.get(db, user_id)
```

- First call → execute the function → cache the result
- Subsequent calls → return directly from cache (L1 or Redis)
- `key='user_id'` means take `user_id` from the function keyword arguments as the cache key; the final key looks like `user:detail:1`

### @cache_invalidate

Automatically invalidate the specified cache after the method runs:

```python
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.admin.crud.crud_user import user_dao
from backend.common.cache.decorator import cache_invalidate


@cache_invalidate(name='user:detail', key='user_id')
async def update_user(db: AsyncSession, user_id: int, name: str) -> None:
    await user_dao.update(db, user_id, {'nickname': name})
```

- After the update → automatically delete L1 and Redis cache
- Broadcast via Pub/Sub → notify other nodes to clear local L1 cache
- Default `atomic=True`: if cache invalidation fails, an exception is raised to avoid data changing while stale cache remains

### key_builder

If the cache key cannot be taken directly from a single parameter, use a custom function to build it:

```python
from backend.common.cache.decorator import cached, user_key_builder


@cached(name='user:profile', key_builder=user_key_builder)
async def get_current_user_profile():
    ...
```

## Comparison

| Dimension | Programmatic caching | Declarative caching (decorators) |
|-------|---------------------------|--------------------|
| Code volume | High (get/set/delete everywhere) | Very low (one decorator line) |
| Consistency | Must ensure manually (easy to miss invalidation) | Automatic + Pub/Sub broadcast |
| Flexibility | Highest | High (supports key_builder) |
| Development efficiency | Lower | High |
| Maintenance cost | High (logic changes require many edits) | Low (change decorator parameters) |
| Suitable scenarios | Complex strategies, batch, warm-up, special data | Standard CRUD, lists, details, hot data |
| Debugging difficulty | Low (explicit logic) | Medium (need to understand decorator internals) |

## Usage Strategy

Most projects should follow this pattern:

- **Special scenarios** → use programmatic manual operations
- **Read operations** (details, lists, hot data) → use `@cached` declarative caching
- **Delete/update operations** → use `@cache_invalidate` declarative invalidation
- **Enable local cache** → L1 (in-memory) further speeds things up; L2 (Redis) acts as the persistence layer
- **Prefer development efficiency and concise code** → favor declarative caching
- **Need fine-grained control and complex logic** → use programmatic caching
