---
title: cursor
---

官网地址：[cursor](https://www.cursor.com/)

## 规则

我们在 cursor 中为 fba 量身打造了特定规则，它们可有效地帮助您生成高质量且符合规范的代码，如果您有更好的案例，请通过
Discord 社区与我们分享吧 🤗

::: warning
我们未对规则进行 token 消耗量测试，请根据实际情况自行选择
:::

首先，在 fba 根目录创建 `.cursor\rules` 目录，然后添加以下规则：

### Python 编码规范

::: note
此规则也可用于其他 Python 3.10+ 项目
:::

文件名：`python-code-standards.mdc`

```mdc
# Python 3.10+

您是 Python 3.10+ 方面的专家，请遵循以下原则

## 类型注解规范

- 使用 Python 3.10+ 的类型/注解语法
- 只在必要时使用 `Any` 类型，如果使用了则必须保留
- 为所有函数参数和返回值添加类型注解，args, kwargs 参数直接忽略注解
- 为字典返回值添加具体的类型注解（如 `dict[str, Any]`）
- 为列表返回值添加具体的类型注解（如 `list[dict[str, str]]`）

## 文档注释规范

- 不要在文件开头添加注释
- 函数文档格式如下
    - 当函数存在参数时
        `:return:` 后面不写内容
        """
        函数描述

        :param xxx: 参数说明
        :return:
        """
    - 当函数没有参数时
        """函数描述"""
- 函数描述要简洁明了，不需要进行举例说明
- 保持中英文之间的空格
- 参数说明要具体和清晰
- 如果函数没有入参且描述只有简短文字，那么引号和内容写在同一行
- 如果函数被 model_validator 或 field_validator 注释，则只需添加函数描述即可

## 代码逻辑规范

- 在保证逻辑清晰的情况下，尽量避免使用多元表达式（如三元运算符）
- 保持代码的可读性和可维护性
- 使用提前返回模式简化代码
- 移除不必要的中间变量
- 添加适当的空行，提高代码可读性
- 优先处理错误和边缘案例
- 对错误条件使用提前返回，以避免嵌套较深的 if 语句
- 避免不必要的 else 语句，而应使用 if-return 模式
- 实施适当的错误记录和用户友好型错误信息
- 使用自定义错误类型或错误工厂进行一致的错误处理

## 代码格式规范

- 统一代码风格
- 保持适当的空行
- 优化长行（超过 120 个字符）的格式
- 使用括号进行换行
- 保持一致的缩进

## 代码注释规范

- 合理的注释，避免不必要的注释
- 中英文之间应包加空格
- 注释文字描述应具体和清晰
- 注释要让人视觉上更清晰

## 命名规范

- 变量名要具有描述性
- 避免使用单字母变量名（除非是循环变量）
- 使用下划线命名法（snake_case）
- 类名使用大驼峰命名法（PascalCase）

## 函数定义规范

- 纯函数使用 `def`
- 异步操作使用 `async def`
- 函数尽量单一职责，避免过于复杂的函数，但也不要过于琐碎
```

### FastAPI 特定规范

::: tip
此规则特定于 fba，不建议您将它用于其他 FastAPI 项目
:::

文件名：`fastapi-specific-standards-for-fba.mdc`

```mdc
# FastAPI Best Architecture

您是 FastAPI 和可扩展 API 开发方面的专家，请遵循以下原则

## 依赖管理

- 使用 FastAPI 的依赖注入系统管理状态和共享资源
- 遵循项目的依赖版本要求：
  - Python 3.10+
  - FastAPI
  - Pydantic v2
  - Pydantic Settings @backend\core\conf.py
  - SQLAlchemy 2.0（如果使用 ORM 功能）
  - SQLAlchemy 配置: @backend\database\db.py

## SQLAlchemy 规范

- 模型类文档只需描述它是什么表

## Schema 规范

- schema 类文档只需描述简短几个字
- 为 schema 属性添加 Field

## 路由处理规范

- 同步操作使用 `def`
- 异步操作使用 `async def`
- 使用异步函数处理 I/O 绑定任务
- 理解并遵循 @backend\common\response\response_schema.py 的返回模式
- 保持 API 响应格式的一致性

## 性能优化规范

- 接口函数内的阻塞型事件使用 run_in_threadpool 处理
- 尽量减少阻塞 I/O 操作
- 在所有数据库调用和外部 API 请求中使用异步操作
- 使用 Redis 工具 @backend\database\redis.py，对静态数据和频繁访问的数据实施缓存
- 优先考虑 API 性能指标（响应时间、延迟、吞吐量）

## 错误处理规范

- 使用 FastAPI 的异常处理机制
- 统一错误响应格式
- 根据错误工厂 @backend\common\exception\errors.py 提供清晰的错误信息和错误码
- 记录关键错误信息到日志系统 @backend\common\log.py

## 数据验证规范

- 使用 Pydantic 模型进行数据验证
- 定义清晰的请求和响应模型，参考：@backend\app\admin\schema\user.py
- 合理使用字段验证器
- 提供有意义的验证错误信息
```
