---
title: 简介
---

基于 FastAPI 构建的企业级后端架构解决方案

## 伪三层架构

mvc 架构作为常规设计模式，在 python web 中很常见，但是三层架构更令人着迷

在 python web 开发中，三层架构的概念并没有通用标准，所以这里我们称之为伪三层架构

但请注意，我们并没有传统的多 app （微服务）目录结构（django、springBoot...），而是[自以为是的目录结构](#项目结构)

如果您不喜欢这种模式，可以对其进行任意改造！

| 模块   | java           | fastapi_best_architecture |
|------|----------------|---------------------------|
| 视图   | controller     | api                       |
| 数据传输 | dto            | schema                    |
| 业务逻辑 | service + impl | service                   |
| 数据访问 | dao / mapper   | crud                      |
| 模型   | entity         | model                     |

## 特性

- [x] 全局 FastAPI PEP 593 Annotated 参数风格
- [x] 全面 async/await + asgiref 异步设计
- [x] 遵循 RESTful API 规范
- [x] 使用 SQLAlchemy 2.0 全新语法
- [x] 使用 Pydantic v2 版本
- [x] 角色菜单 RBAC 访问控制
- [x] 支持 Celery 异步任务
- [x] 自研 JWT 认证中间件
- [x] 支持全局自定义时间时区
- [x] 支持 Docker / Docker-compose 部署
- [x] 集成 Pytest 单元测试

## 内置功能

- [x] 用户管理：分配角色和权限
- [x] 部门管理：配置组织架构（公司、部门、小组等）
- [x] 菜单管理：设置菜单及按钮级权限
- [x] 角色管理：配置角色、分配菜单和权限
- [x] 字典管理：维护常用参数和配置
- [x] 参数管理：系统常用参数动态配置
- [x] 通知公告：发布和维护系统通知公告信息
- [x] 令牌管理：检测在线状态，支持强制下线
- [x] 多端登录：支持一键切换多端登录模式
- [x] OAuth 2.0：内置自研 OAuth 2.0 授权登录
- [x] 插件系统：热插拔插件设计，降低耦合
- [x] 定时任务：支持定时，异步任务及函数调用
- [x] 代码生成：自动生成代码，支持预览、写入和下载
- [x] 操作日志：记录和查询正常和异常操作
- [x] 登录日志：记录和查询正常和异常登录
- [x] 缓存监控：查询系统缓存信息和命令统计
- [x] 服务监控：查看服务器硬件信息和状态
- [x] 接口文档：自动生成在线交互式 API 文档

## 项目结构

::: file-tree

- backend 后端
    - alembic/ 数据库迁移
    - app 应用
        - admin/ 系统后台
            - api/ 接口
            - crud/ CRUD
            - model 模型
                - __init__.py 必须在此文件内导入所有模型类
                - …
            - schema/ 数据传输
            - service/ 服务
            - tests/ 单元测试
        - task/ 任务
        - …
    - common/ 公共资源
    - core/ 核心配置
    - database/ 数据库连接
    - log/ 日志
    - middleware/ 中间件
    - plugin 插件
        - code_generator/ 代码生成
        - …
    - scripts/ 脚本
    - sql/ SQL 文件
    - static/ 静态文件
    - templates/ 模版文件
    - utils/ 工具包
- deploy/ 服务器部署
- …

:::

## 贡献者

<a href="https://github.com/fastapi-practices/fastapi_best_architecture/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fastapi-practices/fastapi_best_architecture"/>
</a>

## 许可证

本项目由 [MIT](https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/LICENSE) 许可证的条款进行许可

[![Stargazers over time](https://starchart.cc/fastapi-practices/fastapi_best_architecture.svg?variant=adaptive)](https://starchart.cc/fastapi-practices/fastapi_best_architecture)

## 特别鸣谢

- [downdawn](https://github.com/downdawn) 积极推动创建此项目
- [无名](https://github.com/lvright) 精心设计的 LOGO（包含了 FBA 三个字母抽象结合，形成了一个类似从地面扩散投影上来的闪电）
- [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume) 为官网文档提供驱动支持
- FastAPI、SQLAlchemy、Pydantic 等开源先行者
- 此项目的所有贡献者、参与者和使用者
- 所有赞助商们（包含所有渠道）的大力支持
