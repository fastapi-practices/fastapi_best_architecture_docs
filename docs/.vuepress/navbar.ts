import { defineNavbarConfig, ThemeNavItem } from "vuepress-theme-plume";

export const myNavbar: ThemeNavItem[] = defineNavbarConfig([
    {
        text: "Guide",
        icon: "material-symbols:menu-book-outline",
        items: [
            {
                text: "工程化",
                items: [
                    {
                        text: "架构",
                        icon: "material-symbols:account-tree-outline",
                        link: "/architecture",
                    },
                    {
                        text: "CLI",
                        icon: "material-symbols:terminal",
                        link: "/cli",
                    },
                ],
            },
            {
                text: "后端",
                items: [
                    {
                        text: "快速开始",
                        icon: "material-symbols:rocket-launch-outline",
                        link: "/backend/summary/quick-start",
                    },
                    {
                        text: "接口文档",
                        icon: "material-symbols:description-outline",
                        link: "https://apifox.com/apidoc/shared-28a93f02-730b-4f33-bb5e-4dad92058cc0",
                    },
                ],
            },
            {
                text: "前端",
                items: [
                    {
                        text: "Arco UI",
                        badge: { text: "已弃用", type: "danger" },
                        icon: "material-symbols:space-dashboard-outline",
                        link: "/frontend/summary/arco",
                    },
                    {
                        text: "Vben UI",
                        icon: "material-symbols:widgets-outline",
                        link: "/frontend/summary/intro",
                    },
                ],
            },
            {
                text: "更多",
                items: [
                    {
                        text: "更新记录",
                        icon: "material-symbols:history",
                        link: "https://github.com/fastapi-practices/fastapi-best-architecture/blob/master/CHANGELOG.md",
                    },
                    {
                        text: "参与贡献",
                        icon: "material-symbols:group-add-outline",
                        link: "https://github.com/fastapi-practices/fastapi-best-architecture/tree/master/backend#contributing",
                    },
                ],
            },
        ],
    },
    {
        text: "AI 赋能",
        icon: "fluent-emoji-flat:brain",
        items: [
            {
                text: "Skills",
                icon: "hugeicons:language-skill",
                link: "/ai/skills",
            },
            {
                text: "MCP",
                icon: "flat-color-icons:mind-map",
                link: "/ai/mcp",
            },
            {
                text: "Prompt",
                icon: "fluent-emoji-flat:memo",
                link: "/ai/prompt",
            },
            {
                text: "LLMs.txt",
                icon: "fluent-emoji-flat:robot",
                link: "/ai/llms",
            },
        ],
    },
    {
        text: "生态系统",
        icon: "material-symbols:hub-outline",
        items: [
            {
                text: "资源",
                items: [
                    // {
                    //     text: '架构',
                    //     icon: 'carbon:ibm-deployable-architecture',
                    //     link: '/architecture'
                    // },
                    {
                        text: "技术栈",
                        icon: "material-symbols:stack",
                        link: "/stack",
                    },
                    {
                        text: "官方开源",
                        icon: "simple-icons:github",
                        link: "/open-source",
                    },
                    {
                        text: "社区开源",
                        icon: "material-symbols:groups-outline",
                        link: "/community-open-source",
                    },
                ],
            },
            {
                text: "互动",
                items: [
                    {
                        text: "交流群",
                        icon: "ic:baseline-wechat",
                        link: "/group",
                    },
                    {
                        text: "作者主页",
                        icon: "mdi:web",
                        link: "https://wu-clan.github.io/homepage",
                    },
                    {
                        text: "Github 问题",
                        icon: "mdi:bug-outline",
                        link: "https://github.com/fastapi-practices/fastapi-best-architecture/issues",
                    },
                    {
                        text: "Github 讨论",
                        icon: "mdi:forum-outline",
                        link: "https://github.com/fastapi-practices/fastapi-best-architecture/discussions",
                    },
                    {
                        text: "想法和建议",
                        icon: "material-symbols:lightbulb-outline",
                        link: "https://discord.gg/xp8M6nY4NA",
                    },
                    {
                        text: "我要催更",
                        icon: "material-symbols:notifications-active-outline",
                        link: "https://discord.gg/JyedBeHXkn",
                    },
                ],
            },
            {
                text: "课程",
                items: [
                    {
                        text: "视频课程",
                        badge: { text: "已过时", type: "danger" },
                        icon: "ri:bilibili-fill",
                        link: "https://space.bilibili.com/284237214/lists",
                    },
                ],
            },
            {
                text: "动态",
                items: [
                    {
                        text: "博客",
                        badge: { text: "充电站", type: "tip" },
                        icon: "material-symbols:article-outline",
                        link: "/blog/",
                    },
                ],
            },
        ],
    },
    {
        text: "插件系统",
        icon: "flat-color-icons:puzzle",
        items: [
            {
                text: "文档",
                items: [
                    {
                        text: "前言",
                        icon: "flat-color-icons:document",
                        link: "/plugin/before",
                    },
                    {
                        text: "插件开发",
                        icon: "flat-color-icons:command-line",
                        link: "/plugin/dev",
                    },
                    {
                        text: "插件分享",
                        icon: "flat-color-icons:share",
                        link: "/plugin/share",
                    },
                    {
                        text: "插件安装",
                        icon: "flat-color-icons:download",
                        link: "/plugin/install",
                    },
                ],
            },
            {
                text: "更多",
                items: [
                    {
                        text: "插件市场",
                        icon: "flat-color-icons:shop",
                        badge: { text: 'NEW', type: 'tip' },
                        link: "/marketplace",
                    },
                ],
            },
        ],
    },
    {
        text: "Pricing",
        icon: "streamline-color:bag-dollar",
        link: "/pricing",
    },
    {
        text: "赞助",
        icon: "fluent-emoji-flat:red-heart",
        link: "/sponsors",
    },
    {
        text: "关于",
        icon: "material-symbols:info-outline",
        items: [
            {
                text: "常见问题",
                icon: "material-symbols:quiz-outline",
                link: "/questions.md",
            },
            {
                text: "用户登记",
                icon: "material-symbols:person-check-outline",
                link: "/users",
            },
            {
                text: "社区团队",
                icon: "material-symbols:group-outline",
                link: "/team",
            },
            {
                text: "隐私政策",
                icon: "material-symbols:policy-outline",
                link: "/privacy-policy",
            },
        ],
    },
]);
