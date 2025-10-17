---
title: 主键
---

我们在 fba 中为数据库主键添加了两种选择，分别为传统模式（自增 ID）和雪花算法（雪花 ID），==我们在全局范围内使用 `自增 ID`
作为主键的默认声明方式=={.note}

在切换主键声明方式之前，让我们先来简单了解一下它们的特性，再决定是否需要切换

## 自增 ID

### 优点

- 简单易用
- 数据库原生支持
- 生成顺序递增
- 查询效率高
- 占用空间小

### 局限性

- 在分布式系统中可能出现 ID 冲突，扩展性较差
- ID 生成依赖数据库，性能瓶颈风险较高
- ID 可预测，可能暴露业务数据量或存在安全隐患

## 雪花 ID

### 优点

- 分布式环境友好
- ID 全局唯一且无需依赖中央数据库
- 包含时间戳，生成 ID 天然有序，便于排序和查询

### 局限性

- 实现复杂，需额外维护生成器
- 可能因时间回拨（如服务器时钟同步问题）导致无法新增数据
- ID 长度较长，存储和传输成本略高

## 适用场景

### 自增 ID

单机或中小规模应用，业务简单且对 ID 可预测性无敏感

### 雪花 ID

分布式系统、微服务架构，或需要高并发、跨地域生成唯一 ID

## 切换选择

### 自增 ID

无需切换，这是 fba 内的全局默认声明方式

### 雪花 ID

1. 更新 fba 内所有 sqlalchemy model 中的 `id: Mapped[id_key]` 为 `id: Mapped[snowflake_id_key]`
2. 更新所有 `id_key` 导入为 `snowflake_id_key`
3. 执行 `backend/sql/init_snowflake_test_data.sql` 脚本初始化测试数据

::: caution Windows 平台警告
如果您正在 Windows 平台中使用 mysql >= 8.0，还需要更新 `backend/database/db.py` 文件内的 `mysql+asyncmy` 为
`mysql+aiomysql`，否则，您将无法在本地正常新增数据。相关
issue：[asyncmy/issues/35](https://github.com/long2ice/asyncmy/issues/35)
:::

## 注意事项

- 使用雪花 ID 时，需确保时钟同步（如通过 NTP）和节点 ID 的唯一性分配
- 传统自增 ID 在数据迁移或合并时需特别注意冲突问题
- ==前端渲染长整数偏移=={.danger}

  当后端 api 返回长整数时，返回结果是没有问题的，但是通过前端渲染数据后，可能导致长整数渲染错误。

  通过浏览器控制台可以发现，前端渲染后的数据 id 与返回数据不一致，最佳解决方法是：后端将长整数序列化为字符串之后再返回

  ::: tabs
  @tab schemaBase

  ```python
  @field_serializer('id', check_fields=False)
  def serialize_id(self, value) -> str:
      return str(value)
  ```

  @tab GetXxxDetail / GetXxxTree

  ```python
  @field_serializer('id')
  def serialize_id(self, value) -> str:
      return str(value)
  ```






