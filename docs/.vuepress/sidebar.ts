import { ThemeSidebarMulti } from "vuepress-theme-plume";


export const mySidebar: ThemeSidebarMulti = {
    '/backend/': [
        {
            text: '介绍',
            collapsed: false,
            prefix: 'summary/',
            items: [
                { text: '简介', link: 'intro' },
                { text: '快速开始', link: 'quick-start' },
                { text: '为什么选择我们？', link: 'why' },
                { text: '精简版', link: 'fsm' },
            ]
        },
        {
            text: '编辑器',
            collapsed: false,
            prefix: 'ide/',
            items: [
                { text: 'Visual Studio Code', link: 'vscode' },
                { text: 'Cursor', link: 'cursor' },
            ]
        },
        {
            text: '参考',
            collapsed: false,
            prefix: 'reference/',
            items: [
                { text: '配置', link: 'config' },
                { text: 'CLI', link: 'cli' },
                { text: '模型', link: 'model' },
                { text: 'Schema', link: 'schema' },
                { text: '路由', link: 'router' },
                { text: 'CRUD', link: 'CRUD' },
                { text: '分页', link: 'pagination' },
                { text: '接口响应', link: 'response' },
                { text: '国际化', link: 'i18n' },
                { text: 'JWT', link: 'jwt' },
                { text: 'RBAC', link: 'RBAC' },
                { text: '跨域', link: 'CORS' },
                { text: '时区', link: 'timezone' },
                { text: '节流', link: 'limit' },
                { text: '切换主键', link: 'pk' },
                { text: '切换数据库', link: 'db' },
                { text: '事务', link: 'transaction' },
                { text: 'OAuth 2.0', link: 'oauth2' },
                { text: '数据权限', link: '/planet', badge: { text: '专业版', type: 'warning' } },
                { text: '代码生成', link: 'code-generation' },
                { text: 'SocketIo', link: '/planet', badge: { text: '专业版', type: 'warning' } },
                { text: 'Celery', link: '/planet', badge: { text: '专业版', type: 'warning' } },
                { text: 'APScheduler', link: 'apscheduler' },
                { text: 'SSO', link: 'sso', badge: { text: '专业版', type: 'warning' } },
            ]
        },
        {
            text: '部署',
            collapsed: false,
            prefix: 'deploy/',
            items: [
                { text: 'Docker', link: 'Docker' },
                { text: '传统', link: 'legacy', badge: { text: '专业版', type: 'warning' } },
            ]
        },
    ],
    '/plugin/': [
        {
            text: '介绍',
            collapsed: false,
            items: [
                { text: '前言', link: 'before' },
                { text: '插件市场', badge: { text: 'HOT', type: 'danger' }, link: '/market' },
            ]
        },
        {
            text: '开发',
            collapsed: false,
            items: [
                { text: '插件开发', link: 'dev' },
                { text: '插件分享', link: 'share' },
            ]
        },
        {
            text: '使用',
            collapsed: false,
            items: [
                { text: '插件安装', link: 'install' }
            ]
        }
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
    ]
}
