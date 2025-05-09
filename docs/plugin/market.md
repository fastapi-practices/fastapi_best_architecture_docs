---
title: 插件市场
aside: false
---

::: info 标签说明

<Badge text="pay" color="#ef4444" bg-color="rgba(239, 68, 68, 0.1)" border-color="rgba(239, 68, 68, 0.2)" /> [+pay] | 
<Badge text="MySQL" color="#006484" bg-color="rgba(0, 100, 132, 0.1)" border-color="rgba(0, 100, 132, 0.2)" /> [+MySQL] | 
<Badge text="PostgreSQL" color="#336699" bg-color="rgba(51, 102, 153, 0.1)" border-color="rgba(51, 102, 153, 0.2)" /> [+PostgreSQL] | 
<Badge text="fba" color="#8b5cf6" bg-color="rgba(139, 92, 246, 0.1)" border-color="rgba(139, 92, 246, 0.2)" /> [+fba] | 
<Badge text="fba_ui" color="#a855f7" bg-color="rgba(168, 85, 247, 0.1)" border-color="rgba(168, 85, 247, 0.2)" /> [+fba_ui] | 
<Badge text="app" color="#f97316" bg-color="rgba(249, 115, 22, 0.1)" border-color="rgba(249, 115, 22, 0.2)" /> [+app] | 
<Badge text="extra" color="#64748b" bg-color="rgba(100, 116, 139, 0.1)" border-color="rgba(100, 116, 139, 0.2)" /> [+extra]

:::

[+pay]: 付费插件
[+MySQL]: 支持 MySQL
[+PostgreSQL]: 支持 PostgreSQL
[+fba]: 仅后端代码插件
[+fba_ui]: 包含前端 [Vben Admin Antd](https://github.com/fastapi-practices/fastapi_best_architecture_ui) 代码插件
[+app]: 应用级插件
[+extra]: 扩展级插件

<script setup lang="ts">
import { pluginItems } from '@source/.vuepress/data/plugin'
</script>

<PluginMarket :items="pluginItems" />
