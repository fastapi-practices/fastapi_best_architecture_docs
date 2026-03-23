---
title: 插件分享
---

想要将插件与他人分享，您必须为此创建一个公开的 Github 仓库

## 后端

::: warning 插件仓库命名规则
`插件名 == 仓库名` -> `ai == ai`

插件总是独一无二的，不允许安装同名插件，所以在对插件进行命名时，应尽量保持其独特性
:::

:::: steps

1. 创建插件 Github 仓库

   推荐通过 [fba_plugin_template](https://github.com/fastapi-practices/fba_plugin_template)
   创建。模板仓库内当前没有实质性内容，只是为了能够更好的将插件与 fba 关联起来

   ![repo](/images/plugin_template.png)

2. 上传代码

   将在 fba 中开发好的所有插件代码提交到刚刚创建的插件 Github 仓库中

   ::: important
   应拷贝插件目录中的所有文件，而不是拷贝插件目录
   :::

::::

## 前端

::: warning 插件仓库命名规则
`插件名 == 仓库名_ui` -> `ai == ai_ui`

为了更好的与后端插件进行区分，必须为前端插件仓库名添加 `_ui` 后缀

插件总是独一无二的，不允许安装同名插件，所以在对插件进行命名时，应尽量保持其独特性
:::

:::: steps

1. 创建个人插件仓库

   推荐通过 [fba_ui_plugin_template](https://github.com/fastapi-practices/fba_ui_plugin_template) 创建，原因与后端相同

2. 上传代码

   将在 fba_ui 中开发好的所有插件代码提交到刚刚创建的插件 Github
   仓库中，仅限 [Vben Admin Antd](../frontend/summary/intro.md) 工程

   ::: important
   应拷贝插件目录中的所有文件，而不是拷贝插件目录
   :::

::::

## 发布插件

要想发布插件，你需要为 fba 插件仓库创建一个 PR.

::: tip
插件总是独一无二的，如果插件名已存在，那你只能选择为即将发布的插件换个新名字
:::

:::: steps

1. Fork 仓库

   [进入 fba 插件 github 仓库](https://github.com/fastapi-practices/plugins)，将仓库 fork 到个人账户

2. 克隆仓库

   ```shell
   # 将地址替换为上面 fork 的仓库地址
   git clone https://github.com/your-username/plugins.git
   ```

3. 创建分支

   ```shell
   # 注意替换 add-your-plugin-branch
   git checkout -b add-your-plugin-branch
   ```

4. 扩展子模块

   ```shell
   # 注意替换 your-username、your-plugin-name
   git submodule add https://github.com/your-username/your-plugin-name.git plugins/your-plugin-name
   git add plugins/your-plugin-name
   ```

   ::: warning
   所有扩展子模块必须使用 HTTPS URL，而不是 SSH URL（git@github.com）
   :::

5. 提交和推送

   ```shell
   # 注意替换 your-plugin-name
   git commit -m "Add your-plugin-name plugin"
   ```

   ```shell
   # 注意替换 add-your-plugin-branch
   git push --set-upstream origin add-your-plugin-branch
   ```

6. PR

   通过 GitHub 创建 PR

7. 合并

   fba 团队将尽快完成检查，一旦您的 PR 合并，插件将被发布到 [插件市场](../marketplace.md)

::::

## 更新插件

要想更新插件，你需要为 fba 插件 github 仓库创建一个 PR.

执行与发布相同的步骤，并更新以下行为：

- 更新步骤 4 中的命令

  ```shell
  git submodule update --remote plugins/your-plugin-name
  git add plugins/your-plugin-name
  ```

- 更新步骤 5 中的提交信息，现在已不再是新增，而是更新

::: info
如果你想自动执行此过程，可以使用 [GitHub Action](https://github.com/fastapi-practices/plugin-release)
:::