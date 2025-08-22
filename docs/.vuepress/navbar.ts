import { defineNavbarConfig, ThemeNavItem } from "vuepress-theme-plume";

export const myNavbar: ThemeNavItem[] = defineNavbarConfig([
    {
        text: 'v1.8.0',
        items: [
            {
                text: '在线体验',
                items: [
                    {
                        text: 'Vben Admin',
                        icon: 'iconoir:www',
                        link: 'https://fba.wu-clan.site/',
                    },
                    {
                        text: '服务状态',
                        icon: 'simple-icons:uptimekuma',
                        link: 'https://status.wu-clan.site/status/services'
                    }
                ]
            },
            {
                text: '文档',
                items: [
                    {
                        text: '快速开始',
                        icon: 'material-symbols:start',
                        link: '/backend/summary/quick-start.md'
                    },
                    {
                        text: 'Apifox',
                        icon: 'simple-icons:apifox',
                        link: 'https://apifox.com/apidoc/shared-28a93f02-730b-4f33-bb5e-4dad92058cc0'
                    },
                    {
                        text: 'Arco Admin',
                        icon: 'material-symbols:docs',
                        link: '/frontend/summary/arco',
                    },
                    {
                        text: 'Vben Admin',
                        icon: 'material-symbols:docs',
                        link: '/frontend/summary/intro'
                    }
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
                        text: '我要催更',
                        icon: 'material-symbols:update-rounded',
                        link: 'https://discord.gg/JyedBeHXkn'
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
                text: '开发',
                items: [
                    {
                        text: '开源项目',
                        icon: 'mdi:github',
                        link: '/opensource'
                    },
                    {
                        text: '技术栈',
                        icon: 'material-symbols:stack',
                        link: '/stack'
                    },
                    {
                        text: '用户登记',
                        badge: { text: '欢迎投稿', type: 'warning' },
                        icon: 'mdi:user-check',
                        link: '/users'
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
                ]
            },
            {
                text: '特权',
                items: [
                    {
                        text: '知识星球',
                        icon: 'ph:planet-fill',
                        link: '/planet'
                    },
                    {
                        text: '视频课程',
                        badge: { text: '重制中', type: 'warning' },
                        icon: 'ri:bilibili-fill',
                        link: 'https://space.bilibili.com/284237214/lists'
                    },
                ]
            }
        ]
    },
    {
        text: '插件系统',
        icon: 'unjs:unplugin',
        link: '/plugin/before'
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
                text: '常见问题',
                icon: 'healthicons:question',
                link: '/questions.md'
            },
            {
                text: '社区团队',
                icon: 'fa-solid:user-friends',
                link: '/team'
            },
        ],
    }
])
