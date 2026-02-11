---
url: /fastapi_best_architecture_docs/ai/llms.md
---
本指南介绍如何让 Cursor、Windsurf 和 Claude 等 AI 工具更好地理解 fba

## 什么是 llms.txt？

我们支持通过 llms.txt 文件向大语言模型（llms）提供 fba 文档。此功能可帮助 AI 工具更好地理解我们的组件库、API 及使用模式

## 可用资源

我们提供多个 llms.txt 路由来帮助 AI 工具访问文档：

* [llms.txt](https://docs.fba.wu-clan.cc/fastapi_best_architecture_docs/llms.txt) - 包含所有组件及其文档链接的结构化概览
* [llms-full.txt](https://docs.fba.wu-clan.cc/fastapi_best_architecture_docs/llms-full.txt) - 提供包含实现细节和示例的完整文档

## 在 AI 工具中的使用

### Cursor

在 Cursor 中使用 @Docs 功能将 llms.txt 文件包含到您的项目中。这有助于 Cursor 为 fba 组件提供更准确的代码建议和文档

[详细了解 Cursor 中的 @Docs 功能](https://cursor.com/cn/docs/context/mentions#docs)

### Claude Code

在 Claude Code 中，将 llms.txt 添加到工作区的知识库（Docs / Context Files）配置中，即可在代码补全与解释时引用其中的内容，从而提升对
fba 组件的理解

[详细了解 Claude Code 文档上下文配置](https://code.claude.com/docs)

### Gemini CLI

在 Gemini CLI 中，可以通过 --context 参数或在 .gemini/config.json 中指定 llms.txt 文件路径，让 Gemini 在回答和生成代码时参考该文档

[详细了解 Gemini CLI 上下文配置](https://ai.google.dev/gemini-api/docs?hl=zh-cn)

## 其他 AI 工具

任何支持 llms.txt 的 AI 工具均可使用以上路径来更好地理解 fba
