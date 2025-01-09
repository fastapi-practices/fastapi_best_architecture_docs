import {SidebarMulti} from "vuepress-theme-plume/lib/shared";


export const mySidebar: SidebarMulti = {
    '/guide/': [
        {
            text: '介绍',
            collapsed: false,
            prefix: 'summary/',
            items: [
                {text: '简介', link: 'intro'},
                {text: '快速开始', link: 'quick-start'},
                {text: '为什么选择我们？', link: 'why'},
                {text: '精简版', link: 'fsm'},
            ]
        },
        {
            text: '参考',
            collapsed: false,
            prefix: 'reference/',
            items: [
                {text: '路由', link: 'route'},
                {text: 'JWT', link: 'jwt'},
                {text: 'CRUD', link: 'CRUD'},
                {text: '接口响应', link: 'response'},
                {text: '分页', link: 'paginate'},
                {text: '自定义异常', link: '/planet', icon: 'fluent-color:receipt-16'},
                {text: '切换数据库', link: 'db'},
                {text: '代码生成', link: 'code-generation'},
                {text: '数据规则', link: '/planet', icon: 'fluent-color:video-16'},
                {text: '跨域', link: 'CORS'},
                {text: 'RBAC', link: 'RBAC'},
                {text: '事务', link: 'transaction'},
                {text: 'Celery', link: '/planet', icon: 'fluent-color:video-16'},
                {text: 'APScheduler', link: 'apscheduler'},
                {text: '日志分析', link: '/planet', icon: 'fluent-color:receipt-16'},
                {text: 'Socketio', link: '/planet', icon: 'fluent-color:receipt-16'},
            ]
        },
        {
            text: 'Mixin',
            collapsed: false,
            prefix: 'mixin/',
            items: [
                {text: 'CRUD', link: 'CRUD'},
                {text: '操作人信息', link: '/planet', icon: 'fluent-color:receipt-16'},
            ]
        },
        {
            text: '部署',
            collapsed: false,
            prefix: 'deploy/',
            items: [
                {text: 'Docker', link: 'Docker'},
                {text: '传统', link: 'legacy'},
            ]
        },
        {
            text: '其他',
            collapsed: false,
            prefix: 'other/',
            items: [
                {text: '更新记录', link: 'changelog'},
            ]
        }
    ],
}
