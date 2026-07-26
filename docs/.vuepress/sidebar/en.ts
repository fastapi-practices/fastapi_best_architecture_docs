import { ThemeSidebarMulti } from "vuepress-theme-plume";

/**
 * English sidebar notes (Plume multi-locale):
 *
 * 1. Object keys are matched as:
 *      routePath.startsWith(routeLocale + removeLeadingSlash(key))
 *    With routeLocale `/en/`, key must be `/backend/` (NOT `/en/backend/`),
 *    otherwise it becomes `/en/en/backend/` and never matches → empty sidebar.
 *
 * 2. Resolved item links use the key/prefix as base and do NOT auto-prepend
 *    routeLocale. Relative `prefix: 'summary/'` would produce `/backend/...`
 *    (Chinese paths). Use absolute prefixes under `/en/...` for links.
 */
export const enSidebar: ThemeSidebarMulti = {
    '/backend/': [
        {
            text: 'Introduction',
            collapsed: false,
            prefix: '/en/backend/summary/',
            items: [
                { text: 'Overview', link: 'intro' },
                { text: 'Quick Start', link: 'quick-start' },
                { text: 'Why Choose Us?', link: 'why' },
                { text: 'Slim Edition', link: 'slim' },
            ]
        },
        {
            text: 'Editor',
            collapsed: false,
            prefix: '/en/backend/ide/',
            items: [
                { text: 'Visual Studio Code', link: 'vscode' },
            ]
        },
        {
            text: 'Reference',
            collapsed: false,
            prefix: '/en/backend/reference/',
            items: [
                { text: 'Configuration', link: 'conf' },
                { text: 'CLI', link: 'cli' },
                { text: 'Model', link: 'model' },
                { text: 'Schema', link: 'schema' },
                { text: 'Router', link: 'router' },
                { text: 'CRUD', link: 'CRUD' },
                { text: 'Pagination', link: 'pagination' },
                { text: 'API Response', link: 'response' },
                { text: 'JWT', link: 'jwt' },
                { text: 'RBAC', link: 'RBAC' },
                { text: 'CORS', link: 'CORS' },
                { text: 'Timezone', link: 'timezone' },
                { text: 'Rate Limit', link: 'limit' },
                { text: 'Transaction', link: 'transaction' },
                { text: 'Cache', link: 'cache' },
                { text: 'i18n', link: 'i18n' },
                { text: 'Data Permission', link: 'data-permission' },
                { text: 'Code Generation', link: 'code-generation' },
                { text: 'Primary Key', link: 'pk' },
                { text: 'Database', link: 'db' },
                { text: 'Multi-tenancy', link: 'tenant' },
                { text: 'OAuth 2.0', link: 'oauth2' },
                { text: 'SocketIo', link: 'socketio' },
                { text: 'Celery', link: 'celery' },
                { text: 'APScheduler', link: 'apscheduler' },
                { text: 'SSO', link: 'sso' },
            ]
        },
        {
            text: 'Deployment',
            collapsed: false,
            prefix: '/en/backend/deploy/',
            items: [
                { text: 'Docker', link: 'Docker' },
                { text: 'Legacy', link: 'legacy' },
            ]
        },
    ],
    '/plugin/': [
        {
            text: 'Introduction',
            collapsed: false,
            prefix: '/en/plugin/',
            items: [
                { text: 'Preface', link: 'before' },
            ]
        },
        {
            text: 'Reference',
            collapsed: false,
            prefix: '/en/plugin/',
            items: [
                { text: 'Plugin Development', link: 'dev' },
                { text: 'Plugin Sharing', link: 'share' },
                { text: 'Plugin Installation', link: 'install' },
            ]
        },
    ],
    '/frontend/': [
        {
            text: 'Introduction',
            collapsed: false,
            prefix: '/en/frontend/summary/',
            items: [
                { text: 'Overview', link: 'intro' },
                { text: 'Quick Start', link: 'quick-start' },
            ]
        },
        {
            text: 'Deployment',
            collapsed: false,
            prefix: '/en/frontend/deploy/',
            items: [
                { text: 'Docker', link: 'docker' },
                { text: 'Legacy', link: 'legacy' },
            ]
        }
    ],
    '/ai/': [
        {
            text: 'AI Powered',
            collapsed: false,
            prefix: '/en/ai/',
            items: [
                { text: 'Skills', link: 'skills' },
                { text: 'MCP', link: 'mcp' },
                { text: 'Prompt', link: 'prompt' },
                { text: 'LLMs.txt', link: 'llms' },
            ]
        },
    ]
}
