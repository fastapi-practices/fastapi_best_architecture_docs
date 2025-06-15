import { PluginItem } from '../components/PluginMarket.vue'

export const pluginItems: PluginItem[] = [
    {
        icon: "fa6-regular:file-code",
        title: "代码生成",
        description: "生成通用业务代码（仅后端工程）",
        tags: ["MySQL", "PostgreSQL", "后端"],
        priceLabel: "免费"
    },
    {
        icon: "fe:notice-active",
        title: "通知公告",
        description: "发布系统内部通知、公告",
        tags: ["MySQL", "PostgreSQL", "后端"],
        priceLabel: "免费"
    },
    {
        icon: "fluent-mdl2:dictionary",
        title: "数据字典",
        description: "通常用于约束前端工程数据展示",
        tags: ["MySQL", "PostgreSQL", "后端"],
        priceLabel: "免费"
    },
    {
        icon: "icon-park-outline:config",
        title: "参数配置",
        description: "通常用于前端工程数据展示",
        tags: ["MySQL", "PostgreSQL", "后端"],
        priceLabel: "免费"
    },
    {
        icon: "logos:oauth",
        title: "OAuth 2.0",
        description: "通过 OAuth 2.0 的方式登录系统",
        tags: ["MySQL", "PostgreSQL", "后端"],
        priceLabel: "免费"
    },
    {
        icon: "charm:shield-keyhole",
        title: "Casbin-RBAC",
        description: "基于 Casbin 实现的 RBAC 权限",
        tags: ["MySQL", "PostgreSQL", "后端"],
        link: "https://github.com/fastapi-practices/fba_casbin",
        image: "https://avatars.githubusercontent.com/u/27810343?s=200&v=4",
        priceLabel: "免费"
    },
    {
        icon: "streamline:ai-prompt-spark",
        title: "MCP ChatGPT",
        description: "提供了 MCP 服务器管理功能，并支持调用 MCP 进行 AI 聊天",
        tags: ["MySQL", "PostgreSQL", "后端"],
        link: "https://github.com/fastapi-practices/fba_mcp",
        image: "https://github.com/modelcontextprotocol/.github/raw/main/profile/assets/light.png",
        priceLabel: "免费"
    },
    {
        icon: "ant-design:aliyun-outlined",
        title: "阿里云 oss",
        description: "阿里云 oss 文件上传",
        tags: ["MySQL", "PostgreSQL", "后端"],
        link: "https://github.com/fastapi-practices/fba_aliyun_oss",
        image: "https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png",
        priceLabel: "免费"
    },
    {
        icon: "material-symbols:token-outline",
        title: "配置下发",
        description: "将 env 等配置信息通过数据库进行管理",
        tags: ["MySQL", "后端", "前端"],
        link: "https://github.com/dividduang/option",
        priceLabel: "免费"
    },
    {
        icon: "ant-design:wechat-work-outlined",
        title: "企微 bot 定时任务",
        description: "定时调用企业微信群聊机器人发送消息",
        tags: ["MySQL", "后端"],
        link: "https://github.com/dividduang/wecom-task",
        image: "https://rescdn.qqmail.com/node/wework/images/Slice.d2258f37eb.png",
        priceLabel: "免费"
    },
    {
        icon: "arcticons:sso-plus",
        title: "Casdoor SSO",
        description: "通过 Casdoor 实现 SSO 单点登录集成",
        tags: ["MySQL", "PostgreSQL", "后端"],
        link: "/fastapi_best_architecture_docs/planet.html",
        image: "https://casdoor.org/zh/img/casdoor.png",
        priceLabel: "付费"
    },
    {
        icon: "material-icon-theme:authors",
        title: "LDAP",
        description: "通过 LDAP 登录系统并授权",
        tags: ["MySQL", "PostgreSQL", "后端"],
        link: "https://github.com/dividduang/fba_plugin_ldap",
        image: "https://i0.wp.com/ldap.com/wp-content/uploads/2018/04/ldapdotcom-white-background-with-text-1024x341.png",
        priceLabel: "免费"
    },
]
