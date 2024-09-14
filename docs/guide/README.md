---
title: FastAPI Best Architecture
createTime: 2024/09/12 20:40:22
---

> [!TIP]
> 此仓库作为模板库公开，任何人或企业均可免费使用！

**🔥持续更新维护中🔥**

![Alt](https://repobeats.axiom.co/api/embed/b2174ef1abbebaea309091f1c998fc97d0c1536a.svg "Repo beats analytics image")

## 伪三层架构

mvc 架构作为常规设计模式，在 python web 中也很常见，但是三层架构更令人着迷

在 python web 开发中，三层架构的概念并没有通用标准，所以这里我们称之为伪三层架构

但请注意，我们并没有传统的多应用程序结构（django、springBoot...），如果您不喜欢这种模式，可以使用模板对其进行随意改造！

| 工作流程 | java           | fastapi_best_architecture |
|------|----------------|---------------------------|
| 视图   | controller     | api                       |
| 数据传输 | dto            | schema                    |
| 业务逻辑 | service + impl | service                   |
| 数据访问 | dao / mapper   | crud                      |
| 模型   | model / entity | model                     |

## 特征

- [x] 全局 FastAPI PEP 593 Annotated 参数风格
- [x] async/await + asgiref 的全局异步设计
- [x] 遵循 Restful API 规范
- [x] 全局 SQLAlchemy 2.0 语法
- [x] Pydantic v1 和 v2 (不同分支)
- [x] Casbin RBAC 访问控制模型
- [x] 角色菜单 RBAC 访问控制模型
- [x] Celery 异步任务
- [x] JWT 中间件白名单认证
- [x] 全局自定义时区时间
- [x] Docker / Docker-compose 部署
- [x] Pytest 单元测试

## 内置功能

- [x] 用户管理：系统用户角色管理，权限分配
- [x] 部门管理：配置系统组织机构（公司、部门、小组...）
- [x] 菜单管理：配置系统菜单，用户菜单，按钮权限标识
- [x] 角色管理：角色菜单权限分配，角色路由权限分配
- [x] 字典管理：维护系统内部常用固定数据或参数
- [x] 代码生成：后端代码自动生成，支持预览，写入及下载
- [x] 操作日志：系统正常和异常操作的日志记录与查询
- [x] 登录认证：图形验证码后台认证登录
- [x] 登录日志：用户正常和异常登录的日志记录与查询
- [x] 服务监控：服务器硬件设备信息与状态
- [x] 定时任务：自动化任务，异步任务，支持函数调用
- [x] 接口文档：自动生成在线交互式 API 接口文档

## 项目结构

::: file-tree
- backend 后端
  - alembic/ 数据库迁移
  - app/ 应用
    - admin 系统后台
      - api/ 接口
      - crud/  CRUD
      - model/ 模型
      - schema/ 数据传输
      - service/ 服务
      - tests/ 测试
    - generator/ 代码生成
    - task/ 任务
  - common/ 公共资源
  - core/ 核心配置
  - database/ 数据库连接
  - log/ 日志
  - middleware/ 中间件
  - scripts/ 脚本
  - sql/ SQL文件
  - static/ 静态文件
  - templates/ 模版文件
  - utils/ 工具包
- deploy/ 服务器部署
- ...
:::

## 贡献者

<a href="https://github.com/fastapi-practices/fastapi_best_architecture/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fastapi-practices/fastapi_best_architecture"/>
</a>

## 许可证

本项目由 [MIT](https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/LICENSE) 许可证的条款进行许可

[![Stargazers over time](https://starchart.cc/fastapi-practices/fastapi_best_architecture.svg?variant=adaptive)](https://starchart.cc/fastapi-practices/fastapi_best_architecture)

## 相关

::: tip 特别鸣谢
本文档由 [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume)
驱动，感谢 [pengzhanbo](https://github.com/pengzhanbo) 对此开源项目的杰出贡献
:::

::: info kinit
如果此架构没有达到你的预期，你可以尝试 [kinit-fast-task](https://gitee.com/ktianc/kinit-fast-task)
，它是基于 [fastapi-best-practices](https://github.com/zhanymkanov/fastapi-best-practices) 标准的微调版
:::
