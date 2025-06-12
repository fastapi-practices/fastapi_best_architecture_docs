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
                { text: '模型', link: 'model' },
                { text: 'Schema', link: 'schema' },
                { text: '路由', link: 'router' },
                { text: 'CRUD', link: 'CRUD' },
                { text: '接口响应', link: 'response' },
                { text: '分页', link: 'pagination' },
                { text: '自定义异常', link: '/planet', badge: { text: '专业版', type: 'warning' } },
                { text: '节流', link: 'limit' },
                { text: '切换数据库', link: 'db' },
                { text: 'JWT', link: 'jwt' },
                { text: 'RBAC', link: 'RBAC' },
                { text: 'OAuth 2.0', link: 'oauth2' },
                { text: '数据权限', link: '/planet', badge: { text: '专业版', type: 'warning' } },
                { text: '代码生成', link: 'code-generation' },
                { text: '跨域', link: 'CORS' },
                { text: '事务', link: 'transaction' },
                { text: 'Celery', link: '/planet', badge: { text: '专业版', type: 'warning' } },
                { text: 'APScheduler', link: 'apscheduler' },
                // {text: '日志分析', link: '/planet', badge: { text: '专业版', type: 'warning' } },
                { text: 'SocketIo', link: '/planet', badge: { text: '专业版', type: 'warning' } },
                { text: 'SSO', link: 'sso' },
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
        },
        {
            text: '市场',
            collapsed: false,
            items: [
                { text: '插件市场', link: 'market' },
            ]
        }
    ],
    '/frontend/': [
        {
            text: '参考',
            collapsed: false,
            items: [
                { text: '介绍', link: 'intro' },
                { text: '快速开始', link: 'quick-start' },
            ]
        },
        {
            text: '部署',
            collapsed: false,
            items: [
                { text: 'Docker', link: 'docker' },
                { text: '传统', link: 'legacy' },
            ]
        }
    ]
}
