---
title: 为什么选择我们？
---

<script setup>
import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
</script>

::: note
我们不会去和其他架构做比较，我们认为每个架构都有自己的特点，适合不同的场景

我们的目标是提供一个最佳架构，让开发者可以快速上手，能够专注于业务逻辑的开发，所以我们只会不断完善和优化我们的架构，为开发者带来更好的体验
:::

## 承诺

<div style="text-align: center">
  <h3>「永久 MIT 协议」「永久免授权」</h3>
  <p>如果可以，请给此项目一个 <NpmBadge repo="fastapi-practices/fastapi_best_architecture" type="stars" />，此仓库作为模板库公开，任何个人或企业均可免费使用！</p>
  <p style="float: right">--- <a href="https://github.com/fastapi-practices">fastapi-practices</a>对此拥有所有解释权</p>
  <br>
</div>

## 架构

独一无二，自主研发，自主命名，开发人员可轻松驾驭的独特架构：[伪三层架构](../summary/intro.md#伪三层架构)

## 长期维护

自创建此项目以来，我们已为此项目付出了大量的时间，并且，这仍然在继续！

![Commits_over_time.png](/images/Commits_over_time.png)

## 框架由来

我们有一个完整的关于 FBA 由来的 [issue](https://github.com/fastapi-practices/fastapi_sqlalchemy_mysql/issues/5)，但它被不小心删除且无法到达
😭，我们尝试联系了 GitHub 支持，但我们只能获取 issue 问题本身的正文 😭

大致内容为我们的核心团队成员 [downdawn](https://github.com/downdawn) 在 FBA 创建之前，找到了 FBA 现在的精简版
[fastapi_sqlalchemy_mysql](fsm.md#sqlalchemy)，并创建了 issue：==几点讨论与建议==；我们就此 issue 展开了为期数天的讨论，最终决定并创建了
FBA

::: details issue 正文（由 GitHub 支持提供，无法保证原始性）
> ==讨论一：更清晰的结构建议==
>
>现在的api结构是：
>
>```
>api
> ═── service/
> ═── v1
> │ ═── auth
> ═── init .py
> ═──casbin.py
> ═──jwt.py
> ═──registrar.py
> ═──routers.py
>```
>
>参考几个开源项目，结合个人建议是api目录下保留最简单的结构，casbin、jwt、registrar可以移动到其他目录，比如core。
>
>api <br/>
> │ <br/>
> ...
>
>api——>初始化.py
>
>```python
>from fastapi import APIRouter
>from api.auth import router as auth_router
>
>v1 = APIRouter(prefix='/v1')
>
>v1.include_router(auth_router)
>```
>
>api——>v1——>auth——>初始化.py
>
>```python
>from fastapi import APIRouter
>from api.auth.user import router as user_router
>
>router = APIRouter(prefix='/auth', tags=['认证'])
>
>router.include_router(user_router, prefix='/user')
>```
>
>==讨论二：基于类的视图==
>
>参考该讨论：https://github.com/zhanymkanov/fastapi-best-practices/issues/4与fastapi-utils项目
>
>基于类的比每个零散的方法看起来会更加清晰，并且可以在一个py管理多个路由（有时需要）
>
>```python
>from utils.cvb import cbv
>
>router = APIRouter(prefix='/api')
>
>
>@cbv(router)
>class APIRouter:
>user: User = Depends(get_current_user)
>service = ApiService()
>
>@router.get('', summary='获取所有API', response_model=Page[GetAllApi])
>async def get_all_api(self):
>print(self.user)
>return await self.service.get_api_list()
>```
>
>如上，原先的service文件里的方法也封装成ApiService类。同时建议service应该每个路由模块里都有一个，类似如下结构：
>
>api <br/>
> │ │ │ <br/>
> │ │ │ │ │ │ │ │ <br/>
> │ │ │ │ │ │ │ │ │ │
>
>这样的话，应该有个Service基类，包含常见的query、create、update、delete方法。
>
>同时async with async_db_session.begin() as db:每个方法都有，可以进一步优化？
>
> ==讨论三：权限==
>
>casbin是go项目扩展出来的思想？感觉有点冗重，权限这块自己封装比较好自定义。
>
>简单的基于redis或者mysql定义crud，可以对不同路由或者请求方法设置不同的权限。
>
>目前还没有很好的实现方法，但是参考过往的项目应该不难。
:::

## 套件产物

在创建和迭代 FBA 的同时，我们创建了很多与之相关的套件，且他们非常实用，并且我们做到了 0 耦合，您完全可以将它们用到其他与之相关的项目中去

<CardGrid>
  <RepoCard repo="fastapi-practices/sqlalchemy-crud-plus" />
  <RepoCard repo="fastapi-practices/fastapi_scheduler" />
  <RepoCard repo="fastapi-practices/fastapi-oauth20" />
  <RepoCard repo="wu-clan/fast-captcha" />
</CardGrid>

## 精简版

尽管我们在 FBA
中尽可能地降低了耦合度，但是对于一个简易版本来讲，它需要删除太多东西，因此，我们同时提供了精简版本，详情请查看：[精简版](./fsm.md)

## 质量与规范

- 全局使用 reStructuredText 文档风格

  我们采用 rest 的文档风格，这是一种非常流行的 Python 代码文档，并且，与 IDE 有非常好的集成

- 快速同步框架新特性

  我们追求新事物，拥抱新事物，我们会积极跟进 FastAPI 中的新特性，在不受 Issue 影响的情况下，尽可能地将所有好用的新特性集成进来

- 严格的代码质量

  我们有十分严格的 CI
  代码质量检测和[规则](https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/backend/.ruff.toml)
  ，使用非常流行且强大的 ruff 作为支撑，为每次 PR 的代码质量做到严格把控

- 持续的认可

  在此我们不做任何宣传引导，您可以在交流群发出疑问，我们静待用户真实反馈
