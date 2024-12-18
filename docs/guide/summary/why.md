---
title: 为什么选择我们？
---
<script setup>
import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
</script>

::: caution
==FBA 仅适用于资深 Python 后端开发人员==，如果您是非资深用户，请查看 [精简版](#精简版)

我们建议新手用户从一些基础和简单的内容入手，这不仅是对自身学习的负责态度，也为将来能够顺利掌握这一架构奠定坚实的基础
:::

::: note
我们不会去和其他架构做比较，我们认为每个架构都有自己的特点，适合不同的场景

我们的目标是提供一个最佳架构，让开发者可以快速上手，专注于业务逻辑的开发，所以我们只会不断完善和优化我们的架构，为开发者带来更好的体验
:::

## 承诺

<div style="text-align: center">
  <h3>「永久 MIT 协议」「永久免授权」</h3>
  <p>如果可以，请给此项目一个 <NpmBadge repo="fastapi-practices/fastapi_best_architecture" type="stars" />，此仓库作为模板库公开，任何个人或企业均可免费使用！</p>
  <p style="float: right">--- <a href="https://github.com/fastapi-practices">fastapi-practices</a> 对此拥有所有解释权</p>
  <br>
</div>

## 架构

独一无二，自主研发，自主命名，开发人员可轻松驾驭的独特架构：[伪三层架构](../README.md#伪三层架构)

## 长期维护

自创建此项目以来，我们已为此项目付出了大量的时间，并且，这仍然在继续！

![Commits_over_time.png](/images/Commits_over_time.png)

## 框架历程

建设中...

我们有一个完整的关于 FBA 由来的 issue，但它已被删除且无法到达 😭

## 套件产物

在创建和迭代 FBA 的同时，我们创建了很多与之相关的套件，且他们非常实用，并且我们做到了 0 耦合，您完全可以将它们用到其他与之相关的项目中去

<CardGrid>
  <RepoCard repo="wu-clan/sqlalchemy-crud-plus" />
  <RepoCard repo="wu-clan/fast-captcha" />
  <RepoCard repo="wu-clan/fastapi_scheduler" />
  <RepoCard repo="wu-clan/fastapi-oauth20" />
</CardGrid>

## 精简版

尽管我们在 FBA 中尽可能地降低了耦合度，但是对于一个简易版本来讲，它需要删除太多东西，因此，我们同时提供了精简版本，详情请查看：[精简版](./fsm.md)

## 质量与规范

- 全局使用 reStructuredText 文档风格

    我们采用 rest 的文档风格，这是一种非常流行的 Python 代码文档，并且，与 IDE 有非常好的集成

- 快速同步框架新特性

    我们追求新事物，拥抱新事物，我们会积极跟进 FastAPI 中的新特性，在不受 Issue 影响的情况下，尽可能地将所有好用的新特性集成进来

- 严格的代码质量

    我们有十分严格的 CI 代码质量检测和[规则](https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/backend/.ruff.toml)，使用非常流行且强大的 ruff 作为支撑，为每次 PR 的代码质量做到严格把控

- 持续的认可

    在此我们不做任何宣传引导，您可以在交流群发出疑问，我们静待用户真实反馈
