import { PluginItem } from '../components/PluginMarket.vue'

export const pluginItems: PluginItem[] = [
    {
        icon: "fa6-regular:file-code",
        title: "代码生成",
        description: "生成通用业务代码",
        tags: ["mysql", "pgsql", "后端", "前端"],
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png'
    },
    {
        icon: "fe:notice-active",
        title: "通知公告",
        description: "发布系统内部通知、公告",
        tags: ["mysql", "pgsql", "后端", "前端"],
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png'
    },
    {
        icon: "fluent-mdl2:dictionary",
        title: "数据字典",
        description: "通常用于约束前端工程数据传输/展示",
        tags: ["mysql", "pgsql", "后端", "前端"],
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png'
    },
    {
        icon: "icon-park-outline:config",
        title: "参数配置",
        description: "通常用于动态配置系统参数/前端工程数据展示",
        tags: ["mysql", "pgsql", "后端", "前端"],
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png'
    },
    {
        icon: "logos:oauth",
        title: "OAuth 2.0",
        description: "通过 OAuth 2.0 的方式登录系统",
        tags: ["mysql", "pgsql", "后端"],
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png'
    },
    {
        icon: "ic:twotone-email",
        title: "Email",
        description: "发送电子邮件，例如验证码、通知等",
        tags: ["mysql", "pgsql", "后端"],
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png'
    },
    {
        icon: "charm:shield-keyhole",
        title: "Casbin-RBAC",
        description: "基于 Casbin 实现的 RBAC 权限",
        label: '官方',
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/fastapi-practices/casbin_rbac",
        image: "https://avatars.githubusercontent.com/u/27810343?s=200&v=4",
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png'
    },
    {
        icon: "codicon:mcp",
        title: "MCP 服务器管理",
        description: "提供了 MCP 服务器管理功能，并添加了可调用 MCP 的 AI 聊天接口",
        label: '官方',
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/fastapi-practices/mcp",
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png'
    },
    {
        icon: "ant-design:aliyun-outlined",
        title: "阿里云 oss",
        description: "阿里云 oss 文件上传",
        label: '官方',
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/fastapi-practices/aliyun_oss",
        image: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/alibabacloud-color.png",
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png'
    },
    {
        icon: "material-symbols:token-outline",
        title: "配置下发",
        description: "将 env 等配置信息通过数据库进行管理",
        label: '第三方',
        tags: ["mysql", "后端", "前端"],
        link: "https://github.com/dividduang/option",
        logo: 'https://avatars.githubusercontent.com/u/110005582?v=4',
    },
    {
        icon: "ant-design:wechat-work-outlined",
        title: "企微 bot 定时任务",
        description: "定时调用企业微信群聊机器人发送消息",
        label: '第三方',
        tags: ["mysql", "后端"],
        link: "https://github.com/dividduang/wecom-task",
        image: "https://play-lh.googleusercontent.com/Grc8X-UKT5qlDyUeGACwt9npfGFi8RM5N7lxZHfEtavSSu5zavMdv1YwBB3rHYokorw=w240-h480-rw",
        logo: 'https://avatars.githubusercontent.com/u/110005582?v=4',
    },
    {
        icon: "arcticons:sso-plus",
        title: "Casdoor SSO",
        description: "通过 Casdoor 实现 SSO 单点登录集成",
        label: '官方',
        tags: ["mysql", "pgsql", "后端"],
        link: "/fastapi_best_architecture_docs/planet.html",
        image: "https://casdoor.org/zh/img/casdoor.png",
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png',
        free: false
    },
    {
        icon: "material-icon-theme:authors",
        title: "LDAP",
        description: "通过 LDAP 登录系统并授权",
        label: '第三方',
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/dividduang/ldap_auth",
        image: "https://www.cleo.com/sites/default/files/2023-12/ldap-integration.png",
        logo: 'https://avatars.githubusercontent.com/u/110005582?v=4',
    },
    {
        icon: "fa-solid:sms",
        title: "腾讯云 sms",
        description: "通过腾讯云短信服务发送短信验证码",
        label: '第三方',
        tags: ["mysql", "pgsql", "后端"],
        link: "https://github.com/RanY-Luck/fba_plugin_sms",
        image: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/tencentcloud-color.png",
        logo: 'https://avatars.githubusercontent.com/u/67427627?v=4',
    },
]
