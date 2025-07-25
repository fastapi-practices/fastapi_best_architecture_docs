---
title: 为什么选择我们？
---

<script setup>
import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
</script>

> [!TIP]
> 此仓库作为模板库公开，任何个人或企业均可自由使用！

> [!IMPORTANT]
> 我们不会去对比任何其他架构，我们认为每个架构都有自己的特点，适用于不同的场景。
>
> 但 fba 绝对是开源架构中代码==最干净，最规范且最令人赏心悦目=={.note}的项目之一

## 目标

我们的目标是提供一个最佳架构，让开发者可以快速上手，能够专注于业务逻辑开发，或从此架构中获得灵感，优化本地架构设计，所以我们只会不断完善和优化我们的架构，为开发者带来更好的体验

## 承诺

此仓库作为模板库公开，任何个人或企业均可自由使用！您可以通过 [购买授权](../../price.md) 查看我们的授权方案

## 架构

独一无二，自主研发，自主命名，开发人员可轻松驾驭的独特架构：[伪三层架构](../summary/intro.md#伪三层架构)

## 开放性

- MIT 协议 + 架构源码全量开源
- GitHub 模板仓库，便捷复制和自主命名
- 没有任何以 `fba` 强制命名的内容，也就是说，你可以通过 IDE 统一替换所有 `fba` 关键字为其他

## 灵活性

最具灵活性的代表就是我们的【插件系统】，不仅如此，在接口响应，错误定义，包括架构本身，我们一直在致力于使其既好用又简洁，这些设计对开发者非常友善

## 长期维护

自创建此项目以来，我们已为此项目付出了大量的时间，并且，这仍然在继续！

![Alt](https://repobeats.axiom.co/api/embed/b2174ef1abbebaea309091f1c998fc97d0c1536a.svg "Repo beats analytics image")

## 框架由来

我们有一个完整的关于 fba 由来的 [issues](https://github.com/fastapi-practices/fastapi_sqlalchemy_mysql/issues/5)
，但它被不小心永久删除且无法恢复 😭，我们尝试联系了 GitHub 支持，但不幸的是，我们仍无法获取完整 issues 😭

大致内容为我们的核心团队成员 [downdawn](https://github.com/downdawn) 在 fba 创建之前，找到了 fba
的前身仓库 [fastapi_sqlalchemy_mysql](fsm.md#sqlalchemy)，并创建了 issue：【几点讨论与建议】；我们就此 issue
展开了为期数天的讨论，最终决定并创建了
fba

## 套件产物

在创建和迭代 fba 的同时，我们创建了很多与之相关的套件，且他们非常实用，并且我们做到了 0 耦合，您完全可以将它们用到其他与之相关的项目中去

<CardGrid>
  <RepoCard repo="fastapi-practices/sqlalchemy-crud-plus" />
  <RepoCard repo="fastapi-practices/fastapi-oauth20" />
</CardGrid>

<div align="center">
  <a href="https://github.com/orgs/fastapi-practices/repositories?" target="_blank">more...</a>
</div>

## 精简版

尽管我们在 fba
中尽可能地降低了耦合度，但是对于一个简易版本来讲，它需要删除太多东西，因此，我们同时提供了精简版本，详情请查看：[精简版](./fsm.md)

## 质量与规范

- 全局使用 reStructuredText 文档风格

  我们采用了 rest 文档风格，这是一种非常流行的 Python 代码文档，并且，与 IDE 有非常好的集成

- 快速同步框架新特性

  我们追求新事物，拥抱新事物，我们会积极跟进 FastAPI 中的新特性，在不受 Issue 影响的情况下，尽可能地将所有好用的新特性集成进来

- 严格的代码质量

  我们有十分严格的 CI
  代码质量检测和[规则](https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/backend/.ruff.toml)
  ，使用非常流行且强大的 Ruff 作为支撑，为每次 PR 的代码质量做到严格把控

- 持续的认可

  在此我们不做任何宣传引导，您可以在任意社区/交流群发出疑问，我们静待用户真实反馈
