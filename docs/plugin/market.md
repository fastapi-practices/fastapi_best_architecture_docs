---
title: 插件市场
---

::: warning
插件功能目前处于测试阶段，如有任何建议，请立即和我们 [反馈](https://discord.com/channels/1185035164577972344/1332032404663046204)
吧
:::

::: info
您可以在 [插件互动频道](https://discord.gg/5SDAZgDya9) 与插件作者及社区人员进行互动和交流

- <Badge type="info" text="free" /> - 免费插件
- <Badge type="danger" text="pay" /> - 付费插件
- <Badge type="tip" text="fba" /> - 仅后端代码插件
- <Badge text="fba-arco" color="#4582ff"/> - 包含前端 [fastapi_best_architecture_ui](https://github.com/fastapi-practices/fastapi_best_architecture_ui) 代码插件
- <Badge text="fba-vben" color="#c178ec"/> - 包含前端 [fba_ui](https://github.com/fastapi-practices/fba_ui) 代码插件
- <Badge text="app" color="#D6DD59"/> - 独立 app 插件
- <Badge text="app-extra" color="#59C7DD"/> - 非独立 app 插件 / 内置 app 扩展

:::

## 官方

这些插件由 fba 开发人员提供和维护

<CardGrid>
  <LinkCard icon="fe:notice-active" title="通知公告" href="https://discord.com/channels/1185035164577972344/1336557178437373984">
    <p style="color: #898989;">添加通知公告功能</p>
    <span>
    <Badge type="info" text="free" />
    <Badge type="tip" text="fba" />
    <Badge text="app-extra" color="#59C7DD"/>
    </span>
  </LinkCard>
  <LinkCard icon="solar:user-check-bold" title="Casbin-RBAC" href="https://discord.com/channels/1185035164577972344/1340300371251302451">
    <p style="color: #898989;">添加基于 Casbin 实现的 RBAC 权限</p>
    <span>
    <Badge type="info" text="free" />
    <Badge type="tip" text="fba" />
    <Badge text="app-extra" color="#59C7DD"/>
    </span>
  </LinkCard>
  <LinkCard icon="ant-design:aliyun-outlined" title="阿里云 oss" href="https://discord.com/channels/1185035164577972344/1342478204400832593">
    <p style="color: #898989;">添加阿里云 oss 上传文件功能</p>
    <span>
    <Badge type="info" text="free" />
    <Badge type="tip" text="fba" />
    <Badge text="app-extra" color="#59C7DD"/>
    </span>
  </LinkCard>
</CardGrid>

## 第三方

这些插件由社区中的开发者提供和维护

<CardGrid>
  <Card title="空空如也">
  </Card>
</CardGrid>

## 安装

插件安装方式可分为两种

### 手动

1. 获取插件仓库源码并下载，将源码中的插件目录直接拷贝到 fba 项目对应的目录下
2. 如果插件包含依赖，执行 `backend/scripts/init_plugin.py` 文件安装依赖
3. 根据插件使用说明完成安装

### 自动

（此功能开发中...）

1. 获取打包好的插件 zip 压缩包
2. 将压缩包通过插件安装接口进行安装
3. 根据插件使用说明完成安装
