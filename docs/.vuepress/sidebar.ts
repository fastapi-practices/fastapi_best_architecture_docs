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
                { text: '精简版', link: 'slim' },
            ]
        },
        {
            text: '编辑器',
            collapsed: false,
            prefix: 'ide/',
            items: [
                { text: 'Visual Studio Code', link: 'vscode' },
            ]
        },
        {
            text: '参考',
            collapsed: false,
            prefix: 'reference/',
            items: [
                { text: '配置', link: 'conf' },
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
                { text: 'CORS', link: 'CORS' },
                { text: '时区', link: 'timezone' },
                { text: '节流', link: 'limit' },
                { text: '切换主键', link: 'pk' },
                { text: '切换数据库', link: 'db' },
                { text: '事务', link: 'transaction' },
                { text: 'OAuth 2.0', link: 'oauth2' },
                { text: '数据权限', link: 'data-permission' },
                { text: '代码生成', link: 'code-generation' },
                { text: 'SocketIo', link: 'socketio' },
                { text: 'Celery', link: 'celery' },
                { text: 'APScheduler', link: 'apscheduler' },
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
            text: '参考',
            collapsed: false,
            items: [
                { text: '视频讲解', link: 'video' },
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
            ]
        },
    ]
}
