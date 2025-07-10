import { PluginItem } from '../components/PluginMarket.vue'

export const pluginItems: PluginItem[] = [
    {
        icon: "fa6-regular:file-code",
        title: "代码生成",
        description: "生成通用业务代码（仅后端工程）",
        tags: ["mysql", "pgsql", "后端"]
    },
    {
        icon: "fe:notice-active",
        title: "通知公告",
        description: "发布系统内部通知、公告",
        tags: ["mysql", "pgsql", "后端"]
    },
    {
        icon: "fluent-mdl2:dictionary",
        title: "数据字典",
        description: "通常用于约束前端工程数据展示",
        tags: ["mysql", "pgsql", "后端"]
    },
    {
        icon: "icon-park-outline:config",
        title: "参数配置",
        description: "通常用于前端工程数据展示",
        tags: ["mysql", "pgsql", "后端"]
    },
    {
        icon: "logos:oauth",
        title: "OAuth 2.0",
        description: "通过 OAuth 2.0 的方式登录系统",
        tags: ["mysql", "pgsql", "后端"]
    },
    {
        icon: "charm:shield-keyhole",
        title: "Casbin-RBAC",
        description: "基于 Casbin 实现的 RBAC 权限",
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/fastapi-practices/casbin_rbac",
        image: "https://avatars.githubusercontent.com/u/27810343?s=200&v=4"
    },
    {
        icon: "codicon:mcp",
        title: "MCP 服务器管理",
        description: "提供了 MCP 服务器管理功能，并添加了可调用 MCP 的 AI 聊天接口",
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/fastapi-practices/mcp",
    },
    {
        icon: "ant-design:aliyun-outlined",
        title: "阿里云 oss",
        description: "阿里云 oss 文件上传",
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/fastapi-practices/aliyun_oss",
        image: "https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png"
    },
    {
        icon: "material-symbols:token-outline",
        title: "配置下发",
        description: "将 env 等配置信息通过数据库进行管理",
        tags: ["mysql", "后端", "前端"],
        link: "https://github.com/dividduang/option"
    },
    {
        icon: "ant-design:wechat-work-outlined",
        title: "企微 bot 定时任务",
        description: "定时调用企业微信群聊机器人发送消息",
        tags: ["mysql", "后端"],
        link: "https://github.com/dividduang/wecom-task",
        image: "https://rescdn.qqmail.com/node/wework/images/Slice.d2258f37eb.png"
    },
    {
        icon: "arcticons:sso-plus",
        title: "Casdoor SSO",
        description: "通过 Casdoor 实现 SSO 单点登录集成",
        tags: ["mysql", "pgsql", "后端"],
        link: "/fastapi_best_architecture_docs/planet.html",
        image: "https://casdoor.org/zh/img/casdoor.png",
        free: false
    },
    {
        icon: "material-icon-theme:authors",
        title: "LDAP",
        description: "通过 LDAP 登录系统并授权",
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/dividduang/ldap_auth",
        image: "https://www.cleo.com/sites/default/files/2023-12/ldap-integration.png"
    },
    {
        icon: "fa-solid:sms",
        title: "腾讯云 sms",
        description: "通过腾讯云短信服务发送短信验证码",
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/RanY-Luck/fba_plugin_sms",
        image: "https://zhangzifan.com/uploads/2017/08/Tencent-Cloud-SMS.png"
    },
]
