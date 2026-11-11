import { ThemeSidebarMulti } from "vuepress-theme-plume";

export const zhSidebar: ThemeSidebarMulti = {
    '/backend/': [
        {
            text: '介绍',
            collapsed: false,
            prefix: 'summary/',
            items: [
                { text: '简介', link: 'intro' },
                { text: '为什么选择我们？', link: 'why' },
                { text: '快速开始', link: 'quick-start' },
                { text: '架构总览', link: '/architecture' },
                {
                    text: '开发环境',
                    prefix: '/backend/ide/',
                    items: [
                        { text: 'Visual Studio Code', link: 'vscode' },
                    ]
                },
            ]
        },
        {
            text: '核心开发',
            collapsed: false,
            prefix: 'reference/',
            items: [
                { text: '模型', link: 'model' },
                { text: 'Schema', link: 'schema' },
                { text: '路由', link: 'router' },
                { text: 'Service', link: 'service' },
                { text: 'CRUD', link: 'CRUD' },
                { text: '分页', link: 'pagination' },
                { text: '接口响应', link: 'response' },
            ]
        },
        {
            text: '基础设施',
            collapsed: false,
            prefix: 'reference/',
            items: [
                { text: '数据库', link: 'db' },
                { text: '切换主键', link: 'pk' },
                { text: '事务', link: 'transaction' },
                { text: '缓存', link: 'cache' },
                { text: '时区', link: 'timezone' },
                { text: '国际化', link: 'i18n' },
                { text: '节流', link: 'limit' },
            ]
        },
        {
            text: '安全',
            collapsed: false,
            prefix: 'reference/',
            items: [
                { text: 'JWT', link: 'jwt' },
                { text: 'RBAC', link: 'RBAC' },
                { text: 'CORS', link: 'CORS' },
                { text: 'OAuth 2.0', link: 'oauth2' },
                { text: 'SSO', link: 'sso' },
            ]
        },
        {
            text: '进阶能力',
            collapsed: false,
            prefix: 'reference/',
            items: [
                { text: '数据权限', link: 'data-permission' },
                { text: '多租户', link: 'tenant' },
            ]
        },
        {
            text: '扩展与集成',
            collapsed: false,
            prefix: 'reference/',
            items: [
                { text: 'Celery', link: 'celery' },
                { text: 'APScheduler', link: 'apscheduler' },
                { text: 'SocketIo', link: 'socketio' },
            ]
        },
        {
            text: '配置与工具',
            collapsed: false,
            prefix: 'reference/',
            items: [
                { text: '配置', link: 'conf' },
                { text: '后端 CLI', link: 'cli' },
                { text: '工程 CLI', link: '/cli' },
            ]
        },
        {
            text: '部署',
            collapsed: false,
            prefix: 'deploy/',
            items: [
                { text: 'Docker', link: 'Docker' },
                { text: '传统', link: 'legacy' },
            ]
        },
        {
            text: '附录',
            collapsed: false,
            prefix: 'summary/',
            items: [
                { text: '精简版', link: 'slim' },
            ]
        },
    ],
    '/plugin/': [
        {
            text: '介绍',
            collapsed: false,
            items: [
                { text: '前言', link: 'before' },
            ]
        },
        {
            text: '参考',
            collapsed: false,
            items: [
                { text: '插件开发', link: 'dev' },
                { text: '插件分享', link: 'share' },
                { text: '插件安装', link: 'install' },
            ]
        },
    ],
    '/frontend/': [
        {
            text: '介绍',
            collapsed: false,
            prefix: 'summary/',
            items: [
                { text: '简介', link: 'intro' },
                { text: '快速开始', link: 'quick-start' },
            ]
        },
        {
            text: '部署',
            collapsed: false,
            prefix: 'deploy/',
            items: [
                { text: 'Docker', link: 'docker' },
                { text: '传统', link: 'legacy' },
            ]
        }
    ],
    '/ai/': [
        {
            text: 'AI 赋能',
            collapsed: false,
            items: [
                { text: 'Skills', link: 'skills' },
                { text: 'MCP', link: 'mcp' },
                { text: 'Prompt', link: 'prompt' },
                { text: 'LLMs.txt', link: 'llms' },
            ]
        },
    ]
}
