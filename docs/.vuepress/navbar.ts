import { defineNavbarConfig } from "vuepress-theme-plume";

export const myNavbar = defineNavbarConfig([
    {
        text: '前端（在线体验）',
        items: [
            {
                text: '线上演示',
                items: [
                    {
                        text: 'Vben Admin Antd 完整版实施',
                        link: 'https://fba.wu-clan.site/'
                    }
                ]
            },
            {
                text: '文档',
                items: [
                    {
                        text: 'Arco Design Pro 实验性实施',
                        link: '/frontend/summary/arco',
                        badge: { text: '已弃用', type: 'danger' }
                    },
                    {
                        text: 'Vben Admin Antd 完整版实施',
                        link: '/frontend/summary/intro'
                    }
                ]
            },
            {
                text: 'GitHub',
                items: [
                    {
                        text: 'Arco Design Pro 实验性实施',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture_ui_arco',
                        badge: { text: '已弃用', type: 'danger' }
                    },
                    {
                        text: 'Vben Admin Antd 完整版实施',
                        link: 'https://github.com/fastapi-practices/fastapi_best_architecture_ui'
                    }
                ]
            },
        ]
    },
    {
        text: 'v1.7.0',
        items: [
            {
                text: '线上演示',
                items: [
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
                        text: '技术支持',
                        icon: 'fluent-emoji-high-contrast:unicorn',
                        link: '/group.md'
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
        text: '插件系统',
        badge: { text: 'HOT', type: 'danger' },
        link: '/plugin/before'
    },
    {
        text: '购买特权',
        link: '/pricing'
    },
    {
        text: '赞助',
        link: '/sponsors'
    },
    {
        text: '生态系统',
        items: [
            {
                text: '资源',
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
                        badge: { text: '限时开放', type: 'warning' },
                        icon: 'ri:bilibili-fill',
                        link: 'https://space.bilibili.com/284237214/lists'
                    },
                ]
            }
        ]
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
                text: '维护团队',
                icon: 'fa-solid:user-friends',
                link: '/team'
            },
        ],
    }
])
