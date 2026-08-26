---
title: Why Choose Us?
---

> [!TIP]
> This repository is published as a template and can be used freely by individuals and companies.

> [!IMPORTANT]
> We do not compare against other architectures. Every architecture has its own strengths and fits different scenarios.
>
> fba continuously pursues clear, conventional, maintainable code structure, while keeping onboarding and adaptation costs low.
>
> At the same time, ==fba is absolutely one of the cleanest, most conventional, and most visually pleasing open-source architecture projects=={.tip}

## Goals

Our goal is a backend architecture you can ship directly — so developers can move into business work quickly, and also learn engineering practices around layering, configuration, permissions, plugins, and deployment. We keep improving the architecture to make it more stable, clearer, and easier to extend.

## Commitment

This repository is published as a template and can be used freely by individuals and companies. You can choose different editions on the [Pricing page](../../pricing.md).

## Architecture

fba uses a clear [three-layer architecture](../summary/intro.md#three-layer-architecture), separating responsibilities of API, Service, CRUD/DAO, Schema, and Model to reduce coupling between business code.

## Openness

- MIT license + full architecture source code open
- GitHub template repository for easy copying and independent naming
- No forced `fba` naming — replace project name, package names, and business prefixes to match your team conventions

## Flexibility

The plugin system is the main expression of fba’s flexibility. Beyond that, API responses, error definitions, configuration management, and directory layering stay simple and direct so developers can extend for business needs.

## Long-term Maintenance

Since this project started, we have invested a large amount of time — and we are still going!

![Alt](https://repobeats.axiom.co/api/embed/02a11c703a7caab24af2dd935ce4223fbae59178.svg "Repobeats analytics image")

## Origin

We once had a complete [issue](https://github.com/fastapi-practices/fastapi_sqlalchemy_mysql/issues/5) about how fba started, but that content was permanently deleted and could not be restored. We contacted GitHub Support and still could not recover the full record.

In short, core team member [downdawn](https://github.com/downdawn) discovered fba’s predecessor [fastapi_sqlalchemy_mysql](slim.md#sqlalchemy) before fba existed, and opened an issue: “A few discussions and suggestions.” Discussion around that issue lasted several days and eventually led to creating fba.

## Suite Artifacts

While creating and iterating fba, we also extracted some independent packages. They stay loosely coupled with fba and can be used alone in other FastAPI or SQLAlchemy projects.

<CardGrid>
  <LinkCard 
    title="sqlalchemy-crud-plus" 
    description="Advanced async CRUD SDK built on SQLAlchemy 2.0" 
    href="https://github.com/fastapi-practices/sqlalchemy-crud-plus" 
    icon="https://wu-clan.github.io/picx-images-hosting/logo/fba.png" 
  />
  <LinkCard 
    title="fastapi-oauth20" 
    description="Async OAuth 2.0 client authorization for FastAPI" 
    href="https://github.com/fastapi-practices/fastapi-oauth20"
    icon="https://wu-clan.github.io/picx-images-hosting/logo/fba.png" 
  />
</CardGrid>

::: center
[more...](https://github.com/orgs/fastapi-practices/repositories?)
:::

## Slim Edition
