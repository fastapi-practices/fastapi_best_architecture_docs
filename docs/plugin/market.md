---
title: 插件市场
aside: false
---

::: info 标签说明

- <Badge text="MySQL" color="#006484" bg-color="rgba(0, 100, 132, 0.1)" border-color="rgba(0, 100, 132, 0.2)" /> - 支持 MySQL
- <Badge text="PostgreSQL" color="#336699" bg-color="rgba(51, 102, 153, 0.1)" border-color="rgba(51, 102, 153, 0.2)" /> - 支持 PostgreSQL
- <Badge text="fba" color="#8b5cf6" bg-color="rgba(139, 92, 246, 0.1)" border-color="rgba(139, 92, 246, 0.2)" /> - 仅后端代码插件
- <Badge text="fba_ui" color="#a855f7" bg-color="rgba(168, 85, 247, 0.1)" border-color="rgba(168, 85, 247, 0.2)" /> - 包含前端 [fastapi_best_architecture_ui](https://github.com/fastapi-practices/fastapi_best_architecture_ui) 代码插件 <Badge type="warning" text="暂无此计划" />
- <Badge text="app" color="#f97316" bg-color="rgba(249, 115, 22, 0.1)" border-color="rgba(249, 115, 22, 0.2)" /> - 应用级插件
- <Badge text="extra" color="#64748b" bg-color="rgba(100, 116, 139, 0.1)" border-color="rgba(100, 116, 139, 0.2)" /> - 扩展级插件
- <Badge text="pay" color="#ef4444" bg-color="rgba(239, 68, 68, 0.1)" border-color="rgba(239, 68, 68, 0.2)" /> - 付费插件
- <Badge text="free" color="#10b981" bg-color="rgba(16, 185, 129, 0.1)" border-color="rgba(16, 185, 129, 0.2)" /> - 免费插件

:::

<script setup lang="ts">
import { pluginItems } from '@source/.vuepress/data/plugin'
</script>

<PluginMarket :items="pluginItems" />
