import { PluginItem } from '../components/PluginMarket.vue'

export const pluginItems: PluginItem[] = [
    {
        icon: "fa6-regular:file-code",
        title: "代码生成",
        description: "生成通用业务代码（仅后端工程）",
        tags: ["MySQL", "PostgreSQL", "fba", "app"],
        githubUser: 'wu-clan'
    },
    {
        icon: "fe:notice-active",
        title: "通知公告",
        description: "发布系统内部通知、公告",
        tags: ["MySQL", "PostgreSQL", "fba", "extra"],
        githubUser: 'wu-clan'
    },
    {
        icon: "fluent-mdl2:dictionary",
        title: "数据字典",
        description: "通常用于约束前端工程数据展示",
        tags: ["MySQL", "PostgreSQL", "fba", "extra"],
        githubUser: 'wu-clan'
    },
    {
        icon: "icon-park-outline:config",
        title: "参数配置",
        description: "通常用于前端工程数据展示",
        tags: ["MySQL", "PostgreSQL", "fba", "extra"],
        githubUser: 'wu-clan'
    },
    {
        icon: "charm:shield-keyhole",
        title: "Casbin-RBAC",
        description: "基于 Casbin 实现的 RBAC 权限",
        tags: ["MySQL", "PostgreSQL", "fba", "extra"],
        link: "https://github.com/fastapi-practices/fba_casbin",
        image: "https://avatars.githubusercontent.com/u/27810343?s=200&v=4",
        githubUser: 'wu-clan'
    },
    {
        icon: "streamline:ai-prompt-spark",
        title: "MCP ChatGPT",
        description: "带有 MCP 服务器调用的 AI 对话",
        tags: ["MySQL", "PostgreSQL", "fba", "extra"],
        link: "https://github.com/fastapi-practices/fba_mcp",
        image: "https://github.com/modelcontextprotocol/.github/raw/main/profile/assets/light.png",
        githubUser: 'wu-clan'
    },
    {
        icon: "ant-design:aliyun-outlined",
        title: "阿里云 oss",
        description: "阿里云 oss 文件上传",
        tags: ["MySQL", "PostgreSQL", "fba", "extra"],
        link: "https://github.com/fastapi-practices/fba_aliyun_oss",
        image: "https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png",
        githubUser: 'wu-clan'
    },
    {
        icon: "material-symbols:token-outline",
        title: "配置下发",
        description: "将 env 等配置信息通过数据库进行管理",
        tags: ["MySQL", "fba", "extra"],
        link: "https://github.com/dividduang/option",
        githubUser: 'dividduang'
    },
    {
        icon: "ant-design:wechat-work-outlined",
        title: "企微 bot 定时任务",
        description: "定时调用企业微信群聊机器人发送消息",
        tags: ["MySQL", "fba", "extra"],
        link: "https://github.com/dividduang/wecom-task",
        image: "https://rescdn.qqmail.com/node/wework/images/Slice.d2258f37eb.png",
        githubUser: 'dividduang'
    }
]
