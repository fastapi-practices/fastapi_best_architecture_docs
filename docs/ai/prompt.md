---
title: Prompt
---

提示词不以多取胜，而是可用性，无效的提示词反而会给 LLM 带来负担

[Prompt 介绍](../blog/claude-ai-ecosystem.md){.read-more}

## Git 操作

```markdown
## Git

Disable any automatic git save related actions (add, commit...).
```

## 文件写入

```markdown
## File write

When writing too much file content at one time, always write in batches.
```

## 插件任务

::: tip
使用前需安装 fba skill：

<FbaSkillInstall />
<llm-only>

@[code txt](../code/fba-skill-install.txt)

</llm-only>

:::

```markdown
使用 fba skill 处理插件任务：<例如：将现有功能改造成插件 / 开发新插件 / 检查并准备发布>

- 项目或插件目录：<目录>
- 插件名：<plugin_name>
- 插件类型：<backend / frontend>

先阅读相关规范并给出简短方案，等我确认后再修改
完成后运行必要校验，并在发布前完成插件市场自检
如果当前环境缺少 fba skill 或其他必要工具，请先提醒我，不要自行安装或假设可用
未经我明确同意，不要执行 git add、commit、push、fork 或 PR 操作
```
