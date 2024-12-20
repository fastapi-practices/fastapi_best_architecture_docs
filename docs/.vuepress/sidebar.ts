import {SidebarMulti} from "vuepress-theme-plume/lib/shared";


export const mySidebar: SidebarMulti = {
    '/guide/': [
        {
            text: '介绍',
            collapsed: false,
            prefix: 'summary/',
            items: [
                {text: '简介', link: 'intro'},
                {text: '为什么选择我们？', link: 'why'},
                {text: '快速开始', link: 'quick-start'},
                {text: '精简版', link: 'fsm'},
            ]
        },
        {
            text: '参考',
            collapsed: false,
            prefix: 'reference/',
            items: [
                {text: 'JWT', link: 'jwt'},
                {text: '跨域', link: 'CORS'},
                {text: 'RBAC', link: 'RBAC'},
                {text: 'CRUD', link: 'CRUD'},
                {text: '事务', link: 'transaction'},
                {text: '切换数据库', link: 'db'},
                {text: '数据规则', link: 'data-rule', icon: 'mdi:planet'},
                {text: '代码生成', link: 'code-generation'},
                {text: '自定义异常', link: 'custom-err-msg', icon: 'mdi:planet'},
                {text: '接口响应', link: 'response', icon: 'mdi:planet'},
                {text: '分页', link: 'paginate'},
                {text: 'Celery', link: 'celery', icon: 'mdi:planet'},
                {text: 'APScheduler', link: 'apscheduler'},
                {text: '日志分析', link: 'log', icon: 'mdi:planet'},
                {text: 'Socketio', link: 'socketio', icon: 'mdi:planet'},
            ]
        },
        {
            text: 'Mixin',
            collapsed: false,
            prefix: 'mixin/',
            items: [
                {text: '用户信息', link: 'user', icon: 'mdi:planet'},
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
