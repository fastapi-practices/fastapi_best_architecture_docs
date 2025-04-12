---
title: 插件市场
---

::: warning
插件功能目前处于测试阶段，如有任何建议，请立即和我们 [反馈](https://discord.com/channels/1185035164577972344/1349951379560599572)
吧
:::

::: info 标签说明

- <Badge type="info" text="free" /> - 免费插件
- <Badge type="danger" text="pay" /> - 付费插件
- <Badge type="tip" text="fba" /> - 仅后端代码插件
- <Badge text="fba_ui" color="#8e5cd9" bg-color="rgba(159, 122, 234, 0.16)"/> - 包含前端 [fastapi_best_architecture_ui](https://github.com/fastapi-practices/fastapi_best_architecture_ui) 代码插件 <Badge type="warning" text="暂无此计划" />
- <Badge text="app" color="#ff9900"/> - 应用级插件
- <Badge text="extra" color="#11aa00"/> - 扩展级插件

:::

## 内置

这些插件由 fba 内置

<CardGrid>
  <Card icon="fe:notice-active" title="通知公告">
    <p style="color: #898989;">发布系统内部通知、公告</p>
    <span>
    <Badge type="info" text="free" />
    <Badge type="tip" text="fba" />
    <Badge text="extra" color="#11aa00"/>
    </span>
  </Card>
  <Card icon="charm:shield-keyhole" title="Casbin-RBAC">
    <p style="color: #898989;">基于 Casbin 实现的 RBAC 权限</p>
    <span>
    <Badge type="info" text="free" />
    <Badge type="tip" text="fba" />
    <Badge text="extra" color="#11aa00"/>
    </span>
  </Card>
  <Card icon="icon-park-outline:config" title="参数配置">
    <p style="color: #898989;">通常用于前端工程数据展示</p>
    <span>
    <Badge type="info" text="free" />
    <Badge type="tip" text="fba" />
    <Badge text="extra" color="#11aa00"/>
    </span>
  </Card>
  <Card icon="fluent-mdl2:dictionary" title="数据字典">
    <p style="color: #898989;">通常用于前端工程数据展示</p>
    <span>
    <Badge type="info" text="free" />
    <Badge type="tip" text="fba" />
    <Badge text="extra" color="#11aa00"/>
    </span>
  </Card>
</CardGrid>

## 官方

这些插件由 fba 开发人员提供和维护

<CardGrid>
  <LinkCard icon="ant-design:aliyun-outlined" title="阿里云 oss" href="https://github.com/fastapi-practices/fba_aliyun_oss">
    <p style="color: #898989;">阿里云 oss 文件上传</p>
    <span>
    <Badge type="info" text="free" />
    <Badge type="tip" text="fba" />
    <Badge text="extra" color="#11aa00"/>
    </span>
  </LinkCard>
  <LinkCard icon="streamline:ai-prompt-spark" title="MCP ChatGPT" href="https://github.com/fastapi-practices/fba_mcp">
    <p style="color: #898989;">可调用 MCP 服务器的增强版 AI 聊天</p>
    <span>
    <Badge type="info" text="free" />
    <Badge type="tip" text="fba" />
    <Badge text="extra" color="#11aa00"/>
    </span>
  </LinkCard>
</CardGrid>

## 第三方

这些插件由社区中的开发者提供和维护

<CardGrid>
  <Card title="无">
  </Card>
</CardGrid>

## 安装

插件安装方式包含以下两种：

::: tabs
@tab 1. 手动

1. 获取插件仓库源码并下载，将源码中的插件目录直接拷贝到 fba 项目对应的目录下
2. 如果插件包含依赖，执行 `backend/scripts/init_plugin.py` 文件安装依赖
3. 根据插件使用说明完成安装

@tab 2. 自动

1. 获取打包好的插件 zip 压缩包 <Badge type="warning" text="二选一" />

   - 下载插件 GitHub 仓库为 zip 压缩包

     ::: details 示例
     ![cg1](/images/plugin_zip.png)
     :::

   - 通过 fba 插件打包接口创建的 zip 压缩包

2. 将压缩包通过插件安装接口进行安装
3. 根据插件使用说明完成安装

:::

::: warning
无论采用哪种安装方式，插件都不会实时加载，您必须重新启动 fba，插件才能被正确加载到当前系统中
:::
