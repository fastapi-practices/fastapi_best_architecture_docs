---
url: /fastapi_best_architecture_docs/backend/summary/why.md
---
> \[!TIP]
> 此仓库作为模板库公开，任何个人或企业均可自由使用！

> \[!IMPORTANT]
> 我们不会去对比任何其他架构，我们认为每个架构都有自己的特点，适用于不同的场景。
>
> fba 会持续追求清晰、规范、易维护的代码结构，并尽量保持较低的上手和改造成本
>
> 同时，==fba 绝对是开源架构中，代码最整洁，最规范且最令人赏心悦目的项目之一=={.tip}

## 目标

我们的目标是提供一套可直接落地的后端架构，让开发者快速进入业务开发，也能从中借鉴分层、配置、权限、插件和部署等工程实践。我们会持续完善架构，让它更稳定、更清晰、更容易扩展

## 承诺

此仓库作为模板库公开，任何个人或企业均可自由使用！您可以通过 [定价页面](../../pricing.md) 选择不同版本

## 架构

fba 采用清晰的[三层架构](../summary/intro.md#三层架构)，将 API、Service、CRUD/DAO、Schema 和 Model 的职责拆开，降低业务代码之间的耦合

## 开放性

* MIT 协议 + 架构源码全量开源
* GitHub 模板仓库，便捷复制和自主命名
* 没有强制绑定 `fba` 命名，你可以按团队规范替换项目名称、包名和业务前缀

## 灵活性

插件系统是 fba 灵活性的主要体现。除此之外，接口响应、错误定义、配置管理和目录分层也都尽量保持简单直接，便于开发者按业务需要扩展。

## 长期维护

自创建此项目以来，我们已为此项目付出了大量的时间，并且，这仍然在继续！

![Alt](https://repobeats.axiom.co/api/embed/02a11c703a7caab24af2dd935ce4223fbae59178.svg "Repobeats analytics image")

## 框架由来

我们曾有一个关于 fba 由来的完整 [issue](https://github.com/fastapi-practices/fastapi_sqlalchemy_mysql/issues/5)
，但该内容已被永久删除且无法恢复。我们曾尝试联系 GitHub 支持，仍未能取回完整记录。

大致内容为我们的核心团队成员 [downdawn](https://github.com/downdawn) 在 fba 创建之前，找到了 fba
的前身仓库 [fastapi\_sqlalchemy\_mysql](slim.md#sqlalchemy)，并创建了 issue：【几点讨论与建议】。围绕这个 issue 的讨论持续了数天，最终促成了
fba 的创建。

## 套件产物

在创建和迭代 fba 的同时，我们也沉淀了一些独立套件。这些套件与 fba 保持低耦合，可以在其他 FastAPI 或 SQLAlchemy 项目中单独使用。

::: center
[more...](https://github.com/orgs/fastapi-practices/repositories?)
:::

## 精简版

尽管我们在 fba
中尽可能降低了耦合度，但如果只需要一个最小化架构，完整版本仍然包含较多功能模块。因此我们同时提供精简版本，详情请查看：[精简版](./slim.md)

## 质量与规范

* 全局使用 reStructuredText 文档风格

  我们采用 reStructuredText 风格编写 Python 文档字符串，它在 Python 生态中应用广泛，并且与主流 IDE 集成良好

* 快速同步框架新特性

  我们会积极跟进 FastAPI、Pydantic、SQLAlchemy 等核心依赖的新特性，并在兼容性允许的前提下逐步集成。

* 严格的代码质量

  我们有十分严格的 CI
  代码质量检测和[规则](https://github.com/fastapi-practices/fastapi-best-architecture/blob/master/pyproject.toml)，使用
  Ruff 作为主要代码检查工具，对每次 PR 的代码质量进行约束

* 持续的认可

  在此我们不做任何宣传引导，您可以在任意社区/交流群发出疑问，我们静待用户真实反馈
