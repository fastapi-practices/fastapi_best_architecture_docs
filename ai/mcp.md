---
url: /fastapi_best_architecture_docs/ai/mcp.md
---
[MCP 介绍](../blog/claude-ai-ecosystem.md){.read-more}

## ace (Augment Context Engine)

官网：[ace](https://www.augmentcode.com/context-engine)

相关文章：[linuxdo#1360514](https://linux.do/t/topic/1360514)

首当其冲的绝对是它，ace 绝对是无与伦比的存在，检索快，定位准；

但其存在国内账号注册难，订阅开通难，费用昂贵，易封号等多重机制，只能说是且用且珍惜

## fetch

源码：[fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)

MCP 官方实现，使 LLM 能够从网页中检索和处理内容，并将 HTML 转换为 Markdown 以便于阅读和使用，虽然目前很多 LLM 已经内置 web
搜索引擎，但 fetch 仍可作为本级支持的一部分（免费）

## playwright

源码：[playwright-mcp](https://github.com/microsoft/playwright-mcp)

Playwright 是由微软（Microsoft）在 2020 年初开源的现代化 Web 测试与自动化框架，而 playwright-mcp 能够使 LLM
通过结构化的可访问性快照与网页进行交互，从而无需依赖屏幕截图或视觉调整后的模型
