---
title: 插件市场
aside: false
---

::: info 标签说明

- <Icon name="logos:mysql" size="1.5em" /> - 支持 MySQL
- <Icon name="vscode-icons:file-type-pgsql" size="1.5em" /> - 支持 PostgreSQL
- <Badge type="danger" text="pay" /> - 付费插件
- <Badge type="tip" text="fba" /> - 仅后端代码插件
- <Badge text="fba_ui" color="#8e5cd9" bg-color="rgba(159, 122, 234, 0.16)"/> - 包含前端 [fastapi_best_architecture_ui](https://github.com/fastapi-practices/fastapi_best_architecture_ui) 代码插件 <Badge type="warning" text="暂无此计划" />
- <Badge text="app" color="var(--vp-c-text-2)" bg-color="rgb(250 150 0 / 38%)"/> - 应用级插件
- <Badge text="extra" color="var(--vp-c-text-2)" bg-color="rgb(17 170 0 / 38%)"/> - 扩展级插件

:::

## 内置

<CardGrid>
  <Card icon="fa6-regular:file-code" title="代码生成">
    <p style="color: #898989;">生成通用业务代码（目前仅包含后端工程）</p>
    <span>
    <Icon name="logos:mysql" size="1.5em" />
    ·
    <Icon name="vscode-icons:file-type-pgsql" size="1.5em" />
    ·
    <Badge type="tip" text="fba" />
    ·
    <Badge text="app" color="var(--vp-c-text-2)" bg-color="rgb(250 150 0 / 38%)"/>
    </span>
  </Card>
  <Card icon="fe:notice-active" title="通知公告">
    <p style="color: #898989;">发布系统内部通知、公告</p>
    <span> 
    <Icon name="logos:mysql" size="1.5em" />
    ·
    <Icon name="vscode-icons:file-type-pgsql" size="1.5em" />
    ·
    <Badge type="tip" text="fba" />
    ·
    <Badge text="extra" color="var(--vp-c-text-2)" bg-color="rgb(17 170 0 / 38%)"/>
    </span>
  </Card>
  <Card icon="fluent-mdl2:dictionary" title="数据字典">
    <p style="color: #898989;">通常用于约束前端工程数据展示</p>
    <span>
    <Icon name="logos:mysql" size="1.5em" />
    ·
    <Icon name="vscode-icons:file-type-pgsql" size="1.5em" />
    ·
    <Badge type="tip" text="fba" />
    ·
    <Badge text="extra" color="var(--vp-c-text-2)" bg-color="rgb(17 170 0 / 38%)"/>
    </span>
  </Card>
  <Card icon="icon-park-outline:config" title="参数配置">
    <p style="color: #898989;">通常用于前端工程数据展示</p>
    <span>
    <Icon name="logos:mysql" size="1.5em" />
    ·
    <Icon name="vscode-icons:file-type-pgsql" size="1.5em" />
    ·
    <Badge type="tip" text="fba" />
    ·
    <Badge text="extra" color="var(--vp-c-text-2)" bg-color="rgb(17 170 0 / 38%)"/>
    </span>
  </Card>
</CardGrid>

## 官方

这些插件由 fba 开发人员提供和维护

<CardGrid>
  <LinkCard icon="charm:shield-keyhole" title="Casbin-RBAC" href="https://github.com/fastapi-practices/fba_casbin">
    <p style="color: #898989;">基于 Casbin 实现的 RBAC 权限</p>
    <span>
    <Icon name="logos:mysql" size="1.5em" />
    ·
    <Icon name="vscode-icons:file-type-pgsql" size="1.5em" />
    ·
    <Badge type="tip" text="fba" />
    ·
    <Badge text="extra" color="var(--vp-c-text-2)" bg-color="rgb(17 170 0 / 38%)"/>
    </span>
  </LinkCard>
  <LinkCard icon="ant-design:aliyun-outlined" title="阿里云 oss" href="https://github.com/fastapi-practices/fba_aliyun_oss">
    <p style="color: #898989;">阿里云 oss 文件上传</p>
    <span>
    <Icon name="logos:mysql" size="1.5em" />
    ·
    <Icon name="vscode-icons:file-type-pgsql" size="1.5em" />
    ·
    <Badge type="tip" text="fba" />
    ·
    <Badge text="extra" color="var(--vp-c-text-2)" bg-color="rgb(17 170 0 / 38%)"/>
    </span>
  </LinkCard>
  <LinkCard icon="streamline:ai-prompt-spark" title="MCP ChatGPT" href="https://github.com/fastapi-practices/fba_mcp">
    <p style="color: #898989;">带有 MCP 服务器调用的 AI 对话</p>
    <span>
    <Icon name="logos:mysql" size="1.5em" />
    ·
    <Icon name="vscode-icons:file-type-pgsql" size="1.5em" />
    ·
    <Badge type="tip" text="fba" />
    ·
    <Badge text="extra" color="var(--vp-c-text-2)" bg-color="rgb(17 170 0 / 38%)"/>
    </span>
  </LinkCard>
</CardGrid>

## 第三方

这些插件由社区中的开发者提供和维护

<CardGrid>
  <LinkCard icon="ant-design:aliyun-outlined" title="配置下发" href="https://github.com/dividduang/option">
    <p style="color: #898989;">将 env 等配置信息通过数据库进行管理</p>
    <span>
    <Icon name="logos:mysql" size="1.5em" />
    ·
    <Badge type="tip" text="fba" />
    ·
    <Badge text="extra" color="var(--vp-c-text-2)" bg-color="rgb(17 170 0 / 38%)"/>
    </span>
  </LinkCard>
  <LinkCard icon="ant-design:wechat-work-outlined" title="企微 bot 定时任务" href="https://github.com/dividduang/wecom-task">
    <p style="color: #898989;">定时调用企业微信群聊机器人发送消息</p>
    <span>
    <Icon name="logos:mysql" size="1.5em" />
    ·
    <Badge type="tip" text="fba" />
    ·
    <Badge text="extra" color="var(--vp-c-text-2)" bg-color="rgb(17 170 0 / 38%)"/>
    </span>
  </LinkCard>
</CardGrid>
