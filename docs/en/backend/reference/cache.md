---
title: Cache
---

fba uses [fastapi-redis-sdk](https://pypi.org/project/fastapi-redis-sdk/) (imported as `redis_fastapi`) for caching, and reuses the project's own Redis connection pool

## Registration

The SDK is registered in `backend/core/registrar.py`, sharing the connection pool and lifecycle of fba's `redis_client`

```python
# 缓存、限流 SDK 复用现有连接池和生命周期
app.dependency_overrides[get_async_redis] = get_fba_redis
app.dependency_overrides[get_rate_limit_backend] = get_fba_rate_limit_backend
FastAPIRedis(app).caching().rate_limiting()
```

## Caching Read Endpoints

Add `cache()` to the route dependencies. On a cache hit the endpoint is not executed and the stored response is returned from Redis

The dictionary plugin shows the standard usage (`backend/plugin/dict/api/v1/sys/dict_type.py`):

```python
from fastapi import Depends
from redis_fastapi import cache

from backend.common.cache import http_cache_key
from backend.core.conf import settings


@router.get(
    '/all',
    summary='获取所有字典数据',
    dependencies=[
        DependsJwtAuth,
        Depends(
            cache(
                ttl=settings.HTTP_CACHE_TTL,
                eviction_group='dict',
                key_builder=http_cache_key,
                no_store=True,
            )
        ),
    ],
)
async def get_all_dict_types(db: CurrentSession) -> ResponseSchemaModel[list[GetDictTypeDetail]]:
    data = await dict_type_service.get_all(db=db)
    return response_base.success(data=data)
```

Parameter notes:

| Parameter | Description |
|-----|-----|
| `ttl` | Cache lifetime in seconds; fba always uses the `HTTP_CACHE_TTL` setting |
| `eviction_group` | Eviction group; write endpoints evict the same group. Keys in one group share a Redis Cluster slot |
| `key_builder` | Cache key builder; fba uses `http_cache_key` (see below) |
| `no_store` | Emits `Cache-Control: no-store` so no cache outside the application keeps the response; the Redis entry is still kept |

## Invalidating on Writes

Write endpoints clear the matching group with `cache_evict()`

```python
from fastapi import Depends
from redis_fastapi import cache_evict


@router.put(
    '/{pk}',
    summary='更新字典类型',
    dependencies=[
        Depends(RequestPermission('dict:type:edit')),
        DependsRBAC,
        Depends(cache_evict(eviction_group='dict'), scope='function'),
    ],
)
async def update_dict_type(
    db: CurrentSessionTransaction,
    pk: Annotated[int, Path(description='字典类型 ID')],
    obj: UpdateDictTypeParam,
) -> ResponseModel:
    count = await dict_type_service.update(db=db, pk=pk, obj=obj)
    if count > 0:
        return response_base.success()
    return response_base.fail()
```

- `scope='function'` makes the dependency function-scoped, so eviction runs only after the endpoint succeeds
- Nothing is evicted when the endpoint raises
- Without a `key_builder` the whole group is cleared; with an empty group name every cache key is deleted, so use it with care

::: tip
The config plugin (`backend/plugin/config`) uses exactly the same pattern with the group name `config`
:::

## Custom Cache Keys

fba provides `http_cache_key()` in `backend/common/cache.py`, which isolates JWT user, site, language, and query parameters

```python
def http_cache_key(request: Request, eviction_group: str = '', prefix: str = '') -> str:
    """
    为 SDK HTTP 缓存隔离 JWT 用户、站点、语言及查询参数
    """
    user_id = getattr(request.scope.get('user'), 'id', None)
    dimensions = [
        str(user_id) if user_id is not None else 'anonymous',
        request.url.scheme,
        request.url.netloc,
        request.url.path,
        request.headers.get('accept-language', settings.I18N_DEFAULT_LANGUAGE),
        request.headers.get('accept', ''),
        sorted(request.query_params.multi_items(), key=operator.itemgetter(0)),
    ]
    digest = hashlib.sha256(json.dumps(dimensions, ensure_ascii=True).encode()).hexdigest()
    return f'{prefix}:{{{eviction_group}}}:{digest}'
```

Its signature matches the SDK's `default_key_builder(request, eviction_group, prefix)`, so it can be passed to `key_builder` directly

::: warning
Any cached response containing user-specific data must use `http_cache_key`, otherwise different users share the same cache entry
:::

## Programmatic Caching

Low-level operations go through the global Redis client in `backend/database/redis.py`

```python
# Create redis client singleton
redis_client: RedisCli = RedisCli()
```

`RedisCli` extends `redis.asyncio.Redis` and adds a few batch helpers on top of the native API

| Method | Description |
|-----|-----|
| `init()` | Initialize the Redis server |
| `delete_by_prefix()` | Delete keys by prefix |
| `get_by_prefix()` | Scan keys by prefix |
| `mget_batched()` | Batched `mget` |
| `exists_batched()` | Batched existence checks |
| `smembers_many()` | Fetch members of multiple sets in batches |
| `delete_batched()` | Delete keys in batches |

## Business Caching

`UserCacheManager` in `backend/app/admin/utils/cache.py` is the business cache shipped with fba, using user information as the example

```python
from backend.app.admin.utils.cache import user_cache_manager

# Read from the cache
user = await user_cache_manager.get(user_id)

# Write to the cache
await user_cache_manager.set(user_id, user)

# Clear the cache
await user_cache_manager.clear([user_id])
```

Cache keys are built from a configuration prefix so they never collide with other business data

```python
f'{settings.JWT_USER_REDIS_PREFIX}:{user_id}'
```

Writes use `TOKEN_EXPIRE_SECONDS` as the TTL. The manager also provides bulk eviction by role, menu, data scope, and data rule, so permission changes invalidate the affected user caches immediately

## Related Configuration

- [`HTTP_CACHE_TTL`](./conf.md#http_cache_ttl): HTTP cache TTL in seconds

::: tip
The SDK also ships `cache_put()` (write-through caching). fba does not use it today, but you can import it when you need "write to cache, then return"
:::
