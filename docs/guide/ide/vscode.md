---
title: vscode
---

官网地址：[visualstudio](https://code.visualstudio.com/)

## DEBUG

如果你想在 vscode 中对 fba 进行调试，请创建 `.vscode/launch.json` 文件并添加以下配置

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "fba 调试程序",
      "type": "debugpy",
      "request": "launch",
      "module": "uvicorn",
      "console": "integratedTerminal",
      // 指定 python 解释器，请根据实际情况自行修改
      //"python": "${workspaceFolder}/.venv/bin/python", // MacOS or Linux
      //"python": "${workspaceFolder}/.venv/Scripts/python.exe",  // Windows
      "env": {
        "PYTHONPATH": "${workspaceFolder};${env:PYTHONPATH}",
      },
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
