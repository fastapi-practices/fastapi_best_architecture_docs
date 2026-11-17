---
url: /fastapi_best_architecture_docs/backend/reference/cache.md
---
fba 使用 [fastapi-redis-sdk](https://pypi.org/project/fastapi-redis-sdk/)（导入名为 `redis_fastapi`）提供缓存能力，并复用项目自己的 Redis 连接池

## 注册

SDK 在 `backend/core/registrar.py` 中注册，连接池与生命周期沿用 fba 的 `redis_client`

```python
# 缓存、限流 SDK 复用现有连接池和生命周期
app.dependency_overrides[get_async_redis] = get_fba_redis
app.dependency_overrides[get_rate_limit_backend] = get_fba_rate_limit_backend
FastAPIRedis(app).caching().rate_limiting()
```

## 读接口缓存

在路由依赖中添加 `cache()`，命中缓存时接口不再执行，直接返回 Redis 中的响应

以字典插件为例（`backend/plugin/dict/api/v1/sys/dict_type.py`）：

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

参数说明：

| 参数 | 说明 |
|-----|-----|
| `ttl` | 缓存过期时间（秒），fba 统一取 `HTTP_CACHE_TTL` 配置项 |
| `eviction_group` | 失效分组，写接口通过同名分组批量失效；同组键在 Redis Cluster 中落在同一 slot |
| `key_builder` | 缓存键构建函数，fba 使用 `http_cache_key`（见下文） |
| `no_store` | 响应头输出 `Cache-Control: no-store`，禁止应用之外的缓存保存响应，Redis 中的缓存仍然保留 |

## 写接口失效

写操作成功后，通过 `cache_evict()` 清理对应分组

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

* `scope='function'`：依赖在函数作用域内生效，接口执行成功后才会触发失效
* 接口抛错时不会执行失效
* 未传 `key_builder` 时清空整个分组；若分组名也为空，则会删除全部缓存键，请谨慎使用

::: tip
参数配置插件（`backend/plugin/config`）使用的是同一套写法，只是分组名为 `config`
:::

## 自定义缓存键

fba 在 `backend/common/cache.py` 中提供了 `http_cache_key()`，用于隔离 JWT 用户、站点、语言及查询参数

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

函数签名与 SDK 默认的 `default_key_builder(request, eviction_group, prefix)` 一致，可以直接传给 `key_builder`

::: warning
缓存响应里若包含用户维度的数据，必须使用 `http_cache_key`，否则不同用户会命中同一份缓存
:::

## 编程式缓存

底层操作统一通过 `backend/database/redis.py` 中的全局 Redis 客户端完成

```python
# 创建 redis 客户端单例
redis_client: RedisCli = RedisCli()
```

`RedisCli` 继承自 `redis.asyncio.Redis`，除原生能力外，fba 额外封装了批量操作方法

| 方法 | 说明 |
|-----|-----|
| `init()` | 初始化 Redis 服务器 |
| `delete_by_prefix()` | 按前缀批量删除键 |
| `get_by_prefix()` | 按前缀扫描键 |
| `mget_batched()` | 分批 `mget` |
| `exists_batched()` | 分批判断键是否存在 |
| `smembers_many()` | 分批获取多个集合成员 |
| `delete_batched()` | 分批删除键 |

## 业务缓存

以用户信息缓存为例，`backend/app/admin/utils/cache.py` 中的 `UserCacheManager` 是 fba 内置的业务缓存实现

```python
from backend.app.admin.utils.cache import user_cache_manager

# 读取缓存
user = await user_cache_manager.get(user_id)

# 写入缓存
await user_cache_manager.set(user_id, user)

# 清理缓存
await user_cache_manager.clear([user_id])
```

缓存键统一使用配置项前缀拼接，避免与其他业务数据冲突

```python
f'{settings.JWT_USER_REDIS_PREFIX}:{user_id}'
```

写入时使用 `TOKEN_EXPIRE_SECONDS` 作为过期时间；此外还提供按角色、菜单、数据范围、数据规则批量清理缓存的方法，用于权限变更后即时失效相关用户的缓存

## 相关配置

* [`HTTP_CACHE_TTL`](./conf.md#http_cache_ttl)：HTTP 缓存过期时长（秒）
