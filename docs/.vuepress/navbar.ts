import { defineNavbarConfig, ThemeNavItem } from "vuepress-theme-plume";

export const myNavbar: ThemeNavItem[] = defineNavbarConfig([
    {
        text: '神秘事件',
        icon: 'noto-v1:face-screaming-in-fear',
        link: '/events',
    },
    {
        text: 'v1.11.2',
        items: [
            {
                text: '在线体验',
                items: [
                    {
                        text: 'Vben UI',
                        icon: 'iconoir:www',
                        link: 'https://fba.wu-clan.site/',
                    },
                ]
            },
            {
                text: '后端',
                items: [
                    {
                        text: '快速开始',
                        icon: 'material-symbols:start',
                        link: '/backend/summary/quick-start'
                    },
                    {
                        text: '接口文档',
                        icon: 'simple-icons:apifox',
                        link: 'https://apifox.com/apidoc/shared-28a93f02-730b-4f33-bb5e-4dad92058cc0'
                    },
                ]
            },
            {
                text: '前端',
                items: [
                    {
                        text: 'Arco UI',
                        badge: { text: '已弃用', type: 'danger' },
                        icon: 'icon-park-outline:new-lark',
                        link: '/frontend/summary/arco',
                    },
                    {
                        text: 'Vben UI',
                        icon: 'simple-icons:antdesign',
                        link: '/frontend/summary/intro'
                    },
                ]
            },
            {
                text: '更多',
                items: [
                    {
                        text: '常见问题',
                        icon: 'healthicons:question',
                        link: '/questions.md'
                    },
                    {
                        text: '参与贡献',
                        icon: 'mdi:people-add',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/tree/master/backend#contributing'
                    },
                    {
                        text: '更新记录',
                        icon: 'stash:last-updates-duotone',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/CHANGELOG.md'
                    },
                ]
            },
        ]
    },
    {
        text: '生态系统',
        items: [
            {
                text: '资源',
                items: [
                    // {
                    //     text: '架构',
                    //     icon: 'carbon:ibm-deployable-architecture',
                    //     link: '/architecture'
                    // },
                    {
                        text: '技术栈',
                        icon: 'material-symbols:stack',
                        link: '/stack'
                    },
                    {
                        text: '官方开源',
                        icon: 'mdi:github',
                        link: '/open-source'
                    },
                    {
                        text: '社区开源',
                        icon: 'mdi:github',
                        link: '/community-open-source'
                    },
                ]
            },
            {
                text: '互动',
                items: [
                    {
                        text: '交流群',
                        icon: 'ic:baseline-wechat',
                        link: '/group'
                    },
                    {
                        text: '作者主页',
                        icon: 'streamline-plump:browser-website-1-remix',
                        link: 'https://wu-clan.github.io/homepage'
                    },
                    {
                        text: 'Github 问题',
                        icon: 'codicon:issues',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/issues'
                    },
                    {
                        text: 'Github 讨论',
                        icon: 'mdi:discussion',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/discussions'
                    },
                    {
                        text: '想法和建议',
                        icon: 'mdi:discussion',
                        link: 'https://discord.gg/xp8M6nY4NA'
                    },
                    {
                        text: '我要催更',
                        icon: 'material-symbols:update-rounded',
                        link: 'https://discord.gg/JyedBeHXkn'
                    },
                ]
            },
            {
                text: '课程',
                items: [
                    {
                        text: '视频课程',
                        badge: { text: '重制中', type: 'warning' },
                        icon: 'ri:bilibili-fill',
                        link: 'https://space.bilibili.com/284237214/lists'
                    },
                ]
            },
            {
                text: '动态',
                items: [
                    {
                        text: '博客',
                        badge: { text: '充电站', type: 'tip' },
                        icon: 'fa7-solid:blog',
                        link: '/blog/'
                    }
                ]
            }
        ]
    },
    {
        text: '插件系统',
        icon: 'unjs:unplugin',
        items: [
            {
                text: '文档',
                items: [
                    {
                        text: '前言',
                        icon: 'bi:chat-text',
                        link: '/plugin/before'
                    },
                    {
                        text: '插件开发',
                        icon: 'la:dev',
                        link: '/plugin/dev'
                    },
                    {
                        text: '插件分享',
                        icon: 'material-symbols:share',
                        link: '/plugin/share'
                    },
                    {
                        text: '插件安装',
                        icon: 'icon-park-outline:install',
                        link: '/plugin/install'
                    }
                ]
            },
            {
                text: '更多',
                items: [
                    {
                        text: '插件市场',
                        icon: 'noto-v1:shopping-cart',
                        // badge: { text: 'HOT', type: 'danger' },
                        link: '/market'
                    },
                ]
            }
        ]
    },
    {
        text: 'Pricing',
        icon: 'streamline-color:bag-dollar',
        link: '/pricing'
    },
    {
        text: '赞助',
        icon: 'material-icon-theme:github-sponsors',
        link: '/sponsors'
    },
    {
        text: '关于',
        items: [
            {
                text: '用户登记',
                icon: 'mdi:user-check',
                link: '/users'
            },
            {
                text: '社区团队',
                icon: 'fa-solid:user-friends',
                link: '/team'
            },
            {
                text: '隐私政策',
                icon: 'iconoir:privacy-policy',
                link: '/privacy-policy'
            },
        ],
    }
])
