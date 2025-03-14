---
title: vscode
---

::: tip
此章节仅限于 vscode 后端开发用户
:::

## DEBUG

以下是 vscode 中的 launch.json 配置

```json5
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "fba 调试程序",
      "type": "debugpy",
      "request": "launch",
      "module": "uvicorn",
      "console": "integratedTerminal",
      "envFile": "${workspaceFolder}/backend/.env",
      "args": [
        "backend.main:app",
        "--host",
        "0.0.0.0",
        "--port",
        "8000",
        "--reload"
      ],
      "justMyCode": true
    }
  ]
}
```

### 效果图

![vscode 调试](/images/vscode_debug.png)
