---
url: /fastapi_best_architecture_docs/backend/reference/cache.md
---
## 编程式缓存

* 完全手动控制缓存的读写、失效、TTL 等
* 适合复杂逻辑、批量操作、自定义序列化、事务等高级场景
* 代码较为显式，易于调试，但重复代码多，容易出错

### 依赖

所有操作都通过 `backend/database/redis.py` 中的全局 Redis 客户端完成：

```python
# 创建 redis 客户端单例
redis_client: RedisCli = RedisCli()
```

## 声明式缓存

* 通过装饰器自动管理缓存生命周期
* 代码极简，关注点分离，适合标准 CRUD

### @cached

自动缓存函数结果

```python
from backend.common.cache.decorator import cached

@cached(name="user:detail", key="user_id")
async def get_user_detail(user_id: int):
    user = await User.get_or_none(id=user_id)
    return user.dict() if user else None
```

* 第一次调用 → 执行函数 → 缓存结果
* 后续调用 → 直接从缓存（L1 或 Redis）返回

### @cache\_invalidate

方法执行后自动失效指定缓存

```python
from backend.common.cache.decorator import cache_invalidate

@cache_invalidate(name="user:detail", key="user_id")
async def update_user(user_id: int, name: str):
    await User.filter(id=user_id).update(name=name)
    return {"message": "updated"}
```

* 执行更新后 → 自动删除 L1 和 Redis 缓存
* 通过 Pub/Sub 广播 → 通知其他节点清理本地 L1 缓存

## 对比

| 维度    | 编程式缓存                     | 声明式缓存（装饰器）         |
|-------|---------------------------|--------------------|
| 代码量   | 多（每个地方都要写 get/set/delete） | 极少（一行装饰器即可）        |
| 一致性保障 | 需手动保证（容易遗漏失效）             | 自动处理 + Pub/Sub 广播  |
| 灵活性   | 最高                        | 较高（支持 key\_builder） |
| 开发效率  | 较低                        | 高                  |
| 维护成本  | 高（修改逻辑需改多处）               | 低（改装饰器参数即可）        |
| 适用场景  | 复杂缓存策略、批量、预热、特殊数据         | 标准 CRUD、列表、详情、热点数据 |
| 调试难度  | 低（逻辑显式）                   | 中等（需理解装饰器内部流程）     |

## 使用策略

大多数项目推荐以下模式：

* **特殊场景** → 使用编程式手动操作
* **读操作**（详情、列表、热点数据） → 使用 `@cached` 声明式缓存
* **删/改操作** → 使用 `@cache_invalidate` 声明式失效
* **开启本地缓存** → L1（内存）缓存将进一步提速，L2（Redis）作为持久层
* **追求开发效率和代码简洁** → 优先使用声明式缓存
* **需要精细控制、复杂逻辑** → 使用编程式缓存
