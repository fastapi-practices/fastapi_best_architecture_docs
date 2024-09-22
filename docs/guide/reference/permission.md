---
title: 权限
createTime: 2024/09/16 22:48:13
---

## JWT

TODO

## RBAC

RBAC 提供了两种解决方案，第一种【角色菜单】可能更加常见，它可以设置按钮级别的控制规则，另外一种是【Casbin】，它非常灵活，可以通过模型定义多种
控制规则（我认为它很好，性能也很出色），这种设计在 Go 语言中应用更加广泛， 我们在最初架构设计时，参考了 go-admin，gin-vue-admin... 等优秀
的开源项目，同时引入了 Casbin，它在众多 python web 开源项目中可能是极为罕见的，并且，它的学习成本相对较高，如果你对此感兴趣，可以通过 
[Casbin 官网](https://casbin.org/docs/get-started) 进行学习，另外，这两个视频教程 （
[半小时彻底弄懂Casbin基础模型](https://www.bilibili.com/video/BV1qz4y167XP/?spm_id_from=333.999.0.0&vd_source=958c4d7f9243c68a0ec9dcd327bad930)、
[Casbin的代码使用、api调用、自定义比较方法](https://www.bilibili.com/video/BV13r4y1M7AC/?spm_id_from=333.999.0.0&vd_source=958c4d7f9243c68a0ec9dcd327bad930)
） 可能起到画龙点睛之笔

### 角色菜单

TODO

### Casbin

TODO
