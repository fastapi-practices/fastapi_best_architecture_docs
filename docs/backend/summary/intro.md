---
title: 简介
---

基于 FastAPI 构建的企业级后端架构解决方案

## 伪三层架构

mvc 架构作为常规设计模式，在 python web 中很常见，但是三层架构更令人着迷

在 python web 开发中，三层架构的概念并没有通用标准，所以这里我们称之为伪三层架构

！但请注意 ！

我们并没有传统的多 app （微服务）目录结构（django、springBoot...），而是[自以为是的目录结构](#项目结构)

如果您不喜欢这种模式，可以对其进行任意改造！

| 模块   | java           | fastapi_best_architecture |
|------|----------------|---------------------------|
| 视图   | controller     | api                       |
| 数据传输 | dto            | schema                    |
| 业务逻辑 | service + impl | service                   |
| 数据访问 | dao / mapper   | crud                      |
| 模型   | entity         | model                     |

## 特性

- [x] 全局 PEP 593 Annotated 参数注入
- [x] 全异步设计（async/await + asgiref）
- [x] 遵循 RESTful API 规范
- [x] SQLAlchemy 2.0 现代语法
- [x] Pydantic v2 全栈数据验证
- [x] 角色菜单 RBAC 权限控制
- [x] 原生 Celery 异步任务支持
- [x] 自研高性能 JWT 认证中间件
- [x] 全局自定义时区处理
- [x] 一键 Docker / Docker-Compose 部署
- [x] 集成 Pytest 单元测试
- [x] Grafana 全链路可观测性

## 内置功能

- [x] 用户管理：灵活分配角色与权限
- [x] 部门管理：轻松构建组织架构
- [x] 菜单管理：精准到按钮级的权限配置
- [x] 角色管理：一站式角色权限分配
- [x] 字典管理：全局参数统一维护
- [x] 参数管理：运行时动态配置系统参数
- [x] 通知公告：快速发布系统消息
- [x] 令牌管理：实时在线监测 + 强制下线
- [x] 多端登录：一键切换多终端模式
- [x] 自研 OAuth 2.0：开箱即用授权登录
- [x] 插件系统：零耦合扩展，随意拼装
- [x] 定时任务：灵活调度异步任务
- [x] 代码生成：一键预览、写入、下载
- [x] 操作日志：完整记录正常/异常操作
- [x] 登录日志：详尽追踪登录行为
- [x] 缓存监控：实时查看缓存统计
- [x] 服务监控：服务器硬件与状态一目了然
- [x] 接口文档：自动生成交互式 Swagger 文档

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
- [无名](https://github.com/lvright) 精心设计的 LOGO（包含了 fba 三个字母抽象结合，形成了一个类似从地面扩散投影上来的闪电）
- [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume) 为官网文档提供驱动支持
- FastAPI、SQLAlchemy、Pydantic 等开源先行者
- 所有赞助商们（包含所有渠道）的大力支持
- 此项目的所有贡献者、参与者和使用者
